from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # App
    app_name: str = "Legal Metrology Compliance Checker"
    debug: bool = False

    # Database
    database_url: str

    # Supabase
    supabase_url: str
    supabase_key: str

    # Google Cloud Vision
    gcp_vision_credentials_path: str

    # JWT
    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    # Optional
    llm_api_key: str | None = None

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
