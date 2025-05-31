from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey, DateTime, Enum, Float, Table
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime
import enum

Base = declarative_base()

# Enum for User roles
class UserRole(str, enum.Enum):
    learner = "learner"
    tutor = "tutor"
    employer = "employer"

# --- User ---
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    name = Column(String)
    role = Column(Enum(UserRole), default=UserRole.learner)
    balance = Column(Integer)

    learner_profile = relationship("LearnerProfile", back_populates="user", uselist=False)
    tutor_profile = relationship("TutorProfile", back_populates="user", uselist=False)


# --- Learner Profile ---
class LearnerProfile(Base):
    __tablename__ = "learner_profiles"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    bio = Column(Text)
    skills = Column(Text)  # comma-separated or use a related table

    user = relationship("User", back_populates="learner_profile")
    enrollments = relationship("Enrollment", back_populates="learner")
    applications = relationship("Application", back_populates="learner")
    mentorship_requests = relationship("MentorshipRequest", back_populates="learner")


# --- Tutor Profile ---
class TutorProfile(Base):
    __tablename__ = "tutor_profiles"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    expertise = Column(Text)
    availability = Column(Boolean, default=True)

    user = relationship("User", back_populates="tutor_profile")
    mentorships = relationship("MentorshipRequest", back_populates="tutor")


# --- Course ---
class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    difficulty = Column(String)  # e.g., Beginner, Intermediate, Advanced

    enrollments = relationship("Enrollment", back_populates="course")


# --- Enrollment ---
class Enrollment(Base):
    __tablename__ = "enrollments"

    id = Column(Integer, primary_key=True)
    learner_id = Column(Integer, ForeignKey("learner_profiles.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    status = Column(String, default="In Progress")  # or Completed
    grade = Column(Float, nullable=True)

    learner = relationship("LearnerProfile", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")


# --- Internship ---
class Internship(Base):
    __tablename__ = "internships"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    organization = Column(String)
    description = Column(Text)
    required_skills = Column(Text)

    applications = relationship("Application", back_populates="internship")


# --- Application ---
class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True)
    learner_id = Column(Integer, ForeignKey("learner_profiles.id"))
    internship_id = Column(Integer, ForeignKey("internships.id"))
    applied_on = Column(DateTime, default=datetime.utcnow)

    learner = relationship("LearnerProfile", back_populates="applications")
    internship = relationship("Internship", back_populates="applications")


# --- Mentorship Request ---
class MentorshipRequest(Base):
    __tablename__ = "mentorship_requests"

    id = Column(Integer, primary_key=True)
    learner_id = Column(Integer, ForeignKey("learner_profiles.id"))
    tutor_id = Column(Integer, ForeignKey("tutor_profiles.id"))
    status = Column(String, default="Pending")
    requested_on = Column(DateTime, default=datetime.utcnow)

    learner = relationship("LearnerProfile", back_populates="mentorship_requests")
    tutor = relationship("TutorProfile", back_populates="mentorships")
