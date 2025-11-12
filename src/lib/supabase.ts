import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Report {
  id: string;
  title: string;
  type: string;
  date: string;
  analyst: string;
  recommendation: string;
  target_price: string | null;
  current_price: string | null;
  icon_name: string;
  color: string;
  summary: string;
  content: string;
  pdf_url: string | null;
  created_at: string;
  updated_at: string;
}
