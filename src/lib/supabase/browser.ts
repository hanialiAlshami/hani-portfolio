import { createBrowserClient } from '@supabase/ssr';
import { getSupabaseConfig } from './config';

export function createClient() {
  const { isConfigured, supabaseUrl, supabaseAnonKey } = getSupabaseConfig();

  if (!isConfigured) {
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
