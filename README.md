<<<<<<< HEAD
# iridescentanalytics
Repository for Iridescent Analytics' website, stock picker, and more. 
=======
# Quantitative Finance Platform with LSTM Stock Prediction

A professional-grade quantitative finance platform featuring LSTM-powered stock price predictions, financial calculators, and interactive data visualizations. Built with React, TypeScript, FastAPI, PyTorch, and Supabase.

## Features

### Stock Prediction (LSTM Model)
- **Deep Learning**: Bidirectional LSTM neural network with 2 layers
- **Technical Indicators**: MACD, RSI, EMA, moving averages, volatility metrics
- **Model Caching**: 7-day intelligent caching system for faster predictions
- **Performance Metrics**: MSE, RMSE, MAE with confidence scoring
- **Interactive Charts**: Real-time visualization using Recharts
- **Historical Tracking**: Prediction history and accuracy monitoring

### Quantitative Tools
- **Black-Scholes Calculator**: European options pricing
- **DCF Calculator**: Discounted Cash Flow valuation
- **Monte Carlo Simulator**: Portfolio risk analysis
- **Portfolio Optimizer**: Efficient frontier optimization
- **Sharpe Ratio Calculator**: Risk-adjusted returns
- **Volatility Calculator**: Historical and implied volatility

### Reports
- Access to quantitative finance case studies and research

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Recharts** for interactive data visualization
- **Lucide React** for icons
- **Supabase Client** for real-time data

### Backend
- **FastAPI** for RESTful API
- **PyTorch** for LSTM model
- **scikit-learn** for data preprocessing
- **yfinance** for stock data
- **Supabase** for data persistence
- **Python 3.8+**

### Database
- **Supabase (PostgreSQL)** with Row Level Security
- Tables for models, predictions, performance metrics, and historical prices

## Project Structure

```
project/
├── src/                          # Frontend source
│   ├── components/
│   │   ├── charts/              # Recharts components
│   │   │   ├── PredictionChart.tsx
│   │   │   ├── PerformanceMetricsDisplay.tsx
│   │   │   └── LatestPredictionCard.tsx
│   │   ├── tools/               # Quantitative calculators
│   │   └── Navigation.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── StockPrediction.tsx  # LSTM prediction interface
│   │   ├── QuantTools.tsx
│   │   ├── Reports.tsx
│   │   ├── About.tsx
│   │   └── Pricing.tsx
│   ├── services/
│   │   └── predictionApi.ts     # API client
│   └── App.tsx
├── backend/                      # Python backend
│   ├── config.py                # Configuration
│   ├── data_service.py          # Stock data fetching
│   ├── model_service.py         # LSTM model
│   ├── database_service.py      # Supabase integration
│   ├── prediction_service.py    # Orchestration
│   ├── main.py                  # FastAPI app
│   ├── requirements.txt
│   └── README.md                # Backend documentation
├── public/
│   └── reports/                 # PDF reports
├── DEPLOYMENT.md                # Deployment guide
└── README.md                    # This file
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Supabase account
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd project
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

   Update with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   VITE_API_URL=http://localhost:8000
   ```

4. **Set up the database:**

   The Supabase tables are already configured. If you need to recreate them, run the migration SQL from the project.

5. **Set up the backend:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```

6. **Configure backend environment:**

   Create `backend/.env`:
   ```bash
   cp backend/.env.example backend/.env
   ```

   Add your Supabase service role key and other settings.

### Running Locally

**Start the backend:**
```bash
cd backend
source venv/bin/activate
python main.py
```

The API will run at `http://localhost:8000`

**In a new terminal, start the frontend:**
```bash
npm run dev
```

The app will run at `http://localhost:5173`

### Building for Production

**Frontend:**
```bash
npm run build
```

**Backend:**
The backend runs as-is in production. See `DEPLOYMENT.md` for deployment instructions.

## API Documentation

Once the backend is running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### Main Endpoints

- `POST /api/predict` - Generate stock prediction
- `GET /api/prediction-history/{ticker}` - Get prediction history
- `GET /api/model-performance/{ticker}` - Get model metrics
- `GET /health` - Health check

## Usage

### Stock Prediction

1. Navigate to the Stock Prediction page
2. Enter a stock ticker (e.g., AAPL, TSLA, MSFT)
3. Click "Predict"
4. View:
   - Next-day price prediction
   - Model performance metrics (MSE, RMSE, MAE)
   - Interactive price chart
   - Support and resistance levels
   - Trend analysis and recommendations

