
import LearningFlowClient from './client';

export default function LearningPage({ params }: { params: { slug: string } }) {
  const topicTitle = decodeURIComponent(params.slug).replace(/-/g, ' ');

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 md:p-8">
      <LearningFlowClient topic={topicTitle} slug={params.slug} />
    </div>
  );
}
