import { UserProfile, SubjectRecord, ResumeData, CareerQuest, AchievementBadge, QuizQuestion, InterviewQuestion } from '../types';

export const DEMO_PROFILES: Record<string, UserProfile> = {
  student: {
    id: 'demo-student',
    name: 'Archana',
    email: 'itsachu06@gmail.com',
    pathway: 'student',
    goal: 'Maintain >90% grade average & land a Software Engineering Internship / Full-Stack Developer role',
    targetRole: 'Software Engineering Intern',
    field: 'Computer Science & Engineering',
    currentStage: 'Undergraduate Scholar (B.Tech CS)',
    availableHoursPerWeek: 18,
    learningStyle: 'practical',
    demoMode: true,
    xp: 450,
    level: 3,
    streakDays: 5,
    personality: 'study_buddy',
    funModeEnabled: true,
    theme: 'light',
  },
  graduate: {
    id: 'demo-graduate',
    name: 'Maya Patel',
    email: 'maya.patel@alumni.edu',
    pathway: 'graduate',
    goal: 'Secure first full-time role as Junior Cloud/DevOps Engineer within 60 days',
    targetRole: 'Junior Cloud / DevOps Engineer',
    field: 'Information Systems',
    currentStage: 'Fresh Graduate (Class of 2026)',
    availableHoursPerWeek: 25,
    learningStyle: 'interactive',
    demoMode: true,
    xp: 620,
    level: 4,
    streakDays: 7,
    personality: 'strict_coach',
    funModeEnabled: true,
    theme: 'light',
  },
  professional: {
    id: 'demo-professional',
    name: 'Marcus Vance',
    email: 'marcus.vance@techlead.io',
    pathway: 'professional',
    goal: 'Transition from Senior Full-Stack Engineer to Staff/Principal Systems Architect',
    targetRole: 'Staff Software Architect',
    field: 'Distributed Systems & Cloud',
    currentStage: 'Senior Professional (6+ Years)',
    availableHoursPerWeek: 8,
    learningStyle: 'reading',
    demoMode: true,
    xp: 1240,
    level: 7,
    streakDays: 12,
    personality: 'calm_mentor',
    funModeEnabled: false,
    theme: 'light',
  },
  career_changer: {
    id: 'demo-career-changer',
    name: 'Elena Rostova',
    email: 'elena.rostova@designcraft.org',
    pathway: 'career_changer',
    goal: 'Transition from Senior Graphic Designer into Frontend UI/UX Design Technologist',
    targetRole: 'UI/UX Design Technologist',
    field: 'Product Design & Web Engineering',
    currentStage: 'Career Transitioner',
    availableHoursPerWeek: 12,
    learningStyle: 'visual',
    demoMode: true,
    xp: 490,
    level: 3,
    streakDays: 5,
    personality: 'playful_motivator',
    funModeEnabled: true,
    theme: 'light',
  },
};

