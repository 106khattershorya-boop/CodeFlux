import json
import re
import os
from datetime import datetime

import psycopg2
from psycopg2.extras import Json


# ============================================================
# DATABASE CONFIGURATION
# ============================================================

DB_HOST = "127.0.0.1"
DB_PORT = 5432
DB_NAME = "sih_db"
DB_USER = "postgres"


# ============================================================
# FILE CONFIGURATION
# ============================================================

RESULT_FILE = "result.json"
OCR_FILE = "ocr_data.json"
RULES_FILE = "rules.json"
FINAL_FILE = "database_compliance_result.json"


# ============================================================
# LOAD JSON
# ============================================================

def load_json(filename):

    try:
        with open(filename, "r", encoding="utf-8") as file:
            return json.load(file)

    except FileNotFoundError:
        print(f"[ERROR] {filename} not found.")
        return None

    except json.JSONDecodeError:
        print(f"[ERROR] {filename} contains invalid JSON.")
        return None


# ============================================================
# CATEGORY DETECTION
# ============================================================

def detect_category(product_name):

    if not product_name:
        return "Packaged Items"

    name = product_name.lower()

    pharma_keywords = [
        "tablet",
        "capsule",
        "syrup",
        "medicine",
        "medication",
        "ointment",
        "injection",
        "drug",
        "pharma"
    ]

    cosmetic_keywords = [
        "lipstick",
        "lip balm",
        "foundation",
        "concealer",
        "mascara",
        "eyeliner",
        "cream",
        "lotion",
        "shampoo",
        "conditioner",
        "face wash",
        "moisturizer",
        "serum",
        "cosmetic",
        "makeup",
        "soap",
        "perfume"
    ]

    food_keywords = [
        "biscuit",
        "cookie",
        "chips",
        "namkeen",
        "snack",
        "noodles",
        "rice",
        "flour",
        "atta",
        "dal",
        "pasta",
        "chocolate",
        "candy",
        "juice",
        "drink",
        "food",
        "spice",
        "masala",
        "sauce",
        "ketchup",
        "bread",
        "milk"
    ]

    household_keywords = [
        "detergent",
        "cleaner",
        "dishwash",
        "floor cleaner",
        "toilet cleaner",
        "phenyl"
    ]

    stationery_keywords = [
        "pen",
        "pencil",
        "notebook",
        "marker",
        "eraser",
        "stationery"
    ]

    electronics_keywords = [
        "charger",
        "earphone",
        "headphone",
        "mouse",
        "keyboard",
        "cable",
        "battery",
        "adapter",
        "electronic"
    ]

    for keyword in pharma_keywords:
        if keyword in name:
            return "Pharma"

    for keyword in cosmetic_keywords:
        if keyword in name:
            return "Cosmetics"

    for keyword in food_keywords:
        if keyword in name:
            return "Packaged Items"

    for keyword in household_keywords:
        if keyword in name:
            return "Household"

    for keyword in stationery_keywords:
        if keyword in name:
            return "Stationery"

    for keyword in electronics_keywords:
        if keyword in name:
            return "Electronics"

    return "Packaged Items"


# ============================================================
# DATABASE CONNECTION
# ============================================================

def connect_database():

    print("\nConnecting to PostgreSQL...")

    try:

        connection = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            port=DB_PORT,
            user=DB_USER
        )

        print("[OK] PostgreSQL connection successful")

        return connection

    except psycopg2.Error as error:

        print("\n[ERROR] Could not connect to PostgreSQL")
        print(error)

        return None


# ============================================================
# GET CATEGORY ID
# ============================================================

def get_category_id(cursor, category_name):

    cursor.execute(
        """
        SELECT category_id
        FROM categories
        WHERE LOWER(category_name) = LOWER(%s)
        """,
        (category_name,)
    )

    result = cursor.fetchone()

    if result:
        return result[0]

    print(f"[ERROR] Category '{category_name}' not found.")

    return None


# ============================================================
# INSERT PRODUCT
# ============================================================

