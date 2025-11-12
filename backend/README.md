# Stock Prediction Backend - LSTM Model API

This is a FastAPI-based backend service that provides LSTM-powered stock price predictions. The backend uses PyTorch for deep learning, integrates with Supabase for data persistence, and is designed for easy deployment to Hostinger.

## Features

- Bidirectional LSTM neural network for stock price prediction
- Model caching system using Supabase (7-day cache by default)
- RESTful API endpoints for predictions and model performance
- Technical indicators: MACD, RSI, EMA, moving averages
- Real-time stock data fetching using yfinance
- Automatic model training and retraining
- Historical prediction tracking

## Project Structure

```
backend/
├── config.py                 # Configuration and environment variables
├── data_service.py          # Stock data fetching and preprocessing
├── model_service.py         # LSTM model training and prediction
├── database_service.py      # Supabase integration
├── prediction_service.py    # Main prediction orchestration
├── main.py                  # FastAPI application
├── requirements.txt         # Python dependencies
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
└── models/                 # Cached model files (auto-created)
```

## Installation

### Prerequisites

- Python 3.8 or higher
- pip package manager
- Supabase account (for data persistence)

### Setup Steps

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv

   # On Windows:
   venv\Scripts\activate

   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**

   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Supabase credentials:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   SUPABASE_ANON_KEY=your_supabase_anon_key

   MODEL_CACHE_DIR=./models
   MODEL_CACHE_DAYS=7

   API_HOST=0.0.0.0
   API_PORT=8000

   CORS_ORIGINS=*
   ```

5. **Run database migrations:**

   The Supabase tables should already be created. If not, run the migration SQL from the main project.

## Running Locally

Start the development server:
```bash
python main.py
```

Or use uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Health Check
- `GET /` - API status
- `GET /health` - Health check endpoint

### Predictions
- `POST /api/predict` - Generate stock prediction
  ```json
  {
    "ticker": "AAPL",
    "force_retrain": false
  }
  ```

- `GET /api/prediction-history/{ticker}` - Get prediction history for a ticker

- `GET /api/model-performance/{ticker}` - Get model performance metrics

## Deployment to Hostinger

### Step 1: Prepare Your Application

1. Ensure all dependencies are in `requirements.txt`
2. Test the application locally first
3. Verify environment variables are properly configured

### Step 2: Upload to Hostinger

1. **Using FTP/SFTP:**
   - Connect to your Hostinger server via FTP/SFTP
   - Upload the entire `backend` directory
   - Recommended location: `/home/username/backend`

2. **Using SSH (if available):**
   ```bash
   scp -r backend/ user@your-hostinger-server:/home/username/
   ```

### Step 3: Install Python and Dependencies

Connect to your Hostinger server via SSH:

```bash
# Navigate to the backend directory
cd ~/backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Step 4: Configure Environment Variables

Create and edit the `.env` file on the server:
```bash
nano .env
```

Add your production values (never commit this file to version control).

### Step 5: Set Up Process Manager

Use a process manager to keep your API running:

**Option A: Using systemd (recommended)**

Create a service file:
```bash
sudo nano /etc/systemd/system/stock-prediction.service
```

Add this content (adjust paths):
```ini
[Unit]
Description=Stock Prediction API
After=network.target

[Service]
User=your-username
WorkingDirectory=/home/username/backend
Environment="PATH=/home/username/backend/venv/bin"
ExecStart=/home/username/backend/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl enable stock-prediction
sudo systemctl start stock-prediction
sudo systemctl status stock-prediction
```

**Option B: Using PM2**

If PM2 is available:
```bash
pm2 start main.py --name stock-prediction --interpreter python3
pm2 save
pm2 startup
```

### Step 6: Configure Reverse Proxy

Set up Nginx or Apache to proxy requests to your FastAPI app:

**Nginx example:**
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Step 7: Update Frontend Configuration

In your frontend `.env` file, update the API URL:
```env
VITE_API_URL=https://api.yourdomain.com
```

## Model Caching

The system automatically caches trained models for 7 days. Models are stored in:
- **Local files**: `./models/` directory
- **Metadata**: Supabase `trained_models` table

To force model retraining, set `force_retrain: true` in the API request.

## Technical Details

### LSTM Model Architecture
- Bidirectional LSTM with 2 layers
- Hidden size: 50 units
- Dropout: 0.3
- Batch normalization
- Input features: 10 (technical indicators + price lags)

### Training Parameters
- Optimizer: Adam (lr=0.001, weight_decay=1e-5)
- Loss: Mean Squared Error (MSE)
- Early stopping: 75 epochs patience
- Sequence length: 60 days
- Train/Val/Test split: 70/10/20

### Performance Metrics
- MSE (Mean Squared Error)
- RMSE (Root Mean Squared Error)
- MAE (Mean Absolute Error)
- Confidence score (derived from MAE)

## Troubleshooting

### Common Issues

1. **Import errors:**
   - Ensure virtual environment is activated
   - Reinstall dependencies: `pip install -r requirements.txt`

2. **Database connection errors:**
   - Verify Supabase credentials in `.env`
   - Check if tables are created (run migrations)

3. **Model training takes too long:**
   - Reduce `num_epochs` in `model_service.py`
   - Use GPU if available (PyTorch will auto-detect)

4. **Memory issues:**
   - Reduce `batch_size` in `model_service.py`
   - Limit historical data range in `data_service.py`

## Security Considerations

- Never commit `.env` files to version control
- Use service role key only on backend (never expose to frontend)
- Configure CORS properly for production
- Use HTTPS in production
- Implement rate limiting for API endpoints

## Monitoring

Monitor your application:
```bash
# Check service status
sudo systemctl status stock-prediction

# View logs
sudo journalctl -u stock-prediction -f

# Or with PM2
pm2 logs stock-prediction
```

## Support

For issues or questions:
- Check the main project README
- Review Supabase documentation
- Verify all environment variables are set correctly

## License

This project is part of the main application. Refer to the main project license.
