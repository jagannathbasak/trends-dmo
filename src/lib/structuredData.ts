import { FAQS } from "@/lib/faqData";
import { FOUNDER_NAME, FOUNDER_URL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

function buildOrganization() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon.png`,
    },
    description: SITE_DESCRIPTION,
    founder: {
      "@type": "Person",
      name: FOUNDER_NAME,
      url: FOUNDER_URL,
    },
  };
}

function buildWebsite() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };
}

// Lightweight site-identity graph (Organization + WebSite) for pages other
// than the homepage, so every page carries the same org/founder signals
// without repeating the full offers/FAQ graph that only applies to "/".
export function buildSiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [buildOrganization(), buildWebsite()],
  };
}

export function buildStructuredData() {
  const organization = buildOrganization();
  const website = buildWebsite();

  const softwareApplication = {
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    provider: { "@id": `${SITE_URL}/#organization` },
    offers: [
      {
        "@type": "Offer",
        name: "Analyst",
        price: "490",
        priceCurrency: "USD",
        url: `${SITE_URL}/#pricing`,
      },
      {
        "@type": "Offer",
        name: "Team",
        price: "1900",
        priceCurrency: "USD",
        url: `${SITE_URL}/#pricing`,
      },
    ],
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, softwareApplication, faqPage],
  };
}
