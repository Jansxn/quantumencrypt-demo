# Database setup (e.g., using SQLite or another database)
import hashlib
import sqlite3
from Crypto.Random import get_random_bytes
from cpake import generate_kyber_keys
from params import KYBER_512SK_BYTES, KYBER_SYM_BYTES
from Crypto.Hash import SHA3_256
from util import cast_to_byte
from params import KYBER_N
import json
import os
import hashlib
from cpake import generate_kyber_keys, encrypt, decrypt


def register_user(username, password):

    # Generate a key pair for the user
    private_key, public_key = generate_kyber_keys(2)

    # Serialize the public_key to JSON
    public_key_json = json.dumps(public_key)

    # Store the serialized public_key and username in the database
    connection = sqlite3.connect('password_manager.db')
    cursor = connection.cursor()
    cursor.execute(
        'INSERT INTO users (username, public_key) VALUES (?, ?)', (username, public_key_json))
    connection.commit()
    connection.close()

    print('public key:', public_key)

    return private_key


def add_padding(data, block_size=32):
    padding = block_size - (len(data) % block_size)
    if padding != 0:
        data += bytes([padding] * padding)
    return data

# Padding removal function


def remove_padding(data):
    padding = data[-1]
    if padding > 0:
        if all(x == padding for x in data[-padding:]):
            return data[:-padding]
    return data  # No padding or incorrect padding


def store_password(username, password):
    # Retrieve the user's public key from the database
    connection = sqlite3.connect('password_manager.db')
    cursor = connection.cursor()
    cursor.execute(
        'SELECT public_key FROM users WHERE username = ?', (username,))
    public_key = cursor.fetchone()[0]
    connection.close()
    # Generate a random seed of the correct length
    seed = os.urandom(KYBER_SYM_BYTES)
    seed = bytearray([x & 0xFF for x in seed])

    # Convert public key from JSON to bytes
    public_key = json.loads(public_key)

    expected_length = KYBER_N

    # Convert password to byte array using UTF-8 encoding
    password_bytes = password.encode('utf-8')
    padded_password = add_padding(password_bytes)

    print('padded password:', padded_password)

    # Encrypt the password and store it in the database
    cipher = encrypt(padded_password, public_key, seed, 2)
    cipher_bytes = bytearray([x & 0xFF for x in cipher])

    print('seed:', seed)
    print('public key:', public_key)

    print('cipher message:', cipher)
    print('cipher bytes:', cipher_bytes)

    connection = sqlite3.connect('password_manager.db')
    cursor = connection.cursor()
    cursor.execute('INSERT INTO passwords (username, encrypted_password) VALUES (?, ?)',
                   (username, cipher_bytes))
    connection.commit()
    connection.close()


def retrieve_password(username, private_key):
    # Retrieve the encrypted password from the database
    connection = sqlite3.connect('password_manager.db')
    cursor = connection.cursor()
    cursor.execute(
        'SELECT encrypted_password FROM passwords WHERE username = ?', (username,))
    encrypted_password = cursor.fetchone()[0]
    connection.close()

    # Convert the encrypted password from bytes to a list
    encrypted_password = list(encrypted_password)

    print('encrypted password:', encrypted_password)

    pwd = decrypt(encrypted_password, private_key, 2)

    original_password = remove_padding(pwd)

    return bytes(original_password).decode('utf-8')


# Main program
if __name__ == '__main__':
    pk = register_user('user0102', 'password1')
    print('private Key:', pk)

    store_password('user0102', 'abc21122')

    retrieved_password = retrieve_password('user0102', pk)
    print('Retrieved Password:', retrieved_password)
