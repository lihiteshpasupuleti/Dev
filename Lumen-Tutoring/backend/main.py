from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from data import subjects
from database import get_db
from models import User, StudentProgress

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def find_or_create_user(email: str, db: Session) -> User:
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        user = User(email=email)
        db.add(user)
        db.commit()
        db.refresh(user)
    return user


class QuizResult(BaseModel):
    email: str
    subject: str
    unit_name: str
    topic_name: str
    correct: int
    total: int


@app.get("/")
def read_root():
    return {"message": "Hello from the backend"}


@app.get("/subjects")
def get_subjects():
    return subjects


@app.post("/quiz-results")
def save_quiz_result(result: QuizResult, db: Session = Depends(get_db)):
    if result.total <= 0:
        raise HTTPException(status_code=400, detail="total must be greater than 0")

    user = find_or_create_user(result.email, db)
    score = round(result.correct / result.total * 100)

    progress = (
        db.query(StudentProgress)
        .filter(
            StudentProgress.user_id == user.id,
            StudentProgress.subject == result.subject,
            StudentProgress.current_topic_name == result.topic_name,
        )
        .first()
    )

    if progress is None:
        progress = StudentProgress(
            user_id=user.id,
            subject=result.subject,
            year_level=7,
            current_unit_id=result.unit_name,
            current_topic_name=result.topic_name,
            mastery_score=score,
        )
        db.add(progress)
    else:
        progress.mastery_score = score

    db.commit()
    return {"topic": result.topic_name, "mastery_score": score}


@app.get("/progress")
def get_progress(email: str = Query(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        return []

    rows = db.query(StudentProgress).filter(StudentProgress.user_id == user.id).all()
    return [
        {
            "subject": r.subject,
            "unit": r.current_unit_id,
            "topic": r.current_topic_name,
            "mastery_score": r.mastery_score,
        }
        for r in rows
    ]