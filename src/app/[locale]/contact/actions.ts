"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { headers } from "next/headers";

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(255),
  email: z.string().email("Invalid email address"),
  phone: z.string().max(50).optional(),
  subject: z.string().max(255).optional(),
  message: z.string().min(10, "Message is too short").max(5000),
  website: z.string().max(255).optional() // Honeypot
});

export async function sendContactMessageAction(locale: string, formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
    website: formData.get("website") as string,
  };

  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    redirect(`/${locale}/contact?error=invalid`);
  }

  // Honeypot check
  if (parsed.data.website) {
    // If the honeypot is filled out, act like it succeeded to fool the bot
    redirect(`/${locale}/contact?status=sent`);
  }

  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          // not needed for anon client in this context
        },
        remove(name: string, options: any) {
          // not needed for anon client in this context
        },
      },
    }
  );

  const headersList = headers();
  const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip");
  const userAgent = headersList.get("user-agent");

  const { error } = await supabase.from("contact_messages").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    subject: parsed.data.subject || null,
    message: parsed.data.message,
    locale: locale,
    ip_address: ip,
    user_agent: userAgent,
    status: 'new',
    is_read: false
  });

  if (error) {
    console.error("Contact message insert error:", error);
    redirect(`/${locale}/contact?error=send-failed`);
  }

  redirect(`/${locale}/contact?status=sent`);
}
