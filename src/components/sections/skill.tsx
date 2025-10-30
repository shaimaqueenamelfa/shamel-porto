// components/SkillsSection.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layers, Server, Database, Settings, Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";

const skills = [
  {
    id: "frontend",
    title: "Frontend",
    icon: <Layers className="h-5 w-5" />,
    tags: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    id: "backend",
    title: "Backend",
    icon: <Server className="h-5 w-5" />,
    tags: ["Laravel", "REST API", "Auth"],
  },
  {
    id: "database",
    title: "Database",
    icon: <Database className="h-5 w-5" />,
    tags: ["MySQL"],
  },
  {
    id: "tools",
    title: "Tools",
    icon: <Settings className="h-5 w-5" />,
    tags: ["GitHub", "Vercel"],
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Skills() {
  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );

  useEffect(() => {
    // Sinkronkan awal (mis. jika server-rendered)
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((v) => !v);

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8" id="skill">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Skills
            </p>
            <h2 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-black dark:text-white">
              Tech I work with
            </h2>
            <p className="mt-4 max-w-3xl text-base sm:text-lg text-gray-600 dark:text-gray-300">
              A balanced stack across frontend, backend, database, and tooling —
              used in real-world projects and teaching material.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((s) => (
            <motion.article
              key={s.id}
              variants={cardVariant}
              className="rounded-2xl border border-gray-200/40 bg-white shadow-sm p-6
                dark:bg-gray-900 dark:border-gray-700 transition-shadow duration-200"
              // hover effect: slight lift + scale
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.995 }}
              role="group">
              <div className="flex items-center gap-3">
                <div
                  className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-green-600/10 text-green-400
                    dark:bg-green-400/10"
                  aria-hidden>
                  {s.icon}
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  {s.title}
                </h3>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium
                      text-gray-700 bg-gray-50 border-gray-200/60
                      dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 transition">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
