
import type { LevelQuiz } from './index';

export const aiLiteracyQuiz: LevelQuiz[] = [
    {
        levelId: 'ai-literacy-level-1',
        questions: [
            {
                question: 'What is the main difference between traditional programming and machine learning?',
                options: ['Machine learning is an older technique', 'In machine learning, the model learns from data rather than being explicitly programmed', 'Traditional programming is more intelligent', 'There is no difference'],
                answer: 'In machine learning, the model learns from data rather than being explicitly programmed',
            },
            {
                question: 'Which of the following represents the correct hierarchy?',
                options: ['AI is a subset of Deep Learning', 'Deep Learning is a subset of AI, which is a subset of Machine Learning', 'Deep Learning is a subset of Machine Learning, which is a subset of AI', 'Machine Learning is a subset of Deep Learning'],
                answer: 'Deep Learning is a subset of Machine Learning, which is a subset of AI',
            },
            {
                question: 'What type of algorithm is used in Deep Learning?',
                options: ['Decision Tree', 'Neural Network', 'Regression Algorithm', 'Expert System'],
                answer: 'Neural Network',
            },
        ],
    },
    {
        levelId: 'ai-literacy-level-2',
        questions: [
            {
                question: 'Who proposed the "Turing Test" as a benchmark for machine intelligence?',
                options: ['John McCarthy', 'Geoffrey Hinton', 'Alan Turing', 'Garry Kasparov'],
                answer: 'Alan Turing',
            },
            {
                question: 'What 1956 event is considered the official birth of AI as an academic field?',
                options: ['The invention of the first computer', 'The Dartmouth Workshop', 'IBM Deep Blue\'s victory in chess', 'The creation of the internet'],
                answer: 'The Dartmouth Workshop',
            },
            {
                question: 'What were the "AI winters"?',
                options: ['Periods when AI was only used in cold climates', 'A popular AI-themed video game series', 'Periods of reduced funding and interest in AI research', 'The first AI models ever created'],
                answer: 'Periods of reduced funding and interest in AI research',
            },
        ],
    },
    {
        levelId: 'ai-literacy-level-3',
        questions: [
            {
                question: 'Which type of AI can learn from past data to inform future decisions, but only for a specific task?',
                options: ['Reactive Machines', 'Limited Memory AI', 'Theory of Mind AI', 'Self-Aware AI'],
                answer: 'Limited Memory AI',
            },
            {
                question: 'IBM\'s Deep Blue chess program is an example of which type of AI?',
                options: ['Limited Memory AI', 'Theory of Mind AI', 'Self-Aware AI', 'Reactive Machines'],
                answer: 'Reactive Machines',
            },
            {
                question: 'Which two types of AI are still purely theoretical and not a reality today?',
                options: ['Reactive and Limited Memory', 'Limited Memory and Theory of Mind', 'Theory of Mind and Self-Aware', 'Self-Aware and Reactive'],
                answer: 'Theory of Mind and Self-Aware',
            },
        ],
    },
    {
        levelId: 'ai-literacy-level-4',
        questions: [
            {
                question: 'What are the three core components of virtually all AI systems?',
                options: ['Hardware, Software, and Internet', 'Input, Output, and Processing', 'Data, Algorithms, and Models', 'Code, Bugs, and Patches'],
                answer: 'Data, Algorithms, and Models',
            },
            {
                question: 'In the cake baking analogy, what does the "algorithm" represent?',
                options: ['The ingredients', 'The final cake', 'The recipe', 'The oven'],
                answer: 'The recipe',
            },
            {
                question: 'What is the "model" in an AI system?',
                options: ['The raw information the system learns from', 'The set of rules for learning', 'The trained system itself, which is the output of the training process', 'A physical representation of the AI'],
                answer: 'The trained system itself, which is the output of the training process',
            },
        ],
    },
    {
        levelId: 'ai-literacy-level-5',
        questions: [
            {
                question: 'What is the key difference between generative AI and a classification AI?',
                options: ['Generative AI is more accurate.', 'Generative AI can create new, original content.', 'Generative AI is less creative.', 'Classification AI is a newer technology.'],
                answer: 'Generative AI can create new, original content.',
            },
            {
                question: 'How does a large language model (LLM) like GPT generate text?',
                options: ['It copies and pastes from a database of sentences.', 'It predicts the next most probable word based on patterns learned from a massive dataset.', 'It randomly chooses words from a dictionary.', 'It thinks and reasons like a human to write a response.'],
                answer: 'It predicts the next most probable word based on patterns learned from a massive dataset.',
            },
            {
                question: 'What is a major challenge or risk associated with generative AI?',
                options: ['It is too slow to be useful.', 'It can only generate text, not images.', 'Its ability to create realistic but fake content (deepfakes, misinformation).', 'It requires a supercomputer to run.'],
                answer: 'Its ability to create realistic but fake content (deepfakes, misinformation).',
            },
        ],
    },
    {
        levelId: 'ai-literacy-level-6',
        questions: [
            {
                question: 'Which level of AI capability describes the AI we use today, which is designed for specific tasks?',
                options: ['General AI', 'Superintelligence', 'Narrow AI (Weak AI)', 'Sentient AI'],
                answer: 'Narrow AI (Weak AI)',
            },
            {
                question: 'What is the defining characteristic of General AI (Strong AI)?',
                options: ['It is better than a human at one specific task.', 'It could understand, learn, and apply intelligence to any intellectual task, just like a human.', 'It has emotions and feelings.', 'It is the same as a superintelligence.'],
                answer: 'It could understand, learn, and apply intelligence to any intellectual task, just like a human.',
            },
            {
                question: 'What is the main ethical concern associated with the concept of Superintelligence?',
                options: ['It will be too expensive to create.', 'It will be too slow.', 'Its goals may not be aligned with human goals, posing an existential risk.', 'It will not be as smart as a human.'],
                answer: 'Its goals may not be aligned with human goals, posing an existential risk.',
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
                question: 'What type of AI is used in a navigation app to suggest the fastest route by analyzing traffic data?',
                options: ['Computer Vision', 'Natural Language Processing', 'Machine Learning', 'Generative AI'],
                answer: 'Machine Learning',
            },
            {
                question: 'How does an AI-powered email spam filter work?',
                options: ['It reads all your emails and decides if they are interesting.', 'It blocks all emails from unknown senders.', 'It uses machine learning to identify patterns in messages that are characteristic of junk mail.', 'It uses a simple list of forbidden words.'],
                answer: 'It uses machine learning to identify patterns in messages that are characteristic of junk mail.',
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
                question: 'Which of the following is a real-world application of Computer Vision?',
                options: ['Facial recognition', 'Self-driving cars', 'Medical imaging analysis', 'All of the above'],
                answer: 'All of the above',
            },
        ],
    },
    {
        levelId: 'ai-literacy-level-10',
        questions: [
            {
                question: 'Why is data considered the most critical component of an AI system?',
                options: ['Because it is easy to collect', 'A model is only as good as the data it\'s trained on', 'Because it is not as important as the algorithm', 'Because it is not as important as the model'],
                answer: 'A model is only as good as the data it\'s trained on',
            },
            {
                question: 'What is the concept of "Big Data"?',
                options: ['The massive datasets that have become available in the digital age', 'The a dataset that is too big to fit on a single computer', 'The a dataset that is too big to be analyzed by a human', 'All of the above'],
                answer: 'The massive datasets that have become available in the digital age',
            },
            {
                question: 'Why is it important for an AI dataset to be unbiased?',
                options: ['Because a biased dataset can lead to a biased model', 'Because a biased dataset is more expensive to collect', 'Because a biased dataset is more difficult to analyze', 'All of the above'],
                answer: 'Because a biased dataset can lead to a biased model',
            },
        ],
    },
]
