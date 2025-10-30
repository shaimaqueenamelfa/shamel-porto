"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Github, Code2 } from "lucide-react";
import { ProjectsGrid } from "../ui/projects-grid";
import { ProjectsWrapper } from "../ui/projects-wrapper";

export function Projects() {
  return (
    // Menggunakan padding vertikal dan horizontal yang lebih terukur
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="proyek">
      {/* Header Section - Menggunakan text-center, padding bawah yang lebih jelas */}
      <motion.div
        id="proyect"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16">
        <Badge
          variant="outline"
          // Menjaga ukuran yang konsisten dan menambahkan margin bawah
          className="mb-4 bg-primary/5 text-primary border-primary/20 text-sm py-1 px-3">
          <Code2 className="mr-1 h-3 w-3" />
          Projects
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl mb-6 leading-tight">
          My{" "}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Projects
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
          A collection of projects that showcase my skills in full-stack
          development, machine learning, and open source contributions. Each
          project represents a journey of learning and innovation.
        </p>
      </motion.div>

      {/* Projects Section - Menggunakan ProjectsWrapper di luar div lain untuk fleksibilitas */}
      <ProjectsWrapper />

      {/* Footer Info Section - Menggunakan padding atas yang lebih jelas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-12 pt-4 border-t border-dashed border-gray-200/50">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Github className="h-4 w-4" />
          <span>Fetched from GitHub API</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4" />
          <span>Updated in real-time</span>
        </div>
      </motion.div>
    </div>
  );
}
