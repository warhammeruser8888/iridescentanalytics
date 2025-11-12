import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent
ENV_PATH = BASE_DIR / ".env"

# Load environment variables from the .env file
load_dotenv(dotenv_path=ENV_PATH)

# Supabase credentials
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY", "")

# Model cache
MODEL_CACHE_DIR = os.getenv("MODEL_CACHE_DIR", str(BASE_DIR / "models"))
MODEL_CACHE_DAYS = int(os.getenv("MODEL_CACHE_DAYS", "7"))

# API settings
API_HOST = os.getenv("API_HOST", "0.0.0.0")
API_PORT = int(os.getenv("API_PORT", "8000"))

# CORS
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*").split(",")

# Ensure model cache directory exists
Path(MODEL_CACHE_DIR).mkdir(parents=True, exist_ok=True)
