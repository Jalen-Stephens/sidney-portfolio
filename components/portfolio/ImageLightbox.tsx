"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { PortfolioItem } from "@/types/portfolio";
import { getItemDisplayLabel } from "@/data/taxonomy";

interface ImageLightboxProps {
  item: PortfolioItem | null;
  allItems: PortfolioItem[];
  onClose: () => void;
  onNavigate: (item: PortfolioItem) => void;
}

export default function ImageLightbox({
  item,
  allItems,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const currentIndex = item ? allItems.findIndex((i) => i.id === item.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allItems.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(allItems[currentIndex - 1]);
  }, [hasPrev, allItems, currentIndex, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(allItems[currentIndex + 1]);
  }, [hasNext, allItems, currentIndex, onNavigate]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose, goPrev, goNext]);

  useEffect(() => {
    document.body.style.overflow = item ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-ink-950/92 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close lightbox"
            className="absolute top-5 right-6 text-white/70 hover:text-white text-[11px] tracking-[0.25em] uppercase font-sans transition-colors duration-200 z-10"
          >
            Close ×
          </button>

          {/* Prev */}
          {hasPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Previous image"
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-[11px] tracking-[0.2em] uppercase font-sans transition-colors duration-200 z-10"
            >
              ← Prev
            </button>
          )}

          {/* Next */}
          {hasNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next image"
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-[11px] tracking-[0.2em] uppercase font-sans transition-colors duration-200 z-10"
            >
              Next →
            </button>
          )}

          {/* Content panel */}
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col md:flex-row gap-6 md:gap-10 max-w-5xl w-full max-h-[90vh] overflow-auto"
          >
            {/* Image */}
            <div className="flex-shrink-0 flex items-center justify-center md:max-w-[60%]">
              {/* IMAGEKIT SWAP: item.imageUrl will use ImageKit URL when env var is set */}
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={item.imageWidth}
                height={item.imageHeight}
                className="max-h-[70vh] w-auto object-contain"
                sizes="(max-width: 768px) 90vw, 55vw"
                priority
              />
            </div>

            {/* Metadata */}
            <div className="flex flex-col justify-center py-4 md:py-0 md:max-w-[40%]">
              <p className="text-[9px] tracking-[0.28em] uppercase font-sans text-blush-300 mb-4">
                {getItemDisplayLabel(item.topLevelCategory, item.subcategory)}
                {item.year && (
                  <span className="ml-3 text-white/30">· {item.year}</span>
                )}
              </p>
              <h2 className="font-display font-light text-white text-2xl md:text-3xl leading-tight mb-5">
                {item.title}
              </h2>
              <p className="font-sans text-sm text-white/60 leading-relaxed">
                {item.description}
              </p>

              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] tracking-[0.18em] uppercase font-sans text-white/30 border border-white/10 px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <p className="mt-8 text-[10px] tracking-[0.18em] font-sans text-white/25">
                {currentIndex + 1} / {allItems.length}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
