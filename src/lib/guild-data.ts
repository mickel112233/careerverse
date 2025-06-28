
import { Code, PenTool, Database, BarChart2, Shield } from "lucide-react";

export type GuildMember = {
    name: string;
    role: 'Leader' | 'Officer' | 'Member' | 'Admin' | 'Friend' | 'Don' | 'Ghost' | 'Hacker';
    xp: number;
    coins: number;
    gems: number;
    avatarHint: string;
};

export type Guild = {
  id: string;
  name: string;
  slug: string;
  description: string;
  requirements: string;
  members: GuildMember[];
  icon: React.ElementType;
  imageHint: string;
  bannerHint: string;
  crestHint: string;
  type: 'public' | 'private';
  password?: string;
  owner: string;
  capacity: number;
};

const guildMembers = {
    frontend: [
        { name: 'ReactDev', role: 'Leader', xp: 15000, coins: 50000, gems: 500, avatarHint: 'futuristic developer intense' },
        { name: 'VueVixen', role: 'Officer', xp: 12000, coins: 35000, gems: 300, avatarHint: 'female developer purple hair' },
        { name: 'CSSWizard', role: 'Member', xp: 9500, coins: 15000, gems: 100, avatarHint: 'wizard casting spell code' },
    ],
    backend: [
        { name: 'NodeKing', role: 'Leader', xp: 16000, coins: 60000, gems: 700, avatarHint: 'king on a throne of servers' },
        { name: 'PyQueen', role: 'Officer', xp: 13500, coins: 40000, gems: 450, avatarHint: 'queen with python snake' },
        { name: 'GoGopher', role: 'Member', xp: 10500, coins: 20000, gems: 150, avatarHint: 'happy gopher mascot' },
    ],
    design: [
        { name: 'Figmaster', role: 'Leader', xp: 14000, coins: 45000, gems: 600, avatarHint: 'designer with glowing pen' },
        { name: 'SketchSensei', role: 'Officer', xp: 11000, coins: 30000, gems: 250, avatarHint: 'wise old design master' },
        { name: 'AdobeAce', role: 'Member', xp: 9000, coins: 18000, gems: 80, avatarHint: 'artist painting on tablet' },
    ],
    data: [
        { name: 'TensorFlowTamer', role: 'Leader', xp: 18000, coins: 80000, gems: 1200, avatarHint: 'scientist with neural network' },
        { name: 'PandasPatron', role: 'Officer', xp: 14500, coins: 55000, gems: 550, avatarHint: 'woman with a friendly panda' },
        { name: 'SQLSorcerer', role: 'Member', xp: 11500, coins: 25000, gems: 200, avatarHint: 'sorcerer with glowing data tables' },
    ],
    security: [
        { name: 'FirewallFox', role: 'Leader', xp: 17000, coins: 75000, gems: 1000, avatarHint: 'red fox wearing a headset' },
        { name: 'KernelKnight', role: 'Officer', xp: 13000, coins: 42000, gems: 400, avatarHint: 'knight with a glowing shield' },
        { name: 'BugBountyHunter', role: 'Member', xp: 10000, coins: 22000, gems: 180, avatarHint: 'bounty hunter in a cyberpunk city' },
    ],
    void: [
        { name: 'NullPointer', role: 'Leader', xp: 25000, coins: 150000, gems: 2500, avatarHint: 'figure dissolving into static' },
        { name: 'ShadowByte', role: 'Officer', xp: 20000, coins: 100000, gems: 1500, avatarHint: 'ninja in the shadows' },
    ]
};

export const mockGuilds: Guild[] = [
  { 
    id: 'GUILD-1', 
    name: 'Frontend Forces', 
    slug: 'frontend-forces', 
    description: 'Masters of UI/UX, React, and modern web technologies.', 
    requirements: 'Must have a passion for beautiful interfaces and clean code. Minimum Level 10.',
    members: guildMembers.frontend, 
    icon: Code, 
    imageHint: 'abstract code interface', 
    bannerHint: 'abstract blue code interface banner',
    crestHint: 'futuristic guild crest emblem, frontend forces',
    type: 'public',
    owner: 'ReactDev',
    capacity: 50,
  },
  { 
    id: 'GUILD-2', 
    name: 'Backend Brigade', 
    slug: 'backend-brigade', 
    description: 'Architects of scalable APIs, databases, and server-side logic.', 
    requirements: 'Strong understanding of system design and database management. Minimum Level 15.',
    members: guildMembers.backend, 
    icon: Database, 
    imageHint: 'futuristic server room', 
    bannerHint: 'futuristic server room banner',
    crestHint: 'futuristic guild crest emblem, backend brigade',
    type: 'public',
    owner: 'NodeKing',
    capacity: 50,
  },
  { 
    id: 'GUILD-3', 
    name: 'Design Dynasty', 
    slug: 'design-dynasty', 
    description: 'Creators of stunning visuals and intuitive user experiences.', 
    requirements: 'A strong portfolio and a keen eye for detail. Figma proficiency is a must.',
    members: guildMembers.design, 
    icon: PenTool, 
    imageHint: 'glowing design sketch', 
    bannerHint: 'abstract glowing design tools banner',
    crestHint: 'futuristic guild crest emblem, design dynasty',
    type: 'public',
    owner: 'Figmaster',
    capacity: 50,
  },
  { 
    id: 'GUILD-4', 
    name: 'Data Mavericks', 
    slug: 'data-mavericks', 
    description: 'Experts in data science, machine learning, and analytics.', 
    requirements: 'Proficiency in Python (Pandas, NumPy) and SQL. Experience with ML frameworks is a plus.',
    members: guildMembers.data, 
    icon: BarChart2, 
    imageHint: 'holographic data visualization', 
    bannerHint: 'holographic data visualization banner',
    crestHint: 'futuristic guild crest emblem, data mavericks',
    type: 'public',
    owner: 'TensorFlowTamer',
    capacity: 50,
  },
  { 
    id: 'GUILD-5', 
    name: 'Cyber Sentinels', 
    slug: 'cyber-sentinels', 
    description: 'Guardians of digital fortresses and cybersecurity experts.', 
    requirements: 'Knowledge of network security, ethical hacking, and cryptography. Certifications are a plus.',
    members: guildMembers.security, 
    icon: Shield, 
    imageHint: 'cyber security matrix', 
    bannerHint: 'cyber security matrix banner',
    crestHint: 'futuristic guild crest emblem, cyber sentinels',
    type: 'public',
    owner: 'FirewallFox',
    capacity: 50,
  },
  { 
    id: 'GUILD-6', 
    name: 'The Void Runners', 
    slug: 'void-runners', 
    description: 'A secretive guild operating in the shadows. Entry by merit alone.', 
    requirements: 'Unknown. You must be invited.',
    members: guildMembers.void, 
    icon: Shield, 
    imageHint: 'dark cosmic void', 
    bannerHint: 'dark cosmic void banner',
    crestHint: 'futuristic guild crest emblem, void runners',
    type: 'private', 
    password: 'secret',
    owner: 'NullPointer',
    capacity: 100,
  },
];
