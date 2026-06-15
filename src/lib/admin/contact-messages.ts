import { createClient } from "@/lib/supabase/server";
import { ContactMessage, ContactMessageStatus } from "@/types";

function requireSupabaseClient() {
  const supabase = createClient();
  if (!supabase) {
    throw new Error('Supabase server client is not configured.');
  }
  return supabase;
}

export async function getContactMessages(filters?: { status?: string; isRead?: boolean }): Promise<ContactMessage[]> {
  const supabase = requireSupabaseClient();

  let query = supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }
  if (filters?.isRead !== undefined) {
    query = query.eq('is_read', filters.isRead);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching contact messages:', error);
    return [];
  }

  return data.map((d: any) => ({
    id: d.id,
    name: d.name,
    email: d.email,
    phone: d.phone,
    subject: d.subject,
    message: d.message,
    locale: d.locale,
    status: d.status as ContactMessageStatus,
    isRead: d.is_read,
    adminNote: d.admin_note,
    createdAt: d.created_at,
    updatedAt: d.updated_at
  }));
}

export async function getContactMessageById(id: string): Promise<ContactMessage | null> {
  const supabase = requireSupabaseClient();

  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error(`Error fetching contact message ${id}:`, error);
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    subject: data.subject,
    message: data.message,
    locale: data.locale,
    status: data.status as ContactMessageStatus,
    isRead: data.is_read,
    adminNote: data.admin_note,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  };
}

export async function updateContactMessageStatus(id: string, status: ContactMessageStatus): Promise<boolean> {
  const supabase = requireSupabaseClient();
  const { error } = await supabase
    .from('contact_messages')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('Error updating message status:', error);
    return false;
  }
  return true;
}

export async function updateContactMessageNote(id: string, note: string): Promise<boolean> {
  const supabase = requireSupabaseClient();
  const { error } = await supabase
    .from('contact_messages')
    .update({ admin_note: note, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('Error updating message note:', error);
    return false;
  }
  return true;
}

export async function markContactMessageRead(id: string): Promise<boolean> {
  const supabase = requireSupabaseClient();
  const { error } = await supabase
    .from('contact_messages')
    .update({ is_read: true, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('Error marking message read:', error);
    return false;
  }
  return true;
}

export async function archiveContactMessage(id: string): Promise<boolean> {
  return updateContactMessageStatus(id, 'archived');
}