export const DEMO_SUBJECT_RECORDS: SubjectRecord[] = [
  {
    id: 'sub-1',
    subject: 'Data Structures & Algorithms',
    assessmentName: 'Midterm Exam - Trees & Graphs',
    date: '2026-09-14',
    marksObtained: 88,
    maxMarks: 100,
    percentage: 88,
    attendancePercent: 95,
    difficultTopics: ['Red-Black Trees', 'Dijkstra Proofs'],
    confidence: 4,
    notes: 'Strong in BFS/DFS, need practice on DP on trees.'
  },
  {
    id: 'sub-2',
    subject: 'Data Structures & Algorithms',
    assessmentName: 'Quiz 2 - Dynamic Programming',
    date: '2026-10-02',
    marksObtained: 72,
    maxMarks: 100,
    percentage: 72,
    attendancePercent: 95,
    difficultTopics: ['Matrix Chain Multiplication', 'Knapsack Variations'],
    confidence: 3,
    notes: 'State transitions were confusing under time pressure.'
  },
  {
    id: 'sub-3',
    subject: 'Database Systems',
    assessmentName: 'SQL & Normalization Lab Exam',
    date: '2026-09-20',
    marksObtained: 94,
    maxMarks: 100,
    percentage: 94,
    attendancePercent: 98,
    difficultTopics: ['BCNF Multi-valued dependencies'],
    confidence: 5,
    notes: 'Comfortable with complex joins, window functions, and indexing.'
  },
  {
    id: 'sub-4',
    subject: 'Computer Systems & Architecture',
    assessmentName: 'Assembly & Memory Hierarchy Quiz',
    date: '2026-09-28',
    marksObtained: 68,
    maxMarks: 100,
    percentage: 68,
    attendancePercent: 88,
    difficultTopics: ['Cache Miss Analysis', 'Pipeline Hazards'],
    confidence: 2,
    notes: 'Need to review 2-way set associative cache address splitting.'
  },
  {
    id: 'sub-5',
    subject: 'Web Systems Architecture',
    assessmentName: 'REST API & Microservices Project',
    date: '2026-10-12',
    marksObtained: 96,
    maxMarks: 100,
    percentage: 96,
    attendancePercent: 100,
    difficultTopics: ['OAuth 2.0 PKCE flow'],
    confidence: 5,
    notes: 'Built a full Express + TypeScript auth gateway.'
  },
  {
    id: 'sub-6',
    subject: 'Discrete Mathematics',
    assessmentName: 'Graph Theory & Combinatorics Midterm',
    date: '2026-10-15',
    marksObtained: 78,
    maxMarks: 100,
    percentage: 78,
    attendancePercent: 92,
    difficultTopics: ['Pigeonhole Principle', 'Generating Functions'],
    confidence: 3,
    notes: 'Permutations with repetitions caused small algebraic slip.'
  }
];

