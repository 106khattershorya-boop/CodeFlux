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
    manufacturer: Optional[str] = None
    net_quantity: Optional[str] = None
    mfg_date: Optional[str] = None
    mrp: Optional[str] = None
    consumer_care: Optional[str] = None
    best_before: Optional[str] = None
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
    scan_id: UUID
    fields: ExtractedFields
    results: list[RuleResultSchema]
    created_at: datetime


# ---- Report ----

class ReportRequest(BaseModel):
    scan_id: UUID
