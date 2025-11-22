"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, RefreshCw, Loader2 } from "lucide-react";
import { BackgroundSlideshow } from "./background-slideshow";

export function Hero() {
    const [showSuccess, setShowSuccess] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
    const [hasBeenHovered, setHasBeenHovered] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // AI-generated activities state
    const [activities, setActivities] = useState<string[]>([
        "loading date ideas...",
    ]);
    const [isLoadingActivities, setIsLoadingActivities] = useState(true);
    const [activitiesError, setActivitiesError] = useState<string | null>(null);

    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Fetch AI-generated activities on mount
    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async (refresh = false) => {
        setIsLoadingActivities(true);
        setActivitiesError(null);

        try {
            const url = refresh
                ? "/api/generate-dates?refresh=true"
                : "/api/generate-dates";
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Failed to fetch activities");
            }

            const data = await response.json();
            setActivities(data.activities);
            setCurrentActivityIndex(0);
        } catch (error) {
            console.error("Error fetching activities:", error);
            setActivitiesError("Failed to load date ideas");
            // Fallback to static activities
            setActivities([
                "getting sushi again",
                "catching a movie at AMC",
                "getting lunch somewhere new",
                "hitting up Glenstone Museum",
                "doing Jazz in DC",
                "sip and paint with white wine",
                "checking out that new restaurant",
                "brunch at a DMV hotspot",
                "live music on U Street",
                "exploring The Wharf",
            ]);
        } finally {
            setIsLoadingActivities(false);
        }
    };

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

    const handleYesClick = async () => {
        // Send webhook data
        try {
            await fetch('https://oncode.app.n8n.cloud/webhook/dbeea0a0-6dbb-4493-871b-9da54725177e', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    selection: 'YES',
                    activity: activities[currentActivityIndex],
                    activityIndex: currentActivityIndex,
                    timestamp: new Date().toISOString(),
                }),
            });
        } catch (error) {
            console.error('Failed to send webhook:', error);
        }

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
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Background Slideshow */}
            <BackgroundSlideshow />

            <div className="container mx-auto px-4 z-10 relative h-screen flex flex-col justify-center items-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-full max-w-4xl mx-auto text-center space-y-12"
                >
                    {/* Top Section - Small Vertical Text */}
                    <div className="space-y-4 flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-6"
                        >
                            <img
                                src="/ChooseGif.gif"
                                alt="Choose animation"
                                className="w-20 h-20 object-contain opacity-80"
                            />
                        </motion.div>

                        <h1 className="text-sm md:text-base font-bold text-white uppercase tracking-[0.3em] opacity-90">
                            AI-Powered Decision Engine
                        </h1>

                        <p className="text-xs md:text-sm text-gray-400 uppercase tracking-widest font-light">
                            I made a very advanced AI to determine our next hang out. It's very sophisticated mane
                        </p>
                    </div>

                    {/* Middle Section - Vertical Scrolling Credits */}
                    <div className="py-12 relative h-[400px] flex items-center justify-center overflow-hidden mask-gradient">
                        <div className="relative w-full flex flex-col items-center justify-center gap-8">
                            {/* Previous Option (Faded) */}
                            <motion.div
                                key={`prev-${currentActivityIndex}`}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 0.3, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.5 }}
                                className="text-sm md:text-base font-bold text-white uppercase tracking-wider absolute -top-16 pointer-events-none select-none"
                            >
                                {activities[(currentActivityIndex - 1 + activities.length) % activities.length]}
                            </motion.div>

                            {/* Current Option (Highlighted) */}
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    key={currentActivityIndex}
                                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    className="z-10 py-4"
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider leading-tight text-center max-w-3xl drop-shadow-2xl">
                                            {activities[currentActivityIndex]}
                                        </span>
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                                            Directed by AI
                                        </span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Next Option (Faded) */}
                            <motion.div
                                key={`next-${currentActivityIndex}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 0.3, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="text-sm md:text-base font-bold text-white uppercase tracking-wider absolute -bottom-16 pointer-events-none select-none"
                            >
                                {activities[(currentActivityIndex + 1) % activities.length]}
                            </motion.div>
                        </div>

                        {/* Navigation Controls (Side) */}
                        <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
                            <button
                                onClick={() => {
                                    setCurrentActivityIndex((prev) => (prev - 1 + activities.length) % activities.length);
                                }}
                                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all border border-white/10 hover:border-white/30"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                            <button
                                onClick={handleNextActivity}
                                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all border border-white/10 hover:border-white/30"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Bottom Section - Actions */}
                    <div className="space-y-8">
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
                                Current Selection
                            </p>
                            <div className="w-8 h-[1px] bg-white/20" />
                        </div>

                        <div className="flex flex-row gap-8 justify-center items-center">
                            <Button
                                onClick={handleYesClick}
                                className="bg-transparent hover:bg-white/10 text-white border border-white/30 rounded-none px-8 py-6 text-xs uppercase tracking-[0.2em] transition-all hover:border-white"
                            >
                                Confirm
                            </Button>

                            {!hasBeenHovered ? (
                                <Button
                                    ref={buttonRef}
                                    variant="ghost"
                                    onMouseEnter={handleNoHover}
                                    onTouchStart={handleNoHover}
                                    className="text-gray-500 hover:text-white hover:bg-transparent px-8 py-6 text-xs uppercase tracking-[0.2em] transition-colors"
                                >
                                    Decline
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
                                        variant="ghost"
                                        onMouseEnter={handleNoHover}
                                        onTouchStart={handleNoHover}
                                        className="text-gray-500 hover:text-white hover:bg-transparent px-8 py-6 text-xs uppercase tracking-[0.2em] transition-colors"
                                    >
                                        Decline
                                    </Button>
                                </motion.div>
                            )}
                        </div>

                        {/* Refresh - Very Subtle */}
                        <button
                            onClick={() => fetchActivities(true)}
                            disabled={isLoadingActivities}
                            className="text-[10px] uppercase tracking-[0.2em] text-gray-600 hover:text-gray-400 transition-colors"
                        >
                            {isLoadingActivities ? "Generating..." : "Refresh List"}
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
