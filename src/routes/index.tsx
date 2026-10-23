import { createFileRoute } from "@tanstack/react-router";
import HomePage from "~/components/HomePage";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, SITE_TAGLINE, abs } from "~/site";

const CANONICAL = `${SITE_URL}/`;
const OG_IMAGE = abs("/img/hero-mountain-road.webp");
const OG_IMAGE_ALT = "A winding mountain road at golden hour — the YatraVibes hero";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["TravelAgency", "LocalBusiness"],
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      slogan: SITE_TAGLINE,
      url: CANONICAL,
      telephone: "+91 62640 18879",
      email: "yatravibes1610@gmail.com",
      image: OG_IMAGE,
      logo: abs("/img/logo-full-light.png"),
      areaServed: { "@type": "Country", name: "India" },
      address: { "@type": "PostalAddress", addressLocality: "New Delhi", addressCountry: "IN" },
      makesOffer: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Car rental — Maruti Suzuki Vitara Brezza" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Car rental — Maruti Suzuki Grand Vitara" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Curated trips — hill stations, beach getaways, road trips, holidays" } },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: CANONICAL,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#business` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: CANONICAL,
      logo: { "@type": "ImageObject", url: abs("/img/logo-full-light.png"), width: 493, height: 396 },
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "theme-color", content: "#08090C" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:url", content: CANONICAL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:alt", content: OG_IMAGE_ALT },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:image:alt", content: OG_IMAGE_ALT },
    ],
    links: [
      { rel: "canonical", href: CANONICAL },
      { rel: "preload", href: "/fonts/syne-var.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/plus-jakarta-sans-var.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/jetbrains-mono-var.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: HomePage,
});
