from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum


# === Enum ===
class UserRole(str, Enum):
    learner = "learner"
    tutor = "tutor"
    employer = "employer"


# === User ===
class UserBase(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    role: UserRole

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int

    class Config:
        orm_mode = True


# === Learner Profile ===
class LearnerProfileBase(BaseModel):
    bio: Optional[str] = None
    skills: Optional[str] = None

class LearnerProfileCreate(LearnerProfileBase):
    pass

class LearnerProfileOut(LearnerProfileBase):
    id: int
    user: UserOut

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


# === Tutor Profile ===
class TutorProfileBase(BaseModel):
    expertise: Optional[str] = None
    availability: bool = True

class TutorProfileCreate(TutorProfileBase):
    pass

class TutorProfileOut(TutorProfileBase):
    id: int
    user: UserOut

    class Config:
        orm_mode = True


# === Course ===
class CourseBase(BaseModel):
    title: str
    description: Optional[str] = None
    difficulty: Optional[str] = None

class CourseCreate(CourseBase):
    pass

class CourseOut(CourseBase):
    id: int

    class Config:
        orm_mode = True


# === Enrollment ===
class EnrollmentBase(BaseModel):
    status: Optional[str] = "In Progress"
    grade: Optional[float] = None

class EnrollmentCreate(EnrollmentBase):
    learner_id: int
    course_id: int

class EnrollmentOut(EnrollmentBase):
    id: int
    course: CourseOut

    class Config:
        orm_mode = True


# === Internship ===
class InternshipBase(BaseModel):
    title: str
    organization: str
    description: Optional[str] = None
    required_skills: Optional[str] = None

class InternshipCreate(InternshipBase):
    pass

class InternshipOut(InternshipBase):
    id: int

    class Config:
        orm_mode = True


# === Application ===
class ApplicationCreate(BaseModel):
    learner_id: int
    internship_id: int

class ApplicationOut(BaseModel):
    id: int
    internship: InternshipOut
    applied_on: datetime

    class Config:
        orm_mode = True


# === Mentorship Request ===
class MentorshipRequestCreate(BaseModel):
    learner_id: int
    tutor_id: int

class MentorshipRequestOut(BaseModel):
    id: int
    status: str
    requested_on: datetime
    tutor: TutorProfileOut

    class Config:
        orm_mode = True
