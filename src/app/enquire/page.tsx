import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PlanningLinks } from "@/components/PlanningLinks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const path = "/enquire";

export const metadata = buildMetadata({
  title: "Enquire / Contact",
  description: "Get in touch about Cartagena shore excursions and cruise port planning — enquire about Roman Highlights, register interest for tours and ask cruise-day questions.",
  path,
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Enquire", path },
];

export default function EnquirePage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), webPageSchema({ title: "Enquire / Contact", description: "Get in touch about Cartagena cruise planning.", path })]} />
      <PageHero title="Enquire / Contact" subtitle="Enquire about Roman Highlights, register interest for Cartagena tours, or ask about your port day." compact />
      <section className="section-padding">
        <div className="container-wide max-w-xl">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mb-6 card-feature">
            <p className="text-sm text-gray-700">Roman Highlights and other Cartagena shore excursions are available to enquire. Use this form to register interest, ask about ship timing or request planning advice for your port day.</p>
          </div>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input id="name" type="text" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input id="email" type="email" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">I&apos;m interested in</label>
              <select id="interest" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm">
                <option>Cartagena Roman Highlights (Editor&apos;s Choice)</option>
                <option>Roman Walking Tour</option>
                <option>Tapas &amp; Local Food Experience</option>
                <option>Cartagena &amp; Murcia excursion</option>
                <option>Coastal Kayaking</option>
                <option>Harbour &amp; Panoramic Tour</option>
                <option>Private Cartagena Experience</option>
                <option>Family-Friendly Cartagena</option>
                <option>General cruise planning advice</option>
              </select>
            </div>
            <div>
              <label htmlFor="cruise" className="block text-sm font-medium text-gray-700 mb-1">Cruise date &amp; ship (optional)</label>
              <input id="cruise" type="text" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" placeholder="e.g. 15 June 2026, MSC Virtuosa" />
            </div>
            <div>
              <label htmlFor="party" className="block text-sm font-medium text-gray-700 mb-1">Party size (optional)</label>
              <input id="party" type="text" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" placeholder="e.g. 2 adults, 1 child" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea id="message" rows={5} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" placeholder="Tell us about your Cartagena port day, ship times and which excursion interests you..." />
            </div>
            <button type="submit" className="btn-primary">Send Enquiry</button>
          </form>
          <p className="mt-6 text-sm text-gray-600">Or email us directly at {SITE.email}</p>
          <div className="mt-12">
            <PlanningLinks />
          </div>
        </div>
      </section>
    </>
  );
}
