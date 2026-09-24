import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// The publishable key is safe in the bundle because row-level security only lets it insert
// enquiries, never read them. Null when the env vars are missing, so the page still renders.
export const supabase =
  url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
