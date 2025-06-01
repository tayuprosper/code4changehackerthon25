from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
import models, pydanticmodels
from database import engine, get_db
import auth
from nkwa_pay_sdk import Pay

# Create DB tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MboaConnect API",
    description="API for MboaConnect educational platform",
    version="1.0.0"
)

# Initialize payment SDK
pay = Pay(api_key_auth="KavEM5mVdNt67Ryxt8cGr")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------
# Authentication Routes
# --------------------
@app.post("/token", response_model=pydanticmodels.Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(
        data={"sub": str(user.id)},
        expires_delta=timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.id,
        "role": user.role.value
    }

@app.get("/me", response_model=pydanticmodels.UserOut)
async def read_current_user(
    current_user: models.User = Depends(auth.get_current_user)
):
    return current_user

# --------------------
# User Routes
# --------------------
@app.post("/users/", response_model=pydanticmodels.UserOut)
async def create_user(
    user: pydanticmodels.UserCreate,
    db: Session = Depends(get_db)
):
    if db.query(models.User).filter(models.User.email == user.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    hashed_pw = auth.get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        password=hashed_pw,
        name=user.name,
        role=user.role,
        phone=user.phone,
        balance=0.0
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/{user_id}", response_model=pydanticmodels.UserOut)
async def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    user = db.query(models.User).get(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user

# --------------------
# Course Routes
# --------------------
@app.post("/courses/", response_model=pydanticmodels.CourseOut)
async def create_course(
    course: pydanticmodels.CourseCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if current_user.role not in [models.UserRole.tutor, models.UserRole.admin]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only tutors and admins can create courses"
        )
    
    db_course = models.Course(
        **course.dict(),
        poster_id=current_user.id
    )
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

@app.get("/courses/", response_model=list[pydanticmodels.CourseOut])
async def list_courses(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100
):
    return db.query(models.Course).offset(skip).limit(limit).all()

@app.get("/courses/{course_id}", response_model=pydanticmodels.CourseOut)
async def get_course(
    course_id: int,
    db: Session = Depends(get_db)
):
    course = db.query(models.Course).get(course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    return course

# --------------------
# Enrollment Routes
# --------------------
@app.post("/enrollments/", response_model=pydanticmodels.EnrollmentOut)
async def enroll(
    enrollment: pydanticmodels.EnrollmentCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    # Verify user is a learner
    if current_user.role != models.UserRole.learner:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only learners can enroll in courses"
        )
    
    # Check if already enrolled
    existing_enrollment = db.query(models.Enrollment).filter(
        models.Enrollment.learner_id == current_user.id,
        models.Enrollment.course_id == enrollment.course_id
    ).first()
    
    if existing_enrollment:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Already enrolled in this course"
        )
    
    new_enrollment = models.Enrollment(
        learner_id=current_user.id,
        course_id=enrollment.course_id,
        status=models.EnrollmentStatus.active
    )
    db.add(new_enrollment)
    db.commit()
    db.refresh(new_enrollment)
    return new_enrollment

@app.get("/enrollments/", response_model=list[pydanticmodels.EnrollmentOut])
async def get_user_enrollments(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    return db.query(models.Enrollment).filter(
        models.Enrollment.learner_id == current_user.id
    ).all()

# --------------------
# Payment Routes
# --------------------
@app.post("/payments/", response_model=pydanticmodels.PaymentOut)
async def process_payment(
    payment: pydanticmodels.PaymentRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    try:
        response = await pay.payments.collect_async(
            amount=payment.amount,
            phone_number=payment.phoneNumber
        )
         # Get course details
        course = db.query(models.Course).get(payment.course_id)
        if not course:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Course not found"
            )
        
        # Create payment record
        db_payment = models.Payment(
            user_id=current_user.id,
            course_id=payment.course_id,
            amount=payment.amount,
            payment_method=payment.payment_method,
            phone_number=payment.phone_number,
            transaction_id=response.get("id"),
            status="completed"
        )
        db.add(db_payment)
    
    # Update receiver balance (95% of amount)
        receiver = db.query(models.User).get(course.poster_id)
        if receiver:
            net_amount = round(payment.amount * 0.95, 2)
            receiver.balance = (receiver.balance or 0) + net_amount
        
        db.commit()
        db.refresh(db_payment)
        
        return db_payment
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        
   

@app.get("/payments/{payment_id}", response_model=pydanticmodels.PaymentOut)
async def get_payment(
    payment_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    payment = db.query(models.Payment).get(payment_id)
    if not payment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found"
        )
    
    # Verify user has access to this payment
    if payment.user_id != current_user.id and current_user.role != models.UserRole.admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this payment"
        )
    
    return payment

# --------------------
# Transaction Routes
# --------------------
@app.get("/transactions/", response_model=list[pydanticmodels.TransactionOut])
async def get_user_transactions(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    return db.query(models.Transaction).filter(
        (models.Transaction.sender_id == current_user.id) |
        (models.Transaction.receiver_id == current_user.id)
    ).all()

# --------------------
# Internship Routes
# --------------------
@app.post("/internships/", response_model=pydanticmodels.InternshipOut)
async def create_internship(
    internship: pydanticmodels.InternshipCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if current_user.role != models.UserRole.employer:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only employers can post internships"
        )
    
    db_internship = models.Internship(
        **internship.dict(),
        posted_by=current_user.id
    )
    db.add(db_internship)
    db.commit()
    db.refresh(db_internship)
    return db_internship

@app.get("/internships/", response_model=list[pydanticmodels.InternshipOut])
async def list_internships(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100
):
    return db.query(models.Internship).offset(skip).limit(limit).all()

# --------------------
# Application Routes
# --------------------
@app.post("/applications/", response_model=pydanticmodels.ApplicationOut)
async def apply_for_internship(
    application: pydanticmodels.ApplicationCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if current_user.role != models.UserRole.learner:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only learners can apply for internships"
        )
    
    # Check if already applied
    existing_application = db.query(models.Application).filter(
        models.Application.learner_id == current_user.id,
        models.Application.internship_id == application.internship_id
    ).first()
    
    if existing_application:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Already applied for this internship"
        )
    
    new_application = models.Application(
        learner_id=current_user.id,
        internship_id=application.internship_id,
        cover_letter=application.cover_letter
    )
    db.add(new_application)
    db.commit()
    db.refresh(new_application)
    return new_application

# --------------------
# Mentorship Routes
# --------------------
@app.post("/mentorship/", response_model=pydanticmodels.MentorshipRequestOut)
async def request_mentorship(
    request: pydanticmodels.MentorshipRequestCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if current_user.role != models.UserRole.learner:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only learners can request mentorship"
        )
    
    # Verify tutor exists and is actually a tutor
    tutor = db.query(models.User).join(models.TutorProfile).filter(
        models.User.id == request.tutor_id
    ).first()
    
    if not tutor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tutor not found"
        )
    
    new_request = models.MentorshipRequest(
        learner_id=current_user.id,
        tutor_id=request.tutor_id,
        message=request.message
    )
    db.add(new_request)
    db.commit()
    db.refresh(new_request)
    return new_request