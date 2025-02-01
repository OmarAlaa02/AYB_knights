
import {createClient} from '@supabase/supabase-js';

const supabaseURL='https://uhltlhetnaftyqohudod.supabase.co';
const API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVobHRsaGV0bmFmdHlxb2h1ZG9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5MTI4NDIsImV4cCI6MjA1MzQ4ODg0Mn0.sKbP3Wy9GqtWl021pCM_9lxZALoTEOHhmoiGgB4upGk"

const supabase = createClient(supabaseURL,API_KEY);

export default supabase;