import sys
import os

from extractor import extract_product
from db_integration import run_database_compliance


def main():

    print("=" * 60)
    print("SMART LABEL COMPLIANCE CHECKER")
    print("=" * 60)

    # --------------------------------------------------------
    # Check image argument
    # --------------------------------------------------------

    if len(sys.argv) < 2:

        print("\nUsage:")
        print("python main.py <image_path>")

        print("\nExample:")
        print("python main.py pro6.jpeg")

        return

    image_path = sys.argv[1]

    # --------------------------------------------------------
    # Check image
    # --------------------------------------------------------

    if not os.path.exists(image_path):

        print(
            f"\n[ERROR] Image not found: {image_path}"
        )

        return

    # --------------------------------------------------------
    # STEP 1 - OCR + Extraction
    # --------------------------------------------------------

    print("\n")
    print("=" * 60)
    print("STEP 1: OCR + INFORMATION EXTRACTION")
    print("=" * 60)

    try:

        product_data, ocr_data = extract_product(
            image_path
        )

    except Exception as error:

        print("\n[ERROR] Extraction failed:")
        print(error)

        return

    # --------------------------------------------------------
    # STEP 2 - Database Compliance
    # --------------------------------------------------------

    print("\n")
    print("=" * 60)
    print("STEP 2: DATABASE COMPLIANCE CHECK")
    print("=" * 60)

    result = run_database_compliance(
        product_data,
        ocr_data,
        image_path
    )

    # --------------------------------------------------------
    # Final
    # --------------------------------------------------------

    if result is None:

        print("\n[ERROR] Compliance process failed.")

        return

    print("\n")
    print("=" * 60)
    print("PIPELINE COMPLETED SUCCESSFULLY")
    print("=" * 60)

    print(
        f"\nFinal Status: "
        f"{result['overall_status']}"
    )

    print(
        "\nFinal report:"
    )

    print(
        "database_compliance_result.json"
    )


if __name__ == "__main__":
    main()