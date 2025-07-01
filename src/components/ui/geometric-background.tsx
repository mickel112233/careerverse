
"use client";

import { motion } from 'framer-motion';

const Shape = ({ variants, className }: { variants: any, className: string }) => (
    <motion.div
        variants={variants}
        className={`absolute -z-10 ${className}`}
        style={{ willChange: 'transform' }}
    />
);

export default function GeometricBackground() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                duration: 0.5,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, scale: 0.5 },
        show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100 } },
    };

    const shapes = [
        // Pink crosses
        { className: "top-[10%] left-[5%] h-8 w-8 bg-pink-500/30 [clip-path:polygon(20%_0,80%_0,80%_20%,100%_20%,100%_80%,80%_80%,80%_100%,20%_100%,20%_80%,0_80%,0_20%,20%_20%)]" },
        { className: "bottom-[15%] right-[10%] h-12 w-12 bg-pink-500/20 [clip-path:polygon(20%_0,80%_0,80%_20%,100%_20%,100%_80%,80%_80%,80%_100%,20%_100%,20%_80%,0_80%,0_20%,20%_20%)]" },
        // Purple circles
        { className: "top-[5%] right-[20%] h-6 w-6 rounded-full bg-purple-500/30" },
        { className: "bottom-[40%] left-[15%] h-10 w-10 rounded-full bg-purple-500/20" },
        // Blue triangles
        { className: "top-[45%] left-[30%] h-8 w-8 bg-blue-500/20 [clip-path:polygon(50%_0%,0%_100%,100%_100%)] rotate-12" },
        { className: "bottom-[5%] left-[45%] h-12 w-12 bg-blue-500/10 [clip-path:polygon(50%_0%,0%_100%,100%_100%)] -rotate-45" },
        // White squares
        { className: "top-[20%] right-[5%] h-4 w-4 bg-slate-200/20 rotate-45" },
        { className: "bottom-[25%] left-[5%] h-6 w-6 bg-slate-200/10 rotate-[22deg]" },
    ];

    return (
        <motion.div
            className="absolute inset-0 -z-10 h-full w-full overflow-hidden"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <div className="absolute inset-0 -z-20 bg-gradient-to-br from-indigo-950 via-background to-background"></div>
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(hsl(var(--primary)/0.1)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            {shapes.map((shape, index) => (
                <Shape key={index} variants={item} className={shape.className} />
            ))}
        </motion.div>
    );
}
