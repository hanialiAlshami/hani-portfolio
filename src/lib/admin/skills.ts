import { createClient } from '../supabase/server';
import { getCurrentAdmin } from '../auth/admin';

export async function listSkillCategories() {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error('Unauthorized');
  
  const supabase = createClient();
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('skill_categories')
    .select('*')
    .order('sort_order', { ascending: true });
    
  if (error) throw new Error(error.message);
  return data;
}

export async function listSkills() {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error('Unauthorized');
  
  const supabase = createClient();
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('skills')
    .select(`
      *,
      skill_categories ( id, name_en, name_ar )
    `)
    .order('sort_order', { ascending: true });
    
  if (error) throw new Error(error.message);
  return data;
}

export async function getSkill(id: string) {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error('Unauthorized');
  
  const supabase = createClient();
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) throw new Error(error.message);
  return data;
}

export async function createSkill(skillData: any) {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error('Unauthorized');
  
  const supabase = createClient();
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('skills')
    .insert([skillData])
    .select()
    .single();
    
  if (error) throw new Error(error.message);
  return data;
}

export async function updateSkill(id: string, skillData: any) {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error('Unauthorized');
  
  const supabase = createClient();
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('skills')
    .update(skillData)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteSkill(id: string) {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error('Unauthorized');
  
  const supabase = createClient();
  if (!supabase) throw new Error('Supabase not configured');
  
  const { error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id);
    
  if (error) throw new Error(error.message);
  return true;
}
