"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Lanyard from "@/components/ui/lanyard/lanyard";
import TiltedCard from "../ui/titlecard";
export function Ab() {
  return (
    <motion.section
      id="ab"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full min-h-screen flex items-center justify-center relative overflow-hidden z-10 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 h-[600px] sm:h-[700px] md:h-[800px] lg:h-[600px]">
              <TiltedCard
                imageSrc="/image/poto.jpeg"
                captionText="shaima queena melfa"
                showMobileWarning={false}
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="space-y-8 lg:pl-8">
            {/* Judul */}
            <div className="space-y-2">
              <p className="uppercase tracking-widest text-sm text-gray-500 dark:text-gray-400">
                About
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-black dark:text-white">
                Building the next wave of{" "}
                <span className="text-green-500 dark:text-green-400">
                  developers
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
                I’m Shaima Queena Melfa — a 12th-grade student at SMK
                Informatika Pesat, majoring in Software Engineering (RPL). I
                specialize in front-end development, creating modern and
                responsive web interfaces using Next.js, Laravel, and Tailwind
                CSS. I’m passionate about learning new technologies and turning
                ideas into real projects that people can use.
              </p>
            </div>

            {/* Tombol Aksi */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-4">
              <a
                href="#resume"
                className="inline-block group relative overflow-hidden bg-transparent text-black dark:text-white border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-8 py-4 text-base font-medium rounded-full transition-all duration-300">
                Lihat CV Saya
              </a>
            </motion.div> */}
          </motion.div>
        </div>
      </div>

      {/* Tombol Chat Mengambang - kanan bawah */}
      {/* <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-8 right-8 z-50">
        <button
          className="w-14 h-14 bg-black dark:bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
          onClick={() => alert("Fitur chat - hubungkan ke sistem chat Anda")}>
          <svg
            className="w-6 h-6 text-white dark:text-black transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          a
        </button>
      </motion.div> */}
    </motion.section>
  );
}

export default Ab;
