import type { LevelQuiz } from './index';

export const aiLiteracyQuiz: LevelQuiz[] = [
    {
        levelId: 'ai-literacy-level-1',
        questions: [
            {
                question: 'Which of the following is a subfield of Artificial Intelligence?',
                options: ['Machine Learning', 'Deep Blue', 'The Turing Test', 'ChatGPT'],
                answer: 'Machine Learning',
            },
            {
                question: 'What is the most common way to achieve AI today?',
                options: ['Traditional Programming', 'Expert Systems', 'Machine Learning', 'Rule-Based Systems'],
                answer: 'Machine Learning',
            },
            {
                question: 'Deep Learning uses a specific type of algorithm called a...?',
                options: ['Decision Tree', 'Regression Algorithm', 'Expert System', 'Neural Network'],
                answer: 'Neural Network',
            },
        ],
    },
    {
        levelId: 'ai-literacy-level-2',
        questions: [
            {
                question: 'Who is widely considered the father of AI?',
                options: ['John McCarthy', 'Alan Turing', 'Geoffrey Hinton', 'Yann LeCun'],
                answer: 'Alan Turing',
            },
            {
                question: 'What event is considered the official birth of AI as a dedicated academic field?',
                options: ['The Turing Test', 'The Dartmouth Workshop', 'The defeat of Garry Kasparov', 'The development of AlexNet'],
                answer: 'The Dartmouth Workshop',
            },
            {
                question: 'What event kickstarted the deep learning boom in 2012?',
                options: ['The defeat of Garry Kasparov', 'The development of AlexNet', 'The Dartmouth Workshop', 'The Turing Test'],
                answer: 'The development of AlexNet',
            },
        ],
    },
    {
        levelId: 'ai-literacy-level-3',
        questions: [
            {
                question: 'Which type of AI can learn from past data to inform future decisions?',
                options: ['Reactive Machines', 'Limited Memory AI', 'Theory of Mind AI', 'Self-Aware AI'],
                answer: 'Limited Memory AI',
            },
            {
                question: 'Which of the following is an example of a Reactive Machine?',
                options: ['A self-driving car', 'A conversational chatbot', 'IBM\'s Deep Blue chess program', 'A spam filter that learns from new types of spam'],
                answer: 'IBM\'s Deep Blue chess program',
            },
            {
                question: 'Which type of AI is still purely theoretical?',
                options: ['Reactive Machines', 'Limited Memory AI', 'Theory of Mind AI', 'All of the above'],
                answer: 'Theory of Mind AI',
            },
        ],
    },
    {
        levelId: 'ai-literacy-level-4',
        questions: [
            {
                question: 'What are the three core components of any AI system?',
                options: ['Data, Algorithms, and Models', 'Data, Hardware, and Software', 'Data, Code, and Output', 'Input, Processing, and Output'],
                answer: 'Data, Algorithms, and Models',
            },
            {
                question: 'What is the "recipe" or set of rules that an AI system uses to learn from the data?',
                options: ['Data', 'Algorithm', 'Model', 'Output'],
                answer: 'Algorithm',
            },
            {
                question: 'What is the output of the training process?',
                options: ['Data', 'Algorithm', 'Model', 'Output'],
                answer: 'Model',
            },
        ],
    },
    {
        levelId: 'ai-literacy-level-5',
        questions: [
            {
                question: 'What is the key difference between generative AI and a classification AI?',
                options: ['Generative AI is more accurate.', 'Generative AI can create new content.', 'Generative AI is more biased.', 'Generative AI is faster.'],
                answer: 'Generative AI can create new content.',
            },
            {
                question: 'What is the role of a "prompt" in a generative AI system?',
                options: ['To give the AI a persona', 'To provide the AI with a set of instructions', 'To provide the AI with a set of examples', 'All of the above'],
                answer: 'All of the above',
            },
            {
                question: 'What are some of the key implications of the rise of generative AI?',
                options: ['It opens up new possibilities for creativity and productivity.', 'It introduces challenges related to copyright and misinformation.', 'It makes it more important than ever to understand how these tools work.', 'All of the above'],
                answer: 'All of the above',
            },
        ],
    },
    {
        levelId: 'ai-literacy-level-6',
        questions: [
            {
                question: 'Which type of AI is designed and trained for a single, specific task?',
                options: ['Narrow AI', 'General AI', 'Superintelligence', 'Reactive AI'],
                answer: 'Narrow AI',
            },
            {
                question: 'What is the key characteristic of General AI?',
                options: ['It can perform any intellectual task that a human can.', 'It is more intelligent than a human.', 'It is the same as a human.', 'It is more creative than a human.'],
                answer: 'It can perform any intellectual task that a human can.',
            },
            {
                question: 'What is the main ethical concern associated with Superintelligence?',
                options: ['It will be too expensive.', 'It will be too slow.', 'It will be too difficult to build.', 'Its goals may not be aligned with our own.'],
                answer: 'Its goals may not be aligned with our own.',
            },
        ],
    },
    {
        levelId: 'ai-literacy-level-7',
        questions: [
            {
                question: 'Which of the following is an example of an AI application in daily life?',
                options: ['A digital assistant like Siri or Alexa', 'A recommendation engine on Netflix or Spotify', 'A spam filter in your email', 'All of the above'],
                answer: 'All of the above',
            },
            {
                question: 'What type of AI is used in a navigation app to suggest the fastest route?',
                options: ['Computer Vision', 'Natural Language Processing', 'Machine Learning', 'All of the above'],
                answer: 'Machine Learning',
            },
            {
                question: 'How does an AI-powered recommendation engine work?',
                options: ['It analyzes your viewing history, listening habits, and purchase behavior.', 'It suggests random content.', 'It suggests the most popular content.', 'It suggests the content that is most profitable for the company.'],
                answer: 'It analyzes your viewing history, listening habits, and purchase behavior.',
            },
        ],
    },
    {
        levelId: 'ai-literacy-level-8',
        questions: [
            {
                question: 'What is the purpose of Natural Language Processing (NLP)?',
                options: ['To allow computers to "see" and interpret the visual world.', 'To allow computers to read, understand, and generate human language.', 'To allow computers to learn from data without explicit programming.', 'To allow computers to make decisions without human intervention.'],
                answer: 'To allow computers to read, understand, and generate human language.',
            },
            {
                question: 'What is one of the main challenges of NLP?',
                options: ['Human language is incredibly complex and filled with ambiguity.', 'NLP models are very expensive to train.', 'NLP models are very slow.', 'All of the above'],
                answer: 'Human language is incredibly complex and filled with ambiguity.',
            },
            {
                question: 'Which of the following is a task that a large language model can perform?',
                options: ['Text Generation', 'Summarization', 'Translation', 'All of the above'],
                answer: 'All of the above',
            },
        ],
    },
    {
        levelId: 'ai-literacy-level-9',
        questions: [
            {
                question: 'What is the purpose of Computer Vision?',
                options: ['To allow computers to "see" and interpret the visual world.', 'To allow computers to read, understand, and generate human language.', 'To allow computers to learn from data without explicit programming.', 'To allow computers to make decisions without human intervention.'],
                answer: 'To allow computers to "see" and interpret the visual world.',
            },
            {
                question: 'What is the key difference between object detection and image classification?',
                options: ['Object detection is more accurate than image classification.', 'Object detection is faster than image classification.', 'Object detection identifies the location of objects, while image classification assigns a label to an entire image.', 'Image classification is more expensive than object detection.'],
                answer: 'Object detection identifies the location of objects, while image classification assigns a label to an entire image.',
            },
            {
                question: 'What is one real-world application of Computer Vision?',
                options: ['Facial recognition', 'Self-driving cars', 'Medical imaging analysis', 'All of a