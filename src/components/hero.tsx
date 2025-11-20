"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export function Hero() {
    const [showSuccess, setShowSuccess] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
    const [hasBeenHovered, setHasBeenHovered] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Activity options for the slot machine
    const activities = [
        "getting sushi again",
        "catching a movie at AMC",
        "getting lunch somewhere new",
        "getting breakfast at that spot",
        "looking to smoke and chill",
        "doing Netflix and vibes",
        "hitting up Glenstone Museum",
        "doing Jazz in DC",
        "grabbing coffee downtown",
        "checking out that new restaurant",
    ];

    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Matrix rain effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops: number[] = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }

        const matrix = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

        function draw() {
            if (!ctx || !canvas) return;

            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#8b5cf6';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = matrix[Math.floor(Math.random() * matrix.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        const interval = setInterval(draw, 50);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Cycle through activities every 3 seconds (unless paused)
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentActivityIndex((prev) => (prev + 1) % activities.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [activities.length, isPaused]);

    const handleNextActivity = () => {
        setIsPaused(true); // Pause auto-rotation when user manually clicks
        setCurrentActivityIndex((prev) => (prev + 1) % activities.length);
    };

    const getRandomPosition = () => {
        // Keep button within a centered bounded area, not the entire viewport
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Define a box around the center where the button can move
        const isMobile = window.innerWidth < 640;
        const boxWidth = isMobile ? window.innerWidth * 0.8 : 800;
        const boxHeight = isMobile ? window.innerHeight * 0.6 : 500;

        const minX = centerX - boxWidth / 2;
        const maxX = centerX + boxWidth / 2 - 150; // Account for button width
        const minY = centerY - boxHeight / 2;
        const maxY = centerY + boxHeight / 2 - 80; // Account for button height

        return {
            x: minX + Math.random() * (maxX - minX),
            y: minY + Math.random() * (maxY - minY),
        };
    };

    const handleNoHover = () => {
        setAttempts((prev) => prev + 1);

        if (!hasBeenHovered && buttonRef.current) {
            // First hover - get button's current position and set it as starting point
            const rect = buttonRef.current.getBoundingClientRect();
            setNoButtonPosition({ x: rect.left, y: rect.top });
            setHasBeenHovered(true);
            // Wait a tick then move to random position
            setTimeout(() => {
                setNoButtonPosition(getRandomPosition());
            }, 50);
        } else {
            // Subsequent hovers - just move to random position
            setNoButtonPosition(getRandomPosition());
        }
    };

    const handleYesClick = () => {
        setShowSuccess(true);
    };

    if (showSuccess) {
        return (
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-950 dark:via-purple-950 dark:to-blue-950">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.8 }}
                    className="text-center space-y-6"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    >
                        <Heart className="w-24 h-24 mx-auto text-pink-500 fill-pink-500" />
                    </motion.div>
                    <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                        Yay! 🎉
                    </h1>
                    <p className="text-2xl text-muted-foreground">
                        I knew you'd say yes! Now let's plan the perfect hang out!
                    </p>
                    <p className="text-sm text-muted-foreground">
                        (You tried to click "No" {attempts} times 😏)
                    </p>
                </motion.div>
            </section>
        );
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950">
            {/* Matrix Rain Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 opacity-30 dark:opacity-20"
                style={{ pointerEvents: 'none' }}
            />

            {/* Decorative Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center space-y-8"
                >
                    <div className="flex justify-center">
                        <img
                            src="/ChooseGif.gif"
                            alt="Choose animation"
                            className="w-24 h-24 object-contain"
                        />
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
                        Specialized AI Decision Maker
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground">
                        I made a very advanced AI to determine our next hang out. <br />
                        It's incredibly sophisticated and uses cutting-edge technology.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-purple-200 dark:border-purple-800"
                    >
                        <div className="relative">
                            <div className="text-3xl md:text-4xl font-semibold mb-12 h-24 flex items-center justify-center overflow-hidden">
                                <span className="mr-2">Are we</span>
                                <motion.span
                                    key={currentActivityIndex}
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -50, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 inline-block"
                                >
                                    {activities[currentActivityIndex]}
                                </motion.span>
                                <span className="ml-2">?</span>
                            </div>

                            <button
                                onClick={handleNextActivity}
                                className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors flex items-center gap-1 group"
                            >
                                <span className="opacity-70 group-hover:opacity-100">Try another</span>
                                <svg
                                    className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Button
                                size="lg"
                                onClick={handleYesClick}
                                className="text-xl px-12 py-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all text-white font-semibold"
                            >
                                Yes! 💚
                            </Button>

                            {!hasBeenHovered ? (
                                <Button
                                    ref={buttonRef}
                                    size="lg"
                                    variant="outline"
                                    onMouseEnter={handleNoHover}
                                    onTouchStart={handleNoHover}
                                    className="text-xl px-12 py-8 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 font-semibold cursor-pointer"
                                >
                                    No 😢
                                </Button>
                            ) : (
                                <motion.div
                                    style={{
                                        position: "fixed",
                                        zIndex: 50,
                                    }}
                                    animate={{
                                        left: noButtonPosition.x,
                                        top: noButtonPosition.y,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 25,
                                    }}
                                >
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        onMouseEnter={handleNoHover}
                                        onTouchStart={handleNoHover}
                                        className="text-xl px-12 py-8 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 font-semibold cursor-pointer"
                                    >
                                        No 😢
                                    </Button>
                                </motion.div>
                            )}
                        </div>

                        {attempts > 0 && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-8 text-sm text-muted-foreground italic"
                            >
                                Nice try... but you can't escape! 😏
                                {attempts > 5 && " (Just give up already! 😂)"}
                            </motion.p>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
