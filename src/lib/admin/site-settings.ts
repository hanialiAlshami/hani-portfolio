import { createClient } from '../supabase/server';
import { requireAdmin } from '../auth/admin';

export async function getAdminSiteSettings() {
  const supabase = createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching admin site settings:', error);
    return null;
  }
  return data;
}

export async function updateSiteSettings(payload: any) {
  const supabase = createClient();
  if (!supabase) throw new Error('Supabase not configured');

  // get the single row ID or insert if none exists
  const existing = await getAdminSiteSettings();

  let result;
  if (existing) {
    result = await supabase
      .from('site_settings')
      .update(payload)
      .eq('id', existing.id);
  } else {
    result = await supabase
      .from('site_settings')
      .insert([payload]);
  }

  if (result.error) {
    console.error('Error updating site settings:', result.error);
    throw result.error;
  }
  
  return true;
}

export async function uploadSiteAsset(file: File, folder: 'avatars' | 'cv') {
  const supabase = createClient();
  if (!supabase) throw new Error('Supabase not configured');

  const ext = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;

  const { data, error } = await supabase.storage
    .from('portfolio-assets')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Asset upload error:', error);
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from('portfolio-assets')
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}
