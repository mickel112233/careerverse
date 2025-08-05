
import RoadmapClient from "./client";

export default function RoadmapPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Learning Roadmap</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Choose a skill to forge your path to mastery. Complete each level to unlock the next and earn rewards.
        </p>
      </div>
      <RoadmapClient />
    </div>
  );
}
