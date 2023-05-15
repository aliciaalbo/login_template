from flask import session
from model import db, User


def create_user(username, password_hash):
    """add new user to db and stores their tokens"""
    user = User(username=username,
                password_hash=password_hash)

    db.session.add(user)
    db.session.commit()
    return user


def get_user_by_id(user_id: int | None):
    """Returns a user for a given user_id"""
    if user_id is None:
        return None
    return User.query.filter(User.user_id == user_id).one_or_none()


def get_user(username: str | None):
    """Returns a user for a given username"""
    if username is None or username == "":
        return None
    return User.query.filter(User.username == username).one_or_none()


def load_username():
    user_id = session.get('user_id')
    if user_id is None:
        return None
    user = get_user_by_id(user_id)
    if user is None:
        return None
    return user.username