def insert_product(cursor, product_data, category_id):

    product_name = product_data.get("product_name")
    manufacturer = product_data.get("manufacturer")

    cursor.execute(
        """
        INSERT INTO products
        (
            category_id,
            product_name,
            manufacturer_name,
            brand_name
        )
        VALUES (%s, %s, %s, %s)
        RETURNING product_id
        """,
        (
            category_id,
            product_name,
            manufacturer,
            None
        )
    )

    product_id = cursor.fetchone()[0]

    print(f"[OK] Product inserted. product_id = {product_id}")

    return product_id


# ============================================================
# INSERT SCAN
# ============================================================

def insert_scan(cursor, product_id, image_path, ocr_text):

    cursor.execute(
        """
        INSERT INTO scans
        (
            product_id,
            image_path,
            ocr_text
        )
        VALUES (%s, %s, %s)
        RETURNING scan_id
        """,
        (
            product_id,
            image_path,
            ocr_text
        )
    )

    scan_id = cursor.fetchone()[0]

    print(f"[OK] Scan inserted. scan_id = {scan_id}")

    return scan_id


# ============================================================
# FIELD VALIDATION
# ============================================================

def is_present(value):

    if value is None:
        return False

    if isinstance(value, str):
        return value.strip() != ""

    return True


def valid_mrp(value):

    if value is None:
        return False

    try:

        number = float(value)

        return number > 0

    except (ValueError, TypeError):

        return False


def valid_quantity(value):

    if not is_present(value):
        return False

    match = re.search(
        r"(\d+(?:\.\d+)?)\s*(mg|g|kg|ml|l|pcs?|pieces?)",
        str(value),
        re.IGNORECASE
    )

    if not match:
        return False

    try:

        number = float(match.group(1))

        return number > 0

    except ValueError:

        return False


def parse_date(value):

    if not is_present(value):
        return None

    value = str(value).strip()

    formats = [
        "%Y/%m",
        "%Y-%m",
        "%m/%Y",
        "%m-%Y",
        "%Y/%m/%d",
        "%Y-%m-%d",
        "%d/%m/%Y",
        "%d-%m-%Y"
    ]

    for fmt in formats:

        try:
            return datetime.strptime(value, fmt)

        except ValueError:
            continue

    return None


def valid_date(value):

    return parse_date(value) is not None


# ============================================================
# RULE CHECKING
# ============================================================

