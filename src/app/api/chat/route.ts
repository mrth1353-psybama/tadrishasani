import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `تو یک دستیار هوشمند و متخصص برای وبسایت «دیتامایند ای‌آی» هستی.

تخصص تو:
- تحلیل داده‌های آماری برای رشته‌های روانشناسی عمومی، روانشناسی بالینی، مشاوره و علوم تربیتی
- نرم‌افزارهای آماری: SPSS، AMOS، LISREL
- مدل‌یابی معادلات ساختاری (SEM)
- کمک به دانشجویان پایان‌نامه ارشد و دکتری و نویسندگان مقالات علمی

خدماتی که ارائه می‌دهی:
- راهنمایی درباره نحوه تحلیل داده‌ها
- توضیح روش‌های آماری مناسب برای هر پژوهش
- اطلاع‌رسانی درباره خدمات و هزینه‌ها (برای اطلاع دقیق از قیمت، کاربر را به صفحه «خدمات و تعرفه‌ها» یا تماس مستقیم راهنمایی کن)
- بیش از ۱۰ سال تجربه در این حوزه

قوانین مهم:
- همیشه به فارسی روان و مودبانه پاسخ بده
- پاسخ‌ها را کوتاه و مفید نگه دار
- اگر سوال خارج از حوزه تخصصی بود، مودبانه توضیح بده و پیشنهاد بده از طریق صفحه تماس اقدام کنند
- برای ثبت سفارش یا مشاوره تخصصی، کاربر را به صفحه تماس راهنمایی کن`;

export async function POST(request: Request) {
  const { messages } = await request.json();

  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: "پیام‌ها نامعتبر هستند." }, { status: 400 });
  }

  const apiKey = process.env.SILICONFLOW_API_KEY;
  if (!apiKey || apiKey === "your_api_key_here") {
    return NextResponse.json({ error: "سرویس چت‌بات در حال راه‌اندازی است." }, { status: 503 });
  }

  const response = await fetch("https://api.siliconflow.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "Qwen/Qwen2.5-7B-Instruct",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 512,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "خطا در ارتباط با سرویس هوش مصنوعی." }, { status: 502 });
  }

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content ?? "متأسفم، پاسخی دریافت نشد.";

  return NextResponse.json({ reply });
}
