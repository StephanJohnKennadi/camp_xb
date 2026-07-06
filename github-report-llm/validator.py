import sqlite3
import re

DB_PATH = "github_data.db"
REPORT_PATH = "report_draft.md"

def verify_citations():
    """Reads the generated report and ensures every cited PR actually exists in the DB."""
    
    try:
        with open(REPORT_PATH, 'r') as f:
            report_content = f.read()
    except FileNotFoundError:
        print("No report_draft.md found to verify.")
        return

    # Find all PR citations like [#123]
    pr_citations = re.findall(r'\[#(\d+)\]', report_content)
    
    if not pr_citations:
        print("WARNING: No PR citations found in the report. The LLM may have failed to cite its sources.")
        return
        
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    hallucinations = 0
    valid_citations = 0
    
    print("Verifying Citations...")
    for pr_num in set(pr_citations):
        cursor.execute("SELECT 1 FROM pull_requests WHERE pr_number = ?", (pr_num,))
        result = cursor.fetchone()
        
        if result:
            valid_citations += 1
            print(f"✅ Verified PR #{pr_num} exists in database.")
        else:
            hallucinations += 1
            print(f"❌ HALLUCINATION DETECTED: PR #{pr_num} does NOT exist in the database!")
            
    conn.close()
    
    print(f"\nVerification Complete: {valid_citations} Valid Citations, {hallucinations} Hallucinations.")
    if hallucinations > 0:
        print("\nACTION REQUIRED: The LLM hallucinated. You should discard this report and tweak the prompt.")
    else:
        print("\nReport is hallucination-free and ready to publish!")

if __name__ == "__main__":
    verify_citations()
