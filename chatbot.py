import json
import urllib.request
import urllib.error
import psycopg2


# ============================================================
# DATABASE CONFIGURATION
# ============================================================

DB_HOST = "127.0.0.1"
DB_PORT = 5432
DB_NAME = "sih_db"
DB_USER = "postgres"
DB_PASSWORD = "YOUR_POSTGRES_PASSWORD"


# ============================================================
# OLLAMA CONFIGURATION
# ============================================================

OLLAMA_URL = "http://127.0.0.1:11434/api/chat"
OLLAMA_MODEL = "llama3.2:3b"


# ============================================================
# DATABASE CONNECTION
# ============================================================

def get_connection():
    return psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )


# ============================================================
# GET SCAN INFORMATION
# ============================================================

def get_scan_context(scan_id):

    conn = get_connection()
    cur = conn.cursor()

    try:
        query = """
        SELECT
            s.scan_id,
            s.ocr_text,
            p.product_id,
            p.product_name,
            p.manufacturer_name,
            p.brand_name,
            c.category_name,
            cr.result_id,
            cr.overall_status,
            cr.total_rules,
            cr.passed_rules,
            cr.failed_rules
        FROM scans s
        JOIN products p
            ON s.product_id = p.product_id
        JOIN categories c
            ON p.category_id = c.category_id
        LEFT JOIN compliance_results cr
            ON s.scan_id = cr.scan_id
        WHERE s.scan_id = %s
        """

        cur.execute(query, (scan_id,))
        row = cur.fetchone()

        if not row:
            raise ValueError(f"No scan found with scan_id {scan_id}")

        scan = {
            "scan_id": row[0],
            "ocr_text": row[1],
            "product_id": row[2],
            "product_name": row[3],
            "manufacturer_name": row[4],
            "brand_name": row[5],
            "category": row[6],
            "result_id": row[7],
            "overall_status": row[8],
            "total_rules": row[9] or 0,
            "passed_rules": row[10] or 0,
            "failed_rules": row[11] or 0
        }

        return scan

    finally:
        cur.close()
        conn.close()


# ============================================================
# GET RULE RESULTS
# ============================================================

def get_rule_results(scan_id):

    conn = get_connection()
    cur = conn.cursor()

    try:

        query = """
        SELECT
            r.rule_code,
            r.rule_title,
            r.description,
            r.applicability,
            r.rule_config,
            crr.status,
            crr.extracted_value,
            crr.expected_value,
            crr.remarks
        FROM compliance_rule_results crr
        JOIN compliance_results cr
            ON crr.result_id = cr.result_id
        JOIN rules r
            ON crr.rule_id = r.rule_id
        WHERE cr.scan_id = %s
        ORDER BY r.rule_id
        """

        cur.execute(query, (scan_id,))
        rows = cur.fetchall()

        rules = []

        for row in rows:

            rule = {
                "rule_code": row[0],
                "rule_title": row[1],
                "description": row[2],
                "applicability": row[3],
                "rule_config": row[4] or {},
                "status": row[5],
                "extracted_value": row[6],
                "expected_value": row[7],
                "remarks": row[8]
            }

            rules.append(rule)

        return rules

    finally:
        cur.close()
        conn.close()


# ============================================================
# CALCULATE SCORE AND RISK
# ============================================================

def calculate_score_and_risk(scan, rules):

    total_rules = scan["total_rules"]
    passed_rules = scan["passed_rules"]

    if total_rules == 0:
        score = 0
    else:
        score = (passed_rules / total_rules) * 100

    score = round(score, 2)

    if score >= 80:
        risk = "LOW"
    elif score >= 50:
        risk = "MEDIUM"
    else:
        risk = "HIGH"

    # A HIGH severity failed rule must not be LOW risk
    high_severity_failure = False

    for rule in rules:

        if rule["status"] != "FAIL":
            continue

        config = rule.get("rule_config") or {}

        severity = str(
            config.get("severity", "")
        ).upper()

        if severity == "HIGH":
            high_severity_failure = True
            break

    if high_severity_failure and risk == "LOW":
        risk = "MEDIUM"

    return score, risk


# ============================================================
# BUILD RULE SUMMARY
# ============================================================

def build_rule_summary(rules):

    summary = []

    for rule in rules:

        config = rule.get("rule_config") or {}

        summary.append({
            "rule_code": rule.get("rule_code"),
            "rule_title": rule.get("rule_title"),
            "status": rule.get("status"),
            "extracted_value": rule.get("extracted_value"),
            "expected_value": rule.get("expected_value"),
            "remarks": rule.get("remarks"),
            "severity": config.get("severity")
        })

    return summary


