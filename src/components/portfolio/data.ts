export const profile = {
  name: "Santhosh T S",
  role: "Software Engineer · Full Stack Developer",
  location: "Chennai, India",
  email: "shaisanthoshsiva2006@gmail.com",
  github: "https://github.com/SANTHOSHSIVA55",
  linkedin: "https://www.linkedin.com/in/santhosh-t-s/",
  leetcode: "https://leetcode.com/u/santhoshts/",
  gfg: "https://www.geeksforgeeks.org/profile/santhoshts",
  image: "https://cdn.corenexis.com/f/STjpKFS53V1.jpg",
  headline: "Software Engineer · Full Stack Developer · Data Analyst",
  sub: "Building scalable full-stack applications, AI-powered solutions, intuitive user experiences, and data-driven dashboards using React, Node.js, Python, SQL, Power BI, and modern cloud technologies.",
};

export const heroRoles = [
  "Software Engineer",
  "Full Stack Developer",
  "Data Analyst",
  "UI/UX Designer",
];

export const heroStats = [
  { value: 300, suffix: "+", label: "DSA Problems" },
  { value: 15, suffix: "+", label: "Projects" },
  { value: 7, suffix: "", label: "Certifications" },
  { value: 3, suffix: "+", label: "Years Coding" },
];

export const stats = [
  { value: "300+", label: "DSA Problems Solved" },
  { value: "5+", label: "Major Projects Built" },
  { value: "3+", label: "Data & Software Projects Built" },
  { value: "CSE", label: "Student · Developer" },
];

export const skills = [
  {
    group: "Data Analytics",
    items: [
      "Excel", "Advanced Excel", "SQL", "Python (Pandas, NumPy)",
      "Data Cleaning", "Data Visualization", "Power BI",
      "Matplotlib", "Dashboard Development", "Data Storytelling",
    ],
    projects: ["AquaBloom Analytics", "GenAI BI Platform"],
  },
  {
    group: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion"],
    projects: ["GenAI BI Platform", "AquaBloom Analytics"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express.js", "FastAPI", "REST APIs"],
    projects: ["GenAI BI Platform"],
  },
  {
    group: "Database",
    items: ["PostgreSQL", "MongoDB", "MySQL"],
    projects: ["GenAI BI Platform", "AquaBloom Analytics"],
  },
  {
    group: "Tools",
    items: ["Git", "GitHub", "Docker", "Figma"],
    projects: ["All Projects"],
  },
  {
    group: "Computer Science",
    items: ["DSA", "OOP", "DBMS", "Operating Systems", "Computer Networks", "System Design"],
    projects: [],
  },
];

export const projects = [
  {
    title: "GenAI BI Platform",
    tag: "Data Analytics · Full Stack",
    description:
      "An analytics platform that converts business questions into database insights, generates dashboards, and helps users understand data through interactive visualizations.",
    problem: "Business users struggle to extract insights from databases without SQL knowledge.",
    solution: "A full-stack analytics platform that accepts natural language questions, translates them into SQL queries, and renders interactive dashboards with data-driven insights.",
    stack: ["Python", "SQL", "React", "Node.js", "PostgreSQL"],
    features: [
      "Natural language to SQL query translation",
      "Interactive data dashboards",
      "Data visualization",
      "User authentication",
    ],
    github: "https://github.com/SANTHOSHSIVA55/genai-bi-platform",
    website: "https://genaibi.vercel.app",
    accent: "from-violet-400/30 to-fuchsia-500/20",
  },
  {
    title: "AquaBloom Analytics",
    tag: "Data Analytics · Machine Learning",
    description:
      "A data-driven platform that processes water quality data, performs predictive analytics, and provides risk analysis through interactive visualizations.",
    problem: "Fish and shrimp farmers lack real-time water quality monitoring and early warning systems for harmful conditions.",
    solution: "A platform that processes environmental data, performs predictive analytics to assess risk levels, and visualizes trends through interactive dashboards.",
    stack: ["Python", "Pandas", "React", "REST API", "Matplotlib"],
    features: [
      "Data processing pipeline",
      "Predictive analytics",
      "Risk analysis scoring",
      "Interactive data visualization",
    ],
    github: "https://github.com/SANTHOSHSIVA55/aqua-bloom-ai",
    website: "https://aqua-bloom-v2.vercel.app",
    accent: "from-cyan-400/30 to-blue-500/20",
  },
];

export const timeline = [
  {
    title: "Started Programming",
    body: "Began my journey with computer science fundamentals — learning programming logic, data structures, and how to think like an engineer.",
    year: "2023",
    icon: "code",
  },
  {
    title: "Full Stack Development",
    body: "Learned full stack web development with React, Node.js, and databases. Built my first complete web applications and deployed them live.",
    year: "2024",
    icon: "stack",
  },
  {
    title: "Data Analytics & Advanced Development",
    body: "Improved problem-solving skills with 300+ DSA problems and built data-driven applications using Python, SQL, visualization tools, and modern web technologies.",
    year: "2025",
    icon: "brain",
  },
  {
    title: "Scalable Systems",
    body: "Building scalable full-stack applications and data-driven solutions — focusing on clean architecture, distributed design, and production-ready engineering practices.",
    year: "2026",
    icon: "rocket",
  },
];

export const certifications = [
  {
    title: "Data Analysis with Python",
    issuer: "freeCodeCamp",
    link: "#",
    skills: ["Python", "Pandas", "Data Analysis"],
  },
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte Australia / Forage",
    link: "#",
    skills: ["Data Analytics", "Problem Solving"],
  },
  {
    title: "GenAI Powered Data Analytics Job Simulation",
    issuer: "TATA / Forage",
    link: "#",
    skills: ["GenAI", "Data Analytics"],
  },
  {
    title: "Python Full Course Online - Complete Beginner to Advanced",
    issuer: "GeeksforGeeks",
    link: "#",
    skills: ["Python", "Programming"],
  },
  {
    title: "Mastering AWS Serverless: Hands-On with Core AWS Services",
    issuer: "Udemy",
    link: "#",
    skills: ["AWS", "Serverless", "Cloud"],
  },
  {
    title: "Data Science Tools",
    issuer: "Cognitive Class / IBM",
    link: "#",
    skills: ["Data Science", "Tools"],
  },
  {
    title: "Data Analysis: Visualisations in Excel",
    issuer: "OpenLearn",
    link: "#",
    skills: ["Excel", "Data Visualization"],
  },
];

export const achievements = [
  { value: 300, suffix: "+", label: "DSA Problems Solved", icon: "code" },
  { value: 15, suffix: "+", label: "Major Projects Built", icon: "rocket" },
  { value: 7, suffix: "", label: "Certifications Earned", icon: "sparkle" },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#certifications", label: "Certifications" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];
