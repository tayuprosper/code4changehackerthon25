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
    admin = "admin"

# Enum for Payment Methods
class PaymentMethod(str, enum.Enum):
    mtn_momo = "mtn_momo"
    orange_money = "orange_money"
    credit_card = "credit_card"

# --- User ---
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    name = Column(String(100))
    phone = Column(String(20))  # Added for mobile payments
    role = Column(Enum(UserRole), default=UserRole.learner)
    balance = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)

    # Relationships
    learner_profile = relationship("LearnerProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    tutor_profile = relationship("TutorProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    payments_made = relationship("Payment", back_populates="user", foreign_keys="Payment.user_id")
    courses_posted = relationship("Course", back_populates="poster")
    sent_transactions = relationship("Transaction", back_populates="sender", foreign_keys="Transaction.sender_id")
    received_transactions = relationship("Transaction", back_populates="receiver", foreign_keys="Transaction.receiver_id")

# --- Learner Profile ---
class LearnerProfile(Base):
    __tablename__ = "learner_profiles"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    bio = Column(Text)
    skills = Column(Text)  # Could be JSON or comma-separated
    education = Column(Text)
    resume_url = Column(String(255))

    user = relationship("User", back_populates="learner_profile")
    enrollments = relationship("Enrollment", back_populates="learner", cascade="all, delete-orphan")
    applications = relationship("Application", back_populates="learner", cascade="all, delete-orphan")
    mentorship_requests = relationship("MentorshipRequest", back_populates="learner", cascade="all, delete-orphan")

# --- Tutor Profile ---
class TutorProfile(Base):
    __tablename__ = "tutor_profiles"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    expertise = Column(Text)
    qualifications = Column(Text)
    hourly_rate = Column(Float)
    availability = Column(Boolean, default=True)
    verified = Column(Boolean, default=False)

    user = relationship("User", back_populates="tutor_profile")
    mentorships = relationship("MentorshipRequest", back_populates="tutor", cascade="all, delete-orphan")
    courses_taught = relationship("Course", back_populates="tutor")

# --- Course ---
class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    difficulty = Column(String(50))  # Beginner, Intermediate, Advanced
    price = Column(Float, default=0.0)
    duration_hours = Column(Integer)
    poster_id = Column(Integer, ForeignKey("users.id"))
    tutor_id = Column(Integer, ForeignKey("tutor_profiles.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    is_published = Column(Boolean, default=False)
    thumbnail_url = Column(String(255))

    poster = relationship("User", back_populates="courses_posted")
    tutor = relationship("TutorProfile", back_populates="courses_taught")
    enrollments = relationship("Enrollment", back_populates="course", cascade="all, delete-orphan")
    payments = relationship("Payment", back_populates="course", cascade="all, delete-orphan")

# --- Enrollment ---
class Enrollment(Base):
    __tablename__ = "enrollments"

    id = Column(Integer, primary_key=True)
    learner_id = Column(Integer, ForeignKey("learner_profiles.id", ondelete="CASCADE"))
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="CASCADE"))
    enrolled_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String(50), default="active")  # active, completed, cancelled
    progress = Column(Integer, default=0)  # percentage
    last_accessed = Column(DateTime)

    learner = relationship("LearnerProfile", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")

# --- Payment ---
class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"))
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="SET NULL"))
    amount = Column(Float, nullable=False)
    payment_method = Column(Enum(PaymentMethod))
    transaction_id = Column(String(100))  # From payment gateway
    phone_number = Column(String(20))  # For mobile money payments
    status = Column(String(50), default="pending")  # pending, completed, failed
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime)

    user = relationship("User", back_populates="payments_made")
    course = relationship("Course", back_populates="payments")

# --- Transaction ---
class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"))
    receiver_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"))
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="SET NULL"))
    amount = Column(Float, nullable=False)
    description = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)
    is_settled = Column(Boolean, default=False)

    sender = relationship("User", foreign_keys=[sender_id], back_populates="sent_transactions")
    receiver = relationship("User", foreign_keys=[receiver_id], back_populates="received_transactions")
    course = relationship("Course")

# --- Internship ---
class Internship(Base):
    __tablename__ = "internships"

    id = Column(Integer, primary_key=True)
    title = Column(String(255))
    organization = Column(String(255))
    description = Column(Text)
    requirements = Column(Text)
    duration = Column(String(100))
    is_remote = Column(Boolean, default=False)
    posted_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    deadline = Column(DateTime)

    applications = relationship("Application", back_populates="internship", cascade="all, delete-orphan")

# --- Application ---
class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True)
    learner_id = Column(Integer, ForeignKey("learner_profiles.id", ondelete="CASCADE"))
    internship_id = Column(Integer, ForeignKey("internships.id", ondelete="CASCADE"))
    applied_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String(50), default="pending")  # pending, reviewed, accepted, rejected
    cover_letter = Column(Text)

    learner = relationship("LearnerProfile", back_populates="applications")
    internship = relationship("Internship", back_populates="applications")

# --- Mentorship Request ---
class MentorshipRequest(Base):
    __tablename__ = "mentorship_requests"

    id = Column(Integer, primary_key=True)
    learner_id = Column(Integer, ForeignKey("learner_profiles.id", ondelete="CASCADE"))
    tutor_id = Column(Integer, ForeignKey("tutor_profiles.id", ondelete="CASCADE"))
    message = Column(Text)
    status = Column(String(50), default="pending")  # pending, accepted, rejected, completed
    requested_at = Column(DateTime, default=datetime.utcnow)
    responded_at = Column(DateTime)

    learner = relationship("LearnerProfile", back_populates="mentorship_requests")
    tutor = relationship("TutorProfile", back_populates="mentorships")