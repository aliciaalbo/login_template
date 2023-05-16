from flask import Response, jsonify, session
from model import db, User


def create_user(username: str, password: str) -> User:
    """add new user to db"""
    user = User(username=username)
    # hashes the password before storing
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return user


def update_user_account(
    user_id: int,
    new_username: str|None=None,  
    old_password: str|None=None,
    new_password: str|None=None
) -> Response:
    """Update info for a given user's account"""
    user = get_user_by_id(user_id)
    if new_username:
        existing_user = get_user(new_username)
        if existing_user:
            return jsonify({"error": "Username already exists. Try logging in or pick a different username."})
        user.username = new_username
    if new_password:
        if user.check_password(old_password):
            user.set_password(new_password)
    db.session.commit()
    return jsonify({"success": "Your account has successfully been updated."})


def get_user_by_id(user_id: int | None) -> User | None:
    """Returns a user for a given user_id"""
    if user_id is None:
        return None
    return User.query.filter(User.user_id == user_id).one_or_none()


def get_user(username: str | None) -> User | None:
    """Returns a user for a given username"""
    if username is None or username == "":
        return None
    return User.query.filter(User.username == username).one_or_none()


def load_username() -> str | None:
    user_id = session.get('user_id')
    if user_id is None:
        return None
    user = get_user_by_id(int(user_id))
    if user is None:
        return None
    return user.username
