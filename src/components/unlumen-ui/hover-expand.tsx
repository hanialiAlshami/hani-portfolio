"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export interface HoverExpandItem {
  label: string;
  /** e.g. country, year, category */
  sublabel?: string;
  image: string;
  imageAlt?: string;
  /** short descriptor shown when expanded */
  description?: string;
}

export interface HoverExpandProps {
  items: HoverExpandItem[];
  /**
   * Row height when collapsed, in pixels.
   * @default 68
   */
  collapsedHeight?: number;
  /**
   * Row height when expanded on desktop, in pixels.
   * @default 580
   */
  expandedHeight?: number;
  /**
   * Row height when expanded on mobile/touch, in pixels.
   * @default 260
   */
  mobileExpandedHeight?: number;
  className?: string;
  /**
   * Optional fallback text when no items are available.
   */
  emptyFallbackText?: string;
}

export function HoverExpand({
  items,
  collapsedHeight = 68,
  expandedHeight = 580,
  mobileExpandedHeight = 260,
  className,
  emptyFallbackText,
}: HoverExpandProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [tappedIndex, setTappedIndex] = React.useState<number | null>(null);
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  const shouldReduceMotion = useReducedMotion();

  // SSR-safe responsive pointer detection
  React.useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePointer = () => {
      setIsTouchDevice(!mql.matches);
    };
    updatePointer();

    if (mql.addEventListener) {
      mql.addEventListener("change", updatePointer);
      return () => mql.removeEventListener("change", updatePointer);
    } else {
      mql.addListener(updatePointer);
      return () => mql.removeListener(updatePointer);
    }
  }, []);

  // Mobile / touch requirement: initially expand the first panel so users immediately see a project preview
  React.useEffect(() => {
    if (mounted && isTouchDevice && items.length > 0 && tappedIndex === null) {
      setTappedIndex(0);
    }
  }, [mounted, isTouchDevice, items.length, tappedIndex]);

  if (!items || items.length === 0) {
    return (
      <div
        className={cn(
          "w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 text-center text-sm text-muted-foreground",
          className
        )}
      >
        {emptyFallbackText || "No project preview images available."}
      </div>
    );
  }

  const effectiveExpandedHeight = isTouchDevice ? mobileExpandedHeight : expandedHeight;

  // Determine if a specific panel is expanded
  const isExpanded = (index: number) => {
    if (isTouchDevice) {
      return tappedIndex === index;
    }
    if (hoveredIndex !== null) {
      return hoveredIndex === index;
    }
    return tappedIndex === index;
  };

  const hasAnyExpanded = isTouchDevice
    ? tappedIndex !== null
    : hoveredIndex !== null || tappedIndex !== null;

  // Interaction handlers
  const handleItemClick = (index: number) => {
    if (isTouchDevice) {
      // Tapping the active item collapses it; tapping another expands it
      setTappedIndex((prev) => (prev === index ? null : index));
    } else {
      // Desktop toggle / keyboard activation
      setTappedIndex((prev) => (prev === index ? null : index));
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!isTouchDevice) {
      setHoveredIndex(index);
    }
  };

  const handleContainerMouseLeave = () => {
    if (!isTouchDevice) {
      setHoveredIndex(null);
      setTappedIndex(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleItemClick(index);
    }
  };

  return (
    <div
      className={cn("flex flex-col w-full select-none", className)}
      onMouseLeave={handleContainerMouseLeave}
    >
      <div className="w-full border-t border-white/10" />

      {items.map((item, i) => {
        const itemExpanded = isExpanded(i);
        const isDimmed = hasAnyExpanded && !itemExpanded;

        return (
          <React.Fragment key={i}>
            <motion.div
              role="button"
              tabIndex={0}
              aria-expanded={itemExpanded}
              aria-label={`${item.label}${item.sublabel ? ` — ${item.sublabel}` : ""}`}
              className={cn(
                "group relative w-full overflow-hidden cursor-pointer transition-colors duration-200 outline-none",
                "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset focus-visible:z-20"
              )}
              animate={{
                height: itemExpanded ? effectiveExpandedHeight : collapsedHeight,
                opacity: isDimmed ? 0.42 : 1,
              }}
              transition={{
                height: shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      stiffness: 280,
                      damping: 32,
                      mass: 0.9,
                    },
                opacity: shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.24, ease: "easeOut" },
              }}
              onMouseEnter={() => handleMouseEnter(i)}
              onClick={() => handleItemClick(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            >
              {/* Preview image presentation container */}
              <motion.div
                className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
                initial={false}
                animate={{
                  opacity: itemExpanded ? 1 : 0,
                  scale: itemExpanded ? 1 : 1.02,
                }}
                transition={{
                  opacity: {
                    duration: shouldReduceMotion ? 0 : 0.35,
                    ease: [0.23, 1, 0.32, 1],
                  },
                  scale: {
                    duration: shouldReduceMotion ? 0 : 0.45,
                    ease: [0.23, 1, 0.32, 1],
                  },
                }}
              >
                {item.image ? (
                  <>
                    {/* Ambient blurred backdrop: fills the entire container seamlessly */}
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="100vw"
                        className="w-full h-full object-cover blur-3xl opacity-35 scale-110 pointer-events-none"
                        aria-hidden="true"
                      />
                      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
                    </div>

                    {/* Main crisp screenshot: OBJECT-CONTAIN so it fills container without ANY cropping */}
                    <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4 pb-14 sm:pb-16 pointer-events-none">
                      <Image
                        src={item.image}
                        alt={item.imageAlt ?? item.label}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1400px"
                        priority={i === 0}
                        className="w-full h-full object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.85)]"
                      />
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-800" />
                )}

                {/* Subtle gradient at the bottom to guarantee text contrast */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/95 via-black/70 to-transparent pointer-events-none" />
              </motion.div>

              {/* Panel content / Labels & Typography */}
              <div
                className={cn(
                  "absolute inset-x-0 bottom-0 flex items-center justify-between px-4 sm:px-6 pointer-events-none transition-all duration-200",
                  itemExpanded ? "pb-4 sm:pb-5" : "h-full"
                )}
              >
                <div className="flex w-full items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                    {/* Index Number */}
                    <motion.span
                      className="text-xs sm:text-sm font-mono tabular-nums shrink-0 opacity-60"
                      animate={{
                        color: itemExpanded ? "#ffffff" : "currentColor",
                        opacity: itemExpanded ? 0.85 : 0.45,
                      }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.span>

                    {/* Main Label */}
                    <motion.span
                      className="font-semibold tracking-tight truncate"
                      style={{ fontSize: "clamp(1.05rem, 2vw, 1.35rem)" }}
                      animate={{
                        color: itemExpanded ? "#ffffff" : "currentColor",
                      }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                    >
                      {item.label}
                    </motion.span>

                    {/* Optional Description (appears smoothly on expansion, no duplicate text) */}
                    {item.description && item.description.trim() !== item.label.trim() && (
                      <motion.span
                        className="text-xs sm:text-sm text-white/75 truncate hidden md:inline-block max-w-sm lg:max-w-md font-normal"
                        initial={false}
                        animate={{
                          opacity: itemExpanded ? 1 : 0,
                          x: itemExpanded ? 0 : -6,
                        }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.3,
                          delay: shouldReduceMotion ? 0 : itemExpanded ? 0.12 : 0,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                      >
                        — {item.description}
                      </motion.span>
                    )}
                  </div>

                  {/* Sublabel / Tag */}
                  {item.sublabel && (
                    <motion.span
                      className="text-[10px] sm:text-xs font-medium tracking-wider uppercase shrink-0 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm"
                      animate={{
                        color: itemExpanded ? "#ffffff" : "currentColor",
                        opacity: itemExpanded ? 1 : 0.6,
                        borderColor: itemExpanded
                          ? "rgba(212, 168, 54, 0.4)"
                          : "rgba(255, 255, 255, 0.1)",
                      }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                    >
                      {item.sublabel}
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.div>

            <div className="w-full border-t border-white/10" />
          </React.Fragment>
        );
      })}
    </div>
  );
}
