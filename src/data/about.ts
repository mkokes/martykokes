export const aboutIntro = [
  "I'm a senior frontend engineer who builds web and mobile applications, mostly with React and TypeScript. I got here by an unusual route: I started in IT support and systems administration in 2003, moved into front-end development in 2010, and have been building for the web ever since.",
  "That mix means I care about the whole picture, from the design system and the build pipeline to how the thing gets deployed and supported.",
];

export interface WhatIDo {
  title: string;
  description: string;
  icon: "code" | "mobile" | "tool" | "api";
}

export const whatIDo: WhatIDo[] = [
  {
    title: "Web applications",
    description: "React and TypeScript apps with Vite, Ant Design, Redux and solid test coverage.",
    icon: "code",
  },
  {
    title: "Mobile apps",
    description: "Cross-platform apps with React Native, Expo and Ionic.",
    icon: "mobile",
  },
  {
    title: "Shared libraries & tooling",
    description:
      "Component libraries, authentication libraries and build and CI/CD tooling that teams reuse.",
    icon: "tool",
  },
  {
    title: "WordPress & headless CMS",
    description: "Custom themes and plugins, plus headless builds on the REST API and WP GraphQL.",
    icon: "api",
  },
];
