
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
            {
                question: 'What is the primary goal of Artificial Intelligence as a scientific field?',
                options: ['To replace human jobs', 'To create machines that can perform tasks that normally require human intelligence', 'To build computers that are faster than humans', 'To develop better video games'],
                answer: 'To create machines that can perform tasks that normally require human intelligence',
            },
            {
                question: 'How does a machine learning model "learn"?',
                options: ['By being given a set of rules to follow', 'By identifying patterns in large amounts of data', 'By watching videos of humans performing the task', 'By reading books about the topic'],
                answer: 'By identifying patterns in large amounts of data',
            },
            {
                question: 'What is the key inspiration for the structure of a neural network?',
                options: ['The structure of a computer chip', 'The structure of the human brain', 'The structure of a spider web', 'The structure of a crystal'],
                answer: 'The structure of the human brain',
            },
            {
                question: 'Why is a large amount of data crucial for deep learning models?',
                options: ['It makes the models run faster', 'It allows the models to learn complex and abstract patterns', 'It is a legal requirement for all AI models', 'It makes the models easier to program'],
                answer: 'It allows the models to learn complex and abstract patterns',
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
            {
                question: 'What was the key question Alan Turing sought to answer with his test?',
                options: ['Can machines be creative?', 'Can machines feel emotion?', 'Can machines think?', 'Can machines be more intelligent than humans?'],
                answer: 'Can machines think?',
            },
            {
                question: 'Who coined the term "artificial intelligence"?',
                options: ['Alan Turing', 'John McCarthy', 'Geoffrey Hinton', 'Marvin Minsky'],
                answer: 'John McCarthy',
            },
            {
                question: 'What was a major limitation of early "expert systems"?',
                options: ['They were too fast for computers of the time', 'They struggled with real-world complexities and nuance', 'They were not good at specific, well-defined tasks', 'They required very little data to function'],
                answer: 'They struggled with real-world complexities and nuance',
            },
            {
                question: 'Which of the following was NOT a key factor in the recent AI boom?',
                options: ['The invention of the internet', 'The explosion of Big Data', 'A massive increase in computational power (GPUs)', 'The development of more sophisticated algorithms'],
                answer: 'The invention of the internet',
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
            {
                question: 'What is the main limitation of a Reactive Machine AI?',
                options: ['It is very slow', 'It has no memory of past experiences', 'It can only perform one task', 'It requires a huge amount of data'],
                answer: 'It has no memory of past experiences',
            },

            {
                question: 'What is the defining characteristic of a "Theory of Mind" AI?',
                options: ['It can understand human emotions and intentions', 'It can store memories for a long time', 'It can become self-aware', 'It is better at chess than a human'],
                answer: 'It can understand human emotions and intentions',
            },
            {
                question: 'A conversational chatbot that remembers the current conversation but not past ones is an example of which type of AI?',
                options: ['Reactive Machine', 'Limited Memory AI', 'Theory of Mind AI', 'Self-Aware AI'],
                answer: 'Limited Memory AI',
            },
            {
                question: 'What is the ultimate, most advanced type of AI in the proposed framework?',
                options: ['Reactive AI', 'Limited Memory AI', 'Theory of Mind AI', 'Self-Aware AI'],
                answer: 'Self-Aware AI',
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
            {
                question: 'What is the most important component of an AI system?',
                options: ['Data', 'Algorithm', 'Model', 'Hardware'],
                answer: 'Data',
            },
            {
                question: 'What is the primary role of the algorithm in an AI system?',
                options: ['To store the data', 'To guide the learning process by finding patterns', 'To provide the final output', 'To connect to the internet'],
                answer: 'To guide the learning process by finding patterns',
            },
            {
                question: 'When you use a pre-trained AI chatbot, what are you interacting with?',
                options: ['The raw data', 'The algorithm', 'The model', 'The source code'],
                answer: 'The model',
            },
            {
                question: 'What is the relationship between the model and the algorithm?',
                options: ['They are the same thing', 'The algorithm is a part of the model', 'The model is the output of the algorithm learning from data', 'The model trains the algorithm'],
                answer: 'The model is the output of the algorithm learning from data',
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
            {
                question: 'Which of the following is an example of generative AI?',
                options: ['A spam filter', 'A recommendation engine', 'An image generator like DALL-E', 'A navigation app'],
                answer: 'An image generator like DALL-E',
            },
            {
                question: 'What does "LLM" stand for?',
                options: ['Large Learning Machine', 'Long Language Model', 'Large Language Model', 'Logical Learning Machine'],
                answer: 'Large Language Model',
            },
            {
                question: 'What is the primary input for training an image generator?',
                options: ['A large dataset of videos', 'A large dataset of text descriptions', 'A large dataset of images and their corresponding text descriptions', 'A large dataset of 3D models'],
                answer: 'A large dataset of images and their corresponding text descriptions',
            },
            {
                question: 'Why is it important to have a critical eye when consuming content from a generative AI?',
                options: ['Because it is always wrong', 'Because it can generate realistic but fake content', 'Because it is always biased', 'Because it is always too formal'],
                answer: 'Because it can generate realistic but fake content',
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
            {
                question: 'Which of the following is an example of Narrow AI?',
                options: ['A chess-playing program', 'A conversational chatbot', 'A spam filter', 'All of the above'],
                answer: 'All of the above',
            },
            {
                question: 'What is the main difference between Narrow AI and General AI?',
                options: ['Narrow AI is more intelligent', 'General AI is designed for a single task', 'Narrow AI is designed for a single task, while General AI could learn any task', 'General AI is what we have today'],
                answer: 'Narrow AI is designed for a single task, while General AI could learn any task',
            },
            {
                question: 'What is the main characteristic of a superintelligence?',
                options: ['It is as smart as a human', 'It is slightly smarter than a human', 'It far surpasses human intellect in virtually every field', 'It is a human who is very good at using AI'],
                answer: 'It far surpasses human intellect in virtually every field',
            },
            {
                question: 'Which of the three levels of AI is currently purely theoretical?',
                options: ['Narrow AI', 'General AI and Superintelligence', 'Only Superintelligence', 'None of them are theoretical'],
                answer: 'General AI and Superintelligence',
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
            {
                question: 'What type of AI is used in facial recognition on a smartphone?',
                options: ['Computer Vision', 'Natural Language Processing', 'Machine Learning', 'Generative AI'],
                answer: 'Computer Vision',
            },
            {
                question: 'What is the primary goal of a recommendation engine?',
                options: ['To show you content you have already seen', 'To predict what content you might like based on your past behavior', 'To show you the most popular content on the platform', 'To show you a random selection of content'],
                answer: 'To predict what content you might like based on your past behavior',
            },
            {
                question: 'What type of AI is used in a translation app?',
                options: ['Computer Vision', 'Natural Language Processing', 'Machine Learning', 'Generative AI'],
                answer: 'Natural Language Processing',
            },
            {
                question: 'What is one benefit of using AI in the financial sector?',
                options: ['To make stock market predictions with 100% accuracy', 'To detect fraudulent transactions', 'To provide loans to everyone who applies', 'To replace all human bank tellers'],
                answer: 'To detect fraudulent transactions',
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
                answer: 'All of a a/>