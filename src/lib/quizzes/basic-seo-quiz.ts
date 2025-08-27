
import type { LevelQuiz } from './index';

export const basicSeoQuiz: LevelQuiz[] = [
    {
        levelId: 'seo-level-1',
        questions: [
            {
                question: 'What does SEO stand for?',
                options: ['Search Engine Operation', 'Social Engagement Optimization', 'Search Engine Optimization', 'Site Engine Output'],
                answer: 'Search Engine Optimization',
            },
            {
                question: 'What is the primary goal of SEO?',
                options: ['To get as many social media followers as possible', 'To increase the quantity and quality of traffic through paid ads', 'To increase the quantity and quality of traffic through organic search engine results', 'To make a website look more colorful'],
                answer: 'To increase the quantity and quality of traffic through organic search engine results',
            },
            {
                question: 'Why is SEO considered a long-term investment?',
                options: ['Because it costs a lot of money', 'Because it provides quick, temporary results', 'Because it builds a sustainable, long-term asset that provides consistent traffic', 'Because it takes years to learn'],
                answer: 'Because it builds a sustainable, long-term asset that provides consistent traffic',
            },
        ],
    },
    {
        levelId: 'seo-level-2',
        questions: [
            {
                question: 'What are the three core stages of how a search engine works?',
                options: ['Searching, Clicking, Ranking', 'Typing, Searching, Loading', 'Crawling, Indexing, Ranking', 'Linking, Sharing, Commenting'],
                answer: 'Crawling, Indexing, Ranking',
            },
            {
                question: 'What is a "crawler" or "spider" in the context of SEO?',
                options: ['A type of computer virus', 'A person who manually reviews websites', 'An automated program used by search engines to discover web pages', 'A tool for checking website speed'],
                answer: 'An automated program used by search engines to discover web pages',
            },
            {
                question: 'What is the "index" of a search engine?',
                options: ['The first page of search results', 'A list of all the keywords a website ranks for', 'A massive database where the search engine stores all the web pages it has crawled', 'A website\'s table of contents'],
                answer: 'A massive database where the search engine stores all the web pages it has crawled',
            },
        ],
    },
    {
        levelId: 'seo-level-3',
        questions: [
            {
                question: 'What is a "keyword" in SEO?',
                options: ['A password for your website', 'The word or phrase a user types into a search engine', 'A tag used in social media posts', 'The name of your company'],
                answer: 'The word or phrase a user types into a search engine',
            },
            {
                question: 'What is "search intent"?',
                options: ['The search engine\'s intention to rank your page', 'The user\'s intention to buy a product', 'The reason or "why" behind a search query', 'The number of times a keyword is searched'],
                answer: 'The reason or "why" behind a search query',
            },
            {
                question: 'Which of the following is an example of "transactional" search intent?',
                options: ['"how to bake a cake"', '"buy running shoes"', '"what is the capital of France"', '"Facebook login"'],
                answer: '"buy running shoes"',
            },
        ],
    },
    {
        levelId: 'seo-level-4',
        questions: [
            {
                question: 'What does SERP stand for?',
                options: ['Search Engine Ranking Placement', 'Site Engine Results Page', 'Search Engine Results Page', 'Standard Engine Ranking Protocol'],
                answer: 'Search Engine Results Page',
            },
            {
                question: 'What is a "Featured Snippet"?',
                options: ['The first paid ad on the page', 'A box at the top of the organic results that gives a direct answer to a query', 'A review of a website written by Google', 'A link to a video result'],
                answer: 'A box at the top of the organic results that gives a direct answer to a query',
            },
            {
                question: 'What is the difference between organic results and paid ads on a SERP?',
                options: ['There is no difference', 'Organic results are earned through SEO; paid ads are paid for and labeled "Ad"', 'Paid ads are always at the bottom of the page', 'Organic results always include images'],
                answer: 'Organic results are earned through SEO; paid ads are paid for and labeled "Ad"',
            },
        ],
    },
    {
        levelId: 'seo-level-5',
        questions: [
            {
                question: 'What is "White Hat SEO"?',
                options: ['A set of risky SEO tactics that might work short-term', 'The practice of hacking other websites to get links', 'Ethical, long-term strategies that follow search engine guidelines', 'A type of hat worn by SEO professionals'],
                answer: 'Ethical, long-term strategies that follow search engine guidelines',
            },
            {
                question: 'What is a potential consequence of using "Black Hat SEO" tactics?',
                options: ['Guaranteed number one ranking', 'A reward from Google', 'Your website being penalized or completely removed from search results', 'A faster website'],
                answer: 'Your website being penalized or completely removed from search results',
            },
            {
                question: 'Which of the following is an example of a Black Hat SEO tactic?',
                options: ['Creating high-quality content', 'Getting natural links from other sites', 'Keyword stuffing and using hidden text', 'Improving website speed'],
                answer: 'Keyword stuffing and using hidden text',
            },
        ],
    },
    {
        levelId: 'seo-level-6',
        questions: [
            {
                question: 'What does E-E-A-T stand for?',
                options: ['Experience, Expertise, Authority, Trust', 'Engagement, Excellence, Action, Timing', 'Every, Expert, Always, Trusts', 'Easy, Effective, Actionable, True'],
                answer: 'Experience, Expertise, Authority, Trust',
            },
            {
                question: 'Why does Google value the E-E-A-T principle?',
                options: ['It is a new algorithm for ranking pages', 'It helps them evaluate a website\'s quality and trustworthiness', 'It is a way to measure website speed', 'It is only for medical websites'],
                answer: 'It helps them evaluate a website\'s quality and trustworthiness',
            },
            {
                question: 'How can a website demonstrate "Authority"?',
                options: ['By having a lot of pages', 'By using a lot of keywords', 'By getting links and mentions from other authoritative sources', 'By having a fast-loading website'],
                answer: 'By getting links and mentions from other authoritative sources',
            },
        ],
    },
    {
        levelId: 'seo-level-7',
        questions: [
            {
                question: 'What is Google Search Console?',
                options: ['A paid tool for buying Google ads', 'A social media platform for SEOs', 'A free service from Google to monitor your site\'s health and performance in search results', 'A tool for designing websites'],
                answer: 'A free service from Google to monitor your site\'s health and performance in search results',
            },
            {
                question: 'What is one key piece of information you can get from Google Search Console?',
                options: ['The number of social media followers you have', 'Your website\'s domain authority score', 'Which keywords people are using to find your site', 'Your competitors\' rankings'],
                answer: 'Which keywords people are using to find your site',
            },
            {
                question: 'Why is setting up Google Search Console considered a non-negotiable first step in SEO?',
                options: ['It automatically improves your ranking', 'It is the direct line of communication between you and Google', 'It designs your website for you', 'It guarantees you will get backlinks'],
                answer: 'It is the direct line of communication between you and Google',
            },
        ],
    },
    {
        levelId: 'seo-level-8',
        questions: [
            {
                question: 'What is an SEO audit?',
                options: ['A bill you receive from Google', 'A comprehensive review of your website\'s SEO performance', 'A tool that automatically fixes all SEO issues', 'A list of your social media followers'],
                answer: 'A comprehensive review of your website\'s SEO performance',
            },
            {
                question: 'What is the main purpose of conducting an SEO audit?',
                options: ['To see how many visitors your site has', 'To identify problems and opportunities for improvement', 'To redesign your website\'s logo', 'To check your grammar and spelling'],
                answer: 'To identify problems and opportunities for improvement',
            },
            {
                question: 'Which of the following would be examined during a technical SEO audit?',
                options: ['The quality of your blog posts', 'Your social media engagement', 'Whether your site is mobile-friendly and secure', 'The number of products you sell'],
                answer: 'Whether your site is mobile-friendly and secure',
            },
        ],
    },
    {
        levelId: 'seo-level-9',
        questions: [
            {
                question: 'What is a "niche" in the context of SEO and business?',
                options: ['Any website that is very popular', 'A specific, focused area of a larger market', 'A type of keyword', 'A design style for a website'],
                answer: 'A specific, focused area of a larger market',
            },
            {
                question: 'Why is it important to define a target audience?',
                options: ['To make your website more generic', 'To create content that is highly relevant and engaging for a specific group of people', 'To sell ads on your website', 'To use as many keywords as possible'],
                answer: 'To create content that is highly relevant and engaging for a specific group of people',
            },
            {
                question: 'Which is an example of a well-defined niche?',
                options: ['Health', 'Cooking', 'Vegan gluten-free baking for beginners', 'Sports'],
                answer: 'Vegan gluten-free baking for beginners',
            },
        ],
    },
    {
        levelId: 'seo-level-10',
        questions: [
            {
                question: 'Which website platform is generally considered the most SEO-friendly for beginners?',
                options: ['A custom-coded HTML site', 'Wix', 'WordPress', 'Squarespace'],
                answer: 'WordPress',
            },
            {
                question: 'What does having an SSL certificate do for your website?',
                options: ['It makes your website load faster', 'It encrypts data, making your site more secure (indicated by https://)', 'It automatically writes blog posts for you', 'It guarantees a number one ranking'],
                answer: 'It encrypts data, making your site more secure (indicated by https://)',
            },
            {
                question: 'What is "mobile-first indexing"?',
                options: ['A rule that says websites must be designed for mobile phones only', 'Google\'s system of prioritizing the mobile version of a website when crawling and indexing', 'A type of mobile app for SEO', 'A design trend for websites'],
                answer: 'Google\'s system of prioritizing the mobile version of a website when crawling and indexing',
            },
        ],
    },
]
