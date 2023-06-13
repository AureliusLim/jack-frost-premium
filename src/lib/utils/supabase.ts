//import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient("https://fnfeloobddyomdlepjjn.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuZmVsb29iZGR5b21kbGVwampuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY2NDU5NjMsImV4cCI6MjAwMjIyMTk2M30.4Su4At0rgoeS1417sE6WUj5gHiMYsuVIQmKrhyooX34");