def check_rule(rule, product_data):

    rule_code = rule["rule_code"]

    config = rule.get("rule_config") or {}

    field = config.get("field")

    # --------------------------------------------------------
    # JSON-driven rules
    # --------------------------------------------------------

    if field:

        value = product_data.get(field)

        # Product name
        if field == "product_name":

            passed = is_present(value)

            expected = "Product/common name"

            remarks = (
                "Product name is present."
                if passed
                else "Product name is missing."
            )

        # MRP
        elif field == "mrp":

            passed = valid_mrp(value)

            expected = "Valid positive MRP"

            remarks = (
                "MRP is present and valid."
                if passed
                else "MRP is missing or invalid."
            )

        # Net quantity
        elif field == "net_quantity":

            passed = valid_quantity(value)

            expected = "Valid net quantity with standard unit"

            remarks = (
                "Net quantity is present and valid."
                if passed
                else "Net quantity is missing or invalid."
            )

        # Batch number
        elif field == "batch_number":

            passed = is_present(value)

            expected = "Batch number"

            remarks = (
                "Batch number is present."
                if passed
                else "Batch number is missing."
            )

        # Manufacturer
        elif field == "manufacturer":

            passed = is_present(value)

            expected = "Manufacturer name"

            remarks = (
                "Manufacturer name is present."
                if passed
                else "Manufacturer name is missing."
            )

        # Manufacturer address
        elif field == "manufacturer_address":

            passed = is_present(value)

            expected = "Manufacturer address"

            remarks = (
                "Manufacturer address is present."
                if passed
                else "Manufacturer address is missing."
            )

        # Country of origin
        elif field == "country_of_origin":

            passed = is_present(value)

            expected = "Country of origin"

            remarks = (
                "Country of origin is present."
                if passed
                else "Country of origin is missing."
            )

        # Production date
        elif field == "production_date":

            passed = valid_date(value)

            expected = "Valid production/manufacturing date"

            remarks = (
                "Production date is present and valid."
                if passed
                else "Production date is missing or invalid."
            )

        # Expiry date
        elif field == "expiry_date":

            expiry = parse_date(value)

            production = parse_date(
                product_data.get("production_date")
            )

            if expiry is None:

                passed = False

                remarks = "Expiry date is missing or invalid."

            elif production is not None and expiry <= production:

                passed = False

                remarks = (
                    "Expiry date must be later than production date."
                )

            else:

                passed = True

                remarks = "Expiry date is present and valid."

            expected = "Valid expiry date later than production date"

        else:

            passed = is_present(value)

            expected = f"Value for {field}"

            remarks = (
                f"{field} is present."
                if passed
                else f"{field} is missing."
            )

        extracted_value = "" if value is None else str(value)

        return (
            passed,
            extracted_value,
            expected,
            remarks
        )

    # --------------------------------------------------------
    # Backward compatibility with old LMPC rules
    # --------------------------------------------------------

    if rule_code == "LMPC-001":

        manufacturer = product_data.get("manufacturer")
        address = product_data.get("manufacturer_address")

        passed = (
            is_present(manufacturer)
            and is_present(address)
        )

        extracted_value = (
            f"Manufacturer: {manufacturer}\n"
            f"Address: {address}"
        )

        expected_value = "Manufacturer name and address"

        remarks = (
            "Manufacturer name and address are present."
            if passed
            else "Manufacturer information is incomplete."
        )

        return (
            passed,
            extracted_value,
            expected_value,
            remarks
        )

    if rule_code == "LMPC-002":

        value = product_data.get("product_name")

        passed = is_present(value)

        return (
            passed,
            str(value) if value else "",
            "Product/common name",
            "Product name is present."
            if passed
            else "Product/common name is missing."
        )

    if rule_code == "LMPC-003":

        value = product_data.get("net_quantity")

        passed = valid_quantity(value)

        return (
            passed,
            str(value) if value else "",
            "Valid net quantity with standard unit",
            "Net quantity is present and valid."
            if passed
            else "Net quantity is missing or invalid."
        )

    if rule_code == "LMPC-004":

        value = product_data.get("production_date")

        passed = valid_date(value)

        return (
            passed,
            str(value) if value else "",
            "Valid month and year of manufacture",
            "Production date is present and valid."
            if passed
            else "Production date is missing or invalid."
        )

    return (
        False,
        "",
        "",
        f"No compliance logic implemented for {rule_code}."
    )


# ============================================================
# COMPLIANCE SCORE + RISK LEVEL
# ============================================================

def calculate_compliance_score_and_risk(
    rules,
    rule_results,
    total_rules,
    passed_rules
):

    """
    Calculate the compliance score and risk level.

    Score:
        passed / total * 100

    Base risk:
        80-100  -> LOW
        50-79   -> MEDIUM
        0-49    -> HIGH

    Severity adjustment:
        A failed HIGH-severity rule means risk
        cannot be LOW.
    """

    # --------------------------------------------------------
    # Compliance Score
    # --------------------------------------------------------

    if total_rules == 0:

        score = 0.0

    else:

        score = (
            passed_rules / total_rules
        ) * 100

    score = round(score, 2)


    # --------------------------------------------------------
    # Base Risk
    # --------------------------------------------------------

    if score >= 80:

        risk_level = "LOW"

    elif score >= 50:

        risk_level = "MEDIUM"

    else:

        risk_level = "HIGH"


    # --------------------------------------------------------
    # Severity-based Risk Adjustment
    # --------------------------------------------------------

    high_severity_failure = False

    rule_lookup = {
        rule["rule_id"]: rule
        for rule in rules
    }

    for result in rule_results:

        if result["status"] != "FAIL":
            continue

        rule = rule_lookup.get(
            result["rule_id"]
        )

        if not rule:
            continue

        config = rule.get("rule_config") or {}

        severity = str(
            config.get("severity", "")
        ).upper()

        if severity == "HIGH":

            high_severity_failure = True

            break


    # --------------------------------------------------------
    # HIGH severity failure
    # --------------------------------------------------------

    if high_severity_failure:

        if risk_level == "LOW":

            risk_level = "MEDIUM"


    return score, risk_level


