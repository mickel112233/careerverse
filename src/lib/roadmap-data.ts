
import { Code, Palette, Megaphone, BrainCircuit, Bot, Gamepad2, PenSquare, Briefcase, Handshake, Cloud, ClipboardList, Rocket, Tv, Sparkles } from 'lucide-react';

export interface RoadmapLevel {
    id: string;
    title: string;
    description: string;
    xp: number;
    coins: number;
    content?: string;
};

export interface Roadmap {
    streamName: string;
    levels: RoadmapLevel[];
}

export const allStreams = [
    { name: 'Canva Design', icon: Palette, category: 'creativity' },
    { name: 'ChatGPT Prompt Engineering', icon: Bot, category: 'technical' },
    { name: 'Social Media Management', icon: Megaphone, category: 'social' },
    { name: 'Reels & Shorts Video Editing', icon: Tv, category: 'creativity' },
    { name: 'Basic SEO', icon: BrainCircuit, category: 'technical' },
    { name: 'Affiliate Marketing', icon: Handshake, category: 'social' },
    { name: 'Copywriting', icon: PenSquare, category: 'creativity' },
    { name: 'Resume & LinkedIn Optimization', icon: Briefcase, category: 'social' },
    { name: 'Digital Product Creation', icon: Sparkles, category: 'leadership' },
    { name: 'AI Literacy', icon: Rocket, category: 'logic' }
];

