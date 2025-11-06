"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Server, Database, Settings } from "lucide-react";

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
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Skills() {
  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8" id="skill">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 text-center sm:text-left">
          <div className="flex-1">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">
              Skills
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground">
              Tech I work with
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto sm:mx-0">
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
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {skills.map((s) => (
            <motion.article
              key={s.id}
              variants={cardVariant}
              className="rounded-2xl border border-border bg-card text-card-foreground shadow-sm p-6
                transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div
                  className="inline-flex items-center justify-center h-10 w-10 rounded-lg 
                    bg-green-600/10 text-green-600 dark:text-green-400 dark:bg-green-400/10"
                  aria-hidden>
                  {s.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {s.title}
                </h3>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 rounded-full border border-border
                      bg-muted text-foreground px-3 py-1 text-sm font-medium transition-colors">
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
