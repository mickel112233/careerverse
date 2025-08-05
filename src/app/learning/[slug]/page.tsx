
import LearningClient from './client';

export default function LearningPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <LearningClient slug={params.slug} />
    </div>
  );
}
