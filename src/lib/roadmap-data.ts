
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

const canvaDesignRoadmap: Roadmap = {
    streamName: 'Canva Design',
    levels: [
        {
            "id": "canva-level-1",
            "title": "What is Canva? Signing Up & Interface Overview",
            "description": "Learn what Canva is, what it’s used for, and why it’s a powerful tool for designers and non-designers alike.",
            "xp": 100,
            "coins": 10,
            "content": "<h3>What is Canva? Signing Up & Interface Overview</h3><p>Welcome to the creative playground that is Canva! Imagine a world where you don't need a degree in graphic design or a bank-breaking software subscription just to make a decent-looking birthday invitation or a social media post that doesn't look like it was designed in the early 2000s. That world is Canva. It’s a beautifully intuitive, online visual communication tool that has single-handedly demystified the art of design for millions. Think of it as a creative Swiss Army Knife—it’s got a tool for everything you could possibly need, from crafting a sleek presentation for your big business meeting to designing a meme that will go viral (we all have aspirations). It's a \"freemium\" platform, which is a fancy way of saying you can do a ton of amazing things for free, and if you ever want to unleash the truly magical powers, you can sign up for Canva Pro.</p><p>The moment you sign in, you'll be greeted by the Home Dashboard. This isn't just a landing page; it's your personal mission control. Need to find a design? Use the top search bar—it’s like Google for design templates. Want to start from scratch? Hit the \"Create a design\" button and pick your canvas size. And for the professionally-minded among you, take a moment to admire the clean, minimalist left-hand navigation panel, which is your direct line to all your projects, brand assets, and a galaxy of templates. It’s an organizational dream, ensuring you never have to hunt for that half-finished project again. This clean, no-nonsense approach to the user interface is why Canva has become the go-to platform for everyone from marketing managers to small business owners and that one aunt who just discovered she's a \"digital creator.\"</p>"
        },
        {
            "id": "canva-level-2",
            "title": "Your First Design: Using Templates",
            "description": "Learn how to find, customize, and effectively use Canva’s vast library of pre-designed templates.",
            "xp": 107,
            "coins": 11,
            "content": "<h3>Your First Design: Using Templates</h3><p>Let’s be honest, starting with a blank white page can be intimidating. It’s the digital equivalent of a blank canvas for an artist with a severe case of creative block. This is where Canva's templates swoop in like a design superhero. They are the ultimate cheat code, providing a professional and stunning foundation for your project. Templates are pre-designed layouts for virtually every purpose imaginable, from Instagram stories that pop to business cards that make you look like a CEO from day one. Using them is ridiculously easy. You can search for what you need—say, a \"minimalist poster\"—and Canva will present you with an endless scroll of professionally crafted options.</p><p>The beauty of a template is that it's just the starting point. It’s a suggestion, not a final decree. Once you click on one, it opens in the editor, and the magic of customization begins. Did the template use a font that looks like it belongs on a ransom note? Change it. Is the color palette too loud for your brand? Adjust it. Does the placeholder image of a serene coffee cup not quite fit your brand of high-octane energy drinks? Replace it with an image from your uploads or from Canva’s vast photo library. Every element, from the text and images to the shapes and colors, can be tweaked, moved, or deleted with a few simple clicks. This is why even seasoned designers love Canva; it cuts out the mundane, time-consuming parts of the design process, allowing you to focus on the creative flourishes that make your work truly unique.</p>"
        },
        {
            "id": "canva-level-3",
            "title": "The Left-Side Panel: Your Toolbox",
            "description": "Discover the core components of the design editor interface, including elements, text, and uploads.",
            "xp": 114,
            "coins": 12,
            "content": "<h3>The Left-Side Panel: Your Toolbox</h3><p>If the Home Dashboard is your mission control, then the left-side panel in the Canva editor is your mission-critical toolbox. This is where all the nuts and bolts of your design are kept, neatly organized and ready for action. You’ll be spending a lot of time here, so it’s worth getting acquainted with its purpose. The Design tab is your portal to a world of templates and design styles. It’s perfect for when you're halfway through a project and suddenly decide you want to switch to a different aesthetic. Below that is the glorious Elements tab, which is basically an all-you-can-eat buffet of visual assets. Need a geometric shape for your logo? It’s there. Looking for a funky, animated sticker for a social media post? You'll find it here, along with countless icons, lines, and graphics.</p><p>Then there's the Text tab, which is more than just a button for adding words. It offers a selection of professional font pairings and pre-designed text blocks, saving you the headache of trying to figure out which fonts look good together. For the brand-conscious professional, the Brand tab (a Canva Pro feature) is your best friend, holding all your brand's logos, colors, and fonts in one easily accessible place. No more hunting down hex codes! The Uploads tab is your personal media library, storing everything you've ever uploaded, from your company logo to that embarrassing photo of your cat you secretly want to use in a design. And for the more adventurous, the Draw tab lets you unleash your inner artist with freehand drawing, while the Apps tab connects you to a galaxy of integrations, from Google Maps to popular social media schedulers. It’s a toolbox that’s both comprehensive and a little bit magical.</p>"
        },
        {
            "id": "canva-level-4",
            "title": "Mastering the Top Toolbar: A Deep Dive",
            "description": "Learn how the context-sensitive top toolbar helps you refine and edit any selected element.",
            "xp": 121,
            "coins": 13,
            "content": "<h3>Mastering the Top Toolbar: A Deep Dive</h3><p>While the left-side panel gives you all the raw materials for your design, the top toolbar is where you get down to the nitty-gritty of refinement. This isn’t a fixed menu; it’s a dynamic, chameleon-like control panel that adapts to your every move. It’s so smart, it almost feels like it’s reading your mind. Click on a text box, and suddenly the toolbar is filled with options to change the font, size, and color, along with magical buttons for spacing and adding special effects. It's like a linguistic command center, ready to make your words look as impressive as they sound. If you select a geometric shape, those text options vanish, replaced by tools for changing its color, adding transparency, and adjusting its position relative to other elements.</p><p>This context-sensitive behavior is the genius of Canva’s user interface. It prevents the screen from being cluttered with a million buttons you don't need at the moment, which can be a huge relief if you’ve ever felt overwhelmed by complex design software. When you select an image, a new set of options appears, allowing you to crop it, flip it, or use the super-powerful Edit photo button to apply filters or make granular adjustments to brightness, contrast, and saturation. And for the true power users, this is also where you’ll find the highly coveted Background Remover (a Pro feature) — a tool that's so good, it feels like cheating. Mastering the top toolbar is like learning a new language; once you understand its subtle changes, you’ll be designing with speed and efficiency that will make your friends wonder if you secretly enrolled in art school.</p>"
        },
        {
            "id": "canva-level-5",
            "title": "Text Tools: Fonts, Colors, & Basic Effects",
            "description": "Add and style text, understand font pairings, and apply basic text effects like shadows and curves.",
            "xp": 135,
            "coins": 15,
            "content": "<h3>Text Tools: Fonts, Colors, & Basic Effects</h3><p>Text is the soul of many designs, and in Canva, it’s not just about conveying information—it’s about making that information look fabulous. Adding text is a breeze. Just pop open the Text tab on the left-side panel, and you’ll find options for a big, bold heading, a slightly smaller subheading, and a humble body text. But the real fun begins when you start to customize. Once you click on a text box, the top toolbar transforms into your personal typography lab. You can scroll through a seemingly infinite list of fonts, from elegant serifs to playful scripts, to find the perfect style that matches your message. Canva also offers font combinations, which are pre-selected pairings that take the guesswork out of typography.</p><p>But let's be real, plain text is boring. This is where the Effects button comes in. It's like the special effects department of a movie studio, but for your words. Want to add a subtle shadow to make your text pop off the page? Easy. Want to give it a cool \"hollow\" outline? Done. You can even make your text look like it’s glowing with the Neon effect or give it a sleek, modern look with a Splice. And for those of us who remember the golden age of WordArt, Canva's Curved text effect lets you bend your words into a perfect arc. The Spacing tool is also a must-know. Here you can adjust the space between your letters (Letter spacing) and the distance between lines (Line spacing), two small adjustments that can make a huge difference in the professionalism of your design.</p>"
        },
    ]
};

