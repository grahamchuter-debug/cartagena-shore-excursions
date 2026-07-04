import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PlanningLinks } from "@/components/PlanningLinks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const path = "/about";

export const metadata = buildMetadata({
  title: "About Cartagena Shore Excursions",
  description: "About Cartagena Shore Excursions — an independent Mediterranean cruise planning authority for passengers calling at Cartagena, Spain.",
  path,
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "About", path },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), webPageSchema({ title: "About Cartagena Shore Excursions", description: "About Cartagena Shore Excursions.", path })]} />
      <PageHero title="About Cartagena Shore Excursions" subtitle="An independent planning authority for cruise passengers discovering Roman Cartagena and Spain's Costa Cálida." compact />
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />
          <div className="prose-body">
            <p>
              {SITE.name} is an independent planning resource for cruise passengers calling at Cartagena, Spain. Ships berth at Muelle Alfonso XII on the naval port waterfront, and our goal is to help you choose the right experience — Roman archaeology, old-town walking, tapas, Murcia day trips or coastal kayaking — based on your interests, previous visits and port window.
            </p>
            <p>
              We aim to be the definitive Cartagena cruise planning authority, not simply another excursion catalogue. We compare options honestly: when Roman Highlights earns our Editor&apos;s Choice badge, we explain why — and we also tell you when a DIY old-town walk, a tapas afternoon or a Murcia excursion might suit you better.
            </p>
            <p>
              Our guides are written for real cruise timings, not generic Spain tourism. We highlight realistic walking distances, Roman ticket timing, Murcia drive times, return-to-ship buffers and honest advice on when a guided tour beats going it alone. Roman Highlights is our flagship excursion recommendation for first-time visitors.
            </p>
            <p>
              We are not affiliated with any cruise line or the Port of Cartagena. Ship schedules and travel times are indicative — always confirm all-aboard times with your cruise line.
            </p>
            <p>
              Have a question we haven&apos;t answered? <a href="/enquire">Get in touch</a> and we&apos;ll help you plan.
            </p>
          </div>
          <div className="mt-12">
            <PlanningLinks />
          </div>
        </div>
      </section>
    </>
  );
}
