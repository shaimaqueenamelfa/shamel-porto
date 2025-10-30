"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// ✅ Registrasi plugin GSAP (WAJIB)
gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  tag = "p",
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Tunggu font selesai dimuat sebelum animasi dijalankan
  useEffect(() => {
    if (document.fonts.status === "loaded") {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !fontsLoaded) return;
      const el = ref.current as HTMLElement & { _split?: GSAPSplitText };

      // Reset animasi sebelumnya
      if (el._split) {
        try {
          el._split.revert();
        } catch (_) {}
      }

      const split = new GSAPSplitText(el, { type: splitType });
      el._split = split;

      const targets =
        splitType === "chars"
          ? split.chars
          : splitType === "words"
          ? split.words
          : split.lines;

      // 🎨 Animasi saat hover
      el.addEventListener("mouseenter", () => {
        gsap.fromTo(
          targets,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration,
            ease,
            stagger: delay / 1000,
          }
        );
      });

      el.addEventListener("mouseenter", () => {
        gsap.fromTo(
          targets,
          { opacity: 0, y: 8, willChange: "transfrom, opacity" },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
            stagger: 0.02,
          }
        );
      });

      return () => {
        try {
          split.revert();
        } catch (_) {}
      };
    },
    { dependencies: [text, delay, duration, ease, splitType, fontsLoaded] }
  );

  // Render tag dinamis (h1, h2, p, dll)
  const Tag = tag;
  return (
    <Tag
      ref={ref}
      className={`split-text inline-block overflow-hidden ${className}`}
      style={{ textAlign }}>
      {text}
    </Tag>
  );
};

export default SplitText;
