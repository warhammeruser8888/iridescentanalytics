/*
  # Stock Prediction System Database Schema

  1. New Tables
    - `trained_models`
      - `id` (uuid, primary key)
      - `ticker` (text, stock ticker symbol)
      - `model_storage_path` (text, path to model file in Supabase Storage)
      - `training_date` (timestamptz, when model was trained)
      - `last_used` (timestamptz, for cache management)
      - `model_metadata` (jsonb, stores scaler parameters and feature info)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `predictions`
      - `id` (uuid, primary key)
      - `ticker` (text, stock ticker symbol)
      - `prediction_date` (timestamptz, when prediction was made)
      - `predicted_price` (decimal, predicted closing price)
      - `actual_price` (decimal, actual closing price if available)
      - `prediction_horizon` (text, e.g., '1day', '7days')
      - `target_date` (date, the date being predicted)
      - `metadata` (jsonb, stores additional prediction details)
      - `created_at` (timestamptz)
    
    - `model_performance`
      - `id` (uuid, primary key)
      - `ticker` (text, stock ticker symbol)
      - `mse` (decimal, mean squared error)
      - `rmse` (decimal, root mean squared error)
      - `mae` (decimal, mean absolute error)
      - `confidence_score` (decimal, model confidence percentage)
      - `test_samples` (integer, number of test samples used)
      - `training_date` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `historical_prices`
      - `id` (uuid, primary key)
      - `ticker` (text, stock ticker symbol)
      - `date` (date, trading date)
      - `open` (decimal)
      - `high` (decimal)
      - `low` (decimal)
      - `close` (decimal)
      - `volume` (bigint)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read their own data
    - Add policies for service role to manage all data (for backend API)

  3. Indexes
    - Create indexes on ticker and date columns for fast queries
    - Create composite indexes for common query patterns
*/

-- Create trained_models table
CREATE TABLE IF NOT EXISTS trained_models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticker text NOT NULL,
  model_storage_path text NOT NULL,
  training_date timestamptz NOT NULL DEFAULT now(),
  last_used timestamptz DEFAULT now(),
  model_metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index on ticker for fast lookups
CREATE INDEX IF NOT EXISTS idx_trained_models_ticker ON trained_models(ticker);
CREATE INDEX IF NOT EXISTS idx_trained_models_training_date ON trained_models(training_date DESC);

-- Create predictions table
CREATE TABLE IF NOT EXISTS predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticker text NOT NULL,
  prediction_date timestamptz NOT NULL DEFAULT now(),
  predicted_price decimal(12, 4) NOT NULL,
  actual_price decimal(12, 4),
  prediction_horizon text DEFAULT '1day',
  target_date date NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for predictions
CREATE INDEX IF NOT EXISTS idx_predictions_ticker ON predictions(ticker);
CREATE INDEX IF NOT EXISTS idx_predictions_target_date ON predictions(target_date DESC);
CREATE INDEX IF NOT EXISTS idx_predictions_ticker_target ON predictions(ticker, target_date DESC);

-- Create model_performance table
CREATE TABLE IF NOT EXISTS model_performance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticker text NOT NULL,
  mse decimal(12, 6) NOT NULL,
  rmse decimal(12, 6) NOT NULL,
  mae decimal(12, 6) NOT NULL,
  confidence_score decimal(5, 2) DEFAULT 0,
  test_samples integer DEFAULT 0,
  training_date timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for model_performance
CREATE INDEX IF NOT EXISTS idx_model_performance_ticker ON model_performance(ticker);
CREATE INDEX IF NOT EXISTS idx_model_performance_training_date ON model_performance(training_date DESC);

-- Create historical_prices table
CREATE TABLE IF NOT EXISTS historical_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticker text NOT NULL,
  date date NOT NULL,
  open decimal(12, 4) NOT NULL,
  high decimal(12, 4) NOT NULL,
  low decimal(12, 4) NOT NULL,
  close decimal(12, 4) NOT NULL,
  volume bigint DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(ticker, date)
);

-- Create indexes for historical_prices
CREATE INDEX IF NOT EXISTS idx_historical_prices_ticker ON historical_prices(ticker);
CREATE INDEX IF NOT EXISTS idx_historical_prices_date ON historical_prices(date DESC);
CREATE INDEX IF NOT EXISTS idx_historical_prices_ticker_date ON historical_prices(ticker, date DESC);

-- Enable Row Level Security
ALTER TABLE trained_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE historical_prices ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for demonstration purposes)
-- In production, you would restrict this based on authentication
CREATE POLICY "Allow public read access to trained_models"
  ON trained_models
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to predictions"
  ON predictions
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to model_performance"
  ON model_performance
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to historical_prices"
  ON historical_prices
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for service role (backend API) to manage all data
CREATE POLICY "Service role can insert trained_models"
  ON trained_models
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update trained_models"
  ON trained_models
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can insert predictions"
  ON predictions
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update predictions"
  ON predictions
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can insert model_performance"
  ON model_performance
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update model_performance"
  ON model_performance
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can insert historical_prices"
  ON historical_prices
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update historical_prices"
  ON historical_prices
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);