import json
import re
from datetime import datetime


# ==========================================
# CONFIGURATION
# ==========================================

RESULT_FILE = "result.json"
RULES_FILE = "rules.json"
OUTPUT_FILE = "compliance_result.json"


# ==========================================
# STEP 1: LOAD PRODUCT DATA
# ==========================================

try:

    with open(
        RESULT_FILE,
        "r",
        encoding="utf-8"
    ) as file:

        product = json.load(file)

except FileNotFoundError:

    print("ERROR: result.json not found.")
    print("Run extractor.py first.")
    exit()


# ==========================================
# STEP 2: LOAD RULES
# ==========================================

try:

    with open(
        RULES_FILE,
        "r",
        encoding="utf-8"
    ) as file:

        rules = json.load(file)

except FileNotFoundError:

    print("ERROR: rules.json not found.")
    exit()


# ==========================================
# STEP 3: PRODUCT CATEGORY DETECTION
# ==========================================

product_name = str(
    product.get("product_name", "")
).lower()


cosmetic_keywords = [

    "lipstick",
    "lotion",
    "cream",
    "shampoo",
    "soap",
    "moisturizer",
    "perfume",
    "deodorant",
    "cosmetic",
    "makeup",
    "foundation",
    "mascara",
    "eyeliner",
    "lip balm",
    "face wash",
    "sunscreen",
    "serum",
    "conditioner",
    "face cream",
    "body lotion",
    "beauty"
]


food_keywords = [

    "biscuit",
    "cookie",
    "chocolate",
    "juice",
    "drink",
    "food",
    "snack",
    "chips",
    "noodles",
    "rice",
    "flour",
    "atta",
    "sugar",
    "salt",
    "tea",
    "coffee",
    "milk",
    "bread",
    "cereal",
    "protein bar",
    "namkeen",
    "spice",
    "masala",
    "sauce",
    "ketchup",
    "jam",
    "honey",
    "water",
    "beverage"
]


pharma_keywords = [

    "tablet",
    "capsule",
    "syrup",
    "medicine",
    "medication",
    "injection",
    "ointment",
    "drug",
    "pharma",
    "paracetamol",
    "ibuprofen",
    "antibiotic",
    "antacid",
    "painkiller",
    "vitamin",
    "cetirizine",
    "amoxicillin",
    "azithromycin",
    "metformin"
]


if any(
    word in product_name
    for word in cosmetic_keywords
):

    product_category = "cosmetic"


elif any(
    word in product_name
    for word in food_keywords
):

    product_category = "food"


elif any(
    word in product_name
    for word in pharma_keywords
):

    product_category = "pharma"


else:

    product_category = "general"


# ==========================================
# STEP 4: CHECK CATEGORY EXISTS
# ==========================================

if product_category not in rules:

    print(
        "\nWARNING: No rules found for category:",
        product_category
    )

    print("Using cosmetic rules as fallback.")

    if "cosmetic" in rules:

        product_category = "cosmetic"

    else:

        print("ERROR: No suitable rules available.")
        exit()


category_rules = rules[product_category].get(
    "required_fields",
    []
)


# ==========================================
# STEP 5: HELPER FUNCTIONS
# ==========================================

def is_present(value):

    if value is None:
        return False

    if isinstance(value, str):

        return value.strip() != ""

    return True


def parse_date(date_string):

    if not date_string:
        return None

    date_string = str(date_string).strip()

    formats = [
        "%Y/%m",
        "%Y-%m",
        "%Y/%m/%d",
        "%Y-%m-%d",
        "%d/%m/%Y",
        "%d-%m-%Y"
    ]

    for fmt in formats:

        try:

            return datetime.strptime(
                date_string,
                fmt
            )

        except ValueError:

            continue

    return None


# ==========================================
# STEP 6: STORE RULE RESULTS
# ==========================================

rule_results = []


# ==========================================
# STEP 7: RUN REQUIRED-FIELD RULES
# ==========================================

