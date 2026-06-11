import { NextResponse } from "next/server";
import { notifyContactMessage } from "@/lib/email";

export async function POST(request: Request) {
  const { name, email, topic, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "نام، ایمیل و پیام الزامی هستند." },
      { status: 400 },
    );
  }

  await notifyContactMessage({
    name: String(name),
    email: String(email),
    topic: String(topic ?? "سایر موارد"),
    message: String(message),
  });

  return NextResponse.json({ ok: true });
}
