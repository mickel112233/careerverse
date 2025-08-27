
import type { LevelQuiz } from './index';

export const promptEngineeringQuiz: LevelQuiz[] = [
    {
        levelId: 'prompt-engineering-level-1',
        questions: [
            {
                question: 'What is the core concept of prompt engineering?',
                options: ['Writing code for AI models', 'The art and science of crafting instructions to get the best output from an AI', 'A type of search engine query', 'A method for training AI models'],
                answer: 'The art and science of crafting instructions to get the best output from an AI',
            },
            {
                question: 'Why is a vague prompt like "tell me a story" often ineffective?',
                options: ['The AI does not understand the word "story"', 'It gives the AI too many possibilities, leading to a generic response', 'It requires a Canva Pro subscription', 'The AI can only answer questions'],
                answer: 'It gives the AI too many possibilities, leading to a generic response',
            },
            {
                question: 'A great prompt is compared to what in the lesson?',
                options: ['A simple question', 'A magic wand', 'A detailed recipe for a chef', 'A search query'],
                answer: 'A detailed recipe for a chef',
            },
        ],
    },
    {
        levelId: 'prompt-engineering-level-2',
        questions: [
            {
                question: 'Which of the following is NOT a key component of an effective prompt?',
                options: ['Instruction', 'Context', 'File Size', 'Persona'],
                answer: 'File Size',
            },
            {
                question: 'What is the "Persona" component of a prompt?',
                options: ['The user\'s name', 'The AI model\'s version number', 'A role you assign to the AI, like "Act as a seasoned historian"', 'The desired length of the response'],
                answer: 'A role you assign to the AI, like "Act as a seasoned historian"',
            },
            {
                question: 'What does the "Format" component of a prompt dictate?',
                options: ['The emotional tone of the output', 'The structure of the output, like a list or table', 'The language of the output', 'The speed of the response'],
                answer: 'The structure of the output, like a list or table',
            },
        ],
    },
    {
        levelId: 'prompt-engineering-level-3',
        questions: [
            {
                question: 'How does prompting for an LLM (like GPT) differ from prompting for an image generator (like DALL-E)?',
                options: ['There is no difference', 'LLMs respond to visual descriptions, while image generators respond to conversational tasks', 'LLMs are instruction-based and conceptual, while image generators are focused on visual keywords and styles', 'Image generators are better at writing code'],
                answer: 'LLMs are instruction-based and conceptual, while image generators are focused on visual keywords and styles',
            },
            {
                question: 'Which prompt is better suited for an image generator?',
                options: ['Explain the theory of relativity', 'A photorealistic image of a vintage red car on a misty street', 'Summarize this article in five bullet points', 'Write a marketing email'],
                answer: 'A photorealistic image of a vintage red car on a misty street',
            },
            {
                question: 'A prompt for an LLM is more like a(n) ______, while a prompt for an image generator is like a(n) _____.',
                options: ['painting, song', 'recipe, blueprint', 'script, art director\'s brief', 'photograph, essay'],
                answer: 'script, art director\'s brief',
            },
        ],
    },
    {
        levelId: 'prompt-engineering-level-4',
        questions: [
            {
                question: 'Why should you avoid vague prompts?',
                options: ['They use too much data', 'They lead to generic, middle-of-the-road responses', 'They are more expensive to run', 'They are not understood by the AI'],
                answer: 'They lead to generic, middle-of-the-road responses',
            },
            {
                question: 'What is the benefit of being highly specific in your prompts?',
                options: ['It confuses the AI', 'It guarantees a shorter response', 'It guides the AI to the exact result you have in mind', 'It makes the AI run faster'],
                answer: 'It guides the AI to the exact result you have in mind',
            },
            {
                question: 'Besides telling the AI what you want, what is another important aspect of specificity?',
                options: ['Telling the AI what you don\'t want (negative prompting)', 'Using as many emojis as possible', 'Writing the prompt in all capital letters', 'Keeping the prompt to under 5 words'],
                answer: 'Telling the AI what you don\'t want (negative prompting)',
            },
        ],
    },
    {
        levelId: 'prompt-engineering-level-5',
        questions: [
            {
                question: 'What is "iterative prompting"?',
                options: ['A technique to get the AI to write a story', 'The process of refining and improving your prompts based on the AI\'s output', 'A method for generating images', 'Asking the AI the same question multiple times'],
                answer: 'The process of refining and improving your prompts based on the AI\'s output',
            },
            {
                question: 'If an AI\'s first response is close but not quite right, what should you do?',
                options: ['Start a new conversation from scratch', 'Assume the AI cannot do the task', 'Build on the conversation by providing feedback and new instructions', 'Ask the question in a different language'],
                answer: 'Build on the conversation by providing feedback and new instructions',
            },
            {
                question: 'Why is iterative prompting compared to a conversation?',
                options: ['Because it is always spoken out loud', 'Because it involves a back-and-forth refinement to reach the best outcome', 'Because it only works for chatbots', 'Because it requires two people'],
                answer: 'Because it involves a back-and-forth refinement to reach the best outcome',
            },
        ],
    },
    {
        levelId: 'prompt-engineering-level-6',
        questions: [
            {
                question: 'What is "zero-shot prompting"?',
                options: ['Giving the AI a task with many examples', 'Giving the AI a task without any examples', 'A prompt that gets zero results', 'A technique only for image generation'],
                answer: 'Giving the AI a task without any examples',
            },
            {
                question: 'What is "few-shot prompting"?',
                options: ['Giving the AI a task with a few input-output examples to guide it', 'A prompt with very few words', 'Asking the AI to take a few shots at guessing the answer', 'A technique that rarely works'],
                answer: 'Giving the AI a task with a few input-output examples to guide it',
            },
            {
                question: 'When is few-shot prompting most useful?',
                options: ['For simple, straightforward tasks', 'For complex tasks or when a very specific output format is needed', 'When you are in a hurry', 'When the AI model is offline'],
                answer: 'For complex tasks or when a very specific output format is needed',
            },
        ],
    },
    {
        levelId: 'prompt-engineering-level-7',
        questions: [
            {
                question: 'How can you instruct an AI to adopt a specific writing style?',
                options: ['You can\'t, the AI has a fixed style', 'By using descriptive adjectives and providing examples of the desired style', 'By paying for a premium subscription', 'By writing the prompt in the desired style yourself'],
                answer: 'By using descriptive adjectives and providing examples of the desired style',
            },
            {
                question: 'Which prompt is more likely to generate a high-quality, stylized response?',
                options: ['Write a poem', 'Write a romantic poem about the moon in the style of a 19th-century poet', 'Give me a poem', 'Poem about the moon'],
                answer: 'Write a romantic poem about the moon in the style of a 19th-century poet',
            },
            {
                question: 'Why is specifying a tone like "formal and authoritative" useful?',
                options: ['It makes the AI\'s response longer', 'It helps the AI generate content that is appropriate for a specific audience or purpose', 'It is a requirement for all prompts', 'It slows down the AI\'s processing time'],
                answer: 'It helps the AI generate content that is appropriate for a specific audience or purpose',
            },
        ],
    },
    {
        levelId: 'prompt-engineering-level-8',
        questions: [
            {
                question: 'What is the key distinction between a basic search query and a well-engineered prompt?',
                options: ['There is no distinction', 'A query requests information (links), while a prompt requests a specific action and a finished output', 'A prompt is shorter than a query', 'Queries only work on Google, while prompts only work on AI models'],
                answer: 'A query requests information (links), while a prompt requests a specific action and a finished output',
            },
            {
                question: 'Which of the following is an example of a well-engineered prompt, not a basic query?',
                options: ['best restaurants Paris', 'history of Rome', 'Act as a local Parisian foodie. List the top 5 must-try restaurants in Paris, including their price range.', 'weather today'],
                answer: 'Act as a local Parisian foodie. List the top 5 must-try restaurants in Paris, including their price range.',
            },
            {
                question: 'Prompting turns the user from a passive consumer of information into a(n)...',
                options: ['programmer', 'AI model', 'active co-creator', 'search engine'],
                answer: 'active co-creator',
            },
        ],
    },
    {
        levelId: 'prompt-engineering-level-9',
        questions: [
            {
                question: 'Is it effective to use the exact same prompt for all different AI models (e.g., GPT-4, Claude, Mistral)?',
                options: ['Yes, all models work identically', 'No, tailoring prompts to a specific model\'s strengths can improve results', 'Yes, it saves time', 'No, prompts are not transferable between models at all'],
                answer: 'No, tailoring prompts to a specific model\'s strengths can improve results',
            },
            {
                question: 'Which type of model is known for its ability to handle very long documents and maintain context?',
                options: ['GPT-4', 'Claude 3 models', 'Mistral AI models', 'All models are the same in this regard'],
                answer: 'Claude 3 models',
            },
            {
                question: 'Models like GPT-4 are particularly strong at what kind of tasks?',
                options: ['Quick, simple questions', 'Complex reasoning and multi-step instructions', 'Only generating images', 'Translating between languages only'],
                answer: 'Complex reasoning and multi-step instructions',
            },
        ],
    },
    {
        levelId: 'prompt-engineering-level-10',
        questions: [
            {
                question: 'What is the core idea behind Chain-of-Thought (CoT) prompting?',
                options: ['To ask the AI a chain of questions', 'To instruct the AI to show its reasoning process step-by-step before giving the final answer', 'To link multiple AI models together', 'A prompt that is very long'],
                answer: 'To instruct the AI to show its reasoning process step-by-step before giving the final answer',
            },
            {
                question: 'What magic phrase is often used to trigger a Chain-of-Thought response?',
                options: ['"Tell me a story"', '"Please be accurate"', '"Let\'s think step by step"', '"Show me the answer"'],
                answer: '"Let\'s think step by step"',
            },
            {
                question: 'CoT prompting is most effective for which type of tasks?',
                options: ['Simple, factual questions', 'Generating creative poetry', 'Complex reasoning tasks like multi-step math problems', 'Summarizing short texts'],
                answer: 'Complex reasoning tasks like multi-step math problems',
            },
        ],
    },
]