### Quantitative Tools

Each tool provides specialized financial calculations:
- Input your parameters
- View real-time calculations
- Interactive charts where applicable

## LSTM Model Details

### Architecture
- **Type**: Bidirectional LSTM
- **Layers**: 2 LSTM layers with 50 hidden units each
- **Dropout**: 0.3 for regularization
- **Batch Normalization**: Applied after LSTM output
- **Output**: Single value (next day's closing price)

### Training Features
1. Price-to-Earnings ratio (P/E)
2. Return on Equity (ROE)
3. Debt-to-Equity ratio
4. MACD (Moving Average Convergence Divergence)
5. RSI (Relative Strength Index)
6. 3 days of lagged closing prices
7. 7-day rolling mean
8. 7-day rolling standard deviation

### Training Parameters
- **Optimizer**: Adam (lr=0.001, weight_decay=1e-5)
- **Loss Function**: Mean Squared Error
- **Batch Size**: 64
- **Sequence Length**: 60 days
- **Early Stopping**: 75 epochs patience
- **Data Split**: 70% train, 10% validation, 20% test

### Performance
- Models are cached for 7 days
- Automatic retraining when cache expires
- Typical MAE: 2-10 (depending on stock volatility)
- Training time: 5-15 minutes (CPU), 2-5 minutes (GPU)

## Deployment

See `DEPLOYMENT.md` for comprehensive deployment instructions to Hostinger or other hosting providers.

**Quick Deploy Checklist:**
1. Build frontend: `npm run build`
2. Upload backend to server
3. Install Python dependencies
4. Configure environment variables
5. Set up process manager (Supervisor/PM2)
6. Configure reverse proxy (Nginx/Apache)
7. Enable SSL/HTTPS
8. Deploy frontend static files
9. Test all endpoints

## Development

### Code Style
- TypeScript with strict mode
- ESLint for linting
- Functional React components with hooks
- Modular Python services

### Adding New Features

**Frontend:**
1. Create component in appropriate directory
2. Add route in `App.tsx` if needed
3. Update navigation in `Navigation.tsx`
4. Add TypeScript types

**Backend:**
1. Add service function in appropriate service file
2. Create endpoint in `main.py`
3. Update API documentation
4. Test with Swagger UI

## Testing

**Frontend:**
```bash
npm run typecheck  # TypeScript type checking
npm run lint       # ESLint
```

**Backend:**
```bash
# Run the API locally and test endpoints
curl http://localhost:8000/health
curl -X POST http://localhost:8000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"ticker": "AAPL"}'
```

## Troubleshooting

### Frontend Issues

**Build errors:**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Update dependencies: `npm update`

**API connection errors:**
- Verify `VITE_API_URL` in `.env`
- Check if backend is running
- Check browser console for CORS errors

### Backend Issues

**Import errors:**
- Ensure virtual environment is activated
- Reinstall requirements: `pip install -r requirements.txt`

**Model training timeout:**
- Reduce epochs in `model_service.py`
- Use smaller sequence length
- Enable GPU if available

**Database errors:**
- Verify Supabase credentials
- Check table schemas
- Ensure RLS policies are correct

## Performance Optimization

### Frontend
- Code splitting with dynamic imports
- Image optimization
- Lazy loading components
- CDN for static assets

### Backend
- Model caching (implemented)
- Connection pooling
- Request rate limiting
- Redis caching (optional)

## Security

- Environment variables for sensitive data
- Supabase RLS policies enabled
- CORS configured properly
- Service role key only on backend
- HTTPS in production
- Input validation on all endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private. All rights reserved.

## Support

For issues or questions:
- Check this README
- Review `DEPLOYMENT.md`
- Check backend `README.md`
- Review API documentation at `/docs`

## Acknowledgments

- PyTorch for the deep learning framework
- Supabase for the backend infrastructure
- yfinance for stock data
- Recharts for data visualization
- FastAPI for the API framework

## Roadmap

- [ ] Multi-day predictions (7-day, 30-day)
- [ ] Additional technical indicators
- [ ] Sentiment analysis integration
- [ ] Real-time WebSocket updates
- [ ] Portfolio tracking features
- [ ] Email alerts for predictions
- [ ] Mobile app (React Native)
- [ ] Additional ML models (GRU, Transformer)

---

Built with React, TypeScript, FastAPI, PyTorch, and Supabase.
>>>>>>> e80ec3c9 (Initial commit of Iridescent Deployment 2)
