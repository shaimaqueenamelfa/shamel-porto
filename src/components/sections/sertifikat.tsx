"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Carousel from "../ui/serti";

// === Data Sertifikat ===
const certificates = [
  {
    id: 1,
    title: "Landing page with HTML and Css Certification",
    organization: "PT WAN Teknologi",
    image: "/image/s1.jpeg",
  },
  {
    id: 2,
    title: "EXPro Hotel Application Website Certification",
    organization: "PT Dimensi Kreasi Nusantara",
    image: "/image/s2.jpeg",
  },
  {
    id: 3,
    title: "Fullstack Mobile APP Developer Certification",
    organization: "Ginvo Studio",
    image: "/image/s3.jpeg",
  },
  {
    id: 3,
    title: "Webiste Liblary Management Certification",
    organization: "PT Kreasi Media",
    image: "/image/s4.jpeg",
  },
];

export default function SertifikatPage() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % certificates.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + certificates.length) % certificates.length);

  return (
    <section
      id="certificate"
      className="flex flex-col items-center justify-center  py-16 px-6 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      {/* === TEXT SECTION === */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center mb-12 max-w-3xl">
        <h2 className="text-4xl sm:text-5xl font-extrabold  tracking-tight">
          My Certificates
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed">
          A curated collection of my achievements, certifications, and skill
          recognition throughout my learning journey.
        </p>
      </motion.div>

      {/* === CAROUSEL SECTION === */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full flex justify-center max-w-3xl mx-auto ">
        <Carousel
          items={certificates.map((cert) => ({
            id: cert.id,
            title: cert.title,
            description: cert.organization,
            image: cert.image,
          }))}
          baseWidth={800} // kamu bisa ubah ke 700–900 sesuai ukuran layout
          autoplay={true}
          autoplayDelay={3000}
          pauseOnHover={true}
          loop={true}
          round={false}
        />
      </motion.div>
    </section>
  );
}
