"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { Github, Linkedin, Mail } from "lucide-react";

export function About() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full min-h-screen flex items-center justify-center relative overflow-hidden z-10 px-6 sm:px-10 lg:px-16">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none select-none" />

      {/* Kontainer utama */}
      <div className="relative mx-auto w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-14 md:gap-20 lg:gap-24">
        {/* Kiri: Nama, jabatan, ikon */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 text-center md:text-left space-y-4">
          <p className="text-base sm:text-lg text-muted-foreground">
            Hi, I’m{" "}
            <span className="font-medium text-foreground">
              {siteConfig.author}
            </span>
          </p>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            Front-End <br className="hidden sm:block" /> Developer
          </h1>

          {/* Ikon Sosial */}
          <div className="flex justify-center md:justify-start gap-5 pt-6">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer">
              <div className="p-3 border border-border/60 rounded-xl hover:border-primary/50 transition-all duration-300 cursor-pointer">
                <Github className="h-6 w-6 text-foreground" />
              </div>
            </Link>

            <Link href={`mailto:${siteConfig.links.email}`}>
              <div className="p-3 border border-border/60 rounded-xl hover:border-primary/50 transition-all duration-300 cursor-pointer">
                <Mail className="h-6 w-6 text-foreground" />
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Kanan: Deskripsi */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="flex-1 md:w-1/2 lg:w-2/5 text-center md:text-left flex items-center">
          <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground max-w-xl mx-auto md:mx-0">
            I’m a 12th-grade student at SMK Informatika Pesat, majoring in
            Software Engineering. I focus on{" "}
            <span className="text-primary font-semibold">
              front-end development
            </span>
            , creating clean and responsive web apps using tools like{" "}
            <span className="font-medium">Next.js</span>,{" "}
            <span className="font-medium">Laravel</span>, and{" "}
            <span className="font-medium">Tailwind CSS</span>. I love building
            creative solutions that people can actually use.
          </p>
        </motion.div>
      </div>

      {/* Efek cahaya */}
      <div className="absolute left-1/4 top-1/4 h-40 w-40 sm:h-64 sm:w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute right-1/4 bottom-1/4 h-40 w-40 sm:h-64 sm:w-64 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
    </motion.section>
  );
}

export default About;
