import { createClient } from '../supabase/server';

export async function getAdminProjects() {
  const supabase = createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching admin projects:', error);
    return [];
  }

  return data;
}

export async function getAdminProjectById(id: string) {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createProject(payload: any) {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase
    .from('projects')
    .insert([payload])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateProject(id: string, payload: any) {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase
    .from('projects')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteProject(id: string) {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
}

export async function getProjectCategories() {
  const supabase = createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('project_categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching project categories:', error);
    return [];
  }

  return data;
}

export async function getProjectImages(projectId: string) {
  const supabase = createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('project_images')
    .select('*')
    .eq('project_id', projectId)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching project images:', error);
    return [];
  }

  return data;
}

export async function addProjectImage(payload: any) {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase
    .from('project_images')
    .insert([payload])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteProjectImage(id: string) {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const { error } = await supabase
    .from('project_images')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
}

export async function getProjectImageById(id: string) {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase
    .from('project_images')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateProjectImage(id: string, payload: any) {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase
    .from('project_images')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getNextProjectImageSortOrder(projectId: string) {
  const supabase = createClient();
  if (!supabase) return 1;

  const { data, error } = await supabase
    .from('project_images')
    .select('sort_order')
    .eq('project_id', projectId)
    .order('sort_order', { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) {
    return 1;
  }

  return data[0].sort_order + 1;
}
