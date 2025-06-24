import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Lock, Star, Code, PenTool, Swords, Trophy } from 'lucide-react';

const roadmapNodes = [
  { title: 'Web Development Basics', icon: Code, status: 'completed' },
  { title: 'HTML & CSS Challenge', icon: Swords, status: 'completed' },
  { title: 'JavaScript Fundamentals', icon: Code, status: 'unlocked' },
  { title: 'The DOM Arena', icon: Swords, status: 'unlocked' },
  { title: 'API Guild Quest', icon: PenTool, status: 'locked' },
  { title: 'React.js Mastery', icon: Star, status: 'locked' },
  { title: 'Final Project: The Grand Clash', icon: Trophy, status: 'locked' },
];

const NodeIcon = ({ icon, status }: { icon: React.ElementType, status: string }) => {
  const Icon = icon;
  const colors = {
    completed: 'text-green-400 bg-green-400/10',
    unlocked: 'text-primary bg-primary/10',
    locked: 'text-muted-foreground bg-muted/20',
  }
  return <Icon className={`h-8 w-8 ${colors[status]}`} />
}

const NodeStatusIcon = ({ status }: { status: string }) => {
  if (status === 'completed') return <Check className="h-5 w-5 text-green-400" />;
  if (status === 'locked') return <Lock className="h-5 w-5 text-muted-foreground" />;
  return null;
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-2xl p-4 sm:p-6 md:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Your Learning Roadmap</h1>
        <p className="mt-2 text-muted-foreground">
          Complete challenges to unlock new skills and climb the ranks.
        </p>
      </div>

      <div className="relative">
        {/* The center line */}
        <div className="absolute left-1/2 top-12 bottom-12 w-1 -translate-x-1/2 bg-border/50 rounded-full" />

        <div className="space-y-16">
          {roadmapNodes.map((node, index) => (
            <div key={index} className="relative flex items-center">
              <div className={`w-[calc(50%-2rem)] ${index % 2 === 0 ? 'text-right' : 'order-2 text-left'}`}>
                <Card className={`inline-block text-left border-2 ${node.status === 'unlocked' ? 'border-primary shadow-lg shadow-primary/20' : 'border-transparent'}`}>
                  <CardHeader className="flex-row items-center gap-4 space-y-0 p-4">
                    <NodeIcon icon={node.icon} status={node.status} />
                    <div>
                      <CardTitle className="text-base font-semibold">{node.title}</CardTitle>
                    </div>
                  </CardHeader>
                  {node.status !== 'locked' && (
                    <CardContent className="p-4 pt-0">
                       <Button size="sm" className="w-full" disabled={node.status === 'completed'}>
                         {node.status === 'completed' ? 'Completed' : 'Start Challenge'}
                       </Button>
                    </CardContent>
                  )}
                </Card>
              </div>

              <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-background ring-4 ring-background">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${node.status === 'completed' ? 'bg-green-400/20 ring-2 ring-green-400' : 'bg-muted ring-2 ring-border'}`}>
                   <NodeStatusIcon status={node.status} />
                </div>
              </div>

              <div className={`w-[calc(50%-2rem)] ${index % 2 !== 0 && 'order-1'}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
