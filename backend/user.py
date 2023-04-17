from model import db, connect_to_db, User, 
from sqlalchemy import func

# rename
class User():
    def __init__(self, email, fname, lname, location, password_hash, user_id=None) -> None:
        self.user_id = user_id
        self.email = email
        self.fname = fname
        self.lname = lname
        self.location = location
        self.password_hash = password_hash


    def create_user(email, fname, lname, location, password_hash):
        """add new user to db and stores their tokens"""

        user = User(email = email,
                    fname = fname,
                    lname = lname, 
                    location = location,
                    password_hash = password_hash)

        db.session.add(user)
        db.session.commit()
        return user

    
    def get_user_by_id(user_id: int | None):
        """Returns a user for a given user_id"""
        if user_id is None:
            return None
        user = User.query.filter(User.user_id == user_id).one_or_none()
        return user

    def get_user(username: str | None):
        """Returns a user for a given username"""
        if username is None or username == "":
            return None
        user = User.query.filter(User.username == username).one_or_none()
        return user

    def load_username():
        user_id = session.get('user_id')
        if user_id is None:
            return None
        user = get_user_by_id(user_id)
        if user is None:
            return None
        return user.username
