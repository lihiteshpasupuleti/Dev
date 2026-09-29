import uuid
from sqlalchemy import Column, String, Integer, ForeignKey, TIMESTAMP, text
from sqlalchemy.dialects.postgresql import UUID
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False)
    full_name = Column(String(255))
    created_at = Column(TIMESTAMP, server_default=text("now()"))


class StudentProgress(Base):
    __tablename__ = "student_progress"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    subject = Column(String(50), nullable=False)
    year_level = Column(Integer, nullable=False)
    current_unit_id = Column(String(100))
    current_topic_name = Column(String(255))
    mastery_score = Column(Integer, default=0)
    updated_at = Column(TIMESTAMP, server_default=text("now()"))