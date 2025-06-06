from config import db
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase, relationship
from sqlalchemy import String, Integer, Boolean, ForeignKey, Text, DateTime
from datetime import datetime
# from werkzeug.security import 
from typing import List, Optional


class Learner(db.Model):
    __tablename__ = "learner"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(80), nullable=False, unique=True)
    tel: Mapped[int] = mapped_column(Integer, nullable=False, unique=True)
    email: Mapped[str] = mapped_column(String(80), nullable=True, unique=True)
    password: Mapped[str] = mapped_column(String(80), nullable=False)
    image: Mapped[str] = mapped_column(String(100), nullable=True)
    description: Mapped[str] = mapped_column(Text, nullable=True)

    # relationship to mentor
    mentor_id: Mapped[int] = mapped_column(Integer, ForeignKey("mentor.id"), nullable=True)
    mentor: Mapped["Mentor"] = relationship("Mentor", back_populates="learners")

    # relationship to application
    applications: Mapped[List["Application"]] = relationship("Application", back_populates="learner", cascade="all, delete-orphan")

    # relationship to payments
    payments: Mapped[List["Payment"]] = relationship("Payment", back_populates="learner", cascade="all, delete-orphan")

    # relationship to mentorship application
    mentorship_applications: Mapped[List["MentorshipApplication"]] = relationship("MentorshipApplication", back_populates="learner", cascade="all, delete-orphan")

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "tel": self.tel,
            "email": self.email,
            "image": self.image,
            "description": self.description,

            "mentor": self.mentor.to_json() if self.mentor else None
        }

class Mentor(db.Model):
    __tablename__="mentor"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(80), nullable=False, unique=True)
    tel: Mapped[int] = mapped_column(Integer, nullable=False, unique=True)
    email: Mapped[str] = mapped_column(String(80), nullable=False, unique=True)
    profile_link: Mapped[str] = mapped_column(String(80), nullable=True, unique=True)
    type: Mapped[str]= mapped_column(String(50), nullable=True)
    rating: Mapped[int] = mapped_column(Integer)
    is_volunteer: Mapped[bool] = mapped_column(Boolean, default=False)
    image: Mapped[str] = mapped_column(String(100))

    # relationship to learner
    learners: Mapped[List["Learner"]] = relationship("Learner", back_populates="mentor", cascade="all, delete-orphan")

    # relationship to project
    projects: Mapped[List["Project"]] = relationship("Project", back_populates="mentor", cascade="all, delete-orphan")

    # relationship to payments
    payments: Mapped[List["Payment"]] = relationship("Payment", back_populates="mentor", cascade="all, delete-orphan")

    # relationship to mentorship applications
    mentorship_applications: Mapped[List["MentorshipApplication"]] = relationship("MentorshipApplication", back_populates="mentor", cascade="all, delete-orphan")

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "tel": self.tel,
            "email": self.email,
            "profile_link": self.profile_link,
            "type": self.type,
            "rating": self.rating,
            "is_volunteer": self.is_volunteer,
            "image": self.image,

            "learners": [learner.id for learner in self.learners],
            "projects": [project.id for project in self.projects]
        }

class Project(db.Model):
    __tablename__= "project"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(80), nullable=False)
    date: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow())
    description: Mapped[str] = mapped_column(Text, nullable=True)
    
    # relationship to mentor
    mentor_id: Mapped[int] = mapped_column(Integer, ForeignKey("mentor.id"), nullable=False)
    mentor: Mapped["Mentor"] = relationship("Mentor", back_populates="projects")

    # relationship to applications
    applications: Mapped[List["Application"]] = relationship("Application", back_populates="project", cascade="all, delete-orphan")


    def to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "date": self.date,
            "mentor": {
                "id": self.mentor.id,
                "name": self.mentor.name
            } if self.mentor else None
        }

