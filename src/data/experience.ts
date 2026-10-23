export interface Job {
  company: string;
  title: string;
  start: string;
  end: string;
  highlights: string[];
}

export const experience: Job[] = [
  {
    company: "BI Worldwide",
    title: "Senior Frontend Engineer",
    start: "July 2021",
    end: "Present",
    highlights: [
      "Build and maintain React and TypeScript web applications, including multi-brand automotive hub portals, admin consoles and a call-center app.",
      "Contribute to shared libraries: a React component library with Storybook, an OIDC / AWS Cognito authentication library and common frontend tooling.",
      "Work with Vite, Ant Design, Redux Toolkit, Vitest and Playwright, with GitLab CI/CD pipelines and Docker.",
      "Write Go services when the work calls for it.",
    ],
  },
  {
    company: "LuminFire",
    title: "Software Engineer",
    // TODO: confirm end date
    start: "2015",
    end: "2021",
    highlights: [
      "Developed custom WordPress themes and plugins based on client requirements.",
      "Built headless WordPress installations using the WordPress REST API and WP GraphQL.",
      "Integrated WordPress with external data sources using in-house tools and public APIs.",
      "Used React, React Native and Ionic to build web and mobile apps.",
      "Trained fellow developers.",
      "Gathered project requirements from clients and built estimates from discovery work.",
    ],
  },
  {
    company: "ECM Publishers, Inc.",
    title: "Front End Developer",
    start: "2010",
    end: "2015",
    highlights: [
      "Designed and built a custom responsive WordPress theme from scratch, used across all ECM News publications.",
      "Built an online classified-ads front end with a PHP MVC framework, HTML5, jQuery UI and CSS3 (The Ad Spider).",
      "Extended WordPress themes with JavaScript and jQuery for better navigation and animation.",
      "Migrated 11 content-heavy sites from Joomla to WordPress.",
      "Provided training, documentation and support to internal and external customers.",
    ],
  },
  {
    company: "ECM Publishers, Inc.",
    title: "IT Support Specialist",
    start: "2003",
    end: "2010",
    highlights: [
      "Maintained and supported desktops and servers.",
      "Consolidated three NT domains into a single Active Directory domain.",
      "Managed internal and external DNS.",
      "Worked across Linux, Unix, OS X, OS/400 and Windows.",
    ],
  },
];

export const education = [
  {
    school: "Brown Institute",
    years: "1999–2001",
    detail: "PC/LAN program: DOS 6.22, networking technologies, Novell, Macintosh, Windows NT.",
  },
  {
    school: "Dunwoody Institute",
    years: "1996–1998",
    detail: "Electrical and electronic theory, electric motors, commercial and residential wiring.",
  },
];
