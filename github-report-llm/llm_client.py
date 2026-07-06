import sqlite3
import requests
import json

DB_PATH = "github_data.db"
OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama3.1"

def get_context_from_db():
    """Phase 3: Context Assembly. Fetch PRs and their commits."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Fetch recent PRs
    cursor.execute("SELECT pr_number, title, author, body FROM pull_requests LIMIT 10")
    prs = cursor.fetchall()
    
    context = "## GitHub Repository Recent Activity Context\n\n"
    
    for pr in prs:
        pr_num, title, author, body = pr
        context += f"### Pull Request [#{pr_num}]\n"
        context += f"Title: {title}\nAuthor: {author}\nDescription: {body}\n\n"
        
        # Fetch commits for this PR
        cursor.execute("SELECT sha, message FROM commits WHERE pr_number = ?", (pr_num,))
        commits = cursor.fetchall()
        if commits:
            context += "Commits in this PR:\n"
            for commit in commits:
                sha, msg = commit
                clean_msg = msg.split('\n')[0] # Just take first line
                context += f"- [Commit {sha[:7]}]: {clean_msg}\n"
        context += "\n---\n"
        
    conn.close()
    return context

def ask_ollama(prompt, system_prompt="You are a helpful assistant."):
    """Send a prompt to the local Ollama instance."""
    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "system": system_prompt,
        "stream": False
    }
    
    response = requests.post(OLLAMA_URL, json=payload)
    response.raise_for_status()
    return response.json()['response']

def run_pipeline():
    print("Gathering facts from database...")
    context = get_context_from_db()
    
    if not context or "Pull Request" not in context:
        print("No data found in database. Did you run github_client.py first?")
        return None
    
    print(f"\nExtracted Context ({len(context)} characters). Sending to Fact Extractor Agent...")
    
    # Agent 1: Fact Extraction
    extractor_prompt = f"""
    Read the following GitHub Context. Extract the 5 most important factual changes made.
    You MUST output them as a bulleted list. 
    You MUST include the exact PR number (e.g. [#123]) or Commit Hash (e.g. [Commit a1b2c3d]) at the end of every bullet point.
    Do not hallucinate. If it is not in the context, do not write it.
    
    CONTEXT:
    {context}
    """
    
    facts = ask_ollama(extractor_prompt, system_prompt="You are a strict data extraction robot. Output ONLY bullet points.")
    
    print("\n--- FACT EXTRACTOR OUTPUT ---")
    print(facts)
    print("-----------------------------\n")
    
    print("Sending facts to Report Writer Agent...")
    
    # Agent 2: Report Writing
    writer_prompt = f"""
    Turn the following factual bullet points into a professional, cohesive "Weekly Developer Report".
    Keep the tone professional.
    You MUST preserve the PR/Commit citations (e.g. [#123]) in your final text.
    
    FACTS:
    {facts}
    """
    
    final_report = ask_ollama(writer_prompt, system_prompt="You are a Technical Program Manager writing a status report.")
    
    print("\n--- FINAL REPORT ---")
    print(final_report)
    print("--------------------\n")
    
    # Save the report
    with open("report_draft.md", "w") as f:
        f.write(final_report)
    print("\nDraft saved to report_draft.md")
    
    return final_report

if __name__ == "__main__":
    run_pipeline()
