

export type PlayerData = {
  rank: number;
  name: string;
  xp: number;
  prestige: number;
  wins: number;
  losses: number;
  prompt: string;
  badges: string[];
  guild: string | null;
  bossFights: number;
  showcase: string[];
};

export const mockLeaderboardData: Omit<PlayerData, 'rank'>[] = [
  { rank: 1, name: 'QuantumLeap', xp: 0, prestige: 0, wins: 0, losses: 0, prompt: 'cyberpunk woman portrait', badges: ['Master Coder', 'AI Guru'], guild: 'The Void Runners', bossFights: 5, showcase: [] },
  { rank: 2, name: 'SynthWave', xp: 9500, prestige: 0, wins: 110, losses: 20, prompt: 'cyberpunk man portrait', badges: ['Design Sensei'], guild: 'Design Dynasty', bossFights: 3, showcase: ['Neon Glow Profile FX', 'The Legend Title'] },
  { rank: 3, name: 'CodeNinja', xp: 9200, prestige: 0, wins: 105, losses: 18, prompt: 'hacker with glasses', badges: ['React Pro', 'TS Wizard'], guild: 'Frontend Forces', bossFights: 2, showcase: ['Glitch-in-the-Matrix FX', 'The Master Title'] },
  { rank: 4, name: 'DataDynamo', xp: 8900, prestige: 0, wins: 100, losses: 25, prompt: 'data scientist smiling', badges: ['Pythonista', 'Data Whisperer'], guild: 'Data Mavericks', bossFights: 4, showcase: ['AI Companion: Bit', 'The Adept Title'] },
  { rank: 5, name: 'PixelPerfect', xp: 8750, prestige: 0, wins: 98, losses: 30, prompt: 'designer serious', badges: ['UI/UX Expert'], guild: 'Design Dynasty', bossFights: 1, showcase: ['Clockwork Frame'] },
  { rank: 6, name: 'LogicLord', xp: 8500, prestige: 0, wins: 95, losses: 15, prompt: 'philosopher thinking', badges: ['Algorithm Ace'], guild: null, bossFights: 6, showcase: [] },
  { rank: 7, name: 'CloudChaser', xp: 8300, prestige: 0, wins: 90, losses: 22, prompt: 'devops engineer female', badges: ['DevOps King'], guild: 'Backend Brigade', bossFights: 3, showcase: [] },
  { rank: 8, name: 'ScriptKiddie', xp: 8100, prestige: 0, wins: 88, losses: 35, prompt: 'young male student', badges: ['JS Jedi'], guild: null, bossFights: 0, showcase: ['The Apprentice Title'] },
  { rank: 9, name: 'SecureShell', xp: 7900, prestige: 0, wins: 85, losses: 12, prompt: 'female hacker hood', badges: ['Security Sentinel'], guild: 'Cyber Sentinels', bossFights: 8, showcase: ['Dark Matter Theme', 'AI Companion: Specter'] },
  { rank: 10, name: 'APIAdept', xp: 7700, prestige: 0, wins: 80, losses: 28, prompt: 'male backend developer', badges: ['Backend Baron'], guild: 'Backend Brigade', bossFights: 2, showcase: [] },
  // Adding guild members not on top 10 to the list for lookup
  { name: 'ReactDev', xp: 15000, prestige: 0, wins: 150, losses: 40, prompt: 'futuristic developer intense', badges: [], guild: 'Frontend Forces', bossFights: 10, showcase: [] },
  { name: 'VueVixen', xp: 12000, prestige: 0, wins: 130, losses: 30, prompt: 'female developer purple hair', badges: [], guild: 'Frontend Forces', bossFights: 8, showcase: [] },
  { name: 'CSSWizard', xp: 9500, prestige: 0, wins: 100, losses: 20, prompt: 'wizard casting spell code', badges: [], guild: 'Frontend Forces', bossFights: 5, showcase: [] },
  { name: 'NodeKing', xp: 16000, prestige: 0, wins: 160, losses: 35, prompt: 'king on a throne of servers', badges: [], guild: 'Backend Brigade', bossFights: 12, showcase: [] },
  { name: 'PyQueen', xp: 13500, prestige: 0, wins: 140, losses: 25, prompt: 'queen with python snake', badges: [], guild: 'Backend Brigade', bossFights: 9, showcase: [] },
  { name: 'GoGopher', xp: 10500, prestige: 0, wins: 110, losses: 15, prompt: 'happy gopher mascot', badges: [], guild: 'Backend Brigade', bossFights: 6, showcase: [] },
  { name: 'Figmaster', xp: 14000, prestige: 0, wins: 120, losses: 10, prompt: 'designer with glowing pen', badges: [], guild: 'Design Dynasty', bossFights: 4, showcase: [] },
  { name: 'SketchSensei', xp: 11000, prestige: 0, wins: 100, losses: 5, prompt: 'wise old design master', badges: [], guild: 'Design Dynasty', bossFights: 2, showcase: [] },
  { name: 'AdobeAce', xp: 9000, prestige: 0, wins: 90, losses: 15, prompt: 'artist painting on tablet', badges: [], guild: 'Design Dynasty', bossFights: 1, showcase: [] },
  { name: 'TensorFlowTamer', xp: 18000, prestige: 0, wins: 200, losses: 20, prompt: 'scientist with neural network', badges: [], guild: 'Data Mavericks', bossFights: 15, showcase: [] },
  { name: 'PandasPatron', xp: 14500, prestige: 0, wins: 150, losses: 15, prompt: 'woman with a friendly panda', badges: [], guild: 'Data Mavericks', bossFights: 10, showcase: [] },
  { name: 'SQLSorcerer', xp: 11500, prestige: 0, wins: 120, losses: 10, prompt: 'sorcerer with glowing data tables', badges: [], guild: 'Data Mavericks', bossFights: 7, showcase: [] },
  { name: 'FirewallFox', xp: 17000, prestige: 0, wins: 180, losses: 5, prompt: 'red fox wearing a headset', badges: [], guild: 'Cyber Sentinels', bossFights: 18, showcase: [] },
  { name: 'KernelKnight', xp: 13000, prestige: 0, wins: 140, losses: 8, prompt: 'knight with a glowing shield', badges: [], guild: 'Cyber Sentinels', bossFights: 11, showcase: [] },
  { name: 'BugBountyHunter', xp: 10000, prestige: 0, wins: 100, losses: 2, prompt: 'bounty hunter in a cyberpunk city', badges: [], guild: 'Cyber Sentinels', bossFights: 9, showcase: [] },
  { name: 'NullPointer', xp: 25000, prestige: 1, wins: 300, losses: 10, prompt: 'figure dissolving into static', badges: [], guild: 'The Void Runners', bossFights: 25, showcase: [] },
  { name: 'ShadowByte', xp: 20000, prestige: 1, wins: 250, losses: 15, prompt: 'ninja in the shadows', badges: [], guild: 'The Void Runners', bossFights: 20, showcase: [] },
].map((p, i) => ({...p, rank: i + 1 }));


export const calculateScore = (player: { xp: number, wins: number, losses: number }) => {
    return Math.pow(player.xp, 2) + Math.pow(player.wins, 2) - Math.pow(player.losses, 2);
};
