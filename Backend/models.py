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
    description: Mapped[str] = mapped_column(Text, nullable=True)
    
    # relationship to mentor
    mentor_id: Mapped[int] = mapped_column(Integer, ForeignKey("mentor.id"), nullable=False)
    mentor: Mapped["Mentor"] = relationship("Mentor", back_populates="projects")

    def to_json(self):
        return {
            "title": self.title,
            "description": self.description,
            "mentor": {
                "id": self.mentor.id,
                "name": self.mentor.name
            } if self.mentor else None
        }

