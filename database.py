from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from models import Base, Komentar
DATABASE_URL = "mysql://root:@localhost/"
engine = create_engine(DATABASE_URL)

# Create the database if it does not exist
with engine.connect() as connection:
    connection.execute(text("CREATE DATABASE IF NOT EXISTS db_safe_speak"))
    connection.execute(text("USE db_safe_speak"))

DATABASE_URL = "mysql://root:@localhost/db_safe_speak"
engine = create_engine(DATABASE_URL)


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)
# Dependency to get the DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()