# ============================================================
# FETCH RULES FROM DATABASE
# ============================================================

def fetch_rules(cursor, category_id):

    cursor.execute(
        """
        SELECT
            r.rule_id,
            r.rule_code,
            r.rule_reference,
            r.rule_title,
            r.description,
            r.applicability,
            r.rule_config,
            r.active
        FROM rules r
        INNER JOIN category_rules cr
            ON r.rule_id = cr.rule_id
        WHERE cr.category_id = %s
          AND r.active = TRUE
        ORDER BY r.rule_id
        """,
        (category_id,)
    )

    rows = cursor.fetchall()

    rules = []

    for row in rows:

        rules.append({
            "rule_id": row[0],
            "rule_code": row[1],
            "rule_reference": row[2],
            "rule_title": row[3],
            "description": row[4],
            "applicability": row[5],
            "rule_config": row[6],
            "active": row[7]
        })

    return rules


# ============================================================
# SAVE COMPLIANCE RESULT
# ============================================================

def save_compliance_result(
    cursor,
    scan_id,
    overall_status,
    total_rules,
    passed_rules,
    failed_rules
):

    cursor.execute(
        """
        INSERT INTO compliance_results
        (
            scan_id,
            overall_status,
            total_rules,
            passed_rules,
            failed_rules
        )
        VALUES (%s, %s, %s, %s, %s)
        RETURNING result_id
        """,
        (
            scan_id,
            overall_status,
            total_rules,
            passed_rules,
            failed_rules
        )
    )

    return cursor.fetchone()[0]


# ============================================================
# SAVE INDIVIDUAL RULE RESULT
# ============================================================

def save_rule_result(
    cursor,
    result_id,
    rule_id,
    status,
    extracted_value,
    expected_value,
    remarks
):

    cursor.execute(
        """
        INSERT INTO compliance_rule_results
        (
            result_id,
            rule_id,
            status,
            extracted_value,
            expected_value,
            remarks
        )
        VALUES (%s, %s, %s, %s, %s, %s)
        """,
        (
            result_id,
            rule_id,
            status,
            extracted_value,
            expected_value,
            remarks
        )
    )


# ============================================================
# MAIN DATABASE COMPLIANCE FUNCTION
# ============================================================

