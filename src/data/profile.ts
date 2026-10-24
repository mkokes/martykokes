export const profile = {
  name: "Marty Kokes",
  title: "Senior Frontend Engineer",
  location: "Greater Minneapolis–St. Paul, MN",
  objective:
    "Based on an extensive background in a wide variety of technologies, my interests and passion are focused on web and mobile development.",
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
