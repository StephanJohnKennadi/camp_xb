import os
import requests
import sqlite3
# pyrefly: ignore [missing-import]
from dotenv import load_dotenv

load_dotenv()

GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
TARGET_REPO = os.getenv('TARGET_REPO')
DB_PATH = "github_data.db"

HEADERS = {
    "Accept": "application/vnd.github.v3+json",
}

if GITHUB_TOKEN and GITHUB_TOKEN != "your_github_personal_access_token_here":
    HEADERS["Authorization"] = f"token {GITHUB_TOKEN}"

def fetch_recent_prs(owner, repo, limit=20):
    url = f"https://api.github.com/repos/{owner}/{repo}/pulls?state=closed&per_page={limit}&sort=updated&direction=desc"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    
    prs = response.json()
    merged_prs = [pr for pr in prs if pr.get('merged_at')]
    return merged_prs

def fetch_commits_for_pr(owner, repo, pr_number):
    url = f"https://api.github.com/repos/{owner}/{repo}/pulls/{pr_number}/commits"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    return response.json()

def load_data_to_db(prs, owner, repo):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    for pr in prs:
        # Insert PR
        try:
            cursor.execute('''
                INSERT OR IGNORE INTO pull_requests 
                (pr_number, title, author, state, created_at, merged_at, body)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (
                pr['number'], 
                pr['title'], 
                pr['user']['login'], 
                pr['state'], 
                pr['created_at'], 
                pr['merged_at'], 
                pr['body']
            ))
            
            # Fetch and Insert Commits for this PR
            commits = fetch_commits_for_pr(owner, repo, pr['number'])
            for commit in commits:
                cursor.execute('''
                    INSERT OR IGNORE INTO commits 
                    (sha, author, date, message, pr_number)
                    VALUES (?, ?, ?, ?, ?)
                ''', (
                    commit['sha'],
                    commit['commit']['author']['name'],
                    commit['commit']['author']['date'],
                    commit['commit']['message'],
                    pr['number']
                ))
            
        except Exception as e:
            print(f"Error processing PR {pr['number']}: {e}")
            
    conn.commit()
    conn.close()
    print(f"Loaded {len(prs)} PRs and their commits into the database.")

if __name__ == "__main__":
    if not TARGET_REPO:
        print("Please set TARGET_REPO in your .env file.")
        exit(1)
        
    owner, repo = TARGET_REPO.split('/')
    print(f"Fetching recent merged PRs for {TARGET_REPO}...")
    try:
        prs = fetch_recent_prs(owner, repo)
        load_data_to_db(prs, owner, repo)
    except Exception as e:
        print(f"Failed to fetch data: {e}")
