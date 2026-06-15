"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { 
  updateContactMessageStatus, 
  updateContactMessageNote, 
  markContactMessageRead,
  archiveContactMessage 
} from "@/lib/admin/contact-messages";
import { ContactMessageStatus } from "@/types";
import { requireAdmin } from "@/lib/auth/admin";

export async function updateMessageStatusAction(locale: string, id: string, status: ContactMessageStatus) {
  await requireAdmin(locale);
  const updated = await updateContactMessageStatus(id, status);
  revalidatePath(`/${locale}/admin/messages`);
  revalidatePath(`/${locale}/admin/messages/${id}`);
  redirect(
    `/${locale}/admin/messages/${id}?${updated ? "status=message-updated" : "error=message-update-failed"}`
  );
}

export async function updateMessageNoteAction(locale: string, id: string, formData: FormData) {
  await requireAdmin(locale);
  const note = formData.get("admin_note") as string;
  const updated = await updateContactMessageNote(id, note);
  revalidatePath(`/${locale}/admin/messages`);
  revalidatePath(`/${locale}/admin/messages/${id}`);
  redirect(
    `/${locale}/admin/messages/${id}?${updated ? "status=note-saved" : "error=note-save-failed"}`
  );
}

export async function markMessageReadAction(locale: string, id: string) {
  await requireAdmin(locale);
  const readUpdated = await markContactMessageRead(id);
  const statusUpdated = await updateContactMessageStatus(id, "read");
  revalidatePath(`/${locale}/admin/messages`);
  revalidatePath(`/${locale}/admin/messages/${id}`);
  redirect(
    `/${locale}/admin/messages/${id}?${readUpdated && statusUpdated ? "status=message-read" : "error=message-update-failed"}`
  );
}

export async function archiveMessageAction(locale: string, id: string) {
  await requireAdmin(locale);
  const archived = await archiveContactMessage(id);
  revalidatePath(`/${locale}/admin/messages`);
  revalidatePath(`/${locale}/admin/messages/${id}`);
  redirect(`/${locale}/admin/messages?${archived ? "status=archived" : "error=archive-failed"}`);
}
