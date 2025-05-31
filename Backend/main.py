from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models, pydanticmodels
from fastapi.middleware.cors import CORSMiddleware
from database import engine, get_db
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
import models, pydanticmodels, database, auth

# Create DB tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="EduConnect API")

#nkwa api
api_url = "https://api.pay.staging.mynkwa.com/"
#-----------------------------------
# config for CORSMiddleware
#-----------------------------------
origins = [
   ["*"]   # optional
]

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # use ["*"] only in dev if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# --------------------
# User Routes
# --------------------
@app.post("/users/", response_model=pydanticmodels.UserOut)
def create_user(user: pydanticmodels.UserCreate, db: Session = Depends(database.get_db)):
    if db.query(models.User).filter(models.User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_pw = auth.get_password_hash(user.password)
    db_user = models.User(email=user.email, password=hashed_pw, name=user.name, role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/token", response_model=pydanticmodels.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = auth.create_access_token(
        data={"sub": str(user.id)},
        expires_delta=timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Protected Route: Get current user
@app.get("/me", response_model=pydanticmodels.UserOut)
def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user



@app.get("/users/{user_id}", response_model=pydanticmodels.UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# --------------------
# Course Routes
# --------------------
@app.post("/courses/", response_model=pydanticmodels.CourseOut)
def create_course(course: pydanticmodels.CourseCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    new_course = models.Course(**course.dict())
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course

@app.get("/courses/", response_model=list[pydanticmodels.CourseOut])
def list_courses(db: Session = Depends(get_db)):
    return db.query(models.Course).all()


# --------------------
# Enrollment Routes
# --------------------
@app.post("/enrollments/", response_model=pydanticmodels.EnrollmentOut)
def enroll(enrollment: pydanticmodels.EnrollmentCreate, db: Session = Depends(get_db),current_user: models.User = Depends(auth.get_current_user)):
    new_enrollment = models.Enrollment(**enrollment.dict())
    db.add(new_enrollment)
    db.commit()
    db.refresh(new_enrollment)
    return new_enrollment

@app.get("/learners/enrollments", response_model=list[pydanticmodels.EnrollmentOut])
def get_enrollments(db: Session = Depends(get_db),current_user: models.User = Depends(auth.get_current_user)):
    return db.query(models.Enrollment).filter_by(learner_id=current_user.id).all()
