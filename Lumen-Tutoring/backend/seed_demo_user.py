from database import SessionLocal
from models import User

db = SessionLocal()

user = db.query(User).filter(User.email == "demo@accel.academy").first()

if user is None:
    user = User(email="demo@accel.academy", full_name="Demo Student")
    db.add(user)
    db.commit()
    db.refresh(user)
    print("Created demo user:", user.id)
else:
    print("Demo user already exists:", user.id)

db.close()