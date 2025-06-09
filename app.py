from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import json
import os

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# Path to user data file
USER_DATA_FILE = os.path.join(os.path.dirname(__file__), "users.json")

# Ensure the file exists
if not os.path.exists(USER_DATA_FILE):
    with open(USER_DATA_FILE, 'w') as f:
        json.dump([], f)

# Load users
def load_users():
    with open(USER_DATA_FILE, "r") as f:
        return json.load(f)

# Save users
def save_users(users):
    with open(USER_DATA_FILE, "w") as f:
        json.dump(users, f, indent=4)

# Register API
@app.route('/api/register/page', methods=['POST'])
def register():
    data = request.json
    users = load_users()

    if any(user["username"] == data["username"] for user in users):
        return jsonify({"error": "Username already taken"}), 400
    print("Here")

    hashed_password = bcrypt.generate_password_hash(data["password"]).decode('utf-8')
    
    new_user = {
        "username": data["username"],  # email
        "name": data["name"],
        "password": hashed_password
    }
    print("user saved")

    users.append(new_user)
    save_users(users)
    print("returnng response")
    return jsonify({
        "message": "User registered successfully",
        "username": data["username"],
        "name": data["name"]
    }), 200

# Login API
@app.route('/api/login/page', methods=['POST'])
def login():
    data = request.json
    users = load_users()

    for user in users:
        if user["username"] == data["username"] and bcrypt.check_password_hash(user["password"], data["password"]):
            return jsonify({
                "username": user["username"],
                "name": user["name"]
            }), 200

    return jsonify({"error": "Invalid username or password"}), 401

# Run the app
if __name__ == '__main__':
    app.run(debug=True)