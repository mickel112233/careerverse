
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
            id: 'canva-level-1', 
            title: 'Introduction to Canva', 
            description: 'Learn what Canva is, what it’s used for, and why it’s a powerful tool for designers and non-designers alike.', 
            xp: 100, 
            coins: 10,
            content: `<h3>What is Canva?</h3><p>Canva is a user-friendly graphic design platform that empowers users to create visually appealing designs without requiring advanced design skills. It offers an intuitive drag-and-drop interface, making it accessible for beginners while still offering enough functionality for more experienced users. Canva is widely used for creating a variety of digital and print assets, including social media graphics, presentations, posters, resumes, invitations, and more.</p><p>The platform is available in both free and Pro versions, with the Pro version unlocking premium features such as access to a wider library of templates, brand kit tools, premium stock photos, and advanced collaboration options. Canva works seamlessly on web browsers and also offers mobile apps for Android and iOS, making it highly versatile for designing on the go.</p><p>What sets Canva apart is its vast library of professionally designed templates and an extensive library of images, icons, fonts, and design elements. It also offers built-in tutorials, making it ideal for individuals, educators, marketers, and small business owners looking to produce high-quality visual content quickly and efficiently.</p><p>This introduction sets the foundation for understanding how Canva fits into the broader world of visual communication and digital design. Learning Canva opens the door to visual storytelling, brand creation, and content marketing with ease and professionalism.</p>`
        },
        { 
            id: 'canva-level-2', 
            title: 'Navigating the Canva Dashboard and Editor', 
            description: 'A tour of the main dashboard, project folders, and the core components of the design editor interface.', 
            xp: 107, 
            coins: 11,
            content: `<h3>The Dashboard</h3><p>Upon logging into Canva, users are greeted by a clean, organized dashboard designed to simplify the design process. The dashboard serves as the central hub for all projects, providing access to your past designs, shared projects, brand kit (if applicable), and recommended templates. It also includes options for creating designs based on formats like Instagram posts, posters, business cards, and more.</p><h3>The Editor</h3><p>Navigating the editor is crucial for maximizing your efficiency in Canva. The editor is where all the creative work happens. At the top of the editor, you’ll find your design title, undo/redo buttons, and download/share options. On the left panel, you can access templates, elements, uploads, text, photos, audio, video, and background options. The canvas area in the center is where you arrange and customize elements, while the toolbar above allows you to change font styles, sizes, alignment, spacing, colors, transparency, and layering.</p><p>Canva’s layout is designed to be intuitive, even for users unfamiliar with graphic design. Understanding the functionality of the dashboard and editor streamlines the creative process and helps users focus more on design strategy rather than navigating the software. Mastery of these navigation tools sets the foundation for efficient and professional design work in Canva.</p>`
        },
        { 
            id: 'canva-level-3', 
            title: 'Understanding File Types (JPG, PNG, PDF)', 
            description: 'Learn the difference between key file formats and when to use each for web, print, and social media.', 
            xp: 114, 
            coins: 12,
            content: `<h3>Choosing the Right Format</h3><p>In Canva, selecting the right file type for downloading your designs is critical for ensuring your visual assets meet the needs of different platforms and use cases. Canva allows users to export designs in a variety of formats including JPG, PNG, and PDF, each serving a unique purpose.</p><ul><li><strong>JPG (or JPEG)</strong> is a commonly used image format ideal for photographs and images with gradients. It is best for web use due to its relatively small file size, although it does use lossy compression, which means some image quality is sacrificed.</li><li><strong>PNG</strong> is a higher-quality image format that supports transparent backgrounds, making it ideal for logos, icons, and other visuals that require clear backgrounds. It uses lossless compression, preserving image quality but resulting in larger file sizes compared to JPGs.</li><li><strong>PDF (Portable Document Format)</strong> is perfect for documents, presentations, and print materials. Canva supports both Standard and Print PDFs. PDF Print ensures high-resolution outputs with CMYK color profiles and optional crop marks and bleed for professional printing.</li></ul><p>Understanding when and how to use each file format is essential for ensuring your designs look their best, whether displayed online, printed professionally, or used within other applications. This knowledge also helps avoid common quality and compatibility issues during design delivery or production.</p>`
        },
        { 
            id: 'canva-level-4', 
            title: 'Using Canva on Mobile', 
            description: 'Explore the mobile app interface, its unique features, and how to design effectively on the go.', 
            xp: 121, 
            coins: 13,
            content: `<h3>Design Anywhere</h3><p>The mobile version of Canva offers a powerful and compact design experience, making it possible to create, edit, and share high-quality visuals on the go. Available for both Android and iOS devices, the Canva mobile app is tailored for touchscreens and provides nearly all the features found on the desktop version, though with a slightly different layout to accommodate mobile ergonomics.</p><h3>Key Features</h3><p>Upon opening the app, users are welcomed by a dashboard similar to the desktop version, offering quick access to past projects, templates, and popular design categories. The design editor in mobile includes essential features such as templates, text, elements, images, and videos, with intuitive touch controls for resizing, dragging, and customizing items.</p><p>One of the standout features of the mobile app is its real-time sync with the desktop version. This means you can start a project on your laptop and continue editing it seamlessly on your phone or tablet. The app also allows direct sharing to social media platforms, cloud drives, and messaging apps, streamlining the workflow for creators on the move.</p><p>Mastering Canva’s mobile functionality enhances productivity and flexibility, enabling you to design from virtually anywhere. It’s especially useful for social media managers, freelancers, and content creators who often need to make quick edits or publish content while away from their primary workstation.</p>`
        },
        { 
            id: 'canva-level-5', 
            title: 'Working with Templates', 
            description: 'How to find, customize, and effectively use Canva’s vast library of pre-designed templates.', 
            xp: 128, 
            coins: 14,
            content: `<h3>The Power of Templates</h3><p>Templates are one of Canva’s most valuable features, offering pre-designed layouts for virtually any purpose, including social media posts, business cards, flyers, resumes, and more. These templates are created by professional designers and are fully customizable, allowing users to modify text, images, colors, and elements to suit their brand or personal style.</p><h3>How to Use Them</h3><p>Using templates saves time and effort, especially for beginners who may not yet have a strong grasp of design principles. To start, simply select a template from Canva’s vast library categorized by design type or theme. Once in the editor, you can easily adjust the content while retaining the structure and aesthetic integrity of the original layout.</p><p>Templates not only streamline the design process but also provide a learning opportunity. By observing how elements are aligned, spaced, and color-coded in professionally made templates, users naturally develop an eye for good design. Canva Pro users can also create and save their own templates, which is useful for maintaining brand consistency across multiple projects.</p><p>Understanding how to effectively use and customize templates is key to producing high-quality designs efficiently. It empowers users to start strong with each project while gradually improving their design confidence and skillset.</p>`
        },
        { 
            id: 'canva-level-6', 
            title: 'Basic Text and Typography', 
            description: 'Add and style text, understand headings vs. body text, and apply basic text effects.', 
            xp: 135, 
            coins: 15,
            content: `<h3>The Role of Text</h3><p>Text is a fundamental element of most designs, and mastering typography is essential for clear communication and visual appeal. In Canva, you can add text to your designs using a wide variety of fonts, sizes, styles, and effects. Canva categorizes text options into "Heading," "Subheading," and "Body text" to help guide layout structure.</p><h3>Typography Basics</h3><p>Typography isn’t just about choosing a font—it’s about how type is used to guide viewers' attention, set the tone, and reinforce the message. Canva offers hundreds of fonts, including both free and premium options, that can be customized by size, color, letter spacing, line height, and alignment. Canva Pro users can upload custom fonts, an essential feature for brand consistency.</p><p>To enhance your typography skills, you can explore features like text effects (e.g., shadow, lift, hollow, neon, curve), layering, and even animating text for video content. Canva also supports keyboard shortcuts and grouping for efficient editing.</p><p>Understanding text hierarchy (titles, subtitles, and body) and choosing complementary font pairings are vital for effective design. By practicing with Canva’s text tools, users can elevate their projects with typography that not only looks good but also enhances readability and impact.</p>`
        },
        { 
            id: 'canva-level-7', 
            title: 'Using Canva Elements (Shapes, Icons, Photos)', 
            description: 'Discover the Elements library and how to add shapes, icons, and other graphics to your designs.', 
            xp: 142, 
            coins: 16,
            content: `<h3>What are Elements?</h3><p>Canva Elements are building blocks that add visual interest, structure, and communication to your designs. Elements include a wide range of features such as shapes, icons, lines, illustrations, photos, stickers, charts, and more. These tools help designers enhance layouts and guide the viewer's eye effectively.</p><h3>Types of Elements</h3><ul><li><strong>Shapes:</strong> Shapes are essential for organizing layouts, creating backgrounds, or highlighting information. You can use rectangles for content boxes, circles for buttons, or polygons for infographics. Each shape can be resized, rotated, recolored, and layered to fit your design.</li><li><strong>Icons & Illustrations:</strong> These offer stylistic accents and help represent ideas visually without words. Canva's library includes icons in multiple styles—flat, outlined, filled, 3D—which can be matched to your overall design theme. These are especially useful in infographics, web design, and branding.</li><li><strong>Photos:</strong> Photos in Canva come from a vast stock image library, including both free and premium images. You can search by keyword, drag and drop into your layout, and use features like cropping, filters, or background removal to customize images.</li></ul><p>Mastering the use of elements in Canva allows users to create engaging, balanced, and visually cohesive designs. By combining various elements creatively, you can make your designs more dynamic and communicative, regardless of your skill level.</p>`
        },
        { 
            id: 'canva-level-8', 
            title: 'Uploading Your Own Images', 
            description: 'Learn how to upload, manage, and edit your own photos and logos within Canva.', 
            xp: 149, 
            coins: 17,
            content: `<h3>Personalize Your Designs</h3><p>Uploading your own images into Canva allows for maximum personalization and brand consistency in your designs. This feature is especially useful for businesses, content creators, and educators who want to incorporate specific photos, logos, product shots, or branded graphics into their content.</p><h3>How to Upload</h3><p>To upload an image, you can simply drag and drop it into Canva’s editor or use the Uploads panel to select files from your computer, smartphone, or cloud storage services such as Google Drive and Dropbox. Supported file formats include JPG, PNG, SVG, and GIF, and files are saved in your account's upload section for reuse in future designs.</p><h3>Editing Uploaded Images</h3><p>Once uploaded, your images can be manipulated using Canva’s editing tools. You can crop, resize, rotate, flip, adjust colors, apply filters, and add effects like transparency or shadows. This enables you to seamlessly integrate your visual assets into a wide range of designs—from social media graphics and presentations to brochures and videos.</p><p>Being able to upload and modify your own images ensures you maintain control over the branding and tone of your content. It also enhances versatility, allowing you to bring in personal or corporate imagery to differentiate your designs from Canva’s standard assets.</p>`
        },
        { 
            id: 'canva-level-9', 
            title: 'Saving and Sharing Designs', 
            description: 'How to save your work, download it in various formats, and share it for collaboration or publishing.', 
            xp: 156, 
            coins: 18,
            content: `<h3>Automatic Saving</h3><p>One of Canva’s greatest strengths is its ability to automatically save your work and make sharing your designs fast and simple. When you create a design in Canva, it is automatically saved to your account in real time, so you don’t need to worry about losing progress if you forget to click a “Save” button. You can access saved designs anytime from your dashboard under the “Projects” or “Recent Designs” section.</p><h3>Collaboration and Sharing</h3><p>Sharing your designs is just as easy and flexible. Canva allows you to share your work in multiple ways depending on your needs. You can click the "Share" button at the top-right of the editor to generate a link to your design. This link can be set to allow others to view, comment, or even edit your project, depending on the permission settings you choose. This makes it easy to collaborate with teammates, clients, or classmates in real time.</p><h3>Publishing Your Work</h3><p>For distribution or publication, you can also download your design in various formats (such as PNG, JPG, PDF, or MP4 for videos) or share directly to social media platforms like Facebook, Instagram, and LinkedIn. Canva also supports scheduling posts for social media with Canva Pro.</p><p>Understanding how to save and share your designs ensures smooth collaboration, protects your progress, and simplifies publishing your work—making your design workflow more efficient and professional.</p>`
        },
        { 
            id: 'canva-level-10', 
            title: 'Working with Photos in Canva', 
            description: 'How to use Canva’s built-in photo library, apply filters, and make basic adjustments.', 
            xp: 163, 
            coins: 19,
            content: `<h3>The Importance of Photos</h3><p>Photos play a crucial role in creating visually compelling designs, and Canva makes it easy to find, insert, and edit high-quality images directly within its platform. Whether you’re designing for social media, presentations, or printed materials, mastering how to work with photos in Canva can dramatically elevate the look and feel of your projects.</p><h3>Finding and Using Photos</h3><p>Canva offers access to an extensive library of free and premium stock photos, searchable by keywords, categories, and themes. You can explore this collection by clicking on the “Photos” tab in the left-hand panel of the editor. From there, you can drag and drop images into your design, use them as backgrounds, or frame them inside shapes and grids for more structured layouts.</p><h3>Editing Photos</h3><p>Once a photo is placed on the canvas, Canva provides powerful yet beginner-friendly editing tools. These include cropping, flipping, rotating, resizing, and applying filters or photo effects to enhance the image’s appearance. You can also adjust brightness, contrast, saturation, blur, and tint to better match your design’s color palette or mood. Canva Pro users have access to the Background Remover tool, which allows you to delete photo backgrounds in one click—perfect for creating professional-looking product photos or cutout-style images.</p><p>Photos can be layered behind or in front of other elements, grouped with text or graphics, or given transparency to blend into the overall design. Canva also allows users to add frames and use grid layouts to organize multiple images in a cohesive way.</p><p>By learning to effectively work with photos, you’ll gain the ability to convey emotion, tell stories, and create visually engaging content. Photos are more than decorative—they are visual communicators. Canva simplifies the process of finding and editing the right photo, empowering users to create polished, high-quality designs with ease.</p>`
        },
    ],
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
            content: `<h3>What Are Reels, Anyway? (And Why Should You Care?)</h3><p>This chapter focuses on the topic: What Are Reels, Anyway? (And Why Should You Care?). We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-2',
            title: 'The Psychology of Short-Form Video: Why Reels Work',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 107,
            coins: 11,
            content: `<h3>The Psychology of Short-Form Video: Why Reels Work</h3><p>This chapter focuses on the topic: The Psychology of Short-Form Video: Why Reels Work. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-3',
            title: 'Getting to Know the Reels Platforms',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 114,
            coins: 12,
            content: `<h3>Getting to Know the Reels Platforms</h3><p>This chapter focuses on the topic: Getting to Know the Reels Platforms. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-4',
            title: 'Shooting Great Footage with a Phone',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 121,
            coins: 13,
            content: `<h3>Shooting Great Footage with a Phone</h3><p>This chapter focuses on the topic: Shooting Great Footage with a Phone. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-5',
            title: 'Lighting 101: How Not to Look Like a Potato',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 128,
            coins: 14,
            content: `<h3>Lighting 101: How Not to Look Like a Potato</h3><p>This chapter focuses on the topic: Lighting 101: How Not to Look Like a Potato. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-6',
            title: 'Framing & Composition: Don’t Crop Your Forehead',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 135,
            coins: 15,
            content: `<h3>Framing & Composition: Don’t Crop Your Forehead</h3><p>This chapter focuses on the topic: Framing & Composition: Don’t Crop Your Forehead. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-7',
            title: 'Audio Basics: Mic Me, Baby One More Time',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 142,
            coins: 16,
            content: `<h3>Audio Basics: Mic Me, Baby One More Time</h3><p>This chapter focuses on the topic: Audio Basics: Mic Me, Baby One More Time. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-8',
            title: 'Editing Apps 101: CapCut, InShot, VN, and More',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 149,
            coins: 17,
            content: `<h3>Editing Apps 101: CapCut, InShot, VN, and More</h3><p>This chapter focuses on the topic: Editing Apps 101: CapCut, InShot, VN, and More. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-9',
            title: 'Intro to Timelines: Chopping It Up',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 156,
            coins: 18,
            content: `<h3>Intro to Timelines: Chopping It Up</h3><p>This chapter focuses on the topic: Intro to Timelines: Chopping It Up. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-10',
            title: 'Adding Music & Syncing to the Beat',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 163,
            coins: 19,
            content: `<h3>Adding Music & Syncing to the Beat</h3><p>This chapter focuses on the topic: Adding Music & Syncing to the Beat. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-11',
            title: 'Text, Captions & Subtitles That Don’t Suck',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 170,
            coins: 20,
            content: `<h3>Text, Captions & Subtitles That Don’t Suck</h3><p>This chapter focuses on the topic: Text, Captions & Subtitles That Don’t Suck. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-12',
            title: 'Stickers, Emojis & Graphics – Less Cringe, More Cool',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 177,
            coins: 21,
            content: `<h3>Stickers, Emojis & Graphics – Less Cringe, More Cool</h3><p>This chapter focuses on the topic: Stickers, Emojis & Graphics – Less Cringe, More Cool. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-13',
            title: 'Export Settings: What the Heck is 1080p?',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 184,
            coins: 22,
            content: `<h3>Export Settings: What the Heck is 1080p?</h3><p>This chapter focuses on the topic: Export Settings: What the Heck is 1080p?. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-14',
            title: 'Posting Your First Reel Without Panic',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 191,
            coins: 23,
            content: `<h3>Posting Your First Reel Without Panic</h3><p>This chapter focuses on the topic: Posting Your First Reel Without Panic. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-15',
            title: 'Beginner Mistakes (and How to Dodge Them)',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 198,
            coins: 24,
            content: `<h3>Beginner Mistakes (and How to Dodge Them)</h3><p>This chapter focuses on the topic: Beginner Mistakes (and How to Dodge Them). We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-16',
            title: 'Understanding the Algorithm',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 205,
            coins: 25,
            content: `<h3>Understanding the Algorithm</h3><p>This chapter focuses on the topic: Understanding the Algorithm. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-17',
            title: 'Hook, Line & Scroll: Keeping Viewers Watching',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 212,
            coins: 26,
            content: `<h3>Hook, Line & Scroll: Keeping Viewers Watching</h3><p>This chapter focuses on the topic: Hook, Line & Scroll: Keeping Viewers Watching. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-18',
            title: 'Transitions: Snap, Spin, Zoom Like a Pro',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 219,
            coins: 27,
            content: `<h3>Transitions: Snap, Spin, Zoom Like a Pro</h3><p>This chapter focuses on the topic: Transitions: Snap, Spin, Zoom Like a Pro. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-19',
            title: 'B-Roll Basics: Because Main Footage is Lonely',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 226,
            coins: 28,
            content: `<h3>B-Roll Basics: Because Main Footage is Lonely</h3><p>This chapter focuses on the topic: B-Roll Basics: Because Main Footage is Lonely. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-20',
            title: 'Editing for Pace & Flow',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 233,
            coins: 29,
            content: `<h3>Editing for Pace & Flow</h3><p>This chapter focuses on the topic: Editing for Pace & Flow. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-21',
            title: 'Color Correction 101: From Meh to Wow',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 240,
            coins: 30,
            content: `<h3>Color Correction 101: From Meh to Wow</h3><p>This chapter focuses on the topic: Color Correction 101: From Meh to Wow. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-22',
            title: 'Sound Effects & Background Audio',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 247,
            coins: 31,
            content: `<h3>Sound Effects & Background Audio</h3><p>This chapter focuses on the topic: Sound Effects & Background Audio. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-23',
            title: 'Working with CapCut Templates',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 254,
            coins: 32,
            content: `<h3>Working with CapCut Templates</h3><p>This chapter focuses on the topic: Working with CapCut Templates. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-24',
            title: 'Creating Branded Reels',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 261,
            coins: 33,
            content: `<h3>Creating Branded Reels</h3><p>This chapter focuses on the topic: Creating Branded Reels. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-25',
            title: 'Remixing & Duets for Trend Power',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 268,
            coins: 34,
            content: `<h3>Remixing & Duets for Trend Power</h3><p>This chapter focuses on the topic: Remixing & Duets for Trend Power. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-26',
            title: 'Scripting & Planning: Spontaneity is a Lie',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 275,
            coins: 35,
            content: `<h3>Scripting & Planning: Spontaneity is a Lie</h3><p>This chapter focuses on the topic: Scripting & Planning: Spontaneity is a Lie. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-27',
            title: 'Voiceovers Without the Robot Vibe',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 282,
            coins: 36,
            content: `<h3>Voiceovers Without the Robot Vibe</h3><p>This chapter focuses on the topic: Voiceovers Without the Robot Vibe. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-28',
            title: 'Call-to-Action (CTA) Magic',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 289,
            coins: 37,
            content: `<h3>Call-to-Action (CTA) Magic</h3><p>This chapter focuses on the topic: Call-to-Action (CTA) Magic. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-29',
            title: 'Thumbnails That Get Clicked',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 296,
            coins: 38,
            content: `<h3>Thumbnails That Get Clicked</h3><p>This chapter focuses on the topic: Thumbnails That Get Clicked. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-30',
            title: 'Reading Reels Analytics Without Crying',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 303,
            coins: 39,
            content: `<h3>Reading Reels Analytics Without Crying</h3><p>This chapter focuses on the topic: Reading Reels Analytics Without Crying. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-31',
            title: 'Editing for Emotion: Psychology of Music & Cuts',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 310,
            coins: 40,
            content: `<h3>Editing for Emotion: Psychology of Music & Cuts</h3><p>This chapter focuses on the topic: Editing for Emotion: Psychology of Music & Cuts. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-32',
            title: 'Mastering Complex Transitions',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 317,
            coins: 41,
            content: `<h3>Mastering Complex Transitions</h3><p>This chapter focuses on the topic: Mastering Complex Transitions. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-33',
            title: 'Advanced Text Animations & Graphics',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 324,
            coins: 42,
            content: `<h3>Advanced Text Animations & Graphics</h3><p>This chapter focuses on the topic: Advanced Text Animations & Graphics. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-34',
            title: 'Cinematic Reels with Just a Phone',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 331,
            coins: 43,
            content: `<h3>Cinematic Reels with Just a Phone</h3><p>This chapter focuses on the topic: Cinematic Reels with Just a Phone. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-35',
            title: 'Green Screen & Mobile Keying',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 338,
            coins: 44,
            content: `<h3>Green Screen & Mobile Keying</h3><p>This chapter focuses on the topic: Green Screen & Mobile Keying. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-36',
            title: 'Advanced Audio: Ducking, EQ & More',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 345,
            coins: 45,
            content: `<h3>Advanced Audio: Ducking, EQ & More</h3><p>This chapter focuses on the topic: Advanced Audio: Ducking, EQ & More. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-37',
            title: 'Trend Forecasting Like a Futurist',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 352,
            coins: 46,
            content: `<h3>Trend Forecasting Like a Futurist</h3><p>This chapter focuses on the topic: Trend Forecasting Like a Futurist. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-38',
            title: 'Perfecting Seamless Loops',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 359,
            coins: 47,
            content: `<h3>Perfecting Seamless Loops</h3><p>This chapter focuses on the topic: Perfecting Seamless Loops. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-39',
            title: 'Storytelling in 30 Seconds',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 366,
            coins: 48,
            content: `<h3>Storytelling in 30 Seconds</h3><p>This chapter focuses on the topic: Storytelling in 30 Seconds. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-40',
            title: 'Editing for Multiple Platforms',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 373,
            coins: 49,
            content: `<h3>Editing for Multiple Platforms</h3><p>This chapter focuses on the topic: Editing for Multiple Platforms. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-41',
            title: 'Fixing Bad Footage with Hacks',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 380,
            coins: 50,
            content: `<h3>Fixing Bad Footage with Hacks</h3><p>This chapter focuses on the topic: Fixing Bad Footage with Hacks. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-42',
            title: 'Collaborating with Other Creators',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 387,
            coins: 51,
            content: `<h3>Collaborating with Other Creators</h3><p>This chapter focuses on the topic: Collaborating with Other Creators. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-43',
            title: 'Using AI Tools in Your Workflow',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 394,
            coins: 52,
            content: `<h3>Using AI Tools in Your Workflow</h3><p>This chapter focuses on the topic: Using AI Tools in Your Workflow. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-44',
            title: 'Creating Your Signature Editing Style',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 401,
            coins: 53,
            content: `<h3>Creating Your Signature Editing Style</h3><p>This chapter focuses on the topic: Creating Your Signature Editing Style. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-45',
            title: 'Monetizing Your Reels Creatively',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 408,
            coins: 54,
            content: `<h3>Monetizing Your Reels Creatively</h3><p>This chapter focuses on the topic: Monetizing Your Reels Creatively. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-46',
            title: 'Building a Content Calendar',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 415,
            coins: 55,
            content: `<h3>Building a Content Calendar</h3><p>This chapter focuses on the topic: Building a Content Calendar. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-47',
            title: 'Outsourcing Editing Like a CEO',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 422,
            coins: 56,
            content: `<h3>Outsourcing Editing Like a CEO</h3><p>This chapter focuses on the topic: Outsourcing Editing Like a CEO. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-48',
            title: 'Copyright, Music & Fair Use',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 429,
            coins: 57,
            content: `<h3>Copyright, Music & Fair Use</h3><p>This chapter focuses on the topic: Copyright, Music & Fair Use. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-49',
            title: 'Creating Your Portfolio',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 436,
            coins: 58,
            content: `<h3>Creating Your Portfolio</h3><p>This chapter focuses on the topic: Creating Your Portfolio. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
        {
            id: 'reels-level-50',
            title: 'Final Challenge: Build a 5-Reel Series',
            description: 'We\'ll walk through the key principles, real-world use cases, and editing strategies you can implement immediately.',
            xp: 443,
            coins: 59,
            content: `<h3>Final Challenge: Build a 5-Reel Series</h3><p>This chapter focuses on the topic: Final Challenge: Build a 5-Reel Series. We'll walk through the key principles, real-world use cases, and editing strategies you can implement immediately. Whether you're editing on mobile or desktop, this guide delivers actionable tips, tools, and checklists. We also include humor and storytelling to make the content enjoyable while still highly professional.</p><h4>Summary:</h4><ul><li>Core learning objectives</li><li>Practical tools & apps</li><li>Tips to apply today</li><li>Common pitfalls to avoid</li></ul>`
        },
    ]
};
