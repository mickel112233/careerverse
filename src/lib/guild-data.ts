
import { Code, PenTool, Database, BarChart2, Shield } from "lucide-react";

export type GuildMember = {
    name: string;
    role: 'Leader' | 'Officer' | 'Member' | 'Admin' | 'Friend' | 'Don' | 'Ghost' | 'Hacker';
    xp: number;
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
  type: 'public' | 'private';
  password?: string;
  owner: string;
  capacity: number;
};

const guildMembers = {
    frontend: [
        { name: 'ReactDev', role: 'Leader', xp: 15000, avatarHint: 'futuristic developer intense' },
        { name: 'VueVixen', role: 'Officer', xp: 12000, avatarHint: 'female developer purple hair' },
        { name: 'CSSWizard', role: 'Member', xp: 9500, avatarHint: 'wizard casting spell code' },
    ],
    backend: [
        { name: 'NodeKing', role: 'Leader', xp: 16000, avatarHint: 'king on a throne of servers' },
        { name: 'PyQueen', role: 'Officer', xp: 13500, avatarHint: 'queen with python snake' },
        { name: 'GoGopher', role: 'Member', xp: 10500, avatarHint: 'happy gopher mascot' },
    ],
    design: [
        { name: 'Figmaster', role: 'Leader', xp: 14000, avatarHint: 'designer with glowing pen' },
        { name: 'SketchSensei', role: 'Officer', xp: 11000, avatarHint: 'wise old design master' },
        { name: 'AdobeAce', role: 'Member', xp: 9000, avatarHint: 'artist painting on tablet' },
    ],
    data: [
        { name: 'TensorFlowTamer', role: 'Leader', xp: 18000, avatarHint: 'scientist with neural network' },
        { name: 'PandasPatron', role: 'Officer', xp: 14500, avatarHint: 'woman with a friendly panda' },
        { name: 'SQLSorcerer', role: 'Member', xp: 11500, avatarHint: 'sorcerer with glowing data tables' },
    ],
    security: [
        { name: 'FirewallFox', role: 'Leader', xp: 17000, avatarHint: 'red fox wearing a headset' },
        { name: 'KernelKnight', role: 'Officer', xp: 13000, avatarHint: 'knight with a glowing shield' },
        { name: 'BugBountyHunter', role: 'Member', xp: 10000, avatarHint: 'bounty hunter in a cyberpunk city' },
    ],
    void: [
        { name: 'NullPointer', role: 'Leader', xp: 25000, avatarHint: 'figure dissolving into static' },
        { name: 'ShadowByte', role: 'Officer', xp: 20000, avatarHint: 'ninja in the shadows' },
    ]
};

export const mockGuilds: Omit<Guild, 'capacity' | 'bannerHint' | 'crestHint'>[] = [
  { 
    id: 'GUILD-1', 
    name: 'Frontend Forces', 
    slug: 'frontend-forces', 
    description: 'Masters of UI/UX, React, and modern web technologies.', 
    requirements: 'Must have a passion for beautiful interfaces and clean code. Minimum Level 10.',
    members: guildMembers.frontend, 
    icon: Code, 
    imageHint: 'abstract code interface', 
    type: 'public',
    owner: 'ReactDev'
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
    type: 'public',
    owner: 'NodeKing'
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
    type: 'public',
    owner: 'Figmaster'
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
    type: 'public',
    owner: 'TensorFlowTamer'
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
    type: 'public',
    owner: 'FirewallFox'
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
    type: 'private', 
    password: 'secret',
    owner: 'NullPointer'
  },
];