export const DEMO_RESUMES: Record<string, ResumeData> = {
  student: {
    id: 'resume-student',
    title: 'Archana - Software Engineering Intern & Full-Stack Developer',
    targetRole: 'Software Engineering Intern',
    contact: {
      fullName: 'Archana',
      email: 'itsachu06@gmail.com',
      phone: '+1 (555) 732-9014',
      location: 'San Francisco, CA',
      portfolioUrl: 'https://archana-portfolio.dev',
      githubUrl: 'https://github.com/archana-tech',
      linkedinUrl: 'https://linkedin.com/in/archana-dev'
    },
    summary: 'Enthusiastic Computer Science undergraduate and full-stack software developer with a solid foundation in algorithms, TypeScript, React, Python, and relational database design. Experienced in building performant web applications, RESTful microservices, and collaborative platforms with clean, tested code. Eager to contribute to high-impact engineering teams.',
    education: [
      {
        id: 'edu-1',
        institution: 'University School of Computer Science & Engineering',
        degree: 'B.S. in Computer Science & Engineering',
        fieldOfStudy: 'Software Systems & Distributed Architecture',
        startDate: '2024-09',
        endDate: '2028-06 (Expected)',
        gpa: '3.84 / 4.00',
        highlights: [
          'Dean\'s Honor List for Academic Excellence (2025, 2026)',
          'Relevant Coursework: Data Structures & Algorithms, Database Systems, Operating Systems, Web Systems, Discrete Mathematics'
        ]
      }
    ],
    experience: [
      {
        id: 'exp-1',
        company: 'University Computer Systems Laboratory',
        role: 'Student Teaching & Software Engineering Assistant',
        location: 'San Francisco, CA',
        startDate: '2025-09',
        endDate: 'Present',
        current: true,
        bullets: [
          'Mentored 50+ students weekly in data structures debugging, Python algorithms, and memory leak analysis.',
          'Built automated Python test verification scripts for lab assignments, reducing grading turnaround by 45%.'
        ]
      }
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'Careercraft AI - Integrated Career & Performance Studio',
        description: 'Full-stack web application combining student academic performance analytics, ATS resume optimization, and multi-agent career planning.',
        technologies: ['React', 'TypeScript', 'Express', 'Tailwind CSS', 'PostgreSQL', 'Vite'],
        link: 'https://github.com/archana-tech/careercraft-ai',
        bullets: [
          'Architected modular 6-agent career audit engine that verifies grounded resume evidence against target job descriptions.',
          'Built deterministic calculation engine for subject-wise trends and study timetable generation with zero hallucinated metrics.'
        ]
      },
      {
        id: 'proj-2',
        name: 'PeerStudy Hub - Real-Time Collaborative Canvas',
        description: 'Web application enabling peer group study with real-time synchronized whiteboard and markdown notes.',
        technologies: ['React', 'TypeScript', 'WebSockets', 'Tailwind CSS', 'PostgreSQL'],
        link: 'https://github.com/archana-tech/peerstudy',
        bullets: [
          'Engineered low-latency synchronized canvas using WebSockets supporting up to 25 concurrent students per room.',
          'Designed modular database schema with PostgreSQL with sub-50ms query latencies for note history and session snapshots.'
        ]
      },
      {
        id: 'proj-3',
        name: 'AlgoVisualizer - Interactive Algorithm Simulator',
        description: 'Interactive browser tool explaining graph traversal (A*, Dijkstra) and dynamic programming algorithms visually.',
        technologies: ['TypeScript', 'HTML5 Canvas', 'React', 'Jest'],
        link: 'https://github.com/archana-tech/algovisualizer',
        bullets: [
          'Rendered interactive step-by-step state animations at 60 FPS for graph traversal algorithms.',
          'Authored comprehensive unit test suite with 92% code coverage verifying edge-case cycle detection.'
        ]
      }
    ],
    skills: {
      technical: ['Python', 'TypeScript', 'JavaScript', 'React', 'Node.js', 'Express', 'SQL (PostgreSQL)', 'C++', 'HTML5/CSS3'],
      tools: ['Git & GitHub', 'Docker', 'Linux/Unix', 'Vite', 'Postman', 'VS Code', 'Jest'],
      soft: ['Analytical Problem Solving', 'Clear Technical Documentation', 'Team Collaboration', 'Fast Learner']
    },
    certifications: [
      {
        id: 'cert-1',
        name: 'Meta Front-End Developer Specialization',
        issuer: 'Coursera / Meta',
        issueDate: '2026-03'
      }
    ],
    achievements: [
      {
        id: 'ach-1',
        title: '1st Place Winner - Collegiate Hackathon Education Track',
        date: '2025-11',
        description: 'Built an accessible offline-first study and revision assistant for undergraduate students in 24 hours.'
      }
    ],
    template: 'modern',
    updatedAt: '2026-10-20'
  },
  graduate: {
    id: 'resume-graduate',
    title: 'Maya Patel - Junior Cloud/DevOps Engineer',
    targetRole: 'Junior Cloud / DevOps Engineer',
    contact: {
      fullName: 'Maya Patel',
      email: 'maya.patel@alumni.edu',
      phone: '+1 (555) 489-1092',
      location: 'San Jose, CA',
      portfolioUrl: 'https://mayapatel.cloud',
      githubUrl: 'https://github.com/mayapatel-devops',
      linkedinUrl: 'https://linkedin.com/in/mayapatel-cloud'
    },
    summary: 'Motivated Cloud & DevOps graduate with hands-on expertise in containerization (Docker, Kubernetes), AWS cloud infrastructure, CI/CD pipeline automation (GitHub Actions), and Linux system administration. AWS Certified Cloud Practitioner with a track record of deploying resilient multi-tier microservices.',
    education: [
      {
        id: 'edu-2',
        institution: 'San Jose State University',
        degree: 'B.S. in Information Systems & Cloud Engineering',
        fieldOfStudy: 'Cloud Infrastructure & Networks',
        startDate: '2022-08',
        endDate: '2026-05',
        gpa: '3.82 / 4.00',
        highlights: ['Senior Capstone: High-Availability Microservices Infrastructure on AWS EKS']
      }
    ],
    experience: [
      {
        id: 'exp-2',
        company: 'StratoTech Systems',
        role: 'DevOps & Site Reliability Intern',
        location: 'Sunnyvale, CA',
        startDate: '2025-06',
        endDate: '2025-12',
        current: false,
        bullets: [
          'Engineered GitHub Actions CI/CD workflows for 4 backend services, decreasing average release deployment cycle by 35%.',
          'Configured Prometheus and Grafana dashboards for cluster resource monitoring, alerting on container memory spikes.',
          'Standardized Docker multi-stage builds across microservices, reducing final image sizes by 58% on average.'
        ]
      }
    ],
    projects: [
      {
        id: 'proj-3',
        name: 'CloudOps Infrastructure as Code (Terraform)',
        description: 'Reproducible multi-region AWS environment with VPC peering, ECS Fargate, RDS PostgreSQL, and CloudFront.',
        technologies: ['Terraform', 'AWS (ECS, RDS, S3)', 'Docker', 'Bash'],
        bullets: [
          'Provisioned modular Terraform stacks for zero-downtime rolling deployments on ECS with automated SSL renewal.',
          'Implemented security scanning using tfsec and Trivy to enforce least-privilege IAM policies.'
        ]
      }
    ],
    skills: {
      technical: ['AWS (ECS, S3, IAM, CloudWatch, RDS)', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD (GitHub Actions)', 'Linux/Bash', 'Python', 'Go basics'],
      tools: ['Git', 'Prometheus', 'Grafana', 'Ansible', 'Helm', 'PostgreSQL'],
      soft: ['Incident Response Communication', 'Root Cause Analysis', 'Agile/Scrum', 'Documentation']
    },
    certifications: [
      {
        id: 'cert-2',
        name: 'AWS Certified Cloud Practitioner (CLF-C02)',
        issuer: 'Amazon Web Services',
        issueDate: '2025-11'
      },
      {
        id: 'cert-3',
        name: 'HashiCorp Certified: Terraform Associate (003)',
        issuer: 'HashiCorp',
        issueDate: '2026-03'
      }
    ],
    achievements: [
      {
        id: 'ach-2',
        title: 'AWS Student Community Builder of the Month',
        date: '2026-01',
        description: 'Authored 5 hands-on tutorials on container security read by over 4,000 university students.'
      }
    ],
    template: 'minimal',
    updatedAt: '2026-10-19'
  },
  professional: {
    id: 'resume-professional',
    title: 'Marcus Vance - Staff Software Architect',
    targetRole: 'Staff Software Architect',
    contact: {
      fullName: 'Marcus Vance',
      email: 'marcus.vance@techlead.io',
      phone: '+1 (555) 819-3301',
      location: 'Austin, TX',
      portfolioUrl: 'https://marcusvance.io',
      githubUrl: 'https://github.com/mvance-eng',
      linkedinUrl: 'https://linkedin.com/in/marcus-vance-architect'
    },
    summary: 'Lead Systems Architect with 7+ years directing core backend and distributed data pipelines. Proven leader scaling platforms from 50k to 12M daily transactions, spearheading zero-downtime cloud migrations, and establishing rigorous engineering standards across cross-functional teams.',
    education: [
      {
        id: 'edu-3',
        institution: 'University of Texas at Austin',
        degree: 'B.S. in Electrical & Computer Engineering',
        fieldOfStudy: 'Computer Systems Architecture',
        startDate: '2015-08',
        endDate: '2019-05',
        highlights: ['Honors Thesis on Distributed Consensus Algorithms']
      }
    ],
    experience: [
      {
        id: 'exp-3',
        company: 'Veloce Data Platforms',
        role: 'Principal Software Architect & Lead',
        location: 'Austin, TX',
        startDate: '2022-03',
        endDate: 'Present',
        current: true,
        bullets: [
          'Led architecture of event-driven event ingestion service handling 45,000 requests/sec with p99 latency under 22ms.',
          'Mentored 14 senior and staff engineers across 3 distributed pods, instituting RFC architectural review cycles.',
          'Reduced annual AWS cloud spend by $180,000 via auto-scaling DynamoDB read/write capacity and spot compute fleets.'
        ]
      },
      {
        id: 'exp-4',
        company: 'Apex Cloud Solutions',
        role: 'Senior Backend Engineer',
        location: 'Dallas, TX',
        startDate: '2019-06',
        endDate: '2022-02',
        current: false,
        bullets: [
          'Decomposed monolithic billing system into decoupled Golang microservices with gRPC inter-service communication.',
          'Built reliable transactional outbox pattern using PostgreSQL and Kafka, guaranteeing zero message loss.'
        ]
      }
    ],
    projects: [
      {
        id: 'proj-4',
        name: 'DistriCache - In-Memory Distributed Key-Value Store',
        description: 'High-throughput raft-replicated distributed cache implemented in Go with sub-millisecond p95 latency.',
        technologies: ['Go', 'Raft Consensus', 'gRPC', 'Protobuf', 'OpenTelemetry'],
        bullets: [
          'Engineered split-brain protection and leader election mechanisms tested under chaos engineering network partitions.'
        ]
      }
    ],
    skills: {
      technical: ['Distributed Systems Architecture', 'Go', 'TypeScript/Node.js', 'PostgreSQL', 'Kafka', 'Redis', 'Kubernetes', 'System Design'],
      tools: ['Terraform', 'Datadog', 'AWS', 'GCP', 'GitHub Enterprise', 'OpenTelemetry'],
      soft: ['Technical Strategy', 'Cross-Team Mentorship', 'Executive Stakeholder Alignment', 'RFC Review Process']
    },
    certifications: [
      {
        id: 'cert-4',
        name: 'AWS Certified Solutions Architect – Professional',
        issuer: 'Amazon Web Services',
        issueDate: '2024-08'
      }
    ],
    achievements: [
      {
        id: 'ach-3',
        title: 'Speaker at QCon San Francisco 2025',
        date: '2025-11',
        description: 'Delivered talk on "Pragmatic Chaos Testing in Financial Ledger Microservices" to 800+ attendees.'
      }
    ],
    template: 'executive',
    updatedAt: '2026-10-15'
  },
  career_changer: {
    id: 'resume-career-changer',
    title: 'Elena Rostova - UI/UX Design Technologist',
    targetRole: 'UI/UX Design Technologist',
    contact: {
      fullName: 'Elena Rostova',
      email: 'elena.rostova@designcraft.org',
      phone: '+1 (555) 712-4402',
      location: 'Chicago, IL',
      portfolioUrl: 'https://elenarostova.design',
      githubUrl: 'https://github.com/elena-rostova-ui',
      linkedinUrl: 'https://linkedin.com/in/elena-rostova'
    },
    summary: 'Senior Visual & Interaction Designer transitioning into Design Technology, bridging the gap between Figma design systems and production React/TypeScript code. 5+ years crafting intuitive consumer interfaces now backed by modern frontend component engineering and WCAG 2.1 AA accessibility compliance.',
    education: [
      {
        id: 'edu-4',
        institution: 'School of the Art Institute of Chicago',
        degree: 'B.F.A. in Visual Communication',
        fieldOfStudy: 'Digital Media & Information Design',
        startDate: '2017-09',
        endDate: '2021-05',
        highlights: ['Focus on Human-Computer Interaction & Typography']
      }
    ],
    experience: [
      {
        id: 'exp-5',
        company: 'Lumina Brand Studio',
        role: 'Senior Product Designer',
        location: 'Chicago, IL',
        startDate: '2021-06',
        endDate: '2026-02',
        current: false,
        bullets: [
          'Created unified multi-brand design system in Figma adopted by 8 product teams, cutting design sprint turnaround by 30%.',
          'Collaborated directly with engineering leads to define design tokens, component props, and accessibility guidelines.',
          'Conducted 40+ usability tests and synthesized telemetry data to optimize key checkout conversion flows by 14%.'
        ]
      }
    ],
    projects: [
      {
        id: 'proj-5',
        name: 'Aura UI - Accessible React Component Library',
        description: 'Open-source design system built with React, TypeScript, Tailwind CSS, and Radix UI primitives.',
        technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Storybook', 'Vitest'],
        bullets: [
          'Authored 25+ accessible components adhering strictly to WAI-ARIA authoring practices and keyboard navigation patterns.',
          'Created automated visual regression testing in Storybook with 100% token tokenization.'
        ]
      }
    ],
    skills: {
      technical: ['React', 'TypeScript', 'Tailwind CSS', 'HTML5/Semantic Web', 'CSS Architecture', 'Figma', 'Design Systems', 'WCAG 2.1 AA'],
      tools: ['Git', 'Storybook', 'Vite', 'Radix UI', 'Framer Motion', 'Chrome DevTools'],
      soft: ['Cross-Disciplinary Translation', 'Design Critique', 'User Empathy', 'Creative Problem Solving']
    },
    certifications: [
      {
        id: 'cert-5',
        name: 'Advanced React & TypeScript Engineering',
        issuer: 'Frontend Masters',
        issueDate: '2026-02'
      }
    ],
    achievements: [
      {
        id: 'ach-4',
        title: 'Design Systems Community Spotlight 2025',
        date: '2025-08',
        description: 'Recognized for creating accessible color-contrast palette tools used by 15,000+ designers.'
      }
    ],
    template: 'modern',
    updatedAt: '2026-10-12'
  }
};

