from flask import Flask, request, jsonify
from dilithium.dilithium import Dilithium2
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

users = {

    "user1": "password1",
    "user2": "password2",
}

# Initialize the SQLite database


@app.route('/', methods=['GET'])
def home():
    return jsonify(message="Welcome to the Password Manager App")


#Generate random key pair for the user
@app.route('/generate', methods=['POST'])
def generate():
    pk, sk = Dilithium2.keygen()
    # print("pk1: ", pk)
    # print("sk1: ", sk, "\n")
    return jsonify(sk=base64.b64encode(sk).decode(), pk=base64.b64encode(pk).decode())

# def add_padding(data, block_size=32):
#     padding = block_size - (len(data) % block_size)
#     if padding != 0:
#         data += bytes([padding] * padding)
#     return data

# # Padding removal function


# def remove_padding(data):
#     padding = data[-1]
#     if padding > 0:
#         if all(x == padding for x in data[-padding:]):
#             return data[:-padding]
#     return data  # No padding or incorrect padding

@app.route('/sign_message', methods=['POST'])
def sign_message():
    data = request.get_json()
    message = data.get('message')
    sk = data.get('sk')
    
    sk = base64.b64decode(sk)
    # print("sk2: ", sk)
    print("message: ", message)
    message = bytes(message,"ascii")
    signature = Dilithium2.sign(sk, message)
    return jsonify(signed=base64.b64encode(signature).decode())

@app.route('/verify_signature', methods=['POST'])
def verify_signature():
    data = request.get_json()
    message = data.get('message')
    pk = data.get('pk')
    signed = data.get('signed')
    
    pk = base64.b64decode(pk)
    message = bytes(message,"ascii")
    signed = base64.b64decode(signed)
    print("pk2: ", message)
    if (Dilithium2.verify(pk, message, signed)):
        return jsonify(message="Signature verified successfully")
    else:
        return jsonify(message="Signature verification failed, Try again...")


# @app.route('/encrypt-message', methods=['POST'])
# def store_password():
#     print("Storing password")
#     data = request.get_json()
#     message = data.get('message')
#     public_key = data.get('password')

#     # Generate a random seed of the correct length
#     seed = os.urandom(KYBER_SYM_BYTES)
#     seed = bytearray([x & 0xFF for x in seed])

#     # Retrieve the user's public key from the database
#     connection = sqlite3.connect('password_manager.db')
#     cursor = connection.cursor()
#     cursor.execute(
#         'SELECT public_key FROM users WHERE username = ?', (username,))
#     public_key = cursor.fetchone()[0]
#     connection.close()

#     # Convert public key from JSON to bytes
#     public_key = json.loads(public_key)

#     # Convert password to byte array using UTF-8 encoding
#     password_bytes = password.encode('utf-8')
#     padded_password = add_padding(password_bytes)

#     # Encrypt the password and store it in the database
#     cipher = encrypt(padded_password, public_key, seed, 2)
#     cipher_bytes = bytearray([x & 0xFF for x in cipher])

#     connection = sqlite3.connect('password_manager.db')
#     cursor = connection.cursor()
#     cursor.execute('INSERT INTO passwords (username, sitename, encrypted_password) VALUES (?, ?, ?)',
#                    (username, sitename, cipher_bytes))
#     connection.commit()
#     connection.close()

#     return jsonify(message="Password stored successfully")


# @app.route('/passwords', methods=['GET'])
# def get_passwords():
#     username = request.args.get('username')

#     connection = sqlite3.connect('password_manager.db')
#     cursor = connection.cursor()
#     cursor.execute(
#         'SELECT sitename, encrypted_password FROM passwords WHERE username = ?', (username,))
#     encrypted_passwords = cursor.fetchall()
#     connection.close()

#     # Retrieve the user's private key from the local file
#     with open('private_key.txt', 'r') as f:
#         private_key = json.loads(f.read())[username]

#     passwords = []
#     for row in encrypted_passwords:
#         sitename = row[0]
#         encrypted_password = list(row[1])
#         pwd = decrypt(encrypted_password, private_key, 2)
#         original_password = remove_padding(pwd)
#         passwords.append({"sitename": sitename, "password": bytes(
#             original_password).decode('utf-8')})

#     return jsonify(message="Passwords retrieved successfully", passwords=passwords)


if __name__ == '__main__':
    app.run(debug=True)
