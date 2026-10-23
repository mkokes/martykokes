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

// TODO: confirm the Twitter/X handle and add GitHub/GitLab/email if wanted.
export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/martykokes/", icon: "linkedin" },
  { label: "Twitter / X", url: "https://twitter.com/martykokes", icon: "twitter" },
  { label: "GitHub", url: "https://github.com/mkokes", icon: "github" },
];
