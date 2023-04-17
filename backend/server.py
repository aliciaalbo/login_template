from flask import (Flask)
from model import connect_to_db
import secret


app = Flask(__name__)
app.secret_key = secret.secret_key

connect_to_db(app)

@app.route('/login', methods=['GET', 'POST'])
def login_page():
    username = request.form.get('username')
    password = request.form.get('password')
    if username is None and password is None:
        return render_template('login.html')
    if username is None or len(username) < 3 or password is None or len(password) < 6:
        return render_template('login.html', error="Username or password is missing or too short.")
    user = user_functions.get_user(username)
    if user:
        if user.check_password(password):
            session["user_id"] = user.user_id
            return redirect('/')
        error = "Incorrect password. Please try again or create a new account."
    else:
        error = "Sorry, but no account exists with that email."
    return render_template('login.html', error=error)


@app.route('/signup', methods=['POST'])
def signup():
    username = request.form.get('username')
    password = request.form.get('password')
    if username is None or len(username) < 4 or password is None or len(password) < 6:
        return render_template('login.html', error="Username or password is missing or too short.")
    user = user_functions.get_user(username)
    if user:
        return render_template('login.html', error="Username already exists - try logging in or pick a new name.")
    user = user_functions.create_user(str(username), str(password))
    if user:
        session["user_id"] = user.user_id
        return redirect('/')
    return render_template('login.html', error="Sorry, but the username/password is incorrect.")


@app.route("/logout", methods=["GET", "POST"])
def log_out_user():
    """Log a user out and show them they were successful or not."""
    user_id = session.pop("user_id")
    return render_template('login.html', success="Success! You were logged out.")


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)