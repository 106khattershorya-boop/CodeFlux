from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import os
import shutil
import uuid

from extractor import extract_product
from db_integration import run_database_compliance
from chatbot import chat_with_compliance


# =========================================================
# FASTAPI APPLICATION
# =========================================================

app = FastAPI(
    title="Smart Label Compliance Checker API",
    description="OCR + PostgreSQL + AI based product label compliance checker",
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# UPLOAD DIRECTORY
# =========================================================

UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


# =========================================================
# ROOT
# =========================================================

@app.get("/")
def root():

    return {
        "message": "Smart Label Compliance Checker API",
        "status": "running"
    }


# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/health")
def health():

    return {
        "status": "healthy"
    }


# =========================================================
# CHECK COMPLIANCE
# =========================================================

@app.post("/check-compliance")
async def check_compliance(
    file: UploadFile = File(...)
):

    # -----------------------------------------------------
    # Validate file
    # -----------------------------------------------------

    if not file.filename:

        raise HTTPException(
            status_code=400,
            detail="No file selected."
        )


    # -----------------------------------------------------
    # Validate extension
    # -----------------------------------------------------

    allowed_extensions = {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp"
    }

    extension = os.path.splitext(
        file.filename
    )[1].lower()


    if extension not in allowed_extensions:

        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Use JPG, JPEG, PNG or WEBP."
        )


    # -----------------------------------------------------
    # Create unique filename
    # -----------------------------------------------------

    unique_filename = (
        f"{uuid.uuid4()}{extension}"
    )

    image_path = os.path.join(
        UPLOAD_DIR,
        unique_filename
    )


    # -----------------------------------------------------
    # Save uploaded image
    # -----------------------------------------------------

    try:

        with open(
            image_path,
            "wb"
        ) as buffer:

            shutil.copyfileobj(
                file.file,
                buffer
            )

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Could not save image: {error}"
        )


    # -----------------------------------------------------
    # STEP 1: OCR + EXTRACTION
    # -----------------------------------------------------

    try:

        product_data, ocr_data = extract_product(
            image_path
        )

    except Exception as error:

        if os.path.exists(image_path):
            os.remove(image_path)

        raise HTTPException(
            status_code=500,
            detail=f"OCR / extraction failed: {error}"
        )


    # -----------------------------------------------------
    # STEP 2: COMPLIANCE CHECK
    # -----------------------------------------------------

    try:

        compliance_result = run_database_compliance(
            product_data,
            ocr_data,
            image_path
        )

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Compliance checking failed: {error}"
        )


    if compliance_result is None:

        raise HTTPException(
            status_code=500,
            detail="Compliance process returned no result."
        )


    # -----------------------------------------------------
    # FIND FAILED RULES
    # -----------------------------------------------------

    failed_rules = []

    for rule in compliance_result.get(
        "rule_results",
        []
    ):

        if rule.get("status") == "FAIL":

            failed_rules.append({

                "rule_id":
                    rule.get("rule_id"),

                "rule_code":
                    rule.get("rule_code"),

                "status":
                    rule.get("status"),

                "extracted_value":
                    rule.get("extracted_value"),

                "expected_value":
                    rule.get("expected_value"),

                "remarks":
                    rule.get("remarks")
            })


    # -----------------------------------------------------
    # RETURN RESULT
    # -----------------------------------------------------

    return {

        "success": True,

        "filename": file.filename,

        "product": {

            "product_id":
                compliance_result.get(
                    "product_id"
                ),

            "product_name":
                compliance_result.get(
                    "product_name"
                ),

            "category":
                compliance_result.get(
                    "category"
                )
        },

        "compliance": {

            "overall_status":
                compliance_result.get(
                    "overall_status"
                ),

            "compliance_score":
                compliance_result.get(
                    "compliance_score"
                ),

            "risk_level":
                compliance_result.get(
                    "risk_level"
                ),

            "total_rules":
                compliance_result.get(
                    "total_rules"
                ),

            "passed_rules":
                compliance_result.get(
                    "passed_rules"
                ),

            "failed_rules":
                compliance_result.get(
                    "failed_rules"
                ),

            "failed_rules_details":
                failed_rules,

            "rule_results":
                compliance_result.get(
                    "rule_results",
                    []
                )
        },

        "scan": {

            "scan_id":
                compliance_result.get(
                    "scan_id"
                ),

            "result_id":
                compliance_result.get(
                    "result_id"
                )
        }
    }


# =========================================================
# CHAT REQUEST MODEL
# =========================================================

class ChatRequest(BaseModel):

    question: str

    scan_id: int


# =========================================================
# AI COMPLIANCE ASSISTANT
# =========================================================

@app.post("/chat")
def compliance_chat(
    request: ChatRequest
):

    if not request.question.strip():

        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty."
        )


    try:

        result = chat_with_compliance(
            request.question,
            request.scan_id
        )


        return {

            "success": True,

            "scan_id":
                result.get("scan_id"),

            "product_name":
                result.get("product_name"),

            "category":
                result.get("category"),

            "compliance_score":
                result.get("compliance_score"),

            "risk_level":
                result.get("risk_level"),

            "overall_status":
                result.get("overall_status"),

            "answer":
                result.get("answer")
        }


    except ValueError as error:

        raise HTTPException(
            status_code=404,
            detail=str(error)
        )


    except RuntimeError as error:

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Chatbot error: {error}"
        )


# =========================================================
# RUN DIRECTLY
# =========================================================

if __name__ == "__main__":

    import uvicorn

    uvicorn.run(
        "api:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )