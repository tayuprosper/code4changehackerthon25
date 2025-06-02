from pydantic import BaseModel, EmailStr, Field, constr, PositiveInt, validator
from typing import Optional, List
from datetime import datetime
from enum import Enum
from typing import Annotated

# Custom types
PhoneNumber = Annotated[
    str,
    Field(pattern=r"^237[0-9]{8,9}$", description="Phone number in MSISDN format with country code")
]

# === Enums ===
class UserRole(str, Enum):
    learner = "learner"
    tutor = "tutor"
    employer = "employer"
    admin = "admin"

class PaymentMethod(str, Enum):
    mtn_momo = "mtn_momo"
    orange_money = "orange_money"
    credit_card = "credit_card"

class EnrollmentStatus(str, Enum):
    active = "active"
    completed = "completed"
    cancelled = "cancelled"

class ApplicationStatus(str, Enum):
    pending = "pending"
    reviewed = "reviewed"
    accepted = "accepted"
    rejected = "rejected"

class MentorshipStatus(str, Enum):
    pending = "pending"
    accepted = "accepted"
    rejected = "rejected"
    completed = "completed"

# === User Models ===
class UserBase(BaseModel):
    email: EmailStr
    name: Optional[str] = Field(None, max_length=100)
    phone: Optional[PhoneNumber] = None
    role: UserRole = UserRole.learner

class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=255)

class UserUpdate(BaseModel):
    name: Optional[str] = Field(None, max_length=100)
    phone: Optional[PhoneNumber] = None

class UserOut(UserBase):
    id: int
    created_at: datetime
    is_active: bool

    class Config:
        from_attributes = True

# === Auth Models ===
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# === Profile Models ===
class LearnerProfileBase(BaseModel):
    bio: Optional[str] = None
    skills: Optional[str] = None
    education: Optional[str] = None

class LearnerProfileCreate(LearnerProfileBase):
    pass

class LearnerProfileOut(LearnerProfileBase):
    id: int
    user: UserOut

    class Config:
        from_attributes = True

class TutorProfileBase(BaseModel):
    expertise: Optional[str] = None
    qualifications: Optional[str] = None
    hourly_rate: Optional[float] = None
    availability: bool = True

class TutorProfileCreate(TutorProfileBase):
    pass

class TutorProfileOut(TutorProfileBase):
    id: int
    user: UserOut
    verified: bool

    class Config:
        from_attributes = True

# === Course Models ===
class CourseBase(BaseModel):
    title: str = Field(..., max_length=255)
    description: Optional[str] = None
    difficulty: Optional[str] = Field(None, max_length=50)
    price: float = 0.0
    duration_hours: Optional[int] = None

class CourseCreate(CourseBase):
    tutor_id: Optional[int] = None

class CourseUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = None
    price: Optional[float] = None
    is_published: Optional[bool] = None

class CourseOut(CourseBase):
    id: int
    poster: UserOut
    tutor: Optional[TutorProfileOut] = None
    created_at: datetime
    is_published: bool

    class Config:
        from_attributes = True

# === Enrollment Models ===
class EnrollmentBase(BaseModel):
    status: EnrollmentStatus = EnrollmentStatus.active
    progress: int = Field(0, ge=0, le=100)

class EnrollmentCreate(BaseModel):
    course_id: int

class EnrollmentOut(EnrollmentBase):
    id: int
    # learner: UserOut
    course: CourseOut
    enrolled_at: datetime
    last_accessed: Optional[datetime] = None

    class Config:
        from_attributes = True

# === Payment Models ===
class PaymentBase(BaseModel):
    amount: float = Field(..., gt=0)
    payment_method: PaymentMethod
    phone_number: Optional[PhoneNumber] = None
    status: str = "pending"

class PaymentCreate(PaymentBase):
    course_id: int

class PaymentOut(PaymentBase):
    id: int
    user: UserOut
    course: CourseOut
    created_at: datetime
    completed_at: Optional[datetime] = None
    transaction_id: Optional[str] = None

    class Config:
        from_attributes = True

class PaymentRequest(BaseModel):
    amount: PositiveInt = Field(..., description="Amount to be paid in XAF")
    phone_number: PhoneNumber
    course_id: int = Field(..., description="ID of the course for which payment is made")
    payment_method: PaymentMethod = PaymentMethod.mtn_momo

    class Config:
        json_schema_extra = {
            "example": {
                "amount": 1000,
                "phone_number": "237600000000",
                "course_id": 5,
                "payment_method": "mtn_momo"
            }
        }

# === Transaction Models ===
class TransactionOut(BaseModel):
    id: int
    sender: UserOut
    receiver: UserOut
    course: CourseOut
    amount: float
    description: Optional[str] = None
    created_at: datetime
    is_settled: bool

    class Config:
        from_attributes = True

# === Internship Models ===
class InternshipBase(BaseModel):
    title: str = Field(..., max_length=255)
    organization: str = Field(..., max_length=255)
    description: Optional[str] = None
    requirements: Optional[str] = None
    duration: Optional[str] = Field(None, max_length=100)
    is_remote: bool = False

class InternshipCreate(InternshipBase):
    pass

class InternshipOut(InternshipBase):
    id: int
    posted_by: UserOut
    created_at: datetime
    deadline: Optional[datetime] = None

    class Config:
        from_attributes = True

# === Application Models ===
class ApplicationBase(BaseModel):
    status: ApplicationStatus = ApplicationStatus.pending
    cover_letter: Optional[str] = None

class ApplicationCreate(BaseModel):
    internship_id: int
    cover_letter: Optional[str] = None

class ApplicationOut(ApplicationBase):
    id: int
    learner: LearnerProfileOut
    internship: InternshipOut
    applied_at: datetime

    class Config:
        from_attributes = True

# === Mentorship Models ===
class MentorshipRequestBase(BaseModel):
    message: Optional[str] = None
    status: MentorshipStatus = MentorshipStatus.pending

class MentorshipRequestCreate(BaseModel):
    tutor_id: int
    message: Optional[str] = None

class MentorshipRequestOut(MentorshipRequestBase):
    id: int
    learner: LearnerProfileOut
    tutor: TutorProfileOut
    requested_at: datetime
    responded_at: Optional[datetime] = None

    class Config:
        from_attributes = True