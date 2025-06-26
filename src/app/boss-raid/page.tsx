import BossRaidClient from './client';

export default function BossRaidPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Boss Raid</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Team up to take down formidable AI bosses representing real-world career challenges. Only the strongest will prevail and claim legendary rewards.
        </p>
      </div>
      <BossRaidClient />
    </div>
  );
}