export const DEMO_SAMPLE_JOB_DESCRIPTION = `Software Engineering Intern - Summer 2027
Company: NovaCloud Technologies
Location: Seattle, WA (Hybrid) / Remote

About the Role:
We are looking for an enthusiastic Software Engineering Intern to join our Core Services engineering team for Summer 2027. You will work alongside senior software engineers building high-throughput web applications, microservices, and modern user-facing tools.

Key Responsibilities:
- Design, write, test, and deploy clean, maintainable TypeScript and Python code.
- Collaborate with engineers and product designers on API design and database query optimization (SQL / PostgreSQL).
- Participate in code reviews, sprint planning, and architectural discussions.
- Build automated unit and integration tests to ensure reliable platform performance.
- Troubleshoot performance bottlenecks, memory leaks, and distributed service anomalies.

Required Qualifications:
- Currently pursuing a Bachelor's or Master's degree in Computer Science, Software Engineering, or related technical field.
- Strong foundational knowledge of Data Structures, Algorithms, and Object-Oriented or Functional Programming principles.
- Hands-on experience building projects in Python, TypeScript, or JavaScript.
- Familiarity with SQL and relational databases (e.g., PostgreSQL or MySQL).
- Solid understanding of Git version control and collaborative workflows.

Preferred Qualifications:
- Experience with Docker containerization and Linux environment.
- Familiarity with modern web frameworks (React, Express, FastAPI).
- Prior personal project demonstrating real-time systems, WebSockets, or caching (Redis).
- Passion for software quality, automated testing (Jest/PyTest), and clean code craftsmanship.`;

