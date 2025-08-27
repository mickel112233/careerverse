
import type { LevelQuiz } from './index';

export const digitalProductCreationQuiz: LevelQuiz[] = [
    {
        levelId: 'dpc-level-1',
        questions: [
            {
                question: 'What is a key characteristic that distinguishes a digital product from a physical one?',
                options: ['It is always free', 'It is an intangible good that can be infinitely replicated and delivered digitally', 'It requires a physical store to be sold', 'It is more expensive to produce'],
                answer: 'It is an intangible good that can be infinitely replicated and delivered digitally',
            },
            {
                question: 'Which of the following is an example of a Software as a Service (SaaS) product?',
                options: ['An ebook', 'A project management tool like Asana', 'A stock photo', 'A physical book'],
                answer: 'A project management tool like Asana',
            },
            {
                question: 'Why is it important to understand the digital ecosystem (e.g., app stores, cloud services)?',
                options: ['It is not important; a product exists on its own', 'Because a successful product must integrate seamlessly into this web of technologies', 'To know how to build your own cloud service', 'To get a discount on advertising'],
                answer: 'Because a successful product must integrate seamlessly into this web of technologies',
            },
        ],
    },
    {
        levelId: 'dpc-level-2',
        questions: [
            {
                question: 'According to the lesson, a great digital product starts with what?',
                options: ['A great idea', 'A great name', 'A great problem', 'A great marketing plan'],
                answer: 'A great problem',
            },
            {
                question: 'What is the main purpose of "validating" a problem?',
                options: ['To prove that your idea is the best', 'To confirm that the problem is real and people are willing to pay for a solution', 'To get funding from investors', 'To design the user interface'],
                answer: 'To confirm that the problem is real and people are willing to pay for a solution',
            },
            {
                question: 'Which question is better for validating a problem with a potential user?',
                options: ['"Would you pay $10 for this app?"', '"Do you like my idea?"', '"Tell me about the last time you struggled with this issue."', '"Is this a good solution?"'],
                answer: '"Tell me about the last time you struggled with this issue."',
            },
        ],
    },
    {
        levelId: 'dpc-level-3',
        questions: [
            {
                question: 'What is the core feedback loop of the Lean Startup methodology?',
                options: ['Design, Develop, Deploy', 'Plan, Execute, Review', 'Build, Measure, Learn', 'Ideate, Validate, Scale'],
                answer: 'Build, Measure, Learn',
            },
            {
                question: 'What is a Minimum Viable Product (MVP)?',
                options: ['A fully-featured, perfect product', 'A product with the most features possible', 'The version of a product that allows for maximum validated learning with the least effort', 'A marketing prototype'],
                answer: 'The version of a product that allows for maximum validated learning with the least effort',
            },
            {
                question: 'What does it mean to "pivot" in the Lean Startup methodology?',
                options: ['To double down on the current strategy', 'To change strategy after learning that your initial hypothesis was wrong', 'To launch the product to a new market', 'To hire a new team'],
                answer: 'To change strategy after learning that your initial hypothesis was wrong',
            },
        ],
    },
    {
        levelId: 'dpc-level-4',
        questions: [
            {
                question: 'What is the primary goal of competitive analysis?',
                options: ['To copy your competitor\'s features exactly', 'To identify your competitors and evaluate their strengths and weaknesses', 'To prove your product is better', 'To find out how much money your competitors are making'],
                answer: 'To identify your competitors and evaluate their strengths and weaknesses',
            },
            {
                question: 'What is a Unique Selling Proposition (USP)?',
                options: ['A standard pricing model', 'The one thing that makes your product different and better than competitors', 'A list of your product\'s features', 'A marketing slogan'],
                answer: 'The one thing that makes your product different and better than competitors',
            },
            {
                question: 'A project management tool like Asana and a simple to-do list app like Apple Reminders are examples of what?',
                options: ['Direct competitors', 'Indirect competitors', 'They are not competitors', 'Partners'],
                answer: 'Indirect competitors',
            },
        ],
    },
    {
        levelId: 'dpc-level-5',
        questions: [
            {
                question: 'What is the main difference between a target audience and a user persona?',
                options: ['There is no difference', 'A target audience is broad, while a user persona is a detailed, fictional character representing an ideal customer', 'A target audience is for marketing, a persona is for design', 'A persona is a real person, a target audience is a group'],
                answer: 'A target audience is broad, while a user persona is a detailed, fictional character representing an ideal customer',
            },
            {
                question: 'Which of the following is an example of psychographic data?',
                options: ['Age and gender', 'Location and income', 'Personality traits, values, and interests', 'Education level'],
                answer: 'Personality traits, values, and interests',
            },
            {
                question: 'How can a user persona help a product team make better decisions?',
                options: ['It guarantees the product will be profitable', 'It helps the team empathize with users and evaluate features from the user\'s perspective', 'It replaces the need for market research', 'It provides a list of all potential features'],
                answer: 'It helps the team empathize with users and evaluate features from the user\'s perspective',
            },
        ],
    },
    {
        levelId: 'dpc-level-6',
        questions: [
            {
                question: 'What is the main purpose of the Business Model Canvas?',
                options: ['To design the user interface of a product', 'To write the code for an application', 'To visualize and define a business model on a single page', 'To create a marketing campaign'],
                answer: 'To visualize and define a business model on a single page',
            },
            {
                question: 'Which of the following is one of the nine blocks of the Business Model Canvas?',
                options: ['User Interface', 'Value Propositions', 'Marketing Slogans', 'Software Architecture'],
                answer: 'Value Propositions',
            },
            {
                question: 'Why is the Business Model Canvas considered a "living document"?',
                options: ['Because it is printed on special paper', 'Because it should be updated as the business evolves', 'Because it is only for live-streaming businesses', 'Because it can only be edited by one person'],
                answer: 'Because it should be updated as the business evolves',
            },
        ],
    },
    {
        levelId: 'dpc-level-7',
        questions: [
            {
                question: 'What is the format of a user story?',
                options: ['A detailed technical specification', '"As a [user type], I want to [goal], so that I can [benefit]."', 'A list of all the features a product must have', 'A bug report from a user'],
                answer: '"As a [user type], I want to [goal], so that I can [benefit]."',
            },
            {
                question: 'What is the purpose of feature prioritization?',
                options: ['To build every feature the team can think of', 'To decide which features to build first to deliver the most value', 'To let the developers choose what to build', 'To make the product as complex as possible'],
                answer: 'To decide which features to build first to deliver the most value',
            },
            {
                question: 'What does the MoSCoW method help you do?',
                options: ['Design the user interface', 'Classify features into categories like Must have, Should have, and Could have', 'Calculate the cost of a feature', 'Write marketing copy'],
                answer: 'Classify features into categories like Must have, Should have, and Could have',
            },
        ],
    },
    {
        levelId: 'dpc-level-8',
        questions: [
            {
                question: 'What is a Product Requirements Document (PRD)?',
                options: ['A marketing brochure for the product', 'The technical code for the product', 'A document that defines the purpose, features, and functionality of a product', 'A user manual for the customer'],
                answer: 'A document that defines the purpose, features, and functionality of a product',
            },
            {
                question: 'Who is the primary audience for a PRD?',
                options: ['Only the CEO', 'Only the customers', 'The entire team, including product managers, developers, and designers', 'Only the investors'],
                answer: 'The entire team, including product managers, developers, and designers',
            },
            {
                question: 'Which of the following is a key component of a PRD?',
                options: ['The final color palette', 'User Stories', 'The marketing budget', 'A list of competitors\' employees'],
                answer: 'User Stories',
            },
        ],
    },
    {
        levelId: 'dpc-level-9',
        questions: [
            {
                question: 'What is the primary goal of a Minimum Viable Product (MVP)?',
                options: ['To launch a perfect, bug-free product', 'To include as many features as possible', 'To get a product to users quickly to get feedback and validate a hypothesis', 'To make the product as beautiful as possible'],
                answer: 'To get a product to users quickly to get feedback and validate a hypothesis',
            },
            {
                question: 'What is the primary goal of a Minimum Lovable Product (MLP)?',
                options: ['To test a single feature', 'To get a product to users and make them happy with a delightful experience', 'To be the cheapest version of the product', 'To be functional but not enjoyable to use'],
                answer: 'To get a product to users and make them happy with a delightful experience',
            },
            {
                question: 'When should you choose to build an MVP over an MLP?',
                options: ['When you want to make users happy from day one', 'When your primary goal is to get feedback and validate an idea as quickly as possible', 'When you have a large budget', 'Never, you should always build an MLP'],
                answer: 'When your primary goal is to get feedback and validate an idea as quickly as possible',
            },
        ],
    },
    {
        levelId: 'dpc-level-10',
        questions: [
            {
                question: 'What are the four stages of the product lifecycle?',
                options: ['Design, Development, Testing, Launch', 'Introduction, Growth, Maturity, Decline', 'Ideation, Validation, Scaling, Sunset', 'Alpha, Beta, Release, Maintenance'],
                answer: 'Introduction, Growth, Maturity, Decline',
            },
            {
                question: 'What is the main goal during the "Growth" stage of the product lifecycle?',
                options: ['To launch the product', 'To get a lot of users and build a strong user base', 'To find new ways to make money', 'To sunset the product'],
                answer: 'To get a lot of users and build a strong user base',
            },
            {
                question: 'In which stage does a product\'s user growth start to slow down?',
                options: ['Introduction', 'Growth', 'Maturity', 'Decline'],
                answer: 'Maturity',
            },
        ],
    },
]