for rule in category_rules:

    rule_id = rule.get(
        "rule_id",
        "UNKNOWN"
    )

    field = rule.get(
        "field",
        ""
    )

    severity = rule.get(
        "severity",
        "MEDIUM"
    )

    description = rule.get(
        "description",
        ""
    )

    value = product.get(
        field
    )


    # --------------------------------------
    # BASIC PRESENCE CHECK
    # --------------------------------------

    if is_present(value):

        status = "PASS"

        message = (
            f"{field} is present"
        )

    else:

        status = "FAIL"

        message = (
            f"{field} is missing"
        )


    # --------------------------------------
    # MRP VALIDATION
    # --------------------------------------

    if field == "mrp":

        if value is not None:

            try:

                mrp_value = float(value)

                if mrp_value > 0:

                    status = "PASS"

                    message = (
                        f"MRP ₹{mrp_value:.2f} is valid"
                    )

                else:

                    status = "FAIL"

                    message = (
                        "MRP must be greater than zero"
                    )

            except (
                ValueError,
                TypeError
            ):

                status = "FAIL"

                message = (
                    "MRP is invalid"
                )


    # --------------------------------------
    # NET QUANTITY VALIDATION
    # --------------------------------------

    if field == "net_quantity":

        if value:

            quantity_match = re.search(
                r"(\d+(?:\.\d+)?)\s*"
                r"(kg|g|mg|l|ml|pcs|piece)",
                str(value),
                re.IGNORECASE
            )

            if quantity_match:

                quantity_value = float(
                    quantity_match.group(1)
                )

                if quantity_value > 0:

                    status = "PASS"

                    message = (
                        f"Net quantity {value} is valid"
                    )

                else:

                    status = "FAIL"

                    message = (
                        "Net quantity must be greater than zero"
                    )

            else:

                status = "FAIL"

                message = (
                    "Net quantity format is invalid"
                )


    # --------------------------------------
    # PRODUCTION DATE VALIDATION
    # --------------------------------------

    if field == "production_date":

        if value:

            parsed_production = parse_date(
                value
            )

            if parsed_production:

                status = "PASS"

                message = (
                    f"Production date {value} is valid"
                )

            else:

                status = "FAIL"

                message = (
                    f"Production date {value} is invalid"
                )


    # --------------------------------------
    # EXPIRY DATE VALIDATION
    # --------------------------------------

    if field == "expiry_date":

        if value:

            parsed_expiry = parse_date(
                value
            )

            if parsed_expiry:

                status = "PASS"

                message = (
                    f"Expiry date {value} is valid"
                )

            else:

                status = "FAIL"

                message = (
                    f"Expiry date {value} is invalid"
                )


    # --------------------------------------
    # SAVE RESULT
    # --------------------------------------

    rule_results.append({

        "rule_id": rule_id,

        "field": field,

        "status": status,

        "severity": severity,

        "message": message

    })


# ==========================================
# STEP 8: DATE LOGICAL VALIDATION
# ==========================================

production_date = product.get(
    "production_date"
)

expiry_date = product.get(
    "expiry_date"
)


if production_date and expiry_date:

    parsed_production = parse_date(
        production_date
    )

    parsed_expiry = parse_date(
        expiry_date
    )


    if (
        parsed_production
        and
        parsed_expiry
    ):

        if parsed_expiry > parsed_production:

            date_status = "PASS"

            date_message = (
                f"Expiry date is later than "
                f"production date"
            )

        else:

            date_status = "FAIL"

            date_message = (
                f"Expiry date occurs before or "
                f"on the production date"
            )


    else:

        date_status = "FAIL"

        date_message = (
            "Could not compare production and expiry dates"
        )


    # ======================================
    # DETERMINE RULE ID
    # ======================================

    if product_category == "cosmetic":

        logical_rule_id = "COS-010"

    elif product_category == "food":

        logical_rule_id = "FOOD-010"

    elif product_category == "pharma":

        logical_rule_id = "PHARMA-010"

    else:

        logical_rule_id = "GEN-010"


    rule_results.append({

        "rule_id": logical_rule_id,

        "field": "expiry_date",

        "status": date_status,

        "severity": "HIGH",

        "message": date_message

    })


# ==========================================
# STEP 9: CALCULATE SUMMARY
# ==========================================

total_checks = len(
    rule_results
)

passed_checks = sum(
    1
    for rule in rule_results
    if rule["status"] == "PASS"
)

failed_checks = sum(
    1
    for rule in rule_results
    if rule["status"] == "FAIL"
)


if failed_checks == 0:

    overall_status = "COMPLIANT"

else:

    overall_status = "NON_COMPLIANT"


# ==========================================
# STEP 10: CREATE COMPLIANCE RESULT
# ==========================================

compliance_result = {

    "product": product,

    "product_category": product_category,

    "overall_status": overall_status,

    "summary": {

        "total_checks": total_checks,

        "passed": passed_checks,

        "failed": failed_checks

    },

    "rules": rule_results

}


# ==========================================
# STEP 11: DISPLAY RESULT
# ==========================================

print("\n")
print("=" * 50)
print("          RULE-BASED COMPLIANCE")
print("=" * 50)

print()

print(
    "Product Category:",
    product_category
)

print(
    "Overall Status:",
    overall_status
)

print(
    "Total Rules:",
    total_checks
)

print(
    "Passed:",
    passed_checks
)

print(
    "Failed:",
    failed_checks
)

print()

print("--- RULE RESULTS ---")


for rule in rule_results:

    print(
        f"{rule['rule_id']} | "
        f"{rule['field']} | "
        f"{rule['status']} | "
        f"{rule['severity']}"
    )

    print(
        f"    {rule['message']}"
    )


print()


# ==========================================
# STEP 12: SAVE JSON REPORT
# ==========================================

with open(
    OUTPUT_FILE,
    "w",
    encoding="utf-8"
) as file:

    json.dump(
        compliance_result,
        file,
        indent=4,
        ensure_ascii=False
    )


# ==========================================
# DONE
# ==========================================

print("=" * 50)

print(
    "Compliance report created successfully!"
)

print(
    f"File: {OUTPUT_FILE}"
)

print("=" * 50)