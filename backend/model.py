from tokenize import group
from flask_sqlalchemy import SQLAlchemy
import secret


db = SQLAlchemy()

class User(db.Model):
    """stores user data"""
    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String)
    fname = db.Column(db.String)
    lname = db.Column(db.String)
    location = db.Column(db.String)
    password_hash = db.Column(db.String)
