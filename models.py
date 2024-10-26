from sqlalchemy import Column, Integer, String, Enum, Boolean
from sqlalchemy.ext.declarative import declarative_base
from enums import Sentiment

Base = declarative_base()

class Komentar(Base):
    __tablename__ = 'Komentar'

    Id = Column(Integer, primary_key=True, autoincrement=True)
    Komentar = Column(String(255), nullable=False, unique=True)
    Sentimen = Column(Enum(Sentiment), nullable=False)

    # Multi-label classification fields as booleans
    HS = Column(Boolean, default=False)
    Abusive = Column(Boolean, default=False)
    HS_Individual = Column(Boolean, default=False)
    HS_Group = Column(Boolean, default=False)
    HS_Religion = Column(Boolean, default=False)
    HS_Race = Column(Boolean, default=False)
    HS_Physical = Column(Boolean, default=False)
    HS_Gender = Column(Boolean, default=False)
    HS_Other = Column(Boolean, default=False)
    HS_Weak = Column(Boolean, default=False)
    HS_Moderate = Column(Boolean, default=False)
    HS_Strong = Column(Boolean, default=False)
