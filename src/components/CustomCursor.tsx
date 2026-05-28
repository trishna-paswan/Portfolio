"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide default cursor on desktop
    const addStyles = () => {
      document.body.style.cursor = "none";
    };
    
    const removeStyles = () => {
      document.body.style.cursor = "auto";
    };

    // Only enable custom cursor if it's a fine-pointer device (desktop)
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouchDevice) {
      addStyles();
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") || 
        target.closest("a") || 
        target.closest("[role='button']") ||
        target.classList.contains("interactive-element") ||
        target.closest(".interactive-element");
        
      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      removeStyles();
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Spring Glow */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-neon-cyan/60 pointer-events-none z-50 mix-blend-screen -ml-4 -mt-4"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovered ? 1.8 : 1,
          backgroundColor: isHovered ? "rgba(0, 240, 255, 0.15)" : "rgba(0, 240, 255, 0.02)",
          boxShadow: isHovered 
            ? "0 0 20px rgba(0, 240, 255, 0.4), inset 0 0 10px rgba(0, 240, 255, 0.2)"
            : "0 0 8px rgba(0, 240, 255, 0.1)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
      
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-neon-cyan rounded-full pointer-events-none z-50 -ml-1 -mt-1"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHovered ? 0.5 : 1,
        }}
      />
    </>
  );
}
