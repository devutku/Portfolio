export const portfolioData = {
  user: {
    name: "Utku",
    fullName: "Utku Berki Baysal",
    title: "SAP Certified Integration Developer | Backend Engineer",
    role: "Integration Developer & Backend Engineer",
    location: "Muratpaşa, Antalya, Turkey",
    timezone: "UTC+3",
    status: "Available for new roles & engineering opportunities",
    bio: "Computer Engineering graduate from Antalya Bilim University with a hybrid background in SAP BTP enterprise integration, backend architecture (.NET / Spring Boot), IT system operations, and game development.",
    avatar: "https://avatars.githubusercontent.com/u/144778146?v=4",
    githubUsername: "devutku",
    email: "utkuberki21@gmail.com",
    links: {
      github: "https://github.com/devutku",
      linkedin: "https://www.linkedin.com/in/utku-berki-baysal-ab21991a7",
      twitter: "https://twitter.com",
      discord: "https://discord.com"
    }
  },

  about: {
    summary: `Computer Engineering graduate from Antalya Bilim University with a hybrid technical background spanning IT systems operations (Rixos Tersane Istanbul), software engineering, and SAP enterprise integration architecture.

As an alumnus of the prestigious SAP Young Professionals Program (YPP), I hold official credentials as an SAP Certified Integration Developer and SAP Certified Implementation Consultant.

With hands-on proficiency in .NET 10, Spring Boot 3, React Native, Unity, and the SAP BTP ecosystem, I specialize in bridging enterprise infrastructure with modern event-driven architectures, distributed storage engines, and high-performance microservices.`,
    highlights: [
      { label: "Education", value: "B.S. Comp Eng." },
      { label: "Credentials", value: "SAP Certified" },
      { label: "Core Stack", value: "SAP BTP & .NET" },
      { label: "GitHub", value: "28+ Repos" }
    ],
    certifications: [
      {
        title: "SAP Certified Associate – Integration Developer",
        issuer: "SAP",
        desc: "SAP BTP Integration Suite, Cloud Integration, API Management, Open Connectors, Event Mesh"
      },
      {
        title: "SAP Certified Implementation Consultant",
        issuer: "SAP",
        desc: "End-to-End Business Processes for SAP Business Suite"
      },
      {
        title: "Frontend Developer (React) Certificate",
        issuer: "HackerRank / Standardized Assessment",
        desc: "Modern React component architecture, Hooks, State Management & SPA engineering"
      },
      {
        title: "Linux Operating Systems Certification",
        issuer: "Systems & Infrastructure Institute",
        desc: "Linux terminal internals, server configuration, bash scripting, and administration"
      },
      {
        title: "Software Engineer Intern Certificate",
        issuer: "Software Engineering Academy",
        desc: "Enterprise software workflows, clean code, DDD, and agile collaboration"
      },
      {
        title: "First Step into Artificial Intelligence",
        issuer: "AI Foundation Academy",
        desc: "Foundations of machine learning, neural architectures, and AI applications"
      }
    ],
    experience: [
      {
        period: "Jun 2026 - Aug 2026",
        role: "SAP YPP Trainee",
        company: "SAP (Europe, Middle East & Africa)",
        description: "Earned SAP Certified Associate – Integration Developer and SAP Certified Implementation Consultant certifications. Developed end-to-end integration scenarios on SAP BTP (Integration Suite) leveraging Cloud Integration, API Management, Open Connectors, and Event Mesh. Specialized in business process mapping, API governance, and live enterprise deployment methodologies."
      },
      {
        period: "Oct 2025 - May 2026",
        role: "Information Technology Trainee / Intern",
        company: "Rixos Tersane Istanbul & Aliée İstanbul",
        description: "Managed corporate IT infrastructure, network operations, server hardware deployment, and mission-critical hospitality systems."
      },
      {
        period: "Jun 2025 - Jul 2025",
        role: "Backend Development Intern",
        company: "Spheretech Software",
        description: "Applied SOLID principles and clean architecture to design scalable RESTful APIs. Built asynchronous RabbitMQ queue listeners and CQRS patterns for MuhasebeAPI using .NET 8."
      },
      {
        period: "Jul 2024 - Sep 2024",
        role: "Mobile Software Engineering Intern",
        company: "SciMatic",
        description: "Developed a Blockchain-based smart payment mobile application using React Native, TypeScript, and JavaScript in an agile collaborative team environment."
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Engineering",
        institution: "Antalya Bilim University",
        period: "Aug 2022 - Jun 2026",
        notes: "Curriculum focused on Distributed Systems, Database Internals, Data Structures & Algorithms, and Operating Systems."
      },
      {
        degree: "High School Diploma (Science & Mathematics)",
        institution: "Muğla 75. Yıl Science High School (Fen Lisesi)",
        period: "2018 - 2022",
        notes: "Specialized in advanced STEM, analytical problem solving, and algorithmic fundamentals."
      }
    ]
  },

  skills: [
    {
      category: "Enterprise Integration & SAP BTP",
      items: [
        { name: "SAP BTP Integration Suite", level: 95, icon: "Network" },
        { name: "Cloud Integration & API Management", level: 92, icon: "Globe" },
        { name: "Event Mesh & Open Connectors", level: 88, icon: "Radio" },
        { name: "SAP Business Suite Processes", level: 90, icon: "Briefcase" }
      ]
    },
    {
      category: "Backend & Distributed Systems",
      items: [
        { name: "C# / .NET 10 & 8 / ASP.NET Core", level: 95, icon: "Server" },
        { name: "CQRS, MediatR & Onion Architecture", level: 92, icon: "Layers" },
        { name: "Java 21 / Spring Boot & Hibernate", level: 88, icon: "Code2" },
        { name: "Message Brokers (Kafka & RabbitMQ)", level: 86, icon: "Zap" },
        { name: "Bitcask & Storage Engines (DDIA)", level: 85, icon: "HardDrive" }
      ]
    },
    {
      category: "Game Development & Mobile",
      items: [
        { name: "Unity (C#)", level: 85, icon: "Sparkles" },
        { name: "Game Mechanics & Physics", level: 82, icon: "Cpu" },
        { name: "React Native (TypeScript/JS)", level: 86, icon: "Smartphone" },
        { name: "React 19 & Modern Web UI", level: 88, icon: "FileCode" }
      ]
    },
    {
      category: "Infrastructure, Database & DevOps",
      items: [
        { name: "PostgreSQL & EF Core", level: 92, icon: "Database" },
        { name: "Linux Operating Systems & Bash", level: 90, icon: "Terminal" },
        { name: "Enterprise IT & Network Operations", level: 88, icon: "Shield" },
        { name: "Git, GitHub & Docker", level: 90, icon: "Box" }
      ]
    }
  ],

  projects: [
    {
      id: "sigortak",
      title: "Sigortak - Smart Fleet & Policy SaaS",
      tagline: "CQRS, Event-Driven and Microservices platform with OCR",
      description: "An enterprise B2B SaaS smart vehicle & policy management platform built with CQRS, Event-Driven Microservices, OCR integration, Kafka, RabbitMQ, PostgreSQL, YARP, and React.",
      category: "Full Stack",
      tags: [".NET 10", "CQRS", "Kafka", "RabbitMQ", "Microservices", "OCR", "React"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
      featured: true,
      liveUrl: "https://github.com/devutku/Sigortak",
      githubUrl: "https://github.com/devutku/Sigortak",
      stats: { stars: 8, forks: 2 }
    },
    {
      id: "minikv",
      title: "MiniKV - Distributed Data & Storage Engine",
      tagline: "Bitcask & DDIA inspired persistent key-value engine",
      description: "A lightweight, persistent key-value storage engine and HTTP server inspired by Bitcask and Designing Data-Intensive Applications (DDIA), featuring an append-only log and in-memory indexing.",
      category: "Full Stack",
      tags: ["Java", "Bitcask", "Distributed Systems", "DDIA", "Storage Engine"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
      featured: true,
      liveUrl: "https://github.com/devutku/MiniKVStepByStepDistributedDataEngine",
      githubUrl: "https://github.com/devutku/MiniKVStepByStepDistributedDataEngine",
      stats: { stars: 5, forks: 1 }
    },
    {
      id: "accounting-api",
      title: "MuhasebeApp (AccountingAPI)",
      tagline: "Enterprise accounting backend inspired by Paraşüt",
      description: "Scalable enterprise-grade SaaS accounting RESTful API built with .NET 8, Entity Framework Core, PostgreSQL, MediatR, CQRS, and Onion Architecture.",
      category: "Web App",
      tags: [".NET 8", "ASP.NET Core", "CQRS", "MediatR", "RabbitMQ", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&auto=format&fit=crop&q=80",
      featured: true,
      liveUrl: "https://github.com/devutku/AccountingAPI",
      githubUrl: "https://github.com/devutku/AccountingAPI",
      stats: { stars: 6, forks: 1 }
    },
    {
      id: "gamemobile",
      title: "Unity Mobile Game Project (GameMobile)",
      tagline: "Interactive 3D/2D mobile physics game in C#",
      description: "Mobile game developed in Unity featuring fluid player mechanics, dynamic obstacle collision, physics simulations, and optimized mobile performance.",
      category: "Interactive",
      tags: ["Unity", "C#", "Game Development", "Mobile Games", "Physics"],
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
      featured: true,
      liveUrl: "https://github.com/devutku/gamemobile",
      githubUrl: "https://github.com/devutku/gamemobile",
      stats: { stars: 3, forks: 1 }
    },
    {
      id: "ecommerce-api",
      title: "ECommerceAPI - Spring Boot Store Service",
      tagline: "Extensible clean layered architecture RESTful backend",
      description: "Modern RESTful e-commerce API built with Java 21, Spring Boot, Hibernate, and JPA supporting product catalog, category hierarchy, and supplier inventory with DTO design patterns.",
      category: "Full Stack",
      tags: ["Java 21", "Spring Boot", "Hibernate", "JPA", "Layered Architecture"],
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      featured: false,
      liveUrl: "https://github.com/devutku/ECommerceAPI",
      githubUrl: "https://github.com/devutku/ECommerceAPI",
      stats: { stars: 4, forks: 1 }
    },
    {
      id: "win11-portfolio",
      title: "Windows 11 Web OS Portfolio",
      tagline: "Interactive desktop operating system in the browser",
      description: "An authentic Windows 11 replica built with React 19, Vite, Acrylic Glassmorphism, and Web Audio API, featuring draggable windows, custom PowerShell, Spotify player, and lock screen.",
      category: "Interactive",
      tags: ["React 19", "Vite", "Web Audio API", "Acrylic Glassmorphism"],
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
      featured: true,
      liveUrl: "https://github.com/devutku",
      githubUrl: "https://github.com/devutku",
      stats: { stars: 15, forks: 3 }
    }
  ],

  musicPlaylist: [
    {
      title: "Lofi Coding Beats",
      artist: "Chillhop Music",
      src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
      cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=80",
      duration: "2:40"
    },
    {
      title: "Night Tokyo Vibes",
      artist: "Synthwave Dreams",
      src: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=electronic-future-beats-117997.mp3",
      cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&auto=format&fit=crop&q=80",
      duration: "3:15"
    },
    {
      title: "Deep Focus Ambient",
      artist: "Coffee Shop Acoustics",
      src: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=ambient-piano-amp-strings-10711.mp3",
      cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&auto=format&fit=crop&q=80",
      duration: "2:10"
    }
  ],

  wallpapers: [
    {
      id: "bloom-dark",
      name: "Windows 11 Bloom Dark",
      type: "gradient",
      css: "radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0f172a 45%, #020617 100%)",
      preview: "#1e1b4b",
      accent: "#38bdf8"
    },
    {
      id: "bloom-blue",
      name: "Sapphire Deep Blue",
      type: "gradient",
      css: "linear-gradient(135deg, #0b192c 0%, #1e3e62 50%, #000000 100%)",
      preview: "#1e3e62",
      accent: "#00d2ff"
    },
    {
      id: "cyber-neon",
      name: "Neon Cyberpunk",
      type: "gradient",
      css: "linear-gradient(135deg, #180126 0%, #3a0ca3 40%, #7209b7 70%, #05050e 100%)",
      preview: "#7209b7",
      accent: "#f72585"
    },
    {
      id: "emerald-aurora",
      name: "Aurora Borealis",
      type: "gradient",
      css: "linear-gradient(135deg, #052e16 0%, #064e3b 40%, #0f172a 100%)",
      preview: "#064e3b",
      accent: "#34d399"
    },
    {
      id: "sunset-glow",
      name: "Sunset Horizon",
      type: "gradient",
      css: "linear-gradient(135deg, #2e0854 0%, #831843 45%, #18181b 100%)",
      preview: "#831843",
      accent: "#f43f5e"
    }
  ],

  recycleBinItems: [
    { id: 1, name: "node_modules_backup (94GB)", type: "Folder", size: "94.2 GB", date: "Yesterday" },
    { id: 2, name: "bug_that_worked_on_my_machine.cs", type: "C# Source File", size: "4 KB", date: "3 days ago" },
    { id: 3, name: "coffee_cups_empty_v4.png", type: "PNG Image", size: "2.1 MB", date: "Last week" },
    { id: 4, name: "unreleased_billion_dollar_startup_idea.txt", type: "Text Document", size: "12 KB", date: "Last month" },
    { id: 5, name: "final_final_v2_DEFINITIVE_res.pdf", type: "PDF Document", size: "1.4 MB", date: "2 months ago" }
  ]
};
