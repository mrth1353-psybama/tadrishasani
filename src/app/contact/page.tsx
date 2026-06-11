import type { Metadata } from "next";
import { Clock, Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/contact/ContactForm";
import { socialLinks } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "تماس با من | DataMind AI",
  description:
    "برای رزرو جلسه مشاوره رایگان یا ثبت درخواست تحلیل آماری و مدل‌یابی معادلات ساختاری (SEM)، فرم تماس را پر کنید.",
};

const contactInfo = [
  {
    icon: Mail,
    title: "ایمیل",
    value: "mrth1353@gmail.com",
  },
  {
    icon: Clock,
    title: "زمان پاسخ‌گویی",
    value: "معمولاً ظرف ۲۴ تا ۴۸ ساعت کاری پاسخ داده می‌شود.",
  },
  {
    icon: MessageCircle,
    title: "شبکه‌های اجتماعی",
    value: socialLinks.map((link) => link.label).join(" · "),
  },
];

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="تماس با من"
          title="بگویید برای چه چیزی به کمک نیاز دارید"
          description="فرم زیر را پر کنید تا خلاصه‌ای از پروژه یا سوال‌تان برایم ارسال شود. می‌توانید همین حالا جلسه مشاوره رایگان را هم درخواست بدهید."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            {contactInfo.map(({ icon: Icon, title, value }) => (
              <Card key={title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-charcoal">
                    {title}
                  </h3>
                  <p
                    className="mt-1 text-sm leading-7 text-brand-charcoal/70"
                    dir={title === "ایمیل" ? "ltr" : undefined}
                  >
                    {value}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <Card>
            <ContactForm />
          </Card>
        </div>
      </Container>
    </section>
  );
}
