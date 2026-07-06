import sqlite3
import os

DB_PATH = "github_data.db"

def init_db():
    print(f"Initializing database at {DB_PATH}...")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Table for Pull Requests
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS pull_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pr_number INTEGER UNIQUE,
            title TEXT,
            author TEXT,
            state TEXT,
            created_at TEXT,
            merged_at TEXT,
            body TEXT,
            diff_summary TEXT
        )
    ''')

    # Table for Commits
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS commits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sha TEXT UNIQUE,
            author TEXT,
            date TEXT,
            message TEXT,
            pr_number INTEGER,
            FOREIGN KEY(pr_number) REFERENCES pull_requests(pr_number)
        )
    ''')

    # Table for Generated Reports (to track history)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS reports (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at TEXT,
            timeframe_start TEXT,
            timeframe_end TEXT,
            content TEXT
        )
    ''')

    conn.commit()
    conn.close()
    print("Database initialized successfully.")

if __name__ == "__main__":
    init_db()
