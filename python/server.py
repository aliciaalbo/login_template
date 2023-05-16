from flask import Flask, request, session, jsonify
from model import connect_to_db
import user.user_functions as user_functions
import py_secrets


app = Flask(__name__)
app.secret_key = py_secrets.secret_key

connect_to_db(app)


@app.route("/api/login_user", methods=["POST"])
def login_user():
    username = request.form.get("username")
    password = request.form.get("password")
    if username is None and password is None:
        return jsonify({"error": "No username or password submitted."})
    if username is None or len(username) < 3 or password is None or len(password) < 6:
        return jsonify({"error": "Invalid username or password submitted."})
    user = user_functions.get_user(username)
    if user is not None:
        if user.check_password(password):
            session["user_id"] = user.user_id
            return jsonify ({
                "success": "Successfully logged in!",
                "user_id": user.user_id,
                "username": user.username,
            })
        else:
            return jsonify({"error": "Incorrect password. Please try again or create an account."})
    return jsonify({"error": "Username not found."})


@app.route("/api/register_user", methods=['POST'])
def register_user():
    username = request.form.get('username')
    password = request.form.get('password')
    if username is None or len(username) < 4 or password is None or len(password) < 6:
        return jsonify({"error": "Username or password is missing or too short."})
    if len(username) > 50:
        return jsonify({"error": "Username or password is too long."})

    user = user_functions.get_user(username)
    if user is not None:
        return jsonify({"error": "Username already exists. Try logging in or pick a different username."})

    user = user_functions.create_user(str(username), str(password))
    if user:
        session["user_id"] = user.user_id
        return jsonify ({
            "success": "Successfully registered!",
            "user_id": user.user_id,
            "username": user.username,
        })


# TODO: not used yet
@app.route("/api/update_user", methods=['POST'])
def update_user():
    """Updates user account information"""
    if session.get("user_id"):
        user_id = session["user_id"]
        new_username = request.json.get("newUserame")
        old_password = request.json.get("oldPassword")
        new_password = request.json.get("newPassword")

        return user_functions.update_user_account(user_id, new_username, old_password, new_password)
    else:
        return jsonify({"error": "Not current logged in."})


@app.route("/api/logout", methods=["GET", "POST"])
def log_out_user():
    session.clear()
    return jsonify({"success": "You have been logged out."})

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
