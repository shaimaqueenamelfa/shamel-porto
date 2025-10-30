"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ProfileCard() {
  return (
    <motion.div
      className="relative w-80 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-[1px] shadow-lg hover:shadow-[0_0_25px_rgba(100,100,255,0.5)] transition-all duration-300"
      whileHover={{ scale: 1.05 }}>
      {/* Inner Card */}
      <div className="relative rounded-2xl bg-[#0f0f1a] text-center p-6 overflow-hidden">
        {/* Neon Border Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-500/10 to-blue-400/10 blur-xl"></div>

        {/* Profile Photo */}
        <div className="relative z-10 flex justify-center">
          <Image
            src="/profile.jpg" // ganti dengan foto kamu
            alt="Profile"
            width={120}
            height={120}
            className="rounded-full border-2 border-cyan-400/30"
          />
        </div>

        {/* Name & Job */}
        <div className="relative z-10 mt-4">
          <h2 className="text-xl font-semibold text-white">
            Shaima Queena Melfa
          </h2>
          <p className="text-sm text-gray-400">Front-End Developer</p>
        </div>

        {/* Contact Section */}
        <div className="relative z-10 mt-6 flex justify-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800/60 px-3 py-2 rounded-full">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <Image
                src="/profile.jpg" // sama seperti di atas
                alt="Avatar"
                width={24}
                height={24}
              />
            </div>
            <p className="text-sm text-gray-300">@shaima.dev</p>
            <span className="text-green-400 text-xs">● Online</span>
          </div>
          <button className="bg-cyan-500 hover:bg-cyan-400 text-black text-sm px-4 py-2 rounded-full font-medium transition">
            Contact Me
          </button>
        </div>
      </div>
    </motion.div>
  );
}
