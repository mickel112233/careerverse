import LearningFlowClient from './client';

export default function LearningPage({ params }: { params: { slug: string } }) {
  const topicTitle = decodeURIComponent(params.slug).replace(/-/g, ' ');

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary capitalize">{topicTitle}</h1>
        <p className="mt-2 text-muted-foreground">
          Study the material below, then prepare for the challenge.
        </p>
      </div>
      <LearningFlowClient topic={topicTitle} />
    </div>
  );
}
