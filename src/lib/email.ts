import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "DataMind AI <onboarding@resend.dev>";
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || "mrth1353@gmail.com";

export async function notifyNewOrder({
  serviceName,
  customerName,
  customerEmail,
  notes,
  orderId,
}: {
  serviceName: string;
  customerName: string;
  customerEmail: string;
  notes?: string | null;
  orderId: string;
}) {
  if (!resend) {
    console.warn("RESEND_API_KEY تنظیم نشده؛ ایمیل اطلاع‌رسانی سفارش ارسال نشد.");
    return;
  }

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: "سفارش جدید در DataMind AI",
    html: `
      <div dir="rtl" style="font-family: Tahoma, sans-serif; line-height: 1.8;">
        <h2>یک سفارش جدید ثبت شد</h2>
        <p><strong>خدمت:</strong> ${serviceName}</p>
        <p><strong>کاربر:</strong> ${customerName} (${customerEmail})</p>
        ${notes ? `<p><strong>توضیحات:</strong><br />${notes.replace(/\n/g, "<br />")}</p>` : ""}
        <p>برای بررسی، به پنل ادمین مراجعه کنید: <code>/admin/orders/${orderId}</code></p>
      </div>
    `,
  });
}

export async function notifyContactMessage({
  name,
  email,
  topic,
  message,
}: {
  name: string;
  email: string;
  topic: string;
  message: string;
}) {
  if (!resend) {
    console.warn("RESEND_API_KEY تنظیم نشده؛ ایمیل فرم تماس ارسال نشد.");
    return;
  }

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    replyTo: email,
    subject: `درخواست مشاوره: ${topic}`,
    html: `
      <div dir="rtl" style="font-family: Tahoma, sans-serif; line-height: 1.8;">
        <h2>پیام جدید از فرم تماس سایت</h2>
        <p><strong>نام:</strong> ${name}</p>
        <p><strong>ایمیل:</strong> ${email}</p>
        <p><strong>موضوع:</strong> ${topic}</p>
        <p><strong>پیام:</strong><br />${message.replace(/\n/g, "<br />")}</p>
      </div>
    `,
  });
}
