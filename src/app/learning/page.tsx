import LearningClient from "./client";

export default function LearningPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Personalized Learning Path</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Answer a few questions about your goals and current skills to get a custom-tailored learning plan from our AI career coach.
        </p>
      </div>
      <LearningClient />
    </div>
  );
}