const promptEngineeringRoadmap: Roadmap = {
    streamName: 'ChatGPT Prompt Engineering',
    levels: [
        {
            id: 'prompt-engineering-level-1',
            title: 'The New Language of AI: What is Prompt Engineering?',
            description: 'Learn how to talk to machines and get the results you want.',
            xp: 100,
            coins: 10,
            content: "<h3>The New Language of AI: What is Prompt Engineering?</h3><p>Welcome to the fascinating world of prompt engineering, the surprisingly human art of talking to machines. Think of it this way: you have a super-intelligent, incredibly knowledgeable genie in a bottle (your AI), but it's also a bit of a literalist. If you ask it to \"tell me a story,\" you might get a two-sentence narrative about a rock. However, if you prompt it with, \"Act as a seasoned fantasy author. Write a compelling, 1,000-word short story about a brave knight on a quest to find a lost magical sword, including dialogue and vivid descriptions of the setting,\" you get a masterpiece. Prompt engineering is the \"art and science\" of crafting these instructions to get the best possible output from a generative AI model. It’s the difference between a simple query and a well-defined command.</p><p>It’s about understanding the AI's \"mind\" — its capabilities, its limitations, and how it processes language. It's not just about what you say, but how you say it. A great prompt is like a detailed recipe for a world-class chef; it provides the ingredients, the instructions, and the desired outcome, ensuring the final dish is exactly what you envisioned. This is a crucial skill because even the most powerful AI models are only as good as the input they receive. By mastering prompt engineering, you become the conductor of an AI orchestra, capable of creating symphonies of text, code, or images, rather than just random noise.</p>"
        },
        {
            id: 'prompt-engineering-level-2',
            title: 'The Anatomy of a Prompt: Breaking It Down',
            description: 'Learn the key components of an effective prompt and how to structure your requests for better results.',
            xp: 107,
            coins: 11,
            content: "<h3>The Anatomy of a Prompt: Breaking It Down</h3><p>A well-engineered prompt is not a single sentence; it's a carefully structured set of components, much like the ingredients for a complex meal. While you can get by with a single phrase, adding a little structure can elevate your results from \"passable\" to \"perfect.\" The key components of an effective prompt are: the Instruction, the Context, the Persona, and the Format. The Instruction is the command itself—the verb that tells the AI what to do, like \"write,\" \"summarize,\" or \"generate.\" This is the non-negotiable part of every prompt. Without it, the AI is just guessing.</p><p>The Context provides all the background information the AI needs to understand the task. This is where you can specify details, constraints, and relevant information. For example, if you're writing a marketing email, the context would include who the email is for, what you’re selling, and the key selling points. The Persona is an optional but powerful component where you tell the AI what role to adopt, such as \"Act as a seasoned historian\" or \"You are a witty copywriter.\" This immediately sets the tone and voice. Finally, the Format dictates the structure of the output, such as \"Write in bullet points,\" \"Create a table,\" or \"Provide a five-paragraph essay.\" By combining these elements, you're not just asking a question; you're building a complete blueprint for the perfect response, which is crucial for achieving consistent and high-quality results.</p>"
        },
        {
            id: 'prompt-engineering-level-3',
            title: 'Prompting for LLMs vs. Image Generators: A Tale of Two AIs',
            description: 'Understand the critical differences between prompting for text-based and image-based AI models.',
            xp: 114,
            coins: 12,
            content: "<h3>Prompting for LLMs vs. Image Generators: A Tale of Two AIs</h3><p>Here’s where we get to the core difference that trips up many beginners: the language of prompts is not universal. Think of it like talking to a musician versus a painter. While both are creative, they respond to different instructions. Large Language Models (LLMs) like GPT are conversational and conceptual. They understand a prompt that says, “Explain quantum physics in a simple, conversational tone for a ten-year-old.” They grasp the nuance of \"conversational tone\" and the complexity of the subject matter. Their prompts are often narrative and instruction-based, focusing on tasks like summarization, reasoning, and text generation. You're giving them a script and a persona, and they perform.</p><p>In contrast, image generators like DALL-E and Midjourney are all about visual description. They don't care about a \"conversational tone\" but thrive on visual keywords. Their prompts are like an art director's brief. Instead of an essay prompt, you’d provide a prompt like, \"a photorealistic image of a vintage red car parked on a misty street in Tokyo, cinematic lighting, high-resolution.\" These tools are looking for details on subject, style, lighting, color, and mood. The most successful image prompts are a list of visual adjectives and nouns, often with technical parameters added at the end (e.g., aspect ratios). This fundamental difference in how they interpret prompts is a key lesson. A prompt that works for one AI will often fail spectacularly on the other. It’s not about the prompt being right or wrong, but about it being designed for the right audience.</p>"
        },
        {
            id: 'prompt-engineering-level-4',
            title: 'The Importance of Clarity and Specificity',
            description: 'Learn why vague prompts lead to generic outputs and how to be more specific to get better results.',
            xp: 121,
            coins: 13,
            content: "<h3>The Importance of Clarity and Specificity</h3><p>If you've ever asked an AI for \"a car\" and gotten a generic, boring sedan, you've experienced the consequences of a vague prompt. AI models are powerful, but they are not mind readers. They operate on the principle of probability, and a vague prompt gives them a million different options, leading to a bland, middle-of-the-road response. The solution is simple: Be clear and be specific. A specific prompt is like a detailed map, guiding the AI to the exact destination you have in mind. Instead of \"a car,\" try \"a glossy, deep-blue 1968 Ford Mustang GT, parked in a bustling city at night, with rain on the windshield.\" This gives the AI all the information it needs to produce a high-quality, targeted result.</p><p>Specificity isn’t just about adding more words; it’s about providing meaningful details. It’s about being explicit with what you want and, just as importantly, what you don’t want. If you want a concise answer, tell it to \"summarize in three bullet points.\" If you want it to avoid a certain topic, use a negative prompt (which we'll cover later). The more specific you are, the less the AI has to \"fill in the blanks\" with generic information. Think of your prompt as a contract with the AI: the more detailed the terms, the more likely you are to get exactly what you asked for.</p>"
        },
        {
            id: 'prompt-engineering-level-5',
            title: 'Iterative Prompting: The Art of Refinement',
            description: 'Master the process of refining and improving your prompts based on the AI\'s output.',
            xp: 128,
            coins: 14,
            content: "<h3>Iterative Prompting: The Art of Refinement</h3><p>In a perfect world, your first prompt would always generate the perfect response. In reality, prompt engineering is an iterative process. It's a conversation, not a one-and-done command. The first prompt is your starting point, your \"rough draft.\" The real magic happens when you refine and iterate based on the initial output. This is a crucial skill because it saves you from getting stuck in a rut. If the AI's first response is close but not quite right, you don't start over. You simply build on the conversation.</p><p>For example, if you ask an AI to \"write a social media post about our new product,\" and the tone is too formal, your next prompt isn’t \"write a social media post about our new product with a casual tone.\" Instead, you would say, \"The last response was too formal. Make it more casual and add a call to action to visit our website.\" This is the power of iteration. You provide feedback and new instructions directly in the context of the previous conversation. This is especially true for more complex tasks. You can ask the AI to generate an outline, then ask it to expand on a specific section of that outline, and then ask it to rephrase a particular paragraph. This back-and-forth refinement is the key to unlocking truly high-quality results from any AI model, turning a simple tool into a powerful creative partner.</p>"
        },
    ]
};

