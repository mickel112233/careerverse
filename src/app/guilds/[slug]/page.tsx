
import GuildDetailClient from './client';

export default function GuildDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <GuildDetailClient slug={params.slug} />
    </div>
  );
}
