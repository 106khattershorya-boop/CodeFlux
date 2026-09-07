from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from uuid import UUID


# ---- Auth ----

class UserCreate(BaseModel):
    email: str
    password: str
    role: str = "seller"  # "seller" | "inspector" | "admin"


class UserLogin(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ---- Extraction (what your friends' extraction_service.py must return) ----

class ExtractedFields(BaseModel):
    product_name: Optional[str] = None
    mrp: Optional[float] = None
    net_quantity: Optional[str] = None
    batch_number: Optional[str] = None
    production_date: Optional[str] = None
    expiry_date: Optional[str] = None
    manufacturer: Optional[str] = None
    manufacturer_address: Optional[str] = None
    country_of_origin: Optional[str] = None

# ---- Rules engine output (what rules_engine.py returns) ----

class RuleResultSchema(BaseModel):
    field: str
    status: str  # "pass" | "fail" | "missing"
    expected: Optional[str] = None
    found: Optional[str] = None
    rule_reference: str


# ---- Product check (the full /products/check response) ----

class ProductCheckResponse(BaseModel):
    scan_id: int
    fields: ExtractedFields
    results: list[RuleResultSchema]
    created_at: datetime


# ---- Report ----

class ReportRequest(BaseModel):
    scan_id: int
