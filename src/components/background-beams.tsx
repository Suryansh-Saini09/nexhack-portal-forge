"use client";
import React, { memo, useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/* ======================
   CONFIG
====================== */

const PATH_COUNT = 16; // ⬅️ reduced from ~60
const BASE_PATH =
  "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875";

/* ======================
   COMPONENT
====================== */

export const BackgroundBeams = memo(
  ({ className }: { className?: string }) => {
    /* Generate fewer paths deterministically */
    const paths = useMemo(() => {
      return Array.from({ length: PATH_COUNT }).map((_, i) =>
        BASE_PATH.replace(/-189/, String(-189 - i * 8)),
      );
    }, []);

    return (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-0 overflow-hidden",
          className,
        )}
      >
        <svg
          className="absolute h-full w-full"
          viewBox="0 0 700 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shared animated gradient */}
          <defs>
            <motion.linearGradient
              id="beam-gradient"
              gradientUnits="userSpaceOnUse"
              initial={{ x1: "0%", y1: "0%", x2: "0%", y2: "100%" }}
              animate={{ x1: "100%", y1: "0%", x2: "100%", y2: "100%" }}
              transition={{
                duration: 18,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              <stop offset="0%" stopColor="#18CCFC" stopOpacity="0" />
              <stop offset="30%" stopColor="#6344F5" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#AE48FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
            </motion.linearGradient>
          </defs>

          {/* Paths */}
          {paths.map((d, i) => (
            <path
              key={i}
              d={d}
              stroke="url(#beam-gradient)"
              strokeWidth="0.6"
              strokeOpacity="0.25"
            />
          ))}
        </svg>
      </div>
    );
  },
);

BackgroundBeams.displayName = "BackgroundBeams";
