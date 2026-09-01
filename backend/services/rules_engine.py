from typing import Callable, Optional
from pydantic import BaseModel


class RuleResult(BaseModel):
    field: str
    status: str  # "pass" | "fail" | "missing"
    expected: Optional[str] = None
    found: Optional[str] = None
    rule_reference: str


class Rule(BaseModel):
    field: str
    required: bool
    rule_reference: str
    validator_fn: Callable[[Optional[str]], bool]

    class Config:
        arbitrary_types_allowed = True


def _has_value(value: Optional[str]) -> bool:
    return value is not None and value.strip() != ""


def _valid_mrp(value: Optional[str]) -> bool:
    if not _has_value(value):
        return False
    return "incl" in value.lower() or "inclusive" in value.lower()


RULES: list[Rule] = [
    Rule(
        field="manufacturer",
        required=True,
        rule_reference="Rule 6(1)(a) - Name & address of manufacturer/packer/importer",
        validator_fn=_has_value,
    ),
    Rule(
        field="net_quantity",
        required=True,
        rule_reference="Rule 6(1)(b) - Net quantity in standard units",
        validator_fn=_has_value,
    ),
    Rule(
        field="mfg_date",
        required=True,
        rule_reference="Rule 6(1)(c) - Month & year of manufacture/packing",
        validator_fn=_has_value,
    ),
    Rule(
        field="mrp",
        required=True,
        rule_reference="Rule 6(1)(d) - MRP inclusive of all taxes",
        validator_fn=_valid_mrp,
    ),
    Rule(
        field="consumer_care",
        required=True,
        rule_reference="Rule 6(1)(e) - Consumer care details",
        validator_fn=_has_value,
    ),
]


def check_compliance(fields: dict) -> list[RuleResult]:
    results: list[RuleResult] = []

    for rule in RULES:
        value = fields.get(rule.field)

        if not _has_value(value) and rule.required:
            results.append(
                RuleResult(
                    field=rule.field,
                    status="missing",
                    found=None,
                    rule_reference=rule.rule_reference,
                )
            )
            continue

        is_valid = rule.validator_fn(value)
        results.append(
            RuleResult(
                field=rule.field,
                status="pass" if is_valid else "fail",
                found=value,
                rule_reference=rule.rule_reference,
            )
        )

    return results
