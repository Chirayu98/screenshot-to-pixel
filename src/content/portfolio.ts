
import plant from "@/assets/project-plant.jpg";
import equipment from "@/assets/project-equipment.jpg";
import propsense from "@/assets/project-propsense.jpg";
import resume from "@/assets/resume.pdf.asset.json";

export const profile = {
  name: "Chirayu Sharma",
  title: "Data Analyst | Power BI Developer",
  location: "Ahmedabad, Gujarat, India",
  email: "chirayusharma202004@gmail.com",
  phone: "+91 79903 36208",
  phoneHref: "tel:+917990336208",
  resumeUrl: resume.url,
  linkedin: "https://www.linkedin.com/in/chirayu-sharma-5b7459262?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  github: "https://github.com/Chirayu98",
  photoUrl: "/profile.jpg?v=2",
  heroPhotoUrl: "/hero-illustration.png?v=7",
};

export const stats = [
  { value: 5, suffix: "+", label: "Power BI dashboards developed" },
  { value: 2100, suffix: "+", label: "Equipment analyzed" },
  { value: 80, suffix: "+", label: "Construction sites covered" },
];

export const services = [
  {
    title: "Power BI Dashboard Development",
    desc: "Multi-page interactive reports with KPI cards, drillthroughs and clear navigation.",
  },
  {
    title: "Data Cleaning & Transformation",
    desc: "Turning messy operational exports into reliable, analysis-ready tables with Power Query.",
  },
  {
    title: "Excel Reporting & Automation",
    desc: "Structured workbooks and refreshable reports that reduce repetitive manual effort.",
  },
  {
    title: "SQL Analysis & KPI Reporting",
    desc: "Querying and summarising data to define and track the metrics that matter.",
  },
];

export type Project = {
  id: string;
  index: string;
  title: string;
  tags: string;
  desc: string;
  image: string;
  alt: string;
  cta: string;
  facts?: string[];
  note?: string;
  gallery?: {
    title: string;
    image: string;
    alt: string;
  }[];
  detail: {
    heading: string;
    body: string;
  }[];
};

export const projects: Project[] = [
  {
    id: "plant-machinery",
    index: "01",
    title: "Plant & Machinery Analytics",
    tags: "Power BI • Power Query • DAX • Excel",
    desc: "A multi-page operational analytics solution designed to monitor equipment utilization, productivity, log compliance, idle time, and breakdown performance across construction operations.",

    facts: [
      "5-page Power BI dashboard",
      "1,300+ equipment",
      "61 construction sites",
      "KPIs: utilization, productivity, downtime, compliance",
    ],

    image: "/Plant-Log-Compliance-Dashboard.png",
    alt: "Plant and Machinery Log Compliance Power BI dashboard",

    gallery: [
      {
        title: "Plant Log Compliance",
        image: "/Plant-Log-Compliance-Dashboard.png",
        alt: "Plant Log Compliance Power BI dashboard",
      },
      {
        title: "Daywise Utilization",
        image: "/Daywise-Utilization-Dashboard.png",
        alt: "Daywise Utilization Power BI dashboard",
      },
      {
        title: "Workwise Utilization",
        image: "/Workwise-Utilization-Dashboard.png",
        alt: "Workwise Utilization Power BI dashboard",
      },
      {
        title: "Equipment Utilization",
        image: "/Equipment-utilization-dashboard.png",
        alt: "Equipment Utilization Power BI dashboard",
      },
      {
        title: "Equipment Breakdown",
        image: "/Equipment-Breakdown-Dashboard.png",
        alt: "Equipment Breakdown Power BI dashboard",
      },
      {
        title: "Equipment Idle Analysis",
        image: "/Equipment-Idle-Dashboard.png",
        alt: "Equipment Idle Analysis Power BI dashboard",
      },
    ],
    note: "Dashboard screenshots showcasing Plant & Machinery analytics. Sensitive company information should be excluded from public screenshots.",

    cta: "Explore Case Study",

    detail: [
      {
        heading: "Business context",
        body: "Plant & Machinery operations across many construction sites generate daily equipment logs. Teams needed a consolidated view of how equipment is used across sites.",
      },
      {
        heading: "Problem",
        body: "Operational data arrived in scattered spreadsheets, making it slow to monitor utilization, spot idle or broken-down equipment, and check whether logs were submitted on time.",
      },
      {
        heading: "Data preparation",
        body: "Cleaned and transformed large datasets using Power Query and Excel — standardising formats, handling missing entries and shaping tables for reporting.",
      },
      {
        heading: "Modeling & DAX",
        body: "Built a data model connecting equipment, sites and log records, with DAX measures for utilization, productivity, idle hours, breakdowns and log compliance.",
      },
      {
        heading: "Dashboard design",
        body: "Five report pages — Log Compliance, Productivity, Equipment Performance, Breakdown and Idle Analysis — using KPI cards, gauges and drillthrough reports.",
      },
      {
        heading: "Intended value & learnings",
        body: "Automated recurring reporting to reduce manual effort and give stakeholders a single place to review equipment usage and downtime. Key learning: data quality and clear KPI definitions matter as much as the visuals.",
      },
    ],
  },



  {
    id: "jobsy",
    index: "02",
    title: "Jobsy — Delivery Jobs Platform",
    tags: "HTML • CSS • MongoDB",

    desc: "A web and mobile-friendly platform connecting delivery job seekers with companies. The platform supports job postings, applications, chat and notifications to simplify delivery job hiring.",

    image: "/jobsy-preview.png",
    alt: "Jobsy delivery jobs platform interface",

    note: "A delivery recruitment platform designed to simplify job discovery and hiring.",
    cta: "Explore Jobsy",

    detail: [
      {
        heading: "About the project",
        body: "Jobsy is a web and mobile-friendly platform designed to connect delivery job seekers with companies looking to hire delivery professionals.",
      },
      {
        heading: "Problem",
        body: "Finding delivery jobs and connecting with hiring companies can be time-consuming. Jobsy aims to make the hiring process more accessible and organized.",
      },
      {
        heading: "Job posting",
        body: "Companies can post delivery job opportunities for potential candidates to explore.",
      },
      {
        heading: "Applications",
        body: "Job seekers can explore available opportunities and submit applications through the platform.",
      },
      {
        heading: "Communication",
        body: "Chat and notification features support communication between job seekers and companies.",
      },
      {
        heading: "Technology stack",
        body: "HTML and CSS for the frontend interface, with MongoDB used for database management.",
      },
    ],
  },

  {
    id: "propsense",
    index: "03",
    title: "PropSense — Property Listing & Price Analysis",
    tags: "Data Analysis • PostgreSQL • Next.js • Research",
    desc: "An ongoing property analytics platform exploring how location, amenities, and nearby public infrastructure relate to property prices.",
    image: propsense,
    alt: "Illustrative property analytics mockup with a price map, price trend chart, location comparison and nearby amenities list",
    note: "Ongoing project. Illustrative concept mockup.",
    cta: "Explore PropSense",

    detail: [
      {
        heading: "Problem",
        body: "Property buyers struggle to compare prices fairly across locations without understanding the role of amenities and nearby infrastructure.",
      },
      {
        heading: "Approach",
        body: "Studying property datasets to explore pricing trends, compare properties and analyse location-based patterns.",
      },
      {
        heading: "Key analysis",
        body: "Evaluating how proximity to schools, hospitals and transport relates to property value, alongside price trend exploration.",
      },
      {
        heading: "Tools & workflow",
        body: "PostgreSQL for data storage, Next.js for the platform, plus workflow diagrams and module documentation in Draw.io.",
      },
      {
        heading: "Status",
        body: "In progress. Future price trend analysis is a concept under design — no prediction model is claimed as production-ready.",
      },
    ],
  },
];

