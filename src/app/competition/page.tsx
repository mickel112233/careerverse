import CompetitionClient from "./client";

export default function CompetitionPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">AI Skill Battle</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Generate a quiz for any job role and test your knowledge against our AI. Enter a role to begin the challenge.
        </p>
      </div>
      <CompetitionClient />
    </div>
  );
}
