import { canvaDesignQuiz } from './canva-design-quiz';
import { promptEngineeringQuiz } from './prompt-engineering-quiz';
import { reelsEditingQuiz } from './reels-editing-quiz';
import { basicSeoQuiz } from './basic-seo-quiz';
import { socialMediaQuiz } from './social-media-quiz';
import { affiliateMarketingQuiz } from './affiliate-marketing-quiz';
import { copywritingQuiz } from './copywriting-quiz';
import { resumeLinkedinQuiz } from './resume-linkedin-quiz';
import { digitalProductCreationQuiz } from './digital-product-creation-quiz';
import { aiLiteracyQuiz } from './ai-literacy-quiz';

export type QuizQuestion = {
    question: string;
    options: string[];
    answer: string;
};

export type LevelQuiz = {
    levelId: string;
    questions: QuizQuestion[];
};

const quizzes: { [key: string]: LevelQuiz[] } = {
    "Canva Design": canvaDesignQuiz,
    "ChatGPT Prompt Engineering": promptEngineeringQuiz,
    "Reels & Shorts Video Editing": reelsEditingQuiz,
    "Basic SEO": basicSeoQuiz,
    "Social Media Management": socialMediaQuiz,
    "Affiliate Marketing": affiliateMarketingQuiz,
    "Copywriting": copywritingQuiz,
    "Resume & LinkedIn Optimization": resumeLinkedinQuiz,
    "Digital Product Creation": digitalProductCreationQuiz,
    "AI Literacy": aiLiteracyQuiz,
};

export function getQuizByStream(streamName: string): LevelQuiz[] | null {
    return quizzes[streamName] || null;
}