const reelsEditingRoadmap: Roadmap = {
    streamName: 'Reels & Shorts Video Editing',
    levels: [
        {
            id: 'reels-level-1',
            title: 'Understanding the Short-Form Video Landscape',
            description: 'Learn the key principles of short-form video and why it\'s a powerful tool for creators.',
            xp: 100,
            coins: 10,
            content: "<h3>Understanding the Short-Form Video Landscape</h3><p>Welcome to the wild world of short-form video! In an age where attention spans are measured in milliseconds, the ability to tell a compelling story in 60 seconds or less is a superpower. Platforms like Instagram Reels, TikTok, and YouTube Shorts have completely revolutionized how we consume content. They are not just for dancing teenagers anymore; they are powerful tools for businesses, educators, and artists to reach a massive audience. The \"short-form\" part is key. You're not making a movie; you're making a snackable, highly engaging piece of content that grabs a viewer's attention in the first few seconds and delivers value in a bite-sized format.</p><p>The landscape is built on three core pillars: entertainment, education, and inspiration. Your video should aim to do at least one of these things. It's a high-stakes, fast-paced environment where trends emerge and disappear in a week. To succeed, you have to be agile, creative, and most importantly, you have to understand the fundamental rules of the game. This course will teach you not just how to edit a video, but how to think like a short-form video creator. It’s about building a connection in a flash, and once you get it, you'll be unstoppable.</p>"
        },
        {
            id: 'reels-level-2',
            title: 'The Rule of 3: Hook, Value, CTA',
            description: 'Master the fundamental structure of every viral video: the Hook, Value, and Call to Action.',
            xp: 107,
            coins: 11,
            content: "<h3>The Rule of 3: Hook, Value, CTA</h3><p>In the world of short-form video, there’s an unwritten rule that every viral video follows: the Hook, Value, Call to Action (CTA). Think of it as the holy trinity of video content. The Hook is the most crucial part. It’s the first 3 seconds of your video, designed to stop a user from scrolling. This could be a surprising statement, a bold claim, an interesting question, or a captivating visual. Without a good hook, your video is dead on arrival.</p><p>Once you have the viewer’s attention, you must immediately deliver Value. This is the core of your video. The value could be in the form of a quick tip, a funny sketch, an educational nugget, or an aesthetically pleasing visual. This is the payoff for the viewer, the reason they stayed. Finally, you need a Call to Action (CTA). This is a clear, concise instruction for what you want the viewer to do next. Do you want them to follow you? Comment? Share? Visit your website? The CTA should be the last thing you say or show on screen, leaving the viewer with a clear next step. Mastering this simple three-part structure is the key to creating content that doesn't just get views, but also drives engagement and grows your audience.</p>"
        },
        {
            id: 'reels-level-3',
            title: 'Essential Gear: Phone vs. Camera',
            description: 'Learn why your phone is a powerful video tool and when you might consider a dedicated camera.',
            xp: 114,
            coins: 12,
            content: "<h3>Essential Gear: Phone vs. Camera</h3><p>Don't get caught up in the myth that you need expensive gear to create great videos. While a professional camera can be nice, the truth is that your smartphone is the most powerful and accessible video-making tool you have. Modern smartphones like the latest iPhone or Samsung Galaxy have incredible cameras capable of shooting in stunning 4K resolution. They are lightweight, portable, and always with you. For a beginner, your phone is more than enough to start creating professional-looking content.</p><p>However, if you want to take your content to the next level, a dedicated camera like a mirrorless or DSLR can offer more control over settings like aperture, shutter speed, and ISO, which are essential for shooting in different lighting conditions. These cameras also have larger sensors, which can produce a more cinematic look. Regardless of your camera, investing in a few key accessories is far more important. A tripod will keep your shots stable, a microphone will ensure your audio is crisp, and a small light can make all the difference. Remember, the best camera is the one you have with you, and a great video is about the story, not the gear.</p>"
        },
        {
            id: 'reels-level-4',
            title: 'Principles of Great Lighting (Natural & Artificial)',
            description: 'Discover how to use natural and artificial light to make your videos look stunning.',
            xp: 121,
            coins: 13,
            content: "<h3>Principles of Great Lighting (Natural & Artificial)</h3><p>You can have the best camera in the world, but if your lighting is bad, your video will look terrible. Lighting is the single most important factor in video quality. The good news is that you don't need a fancy studio to get great lighting. The best light source in the world is free: the sun! Natural light, especially during the \"golden hour\" (the hour after sunrise and the hour before sunset), is soft, warm, and incredibly flattering. When using natural light, always face the light source to avoid shadows on your face.</p><p>For artificial lighting, the key is to use a three-point lighting setup. This involves a key light (your main light source), a fill light (to soften shadows), and a backlight (to separate you from the background). For a simple, affordable setup, you can use a ring light as your key light and a small desk lamp as your fill light. The most important rule to remember is to avoid overhead lighting and harsh direct sunlight, as these create unflattering shadows. Mastering lighting is a foundational skill that will instantly elevate the look of your videos.</p>"
        },
        {
            id: 'reels-level-5',
            title: 'The Power of Good Audio',
            description: 'Learn why audio is the most critical element and how to capture it cleanly.',
            xp: 128,
            coins: 14,
            content: "<h3>The Power of Good Audio</h3><p>Viewers will forgive a shaky video or a slightly blurry shot, but they will never forgive bad audio. Bad audio is the number one reason people stop watching a video. A good video with bad audio is a bad video, but a bad video with great audio can still be watchable. That's how important it is. Your phone's built-in microphone is designed to pick up all the sounds in the room, which means it also picks up background noise, echoes, and static. This makes your voice sound distant and unprofessional.</p><p>To get good audio, you need a dedicated microphone. A lavalier microphone (or lav mic) is a small, clip-on mic that you can attach to your shirt. It’s perfect for interviews and vlogs. A shotgun microphone is a long, directional mic that you can mount on your camera or hold just out of the frame. This is great for recording subjects from a distance. For a beginner, a simple lavalier microphone that plugs into your phone's headphone jack or lightning port is a very affordable and effective way to get clean, crisp audio. Investing in a good microphone is the single best way to improve the professionalism of your videos.</p>"
        },
    ]
};

