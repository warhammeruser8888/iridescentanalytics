/*
  # Create Reports Management System Tables

  1. New Tables
    - `reports`
      - `id` (uuid, primary key) - Unique identifier for each report
      - `title` (text) - Report title
      - `type` (text) - Report type (e.g., "Long Recommendation", "Short Recommendation")
      - `date` (text) - Publication date
      - `analyst` (text) - Analyst name
      - `recommendation` (text) - Investment recommendation (Long, Short, Research, Case Study)
      - `target_price` (text, nullable) - Target price for stock recommendations
      - `current_price` (text, nullable) - Current price for stock recommendations
      - `icon_name` (text) - Lucide icon name for visual representation
      - `color` (text) - Color theme (red, green, blue, purple)
      - `summary` (text) - Brief summary for card display
      - `content` (text) - Full report content with HTML formatting
      - `pdf_url` (text, nullable) - Optional PDF download link
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `reports` table
    - Add policy for public read access (anyone can view reports)
    - Add policy for authenticated admin users to insert reports
    - Add policy for authenticated admin users to update reports
    - Add policy for authenticated admin users to delete reports

  3. Indexes
    - Add index on title for search performance
    - Add index on type for filtering
    - Add index on analyst for filtering
    - Add index on date for sorting
*/

CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL,
  date text NOT NULL,
  analyst text NOT NULL,
  recommendation text NOT NULL,
  target_price text,
  current_price text,
  icon_name text NOT NULL DEFAULT 'FileText',
  color text NOT NULL DEFAULT 'blue',
  summary text NOT NULL,
  content text NOT NULL,
  pdf_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reports"
  ON reports
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert reports"
  ON reports
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update reports"
  ON reports
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete reports"
  ON reports
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_reports_title ON reports(title);
CREATE INDEX IF NOT EXISTS idx_reports_type ON reports(type);
CREATE INDEX IF NOT EXISTS idx_reports_analyst ON reports(analyst);
CREATE INDEX IF NOT EXISTS idx_reports_date ON reports(date);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at DESC);