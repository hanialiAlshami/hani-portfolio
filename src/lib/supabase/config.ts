export const getSupabaseConfig = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return { isConfigured: false, supabaseUrl: '', supabaseAnonKey: '' };
  }

  return { isConfigured: true, supabaseUrl, supabaseAnonKey };
};