def run_database_compliance(
    product_data,
    ocr_data,
    image_path
):

    if not product_data:

        print("[ERROR] No product data available.")

        return None


    category_name = detect_category(
        product_data.get("product_name")
    )

    print(f"\nDetected Category: {category_name}")


    connection = connect_database()

    if connection is None:

        return None


    cursor = connection.cursor()

    try:

        # ----------------------------------------------------
        # Category
        # ----------------------------------------------------

        category_id = get_category_id(
            cursor,
            category_name
        )

        if category_id is None:

            connection.rollback()

            return None

        print(f"Category ID: {category_id}")


        # ----------------------------------------------------
        # Product
        # ----------------------------------------------------

        product_id = insert_product(
            cursor,
            product_data,
            category_id
        )


        # ----------------------------------------------------
        # OCR text
        # ----------------------------------------------------

        ocr_text = "\n".join(
            item.get("text", "")
            for item in ocr_data
            if isinstance(item, dict)
        )


        # ----------------------------------------------------
        # Scan
        # ----------------------------------------------------

        scan_id = insert_scan(
            cursor,
            product_id,
            image_path,
            ocr_text
        )


        # ----------------------------------------------------
        # Fetch rules
        # ----------------------------------------------------

        rules = fetch_rules(
            cursor,
            category_id
        )

        if not rules:

            print(
                "\n[ERROR] No active rules found "
                "for this category."
            )

            connection.rollback()

            return None

        print(
            f"\nRules fetched from database: {len(rules)}"
        )


        # ----------------------------------------------------
        # Compliance
        # ----------------------------------------------------

        rule_results = []

        passed_rules = 0
        failed_rules = 0

        print("\n" + "-" * 60)
        print("COMPLIANCE CHECK")
        print("-" * 60)


        for rule in rules:

            (
                passed,
                extracted_value,
                expected_value,
                remarks
            ) = check_rule(
                rule,
                product_data
            )

            status = "PASS" if passed else "FAIL"

            if passed:

                passed_rules += 1

            else:

                failed_rules += 1


            rule_results.append({
                "rule_id": rule["rule_id"],
                "rule_code": rule["rule_code"],
                "status": status,
                "extracted_value": extracted_value,
                "expected_value": expected_value,
                "remarks": remarks
            })


            print(
                f"{rule['rule_code']} : {status}"
            )


        total_rules = len(rules)


        # ----------------------------------------------------
        # Compliance Score + Risk Level
        # ----------------------------------------------------

        compliance_score, risk_level = (
            calculate_compliance_score_and_risk(
                rules,
                rule_results,
                total_rules,
                passed_rules
            )
        )


        print(
            f"\nCompliance Score : {compliance_score}%"
        )

        print(
            f"Risk Level       : {risk_level}"
        )


        # ----------------------------------------------------
        # Overall status
        # ----------------------------------------------------

        if failed_rules == 0:

            overall_status = "COMPLIANT"

        else:

            overall_status = "NON_COMPLIANT"


        # ----------------------------------------------------
        # Save overall result
        # ----------------------------------------------------

        result_id = save_compliance_result(
            cursor,
            scan_id,
            overall_status,
            total_rules,
            passed_rules,
            failed_rules
        )


        # ----------------------------------------------------
        # Save individual results
        # ----------------------------------------------------

        for result in rule_results:

            save_rule_result(
                cursor,
                result_id,
                result["rule_id"],
                result["status"],
                result["extracted_value"],
                result["expected_value"],
                result["remarks"]
            )


        # ----------------------------------------------------
        # Commit
        # ----------------------------------------------------

        connection.commit()


        # ----------------------------------------------------
        # Final result
        # ----------------------------------------------------

        final_result = {

            "product_id":
                product_id,

            "scan_id":
                scan_id,

            "result_id":
                result_id,

            "product_name":
                product_data.get("product_name"),

            "category":
                category_name,

            "overall_status":
                overall_status,

            "total_rules":
                total_rules,

            "passed_rules":
                passed_rules,

            "failed_rules":
                failed_rules,

            "compliance_score":
                compliance_score,

            "risk_level":
                risk_level,

            "rule_results":
                rule_results
        }


        # ----------------------------------------------------
        # Save JSON
        # ----------------------------------------------------

        with open(
            FINAL_FILE,
            "w",
            encoding="utf-8"
        ) as file:

            json.dump(
                final_result,
                file,
                indent=4
            )


        # ----------------------------------------------------
        # Console output
        # ----------------------------------------------------

        print("\n" + "=" * 60)
        print("FINAL RESULT")
        print("=" * 60)


        print(
            f"Product       : "
            f"{product_data.get('product_name')}"
        )


        print(
            f"Category      : {category_name}"
        )


        print(
            f"Product ID    : {product_id}"
        )


        print(
            f"Scan ID       : {scan_id}"
        )


        print(
            f"Result ID     : {result_id}"
        )


        print(
            f"Total Rules   : {total_rules}"
        )


        print(
            f"Passed Rules  : {passed_rules}"
        )


        print(
            f"Failed Rules  : {failed_rules}"
        )


        print(
            f"Compliance Score : {compliance_score}%"
        )


        print(
            f"Risk Level       : {risk_level}"
        )


        print(
            f"Status        : {overall_status}"
        )


        print("=" * 60)


        print(
            f"\n[OK] {FINAL_FILE} created."
        )


        return final_result


    except Exception as error:

        connection.rollback()

        print(
            "\n[ERROR] Database transaction failed:"
        )

        print(error)

        return None


    finally:

        cursor.close()

        connection.close()

        print(
            "\n[OK] PostgreSQL connection closed."
        )


# ============================================================
# STANDALONE EXECUTION
# ============================================================

def main():

    product_data = load_json(
        RESULT_FILE
    )

    ocr_data = load_json(
        OCR_FILE
    )


    if product_data is None:
        return


    if ocr_data is None:
        ocr_data = []


    image_path = "pro6.jpeg"


    run_database_compliance(
        product_data,
        ocr_data,
        image_path
    )


# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":
    main()