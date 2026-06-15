import { createClient } from '../supabase/server';
import { getCurrentAdmin } from '../auth/admin';

export async function listServices() {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error('Unauthorized');
  
  const supabase = createClient();
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true });
    
  if (error) throw new Error(error.message);
  return data;
}

export async function getService(id: string) {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error('Unauthorized');
  
  const supabase = createClient();
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) throw new Error(error.message);
  return data;
}

export async function createService(serviceData: any) {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error('Unauthorized');
  
  const supabase = createClient();
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('services')
    .insert([serviceData])
    .select()
    .single();
    
  if (error) throw new Error(error.message);
  return data;
}

export async function updateService(id: string, serviceData: any) {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error('Unauthorized');
  
  const supabase = createClient();
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('services')
    .update(serviceData)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteService(id: string) {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error('Unauthorized');
  
  const supabase = createClient();
  if (!supabase) throw new Error('Supabase not configured');
  
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);
    
  if (error) throw new Error(error.message);
  return true;
}