export const DEMO_CAREER_QUESTS: CareerQuest[] = [
  {
    id: 'quest-1',
    title: 'Algorithm Mastery Check',
    description: 'Score 80%+ on the Dynamic Programming concept quiz.',
    xpReward: 100,
    category: 'academic',
    completed: true,
    progress: 1,
    maxProgress: 1
  },
  {
    id: 'quest-2',
    title: 'Bullet Point Polish',
    description: 'Review and accept or customize 2 AI-suggested resume improvements with quantifiable metrics.',
    xpReward: 150,
    category: 'resume',
    completed: false,
    progress: 1,
    maxProgress: 2
  },
  {
    id: 'quest-3',
    title: 'STAR Method Drill',
    description: 'Complete a behavioral interview practice question using the STAR framework.',
    xpReward: 120,
    category: 'interview',
    completed: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'quest-4',
    title: 'Deep Focus Sprint',
    description: 'Complete a 25-minute uninterrupted Pomodoro focus session.',
    xpReward: 80,
    category: 'learning',
    completed: true,
    progress: 1,
    maxProgress: 1
  },
  {
    id: 'quest-5',
    title: 'Skill Gap Investigation',
    description: 'Run the Multi-Agent Career Analysis against a target job description.',
    xpReward: 180,
    category: 'resume',
    completed: true,
    progress: 1,
    maxProgress: 1
  }
];

