from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import py_secrets


db = SQLAlchemy()

class User(db.Model):
    """stores user data"""
    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(255))
    password_hash = db.Column(db.String(128))

    def __repr__(self):
        return f"<User user_id={self.user_id} username={self.username}>"

    def to_dict(self):
        user = {
            "user_id": self.user_id,
            "username": self.username,
        }
        return user

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def as_dict(self):
        return { c.name: getattr(self, c.name) for c in self.__table__.columns }

def connect_to_db(flask_app, db_uri=py_secrets.db_uri, echo=False):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')


if __name__ == '__main__':
    from server import app
    connect_to_db(app)
