const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://irymboppniinqacwlhth.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyeW1ib3BwbmlpbnFhY3dsaHRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcwMzg5ODQsImV4cCI6MjAyMjYxNDk4NH0.__EknkrcBfxIO4eB7U_yrnIf22RGS8_7YGrl70hz_JU";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;
