// src/supabase.js
import { createClient } from "@supabase/supabase-js";

// ⚠️ Replace these with your actual Supabase project credentials
const supabaseUrl = "https://pihupxetppktzgeimrra.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpaHVweGV0cHBrdHpnZWltcnJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNTY1OTUsImV4cCI6MjA4NjYzMjU5NX0.emF77w0Zs3cd6wm050wYuhAxjflPuty3B4Ok__-BX4Q";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Optional: sanity check
console.log("Supabase client created", supabaseUrl, supabaseAnonKey.substring(0, 10) + "...");