export const experience = [
  {
    org: "LCC Projects Ltd",
    period: "Apr 2026 — Present",
    roles: [
      "Junior Data Analyst · Aug 2026 — Present",
      "Data Analyst Intern · Apr — Jul 2026",
    ],
    desc: "Operational reporting, data cleaning and Power Query transformations, Power BI dashboard development and maintenance, and KPI reporting for Plant & Machinery analysis.",
  },
  {
    org: "Sparks To Ideas",
    period: "Oct 2025 — Mar 2026",
    roles: ["MERN Stack Intern"],
    desc: "Six-month on-site internship with hands-on work across MongoDB, Express, React and Node.js.",
    certificateUrl: "/certificates/sparks-to-ideas-certificate.pdf",
  },
  {
    org: "The Knowledge Academy",
    period: "2022 — 2024",
    roles: ["Part-Time Mathematics Tutor"],
    desc: "Tracked student progress with performance metrics, identified learning gaps and kept structured progress reports.",
  },
  {
    org: "CESA — Computer Engineering Student Association",
    period: "2025 — 2026",
    roles: ["Graphic Head"],
    desc: "Managed creative deliverables for technical events, coordinated with teams and supported event communication.",
  },
];

export const skills = [
  {
    group: "Data Analytics",
    items: [
      "Power BI",
      "Microsoft Excel",
      "Power Query",
      "DAX",
      "SQL fundamentals",
      "KPI Reporting",
      "Data Cleaning",
      "Data Visualization",
      "Data Modeling",
    ],
  },
  {
    group: "Tools & Technical Foundation",
    items: [
      "PostgreSQL",
      "Prisma",
      "Python",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "HTML",
      "CSS",
      "Draw.io",
    ],
  },
  {
    group: "Additional Knowledge",
    items: ["SAP MM (Basic)", "Canva"],
  },
];

export const process = [
  {
    title: "Understand",
    desc: "Clarify the business question, reporting requirements, KPIs, and available data.",
  },
  {
    title: "Transform & Analyze",
    desc: "Clean datasets, resolve data-quality issues, model information, and develop relevant calculations using Excel, Power Query, SQL, and DAX as appropriate.",
  },
  {
    title: "Visualize & Communicate",
    desc: "Build clear dashboards, validate metrics, identify patterns, and communicate findings in a way stakeholders can use.",
  },
];

export const faqs = [
  {
    q: "What kind of analytics projects have you worked on?",
    a: "Mainly operational analytics — a 5-page Power BI solution for Plant & Machinery covering utilization, productivity, idle time, breakdowns and log compliance — plus PropSense, an ongoing property price analysis project.",
  },
  {
    q: "Which tools do you use for data analysis?",
    a: "Power BI, Excel, Power Query and DAX day to day, with SQL fundamentals and PostgreSQL for querying data.",
  },
  {
    q: "Do you have experience with operational data?",
    a: "Yes. At LCC Projects Ltd I work with equipment data from 1,300+ machines across 61 construction sites, cleaning it and turning it into KPI reports.",
  },
  {
    q: "Are you open to Data Analyst opportunities?",
    a: "Yes — I'm open to Data Analyst and Power BI Developer roles. Email is the best way to reach me.",
  },
  {
    q: "Can I see your resume or project walkthroughs?",
    a: "You can download my resume from this page. For project walkthroughs, email me — I can talk through approach and design while keeping employer data confidential.",
  },
];

export const awards = [
  {
    title: "Graphic Lead Recognition",
    organization: "CESA · Indus University",
    year: "2025–2026",
    description:
      "Recognized for my valuable contribution as Graphic Lead of the CESA Core Committee.",
    image: "/awards/award-photo.jpeg",
    video: "/awards/award-ceremony.mp4",
  },
];
