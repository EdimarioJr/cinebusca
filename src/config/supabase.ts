import { SUPABASE_KEY, SUPABASE_URL } from ".";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

// Create a single supabase client for interacting with your database
export const supabase = createPagesBrowserClient({
  supabaseUrl: SUPABASE_URL,
  supabaseKey: SUPABASE_KEY,
});
