import sqlite3

# Connect to the SQLite database (or create it if it doesn't exist)
connection = sqlite3.connect('password_manager.db')
cursor = connection.cursor()

# Create the "users" table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        public_key BLOB
    )
''')


# Create the "passwords" table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS passwords (
        id INTEGER PRIMARY KEY,
        username TEXT,
        encrypted_password BLOB
    )
''')

# Commit the changes and close the connection
connection.commit()
connection.close()
