import { createClient } from "@supabase/supabase-js";

export interface ISmoothie {
  id: number;
  title: string;
  method: string;
  rating: number;
}

interface IDatabase {
  public: {
    Tables: {
      smoothies: {
        Row: ISmoothie;
        Insert: {};
        Update: {};
      };
    };
  };
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient<IDatabase>(supabaseUrl, supabaseAnonKey);

export default supabase;
