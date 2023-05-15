import { createClient } from "@supabase/supabase-js";

export interface IModifySmoothie {
  title: string;
  method: string;
  rating: number;
}

export interface ISmoothie extends IModifySmoothie {
  id: number;
}

interface IDatabase {
  public: {
    Tables: {
      smoothies: {
        Row: ISmoothie;
        Insert: IModifySmoothie;
        Update: IModifySmoothie;
      };
    };
  };
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient<IDatabase>(supabaseUrl, supabaseAnonKey);

export default supabase;