const promptEngineeringRoadmap: Roadmap = {
    streamName: 'ChatGPT Prompt Engineering',
    levels: [
        {
            "id": "prompt-engineering-level-1",
            "title": "The New Language of AI: What is Prompt Engineering?",
            "description": "Learn the art of talking to machines to get the best possible output from generative AI.",
            "xp": 100,
            "coins": 10,
            "content": "<h3>The New Language of AI: What is Prompt Engineering?</h3><p>Welcome to the fascinating world of prompt engineering, the surprisingly human art of talking to machines. Think of it this way: you have a super-intelligent, incredibly knowledgeable genie in a bottle (your AI), but it's also a bit of a literalist. If you ask it to \"tell me a story,\" you might get a two-sentence narrative about a rock. However, if you prompt it with, \"Act as a seasoned fantasy author. Write a compelling, 1,000-word short story about a brave knight on a quest to find a lost magical sword, including dialogue and vivid descriptions of the setting,\" you get a masterpiece. Prompt engineering is the \"art and science\" of crafting these instructions to get the best possible output from a generative AI model. It’s the difference between a simple query and a well-defined command.</p><p>It’s about understanding the AI's \"mind\" — its capabilities, its limitations, and how it processes language. It's not just about what you say, but how you say it. A great prompt is like a detailed recipe for a world-class chef; it provides the ingredients, the instructions, and the desired outcome, ensuring the final dish is exactly what you envisioned. This is a crucial skill because even the most powerful AI models are only as good as the input they receive. By mastering prompt engineering, you become the conductor of an AI orchestra, capable of creating symphonies of text, code, or images, rather than just random noise.</p>"
        },
        {
            "id": "prompt-engineering-level-2",
            "title": "The Anatomy of a Prompt: Breaking It Down",
            "description": "Understand the key components of an effective prompt: Instruction, Context, Persona, and Format.",
            "xp": 107,
            "coins": 11,
            "content": "<h3>The Anatomy of a Prompt: Breaking It Down</h3><p>A well-engineered prompt is not a single sentence; it's a carefully structured set of components, much like the ingredients for a complex meal. While you can get by with a single phrase, adding a little structure can elevate your results from \"passable\" to \"perfect.\" The key components of an effective prompt are: the Instruction, the Context, the Persona, and the Format. The Instruction is the command itself—the verb that tells the AI what to do, like \"write,\" \"summarize,\" or \"generate.\" This is the non-negotiable part of every prompt. Without it, the AI is just guessing.</p><p>The Context provides all the background information the AI needs to understand the task. This is where you can specify details, constraints, and relevant information. For example, if you're writing a marketing email, the context would include who the email is for, what you’re selling, and the key selling points. The Persona is an optional but powerful component where you tell the AI what role to adopt, such as \"Act as a seasoned historian\" or \"You are a witty copywriter.\" This immediately sets the tone and voice. Finally, the Format dictates the structure of the output, such as \"Write in bullet points,\" \"Create a table,\" or \"Provide a five-paragraph essay.\" By combining these elements, you're not just asking a question; you're building a complete blueprint for the perfect response, which is crucial for achieving consistent and high-quality results.</p>"
        },
        {
            "id": "prompt-engineering-level-3",
            "title": "Prompting for LLMs vs. Image Generators: A Tale of Two AIs",
            "description": "Learn the crucial differences between prompting for text-based and image-based AI models.",
            "xp": 114,
            "coins": 12,
            "content": "<h3>Prompting for LLMs vs. Image Generators: A Tale of Two AIs</h3><p>Here’s where we get to the core difference that trips up many beginners: the language of prompts is not universal. Think of it like talking to a musician versus a painter. While both are creative, they respond to different instructions. Large Language Models (LLMs) like GPT are conversational and conceptual. They understand a prompt that says, “Explain quantum physics in a simple, conversational tone for a ten-year-old.” They grasp the nuance of \"conversational tone\" and the complexity of the subject matter. Their prompts are often narrative and instruction-based, focusing on tasks like summarization, reasoning, and text generation. You're giving them a script and a persona, and they perform.</p><p>In contrast, image generators like DALL-E and Midjourney are all about visual description. They don't care about a \"conversational tone\" but thrive on visual keywords. Their prompts are like an art director's brief. Instead of an essay prompt, you’d provide a prompt like, \"a photorealistic image of a vintage red car parked on a misty street in Tokyo, cinematic lighting, high-resolution.\" These tools are looking for details on subject, style, lighting, color, and mood. The most successful image prompts are a list of visual adjectives and nouns, often with technical parameters added at the end (e.g., aspect ratios). This fundamental difference in how they interpret prompts is a key lesson. A prompt that works for one AI will often fail spectacularly on the other. It’s not about the prompt being right or wrong, but about it being designed for the right audience.</p>"
        },
        {
            "id": "prompt-engineering-level-4",
            "title": "The Importance of Clarity and Specificity",
            "description": "Discover why vague prompts lead to generic outputs and how to be specific for better results.",
            "xp": 121,
            "coins": 13,
            "content": "<h3>The Importance of Clarity and Specificity</h3><p>If you've ever asked an AI for \"a car\" and gotten a generic, boring sedan, you've experienced the consequences of a vague prompt. AI models are powerful, but they are not mind readers. They operate on the principle of probability, and a vague prompt gives them a million different options, leading to a bland, middle-of-the-road response. The solution is simple: Be clear and be specific. A specific prompt is like a detailed map, guiding the AI to the exact destination you have in mind. Instead of \"a car,\" try \"a glossy, deep-blue 1968 Ford Mustang GT, parked in a bustling city at night, with rain on the windshield.\" This gives the AI all the information it needs to produce a high-quality, targeted result.</p><p>Specificity isn’t just about adding more words; it’s about providing meaningful details. It’s about being explicit with what you want and, just as importantly, what you don’t want. If you want a concise answer, tell it to \"summarize in three bullet points.\" If you want it to avoid a certain topic, use a negative prompt (which we'll cover later). The more specific you are, the less the AI has to \"fill in the blanks\" with generic information. Think of your prompt as a contract with the AI: the more detailed the terms, the more likely you are to get exactly what you asked for.</p>"
        },
        {
            "id": "prompt-engineering-level-5",
            "title": "Iterative Prompting: The Art of Refinement",
            "description": "Learn how to treat prompting as a conversation, refining your requests for perfect results.",
            "xp": 128,
            "coins": 14,
            "content": "<h3>Iterative Prompting: The Art of Refinement</h3><p>In a perfect world, your first prompt would always generate the perfect response. In reality, prompt engineering is an iterative process. It's a conversation, not a one-and-done command. The first prompt is your starting point, your \"rough draft.\" The real magic happens when you refine and iterate based on the initial output. This is a crucial skill because it saves you from getting stuck in a rut. If the AI's first response is close but not quite right, you don't start over. You simply build on the conversation.</p><p>For example, if you ask an AI to \"write a social media post about our new product,\" and the tone is too formal, your next prompt isn’t \"write a social media post about our new product with a casual tone.\" Instead, you would say, \"The last response was too formal. Make it more casual and add a call to action to visit our website.\" This is the power of iteration. You provide feedback and new instructions directly in the context of the previous conversation. This is especially true for more complex tasks. You can ask the AI to generate an outline, then ask it to expand on a specific section of that outline, and then ask it to rephrase a particular paragraph. This back-and-forth refinement is the key to unlocking truly high-quality results from any AI model, turning a simple tool into a powerful creative partner.</p>"
        },
        {
            "id": "prompt-engineering-level-6",
            "title": "The Concept of Zero-Shot and Few-Shot Prompting",
            "description": "Understand the difference between giving an AI a task with and without examples.",
            "xp": 135,
            "coins": 15,
            "content": "<h3>The Concept of Zero-Shot and Few-Shot Prompting</h3><p>Think of zero-shot prompting as giving a brilliant but completely literal assistant a task without any examples. You simply give it the instruction and expect it to perform based on its pre-existing, vast knowledge. For example, a zero-shot prompt might be, \"Classify this movie review as positive or negative: 'The film was a masterpiece of storytelling and emotion.'\" A high-quality LLM like GPT-4 will understand the task and correctly classify the sentiment without needing a single example. It's a testament to the model's pre-training on a massive amount of data. This technique is best for simple, straightforward tasks where the model's base knowledge is more than sufficient.</p><p>Few-shot prompting, on the other hand, is like giving that same brilliant assistant a few examples to follow before giving them the actual task. This is incredibly powerful for complex tasks or when you need a very specific output format. In a few-shot prompt, you provide a few input-output pairs to guide the model. For instance:</p><p>Example 1:<br>Text: \"I loved the new phone!\"<br>Sentiment: Positive</p><p>Example 2:<br>Text: \"The service was terrible.\"<br>Sentiment: Negative</p><p>Example 3:<br>Text: \"The film was a masterpiece of storytelling and emotion.\"<br>Sentiment:</p><p>By providing these examples, you're not just telling the AI what to do; you're showing it how to do it. The AI then learns the pattern from your examples and applies it to the new input, often with much higher accuracy and in the exact format you want. This is a game-changer for tasks that require nuance, specific formatting, or domain-specific knowledge. Few-shot prompting is a direct way to adapt the AI to your specific needs without needing to retrain it, turning a general-purpose model into a specialized one for your task.</p>"
        },
        {
            "id": "prompt-engineering-level-7",
            "title": "Prompting for Different Tones and Styles",
            "description": "Master the art of instructing an AI to mimic specific writing styles and tones.",
            "xp": 142,
            "coins": 16,
            "content": "<h3>Prompting for Different Tones and Styles</h3><p>A single prompt can produce dramatically different results based on the tone and style you specify. This is where prompt engineering becomes an art form. The AI is a master mimic, and it can adopt virtually any voice or style you instruct it to. This is incredibly useful for marketing, creative writing, or any task that requires a specific feel. To change the tone, you can simply use descriptive adjectives. For example, instead of \"Write a product description,\" try \"Write a product description in a casual and humorous tone.\" Or for a more serious task, \"Explain the legal ramifications of data privacy in a formal and authoritative tone.\"</p><p>The key is to use clear, descriptive language that sets the scene for the AI. You can even combine tones. For instance, \"Write a polite but firm email to a client regarding an overdue payment.\" You can also guide the AI by providing a style guide. \"Write an essay in the style of Ernest Hemingway, using short, declarative sentences and avoiding adverbs.\" The more details you provide, the better the AI will be able to mimic the desired style. This is a crucial skill for anyone who needs to produce consistent content for a brand or a specific audience. It allows you to produce content that is not only correct but also perfectly aligned with the personality you want to convey.</p>"
        },
        {
            "id": "prompt-engineering-level-8",
            "title": "Prompting vs. Basic Querying: A Key Distinction",
            "description": "Learn why a well-engineered prompt is more powerful than a simple search query.",
            "xp": 149,
            "coins": 17,
            "content": "<h3>Prompting vs. Basic Querying: A Key Distinction</h3><p>At first glance, prompting an AI might seem no different from a basic Google search query. You type in a few keywords, hit enter, and get a result. However, this is a dangerous misconception. A basic search query is a request for information. You ask, \"best restaurants in Paris,\" and a search engine gives you a list of links to crawl through. You are the one who does the work of sifting through the results. In contrast, a well-engineered prompt is a request for an action. You are asking the AI to perform a task and give you a structured, complete output, not just a list of links.</p><p>For example, instead of a basic query like \"best restaurants in Paris,\" a prompt would be, \"Act as a local Parisian foodie. List the top 5 must-try restaurants in Paris, including their price range and a brief, one-sentence reason for each recommendation. Format the output as a bulleted list.\" The AI doesn't just give you links; it does the research, organizes the information, and presents it in a usable format. A basic query is about finding information; a prompt is about creating a finished product. This is the fundamental shift in how we interact with AI. We are no longer just passive consumers of information; we are active co-creators who are giving the machine a blueprint for its work.</p>"
        },
        {
            "id": "prompt-engineering-level-9",
            "title": "Introduction to Prompting for Specific AI Models",
            "description": "Discover how to tailor your prompts for different AI models like GPT-4, Claude 3, and Mistral.",
            "xp": 156,
            "coins": 18,
            "content": "<h3>Introduction to Prompting for Specific AI Models</h3><p>Just as different cars handle differently, different AI models have their own unique quirks and strengths. While many prompting principles are universal, tailoring your prompts to a specific model can dramatically improve your results. This is a new and evolving field, but here are some key distinctions to keep in mind.</p><p>Models like GPT-4 are known for their strong reasoning abilities and their ability to follow complex, multi-step instructions. They are great at handling intricate tasks like code generation, complex problem-solving, and in-depth analysis. Prompts for GPT-4 often benefit from a \"Chain of Thought\" approach (which we'll cover later), where you instruct the model to think step-by-step.</p><p>Claude 3 models (like Opus, Sonnet, and Haiku) are known for their long context windows and their ability to handle huge amounts of text. They are particularly good at summarizing long documents, answering questions based on large datasets, and maintaining a coherent persona throughout an extended conversation. Prompts for Claude often leverage its ability to digest large documents, with a simple instruction at the end.</p><p>Mistral AI models are fast, efficient, and often open-source. They are great for quick, specific tasks and for running locally or with limited resources. They are particularly strong in multi-lingual tasks and tend to be more straightforward to prompt.</p><p>The key takeaway is to know your tool. While a general-purpose prompt will work on all of them, a prompt optimized for a specific model can achieve a level of performance that a generic one cannot. As you continue your prompt engineering journey, pay attention to the strengths of each model you use, and you'll find yourself getting better and more consistent results.</p>"
        },
        {
            "id": "prompt-engineering-level-10",
            "title": "The Chain-of-Thought (CoT) Prompting",
            "description": "Learn to instruct the AI to \"think step by step\" to solve complex problems.",
            "xp": 163,
            "coins": 19,
            "content": "<h3>The Chain-of-Thought (CoT) Prompting</h3><p>Have you ever tried to solve a complex math problem or a logic puzzle and realized you couldn't just jump to the answer? You had to show your work, breaking down the problem into smaller, logical steps. That's exactly what Chain-of-Thought (CoT) prompting is all about. It's a technique that instructs the AI to show its reasoning process, step by step, before providing the final answer. This is a monumental leap in prompting because it allows the AI to tackle complex tasks that would otherwise be beyond its reach. Instead of a single, straight-to-the-point command, you add the magic phrase: \"Let's think step by step.\"</p><p>By forcing the AI to process the problem logically, CoT prompting leads to more accurate and reliable outputs for complex tasks like multi-step math problems, reasoning tasks, and complicated programming challenges. It helps the AI avoid rushing to a wrong conclusion. It’s a method for enhancing the AI's reasoning abilities and ensuring that the final answer is not just correct, but a result of sound logic. This method works so well because it mimics human problem-solving, allowing the AI to \"think out loud\" and correct its own errors along the way. It’s a simple but incredibly powerful technique that every prompt engineer must master to get the best results from modern LLMs.</p>"
        },
        {
            "id": "prompt-engineering-level-11",
            "title": "Generated Knowledge Prompting",
            "description": "Ask the AI to generate relevant knowledge first, then use it to answer your question.",
            "xp": 170,
            "coins": 20,
            "content": "<h3>Generated Knowledge Prompting</h3><p>Sometimes an AI needs a little extra information to do its best work. Generated knowledge prompting is a technique where you ask the AI to first generate relevant knowledge or context, and then use that knowledge to answer a question or complete a task. It's like asking the AI to do its own pre-research. This is a powerful method for improving the accuracy of responses to factual questions, especially those that require a specific body of knowledge that might not be readily available in its training data or might be prone to factual errors.</p><p>For example, a traditional prompt might be: \"Answer this medical question based on current research.\" A generated knowledge prompt, on the other hand, would be a two-step process:</p><ol><li>\"First, generate a summary of the latest medical research on [specific medical topic].\"</li><li>\"Second, based on the summary you just generated, answer the following question: [Your question].\"</li></ol><p>This two-step process gives the AI the most relevant and up-to-date information before it attempts to answer the question, drastically reducing the risk of a \"hallucinated\" or outdated response. It also allows you to have more control over the source material and ensures the AI is working with the most relevant information. This technique is especially useful in specialized fields like law, medicine, or scientific research, where accuracy is paramount.</p>"
        },
        {
            "id": "prompt-engineering-level-12",
            "title": "Self-Consistency and Self-Correction",
            "description": "Coach the AI to check its own work for more reliable and accurate outputs.",
            "xp": 177,
            "coins": 21,
            "content": "<h3>Self-Consistency and Self-Correction</h3><p>AI models are not always perfect on their first try, but they can be coached to improve their own answers. Self-consistency is a technique that involves generating multiple outputs for the same prompt and then having the AI select the best one based on a majority vote. Think of it as a quality check. You can ask the AI to generate a response, then ask it to generate two more and pick the most consistent one. This simple act of redundancy can lead to much more reliable outputs, especially for complex reasoning tasks. It's like asking a brilliant person to check their own work multiple times, increasing the probability of a correct answer.</p><p>Self-correction goes a step further. This technique involves asking the AI to critique its own work and correct it. For instance, you could give a prompt and then follow up with, \"Analyze your previous answer for any errors or logical flaws and correct them.\" This forces the AI to act as its own editor, identifying mistakes and improving the final output. The key to successful self-correction is providing a clear framework for evaluation. For example, \"Your response should have been in three parts. Check if it meets this requirement and correct the response to do so.\" This meta-level of prompting allows you to get more refined, higher-quality results with fewer iterations.</p>"
        },
        {
            "id": "prompt-engineering-level-13",
            "title": "The Role of Personas and Roles in Prompts",
            "description": "Unlock specialized knowledge by assigning expert roles to the AI, like 'marketing strategist' or 'therapist'.",
            "xp": 184,
            "coins": 22,
            "content": "<h3>The Role of Personas and Roles in Prompts</h3><p>Giving an AI a persona is one of the most powerful and effective techniques in prompt engineering. It's the difference between asking a general question and getting a general answer versus asking an expert and getting a professional, nuanced response. A persona is a role you assign to the AI, such as \"Act as a seasoned marketing strategist,\" \"You are a witty stand-up comedian,\" or \"Respond as a caring therapist.\" This single instruction sets the tone, style, knowledge base, and even the personality of the AI's response.</p><p>By assigning a persona, you unlock a different level of the AI's capabilities. It allows the model to retrieve and synthesize information in a way that is tailored to that specific role. For example, asking for \"productivity tips\" might get a list of generic advice. But asking, \"Act as a professional life coach. Give me five actionable productivity tips for a busy freelancer,\" will get you a list of tips that are not only relevant but also delivered in a supportive, encouraging tone. Personas are an incredible way to get more human-like, specialized, and contextually appropriate answers. They are a staple of advanced prompting and can be a creative playground for anyone looking to get more out of their AI.</p>"
        },
        {
            "id": "prompt-engineering-level-14",
            "title": "Using 'Negative' or 'Exclusionary' Prompts",
            "description": "Tell the AI what *not* to do, a crucial skill for refining outputs and avoiding unwanted content.",
            "xp": 191,
            "coins": 23,
            "content": "<h3>Using 'Negative' or 'Exclusionary' Prompts</h3><p>Sometimes, telling an AI what you want isn't enough; you also need to tell it what you don't want. This is the purpose of negative or exclusionary prompting. It's a simple yet powerful technique to guide the AI away from undesirable outputs. This is particularly effective with image generators, where a negative prompt can be used to remove unwanted elements like \"ugly, blurry, or low-quality\" from the final image.</p><p>For LLMs, a negative prompt helps enforce constraints. For example, you could write a prompt like, \"Write an article about the benefits of remote work. Do not mention productivity.\" The phrase \"Do not mention\" is a negative prompt that tells the AI to steer clear of a specific topic. This is a crucial skill for content creators who need to avoid certain buzzwords, clichés, or sensitive topics. It gives you a new level of control over the AI's output, preventing it from going off-topic or including information that is irrelevant or even harmful. By mastering both positive (what to include) and negative (what to exclude) prompts, you can create a highly refined and tailored output.</p>"
        },
        {
            "id": "prompt-engineering-level-15",
            "title": "Prompting for Creative Writing and Storytelling",
            "description": "Learn techniques to generate compelling narratives, characters, and dialogue.",
            "xp": 198,
            "coins": 24,
            "content": "<h3>Prompting for Creative Writing and Storytelling</h3><p>AI is not just for factual information; it's a powerful tool for creative writing. By using well-engineered prompts, you can have the AI generate character backstories, plot outlines, and even full short stories. The key is to provide a detailed brief that sets the scene for the AI.</p><p>A prompt for creative writing might be: \"Act as a fantasy author. Write a short story about a young wizard who discovers a magical amulet. The story should include a wise mentor, a challenging obstacle, and a twist ending.\" This gives the AI all the necessary elements to create a compelling narrative. You can also use prompts to brainstorm ideas: \"Generate 10 unique plot ideas for a science fiction story about a robot who develops emotions.\" By using prompts to guide the AI, you can turn a blank page into a creative playground.</p>"
        },
        {
            "id": "prompt-engineering-level-16",
            "title": "Prompting for Marketing and Copywriting",
            "description": "Generate high-converting ad copy, social media posts, and sales emails.",
            "xp": 205,
            "coins": 25,
            "content": "<h3>Prompting for marketing and copywriting</h3><p>In the world of marketing, every word counts. From a snappy ad headline to a persuasive sales email, language is your most powerful tool. Prompt engineering can transform your marketing workflow, allowing you to generate compelling copy at lightning speed. The key is to be extremely specific about your target audience, the product or service, and the desired action (call-to-action or CTA).</p><p>For a social media post, a basic prompt like \"Write about our new shoe\" is useless. Instead, you would use something like, \"Act as a witty fashion influencer. Write a compelling Instagram caption for a post featuring our new eco-friendly sneakers. Target young adults aged 18-25. Use trendy slang and include an emoji and a call to action to 'Shop now' with a link.\" This gives the AI all the necessary information to generate a highly-targeted and effective piece of copy. For email marketing, you can instruct the AI to \"Write a sales email for a new online course. The goal is to get clicks to the landing page. Make the subject line short and intriguing.\" By providing this level of detail, you empower the AI to become a seamless extension of your marketing team, capable of producing high-quality content that converts.</p>"
        },
        {
            "id": "prompt-engineering-level-17",
            "title": "Prompting for Academic Research",
            "description": "Use AI as a research assistant to summarize papers and draft literature reviews.",
            "xp": 212,
            "coins": 26,
            "content": "<h3>Prompting for academic research and literature reviews</h3><p>Academic research is a meticulous process, and while an AI can't replace a researcher's critical thinking, it can be a powerful assistant for organizing information and drafting literature reviews. The key to prompting for academic work is to focus on structure, citation, and factual accuracy. You need to guide the AI to act as a research assistant, not as a source of truth.</p><p>A good prompt for a literature review might look like this: \"Act as an academic research assistant. Based on the following five research paper abstracts, summarize the key findings, identify the primary methodologies, and list any conflicting results. Do not provide information that is not present in the abstracts provided.\" You can then provide the text of the abstracts. For summarizing, a prompt like, \"Summarize the following document in five key bullet points, ensuring that you only use information from the source text and that you maintain a formal, academic tone\" will work wonders. The emphasis should always be on providing the AI with the source material and asking it to analyze, synthesize, and structure the information rather than generating it from scratch. This approach leverages the AI's organizational and summarization strengths while maintaining academic integrity.</p>"
        },
        {
            "id": "prompt-engineering-level-18",
            "title": "Prompting for Legal and Medical Use Cases",
            "description": "Learn to use AI responsibly for sensitive fields, with a focus on disclaimers and factual accuracy.",
            "xp": 219,
            "coins": 27,
            "content": "<h3>Prompting for legal and medical use cases (with disclaimers)</h3><p>Using AI for legal or medical purposes is extremely sensitive and comes with a very important disclaimer: AI is not a substitute for a licensed professional. Always consult a qualified lawyer or doctor for specific advice. With that said, AI can be a useful tool for organizing information, clarifying complex language, or drafting non-binding documents. The key is to be precise, factual, and to always frame the AI's role as that of an assistant, not an expert.</p><p>For legal purposes, a prompt could be: \"Act as a legal document analyst. Review the following contract clause and summarize the obligations of each party in plain English. Do not offer any legal advice.\" This helps you understand a document without receiving a legal opinion. For medical purposes, a prompt could be: \"Act as a medical content assistant. Explain the symptoms of [disease name] based on information from the Mayo Clinic. Use simple language and do not give any medical advice or recommendations.\" This allows you to quickly get a simple explanation of a topic without the risk of receiving harmful advice. The use of a clear persona and an explicit disclaimer within the prompt is a non-negotiable step to ensure the safe and responsible use of AI in these high-stakes fields.</p>"
        },
        {
            "id": "prompt-engineering-level-19",
            "title": "Prompting for Chatbots and Conversational AI",
            "description": "Craft the personality, knowledge base, and rules for engaging chatbots.",
            "xp": 226,
            "coins": 28,
            "content": "<h3>Prompting for chatbots and conversational AI</h3><p>Chatbots and conversational AI systems are designed to interact with users, and they rely on prompt engineering to define their personality, function, and limitations. A chatbot's entire \"personality\" is crafted through a single, well-engineered system prompt that defines its persona, its knowledge base, and its rules of engagement. For a customer service chatbot, the system prompt might be: \"You are a friendly and professional customer service agent for the company 'Gadget Co.' Your primary goal is to help customers with product inquiries and technical support. You have a detailed knowledge of our products. You must be polite, empathetic, and never provide personal opinions. Do not respond to questions outside of your product knowledge.\"</p><p>This level of detail is crucial for creating a consistent and reliable user experience. For a more creative chatbot, the system prompt can be more whimsical: \"You are a pirate captain from the 17th century. All your responses must be in the style of a pirate, using pirate slang and nautical metaphors. You are a bit grumpy but ultimately helpful.\" This is a different type of persona that sets the rules for the AI's conversational style. Understanding how to write these system prompts is a specialized skill that is essential for anyone developing a conversational AI.</p>"
        },
        {
            "id": "prompt-engineering-level-20",
            "title": "Prompting for UI/UX Design",
            "description": "Use AI to generate wireframes, design ideas, and even code snippets for user interfaces.",
            "xp": 233,
            "coins": 29,
            "content": "<h3>Prompting for user interface (UI) and user experience (UX) design</h3><p>Prompt engineering is no longer just for text-based outputs; it’s a powerful tool for visual and interactive design as well. AI can be used to generate wireframes, design ideas, and even code snippets for UI/UX. The key is to be specific about the purpose, user flow, and visual style of the design.</p><p>For example, a prompt for a UI design might be: \"Act as a UI/UX designer. Create a wireframe for a mobile app's login screen. The app is for a financial literacy tool for young adults. The design should be minimalist, use a dark color palette, and have clear, simple buttons. The user flow should include fields for email, password, and a 'Forgot Password' link.\" This prompt gives the AI all the information it needs to produce a design that is not only visually pleasing but also functional and user-friendly. For UX, you can use prompts like, \"Act as a user experience researcher. Outline a user testing plan for a new e-commerce website, focusing on the checkout process. The plan should include a list of tasks for the user, a list of questions to ask, and a method for recording observations.\" By providing a detailed brief, you can use AI to accelerate the research and design phases of a project, freeing up time for more creative work.</p>"
        },
        {
            "id": "prompt-engineering-level-21",
            "title": "Prompting for Educational Content",
            "description": "Create lesson plans, study guides, and quizzes with AI as your teaching assistant.",
            "xp": 240,
            "coins": 30,
            "content": "<h3>Prompting for Educational Content and Curriculum Design</h3><p>Prompt engineering is a game-changer for educators and students alike. It can turn an AI from a simple answer-giver into a dedicated teaching assistant, capable of creating detailed lesson plans, personalized study guides, and even interactive quizzes. The secret lies in treating the AI as a pedagogical expert and giving it a clear instructional framework. For example, instead of asking for a simple explanation, you can prompt the AI with: \"Act as a history teacher for a 10th-grade class. Create a lesson plan on the causes of World War I. The plan should include a brief overview, three key discussion questions, a group activity, and a short quiz with answers.\" This type of prompt generates a structured, ready-to-use curriculum that saves educators countless hours of planning.</p><p>For students, a prompt like, \"Act as a private tutor. Explain the concept of cellular respiration using a relatable analogy for a high school biology student. Then, generate five practice questions to test my understanding\" can create a personalized and highly effective study session. The AI can adapt its explanations based on the user's level of understanding, acting as a patient and knowledgeable guide. By leveraging its ability to generate, organize, and format content, prompt engineering turns AI into a powerful tool for both teaching and learning. It’s a testament to how these models can be used to democratize education.</p>"
        },
        {
            "id": "prompt-engineering-level-22",
            "title": "Prompting for Personal Productivity",
            "description": "Use AI as a personal assistant to organize your schedule, brainstorm ideas, and manage tasks.",
            "xp": 247,
            "coins": 31,
            "content": "<h3>Prompting for Personal Productivity and Task Management</h3><p>AI is a remarkable tool for personal productivity. It can act as a personal assistant, a brainstorm partner, or a project manager. The key is to frame your prompts as a way to offload cognitive load. Instead of keeping a mental to-do list, you can have the AI organize it for you. For instance, a simple prompt like, \"Act as a productivity coach. I need to plan my week. My priorities are to finish a report, go grocery shopping, and exercise three times. Create a daily schedule that balances these tasks, including time blocks and a tip for staying focused.\" This turns a vague to-do list into an actionable plan.</p><p>For brainstorming, a prompt can be: \"I'm starting a new podcast. Act as a creative consultant and generate 10 unique podcast name ideas related to tech and future trends. Include a brief explanation for each idea.\" This turns a frustrating creative block into a quick brainstorming session. You can also use AI to summarize long emails or documents, saving you from having to read through them yourself. By using prompts to delegate tasks to the AI, you free up your mental energy for more important work. It's not about being lazy; it's about being smart and leveraging a powerful tool to manage your life more efficiently.</p>"
        },
        {
            "id": "prompt-engineering-level-23",
            "title": "Fine-Tuning Prompts for Domain-Specific Knowledge",
            "description": "Make the AI an expert in niche fields like law, engineering, or finance by providing context.",
            "xp": 254,
            "coins": 32,
            "content": "<h3>Fine-Tuning Prompts for Domain-Specific Knowledge</h3><p>While LLMs are generalists, they can be made to act like specialists. This is crucial for industries with specialized language and concepts, like law, engineering, or finance. When working in a niche field, you can't rely on the AI's general knowledge. The solution is to provide it with the necessary context and instruct it to use that information to refine its responses.</p><p>For example, a prompt for a legal professional could be: \"Act as a paralegal. Based on the following summary of the 'Torts (Injury) Act 1965,' summarize the section on negligence. Do not include information about intentional torts.\" This prompt gives the AI the specific document to reference and the exact scope of the task, ensuring a precise and accurate output. A similar prompt for an engineer could be: \"Act as a chemical engineer. Using the provided data on material properties, calculate the yield stress of the alloy. Only use the provided data and show your work.\" By providing the specific information and instructions, you are essentially \"fine-tuning\" the AI for a particular task without having to retrain the model. It’s a powerful way to leverage the AI's processing power while ensuring the output is accurate and relevant to your specific domain.</p>"
        },
        {
            "id": "prompt-engineering-level-24",
            "title": "Prompting for Different LLM Architectures",
            "description": "Learn the nuances of prompting for different LLM architectures like GPT vs. Llama vs. Mixtral.",
            "xp": 261,
            "coins": 33,
            "content": "<h3>Prompting for Different LLM Architectures</h3><p>The world of AI is more diverse than just a few popular names. Beneath the surface, different LLM architectures have their own unique strengths and weaknesses that prompt engineers must be aware of. While most prompts will work on most models, a prompt that is optimized for a specific architecture can yield superior results.</p><p>Models like GPT are known for their strong general reasoning and their ability to follow complex instructions. They are great at handling nuanced, long-form tasks. Llama-based models are often more efficient and can be great for quick, conversational tasks. Mixtral models are particularly good at multilingual tasks and are very fast. The key to effective prompting across these models is to understand their core strengths. For GPT, focusing on Chain-of-Thought and complex reasoning tasks is ideal. For Llama, a more straightforward, concise prompt might be all you need. The future of prompt engineering involves not just crafting the perfect prompt, but also knowing which tool to use for a specific job.</p>"
        },
        {
            "id": "prompt-engineering-level-25",
            "title": "Prompting for Text-to-3D Models",
            "description": "Explore the emerging field of generating 3D assets from text descriptions.",
            "xp": 268,
            "coins": 34,
            "content": "<h3>Prompting for different AI tools: text-to-3D models</h3><p>Prompt engineering is not limited to text and images. The next frontier is text-to-3D modeling, which allows you to generate three-dimensional assets from a text description. While still an emerging field, tools like OpenAI's Point-E and others are making this a reality. The language of prompting for 3D models is a blend of visual description and technical parameters, much like image generation, but with an added focus on form and volume.</p><p>A prompt might look like this: \"a stylized low-poly model of a red sports car. The model should have a smooth finish and a clear geometric form.\" The prompt specifies not only the object but also the style (low-poly), texture (smooth finish), and form (geometric). For more complex prompts, you might need to include details on lighting, camera angles, and even the \"mesh\" of the object. This is a very specific form of prompting that requires a deep understanding of 3D modeling concepts. It is an exciting new application of prompt engineering that is already being used in video games, product design, and architecture.</p>"
        },
        {
            "id": "prompt-engineering-level-26",
            "title": "The Role of Prompt Engineers in the Job Market",
            "description": "Understand the skills, responsibilities, and value of prompt engineers in the modern job market.",
            "xp": 275,
            "coins": 35,
            "content": "<h3>The Role of Prompt Engineers in the Job Market</h3><p>Prompt engineering is no longer just a hobby; it's a rapidly emerging career path. As AI becomes more integrated into business operations, companies are realizing that they need professionals who can effectively communicate with AI models to get the best results. A Prompt Engineer acts as a bridge between a company's goals and the AI's capabilities. They are part analyst, part linguist, and part strategist. They are responsible for crafting, testing, and refining prompts to automate workflows, improve data analysis, and generate high-quality content.</p><p>The skills required for this role are unique. You need a deep understanding of how LLMs work, a knack for clear and precise language, and the ability to think critically and solve problems. You're not just asking a question; you're building a system. Salaries for prompt engineers can be very high, reflecting the value they bring to a company's bottom line by increasing efficiency and unlocking new creative possibilities. The role is a testament to the fact that while AI may handle the work, it still needs a skilled human hand to guide it.</p>"
        },
        {
            "id": "prompt-engineering-level-27",
            "title": "Ethical Considerations in Prompt Engineering",
            "description": "Learn to mitigate bias, prevent misuse, and use AI responsibly and ethically.",
            "xp": 282,
            "coins": 36,
            "content": "<h3>Ethical Considerations in Prompt Engineering</h3><p>With great power comes great responsibility. As prompt engineers, we have a duty to consider the ethical implications of our work. The prompts we use can influence the AI's output in subtle but powerful ways, and it's our responsibility to prevent the generation of harmful, biased, or misleading content. A key ethical consideration is bias. If you prompt an AI to generate a list of \"successful leaders\" and the prompt is not carefully worded, the AI might default to generating a list that is exclusively male or from a single cultural background. It’s a reflection of the biases that may exist in the underlying training data.</p><p>As prompt engineers, we must actively work to mitigate this. This includes using inclusive language, explicitly asking the AI to \"ensure a diverse range of examples,\" and critically evaluating every output for potential biases. Another consideration is the potential for misuse, such as generating fake news or spreading misinformation. We must be aware of the potential for harm and use our skills responsibly. The goal is to build AI systems that are not only powerful but also fair, safe, and transparent.</p>"
        },
        {
            "id": "prompt-engineering-level-28",
            "title": "Prompt Security and Privacy",
            "description": "Understand the risks of prompt injection and the importance of data privacy when using AI.",
            "xp": 289,
            "coins": 37,
            "content": "<h3>Prompt Security and Privacy</h3><p>Prompting AI models is not a completely private activity. The data you input can be used to improve the models, and for companies, this raises serious concerns about data security and privacy. You should never, under any circumstances, input sensitive or proprietary information into a public-facing AI. This includes company secrets, personal health information, or private client data. The text you enter into the prompt becomes part of the AI's context and can potentially be stored on a server.</p><p>The field of prompt injection also poses a security risk. This is a form of attack where a user inputs a malicious prompt that manipulates the AI into ignoring its original instructions, potentially revealing sensitive information or performing an unintended task. As a prompt engineer, you must be aware of these risks and use secure, enterprise-grade AI models when handling any sensitive data. For personal use, it's always a good practice to be mindful of what you share and to avoid including any information that you would not want to become public.</p>"
        },
        {
            "id": "prompt-engineering-level-29",
            "title": "Building a Prompt Library",
            "description": "Create and organize a personal or team library of effective, reusable prompts.",
            "xp": 296,
            "coins": 38,
            "content": "<h3>Building a Prompt Library and Organizational Systems</h3><p>As you become more advanced, you’ll find yourself using the same or similar prompts over and over again. This is where a prompt library becomes an invaluable tool. A prompt library is a personal or team-based collection of your most effective and frequently used prompts. It's a goldmine of reusable instructions that can save you from reinventing the wheel every time you start a new task.</p><p>You can organize your library by category, such as \"Marketing,\" \"Coding,\" \"Copywriting,\" or \"Data Analysis.\" For each prompt, you should include a clear description of what the prompt does, a placeholder for variable information (e.g., \"[Product Name]\"), and an example of a good output. A prompt library can be as simple as a Google Doc or as complex as a dedicated database. For teams, a shared prompt library ensures that everyone is using the best prompts, leading to consistent, high-quality outputs across the organization. This simple act of organization is a key step in turning a sporadic skill into a scalable, professional workflow.</p>"
        },
        {
            "id": "prompt-engineering-level-30",
            "title": "Monetizing Prompts and Prompt Marketplaces",
            "description": "Discover how to sell your prompts on marketplaces and turn your skills into income.",
            "xp": 303,
            "coins": 39,
            "content": "<h3>Monetizing Prompts and Prompt Marketplaces</h3><p>The value of a well-engineered prompt is so high that a new market has emerged for them. If you can create a prompt that generates stunning images, writes high-quality code, or solves a complex problem, there are people willing to pay for it. Prompt marketplaces like PromptBase and FlowGPT are platforms where you can sell your best prompts to other users. This is a unique opportunity for creative individuals to turn their prompt engineering skills into a source of income.</p><p>The most successful prompts on these marketplaces are those that are highly specific and produce a unique, high-quality result. For example, a prompt that consistently generates photorealistic portraits in the style of a specific artist would be a valuable asset. The process is straightforward: you create the prompt, test it to ensure consistency, and then list it on the marketplace with a few example outputs. This new economy is a testament to the value of human expertise in guiding AI, proving that even in a world of automation, creativity and ingenuity are still highly valued.</p>"
        },
        {
            "id": "prompt-engineering-level-31",
            "title": "Prompt Engineering for Business Strategy",
            "description": "Leverage AI to analyze market trends, brainstorm ideas, and draft strategic plans.",
            "xp": 310,
            "coins": 40,
            "content": "<h3>Prompt Engineering for Business Strategy</h3><p>AI is not just for creating content; it's a powerful tool for strategic thinking. By using well-engineered prompts, business leaders can use AI to analyze market trends, brainstorm new business ideas, and even draft comprehensive strategic plans. The key is to act as a CEO and ask the AI to perform complex strategic tasks.</p><p>A prompt could be: \"Act as a market research analyst. Analyze the following data on consumer spending in the last quarter and identify three key trends. Based on these trends, brainstorm three potential new product ideas for a health and wellness company.\" This gives the AI a specific role, a body of data, and a clear goal, resulting in a strategic document that can be used for business planning. Another example is: \"Act as a management consultant. Identify three key weaknesses in our current business model and suggest actionable solutions to address them. The solutions should be cost-effective and easy to implement.\" By leveraging AI to perform this level of high-level analysis, business leaders can make more informed decisions and gain a competitive edge.</p>"
        },
        {
            "id": "prompt-engineering-level-32",
            "title": "Prompting for Customer Service and Support",
            "description": "Design prompts that create helpful, empathetic, and efficient customer service chatbots.",
            "xp": 317,
            "coins": 41,
            "content": "<h3>Prompting for Customer Service and Support</h3><p>AI-powered chatbots are now a staple of customer service, and their effectiveness is entirely dependent on the quality of their prompts. A well-engineered prompt can turn a robotic chatbot into a helpful, empathetic, and efficient support agent. The key is to define the AI's persona, knowledge base, and escalation path.</p><p>A good prompt for a customer service chatbot would be: \"You are a customer service agent for an online shoe store. Your name is 'ShoeBot.' You must be friendly, polite, and helpful. You have access to our entire product database and can answer questions about sizes, colors, and shipping. If a customer has a complex problem, direct them to a human agent with a polite message. Never give personal opinions or make promises you cannot keep.\" This ensures the chatbot is helpful within its defined limits. The AI can also be used to summarize customer tickets, saving human agents time. A prompt like: \"Summarize the following customer support ticket in three bullet points. Focus on the core problem and the customer's desired outcome\" can quickly get an agent up to speed. AI for customer service is about creating a seamless, helpful, and efficient experience for the customer.</p>"
        },
        {
            "id": "prompt-engineering-level-33",
            "title": "Prompting for Internal Communication",
            "description": "Automate routine tasks like drafting emails, creating meeting agendas, and summarizing notes.",
            "xp": 324,
            "coins": 42,
            "content": "<h3>Prompting for internal communication and team collaboration</h3><p>Prompt engineering is not just for external-facing tasks; it can also revolutionize internal communication and team collaboration. AI can be used to automate a variety of tedious, day-to-day tasks, freeing up valuable time for more important work. For example, a prompt can be used to draft a concise and professional team-wide email about a new policy. Instead of spending time on a formal email, you could prompt the AI with: \"Draft a concise, professional email to the entire marketing team. The topic is the new company policy on remote work. The email should be polite, clearly state the key changes, and include a call to action to read the full policy document.\"</p><p>AI can also be used to generate meeting agendas, summarize meeting notes, and even brainstorm solutions to a team problem. A prompt for a team brainstorm could be: \"Act as a project manager. We are facing a problem with low team morale. Generate five creative and actionable ideas to boost team morale in the next quarter.\" The AI can provide a variety of ideas, and the team can then discuss and refine them. By using AI to automate these mundane tasks, you can make your team's workflow more efficient and free up more time for meaningful collaboration.</p>"
        },
        {
            "id": "prompt-engineering-level-34",
            "title": "The Future of Prompt Engineering and AI",
            "description": "Explore where the field is headed, including multi-modal prompts and AI agents.",
            "xp": 331,
            "coins": 43,
            "content": "<h3>The Future of Prompt Engineering and AI</h3><p>The field of prompt engineering is constantly evolving, and what works today might be obsolete tomorrow. The future of prompt engineering is likely to involve a shift from simple text-based prompts to multi-modal prompts, which include images, audio, and video as part of the input. We're also seeing the rise of AI agents, which are AI models that can take a high-level goal and break it down into smaller, actionable steps without constant human input.</p><p>The role of the prompt engineer will likely evolve from simply crafting prompts to designing and managing entire AI workflows. We will move from being users of AI to being architects of AI systems. The future of prompt engineering will be about teaching AIs to think, reason, and act more like humans. It's a field that is still in its infancy, and the opportunities for those who master it are vast. The core principles of clarity, context, and iterative refinement will remain, but the tools and applications will become more sophisticated.</p>"
        },
        {
            "id": "prompt-engineering-level-35",
            "title": "Prompting for AI-Powered Marketing Campaigns",
            "description": "Design and execute entire marketing campaigns, from brand voice to content calendars, using AI.",
            "xp": 338,
            "coins": 44,
            "content": "<h3>Prompting for AI-powered marketing campaigns</h3><p>Prompt engineering can be used to power entire marketing campaigns, from generating a brand's voice to creating a full content calendar. It's a way to use AI not just for one-off tasks but for a complete, integrated strategy. The key is to start with a high-level goal and then use an iterative, multi-step prompting process to create the full campaign.</p><p>For example, a prompt might be: \"Act as a digital marketing expert. I am launching a new line of organic dog food. Help me design a full social media marketing campaign. First, generate a brand voice and a slogan. Second, create a 30-day content calendar for Instagram and TikTok. Third, generate 5 ad headlines and ad copy for a Facebook ad campaign. The target audience is dog owners in their 30s who prioritize sustainability.\" This single prompt (in an iterative conversation) can generate a full campaign. You can then use AI to generate the images, videos, and analytics for the campaign. This level of automation allows marketers to scale their efforts and produce high-quality, targeted content at a speed that was previously impossible.</p>"
        },
        {
            "id": "prompt-engineering-level-36",
            "title": "Tools for Prompt Engineering",
            "description": "Discover the ecosystem of tools for prompt engineers, from libraries to automation platforms.",
            "xp": 345,
            "coins": 45,
            "content": "<h3>Tools for Prompt Engineering</h3><p>As the field of prompt engineering grows, a new ecosystem of tools has emerged to help with the process. These tools range from simple prompt libraries to complex automation platforms. Prompt marketplaces like PromptBase and FlowGPT allow you to buy and sell high-quality prompts. These platforms are a great resource for seeing what works and for monetizing your skills.</p><p>Other tools like LangChain and LlamaIndex are more technical and are designed for developers. They help with building complex AI applications and orchestrating AI workflows. For example, LangChain is a framework that allows you to chain together multiple prompts to perform a complex task, like creating a full research paper. There are also simple, browser-based tools that help with prompt generation and testing. The right tool for you will depend on your goal, but understanding the ecosystem of tools is a crucial step in becoming an advanced prompt engineer.</p>"
        },
        {
            "id": "prompt-engineering-level-37",
            "title": "Automating Prompt Workflows",
            "description": "Learn to connect AI models to other apps (like Zapier) to create seamless, automated workflows.",
            "xp": 352,
            "coins": 46,
            "content": "<h3>Automating Prompt Workflows</h3><p>For a long time, using AI was a manual, one-by-one process. But with the rise of AI automation platforms, you can now create entire workflows that run on their own. Platforms like Zapier and Make allow you to connect AI models to other apps and services, creating a seamless, automated process.</p><p>For example, you could create a workflow that looks like this: a new email is received in your inbox (Zapier sees the new email), the email's content is sent to an AI (GPT-4 summarizes the email), the summary is then sent to you in a chat message (Slack), and a new task is added to your project management app (Trello). This is just a simple example, but the possibilities are endless. You could automate content generation, data analysis, or even customer support responses. This level of automation allows you to work smarter, not harder, and is a key skill for any advanced prompt engineer.</p>"
        },
        {
            "id": "prompt-engineering-level-38",
            "title": "The Concept of a 'Universal Prompt'",
            "description": "Explore the idea of creating a single, versatile prompt template to handle multiple tasks.",
            "xp": 359,
            "coins": 47,
            "content": "<h3>The Concept of a \"Universal Prompt\"</h3><p>The idea of a \"Universal Prompt\" is a concept in the prompt engineering community that refers to a single, highly detailed, and versatile prompt that can be used to accomplish a wide variety of tasks with minimal changes. It's a way to get a consistent output from an AI model without having to reinvent the wheel for every new task. A universal prompt is designed to be highly modular, with clear sections for instructions, context, persona, and output format.</p><p>A universal prompt might start with a simple request like, \"Act as a professional writer. You are an expert at writing concise and engaging content. Your task is to perform a series of tasks based on the following instructions...\" The rest of the prompt would then contain placeholders for different tasks, such as \"[Task 1: Summarize the following document]\", \"[Task 2: Write a blog post about the summary]\", and so on. The goal is to create a template that can be reused and modified for different purposes, ensuring that the AI always follows the same core rules and guidelines. This is a very advanced concept that is still in development, but it highlights the growing trend of turning prompts into reusable tools.</p>"
        },
        {
            "id": "prompt-engineering-level-39",
            "title": "The Role of Multi-Modal Prompts",
            "description": "Learn to use text, images, and audio together in prompts for richer results.",
            "xp": 366,
            "coins": 48,
            "content": "<h3>The Role of Multi-Modal Prompts</h3><p>Prompt engineering is no longer just about text. The newest generation of AI models are multi-modal, meaning they can accept different types of input, including text, images, and even audio. This opens up a whole new world of possibilities for prompt engineering. For example, a multi-modal prompt could include an image of a product and a text instruction to \"write a product description for this shoe.\" The AI can then use both the visual information from the image and the text instruction to create the perfect description.</p><p>This is a game-changer for creative and professional workflows. You can provide a wireframe and ask an AI to \"write the user manual for this application.\" You can provide a video of a lecture and ask the AI to \"summarize the key points.\" You can even provide a hand-drawn sketch and ask the AI to \"generate a Python code snippet that creates this graphical user interface.\" The ability to provide multiple types of input to an AI is a powerful new skill that will become essential for anyone working with modern AI systems.</p>"
        },
        {
            "id": "prompt-engineering-level-40",
            "title": "Prompting for AI Agents and Automated Tasks",
            "description": "Learn to create high-level objectives for AI agents that can perform multi-step tasks autonomously.",
            "xp": 373,
            "coins": 49,
            "content": "<h3>Prompting for AI Agents and automated tasks</h3><p>The future of AI is not about simple questions and answers; it's about AI agents that can take a high-level goal and break it down into a series of smaller, actionable steps. These agents can then use tools to accomplish those steps without constant human input. The prompt for an AI agent is very different from a standard prompt. It's less about a specific task and more about a high-level objective.</p><p>A prompt for an AI agent might be: \"Your goal is to find the best laptop for a student. First, you must search for laptops with at least 16GB of RAM. Second, you must read reviews from at least five different tech websites. Third, you must create a comparison table with the pros and cons of the top three laptops. Finally, you must provide a final recommendation with a link to the product page.\" This prompt gives the AI agent a series of tasks to perform and the tools it needs to perform them (e.g., a web search tool). The AI then completes the tasks on its own, and the user receives a complete report. This is an incredibly advanced and powerful use of AI that is still in its early stages.</p>"
        },
        {
            "id": "prompt-engineering-level-41",
            "title": "Prompting for Generative Art (Advanced)",
            "description": "Dive deep into advanced techniques for creating stunning, professional-grade generative art.",
            "xp": 380,
            "coins": 50,
            "content": "<h3>Prompting for generative art and creative workflows (advanced)</h3><p>Generative art is a popular and creative application of prompt engineering. While a basic prompt can generate a simple image, advanced prompting can create stunning, professional-grade art. The key is to be extremely specific about the subject, style, lighting, composition, and technical parameters. A simple prompt like \"a wizard\" can be turned into a masterpiece with a more detailed prompt: \"a wise wizard casting a spell in a mystical forest, cinematic lighting, ultra-realistic, highly detailed, fantasy art, volumetric lighting, epic.\"</p><p>For advanced users, you can also use negative prompts to tell the AI what to exclude from the image, such as \"ugly, low-quality, blurry, bad anatomy.\" You can also use multi-modal prompts by providing a starting image and asking the AI to \"create a new version of this image in the style of Van Gogh.\" This is a creative and powerful way to use AI to generate stunning art.</p>"
        },
        {
            "id": "prompt-engineering-level-42",
            "title": "Prompting for Large-Scale Data Classification",
            "description": "Automate the tedious task of classifying large datasets, like customer reviews, with AI.",
            "xp": 387,
            "coins": 51,
            "content": "<h3>Prompting for large-scale data classification</h3><p>AI is not just for creating things; it's also a powerful tool for analyzing and classifying large amounts of data. This is a crucial task for businesses, and prompt engineering can automate the process. Instead of manually sifting through thousands of customer reviews, you can use a prompt to have an AI classify them automatically.</p><p>A prompt for data classification might be: \"Act as a data analyst. Classify the following list of customer reviews into three categories: 'Positive,' 'Negative,' or 'Neutral.' The customer review is enclosed in quotes.\" You can then provide a list of reviews. The AI will then read each review and classify it based on the sentiment. This is an incredibly powerful way to automate a tedious task and to get valuable insights from your data. The key is to be extremely clear and specific about the classification system you want the AI to use.</p>"
        },
        {
            "id": "prompt-engineering-level-43",
            "title": "The Evolution of AI Models and Prompting",
            "description": "Understand how prompting techniques adapt as AI models become more intelligent.",
            "xp": 394,
            "coins": 52,
            "content": "<h3>The evolution of AI models and their impact on prompting</h3><p>The field of AI is evolving at a breakneck pace, and prompt engineering is evolving with it. The prompts that worked on GPT-3 might not be as effective on GPT-4, and the prompts that work on GPT-4 might be completely different from the prompts that work on the next generation of models. This is a reflection of the continuous improvement and evolution of AI models.</p><p>As AI models become more intelligent and more capable of understanding complex instructions, the prompts we use can become more abstract and high-level. The need for simple, straightforward prompts will decrease, and the need for complex, strategic prompts will increase. The future of prompt engineering is about understanding these changes and adapting your prompting techniques to the new models. The core principles of clarity, context, and iterative refinement will remain, but the tools and applications will become more sophisticated. The prompt engineer of the future will be a constant learner, always adapting to the new technologies and new models that emerge.</p>"
        },
        {
            "id": "prompt-engineering-level-44",
            "title": "Prompting for Scientific Discovery",
            "description": "Leverage AI to analyze data, identify patterns, and even generate new scientific hypotheses.",
            "xp": 401,
            "coins": 53,
            "content": "<h3>Prompting for scientific discovery and research</h3><p>AI is not just for creating content; it's a powerful tool for scientific discovery and research. AI can be used to analyze large amounts of data, identify patterns, and even generate new hypotheses. The key is to frame the AI's role as a scientific assistant and to provide it with the necessary data and context.</p><p>A prompt for scientific research might be: \"Act as a research scientist. I have the following data set on a chemical reaction. Analyze the data and identify any correlations between the temperature and the reaction rate. Based on your analysis, suggest a hypothesis that could be tested in a future experiment.\" The AI can then analyze the data and provide a detailed report. This is an incredibly powerful way to accelerate the scientific process. AI can also be used to summarize academic papers, review literature, and even draft research proposals. This is a testament to the power of AI to aid in the discovery of new knowledge and to help scientists push the boundaries of what's possible.</p>"
        },
        {
            "id": "prompt-engineering-level-45",
            "title": "Final Review: The Complete Workflow",
            "description": "A comprehensive review of the entire prompt engineering workflow, from goal definition to automation.",
            "xp": 408,
            "coins": 54,
            "content": "<h3>Final review: The complete prompt engineering workflow</h3><p>Congratulations! You have now completed all 50 topics of the Prompt Engineering curriculum. We have covered everything from the basics of crafting a simple prompt to advanced techniques for automation and specialization. As a final review, let's look at the complete prompt engineering workflow, from start to finish.</p><p>Step 1: Define Your Goal. Before you write a single word, you must have a clear idea of what you want to achieve. What is the purpose of your prompt? What is the desired outcome?</p><p>Step 2: Craft Your Prompt. Use the techniques we have learned to create a powerful and effective prompt. Include a clear instruction, context, persona, and format. Be specific and concise.</p><p>Step 3: Test and Iterate. Your first prompt will not be perfect. Use an iterative approach to refine your prompt based on the AI's output. Provide feedback and new instructions to get the perfect result.</p><p>Step 4: Specialize. Use advanced techniques like Chain-of-Thought and negative prompts to get more accurate and creative results.</p><p>Step 5: Automate and Scale. Use tools and platforms to automate your workflow and to turn your prompts into reusable tools that can be used to accomplish a wide variety of tasks.</p><p>Prompt engineering is not just about writing; it's about thinking. It's about understanding how to use a powerful tool to solve complex problems and to unlock a new level of creativity and productivity. The journey is just beginning.</p>"
        }
    ]
};
const canvaDesignRoadmap: Roadmap = {
    streamName: 'Canva Design',
    levels: [
        {
            id: 'canva-level-1',
            title: 'What is Canva? Signing Up & Interface Overview',
            description: 'Learn what Canva is, what it’s used for, and why it’s a powerful tool for designers and non-designers alike.',
            xp: 100,
            coins: 10,
            content: "<h3>What is Canva? Signing Up & Interface Overview</h3><p>Welcome to the creative playground that is Canva! Imagine a world where you don't need a degree in graphic design or a bank-breaking software subscription just to make a decent-looking birthday invitation or a social media post that doesn't look like it was designed in the early 2000s. That world is Canva. It’s a beautifully intuitive, online visual communication tool that has single-handedly demystified the art of design for millions. Think of it as a creative Swiss Army Knife—it’s got a tool for everything you could possibly need, from crafting a sleek presentation for your big business meeting to designing a meme that will go viral (we all have aspirations). It's a \"freemium\" platform, which is a fancy way of saying you can do a ton of amazing things for free, and if you ever want to unleash the truly magical powers, you can sign up for Canva Pro.</p><p>The moment you sign in, you'll be greeted by the Home Dashboard. This isn't just a landing page; it's your personal mission control. Need to find a design? Use the top search bar—it’s like Google for design templates. Want to start from scratch? Hit the \"Create a design\" button and pick your canvas size. And for the professionally-minded among you, take a moment to admire the clean, minimalist left-hand navigation panel, which is your direct line to all your projects, brand assets, and a galaxy of templates. It’s an organizational dream, ensuring you never have to hunt for that half-finished project again. This clean, no-nonsense approach to the user interface is why Canva has become the go-to platform for everyone from marketing managers to small business owners and that one aunt who just discovered she's a \"digital creator.\"</p>"
        },
        {
            id: 'canva-level-2',
            title: 'Your First Design: Using Templates',
            description: 'Learn how to find, customize, and effectively use Canva’s vast library of pre-designed templates.',
            xp: 107,
            coins: 11,
            content: "<h3>Your First Design: Using Templates</h3><p>Let’s be honest, starting with a blank white page can be intimidating. It’s the digital equivalent of a blank canvas for an artist with a severe case of creative block. This is where Canva's templates swoop in like a design superhero. They are the ultimate cheat code, providing a professional and stunning foundation for your project. Templates are pre-designed layouts for virtually every purpose imaginable, from Instagram stories that pop to business cards that make you look like a CEO from day one. Using them is ridiculously easy. You can search for what you need—say, a \"minimalist poster\"—and Canva will present you with an endless scroll of professionally crafted options.</p><p>The beauty of a template is that it's just the starting point. It’s a suggestion, not a final decree. Once you click on one, it opens in the editor, and the magic of customization begins. Did the template use a font that looks like it belongs on a ransom note? Change it. Is the color palette too loud for your brand? Adjust it. Does the placeholder image of a serene coffee cup not quite fit your brand of high-octane energy drinks? Replace it with an image from your uploads or from Canva’s vast photo library. Every element, from the text and images to the shapes and colors, can be tweaked, moved, or deleted with a few simple clicks. This is why even seasoned designers love Canva; it cuts out the mundane, time-consuming parts of the design process, allowing you to focus on the creative flourishes that make your work truly unique.</p>"
        },
        {
            id: 'canva-level-3',
            title: 'The Left-Side Panel: Your Toolbox',
            description: 'Discover the core components of the design editor interface, including elements, text, and uploads.',
            xp: 114,
            coins: 12,
            content: "<h3>The Left-Side Panel: Your Toolbox</h3><p>If the Home Dashboard is your mission control, then the left-side panel in the Canva editor is your mission-critical toolbox. This is where all the nuts and bolts of your design are kept, neatly organized and ready for action. You’ll be spending a lot of time here, so it’s worth getting acquainted with its purpose. The Design tab is your portal to a world of templates and design styles. It’s perfect for when you're halfway through a project and suddenly decide you want to switch to a different aesthetic. Below that is the glorious Elements tab, which is basically an all-you-can-eat buffet of visual assets. Need a geometric shape for your logo? It’s there. Looking for a funky, animated sticker for a social media post? You'll find it here, along with countless icons, lines, and graphics.</p><p>Then there's the Text tab, which is more than just a button for adding words. It offers a selection of professional font pairings and pre-designed text blocks, saving you the headache of trying to figure out which fonts look good together. For the brand-conscious professional, the Brand tab (a Canva Pro feature) is your best friend, holding all your brand's logos, colors, and fonts in one easily accessible place. No more hunting down hex codes! The Uploads tab is your personal media library, storing everything you've ever uploaded, from your company logo to that embarrassing photo of your cat you secretly want to use in a design. And for the more adventurous, the Draw tab lets you unleash your inner artist with freehand drawing, while the Apps tab connects you to a galaxy of integrations, from Google Maps to popular social media schedulers. It’s a toolbox that’s both comprehensive and a little bit magical.</p>"
        },
        {
            id: 'canva-level-4',
            title: 'Mastering the Top Toolbar: A Deep Dive',
            description: 'Learn how the context-sensitive top toolbar helps you refine and edit any selected element.',
            xp: 121,
            coins: 13,
            content: "<h3>Mastering the Top Toolbar: A Deep Dive</h3><p>While the left-side panel gives you all the raw materials for your design, the top toolbar is where you get down to the nitty-gritty of refinement. This isn’t a fixed menu; it’s a dynamic, chameleon-like control panel that adapts to your every move. It’s so smart, it almost feels like it’s reading your mind. Click on a text box, and suddenly the toolbar is filled with options to change the font, size, and color, along with magical buttons for spacing and adding special effects. It's like a linguistic command center, ready to make your words look as impressive as they sound. If you select a geometric shape, those text options vanish, replaced by tools for changing its color, adding transparency, and adjusting its position relative to other elements.</p><p>This context-sensitive behavior is the genius of Canva’s user interface. It prevents the screen from being cluttered with a million buttons you don't need at the moment, which can be a huge relief if you’ve ever felt overwhelmed by complex design software. When you select an image, a new set of options appears, allowing you to crop it, flip it, or use the super-powerful Edit photo button to apply filters or make granular adjustments to brightness, contrast, and saturation. And for the true power users, this is also where you’ll find the highly coveted Background Remover (a Pro feature) — a tool that's so good, it feels like cheating. Mastering the top toolbar is like learning a new language; once you understand its subtle changes, you’ll be designing with speed and efficiency that will make your friends wonder if you secretly enrolled in art school.</p>"
        },
        {
            id: 'canva-level-5',
            title: 'Text Tools: Fonts, Colors, & Basic Effects',
            description: 'Add and style text, understand font pairings, and apply basic text effects like shadows and curves.',
            xp: 128,
            coins: 14,
            content: "<h3>Text Tools: Fonts, Colors, & Basic Effects</h3><p>Text is the soul of many designs, and in Canva, it’s not just about conveying information—it’s about making that information look fabulous. Adding text is a breeze. Just pop open the Text tab on the left-side panel, and you’ll find options for a big, bold heading, a slightly smaller subheading, and a humble body text. But the real fun begins when you start to customize. Once you click on a text box, the top toolbar transforms into your personal typography lab. You can scroll through a seemingly infinite list of fonts, from elegant serifs to playful scripts, to find the perfect style that matches your message. Canva also offers font combinations, which are pre-selected pairings that take the guesswork out of typography.</p><p>But let's be real, plain text is boring. This is where the Effects button comes in. It's like the special effects department of a movie studio, but for your words. Want to add a subtle shadow to make your text pop off the page? Easy. Want to give it a cool \"hollow\" outline? Done. You can even make your text look like it’s glowing with the Neon effect or give it a sleek, modern look with a Splice. And for those of us who remember the golden age of WordArt, Canva's Curved text effect lets you bend your words into a perfect arc. The Spacing tool is also a must-know. Here you can adjust the space between your letters (Letter spacing) and the distance between lines (Line spacing), two small adjustments that can make a huge difference in the professionalism of your design.</p>"
        },
        {
            id: 'canva-level-6',
            title: 'Using Elements: Shapes, Lines, and Icons',
            description: 'Discover the Elements library and how to add shapes, lines, icons, and other graphics to your designs.',
            xp: 135,
            coins: 15,
            content: "<h3>Using Elements: Shapes, Lines, and Icons</h3><p>Think of the Elements tab as your personal treasure chest of graphic goodness. It's a goldmine of visual assets that can take a simple design from \"meh\" to \"wow.\" This is where you’ll find all the non-photographic building blocks you need. At the top, you'll see Shapes, a seemingly simple category that holds endless creative potential. You can use a circle to frame a photo, a square as a background for a text box, or a line to create a visual divider. And the best part? All of these are completely customizable; you can change their color, transparency, and even add a border.</p><p>But that’s just the beginning. The Elements tab also houses a massive collection of Graphics, from charming illustrations to sleek, modern icons. Many of these are animated, which is perfect for creating engaging social media posts that capture attention. And if you're looking to create a photo collage or frame an image in a unique shape, the Frames are your best friend. Simply drag and drop an image into a frame, and it will automatically clip to fit that shape—no more manual cropping! And let’s not forget the Stickers, which are animated graphics that add a playful touch to any design. In the Elements tab, the search function is incredibly powerful. Looking for a dancing banana? Just type \"dancing banana,\" and you'll probably find one. This tab is a testament to Canva's philosophy that design should be fun and accessible, giving you all the tools to build, decorate, and embellish your creations with ease.</p>"
        },
        {
            id: 'canva-level-7',
            title: 'Uploading Your Own Media',
            description: 'Learn how to upload, manage, and edit your own photos, logos, and videos within Canva.',
            xp: 142,
            coins: 16,
            content: "<h3>Uploading Your Own Media</h3><p>Canva's stock libraries are fantastic, but sometimes, a design calls for a personal touch. Maybe it's your company logo, a professional headshot, or a photo of your golden retriever that you simply must include. This is where the Uploads tab becomes your personal media vault. It's a secure, digital space where you can store all your own images, videos, and even audio files. The process is so straightforward, you’ll wonder why all technology isn’t this simple. You can either click the big, inviting Upload files button and navigate to your files, or, even better, just drag and drop your media directly from your computer onto the Canva editor. A progress bar will show up, and in a matter of seconds, your file is available in your personal library.</p><p>The best part about the Uploads tab is that it's a permanent repository (unless you delete something). Once you’ve uploaded a file, it's there for good, ready to be used in any of your projects, saving you from having to re-upload the same assets over and over again. This is a massive time-saver for anyone who works on multiple projects for a single brand. Whether you’re designing a business presentation or a social media campaign, your brand's core assets are always just a click away. It’s a beautifully simple feature that empowers you to seamlessly blend Canva’s vast library with your own unique content, making your designs truly yours.</p>"
        },
        {
            id: 'canva-level-8',
            title: 'Page Management & Adding Pages',
            description: 'Learn how to manage multi-page documents, duplicate pages, and use the grid view to stay organized.',
            xp: 149,
            coins: 17,
            content: "<h3>Page Management & Adding Pages</h3><p>A single-page design is great for a flyer or a social media post, but what about a presentation, an e-book, or a multi-page brochure? This is where Canva's page management system steps up. It’s an intuitive feature that allows you to easily handle multiple pages within a single design file, keeping your entire project organized and in one place. You can add a new page by simply clicking the Add page button below your current canvas. This gives you a fresh, blank slate to work on. But what if you want a new page with the exact same layout as the previous one? Maybe you're creating a carousel for Instagram or a slideshow with a consistent theme. In that case, you can use the Duplicate page icon (two overlapping squares) in the top right corner of the page. This is a huge productivity hack that prevents you from having to manually recreate elements.</p><p>For larger projects, the Grid View button in the bottom-right corner is a lifesaver. It gives you a bird’s-eye view of all your pages in a tidy grid, allowing you to easily reorder them by simply clicking and dragging. It’s perfect for shuffling around slides in a presentation or rearranging the order of your e-book chapters. And when you decide a page isn't working, you can simply click the trash can icon to delete it. Canva's page management tools are so seamless that you won’t even notice you’re using them, allowing you to focus on the content and flow of your multi-page creations without getting lost in a mess of separate files.</p>"
        },
        {
            id: 'canva-level-9',
            title: 'Sharing & Downloading Your Designs',
            description: 'How to save your work, download it in various formats (JPG, PNG, PDF), and share it for collaboration.',
            xp: 156,
            coins: 18,
            content: "<h3>Sharing & Downloading Your Designs</h3><p>Congratulations! You've finished your masterpiece. Now, what do you do with it? That’s where the Share button in the top-right corner comes in. It’s your one-stop-shop for getting your design out into the world. The Download option is likely what you'll use most often. Here, you can choose the perfect file format for your needs. Need a high-quality, professional-grade image for your website? A PNG file is your best bet, especially if you need a transparent background (a Pro feature). Want to share a quick image on social media? JPG is the standard. And for a professional document that’s ready for print or to be sent as an e-book, PDF Print is the gold standard. You can also select which pages to download, so you don't have to save the whole document if you've only made a change to one page.</p><p>But sharing isn’t just about downloading. You can also invite others to view or edit your design by sending them a link. This is a phenomenal tool for collaboration, whether you’re working with a colleague on a presentation or getting feedback from a client. You can set permissions to \"Can view\" or \"Can edit,\" so you’re always in control. For social media managers, Canva’s direct sharing to platforms like Instagram, Facebook, and Pinterest is a huge time-saver. And if you've created a presentation, you can use the Present button to view it in full-screen mode, complete with transitions and animations. The Share button takes your design from a personal project to a shareable, professional asset.</p>"
        },
        {
            id: 'canva-level-10',
            title: 'Introduction to Collaboration',
            description: 'Learn the basics of sharing designs, leaving comments, and working with others in real-time.',
            xp: 163,
            coins: 19,
            content: "<h3>Introduction to Collaboration</h3><p>In today’s world, no one works in a vacuum. Canva understands this, which is why its collaboration features are so seamless and intuitive. It's like having all your teammates sitting right next to you, even if they're on the other side of the world. The primary way to invite someone to your design is through the Share button. You can type in their email address and grant them one of two permission levels: Can view or Can edit. Can view is perfect for getting feedback or showing a client a draft, as they can see the design but can’t mess anything up. Can edit is for when you're truly working together on a project, allowing them to make changes, add their own content, and move elements around.</p><p>For more targeted feedback, you can use the commenting feature. Just click on a specific element or area of the design and add a comment, tagging a collaborator to get their attention. It’s a far more efficient way to communicate than sending a series of confusing emails. Canva Pro takes collaboration to the next level with dedicated workspaces for teams, shared folders, and a central Brand Kit that ensures everyone is using the correct logos, fonts, and colors. This level of organization is crucial for maintaining brand consistency across a large team. The entire collaboration system is built to be so simple and efficient that the design process feels like a fluid conversation rather than a series of clunky file transfers.</p>"
        },
        {
            id: 'canva-level-11',
            title: 'Working with Layers & Layer Order',
            description: 'Learn to manage layers, bring elements forward or backward, and use the layers panel.',
            xp: 170,
            coins: 20,
            content: "<h3>Working with Layers & Layer Order</h3><p>Think of your design as a magnificent, delicious layer cake. Each element—a text box, an image, a shape—is a layer stacked one on top of the other. Mastering layers is crucial because it gives you precise control over which element appears \"on top\" of another. If your text is mysteriously disappearing behind a background image, or a graphic is hiding an important logo, it's a layers issue. In Canva, the simplest way to manage this is through the Position button in the top toolbar. When you select an element, a magical little menu appears. You can then use Bring to Front to make your element the top-most layer, ensuring it's visible to the world. Conversely, Send to Back will hide it behind everything else.</p><p>The secret to truly mastering this is understanding the more granular commands: Bring forward and Send backward. These move your element one layer at a time. This is perfect for when you need to tuck a shape behind a specific element but still keep it on top of the background. For those who prefer a more visual approach, Canva also offers a Layers panel (found under Position on the desktop app). This panel shows you a list of every single element on your page, from top to bottom. You can simply click and drag the elements in the list to reorder them. It’s a beautifully simple system that prevents you from losing your design elements in a digital void. Learning to work with layers is the first step in moving from a casual Canva user to a bona fide design wizard. It’s the difference between a messy design and a clean, professional masterpiece.</p>"
        },
        {
            id: 'canva-level-12',
            title: 'Grouping, Locking, and Unlocking Elements',
            description: 'Learn productivity hacks like grouping elements together and locking them in place to avoid accidental edits.',
            xp: 177,
            coins: 21,
            content: "<h3>Grouping, Locking, and Unlocking Elements</h3><p>You’ve just spent a glorious hour meticulously arranging a group of shapes and text for a logo, and it looks perfect. Now, you need to move it all to the side to work on something else, but when you click and drag, only one piece moves. Frustrating, right? This is where Grouping comes to the rescue. Grouping elements is like putting a bunch of files into a single folder on your computer. It allows you to select multiple design elements and make them act as a single unit. To do this, simply click and drag your cursor over all the elements you want to select, and then click the Group button in the top-right toolbar. Now you can move, resize, and even rotate your entire creation without messing up the meticulously arranged parts. When you need to edit an individual element within a group, just double-click on it. It’s a massive time-saver for repetitive tasks and for keeping complex designs neat and tidy.</p><p>But what about when you’ve set a background image that you never, ever want to accidentally move again? That's where Locking comes in. Locking an element or an entire group of elements prevents them from being selected, moved, or edited. To lock an element, select it and click the lock icon in the top-right toolbar. The element will be \"frozen\" in place, allowing you to work on the rest of your design without worrying about messing up a perfectly positioned background. When you need to make a change, just click the lock icon again to unlock it. Grouping and locking are the secret handshakes of efficient design—they keep your workspace organized and ensure you never lose that perfect arrangement again.</p>"
        },
        {
            id: 'canva-level-13',
            title: 'Using Grids and Frames',
            description: 'Discover how to use grids and frames to create perfectly aligned photo collages and stylishly cropped images.',
            xp: 184,
            coins: 22,
            content: "<h3>Using Grids and Frames</h3><p>Ever wonder how professionals create those perfectly aligned photo collages or stylishly cropped images? The answer is simple: Grids and Frames. These aren't just decorative elements; they're powerful layout tools that provide structure and elegance to your designs. A Frame is essentially a placeholder for an image, a little digital window with a specific shape. They come in a variety of styles, from basic circles and squares to letters of the alphabet and abstract shapes. To use one, simply click it from the Elements tab, and it will appear on your canvas. Then, drag and drop any image directly from your library into the frame. The image will automatically clip to fit perfectly inside the frame’s shape—no manual cropping required! This is a magical feature that can instantly make your designs look polished and professional.</p><p>Grids, on the other hand, are designed for multi-photo layouts. Think of a grid as a pre-designed container with multiple, pre-defined photo boxes. You can find them in the Elements tab. Once you select a grid, it will fill your entire canvas. Then, you can drag and drop images into each section of the grid. This is perfect for creating photo collages, mood boards, or even a sleek, multi-image design for a website banner. You can even adjust the spacing between the photos and change the color of the grid borders. Mastering grids and frames is the ultimate productivity hack for anyone who works with multiple images, saving you from the tedious task of manually resizing and aligning each photo. It’s design elegance on autopilot.</p>"
        },
        {
            id: 'canva-level-14',
            title: 'Creating Color Palettes',
            description: 'Learn how to create and manage your color palettes using Canva’s built-in tools.',
            xp: 191,
            coins: 23,
            content: "<h3>Creating Color Palettes</h3><p>A good design is like a well-dressed person—it’s not just about the individual pieces; it’s about how they work together. And nothing brings a design together quite like a cohesive color palette. Canva is an unsung hero when it comes to color, offering several ways to build and manage your palette with ease. The simplest method is using the color picker tool. When you select an element, the color box in the top-left toolbar will not only show you your recent colors but also Photo colors—a genius feature that automatically pulls and suggests colors from any images you have on your canvas. This is a game-changer for creating designs that perfectly match your photos, ensuring a professional and cohesive look.</p><p>For more advanced users, Canva has dedicated color tools that are easily accessible from the Apps tab. The Color Palette Generator (or even a quick search for it) allows you to upload an image, and Canva’s AI will instantly generate a color palette based on the colors in that photo. This is perfect for finding the perfect brand colors from an inspirational image. Another powerful app is the Color Wheel, which helps you find harmonious color combinations like complementary, analogous, and triadic colors. If you’ve ever wondered how designers make color schemes look so intentional, this is the tool they're using. While it can be tempting to just use your favorite color everywhere, taking a moment to build a thoughtful color palette will elevate your designs from amateur to expert, making your work look both intentional and aesthetically pleasing.</p>"
        },
        {
            id: 'canva-level-15',
            title: 'Introduction to Brand Kit (Canva Pro)',
            description: 'Learn how the Brand Kit helps maintain consistency across all your designs.',
            xp: 198,
            coins: 24,
            content: "<h3>Introduction to Brand Kit (Canva Pro)</h3><p>For businesses, content creators, and professional designers, maintaining brand consistency is absolutely essential. Nothing looks less professional than a logo that's slightly the wrong color or a font that’s out of place. This is where the Brand Kit, a premium Canva Pro feature, becomes your new best friend. It’s like a digital locker for your entire brand identity, ensuring that you and your team are always using the correct assets. The Brand Kit allows you to store your brand’s core elements in one easily accessible place on the left-side panel. You can upload and save all your brand logos, including different color variations and transparent versions. No more hunting for the right logo file on your desktop.</p><p>But it gets better. You can also save your official brand colors by adding their specific hex codes. This ensures that your brand’s signature red or corporate blue is always the exact same shade, every single time. The Brand Kit also lets you upload and save your official brand fonts, so you can use them in all your designs without having to manually search for them. This level of organization is crucial for productivity, especially when you’re working on a high volume of content. It guarantees that every social media post, presentation, and marketing flyer you create is perfectly aligned with your brand’s visual identity, reinforcing your professionalism and making your brand instantly recognizable to your audience. The Brand Kit is the ultimate tool for turning a collection of designs into a cohesive, professional portfolio.</p>"
        },
        {
            id: 'canva-level-16',
            title: 'Finding and Using Stock Photos & Videos',
            description: 'How to use Canva’s built-in photo and video library.',
            xp: 205,
            coins: 25,
            content: "<h3>Finding and Using Stock Photos & Videos</h3><p>A picture is worth a thousand words, and in Canva, you have access to a library of millions of them. The Photos and Videos tabs are your keys to unlocking a vast collection of high-quality stock media. This is a massive advantage for creators who don’t have the time or budget for professional photography. The search functionality is remarkably powerful. You can search for specific subjects like \"golden hour beach,\" \"corporate handshake,\" or \"smiling woman drinking coffee,\" and Canva's intelligent search will provide a wide range of options. You can also filter your results by color, orientation (horizontal, vertical, square), or even if it's a static image or a cutout with a transparent background.</p><p>The same applies to videos, which are fantastic for creating dynamic social media posts and presentations. You can find everything from looping animated backgrounds to short clips of people working on laptops. Many of these videos and photos are free, while others are available to Canva Pro subscribers. To use a photo or video, simply click on it, and it will be added to your canvas. You can then resize, crop, or even set it as the background with a single click. The sheer volume and quality of stock media in Canva mean you’ll never have to settle for a bland or low-quality image again. It's like having a professional photographer and videographer on retainer, but for a fraction of the cost.</p>"
        },
        {
            id: 'canva-level-17',
            title: 'Basic Photo Editing: Adjusting & Filtering',
            description: 'How to apply filters and make basic adjustments to photos.',
            xp: 212,
            coins: 26,
            content: "<h3>Basic Photo Editing: Adjusting & Filtering</h3><p>You've found the perfect stock photo, but something isn't quite right. Maybe it's a little too dark or the colors feel a bit flat. There's no need to switch to a complex photo editing program. Canva has a powerful, yet simple, set of photo editing tools built right into the editor. When you select an image and click Edit photo in the top toolbar, you'll open a menu full of options. The Adjust tab is where you’ll find all the basic but essential controls. You can play around with the Brightness to make your photo lighter or darker, the Contrast to make the shadows and highlights pop, and the Saturation to make your colors more vibrant or muted. These three sliders alone can transform a good photo into a great one.</p><p>But the real magic lies in the Filters section. Canva offers a wide variety of preset filters, each with a unique style. With one click, you can give your photo a vintage look, a moody black and white feel, or a bright, vibrant aesthetic. This is a fantastic way to quickly give all the photos in your design a consistent look and feel. What’s even better is that each filter can be adjusted with a simple slider, allowing you to control the intensity of the effect. For those who want more control, the Effects tab offers tools like Autofocus to blur the background and Duotone to apply a stunning two-color effect. Learning to use these basic editing tools is a professional skill that will elevate the quality of your designs, giving them a polished, intentional look without ever leaving the Canva platform.</p>"
        },
        {
            id: 'canva-level-18',
            title: 'Cropping and Resizing Images',
            description: 'Learn to crop and resize images for better composition and layout.',
            xp: 219,
            coins: 27,
            content: "<h3>Cropping and Resizing Images</h3><p>The perfect image can sometimes be just a bit too big, too small, or have distracting elements you need to get rid of. Thankfully, Canva makes cropping and resizing images a breeze. To Resize an image, simply click on it and drag one of the four corner handles. This will scale the image up or down, but be careful not to stretch it from the side handles, as this will distort the image and make it look squished or stretched out. For those who want more control over the dimensions, the top toolbar also shows the image’s width and height in pixels, which you can manually edit.</p><p>Cropping is an essential skill for focusing on the most important part of an image. You can either double-click on the image or click the Crop button in the top toolbar. A new set of handles will appear around the image. You can then drag these handles to cut out any unwanted parts of the photo. This is perfect for removing photobombers from the background or trimming an image to fit a specific layout. Once you have the image cropped to your liking, click Done to apply the changes. The best part is that Canva is non-destructive, meaning you can always double-click the image again to access the original, un-cropped version. This gives you the freedom to experiment without fear of permanently losing your original image.</p>"
        },
        {
            id: 'canva-level-19',
            title: 'Transparency and Blending Modes',
            description: 'Learn to use transparency and blending modes to create layered effects.',
            xp: 226,
            coins: 28,
            content: "<h3>Transparency and Blending Modes</h3><p>Transparency is a subtle but powerful tool that can give your designs a sophisticated, layered look. It allows you to make an element partially see-through, letting the element or background behind it show through. You can control the Transparency of any element—a shape, a photo, or even a text box—by selecting it and adjusting the checkerboard icon (next to the position icon) in the top toolbar. A slider will appear, allowing you to set the transparency level from 0% (completely invisible) to 100% (fully opaque). This is a fantastic way to create a watermark on a document, add a subtle colored overlay to a photo to match your brand, or create a cool, semi-transparent text effect.</p><p>For more advanced layering, Canva offers Blending modes (a Pro feature). Blending modes change how an element’s colors interact with the colors of the layers behind it. Think of it as a magical filter for your layers. The Multiply blending mode, for instance, darkens the colors, while Screen makes them lighter. Overlay and Soft Light are great for creating subtle, professional effects that look like they were made in a high-end design program. The easiest way to learn blending modes is to simply experiment with them. Play around with applying different modes to a colored shape on top of a photo, and watch how the colors magically mix and combine. It’s an advanced technique that, once mastered, will add a new level of professional polish to your designs.</p>"
        },
        {
            id: 'canva-level-20',
            title: 'Working with Gradients',
            description: 'Learn to create and customize gradients for backgrounds and elements.',
            xp: 233,
            coins: 29,
            content: "<h3>Working with Gradients</h3><p>Flat, solid colors are nice, but if you want to add depth, dimension, and a modern feel to your designs, you need to use gradients. A gradient is a smooth transition from one color to another. Canva makes using them incredibly easy, offering a variety of pre-made gradients as well as giving you the power to create your own. The easiest way to find them is to search for \"gradients\" in the Elements tab. You'll find a massive collection of gradient shapes, backgrounds, and graphics.</p><p>To customize a gradient, simply select it, and the color boxes will appear in the top-left toolbar. Click on a color box to change one of the gradient's colors. You can choose from your document colors or create a new custom color. This is a fantastic way to match a gradient to your brand’s color palette. For more advanced users, you can find a Gradient app in the apps tab. This allows you to create your own gradients from scratch, choosing the colors, direction, and type (linear or radial). Gradients are a versatile design tool; you can use a subtle gradient as a background, as a color overlay on a photo, or even as a fill for a text box to make your words pop. Mastering gradients is a fun way to add a dynamic, professional, and visually appealing touch to your designs.</p>"
        },
        {
            id: 'canva-level-21',
            title: 'The Power of Magic Eraser (Canva Pro)',
            description: 'Learn how to use the Magic Eraser to remove unwanted elements from your photos.',
            xp: 240,
            coins: 30,
            content: "<h3>The Power of Magic Eraser (Canva Pro)</h3><p>Ever taken a perfect photo only to have it ruined by a stray object, a random person in the background, or an unsightly power line? In the past, this was a job for a professional photo editor, involving complex software and a steep learning curve. But in the magical world of Canva Pro, we have the Magic Eraser. This tool is so good, it feels like cheating. It’s an AI-powered feature that allows you to effortlessly remove unwanted elements from your photos with just a few strokes. To use it, simply select an image on your canvas, click Edit photo in the top toolbar, and then choose Magic Eraser from the Effects menu. Your cursor will turn into a customizable brush. Now, here's the fun part: just paint over the object you want to erase.</p><p>The AI will analyze the surrounding pixels and, in a matter of seconds, intelligently fill in the space, making the unwanted object disappear as if it were never there. Want to remove a person from a scenic beach photo? Paint over them. Need to get rid of a distracting sign in your product shot? Poof, it's gone. The tool is incredibly intuitive and works best on objects that are clearly separated from the main subject. While it may not be perfect for every single scenario, for most common use cases, it performs so well that you'll feel like a professional photo retoucher. The Magic Eraser is a phenomenal productivity tool that saves you from having to take multiple photos or pay for expensive software. It truly embodies Canva's mission to make advanced design tools accessible to everyone.</p>"
        },
        {
            id: 'canva-level-22',
            title: 'The One-Click Background Remover (Canva Pro)',
            description: 'Learn how to use the Background Remover to isolate subjects from their background.',
            xp: 247,
            coins: 31,
            content: "<h3>The One-Click Background Remover (Canva Pro)</h3><p>Before Canva, removing the background from a photo was a painful, tedious process. It involved manually tracing around your subject with a tool, often resulting in jagged, unprofessional edges. But with Canva's Background Remover, all of that frustration is gone. This tool is a single-click solution that uses powerful AI to instantly detect and isolate the main subject of your photo, leaving you with a clean, transparent background. To use it, just select the image you want to edit, click Edit photo in the top toolbar, and choose the Background Remover button from the Effects menu. The magic happens in seconds; the background disappears, leaving only your subject.</p><p>This feature is a total game-changer for a variety of tasks. Need to create a stunning product photo for your online store? Simply take a picture of your product and remove the distracting background. Want to create a professional-looking headshot for your LinkedIn profile? Snap a selfie and remove the cluttered room behind you. The Background Remover is also incredibly useful for creating layered designs, mockups, or composite images, allowing you to seamlessly place a subject on any background you choose. While the tool is a Pro feature, its ability to save time and produce high-quality results makes the subscription worth it for anyone who frequently works with images. It’s a testament to the power of AI in making advanced design techniques accessible to everyone, no matter their skill level.</p>"
        },
        {
            id: 'canva-level-23',
            title: 'Text Effects: Curve, Neon, Shadow, and more',
            description: 'Explore advanced text effects to make your typography stand out.',
            xp: 254,
            coins: 32,
            content: "<h3>Text Effects: Curve, Neon, Shadow, and more</h3><p>Basic text is functional, but professional-grade text effects are what make your designs pop. Canva’s Effects button in the top toolbar is your secret weapon for transforming plain words into visual masterpieces. Once you’ve selected a text box, click Effects, and a world of creative possibilities will open up. One of the most popular effects is Curve, which allows you to bend your text into a perfect arc. You can adjust the curvature with a simple slider, making it perfect for logos, circular seals, or designs that need to follow a specific shape. It’s a nostalgic nod to classic design and a fantastic way to add a unique flair to your typography.</p><p>But the fun doesn't stop there. You can also add a Shadow to your text to make it stand out from the background, and customize its offset, direction, and color. The Neon effect gives your text a vibrant, glowing edge that’s perfect for party invitations or nightclub flyers. For a sleek, modern look, the Splice effect creates a cool outline with a shadow, giving your text a professional, layered appearance. And for a more subtle touch, Lift adds a soft glow behind your text, while Hollow makes your letters appear empty, leaving only the outline. All of these effects are non-destructive, meaning you can easily remove or change them at any time. The ability to manipulate text in so many creative ways is what elevates a basic design to a professionally polished and memorable piece of art.</p>"
        },
        {
            id: 'canva-level-24',
            title: 'Animated Elements & Stickers',
            description: 'Learn to use animated elements and stickers to bring your designs to life.',
            xp: 261,
            coins: 33,
            content: "<h3>Animated Elements & Stickers</h3><p>In the world of social media, static content can be easily overlooked. To capture a fleeting moment of attention, you need to add movement. This is where Canva's animated Elements and Stickers become invaluable. Tucked away in the Elements tab, you'll find a massive collection of animated graphics and GIFs that can bring your designs to life. Simply search for a term like \"arrow,\" \"heart,\" or \"sale,\" and filter your results by selecting Animated. You'll discover a world of dancing, winking, and bouncing graphics that can add personality and energy to your designs.</p><p>Stickers are a particularly fun and easy way to add movement. They are short, looping animations that are perfect for Instagram Stories or social media posts. The beauty of these elements is that they are all high-quality and automatically loop, so you don't have to worry about video editing. To use one, just click on it, and it will be added to your canvas. When you download your design, make sure to save it as a GIF or MP4 video to preserve the animation. Adding just a single animated element can make your content stand out in a crowded social media feed. It's a simple, effective, and fun way to add a professional, dynamic touch to your digital creations, turning a simple graphic into an engaging visual story.</p>"
        },
        {
            id: 'canva-level-25',
            title: 'Simple Video Creation in Canva',
            description: 'Discover how to create simple videos using Canva’s intuitive video editor.',
            xp: 268,
            coins: 34,
            content: "<h3>Simple Video Creation in Canva</h3><p>Gone are the days when video editing was reserved for those with a film school degree. Canva has democratized video creation, making it so simple that anyone can create professional-looking videos for social media, presentations, or personal projects. The process is remarkably intuitive. You can start with a video template, a blank video canvas, or by simply adding video clips to your existing design. You'll find a vast library of stock video clips in the Videos tab, and you can also upload your own. Once a video clip is on your canvas, you can easily trim it to the perfect length by dragging the clip's ends in the timeline at the bottom of the editor.</p><p>Canva's video editor offers a streamlined approach. You can add multiple video clips to different pages of your design, creating a multi-scene video. You can also add text, animated elements, and graphics on top of your video clips. The timeline at the bottom of the editor allows you to see all your video pages in order, making it easy to rearrange or delete them. This simple, user-friendly interface is perfect for creating short, punchy videos like Instagram Reels, TikToks, or quick video ads. While it may not have the complexity of a professional video editing suite, it has all the essential tools you need to create engaging video content without a steep learning curve. It’s video editing for the rest of us.</p>"
        },
        {
            id: 'canva-level-26',
            title: 'Adding Audio and Music to Your Designs',
            description: 'Learn to add audio and music to your videos and presentations.',
            xp: 275,
            coins: 35,
            content: "<h3>Adding Audio and Music to Your Designs</h3><p>A video without sound is like a movie without a soundtrack—it’s missing a crucial element. In Canva, adding audio and music to your videos is just as easy as adding a photo. The Audio tab on the left-side panel provides access to a huge library of royalty-free music and sound effects. You can search for a specific genre, mood, or instrument to find the perfect track for your video. Whether you need a high-energy pop track for a video ad or a calming piano piece for a meditation clip, you'll find it here. Many of the tracks are free, while a vast selection is available to Canva Pro subscribers.</p><p>To add a track, just click on it, and it will appear on your project timeline at the bottom of the editor. You can then trim the audio clip to match the length of your video, and even adjust its volume or fade it in and out. If you have your own audio files, you can upload them using the Uploads tab just like you would with an image. The beauty of Canva's audio editor is its simplicity. You don't need to be an audio engineer to add professional-quality music to your creations. The platform handles all the technical aspects, so you can focus on the creative. Adding the right music can set the mood, tell a story, and make your videos significantly more engaging.</p>"
        },
        {
            id: 'canva-level-27',
            title: 'Understanding and Using Magic Animate',
            description: 'Learn how to use Magic Animate to add motion to your designs with a single click.',
            xp: 282,
            coins: 36,
            content: "<h3>Understanding and Using Magic Animate</h3><p>Why let your designs just sit there when they can move and breathe? Magic Animate is a fantastic tool that adds movement to your entire design with just a single click. Instead of animating each individual element one by one, Magic Animate provides a variety of pre-set animation styles that you can apply to your whole page. To use it, simply click on the Animate button in the top toolbar. A new panel will appear with a variety of preset animations, each with its own unique feel. You can choose a professional slide-in effect for a presentation, a fun \"Tumble\" animation for a social media post, or a subtle \"Breathe\" effect that adds a gentle, pulsing movement to your design.</p><p>The best part is that Canva intelligently animates your elements based on the style you choose, so you don’t have to do any of the hard work. You can preview the animation with a single click, and if you don't like it, you can just pick a different one. When you download your design, be sure to choose a video format like MP4 or GIF to preserve the animation. Magic Animate is perfect for giving life to your presentations, creating dynamic social media posts, or turning a static image into a short, engaging video. It's a testament to how Canva uses automation to make advanced creative techniques accessible to everyone, no matter their skill level.</p>"
        },
        {
            id: 'canva-level-28',
            title: 'Introduction to Magic Studio and AI',
            description: 'Discover the suite of AI-powered tools in Magic Studio.',
            xp: 289,
            coins: 37,
            content: "<h3>Introduction to Magic Studio and AI</h3><p>Canva's ambition is not just to be a design tool but to be a creative powerhouse powered by artificial intelligence. This vision is encapsulated in Magic Studio, a suite of AI-powered tools that are designed to supercharge your creativity and productivity. Instead of thinking of AI as a replacement for human creativity, think of it as a helpful co-pilot. Magic Studio brings together some of the most advanced AI features, many of which were previously isolated, into one central hub. From the intuitive Background Remover to the intelligent Magic Eraser, these tools use complex algorithms to perform tasks that would have taken hours in the past, all with a single click.</p><p>But Magic Studio goes beyond just photo editing. It includes powerful tools for text and image generation, content scheduling, and animation. These AI features are designed to handle the tedious, repetitive parts of the design process, freeing up your time to focus on what you do best: being creative. As a user, you’ll find these AI tools integrated seamlessly into the design flow, so you don’t have to switch between different apps or learn complex new interfaces. Magic Studio represents the future of design—a world where AI enhances human creativity, making professional-quality results achievable for everyone.</p>"
        },
        {
            id: 'canva-level-29',
            title: 'Magic Write: AI-Powered Text Generation',
            description: 'Learn how to use Magic Write to generate engaging copy in seconds.',
            xp: 296,
            coins: 38,
            content: "<h3>Magic Write: AI-Powered Text Generation</h3><p>Writer's block is a real and frustrating obstacle for many creators. You have a great design, but you're stuck on what to write. Enter Magic Write, Canva's AI-powered text generator that can help you create engaging copy in seconds. This tool is a lifesaver for anyone who needs to write headlines, social media captions, blog outlines, or short paragraphs but can't find the right words. To use it, simply open a text box, click the Magic Write button, and type in a brief prompt or question. For example, you can write \"Write a fun social media caption about a new coffee shop opening.\"</p><p>The AI will then generate several options for you to choose from. You can also use Magic Write to brainstorm ideas, rephrase a sentence to be more engaging, or even summarize a long piece of text. The AI's ability to generate relevant and creative text is surprisingly good, and it can give you a starting point to build upon. While the text it generates may not be perfect, it’s a fantastic way to overcome a creative hurdle and get a project moving forward. Magic Write is a testament to how Canva is not just a visual tool but a complete creative ecosystem that helps you with every part of the design process, from the first word to the final image.</p>"
        },
        {
            id: 'canva-level-30',
            title: 'Text to Image: Creating Art with AI',
            description: 'Learn to generate unique, AI-created images from a simple text description.',
            xp: 303,
            coins: 39,
            content: "<h3>Text to Image: Creating Art with AI</h3><p>You have an idea for an image in your head, but you can't find it in Canva's photo library, and you don’t have time to create it from scratch. What if you could just type your idea and have an image magically appear? That's exactly what Text to Image does. This revolutionary AI tool, found in the Apps tab or the Magic Studio suite, allows you to generate completely unique, AI-created images from a simple text description. You can type something as simple as \"a cat wearing a top hat and drinking tea\" or as complex as \"an old-fashioned library with mystical floating books and a moody, dark color palette.\"</p><p>The AI will then generate several different image options based on your prompt, often in styles that you can choose from, such as \"photo,\" \"digital art,\" or \"watercolor.\" While the results can be a little unpredictable (and sometimes delightfully weird), the tool's ability to create custom, unique visuals is a game-changer. It's perfect for when you need a specific, niche image for a blog post, a presentation, or social media that you can't find anywhere else. The Text to Image tool is a glimpse into the future of creativity, where your imagination is the only limit, and AI is the brush. It's a fantastic way to experiment and add a truly unique, artistic touch to your designs.</p>"
        },
        {
            id: 'canva-level-31',
            title: 'Designing for Social Media: Correct Sizing',
            description: 'Learn the importance of correct sizing for different social media platforms.',
            xp: 310,
            coins: 40,
            content: "<h3>Designing for Social Media: Correct Sizing</h3><p>In the world of social media, one size definitely does not fit all. If you’ve ever uploaded a perfectly-designed graphic to Facebook, only to see it horribly cropped and distorted on Instagram, you know this pain. Each social media platform has its own specific dimensions for posts, stories, and headers, and if you don’t adhere to them, your beautiful design will look like a rookie mistake. Thankfully, Canva has solved this problem with its vast library of templates, all pre-sized to perfection. Instead of starting with a custom size, you can simply search for \"Instagram Post\" or \"Facebook Cover,\" and Canva will give you a canvas that's already perfectly optimized.</p><p>For instance, an Instagram post is a square (1080 x 1080 pixels), a story is a vertical rectangle (1080 x 1920 pixels), and a Pinterest Pin is a longer vertical rectangle (1000 x 1500 pixels). Trying to eyeball these dimensions is a recipe for disaster. Using the right template not only ensures your design looks good but also prevents the platform's algorithms from compressing your image and reducing its quality. You can even use the Magic Switch feature (a Pro tool) to instantly resize a single design to fit multiple platforms. This is a massive time-saver for anyone managing social media for a brand. A professional design starts with the correct dimensions, so let Canva handle the tricky math and focus on the creative.</p>"
        },
        {
            id: 'canva-level-32',
            title: 'Creating Engaging Instagram Stories and Reels',
            description: 'Learn how to create engaging Instagram Stories and Reels using Canva’s video and animation tools.',
            xp: 317,
            coins: 41,
            content: "<h3>Creating Engaging Instagram Stories and Reels</h3><p>Instagram Stories and Reels are no longer just a trend—they're a powerful way to connect with your audience. They're quick, dynamic, and have a unique, in-the-moment feel that standard posts often lack. Creating them in Canva is a breeze, especially since the platform's video and animation tools are so intuitive. To get started, choose the \"Instagram Story\" or \"Reel\" template, which is perfectly sized for vertical, full-screen viewing. The key to an engaging Reel or Story is movement. You can add animated text effects, use animated stickers from the Elements tab, or even incorporate short video clips from Canva’s massive library.</p><p>A common pro-level technique is to create a multi-page story. You can design each page as a single \"scene,\" adding different text, graphics, and video clips. When you download the entire project as an MP4 video, Canva will stitch all the pages together into a single, seamless video. You can even add a soundtrack from the Audio tab to set the mood. The best part is that you can do all of this right from your desktop, creating a polished piece of content that looks like it was made with a professional video editing suite, but without any of the headache. For a social media marketer or a content creator, mastering Stories and Reels in Canva is a non-negotiable skill.</p>"
        },
        {
            id: 'canva-level-33',
            title: 'Designing Logos, Brand Boards, and Visual Identity',
            description: 'Learn to design logos, create brand boards, and establish a cohesive visual identity.',
            xp: 324,
            coins: 42,
            content: "<h3>Designing Logos, Brand Boards, and Visual Identity</h3><p>A logo is more than just a picture; it's the face of your brand. In Canva, you don’t need a degree in graphic design to create a professional-looking logo that's memorable and unique. The Logo template category is a great starting point, offering thousands of professionally designed layouts. You can then customize a template by changing the colors, fonts, and icons to match your brand's personality. Remember, a great logo is simple, versatile, and instantly recognizable. It should look good in black and white, in a small icon, and on a giant billboard.</p><p>Once you have a logo, you can take your brand identity to the next level by creating a Brand Board. A brand board is a single-page document that includes your logo, a clear color palette (with hex codes), and your primary and secondary fonts. It's like a style guide for your brand, ensuring that every design you or your team creates is consistent. You can then use the Brand Kit (Pro feature) to store all of these assets for easy access. Designing a visual identity in Canva is about creating a cohesive look and feel that tells your brand's story. It's a fundamental step in building a professional brand that customers will remember and trust.</p>"
        },
        {
            id: 'canva-level-34',
            title: 'Business Cards, Letterheads, and Marketing Materials',
            description: 'Learn to create a suite of consistent marketing materials for your business.',
            xp: 331,
            coins: 43,
            content: "<h3>Business Cards, Letterheads, and Marketing Materials</h3><p>For a business, a strong visual identity goes beyond a logo; it extends to every piece of branded material. Canva makes it incredibly easy to create a suite of consistent marketing collateral that looks like it came from a high-end design agency. In the template library, you'll find professionally designed layouts for business cards, flyers, posters, brochures, and letterheads. The beauty of using these templates is that they are already sized correctly for printing and are designed to be visually appealing.</p><p>To ensure consistency, you can simply paste your logo and brand colors into each design. If you have a Brand Kit (Pro feature), this is even faster, as all your assets are just a click away. Canva's templates provide a great starting point, but you can customize every element—from the text and images to the background and layout—to perfectly match your brand's personality. When you're finished, the Download button offers a high-quality PDF Print option, which is perfect for sending to a professional printing service. With Canva, a one-person startup can create a suite of marketing materials that rivals a Fortune 500 company's, ensuring a professional look for every customer interaction.</p>"
        },
        {
            id: 'canva-level-35',
            title: 'Creating Professional Presentations',
            description: 'Learn to create professional presentations with dynamic elements and animations.',
            xp: 338,
            coins: 44,
            content: "<h3>Creating Professional Presentations</h3><p>Death by PowerPoint is a real phenomenon, and a professional-looking presentation can make all the difference in a business meeting, a classroom, or a sales pitch. Canva's presentation templates are designed to be visually engaging and easy to edit, making them a refreshing alternative to traditional software. You can choose from a huge variety of styles, from sleek and minimalistic to fun and creative. The templates are already set up with multiple pages, so you can easily fill in your content, and Canva’s Magic Switch feature (Pro) can even convert your design into a standard 16:9 presentation format.</p><p>The secret to a great Canva presentation is the use of dynamic elements. You can add animated text, short video clips, or even looping backgrounds to keep your audience's attention. The Magic Animate feature can apply a consistent, stylish animation to every slide with a single click. When it’s time to present, you can click the Present button in the top-right corner to view your slides in full-screen, with smooth transitions. For a more interactive experience, you can even use the Presenter View to see your speaker notes while the audience only sees the slides. A Canva presentation is more than just a slideshow; it's a visual story that engages your audience and makes your message memorable.</p>"
        },
        {
            id: 'canva-level-36',
            title: 'Designing E-book and Lead Magnet Covers',
            description: 'Learn to design e-book and lead magnet covers that capture attention.',
            xp: 345,
            coins: 45,
            content: "<h3>Designing E-book and Lead Magnet Covers</h3><p>For online businesses and content creators, a lead magnet—like a free e-book or a guide—is a powerful tool for building an email list. The cover is the first thing a potential subscriber sees, and it needs to be professional and enticing. Thankfully, Canva offers an extensive library of templates specifically for e-book and magazine covers, which can easily be repurposed for your lead magnet. These templates are designed with eye-catching typography, compelling layouts, and a professional look that will make your guide seem valuable.</p><p>The process is simple: choose a cover template you like and customize it with your own title, author name, and a relevant image. You can also use a mockup to show what your e-book would look like on a tablet or a computer screen, adding a professional touch to your promotional materials. To make the full e-book, you can simply add more pages to your design, using a consistent layout and your brand colors. When you’re finished, you can download the entire document as a PDF Standard, which is perfect for sharing online. A great e-book cover is a powerful marketing asset, and Canva provides all the tools you need to create one without hiring a professional designer.</p>"
        },
        {
            id: 'canva-level-37',
            title: 'Creating Infographics',
            description: 'Learn to create infographics that present complex data in a visually appealing format.',
            xp: 352,
            coins: 46,
            content: "<h3>Creating Infographics</h3><p>In an age of information overload, infographics are a fantastic way to present complex data in a visually appealing and easy-to-digest format. They combine text, icons, and charts to tell a story with data. Creating them in Canva is a breeze, especially since the platform offers a wealth of Infographic templates. These templates are already laid out with visual hierarchies, making it easy to plug in your own data and content. You can find infographics for timelines, flowcharts, data visualization, and more.</p><p>The secret to a great infographic is simplicity and clarity. You can use icons from the Elements tab to represent concepts, which makes the information more scannable. Canva’s built-in Charts tool allows you to create beautiful bar charts, pie charts, and line graphs directly from your data. You can simply enter your numbers into a spreadsheet-like interface, and Canva will automatically generate a clean, professional chart. The colors and fonts of the chart will automatically match your design, ensuring a cohesive look. An infographic is a powerful marketing tool, and Canva gives you all the tools to turn boring data into a compelling visual story that people will want to share.</p>"
        },
        {
            id: 'canva-level-38',
            title: 'Working with Charts and Graphs',
            description: 'Learn to create beautiful, professional-looking data visualizations directly within your design.',
            xp: 359,
            coins: 47,
            content: "<h3>Working with Charts and Graphs</h3><p>Presenting data is often a dry affair, but charts and graphs can make your statistics come to life. Canva’s built-in Charts tool is a lifesaver, allowing you to create beautiful, professional-looking data visualizations directly within your design. To get started, go to the Elements tab and search for \"Charts.\" You'll find a variety of options, including bar charts, pie charts, line graphs, and more. Click on one to add it to your canvas. A simple spreadsheet-like panel will appear on the left, where you can enter your data. As you type, the chart will automatically update in real-time.</p><p>What makes Canva’s charts so great is their customization. You can easily change the colors of the bars or slices to match your brand palette, adjust the font and size of the labels, and even add a title to your chart. This allows you to create a visualization that is not only accurate but also visually consistent with the rest of your design. Whether you’re creating a quarterly report, an academic presentation, or a data-driven blog post, Canva’s charts tool makes the process of data visualization seamless and even a little bit fun. It’s a professional-grade feature that's so easy to use, you’ll wonder why you ever did charts any other way.</p>"
        },
        {
            id: 'canva-level-39',
            title: 'Understanding and Using Mockups',
            description: 'Learn to use mockups to showcase your designs in a real-world setting.',
            xp: 366,
            coins: 48,
            content: "<h3>Understanding and Using Mockups</h3><p>A mockup is a visual representation of how your design would look in a real-world setting. It's a powerful marketing tool that helps potential customers visualize a product, and it gives your designs a professional, polished look. Instead of just showing a flat image of a t-shirt design, you can show it on a person, or instead of a simple flat book cover, you can show it on a tablet screen. Canva's Mockups tool is found under the Edit Photo menu (or by searching for Mockups in the Apps tab) and it's remarkably easy to use.</p><p>To use it, simply select an image on your canvas—it could be a logo, a t-shirt design, or a phone wallpaper. Then, click Edit Photo and choose Mockups from the menu. You'll see a variety of categories, including technology, print, apparel, and home & living. Select a mockup (e.g., a t-shirt), and your design will automatically be placed on the object in a professional, realistic way. You can even adjust its position and size to get it just right. This feature is a total game-changer for selling products, creating professional portfolio pieces, or presenting a new brand identity to a client. It's the perfect way to take your design from a flat image to a compelling visual asset.</p>"
        },
        {
            id: 'canva-level-40',
            title: 'Preparing Your Designs for Print',
            description: 'Learn how to prepare your designs for professional printing using Canva’s PDF Print option.',
            xp: 373,
            coins: 49,
            content: "<h3>Preparing Your Designs for Print</h3><p>Creating a design for the web is one thing, but preparing a file for professional printing is a completely different beast. Printers require very specific file types, resolutions, and color settings. Thankfully, Canva simplifies this process with its PDF Print download option. When you're ready to download a file for a professional printer (like a business card or a flyer), click Share and then Download. Under File type, choose PDF Print. This option automatically converts your design to a high-quality, high-resolution PDF with the correct color profile (CMYK) that printers require.</p><p>For even more control, you can check the box for Crop marks and bleed. This adds thin lines and a small margin around your design, which tells the printer exactly where to cut the paper and ensures that your design extends to the very edge without any white borders. This is a crucial step for a professional look. Canva also offers a Canva Print service where you can order prints directly from your design, which guarantees that the file is perfectly formatted for their machines. By understanding the basics of print preparation, you can ensure that your beautiful digital design translates flawlessly into a stunning physical product.</p>"
        },
        {
            id: 'canva-level-41',
            title: 'The Content Planner for Social Media (Canva Pro)',
            description: 'Learn how to use the Content Planner to schedule your social media content directly from Canva.',
            xp: 380,
            coins: 50,
            content: "<h3>The Content Planner for Social Media (Canva Pro)</h3><p>For social media managers and content creators, staying on top of a content calendar can feel like a full-time job in itself. The days of creating a post and then manually uploading it to multiple platforms are over, thanks to Canva’s built-in Content Planner. This is a professional-grade productivity tool that allows you to design your social media content and schedule it to be published directly from Canva. It's a game-changer that streamlines your entire workflow, saving you from having to use separate scheduling software. To access the planner, simply navigate to the Content Planner link on your home dashboard's left-side panel.</p><p>The planner itself is a clean, calendar-like interface. You can click on any date to schedule a new post. When you select a date, you can choose a design you’ve already created or create a new one on the spot. Once you’ve selected your design, you'll be able to write your caption, add hashtags, and choose the social media platform you want to publish it to (including Instagram, Facebook, Pinterest, LinkedIn, and more). You can even schedule the exact time of publication. For teams, this feature is invaluable, as it provides a clear, shared calendar of all upcoming content, ensuring everyone is on the same page. The Content Planner is a powerful example of how Canva has evolved from a simple design tool into a comprehensive platform that supports the entire content creation process.</p>"
        },
        {
            id: 'canva-level-42',
            title: 'Bulk Create: Designing at Scale (Canva Pro)',
            description: 'Learn how to automatically generate multiple designs from a single template and a spreadsheet of data.',
            xp: 387,
            coins: 51,
            content: "<h3>Bulk Create: Designing at Scale (Canva Pro)</h3><p>Imagine you need to create 50 unique social media posts for a daily affirmations series, a hundred personalized certificates for an awards ceremony, or a dozen business cards with different names and phone numbers. The thought of manually creating each one is enough to give anyone a headache. This is where the Bulk Create feature, a true marvel of automation, comes in. This tool allows you to automatically generate multiple designs from a single template and a spreadsheet of data. It’s like having a team of robots handle the tedious parts of your work.</p><p>To use it, you'll need to prepare a simple CSV or Excel file with all your variable data (e.g., names, dates, quotes). Then, in Canva, select a template for your design, right-click on the elements you want to replace with your data, and click Connect Data. You can connect a name, a date, or any other piece of text. Then, you simply select your spreadsheet, and with a single click, Canva will generate a separate design for each row of data in your file. This is an absolute game-changer for anyone who needs to produce a large volume of personalized or repetitive content. The Bulk Create feature proves that Canva isn't just about beautiful designs; it's also about incredible productivity.</p>"
        },
        {
            id: 'canva-level-43',
            title: 'Building Simple Websites with Canva',
            description: 'Learn to build simple, one-page websites with Canva.',
            xp: 394,
            coins: 52,
            content: "<h3>Building Simple Websites with Canva</h3><p>While Canva is known for social media and presentations, it has also expanded its capabilities to allow users to build simple, one-page websites. No coding required! This feature is perfect for creating a landing page for a new product, a portfolio for a freelancer, or an event invitation that’s more dynamic than a static page. To get started, simply search for \"website\" in the template library, and you’ll find a variety of professionally designed layouts. Once you choose a template, you can customize it just like any other Canva design, changing the text, images, and colors to match your brand.</p><p>The magic happens when you publish. Once your design is complete, click the Share button and choose Website. You can then select a simple navigation style, such as a one-page scrolling site. Canva will automatically generate a link that you can share with anyone. It's not a full-featured website builder like WordPress or Wix, but for a quick, elegant, and mobile-responsive website, it’s a brilliant solution. It evenoffers Free Domain and Use My Existing Domain (Pro feature) options. This feature is a testament to Canva’s vision of becoming a one-stop-shop for all visual communication, allowing users to effortlessly take their designs from digital pages to a live website.</p>"
        },
        {
            id: 'canva-level-44',
            title: 'Creating Interactive PDF Documents',
            description: 'Learn to create interactive PDFs with clickable links.',
            xp: 401,
            coins: 53,
            content: "<h3>Creating Interactive PDF Documents</h3><p>In a world of digital-first content, a static PDF can feel a bit... lifeless. But what if your PDF could be interactive, with clickable links that send your audience to your website, a product page, or a social media profile? Canva makes this easy. The key to creating an interactive PDF is to add links to your design elements. Simply select any element—a text box, a button, or an image—and click the Link button (it looks like a chain link) in the top toolbar. You can then paste the URL you want to link to.</p><p>Once you have added all your links, you need to download the file correctly. When you click Share and Download, make sure you choose the PDF Standard option. This format will preserve all of your clickable links. If you were to choose the PDF Print option, the links would be removed as they are not needed for a physical copy. Creating an interactive PDF is perfect for e-books with a call to action, digital brochures with links to products, or resumes that link to your online portfolio. It’s a simple feature that adds a new level of professionalism and functionality to your documents.</p>"
        },
        {
            id: 'canva-level-45',
            title: 'Mastering Keyboard Shortcuts',
            description: 'Learn keyboard shortcuts to speed up your design workflow.',
            xp: 408,
            coins: 54,
            content: "<h3>Mastering Keyboard Shortcuts</h3><p>You’ve mastered the interface, but now it’s time to become a true power user. The fastest way to elevate your workflow is by mastering keyboard shortcuts. While they may seem intimidating at first, they can shave hours off your design time and make the entire process feel more fluid. Instead of constantly moving your mouse between the canvas and the left-side panel, you can use a few key presses to instantly add elements to your design.</p><ul><li>T: Adds a text box. It's the most common shortcut for a reason.</li><li>R: Adds a rectangle.</li><li>C: Adds a circle.</li><li>L: Adds a line.</li><li>Cmd/Ctrl + C: Copies an element.</li><li>Cmd/Ctrl + V: Pastes an element.</li><li>Cmd/Ctrl + D: Duplicates the selected element. This is a game-changer!</li><li>Shift + Click: Selects multiple elements.</li><li>Delete: Deletes the selected element.</li></ul><p>Using these shortcuts will make you feel like a design wizard. Your hands stay on the keyboard, and your eyes stay on your design, allowing you to work with a speed and efficiency that will impress your colleagues and give you more time for that much-needed coffee break.</p>"
        },
        {
            id: 'canva-level-46',
            title: 'Advanced Workflow and Folder Management',
            description: 'Learn to use folders and advanced workflow techniques to manage a high volume of designs.',
            xp: 415,
            coins: 55,
            content: "<h3>Advanced Workflow and Folder Management</h3><p>When you start creating a high volume of designs, your projects list can quickly become a cluttered mess. This is where advanced workflow and folder management become essential. Canva offers a simple but powerful folder system to help you stay organized. On your home dashboard, you can find the Projects tab on the left-side panel. From here, you can create new folders by clicking the Add new button and selecting Folder.</p><p>You can create a folder for each client, project, or type of content (e.g., \"Social Media,\" \"Client X,\" \"Presentations\"). Then, you can simply drag and drop your designs into the appropriate folders. You can also move designs to folders directly from the editor. This system is a lifesaver for anyone working with multiple projects at once. It ensures that you can always find the design you need, when you need it, without having to scroll through a never-ending list of unorganized files. In the world of design, a clean workspace is a productive workspace.</p>"
        },
        {
            id: 'canva-level-47',
            title: 'Magic Switch: Re-sizing Designs in a Click',
            description: 'Learn how to use Magic Switch to instantly resize your designs for different platforms.',
            xp: 422,
            coins: 56,
            content: "<h3>Magic Switch: Re-sizing Designs in a Click</h3><p>Imagine you've just spent hours creating the perfect Instagram post, only to realize you also need a Facebook header, a Pinterest Pin, and a LinkedIn post. Manually recreating the design for each platform, with its different dimensions, is a soul-crushing task. Thankfully, Canva Pro has a magical solution: Magic Switch. This tool allows you to instantly resize a single design into a different format with one click, preserving your layout and elements. It's a massive productivity hack for anyone who works with content for multiple platforms.</p><p>To use it, click the Resize button (a Pro feature) in the top-left of the editor and then choose the new size you want. You can select from popular presets like \"Facebook Cover\" or \"Pinterest Pin,\" or enter your own custom dimensions. Canva's AI will then generate a new copy of your design in the new size, intelligently adjusting the layout and elements to fit. While you may need to make a few minor adjustments, Magic Switch handles 90% of the work for you. It's a game-changer that saves you from repetitive, tedious work and allows you to focus on creating more content, not on resizing it.</p>"
        },
        {
            id: 'canva-level-48',
            title: 'The Power of Templates: Selling Your Designs',
            description: 'Learn how to create and sell your own Canva templates.',
            xp: 429,
            coins: 57,
            content: "<h3>The Power of Templates: Selling Your Designs</h3><p>You’ve mastered Canva, and now you can create stunning, professional-looking designs in your sleep. But did you know that your skills can be a source of income? Canva's vast user base is always looking for new, professional templates to use, and you can create and sell your own. The process is straightforward. First, you create a beautiful, versatile template, making sure to use free fonts and elements so that anyone can use it. Once your template is complete, you can download it as a PDF with a shareable template link.</p><p>You can then sell these templates on marketplaces like Etsy or on your own website. When a customer buys your template, they get a link that allows them to use a copy of your design in their own Canva account. They can then customize it with their own colors, fonts, and content. This is a fantastic passive income opportunity for designers who have mastered the platform. It’s a win-win situation: you create a product once and sell it multiple times, and your customers get a professional template without having to start from scratch.</p>"
        },
        {
            id: 'canva-level-49',
            title: 'Using Canva Apps and Integrations',
            description: 'Explore the Apps tab to connect Canva with other services and supercharge your workflow.',
            xp: 436,
            coins: 58,
            content: "<h3>Using Canva Apps and Integrations</h3><p>Canva is powerful on its own, but its true strength lies in its ability to connect with other services. The Apps tab on the left-side panel is a gateway to hundreds of powerful integrations that can supercharge your workflow. You can find apps that connect Canva to your social media platforms, cloud storage services, and even other design tools. For example, you can connect your Google Photos or Dropbox account to easily access all your images without having to upload them manually.</p><p>There are also apps for advanced functionalities, like generating QR codes, creating a mock-up of your design, or using AI tools like DALL-E and Midjourney to generate unique images from a text prompt. You can also find apps for social media, like the Content Planner or a simple Instagram integration that allows you to post your designs directly to your feed. The Apps tab is constantly being updated with new integrations, so it's a good idea to check it periodically. It's a testament to Canva’s open and collaborative ecosystem, designed to make your creative workflow as seamless as possible.</p>"
        },
        {
            id: 'canva-level-50',
            title: 'Canva for Teams: Advanced Collaboration',
            description: 'Learn how to use Canva for Teams to manage your brand’s visual communication.',
            xp: 443,
            coins: 59,
            content: "<h3>Canva for Teams: Advanced Collaboration</h3><p>For businesses and organizations, collaboration is key. Canva for Teams, a premium subscription, takes the basic collaboration features of the free version and supercharges them. It provides a central workspace where your entire team can share, edit, and comment on designs. It's a single, organized hub for all your brand's visual assets, ensuring everyone is on the same page. The core feature is the shared Brand Kit, which ensures that every single person on your team is using the correct logos, colors, and fonts, maintaining perfect brand consistency across all projects.</p><p>Team members can also create their own projects within the shared workspace, and a team administrator can set permissions and review designs before they are finalized. You can organize all your designs and templates into shared folders, so no one ever has to hunt for a file again. The Content Planner also becomes a shared calendar, allowing the entire team to see what's being scheduled and when. Canva for Teams is more than just a collaboration tool; it's a comprehensive platform for managing a brand's visual communication, ensuring a seamless and efficient workflow from creation to publication. It is the final step in turning your creative hobby into a professional, scalable operation.</p>"
        }
    ]
};

