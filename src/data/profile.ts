export const profile = {
  name: "Marty Kokes",
  title: "Senior Frontend Engineer",
  location: "Greater Minneapolis–St. Paul, MN",
  objective:
    "Developer by trade, maker by nature. If it can be built, I'm interested, whether that's software, AI, mechanical projects, electronics or something from the woodshop.",
};

export interface SocialLink {
  label: string;
  url: string;
  icon: "linkedin" | "twitter" | "github" | "gitlab" | "mail";
}

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/martykokes/", icon: "linkedin" },
  { label: "Twitter / X", url: "https://x.com/martykokes", icon: "twitter" },
  { label: "GitHub", url: "https://github.com/mkokes", icon: "github" },
];

// Public Formspree form id; contact messages are emailed to the site owner.
export const contactFormId = "xdeekojw";
