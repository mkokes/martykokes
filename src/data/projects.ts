import casserollers from "../assets/projects/casserollers.webp";
import fretomaton from "../assets/projects/fretomaton.webp";
import hexcalculator from "../assets/projects/hexcalculator.webp";
import marriage from "../assets/projects/marriage.webp";
import martysgarage from "../assets/projects/martysgarage.webp";
import toolbox from "../assets/projects/toolbox.webp";
import wouldbymarty from "../assets/projects/wouldbymarty.webp";

export interface Project {
  name: string;
  blurb: string;
  tech: string[];
  url: string;
  repo: string;
  image: string;
}

export interface Link {
  label: string;
  url: string;
}

export interface NowProject {
  name: string;
  tagline: string;
  story: string[];
  tech: string[];
  done: string[];
  next: string[];
  repos: Link[];
}

export const projectsIntro =
  "Things I build in my spare time, mostly for the people and hobbies I care about.";

// Ordered most technical first.
export const projects: Project[] = [
  {
    name: "Marriage",
    blurb:
      "The three-deck rummy of Dashain nights, rebuilt so family can play together wherever they are. Start a table, share a four-letter code, and you're in. Every house rule is configurable, and bots fill the empty seats.",
    tech: ["React", "TypeScript", "Cloudflare Workers", "Durable Objects", "WebSockets", "PWA"],
    url: "https://cards.martykokes.com",
    repo: "https://github.com/mkokes/marriage",
    image: marriage,
  },
  {
    name: "Moped Toolbox",
    blurb:
      "Pocket calculators I wanted in the garage: pick your bike and sprockets to see engine RPM and top speed, or work out how much two-stroke oil goes in the tank. Works offline once it's on your phone.",
    tech: ["React", "Ant Design", "TypeScript", "Vite", "PWA"],
    url: "https://toolbox.martysgarage.info",
    repo: "https://github.com/mkokes/toolbox",
    image: toolbox,
  },
  {
    name: "Casserollers",
    blurb:
      "The home of my Minneapolis moped gang. I moved it off WordPress to a fast static site with rally pages, a ride map, countdowns and calendar downloads, and kept every old link working.",
    tech: ["Astro", "TypeScript", "Leaflet", "GitHub Pages"],
    url: "https://casserollers.com",
    repo: "https://github.com/mkokes/casserollers",
    image: casserollers,
  },
  {
    name: "Fretomaton",
    blurb:
      "Printable fretboard templates for the guitars and ukuleles I build. Pick an instrument and scale length and it lays out every fret slot at true 1:1 scale, with bridge compensation for your string gauges. Works offline once installed.",
    tech: ["React", "TypeScript", "Tailwind CSS", "DaisyUI", "SVG", "PWA"],
    url: "https://mkokes.github.io/Fretomaton/",
    repo: "https://github.com/mkokes/Fretomaton",
    image: fretomaton,
  },
  {
    name: "Hexagon Tabletop Calculator",
    blurb:
      "A planner for my hexagon-tile tabletops. Set the table size, tile size and gap, and it works out how many hexagons to cut and how much epoxy to pour, with a live woodgrain preview of the layout.",
    tech: ["React", "TypeScript", "Ant Design", "SVG", "Vite"],
    url: "https://mkokes.github.io/hexcalculator/",
    repo: "https://github.com/mkokes/hexcalculator",
    image: hexcalculator,
  },
  {
    name: "Marty's Garage",
    blurb:
      "My build logs, how-tos and reference tables from a garage full of vintage mopeds and small motorcycles. Migrated from WordPress, with full-text search and downloadable manuals.",
    tech: ["Astro", "MDX", "Pagefind", "GitHub Pages"],
    url: "https://martysgarage.info",
    repo: "https://github.com/mkokes/martysgarage-astro",
    image: martysgarage,
  },
  {
    name: "Would? By Marty",
    blurb:
      "A landing page for my woodworking. A video hero shows the shop, and my latest Instagram posts are pulled in when the site rebuilds each day.",
    tech: ["React", "Vite", "TypeScript", "Turborepo", "GitHub Actions"],
    url: "https://wouldbymarty.com",
    repo: "https://github.com/mkokes/wouldbymarty",
    image: wouldbymarty,
  },
];

export const now: NowProject = {
  name: "ReceiptVault",
  tagline: "Snap a paper receipt, get a searchable archive.",
  story: [
    "ReceiptVault is a phone-first app for our household. Take a photo of a receipt (or several for a long one), and Amazon Textract pulls out the store, date, totals and line items into one shared archive we can search by store, date or amount.",
    "Really it's my excuse to build a real serverless AWS stack from end to end, on a budget of under $15 a month. The database pauses when nobody's using it, nothing sits in a VPC, and every piece is defined in Terraform.",
  ],
  tech: [
    "AWS Lambda",
    "API Gateway",
    "Textract",
    "Aurora Serverless v2",
    "Cognito",
    "S3 + CloudFront",
    "Terraform",
  ],
  done: ["Spec and data model", "API and Textract worker", "Terraform for the whole stack"],
  next: ["Offline-friendly PWA front end", "First deploy"],
  repos: [
    { label: "API", url: "https://github.com/mkokes/receiptvault-api" },
    { label: "Infrastructure", url: "https://github.com/mkokes/receiptvault-infra" },
  ],
};
