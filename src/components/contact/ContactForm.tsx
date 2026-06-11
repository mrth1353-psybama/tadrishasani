"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";

const topics = [
  "تحلیل آماری پایان‌نامه/مقاله",
  "مدل‌یابی معادلات ساختاری (SEM)",
  "آموزش خصوصی SPSS/Amos/Lisrel",
  "مشاوره و آموزش هوش مصنوعی",
  "سایر موارد",
];

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const topic = String(formData.get("topic") ?? "");
    const message = String(formData.get("message") ?? "");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, topic, message }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "خطا در ارسال پیام.");
      }

      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ارسال پیام.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-brand-charcoal"
          >
            نام و نام خانوادگی
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-brand-charcoal/15 bg-white px-4 py-3 text-sm text-brand-charcoal outline-none focus:border-brand-teal"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-brand-charcoal"
          >
            ایمیل
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            dir="ltr"
            className="w-full rounded-xl border border-brand-charcoal/15 bg-white px-4 py-3 text-sm text-brand-charcoal outline-none focus:border-brand-teal"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="topic"
          className="mb-2 block text-sm font-semibold text-brand-charcoal"
        >
          موضوع درخواست
        </label>
        <select
          id="topic"
          name="topic"
          defaultValue={topics[0]}
          className="w-full rounded-xl border border-brand-charcoal/15 bg-white px-4 py-3 text-sm text-brand-charcoal outline-none focus:border-brand-teal"
        >
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-semibold text-brand-charcoal"
        >
          توضیحات پروژه
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="کمی درباره پروژه، داده‌ها و سوالات پژوهش‌تان بنویسید..."
          className="w-full rounded-xl border border-brand-charcoal/15 bg-white px-4 py-3 text-sm text-brand-charcoal outline-none focus:border-brand-teal"
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? "در حال ارسال..." : "ارسال پیام"}
      </Button>

      {submitted && (
        <p className="text-sm text-brand-teal">
          پیام شما با موفقیت ارسال شد. به‌زودی پاسخ می‌دهیم.
        </p>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