class Application(db.Model):
    __tablename__ = "application"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    status: Mapped[str] = mapped_column(String(20), default="pending")  # pending, accepted, rejected
    application_date: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    message: Mapped[str] = mapped_column(Text, nullable=True)
    
    # Relationship to learner
    learner_id: Mapped[int] = mapped_column(Integer, ForeignKey("learner.id"), nullable=False)
    learner: Mapped["Learner"] = relationship("Learner", back_populates="applications")
    
    # Relationship to project
    project_id: Mapped[int] = mapped_column(Integer, ForeignKey("project.id"), nullable=False)
    project: Mapped["Project"] = relationship("Project", back_populates="applications")

    def to_json(self):
        return {
            "id": self.id,
            "status": self.status,
            "application_date": self.application_date.isoformat(),
            "message": self.message,
            "learner_id": self.learner_id,
            "project_id": self.project_id,
            "learner_name": self.learner.name if self.learner else None,
            "project_title": self.project.title if self.project else None
        }
    
class Payment(db.Model):
    __tablename__ = "payment"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    amount: Mapped[float] = mapped_column(Integer, nullable=False)
    payment_date: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    status: Mapped[str] = mapped_column(String(20), default="pending")  # pending, completed, failed
    payment_method: Mapped[str] = mapped_column(String(50))
    transaction_id: Mapped[str] = mapped_column(String(100), unique=True, nullable=True)
    phone: Mapped[str] = mapped_column(String(80), nullable=True)
    
    # Relationship to learner
    learner_id: Mapped[int] = mapped_column(Integer, ForeignKey("learner.id"), nullable=False)
    learner: Mapped["Learner"] = relationship("Learner", back_populates="payments")
    
    # Relationship to mentor (optional, if payments go to specific mentors)
    mentor_id: Mapped[int] = mapped_column(Integer, ForeignKey("mentor.id"), nullable=True)
    mentor: Mapped["Mentor"] = relationship("Mentor", back_populates="payments")
    
    # Relationship to project (optional)
    project_id: Mapped[int] = mapped_column(Integer, ForeignKey("project.id"), nullable=True)
    project: Mapped["Project"] = relationship("Project")

    def to_json(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "payment_date": self.payment_date.isoformat(),
            "status": self.status,
            "payment_method": self.payment_method,
            "transaction_id": self.transaction_id,
            "learner_id": self.learner_id,
            "mentor_id": self.mentor_id,
            "project_id": self.project_id
        }
    
class MentorshipApplication(db.Model):
    __tablename__ = "mentorship_application"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    mentor_id: Mapped[int] = mapped_column(Integer, ForeignKey("mentor.id"), nullable=False)
    project_id: Mapped[int] = mapped_column(Integer, ForeignKey("project.id"), nullable=True)
    application_date: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    status: Mapped[str] = mapped_column(String(20), default="pending")  # pending/accepted/rejected
    message: Mapped[str] = mapped_column(Text, nullable=True)
    goals: Mapped[str] = mapped_column(Text, nullable=True)  # What the learner hopes to achieve
    
    # Relationship to learner
    learner_id: Mapped[int] = mapped_column(Integer, ForeignKey("learner.id"), nullable=False)
    learner: Mapped["Learner"] = relationship("Learner", back_populates="mentorship_applications")
    
    # Relationship to Mentor
    mentor: Mapped["Mentor"] = relationship("Mentor", back_populates="mentorship_applications")
    # project: Mapped["Project"] = relationship("Project")

    def to_json(self):
        return {
            "id": self.id,
            "learner_id": self.learner_id,
            "mentor_id": self.mentor_id,
            # "project_id": self.project_id,
            "status": self.status,
            "application_date": self.application_date.isoformat(),
            "message": self.message,
            "goals": self.goals,
            "learner_name": self.learner.name if self.learner else None,
            "mentor_name": self.mentor.name if self.mentor else None,
            # "project_title": self.project.title if self.project else None
        }