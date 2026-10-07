export const portfolioData = {
  personal: {
    name: "Nitin Chauhan",
    title: "Software Developer | SharePoint • React • Node.js • AWS",
    email: "dev.nitin2024@gmail.com",
    phone: "+91-8285510025",
    avatar: "/images/avatar.jpg",
    github: "https://github.com/supernitin06",
    linkedin: "https://www.linkedin.com/in/nitin-chauhan-8b7388295/",
    resumeUrl: "/Nitin_Chauhan_Resume.pdf",
  },
  summary:
    "Full Stack Developer with 1.5+ years building secure, scalable SaaS and enterprise platforms. Expert in SharePoint Environment, React, Node.js, AWS, and Microsoft 365. Delivered 30%+ performance improvements through optimization and API design. Passionate about building high-quality digital experiences that solve real business problems.",
  education: [
    {
      degree: "B. Tech in Computer Science",
      institution: "Amity University Noida",
      year: "2020 – 2024",
      score: "7.08 CGPA | Top 10% of Batch",
    },
    {
      degree: "12th",
      institution: "Jaypee Public School",
      year: "2020",
      score: "86%",
    },
    {
      degree: "10th",
      institution: "Jaypee Public School",
      year: "2018",
      score: "90%",
    },
  ],
  experience: [
    {
      title: "Software Developer",
      company: "Smalsus Infolab Pvt. Ltd.",
      location: "Noida",
      period: "2026 – Present",
      description:
        "Designed and developed enterprise SharePoint solutions using SPFx framework with React and TypeScript for Microsoft 365 environments. Built AI-enabled interactive web parts and automated Power Automate workflows for business process automation and approvals. Configured site permissions and managed access control policies for SharePoint environments. Leveraged PnP PowerShell, CSOM, and Azure services for site provisioning, migration, and advanced customization.",
      highlights: [
        "Enterprise SharePoint solutions with SPFx + React + TypeScript",
        "AI-enabled web parts & Power Automate workflow automation",
        "PnP PowerShell, CSOM & Azure for site provisioning",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "LeadsConnect Services Pvt. Ltd.",
      location: "Noida",
      period: "Oct 2024 – Apr 2025",
      description:
        "Developed multi-tenant SaaS applications with RBAC, JWT/OAuth2 authentication, and session management. Improved API performance by 30% through caching, query optimization, and lazy loading implementations. Integrated Razorpay payment gateway and deployed scalable solutions on AWS (EC2, RDS); mentored junior developers.",
      highlights: [
        "30% API performance improvement via caching & query optimization",
        "Multi-tenant SaaS with RBAC, JWT/OAuth2 & secure sessions",
        "Razorpay integration & AWS (EC2, RDS) deployment",
      ],
    },
    {
      title: "Software Developer",
      company: "Perfect Kode Software Technologies",
      location: "Noida",
      period: "Sept 2024 – Oct 2024",
      description:
        "Built full-stack web applications using Next.js, React.js, FastAPI, and Laravel across diverse client projects. Created responsive UI components using Tailwind CSS; integrated third-party APIs and optimized performance. Delivered client-focused solutions with improved user experience and application stability.",
      highlights: [
        "Full-stack apps with Next.js, React.js, FastAPI & Laravel",
        "Responsive UI with Tailwind CSS & third-party API integrations",
        "Performance optimization & client-focused delivery",
      ],
    },
  ],
  projects: [
    {
      title: "MultiTenant Management System (MTMS)",
      period: "Feb 2026 – Present",
      image: "/images/mtms-gen.png",
      description:
        "Designed and developed a multi-tenant SaaS platform allowing organizations (schools, hospitals, restaurants, etc.) to create their own tenants/domains and manage users, roles, permissions, and workflows. Implemented dynamic RBAC, subscription management, Razorpay integration, and real-time notifications.",
      github: "https://github.com/nitinchauhan2024/MTMS",
      liveUrl: "https://multitenant-admin.vercel.app/dashboard",
      technologies: [
        "React.js",
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "AWS",
        "Socket.io",
        "Razorpay",
      ],
    },
    {
      title: "Swad of Grandma – Food Delivery",
      period: "2026 – Present",
      image: "/images/swado-grandma.png",
      description:
        "Real-time food delivery web application managing the complete order lifecycle. Features secure RBAC for Admin, Customer, and Delivery Partners, live location tracking via WebSockets, and WhatsApp notifications. Deployed a scalable backend on Render.",
      github: "https://github.com/supernitin06",
      technologies: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "React.js",
        "WebSockets",
        "Render",
      ],
    },
    {
      title: "KalaSquare Hire Talent (MERN Stack)",
      period: "Sept 2024 – Dec 2024",
      image: "/images/kalasquare-gen.png",
      description:
        "Built the KalaSquare platform where influencers register, users buy tickets, and sponsors hire influencers. Developed full-stack features using React.js, Next.js, Node.js, Express.js, PostgreSQL, and AWS, including secure authentication with JWT and bcrypt, payment integration, real-time communication with Socket.IO.",
      github: "https://github.com/supernitin06",
      liveUrl: "https://kalasquare-three.vercel.app/",
      technologies: [
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "PostgreSQL",
        "Redux",
        "Socket.IO",
        "AWS",
      ],
    },
    {
      title: "Health CRM & HRM Management System",
      period: "Dec 2025 – Feb 2026",
      image: "/images/health-crm-gen.png",
      description:
        "Designed and developed a scalable full-stack CRM + HRM system to manage users, employees, roles, permissions, and healthcare workflows. Implemented dynamic RBAC, secure REST APIs with Swagger, deployed on AWS EC2 and RDS.",
      github: "https://github.com/nitinchauhan2024/health-crm",
      liveUrl: "https://healthcrmfrontend.vercel.app/",
      technologies: [
        "React.js",
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "AWS",
        "Swagger",
      ],
    },
    {
      title: "SDV Connect – University Collaboration Platform",
      period: "2024",
      image: "/images/sdv-connect-gen.png",
      description:
        "Developed a centralized university platform integrating academic and administrative services for students, mentors, and administrators. Implemented Role-Based Access Control (RBAC) for secure, role-specific access and workflows. Built real-time booking and collaboration features to improve resource utilization and communication.",
      github: "https://github.com/supernitin06",
      liveUrl: "#",
      technologies: [
        "React.js",
        "Node.js",
        "PostgreSQL",
        "RBAC",
        "WebSockets",
        "REST APIs",
      ],
    },
  ],
  skills: [
    { name: "React", icon: "react" },
    { name: "Node.js", icon: "nodejs" },
    { name: "Express", icon: "express" },
    { name: "MongoDB", icon: "mongodb" },
    { name: "JavaScript", icon: "javascript" },
    { name: "TypeScript", icon: "typescript" },
    { name: "Tailwind", icon: "tailwind" },
    { name: "AWS", icon: "aws" },
    { name: "Git", icon: "git" },
    { name: "Next.js", icon: "nextjs" },
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "Redux", icon: "redux" },
    { name: "SharePoint", icon: "sharepoint" },
    { name: "SPFx", icon: "spfx" },
    { name: "Power Automate", icon: "powerautomate" },
    { name: "Azure", icon: "azure" },
  ],
  certifications: ["NPTEL Software Testing", "Full Stack Development (MERN)"],
  achievements: [
    "First Prize Winner in the Times of India Aptitude Test, awarded a scholarship for exceptional performance.",
    "Teaching Volunteer, Jax Foundation Nongrainier Evened (Feb 2023 – Present)",
  ],
  services: [
    {
      title: "Modern UI with strong visual hierarchy",
      description: "Delivering stunning and intuitive interfaces carefully crafted to guide users effectively and enhance engagement.",
      icon: "layout",
    },
    {
      title: "Fast, responsive experience on every device",
      description: "Building exceptionally fast and highly responsive applications that look great on mobile, tablet, and desktop.",
      icon: "zap",
    },
    {
      title: "Scalable codebase with reusable components",
      description: "Developing clean, maintainable, and highly flexible code architectures using cutting-edge technologies.",
      icon: "code",
    },
  ],
  testimonials: [
    {
      name: "Rahul Sharma",
      role: "CEO at Perfect Kode",
      content: "Nitin is an exceptional full-stack developer. His ability to build scalable systems and beautiful UIs is unmatched.",
      avatar: "R",
    },
    {
      name: "Amit Desai",
      role: "Project Manager",
      content: "Worked closely with Nitin on several complex projects. He consistently delivers high-quality code and scalable architecture.",
      avatar: "A",
    },
  ],
  faqs: [
    {
      question: "What technologies do you specialize in?",
      answer: "I specialize in the MERN stack, Next.js, TypeScript, and enterprise Microsoft 365 solutions including SharePoint (SPFx), Power Automate, PnP PowerShell, and Azure. I also have strong experience with AWS, PostgreSQL, and MongoDB.",
    },
    {
      question: "Are you available for freelance work?",
      answer: "Yes, I am open to discussing freelance opportunities and exciting new collaborations. Feel free to contact me via the form below.",
    },
    {
      question: "Can you help me design my project as well?",
      answer: "Absolutely! I have a strong eye for design and enjoy building clean, modern, and user-friendly interfaces.",
    },
  ],
};
