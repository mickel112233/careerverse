import DashboardClient from './client';

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-2xl p-4 sm:p-6 md:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Your Learning Roadmap</h1>
        <p className="mt-2 text-muted-foreground">
          Choose a subject to begin. Complete challenges to unlock new skills and climb the ranks.
        </p>
      </div>
      <DashboardClient />
    </div>
  );
}
