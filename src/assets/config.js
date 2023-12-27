import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://unseivijsxaneqvdnzjt.supabase.co/";
const annon =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuc2Vpdmlqc3hhbmVxdmRuemp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM2MTA2OTQsImV4cCI6MjAxOTE4NjY5NH0.awPAK-_H3moAqWtMezKV0zjcMzj8hUW_Z8yiKh443ew";

const configuredSupabase = createClient(supabaseUrl, annon);

export default configuredSupabase;
