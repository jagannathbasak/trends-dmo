import { FAQS } from "@/lib/faqData";
import {
  FOUNDER_NAME,
  FOUNDER_URL,
  ORGANIZATION_NAME,
  ORGANIZATION_SOCIAL_PROFILES,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

export function buildStructuredData() {
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: ORGANIZATION_NAME,
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: `${SITE_URL}/icon.png`,
      contentUrl: `${SITE_URL}/icon.png`,
      width: 512,
      height: 512,
      caption: ORGANIZATION_NAME,
    },
    sameAs: ORGANIZATION_SOCIAL_PROFILES,
    founder: { "@id": `${FOUNDER_URL}/#person` },
    description: SITE_DESCRIPTION,
  };

  const founder = {
    "@type": "Person",
    "@id": `${FOUNDER_URL}/#person`,
    name: FOUNDER_NAME,
    url: FOUNDER_URL,
    jobTitle: "Founder & CEO",
    worksFor: { "@id": `${SITE_URL}/#organization` },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };

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
    "@graph": [organization, founder, website, softwareApplication, faqPage],
  };
}
