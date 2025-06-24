import CompetitionClient from "./client";

export default function CompetitionPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Battle Arena</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Face off against other players in real-time quiz battles. Choose your subject, select your challenge, and climb the ranks.
        </p>
      </div>
      <CompetitionClient />
    </div>
  );
}