const reelsEditingRoadmap: Roadmap = {
    streamName: 'Reels & Shorts Video Editing',
    levels: [
        {
            id: 'reels-level-1',
            title: 'What Are Reels, Anyway? (And Why Should You Care?)',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 100,
            coins: 10,
            content: "<h3>What Are Reels, Anyway? (And Why Should You Care?)</h3><p>This chapter focuses on the topic: What Are Reels, Anyway? (And Why Should You Care?). We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-2',
            title: 'The Psychology of Short-Form Video: Why Reels Work',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 107,
            coins: 11,
            content: "<h3>The Psychology of Short-Form Video: Why Reels Work</h3><p>This chapter focuses on the topic: The Psychology of Short-Form Video: Why Reels Work. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-3',
            title: 'Getting to Know the Reels Platforms',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 114,
            coins: 12,
            content: "<h3>Getting to Know the Reels Platforms</h3><p>This chapter focuses on the topic: Getting to Know the Reels Platforms. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-4',
            title: 'Shooting Great Footage with a Phone',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 121,
            coins: 13,
            content: "<h3>Shooting Great Footage with a Phone</h3><p>This chapter focuses on the topic: Shooting Great Footage with a Phone. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-5',
            title: 'Lighting 101: How Not to Look Like a Potato',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 128,
            coins: 14,
            content: "<h3>Lighting 101: How Not to Look Like a Potato</h3><p>This chapter focuses on the topic: Lighting 101: How Not to Look Like a Potato. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-6',
            title: 'Framing & Composition: Don’t Crop Your Forehead',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 135,
            coins: 15,
            content: "<h3>Framing & Composition: Don’t Crop Your Forehead</h3><p>This chapter focuses on the topic: Framing & Composition: Don’t Crop Your Forehead. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-7',
            title: 'Audio Basics: Mic Me, Baby One More Time',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 142,
            coins: 16,
            content: "<h3>Audio Basics: Mic Me, Baby One More Time</h3><p>This chapter focuses on the topic: Audio Basics: Mic Me, Baby One More Time. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-8',
            title: 'Editing Apps 101: CapCut, InShot, VN, and More',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 149,
            coins: 17,
            content: "<h3>Editing Apps 101: CapCut, InShot, VN, and More</h3><p>This chapter focuses on the topic: Editing Apps 101: CapCut, InShot, VN, and More. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-9',
            title: 'Intro to Timelines: Chopping It Up',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 156,
            coins: 18,
            content: "<h3>Intro to Timelines: Chopping It Up</h3><p>This chapter focuses on the topic: Intro to Timelines: Chopping It Up. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-10',
            title: 'Adding Music & Syncing to the Beat',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 163,
            coins: 19,
            content: "<h3>Adding Music & Syncing to the Beat</h3><p>This chapter focuses on the topic: Adding Music & Syncing to the Beat. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-11',
            title: 'Text, Captions & Subtitles That Don’t Suck',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 170,
            coins: 20,
            content: "<h3>Text, Captions & Subtitles That Don’t Suck</h3><p>This chapter focuses on the topic: Text, Captions & Subtitles That Don’t Suck. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-12',
            title: 'Stickers, Emojis & Graphics – Less Cringe, More Cool',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 177,
            coins: 21,
            content: "<h3>Stickers, Emojis & Graphics – Less Cringe, More Cool</h3><p>This chapter focuses on the topic: Stickers, Emojis & Graphics – Less Cringe, More Cool. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-13',
            title: 'Export Settings: What the Heck is 1080p?',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 184,
            coins: 22,
            content: "<h3>Export Settings: What the Heck is 1080p?</h3><p>This chapter focuses on the topic: Export Settings: What the Heck is 1080p?. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-14',
            title: 'Posting Your First Reel Without Panic',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 191,
            coins: 23,
            content: "<h3>Posting Your First Reel Without Panic</h3><p>This chapter focuses on the topic: Posting Your First Reel Without Panic. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-15',
            title: 'Beginner Mistakes (and How to Dodge Them)',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 198,
            coins: 24,
            content: "<h3>Beginner Mistakes (and How to Dodge Them)</h3><p>This chapter focuses on the topic: Beginner Mistakes (and How to Dodge Them). We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-16',
            title: 'Understanding the Algorithm',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 205,
            coins: 25,
            content: "<h3>Understanding the Algorithm</h3><p>This chapter focuses on the topic: Understanding the Algorithm. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-17',
            title: 'Hook, Line & Scroll: Keeping Viewers Watching',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 212,
            coins: 26,
            content: "<h3>Hook, Line & Scroll: Keeping Viewers Watching</h3><p>This chapter focuses on the topic: Hook, Line & Scroll: Keeping Viewers Watching. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-18',
            title: 'Transitions: Snap, Spin, Zoom Like a Pro',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 219,
            coins: 27,
            content: "<h3>Transitions: Snap, Spin, Zoom Like a Pro</h3><p>This chapter focuses on the topic: Transitions: Snap, Spin, Zoom Like a Pro. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-19',
            title: 'B-Roll Basics: Because Main Footage is Lonely',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 226,
            coins: 28,
            content: "<h3>B-Roll Basics: Because Main Footage is Lonely</h3><p>This chapter focuses on the topic: B-Roll Basics: Because Main Footage is Lonely. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-20',
            title: 'Editing for Pace & Flow',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 233,
            coins: 29,
            content: "<h3>Editing for Pace & Flow</h3><p>This chapter focuses on the topic: Editing for Pace & Flow. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-21',
            title: 'Color Correction 101: From Meh to Wow',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 240,
            coins: 30,
            content: "<h3>Color Correction 101: From Meh to Wow</h3><p>This chapter focuses on the topic: Color Correction 101: From Meh to Wow. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-22',
            title: 'Sound Effects & Background Audio',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 247,
            coins: 31,
            content: "<h3>Sound Effects & Background Audio</h3><p>This chapter focuses on the topic: Sound Effects & Background Audio. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-23',
            title: 'Working with CapCut Templates',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 254,
            coins: 32,
            content: "<h3>Working with CapCut Templates</h3><p>This chapter focuses on the topic: Working with CapCut Templates. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-24',
            title: 'Creating Branded Reels',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 261,
            coins: 33,
            content: "<h3>Creating Branded Reels</h3><p>This chapter focuses on the topic: Creating Branded Reels. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-25',
            title: 'Remixing & Duets for Trend Power',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 268,
            coins: 34,
            content: "<h3>Remixing & Duets for Trend Power</h3><p>This chapter focuses on the topic: Remixing & Duets for Trend Power. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-26',
            title: 'Scripting & Planning: Spontaneity is a Lie',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 275,
            coins: 35,
            content: "<h3>Scripting & Planning: Spontaneity is a Lie</h3><p>This chapter focuses on the topic: Scripting & Planning: Spontaneity is a Lie. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-27',
            title: 'Voiceovers Without the Robot Vibe',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 282,
            coins: 36,
            content: "<h3>Voiceovers Without the Robot Vibe</h3><p>This chapter focuses on the topic: Voiceovers Without the Robot Vibe. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-28',
            title: 'Call-to-Action (CTA) Magic',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 289,
            coins: 37,
            content: "<h3>Call-to-Action (CTA) Magic</h3><p>This chapter focuses on the topic: Call-to-Action (CTA) Magic. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-29',
            title: 'Thumbnails That Get Clicked',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 296,
            coins: 38,
            content: "<h3>Thumbnails That Get Clicked</h3><p>This chapter focuses on the topic: Thumbnails That Get Clicked. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-30',
            title: 'Reading Reels Analytics Without Crying',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 303,
            coins: 39,
            content: "<h3>Reading Reels Analytics Without Crying</h3><p>This chapter focuses on the topic: Reading Reels Analytics Without Crying. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-31',
            title: 'Editing for Emotion: Psychology of Music & Cuts',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 310,
            coins: 40,
            content: "<h3>Editing for Emotion: Psychology of Music & Cuts</h3><p>This chapter focuses on the topic: Editing for Emotion: Psychology of Music & Cuts. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-32',
            title: 'Mastering Complex Transitions',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 317,
            coins: 41,
            content: "<h3>Mastering Complex Transitions</h3><p>This chapter focuses on the topic: Mastering Complex Transitions. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-33',
            title: 'Advanced Text Animations & Graphics',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 324,
            coins: 42,
            content: "<h3>Advanced Text Animations & Graphics</h3><p>This chapter focuses on the topic: Advanced Text Animations & Graphics. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-34',
            title: 'Cinematic Reels with Just a Phone',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 331,
            coins: 43,
            content: "<h3>Cinematic Reels with Just a Phone</h3><p>This chapter focuses on the topic: Cinematic Reels with Just a Phone. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-35',
            title: 'Green Screen & Mobile Keying',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 338,
            coins: 44,
            content: "<h3>Green Screen & Mobile Keying</h3><p>This chapter focuses on the topic: Green Screen & Mobile Keying. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-36',
            title: 'Advanced Audio: Ducking, EQ & More',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 345,
            coins: 45,
            content: "<h3>Advanced Audio: Ducking, EQ & More</h3><p>This chapter focuses on the topic: Advanced Audio: Ducking, EQ & More. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-37',
            title: 'Trend Forecasting Like a Futurist',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 352,
            coins: 46,
            content: "<h3>Trend Forecasting Like a Futurist</h3><p>This chapter focuses on the topic: Trend Forecasting Like a Futurist. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-38',
            title: 'Perfecting Seamless Loops',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 359,
            coins: 47,
            content: "<h3>Perfecting Seamless Loops</h3><p>This chapter focuses on the topic: Perfecting Seamless Loops. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-39',
            title: 'Storytelling in 30 Seconds',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 366,
            coins: 48,
            content: "<h3>Storytelling in 30 Seconds</h3><p>This chapter focuses on the topic: Storytelling in 30 Seconds. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-40',
            title: 'Editing for Multiple Platforms',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 373,
            coins: 49,
            content: "<h3>Editing for Multiple Platforms</h3><p>This chapter focuses on the topic: Editing for Multiple Platforms. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-41',
            title: 'Fixing Bad Footage with Hacks',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 380,
            coins: 50,
            content: "<h3>Fixing Bad Footage with Hacks</h3><p>This chapter focuses on the topic: Fixing Bad Footage with Hacks. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-42',
            title: 'Collaborating with Other Creators',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 387,
            coins: 51,
            content: "<h3>Collaborating with Other Creators</h3><p>This chapter focuses on the topic: Collaborating with Other Creators. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-43',
            title: 'Using AI Tools in Your Workflow',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 394,
            coins: 52,
            content: "<h3>Using AI Tools in Your Workflow</h3><p>This chapter focuses on the topic: Using AI Tools in Your Workflow. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-44',
            title: 'Creating Your Signature Editing Style',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 401,
            coins: 53,
            content: "<h3>Creating Your Signature Editing Style</h3><p>This chapter focuses on the topic: Creating Your Signature Editing Style. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-45',
            title: 'Monetizing Your Reels Creatively',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 408,
            coins: 54,
            content: "<h3>Monetizing Your Reels Creatively</h3><p>This chapter focuses on the topic: Monetizing Your Reels Creatively. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-46',
            title: 'Building a Content Calendar',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 415,
            coins: 55,
            content: "<h3>Building a Content Calendar</h3><p>This chapter focuses on the topic: Building a Content Calendar. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-47',
            title: 'Outsourcing Editing Like a CEO',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 422,
            coins: 56,
            content: "<h3>Outsourcing Editing Like a CEO</h3><p>This chapter focuses on the topic: Outsourcing Editing Like a CEO. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-48',
            title: 'Copyright, Music & Fair Use',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 429,
            coins: 57,
            content: "<h3>Copyright, Music & Fair Use</h3><p>This chapter focuses on the topic: Copyright, Music & Fair Use. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-49',
            title: 'Creating Your Portfolio',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 436,
            coins: 58,
            content: "<h3>Creating Your Portfolio</h3><p>This chapter focuses on the topic: Creating Your Portfolio. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        },
        {
            id: 'reels-level-50',
            title: 'Final Challenge: Build a 5-Reel Series',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 443,
            coins: 59,
            content: "<h3>Final Challenge: Build a 5-Reel Series</h3><p>This chapter focuses on the topic: Final Challenge: Build a 5-Reel Series. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>"
        }
    ]
};

const roadmaps = {
    'Canva Design': canvaDesignRoadmap,
    'Reels & Shorts Video Editing': reelsEditingRoadmap,
    'ChatGPT Prompt Engineering': promptEngineeringRoadmap,
};

export function getRoadmapByStream(streamName: string): Roadmap | undefined {
    // @ts-ignore
    return roadmaps[streamName];
}