export const DEMO_ACHIEVEMENT_BADGES: AchievementBadge[] = [
  {
    id: 'badge-1',
    name: 'Academic Analyzer',
    description: 'Logged and analyzed at least 5 assessment marks with deterministic trend tracking.',
    icon: 'TrendingUp',
    unlocked: true,
    unlockedAt: '2026-10-16'
  },
  {
    id: 'badge-2',
    name: 'Fact-Check Champion',
    description: 'Successfully verified resume claims with zero hallucinated or exaggerated metrics.',
    icon: 'ShieldCheck',
    unlocked: true,
    unlockedAt: '2026-10-18'
  },
  {
    id: 'badge-3',
    name: 'Sprint Champion',
    description: 'Completed 3 consecutive Pomodoro focus sessions without distractions.',
    icon: 'Flame',
    unlocked: true,
    unlockedAt: '2026-10-19'
  },
  {
    id: 'badge-4',
    name: 'Interview Ready',
    description: 'Answered 5 interview questions with comprehensive STAR method structure.',
    icon: 'Award',
    unlocked: false
  },
  {
    id: 'badge-5',
    name: 'ATS Craftsperson',
    description: 'Attained a verified job-match alignment score above 80% on a target role.',
    icon: 'Sparkles',
    unlocked: false
  }
];

