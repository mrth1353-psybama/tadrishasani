import { ArrowLeft, BrainCircuit, ChartSpline } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceCategories } from "@/lib/services-data";

const icons = {
  statistical_analysis: ChartSpline,
  ai_consulting: BrainCircuit,
};

export function ServicesPreview() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="خدمات"
          title="دو تخصص در یک قاب"
          description="ترکیب مدل‌یابی معادلات ساختاری در روان‌شناسی و مشاوره هوش مصنوعی در پژوهش."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {(
            Object.entries(serviceCategories) as [
              keyof typeof serviceCategories,
              (typeof serviceCategories)[keyof typeof serviceCategories],
            ][]
          ).map(([key, category]) => {
            const Icon = icons[key];
            return (
              <Card key={key} className="flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                  <Icon size={24} />
                </div>
                <h3 className="mt-4 text-xl font-bold text-brand-charcoal">
                  {category.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-7 text-brand-charcoal/70">
                  {category.description}
                </p>
                <Link
                  href="/services"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-teal hover:text-brand-teal/80"
                >
                  مشاهده پکیج‌ها
                  <ArrowLeft size={16} />
                </Link>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
