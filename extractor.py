import re
import json
import os
import easyocr


# ============================================================
# EXTRACT PRODUCT INFORMATION FROM IMAGE
# ============================================================

def extract_product(image_path):

    # --------------------------------------------------------
    # STEP 1: CHECK IMAGE
    # --------------------------------------------------------

    if not os.path.exists(image_path):
        raise FileNotFoundError(
            f"Image not found: {image_path}"
        )

    print("\nStarting OCR...")
    print(f"Image: {image_path}")

    reader = easyocr.Reader(['en'])

    result = reader.readtext(image_path)

    if not result:
        raise ValueError(
            "EasyOCR could not detect any text in the image."
        )


    # --------------------------------------------------------
    # STEP 2: STORE OCR DATA
    # --------------------------------------------------------

    ocr_data = []

    for detection in result:

        bounding_box = detection[0]
        detected_text = detection[1]
        confidence = detection[2]

        converted_box = [
            [int(point[0]), int(point[1])]
            for point in bounding_box
        ]

        ocr_data.append({
            "text": detected_text.strip(),
            "confidence": round(float(confidence), 3),
            "bounding_box": converted_box
        })


    # --------------------------------------------------------
    # STEP 3: DISPLAY OCR DATA
    # --------------------------------------------------------

    print("\n--- OCR DATA ---")

    for item in ocr_data:

        print("Text:", item["text"])
        print("Confidence:", item["confidence"])
        print("Position:", item["bounding_box"])
        print("-" * 40)


    # --------------------------------------------------------
    # STEP 4: CREATE OCR TEXT
    # --------------------------------------------------------

    ocr_lines = [
        item["text"]
        for item in ocr_data
    ]

    text = "\n".join(ocr_lines)


    # --------------------------------------------------------
    # STEP 5: DISPLAY RAW OCR TEXT
    # --------------------------------------------------------

    print("\n--- RAW OCR TEXT ---")
    print(text)


    # --------------------------------------------------------
    # STEP 6: EXTRACT MRP
    # --------------------------------------------------------

    mrp_match = re.search(
        r"MRP.*?(?:₹|Rs\.?|<)?\s*(\d+(?:\.\d+)?)",
        text,
        re.IGNORECASE
    )


    # --------------------------------------------------------
    # STEP 7: EXTRACT NET QUANTITY
    # --------------------------------------------------------

    quantity_match = re.search(
        r"(?:NET\s*(?:QTY|QUANTITY|WT|WEIGHT)|N\.?\s*WT\.?)"
        r"\s*[:\-]?\s*"
        r"(\d+(?:\.\d+)?)\s*"
        r"(kg|g|mg|l|ml|pcs|piece)",
        text,
        re.IGNORECASE
    )

    # Handle OCR such as:
    #
    # N.
    # 3.2g

    if not quantity_match:

        quantity_match = re.search(
            r"N\.?\s*\n?\s*"
            r"(\d+(?:\.\d+)?)\s*"
            r"(kg|g|mg|l|ml|pcs|piece)",
            text,
            re.IGNORECASE
        )


    # --------------------------------------------------------
    # STEP 8: EXTRACT BATCH NUMBER
    # --------------------------------------------------------

    batch_match = re.search(
        r"Batch\s*(?:No|Number)?\.?\s*[:\-]?\s*"
        r"([A-Za-z0-9\-\/]+)",
        text,
        re.IGNORECASE
    )


    # --------------------------------------------------------
    # STEP 9: EXTRACT PRODUCTION DATE
    # --------------------------------------------------------

    prod_date_match = re.search(
        r"(?:Prod|Production|Mfg|Manufacturing)"
        r"\s*(?:Date)?\.?"
        r"\s*[:\-]?\s*"
        r"(\d{4}[\/\-]\d{1,2})",
        text,
        re.IGNORECASE
    )


    # --------------------------------------------------------
    # STEP 10: EXTRACT EXPIRY DATE
    # --------------------------------------------------------

    exp_date_match = re.search(
        r"(?:Exp|Expiry|Expiration)"
        r"\s*(?:Date)?\.?"
        r"\s*[:\-]?\s*"
        r"(\d{4}[\/\-]\d{1,2})",
        text,
        re.IGNORECASE
    )


    if not exp_date_match:

        dates = re.findall(
            r"\b\d{4}[\/\-]\d{1,2}\b",
            text
        )

        if len(dates) >= 2:
            expiry_date = dates[1]
        else:
            expiry_date = None

    else:

        expiry_date = exp_date_match.group(1)


    # --------------------------------------------------------
    # STEP 11: EXTRACT MANUFACTURER
    # --------------------------------------------------------

    manufacturer_match = re.search(
        r"(?:Mfg|Manufactured)"
        r"\s*(?:[;,:.\-]\s*)?"
        r"(?:for\s*)?"
        r"[:\-]?\s*"
        r"([A-Za-z][A-Za-z .&]+)",
        text,
        re.IGNORECASE
    )

    manufacturer = None

    if manufacturer_match:

        manufacturer = manufacturer_match.group(1).strip()

        manufacturer = re.sub(
            r"^for\s*[:\-]?\s*",
            "",
            manufacturer,
            flags=re.IGNORECASE
        )

        manufacturer = re.split(
            r"\b(?:Add|Address|Batch|Prod|Exp|MRP|Made)\b",
            manufacturer,
            flags=re.IGNORECASE
        )[0].strip()


    # --------------------------------------------------------
    # STEP 12: EXTRACT MANUFACTURER ADDRESS
    # --------------------------------------------------------

    manufacturer_address = None

    address_match = re.search(
        r"(?:Address|Add)\s*[:\-]?\s*(.+)",
        text,
        re.IGNORECASE
    )

    if address_match:

        manufacturer_address = address_match.group(1).strip()

        manufacturer_address = re.split(
            r"\b(?:Batch|Prod|Exp|MRP|Made\s+in|Country)\b",
            manufacturer_address,
            flags=re.IGNORECASE
        )[0].strip()


    # --------------------------------------------------------
    # STEP 13: EXTRACT COUNTRY OF ORIGIN
    # --------------------------------------------------------

    country_match = re.search(
        r"(?:Made\s*in|Country\s*of\s*Origin)"
        r"\s*[:\-]?\s*"
        r"([A-Za-z .]+)",
        text,
        re.IGNORECASE
    )

    country = None

    if country_match:

        country = country_match.group(1).strip()

        country = re.split(
            r"\b(?:Sadar|Address|MRP|Batch|Contact)\b",
            country,
            flags=re.IGNORECASE
        )[0].strip()


    # --------------------------------------------------------
    # STEP 14: EXTRACT PRODUCT NAME
    # --------------------------------------------------------

    product_name = None

    ignored_patterns = [

        r"^RC\s*NO\.?$",
        r"^RC\s*NO$",

        r"^REGISTRATION",

        r"^BATCH",

        r"^MFG",

        r"^MANUFACT",

        r"^PROD",

        r"^EXP",

        r"^MRP",

        r"^NET",

        r"^MADE\s+IN",

        r"^ADDRESS",

        r"^ADD$",

        r"^CONSUMER",

        r"^CUSTOMER",

        r"^CONTACT",

        r"^PHONE",

        r"^EMAIL",

        r"^INGREDIENT",

        r"^NUTRITION",

        r"^SERVING",

        r"^CALORIES",

        r"^TOTAL",

        r"^SODIUM",

        r"^PROTEIN",

        r"^SUGAR",

        r"^FAT",

        r"^DIRECTION",

        r"^WARNING",

        r"^CAUTION"
    ]


    # First look for product-type words

    for line in ocr_lines:

        cleaned_line = line.strip()

        if not cleaned_line:
            continue

        if len(cleaned_line) < 5:
            continue


        should_ignore = False

        for pattern in ignored_patterns:

            if re.search(
                pattern,
                cleaned_line,
                re.IGNORECASE
            ):

                should_ignore = True
                break


        if should_ignore:
            continue


        if re.search(
            r"\b(?:mrp|batch|mfg|manufactured|prod|expiry|"
            r"address|made in|net weight|net quantity|"
            r"serving size|calories|sodium)\b",
            cleaned_line,
            re.IGNORECASE
        ):

            continue


        if re.fullmatch(
            r"[\d\s./:\-]+",
            cleaned_line
        ):

            continue


        if re.search(
            r"\b(?:lipstick|lotion|cream|soap|shampoo|"
            r"oil|powder|biscuit|chocolate|juice|drink|"
            r"paste|gel|perfume|deodorant|moisturizer|"
            r"detergent|snack|food|tea|coffee)\b",
            cleaned_line,
            re.IGNORECASE
        ):

            product_name = cleaned_line
            break


    # --------------------------------------------------------
    # FALLBACK PRODUCT NAME
    # --------------------------------------------------------

    if not product_name:

        for line in ocr_lines:

            cleaned_line = line.strip()

            if not cleaned_line:
                continue

            if len(cleaned_line) < 5:
                continue


            if re.fullmatch(
                r"[\d\s./:\-]+",
                cleaned_line
            ):

                continue


            if any(
                re.search(
                    pattern,
                    cleaned_line,
                    re.IGNORECASE
                )
                for pattern in ignored_patterns
            ):

                continue


            product_name = cleaned_line
            break


    # --------------------------------------------------------
    # STEP 15: CREATE FINAL DATA
    # --------------------------------------------------------

    data = {

        "product_name": product_name,

        "mrp": (
            float(mrp_match.group(1))
            if mrp_match
            else None
        ),

        "net_quantity": (
            quantity_match.group(1)
            + " "
            + quantity_match.group(2)
            if quantity_match
            else None
        ),

        "batch_number": (
            batch_match.group(1)
            if batch_match
            else None
        ),

        "production_date": (
            prod_date_match.group(1)
            if prod_date_match
            else None
        ),

        "expiry_date": expiry_date,

        "manufacturer": manufacturer,

        "manufacturer_address": manufacturer_address,

        "country_of_origin": country
    }


    # --------------------------------------------------------
    # STEP 16: DISPLAY FINAL INFORMATION
    # --------------------------------------------------------

    print("\n--- EXTRACTED INFORMATION ---")

    print(
        "Product Name:",
        data["product_name"]
        if data["product_name"]
        else "Not found"
    )

    print(
        "MRP:",
        data["mrp"]
        if data["mrp"] is not None
        else "Not found"
    )

    print(
        "Net Quantity:",
        data["net_quantity"]
        if data["net_quantity"]
        else "Not found"
    )

    print(
        "Batch Number:",
        data["batch_number"]
        if data["batch_number"]
        else "Not found"
    )

    print(
        "Production Date:",
        data["production_date"]
        if data["production_date"]
        else "Not found"
    )

    print(
        "Expiry Date:",
        data["expiry_date"]
        if data["expiry_date"]
        else "Not found"
    )

    print(
        "Manufacturer:",
        data["manufacturer"]
        if data["manufacturer"]
        else "Not found"
    )

    print(
        "Manufacturer Address:",
        data["manufacturer_address"]
        if data["manufacturer_address"]
        else "Not found"
    )

    print(
        "Country of Origin:",
        data["country_of_origin"]
        if data["country_of_origin"]
        else "Not found"
    )


    # --------------------------------------------------------
    # STEP 17: SAVE result.json
    # --------------------------------------------------------

    with open(
        "result.json",
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            data,
            file,
            indent=4,
            ensure_ascii=False
        )


    # --------------------------------------------------------
    # STEP 18: SAVE ocr_data.json
    # --------------------------------------------------------

    with open(
        "ocr_data.json",
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            ocr_data,
            file,
            indent=4,
            ensure_ascii=False
        )


    print("\n------------------------------------------")
    print("JSON files created successfully!")
    print("------------------------------------------")

    print("1. result.json")
    print("2. ocr_data.json")


    # --------------------------------------------------------
    # RETURN DATA TO MAIN PIPELINE
    # --------------------------------------------------------

    return data, ocr_data


# ============================================================
# ALLOW DIRECT TESTING OF EXTRACTOR
# ============================================================

if __name__ == "__main__":

    import sys

    if len(sys.argv) < 2:

        print("\nUsage:")
        print("python extractor.py <image_path>")
        print("\nExample:")
        print("python extractor.py pro6.jpeg")

        sys.exit(1)


    image_path = sys.argv[1]

    extract_product(image_path)