export const DEMO_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    topic: 'Dynamic Programming & Memoization',
    difficulty: 'intermediate',
    question: 'What distinguishes Dynamic Programming from a plain Divide-and-Conquer approach?',
    options: [
      'Dynamic Programming only operates on linear array inputs.',
      'Dynamic Programming stores solutions to overlapping subproblems to prevent redundant calculations.',
      'Divide-and-Conquer never uses recursion, whereas DP always uses iteration.',
      'Dynamic Programming is always O(1) in spatial auxiliary memory.'
    ],
    correctAnswerIndex: 1,
    explanation: 'The defining characteristic of DP is the presence of overlapping subproblems and optimal substructure. By memoizing or tabulating subproblem solutions, it avoids repeatedly computing identical states (unlike naive divide-and-conquer).'
  },
  {
    id: 'q-2',
    topic: 'Relational Database Indexing',
    difficulty: 'intermediate',
    question: 'When creating a composite B-Tree index on (department_id, hire_date), which query CANNOT effectively utilize this index?',
    options: [
      'WHERE department_id = 10 AND hire_date > "2024-01-01"',
      'WHERE department_id = 10 ORDER BY hire_date ASC',
      'WHERE hire_date > "2024-01-01"',
      'WHERE department_id = 10'
    ],
    correctAnswerIndex: 2,
    explanation: 'B-tree composite indexes follow the leftmost prefix rule. If the leading column (department_id) is omitted in the query predicate, the index cannot be traversed efficiently from root to leaf, requiring an index scan or full table scan.'
  },
  {
    id: 'q-3',
    topic: 'Cloud & System Design',
    difficulty: 'beginner',
    question: 'What is the primary benefit of deploying stateless web containers behind a Load Balancer?',
    options: [
      'Eliminates the requirement for any persistent database.',
      'Enables horizontal autoscaling because any request can be routed to any instance without session loss.',
      'Guarantees zero network latency across different geographic regions.',
      'Automatically compiles TypeScript into native x86 machine instructions.'
    ],
    correctAnswerIndex: 1,
    explanation: 'When container instances maintain no client state in memory, requests can be distributed to any available instance freely. Instances can be scaled up or down elastically based on CPU/traffic without dropping user sessions.'
  },
  {
    id: 'q-4',
    topic: 'Computer Architecture & Caching',
    difficulty: 'intermediate',
    question: 'Which type of cache miss occurs when two active memory blocks map to the very exact same set in a direct-mapped or set-associative cache?',
    options: [
      'Compulsory (Cold) miss',
      'Capacity miss',
      'Conflict (Collision) miss',
      'Coherence miss'
    ],
    correctAnswerIndex: 2,
    explanation: 'A Conflict miss occurs in direct-mapped or set-associative caches when multiple memory locations compete for the same slot, even though the total cache capacity has not been exhausted.'
  }
];