# ============================================================
# CALL OLLAMA
# ============================================================

def ask_ollama(question, context):

    system_prompt = """
You are an AI assistant for a product-label compliance checking system.

Your job is to explain the results of ONE SPECIFIC PRODUCT SCAN.

STRICT RULES:

1. Use ONLY the information provided in the scan context.

2. NEVER invent a failed rule.

3. NEVER invent extracted values.

4. NEVER invent expected values.

5. NEVER invent remarks or reasons for failure.

6. NEVER say that a rule failed if its actual status is PASS.

7. If the user asks why the product is non-compliant, discuss ONLY rules whose actual status is FAIL.

8. If there are no failed rules, clearly say that no checked rules failed.

9. Do not create hypothetical examples unless the user explicitly asks for a hypothetical example.

10. Do not use the current product's values as a hypothetical example.

11. If information is not present in the scan context, say:
   "That information is not available in the current scan data."

12. The word COMPLIANT refers ONLY to the rules checked by this system.

13. Never claim that the product satisfies every law or regulation.

14. Never invent laws, regulations, rule numbers, penalties, government authorities,
    legal requirements or regulatory standards.

15. When explaining a failed rule, include:
    - Rule code
    - Rule title
    - Actual extracted value
    - Expected value
    - Actual remarks
    - Practical corrective action based only on the available information

16. If all rules passed, say that all checked rules passed and no failure was detected.

17. Keep answers concise and easy to understand.

18. Do not make unsupported assumptions.
"""

    user_prompt = f"""
USER QUESTION:
{question}

SCAN CONTEXT:
{json.dumps(context, indent=2, default=str)}

Answer the user's question using ONLY the scan context.
"""

    payload = {
        "model": OLLAMA_MODEL,
        "messages": [
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ],
        "stream": False,
        "options": {
            "temperature": 0.1
        }
    }

    data = json.dumps(payload).encode("utf-8")

    request = urllib.request.Request(
        OLLAMA_URL,
        data=data,
        headers={
            "Content-Type": "application/json"
        },
        method="POST"
    )

    try:

        with urllib.request.urlopen(
            request,
            timeout=120
        ) as response:

            result = json.loads(
                response.read().decode("utf-8")
            )

            return result["message"]["content"]

    except urllib.error.URLError as error:

        raise RuntimeError(
            f"Could not connect to Ollama: {error}"
        )

    except Exception as error:

        raise RuntimeError(
            f"Ollama request failed: {error}"
        )


# ============================================================
# MAIN CHAT FUNCTION
# ============================================================

def chat_with_compliance(question, scan_id):

    # --------------------------------------------------------
    # 1. Get scan
    # --------------------------------------------------------

    scan = get_scan_context(scan_id)

    # --------------------------------------------------------
    # 2. Get rule results
    # --------------------------------------------------------

    rules = get_rule_results(scan_id)

    # --------------------------------------------------------
    # 3. Calculate score and risk
    # --------------------------------------------------------

    score, risk = calculate_score_and_risk(
        scan,
        rules
    )

    # --------------------------------------------------------
    # 4. Build rule information
    # --------------------------------------------------------

    rule_summary = build_rule_summary(rules)

    # --------------------------------------------------------
    # 5. Build context for AI
    # --------------------------------------------------------

    context = {
        "scan": {
            "scan_id": scan["scan_id"],
            "product_id": scan["product_id"],
            "product_name": scan["product_name"],
            "manufacturer_name": scan["manufacturer_name"],
            "brand_name": scan["brand_name"],
            "category": scan["category"],
            "overall_status": scan["overall_status"],
            "total_rules": scan["total_rules"],
            "passed_rules": scan["passed_rules"],
            "failed_rules": scan["failed_rules"],
            "compliance_score": score,
            "risk_level": risk
        },

        "rules": rule_summary
    }

    # --------------------------------------------------------
    # 6. Ask AI
    # --------------------------------------------------------

    answer = ask_ollama(
        question,
        context
    )

    # --------------------------------------------------------
    # 7. Return result
    # --------------------------------------------------------

    return {
        "scan_id": scan["scan_id"],
        "product_name": scan["product_name"],
        "category": scan["category"],
        "compliance_score": score,
        "risk_level": risk,
        "overall_status": scan["overall_status"],
        "answer": answer
    }