const basicSeoRoadmap: Roadmap = {
    streamName: 'Basic SEO',
    levels: [
        {
            id: 'seo-level-1',
            title: 'What is SEO and Why It Matters',
            description: 'Learn the fundamentals of Search Engine Optimization and its importance for online visibility.',
            xp: 100,
            coins: 10,
            content: "<h3>What is SEO and Why It Matters</h3><p>Welcome to the world of SEO! SEO, or Search Engine Optimization, is the practice of increasing the quantity and quality of traffic to your website through organic search engine results. In simpler terms, it's about getting your website to show up at the top of Google, Bing, or any other search engine without paying for ads. Think of it as a competition: every time someone searches for something online, search engines like Google look at billions of websites and decide which ones are the most relevant and trustworthy to show first. Your job as an SEO is to make your website the most relevant and trustworthy answer.</p><p>Why does this matter? Well, over 90% of all internet traffic comes from search engines. People who find your website through a search are often actively looking for what you offer, which means they are more likely to become customers or loyal readers. SEO gives your business or blog visibility, credibility, and a constant flow of traffic. It's a long-term investment, not a quick fix, but the payoff can be immense. Mastering SEO is like learning the secret language of the internet, allowing you to connect with millions of people who are already looking for you.</p>"
        },
        {
            id: 'seo-level-2',
            title: 'How Search Engines Work (Crawling, Indexing, Ranking)',
            description: 'Understand the three core stages of how search engines like Google discover and rank web pages.',
            xp: 107,
            coins: 11,
            content: "<h3>How Search Engines Work (Crawling, Indexing, Ranking)</h3><p>Before we can optimize, we need to understand how search engines operate. The process can be broken down into three key stages: crawling, indexing, and ranking.</p><p>Crawling is the first step. Search engines use automated programs called crawlers (or \"spiders\") to discover new and updated web pages. These crawlers follow links from page to page, reading the code and content of each one. If a new page is linked from an existing, high-quality page, a crawler is more likely to find it quickly. This is why having a strong internal and external linking structure is so important.</p><p>Next is indexing. Once a crawler finds a page, it analyzes the content and stores it in a massive database called an index. This is where Google essentially takes a digital photograph of your website. If a page isn't in Google's index, it can't show up in search results.</p><p>Finally, there's ranking. When you type a query into a search engine, the engine looks at all the indexed pages and uses a complex algorithm to decide which ones are the most relevant and authoritative for that specific query. This is where your SEO efforts come into play. Factors like keywords, link quality, page speed, and user experience all influence where your page lands in the search results.</p>"
        },
        {
            id: 'seo-level-3',
            title: 'The Concept of Keywords and Search Intent',
            description: 'Learn the difference between keywords and search intent, and why understanding both is critical for success.',
            xp: 114,
            coins: 12,
            content: "<h3>The Concept of Keywords and Search Intent</h3><p>At the heart of SEO are keywords. A keyword is simply the word or phrase that a user types into a search engine. They are the bridge between what people are looking for and the content you provide. But it's not enough to just know what people are searching for; you also need to understand their search intent. Search intent is the reason behind the search. Why is the person searching for this keyword?</p><p>There are four main types of search intent:</p> <ul><li>Informational: The user wants to learn something (e.g., \"how to bake a cake\").</li><li>Navigational: The user wants to find a specific website (e.g., \"Facebook login\").</li><li>Transactional: The user wants to buy something (e.g., \"buy running shoes\").</li><li>Commercial Investigation: The user is researching a product before a purchase (e.g., \"best running shoes 2024\").</li></ul><p>You need to align your content with the user's intent. If someone is searching for \"how to bake a cake,\" they don't want to buy baking supplies; they want a recipe. If you write a recipe, you have a better chance of ranking for that keyword. Understanding and matching search intent is a fundamental skill in SEO.</p>"
        },
        {
            id: 'seo-level-4',
            title: 'Understanding the Search Engine Results Page (SERP)',
            description: 'Learn to identify and optimize for the various features that appear on a search engine results page.',
            xp: 121,
            coins: 13,
            content: "<h3>Understanding the Search Engine Results Page (SERP)</h3><p>The Search Engine Results Page (SERP) is what you see after you hit \"enter\" on a search query. It's more than just a list of blue links. The SERP has evolved to include many different features, and understanding them is crucial for your SEO strategy.</p><p>The most common features on a SERP are:</p> <ul><li>Organic Results: The main list of web pages that have been optimized for a given query.</li><li>Paid Ads: Results that are labeled as \"Ad\" at the top or bottom of the page.</li><li>Featured Snippets: A box at the top of the organic results that gives a direct answer to a query. This is often the holy grail of SEO, as it gives you a prominent spot.</li><li>People Also Ask: A box with related questions that a user can click on to see an answer.</li><li>Knowledge Panel: A box that appears on the right side of the page with information about a specific entity (e.g., a famous person or a company).</li><li>Images/Videos: A carousel of images or videos related to the query.</li></ul><p>Your goal is not just to be on the first page, but to capture as many of these \"SERP features\" as possible. Optimizing your content for these features can give you a major advantage over your competitors.</p>"
        },
        {
            id: 'seo-level-5',
            title: 'The Difference Between White Hat, Black Hat, & Gray Hat SEO',
            description: 'Learn the ethical lines in SEO and why sticking to "White Hat" practices is essential for long-term success.',
            xp: 128,
            coins: 14,
            content: "<h3>The Difference Between White Hat, Black Hat, & Gray Hat SEO</h3><p>In the world of SEO, you have to choose a side. White Hat SEO refers to ethical, long-term strategies that follow search engine guidelines. These practices focus on creating high-quality content, building a great user experience, and earning natural, high-quality backlinks. This approach is what we will focus on in this course. White Hat SEO takes time and effort, but it builds a sustainable, long-term asset that won't be penalized by search engines.</p><p>Black Hat SEO refers to unethical tactics that violate search engine guidelines. These practices are designed to manipulate the algorithm for a quick ranking boost. Examples include keyword stuffing, hidden text, and buying spammy backlinks. While these tactics might give you a short-term boost, they often result in your website being hit with a manual penalty or being completely de-indexed (removed) from search results. It’s like cheating on a test—you might get a good grade for a day, but the consequences are severe.</p><p>Gray Hat SEO is a mix of both. These tactics are not strictly forbidden but are considered risky and can be a gray area. Examples include buying a few links or creating automated content. While they might work, they carry a high risk of future penalties.</p>"
        },
    ]
};

