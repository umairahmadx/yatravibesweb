/**
 * Single source of truth for the published origin.
 * A custom domain is a one-line change here — canonical, OG/Twitter URLs,
 * JSON-LD `url`/`logo` and everything else derive from it.
 */
export const SITE_URL = "https://0dd681b0a63e0b00ab4e8dbca2df9fc3.ctonew.app";

export const SITE_NAME = "YatraVibes";
export const SITE_TAGLINE = "One Destination — Countless Memories";
export const SITE_DESCRIPTION =
  "YatraVibes is your trusted travel partner for well-maintained SUVs, handpicked hill stations and beach getaways, and unforgettable road trips across India. Book a Vitara Brezza or Grand Vitara today.";
export const SITE_TITLE =
  "YatraVibes — Drive. Explore. Experience. | Car Rentals & Curated Trips from New Delhi";

/** Build an absolute URL for a site-relative path. */
export const abs = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
