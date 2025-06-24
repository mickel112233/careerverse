'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { BookOpenCheck, GraduationCap, Code, BrainCircuit, Megaphone, Briefcase, Palette } from 'lucide-react';

const streams = [
  { name: 'Class 10', icon: GraduationCap },
  { name: 'Class 11', icon: GraduationCap },
  { name: 'Class 12', icon: GraduationCap },
  { name: 'Software Development', icon: Code },
  { name: 'Data Science & AI', icon: BrainCircuit },
  { name: 'Digital Marketing', icon: Megaphone },
  { name: 'Business & Finance', icon: Briefcase },
  { name: 'Graphic Design', icon: Palette },
];

export function SubjectSelector() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <BookOpenCheck className="h-4 w-4" />
          <span className="sr-only">Choose Subject</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Your Subject</DialogTitle>
          <DialogDescription>
            Select a learning path to begin your journey.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4">
          {streams.map((stream) => {
            const Icon = stream.icon;
            return (
              <Button
                key={stream.name}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2 text-center p-2"
              >
                <Icon className="h-8 w-8 text-primary" />
                <span className="text-xs font-semibold">{stream.name}</span>
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