export const DEMO_INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'int-1',
    type: 'behavioral',
    category: 'Conflict Resolution & Teamwork',
    targetRole: 'Software Engineer',
    question: 'Tell me about a time when you and a teammate or team lead disagreed on a technical architectural decision. How did you resolve it?',
    sampleStructure: 'STAR: Situation (the project and deadline), Task (the disagreement on DB/framework), Action (gathered benchmarks, proposed a spike/prototype, maintained respect), Result (objective outcome and team alignment).',
    userAnswer: 'During our college database project, my partner wanted to use MongoDB for high flexibility, while I argued for PostgreSQL because our schema had strict relational constraints between students, courses, and prerequisites. Rather than debating theoretically, I built a quick 3-hour benchmark simulating 10,000 multi-table relational joins. The results clearly proved PostgreSQL prevented orphan foreign keys and executed queries 4x faster. My partner appreciated the concrete data, and we finished the project with a 96% score.',
    feedback: {
      score: 92,
      strengths: [
        'Excellent use of empirical prototyping over emotional debate.',
        'Clear quantitative results (4x faster, 96% project score).',
        'Strong alignment with the STAR framework.'
      ],
      improvements: [
        'Could briefly mention how you ensured your teammate remained fully engaged in the chosen stack.'
      ],
      starCoverage: {
        situation: true,
        task: true,
        action: true,
        result: true
      }
    }
  },
  {
    id: 'int-2',
    type: 'technical',
    category: 'System Performance & Bottlenecks',
    targetRole: 'Software Engineer',
    question: 'Imagine a user-facing dashboard API endpoint has slowed down from 80ms to 2.4 seconds under medium traffic. Walk me step-by-step through how you would diagnose and fix the issue.',
    sampleStructure: 'Structured diagnostic: 1. Reproduce & measure (APM / logging), 2. Inspect database query execution plan (EXPLAIN ANALYZE for missing indexes or N+1 queries), 3. Inspect application CPU/memory / network I/O, 4. Implement fix (caching/indexing/batching), 5. Verify under load.',
  },
  {
    id: 'int-3',
    type: 'project',
    category: 'Real-Time Systems & WebSockets',
    targetRole: 'Software Engineer',
    question: 'You built the PeerStudy Hub collaborative whiteboard. How did you handle edge cases such as network disconnections, message reordering, and state synchronization when a user reconnects?',
    sampleStructure: 'Architectural explanation: Heartbeat/ping-pong detection, optimistic UI updates, monotonically increasing sequence numbers or vector clocks, and snapshot re-hydration upon reconnection.',
  }
];

export const FUN_FOCUS_MESSAGES = [
  "Your future self just sent a thank-you note from their dream office.",
  "One focused 25-minute session beats five hours of panic scrolling.",
  "Your resume is getting sharper. No imaginary achievements allowed!",
  "Boss battle unlocked: the topic you've been avoiding all week.",
  "Tiny consistent progress counts. Compound interest works on skills too.",
  "Debugging is just science where you are the detective and the criminal.",
  "Coffee converted into clean code and verified credentials."
];