const socialMediaRoadmap: Roadmap = {
    streamName: 'Social Media Management',
    levels: [
        {
            id: 'social-level-1',
            title: 'What is Social Media Management? The Role & Responsibilities',
            description: 'Understand the core responsibilities and strategic importance of a social media manager.',
            xp: 100,
            coins: 10,
            content: "<h3>What is Social Media Management? The Role & Responsibilities</h3><p>Social media management is far more than just posting on Instagram or tweeting a clever thought. It is a professional discipline focused on creating, publishing, and analyzing content on social media platforms to build a brand's online presence and engage with its audience. In a world where billions of people use social media, a skilled social media manager is the crucial link between a brand and its community. The role is a dynamic mix of creativity, strategy, and analytics, requiring a diverse skill set that spans marketing, communication, data analysis, and even customer service. It's a role that has evolved from a simple \"intern task\" to a high-demand, strategic position vital for any company's growth.</p><p>A social media manager's responsibilities are multifaceted. At the highest level, they are responsible for developing a comprehensive social media strategy that aligns with the company's overall business goals. This involves defining a target audience, choosing the right platforms, and setting specific, measurable objectives. Are they aiming to increase brand awareness, drive website traffic, generate leads, or improve customer loyalty? The answer to this question dictates every action they take. A social media manager acts as the brand's voice online. This involves creating engaging content—be it a captivating image, a concise video, or an informative blog post—that resonates with the target audience. They must also be proficient in using a variety of social media tools for content creation, scheduling, and performance monitoring.</p><p>Beyond content, a social media manager is a community builder. They are responsible for actively engaging with the audience by responding to comments, answering questions, and participating in relevant conversations. This proactive engagement turns followers into a loyal community and can even lead to valuable customer insights. The role also extends to being a brand's frontline representative, often handling customer service inquiries and addressing negative feedback with grace and professionalism. This requires a cool head and a deep understanding of the brand's values. Finally, a crucial part of the job is performance measurement. A social media manager must constantly track key metrics like reach, engagement, and conversions to understand what is working and what isn't. They must be able to translate data into actionable insights, proving the value of their work to stakeholders and adapting their strategy as needed. The role is not a static one; it requires a constant curiosity for new trends, platform updates, and a willingness to experiment to stay ahead of the curve in a fast-paced digital environment.</p>"
        },
        {
            id: 'social-level-2',
            title: 'The Social Media Landscape: A Guide to Key Platforms',
            description: 'Learn the unique culture, audience, and content formats of major social media platforms.',
            xp: 107,
            coins: 11,
            content: "<h3>The Social Media Landscape: A Guide to Key Platforms</h3><p>The social media landscape is a vast and ever-changing ecosystem, with each platform serving a unique purpose and attracting a different demographic. A successful social media manager knows that a one-size-fits-all approach is a recipe for failure. Understanding the nuances of each platform—from its primary user base and content formats to its underlying algorithm—is the foundation of an effective multi-channel strategy. You wouldn't use the same communication style at a corporate meeting as you would at a casual family barbecue, and the same principle applies to social media platforms.</p><p>Facebook remains the largest social network in the world, with a broad and diverse user base that skews slightly older. It's an excellent platform for building communities, sharing long-form content like blog posts and articles, and running highly targeted ad campaigns due to its extensive user data. Brands often use Facebook to share news, host events, and create groups for their most loyal followers. The platform's video content, both pre-recorded and live, performs exceptionally well. Instagram, in contrast, is a highly visual platform favored by a younger demographic. Its primary focus is on high-quality photos and short-form video content like Reels and Stories. Brands use Instagram to build an aesthetic identity, showcase their products, and engage with their audience through visually stunning content. Influencer marketing and shopping features are also key components of a successful Instagram strategy.</p><p>X (formerly Twitter) is the platform for real-time conversation and news. Its short-form, text-based nature makes it ideal for live updates, quick announcements, and engaging in public discourse. Brands use X to monitor industry trends, interact directly with customers, and join trending conversations. The fast-paced nature of X requires a witty, concise, and often reactive communication style. LinkedIn is the professional networking hub. Unlike the others, its primary purpose is career-oriented. Brands use LinkedIn to establish themselves as industry leaders, share corporate news, recruit new talent, and network with other professionals. The content here is more formal and educational, focusing on thought leadership, industry insights, and company culture.</p><p>TikTok has taken the social media world by storm with its short-form, highly creative video content. Its algorithm is exceptionally good at serving users content they'll love, leading to viral trends and explosive growth. Brands on TikTok must be authentic, creative, and willing to experiment with new video formats. The content here is less polished and more raw and relatable. Finally, YouTube is the undisputed king of long-form video content. Brands use YouTube to create tutorials, host webinars, and share in-depth stories. A successful YouTube channel requires a significant investment of time and resources but can build a dedicated following and generate significant revenue through ads and partnerships. A savvy social media manager understands the unique rules of each of these platforms and crafts a tailored strategy for each one, rather than simply cross-posting the same content everywhere.</p>"
        },
        {
            id: 'social-level-3',
            title: 'Defining Your Audience & Persona',
            description: 'Learn to create detailed audience personas to guide your content and engagement strategy.',
            xp: 114,
            coins: 12,
            content: "<h3>Defining Your Audience & Persona</h3><p>Before a single post is scheduled, a social media manager's most critical task is to answer a fundamental question: \"Who are we talking to?\" Without a clear understanding of your audience, your content will feel generic, your message will be lost, and your efforts will fail to generate meaningful results. Defining your audience involves moving beyond surface-level assumptions and delving into the specific demographics, behaviors, and motivations of the people you want to reach. This process is the cornerstone of a successful social media strategy. It allows you to create content that resonates, use the right language, and focus your efforts on the platforms where your audience is most active.</p><p>To truly understand your audience, you must create detailed audience personas. A persona is a fictional, generalized representation of your ideal customer. It goes far deeper than just \"men, 25-35.\" A robust persona includes both demographic data and psychographic data. Demographic data includes measurable, statistical characteristics like age, gender, location, income level, education, and occupation. This is the easy part. The real insight comes from psychographic data, which includes a person's interests, hobbies, values, beliefs, attitudes, and lifestyle. For example, instead of just \"female, 30s,\" a persona might be \"Sarah, a 32-year-old freelance graphic designer living in a major city. She's passionate about sustainable fashion, follows design blogs on Pinterest and Instagram, and values work-life balance. Her primary pain point is finding high-quality, eco-friendly design tools that fit her budget.\"</p><p>Creating these detailed personas isn't just a creative exercise; it's a strategic necessity. Once you have a clear persona, every content decision becomes easier. You'll know what kind of visuals to use, what tone of voice to adopt, what topics to discuss, and even what time of day to post. If you're targeting \"Sarah,\" you'll know to use a casual, relatable tone, share content about sustainable design, and post on platforms like Instagram and Pinterest. You'll also know to avoid a formal, corporate voice that would alienate her. The process of defining your audience involves a combination of market research, analyzing existing customer data, and conducting surveys or interviews with your current followers. Social media platforms themselves provide valuable data through their analytics tools, which can reveal the demographics and interests of your current audience, providing a powerful starting point. By investing the time to deeply understand your audience, you transform your social media efforts from a shot in the dark into a targeted, effective campaign.</p>"
        },
        {
            id: 'social-level-4',
            title: 'Setting Goals & Key Performance Indicators (KPIs)',
            description: 'Learn to set SMART goals and track the right KPIs to measure your social media success.',
            xp: 121,
            coins: 13,
            content": "<h3>Setting Goals & Key Performance Indicators (KPIs)</h3><p>Without clear goals and a way to measure them, a social media strategy is just a collection of random posts. Setting goals and defining Key Performance Indicators (KPIs) is the foundation of a data-driven approach to social media management. Goals provide direction and purpose, while KPIs are the metrics you track to determine if you are meeting those goals. This process transforms your social media efforts from a cost center into a valuable, measurable business asset. It’s the difference between saying \"we want to get more followers\" and saying \"we want to increase our follower count by 15% in the next quarter to improve brand awareness.\"</p><p>Goals should always be SMART: Specific, Measurable, Achievable, Relevant, and Time-bound. A vague goal like \"get more engagement\" is difficult to track and doesn't provide a clear path to success. A SMART goal would be: \"Increase post engagement rate to 5% on Instagram within the next six months by posting a mix of Reels, Stories, and carousel posts.\" This goal is specific (5% engagement rate), measurable (you can track it), achievable (a realistic target), relevant (it connects to the overall goal of community building), and time-bound (within six months).</p><p>Once you have a SMART goal, you need to identify the corresponding KPIs. KPIs are the specific metrics that indicate progress. These metrics can be categorized into four main groups:</p> <ul><li>Awareness KPIs: These metrics measure how many people your content is reaching. Examples include reach (the number of unique users who saw your content), impressions (the total number of times your content was displayed), and follower count growth. These are important for top-of-funnel goals like building brand recognition.</li><li>Engagement KPIs: These metrics measure how people are interacting with your content. Examples include likes, comments, shares, and saves. A high engagement rate indicates that your content is resonating with your audience and building a strong community.</li><li>Conversion KPIs: These metrics measure the actions people take after seeing your content. Examples include clicks on a link, leads generated from a form, and sales attributed to a social media campaign. These are critical for bottom-of-funnel goals and proving your social media ROI.</li><li>Customer Service KPIs: These metrics measure how well you're handling customer inquiries on social media. Examples include response time and customer satisfaction. These are vital for showing the value of social media as a customer support channel.</li></ul><p>By clearly defining your goals and tracking the right KPIs from the outset, you create a strategic framework that allows you to make informed decisions. You can see which campaigns are performing well, which platforms are generating the most value, and where you need to adjust your strategy. Without this data-driven approach, you're essentially flying blind.</p>"
        },
        {
            id: 'social-level-5',
            title: 'Crafting a Social Media Mission Statement',
            description: 'Learn to create a clear and concise mission statement to guide your social media strategy.',
            xp: 128,
            coins: 14,
            content: "<h3>Crafting a Social Media Mission Statement</h3><p>A social media mission statement is a foundational document that guides your entire online presence. It’s not a public-facing slogan or a simple statement of purpose; it’s an internal compass that ensures all of your social media activities are aligned and purposeful. Just as a business has a mission statement to guide its overall operations, a social media mission statement defines the why, who, and what of your social media strategy. It answers the fundamental question: \"Why are we on social media, and what do we hope to achieve?\" Without this guiding principle, your social media presence can become a chaotic mix of random posts that fail to build a cohesive brand identity or serve a clear business objective.</p><p>A strong social media mission statement is a concise declaration that should include three key components:</p> <ul><li>The Audience: Who are you serving? This ties directly back to your audience personas. Your mission statement should acknowledge the specific people you are trying to reach. For example, \"to empower aspiring entrepreneurs\" or \"to provide a creative outlet for professional designers.\"</li><li>The Value: What value do you provide to your audience? What problem are you solving for them? This is the core purpose of your social media presence. Are you providing educational content, inspiring them with beautiful visuals, building a sense of community, or offering exclusive access to products? The mission statement should clearly articulate this unique value.</li><li>The Intention: What is the brand's long-term goal on social media? What is the desired outcome of all your efforts? Are you trying to build a loyal community, become an industry thought leader, or drive sales? This part of the statement connects your social media work to a broader business objective.</li></ul><p>Let's look at an example. A generic social media mission statement might be: \"Our goal is to post about our products.\" A powerful and well-crafted mission statement, however, would be: \"To educate and inspire budding home bakers with easy-to-follow recipes and helpful tutorials, fostering a supportive community around our brand of kitchen appliances.\" This statement is excellent because it clearly defines the audience (budding home bakers), the value they are providing (educational content and a supportive community), and their long-term intention (building a community around their brand). This statement serves as a filter for every piece of content they create. When they consider a new post, they can ask themselves, \"Does this post educate, inspire, or foster community for home bakers?\" If the answer is no, it doesn't align with their mission and should be discarded. A well-defined mission statement is the critical first step to creating a social media strategy that is focused, effective, and truly representative of your brand.</p>"
        },
    ]
};

const roadmaps: { [key: string]: Roadmap } = {
    "Canva Design": canvaDesignRoadmap,
    "ChatGPT Prompt Engineering": promptEngineeringRoadmap,
    "Reels & Shorts Video Editing": reelsEditingRoadmap,
    "Basic SEO": basicSeoRoadmap,
    "Social Media Management": socialMediaRoadmap
};

export function getRoadmapByStream(streamName: string): Roadmap | null {
    return roadmaps[streamName] || null;
}
