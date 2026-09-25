// While true, the home page shows the Coming Soon section in place of the Hero.
// Set to false to bring the Hero back; nothing else needs to change.
export const COMING_SOON = true;

export const ALETHIA_URL = "https://dev.obxalethia.art/";
export const INSTAGRAM_URL = "https://www.instagram.com/obxcreatives/";

// Choices in the quote form's service dropdown. The database accepts any label, so this
// list can change without a migration.
export const SERVICES = [
  "Digital marketing & social media management",
  "Art commissions",
  "Murals & installations",
  "Graphic design & branding",
  "Web design & development",
  "Something else",
];

export const NAV_LINKS = [
  { label: "HOME", href: "#home" },
  { label: "GALLERY", href: "#gallery" },
  { label: "SHOP", href: "#shop" },
  { label: "SERVICES", href: "#services" },
  { label: "BLOG", href: "#blog" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

// Artsy and OpenSea don't have URLs yet; their "#" links are placeholders.
export const SOCIAL_LINKS = [
  { label: "INSTAGRAM", href: INSTAGRAM_URL },
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/kamogelo-obos-a9093a212/" },
  { label: "ARTSY", href: "#" },
  { label: "TIK TOK", href: "https://www.tiktok.com/@obxcreatives" },
  { label: "OPENSEA", href: "#" },
];
