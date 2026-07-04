import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PlanningLinks } from "@/components/PlanningLinks";
import { FAQSection } from "@/components/FAQSection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { siteFaqs } from "@/data/faqs";

const path = "/faq";

export const metadata = buildMetadata({
  title: "Cartagena Cruise FAQ",
  description:
    "Frequently asked questions about Cartagena shore excursions, the cruise port, Roman Highlights, walking distances, Murcia timing and return-to-ship confidence for cruise passengers.",
  path,
  keywords: ["Cartagena cruise port FAQ", "Cartagena shore excursions FAQ", "Cartagena from cruise ship FAQ"],
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "FAQ", path },
];

export default function FAQPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), faqSchema(siteFaqs), webPageSchema({ title: "Cartagena Cruise FAQ", description: metadata.description as string, path })]} />
      <PageHero title="Cartagena Cruise FAQ" subtitle="Practical answers for cruise passengers calling at Cartagena — port logistics, Roman sights, Editor's Choice guidance and Mediterranean day-trip timing." compact />
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />
          <FAQSection faqs={siteFaqs} title="Frequently Asked Questions" />
          <div className="mt-12">
            <PlanningLinks />
          </div>
        </div>
      </section>
    </>
  );
}
