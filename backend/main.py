from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uvicorn
from prediction_service import PredictionService
import config

app = FastAPI(
    title="Stock Prediction API",
    description="LSTM-based stock price prediction service",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

prediction_service = PredictionService()

class PredictionRequest(BaseModel):
    ticker: str
    force_retrain: Optional[bool] = False

class HealthResponse(BaseModel):
    status: str
    message: str

@app.get("/", response_model=HealthResponse)
async def root():
    return {
        "status": "healthy",
        "message": "Stock Prediction API is running"
    }

@app.get("/health", response_model=HealthResponse)
async def health_check():
    return {
        "status": "healthy",
        "message": "Service is operational"
    }

@app.post("/api/predict")
async def predict_stock(request: PredictionRequest):
    if not request.ticker or len(request.ticker.strip()) == 0:
        raise HTTPException(status_code=400, detail="Ticker symbol is required")

    ticker = request.ticker.strip().upper()

    if len(ticker) > 10:
        raise HTTPException(status_code=400, detail="Invalid ticker symbol")

    result = prediction_service.get_prediction(ticker, request.force_retrain)

    if not result.get('success', False):
        raise HTTPException(
            status_code=404,
            detail=result.get('error', 'Unable to generate prediction')
        )

    return result

@app.get("/api/prediction-history/{ticker}")
async def get_prediction_history(ticker: str):
    if not ticker or len(ticker.strip()) == 0:
        raise HTTPException(status_code=400, detail="Ticker symbol is required")

    ticker = ticker.strip().upper()

    result = prediction_service.get_prediction_history(ticker)

    if not result.get('success', False):
        raise HTTPException(
            status_code=404,
            detail=result.get('error', 'Unable to fetch prediction history')
        )

    return result

@app.get("/api/model-performance/{ticker}")
async def get_model_performance(ticker: str):
    if not ticker or len(ticker.strip()) == 0:
        raise HTTPException(status_code=400, detail="Ticker symbol is required")

    ticker = ticker.strip().upper()

    try:
        performance = prediction_service.db_service.get_model_performance(ticker)

        if performance is None:
            raise HTTPException(
                status_code=404,
                detail=f"No model performance data found for {ticker}"
            )

        return {
            "success": True,
            "ticker": ticker,
            "performance": performance
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=config.API_HOST,
        port=config.API_PORT,
        reload=True
    )
