import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    "/DatePhotos/MAINPHOTO.jpg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.44.29 (1).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.44.29 (2).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.44.29 (3).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.44.29 (4).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.44.29 (5).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.44.29 (6).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.44.29 (7).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.44.29 (8).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.44.29 (9).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.44.29 (10).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.44.29 (11).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.44.29 (12).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.44.29 (13).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.44.29 (14).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.44.29 (15).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.45.50.jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.45.51 (1).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.45.51 (2).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.45.51 (3).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.45.51 (4).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.45.51 (5).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.45.51 (6).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.45.51 (7).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.45.51 (8).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.45.51 (9).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.45.51 (10).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.45.51 (11).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.45.51 (12).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.45.51 (13).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.45.51.jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.45.52 (1).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.45.52 (2).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.45.52 (3).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.45.52 (4).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.45.52 (5).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.45.52 (6).jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 11.45.52.jpeg",
    "/DatePhotos/WhatsApp Image 2025-11-22 at 12.00.48.jpeg"
];

export function BackgroundSlideshow() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 6000); // Change every 6 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src={images[currentIndex]}
                        alt="Date memory"
                        className="w-full h-full object-cover opacity-60"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Cinematic Grain/Texture Overlay (Optional) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
        </div>
    );
}
