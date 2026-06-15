import { createClient } from '../supabase/server';
import { redirect } from 'next/navigation';

export async function getCurrentUser() {
  const supabase = createClient();
  if (!supabase) return null;

  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return user;
  } catch (error) {
    return null;
  }
}

export async function getCurrentAdmin() {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .single();

  if (error || !data) return null;

  return { user, adminProfile: data };
}

export async function requireAdmin(locale: string) {
  const supabase = createClient();
  if (!supabase) {
    return { isConfigured: false, admin: null };
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect(`/${locale}/admin/login`);
  }

  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect(`/${locale}/admin/access-denied`);
  }

  return { isConfigured: true, admin };
}
