"use client";

import { motion } from "framer-motion";
import TiltedCard from "../ui/titlecard";

export function Ab() {
  return (
    <motion.section
      id="ab"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full min-h-screen flex items-center justify-center relative overflow-hidden z-10 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <div className="w-full min-h-screen flex items-center justify-center relative overflow-hidden z-10 px-8 sm:px-12 lg:px-20">
        {/* Grid utama responsif */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Kartu Foto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-[3/4] flex items-center">
              <TiltedCard
                imageSrc="/image/poto.jpeg"
                captionText="Shaima Queena Melfa"
                showMobileWarning={false}
              />
            </div>
          </motion.div>

          {/* Deskripsi */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col justify-center space-y-6 text-center lg:text-left">
            {/* Judul */}
            <div className="space-y-2">
              <p className="uppercase tracking-widest text-sm text-gray-500 dark:text-gray-400">
                About
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black dark:text-white">
                Building the next wave of{" "}
                <span className="text-green-500 dark:text-green-400">
                  developers
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                I'm Shaima Queena Melfa — a 12th-grade student at SMK
                Informatika Pesat, majoring in Software Engineering (RPL). I
                specialize in front-end development, creating modern and
                responsive web interfaces using Next.js, Laravel, and Tailwind
                CSS. I'm passionate about learning new technologies and turning
                ideas into real projects that people can use.
              </p>
            </div>

            {/* Tombol Aksi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-4">
              {/* 
                href="#resume"
                className="inline-block group relative overflow-hidden bg-transparent text-black dark:text-white border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium rounded-full transition-all duration-300">
                Lihat CV Saya
              </a> */}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default Ab;
