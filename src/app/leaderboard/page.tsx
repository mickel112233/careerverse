import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy } from "lucide-react";

const leaderboardData = [
  { rank: 1, name: 'QuantumLeap', xp: 9850, avatar: 'https://placehold.co/100x100.png?a=1', dataAiHint: 'woman face', badges: ['Master Coder', 'AI Guru'] },
  { rank: 2, name: 'SynthWave', xp: 9500, avatar: 'https://placehold.co/100x100.png?a=2', dataAiHint: 'man portrait', badges: ['Design Sensei'] },
  { rank: 3, name: 'CodeNinja', xp: 9200, avatar: 'https://placehold.co/100x100.png?a=3', dataAiHint: 'person glasses', badges: ['React Pro', 'TS Wizard'] },
  { rank: 4, name: 'DataDynamo', xp: 8900, avatar: 'https://placehold.co/100x100.png?a=4', dataAiHint: 'woman smiling', badges: ['Pythonista', 'Data Whisperer'] },
  { rank: 5, name: 'PixelPerfect', xp: 8750, avatar: 'https://placehold.co/100x100.png?a=5', dataAiHint: 'man serious', badges: ['UI/UX Expert'] },
  { rank: 6, name: 'LogicLord', xp: 8500, avatar: 'https://placehold.co/100x100.png?a=6', dataAiHint: 'person smiling', badges: ['Algorithm Ace'] },
  { rank: 7, name: 'CloudChaser', xp: 8300, avatar: 'https://placehold.co/100x100.png?a=7', dataAiHint: 'woman developer', badges: ['DevOps King'] },
  { rank: 8, name: 'ScriptKiddie', xp: 8100, avatar: 'https://placehold.co/100x100.png?a=8', dataAiHint: 'man student', badges: ['JS Jedi'] },
  { rank: 9, name: 'SecureShell', xp: 7900, avatar: 'https://placehold.co/100x100.png?a=9', dataAiHint: 'woman hacker', badges: ['Security Sentinel'] },
  { rank: 10, name: 'APIAdept', xp: 7700, avatar: 'https://placehold.co/100x100.png?a=10', dataAiHint: 'man professional', badges: ['Backend Baron'] },
];

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Leaderboard</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          See who is at the top of their game. Climb the ranks by winning battles and earning XP.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Trophy className="text-primary" />
            Top Players
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px] text-center">Rank</TableHead>
                <TableHead>Player</TableHead>
                <TableHead className="text-right">XP</TableHead>
                <TableHead className="hidden md:table-cell">Badges</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((player) => (
                <TableRow key={player.rank}>
                  <TableCell className="text-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                      player.rank <= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      {player.rank}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={player.avatar} alt={player.name} data-ai-hint={player.dataAiHint} />
                        <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{player.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono font-semibold">{player.xp.toLocaleString()}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex gap-2 flex-wrap">
                      {player.badges.map((badge, index) => (
                        <Badge key={index} variant="secondary">{badge}</Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
