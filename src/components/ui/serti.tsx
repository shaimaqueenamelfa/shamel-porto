import { useEffect, useState, useRef } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "motion/react";
import React, { JSX } from "react";

// replace icons with your own if needed
import {
  FiCircle,
  FiCode,
  FiFileText,
  FiLayers,
  FiLayout,
} from "react-icons/fi";

export interface CarouselItem {
  title: string;
  description: string;
  id: number;
  icon?: React.ReactNode;
  image?: string; // Pastikan properti image ada di interface
}

export interface CarouselProps {
  items?: CarouselItem[];
  baseWidth?: number;

  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

const DEFAULT_ITEMS: CarouselItem[] = [
  {
    title: "Text Animations",
    description: "Cool text animations for your projects.",
    id: 1,
    image: "/images/sertifikat1.jpeg", // icon: <FiFileText className="h-[16px] w-[16px] text-white" />
  },
  {
    title: "Animations",
    description: "Smooth animations for your projects.",
    id: 2, // icon: <FiCircle className="h-[16px] w-[16px] text-white" />
  },
  {
    title: "Components",
    description: "Reusable components for your projects.",
    id: 3, // icon: <FiLayers className="h-[16px] w-[16px] text-white" />
  },
  {
    title: "Backgrounds",
    description: "Beautiful backgrounds and patterns for your projects.",
    id: 4, // icon: <FiLayout className="h-[16px] w-[16px] text-white" />
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}: CarouselProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null); // 🆕 PERUBAHAN 1: State untuk melacak lebar kontainer aktual
  const [containerWidth, setContainerWidth] = useState(baseWidth); // 🆕 PERUBAHAN 2: useEffect untuk mendengarkan perubahan ukuran layar dan mendapatkan lebar

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        // Mengambil lebar aktual kontainer saat ini
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth(); // Set lebar awal
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const containerPadding = 16; // ✅ PERUBAHAN 3: itemWidth sekarang dihitung berdasarkan lebar kontainer dinamis (containerWidth)
  const itemWidth = containerWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  return (
    <div
      ref={containerRef} // ✅ PERUBAHAN 4: Ubah w-[baseWidth]px menjadi w-full, dan gunakan baseWidth sebagai max-width
      className={`relative overflow-hidden w-full max-w-[${baseWidth}px] mx-auto ${
        round
          ? "rounded-full border border-white"
          : "rounded-[24px] border border-[#222]"
      }`} // ❌ Hapus style={{ width: `${baseWidth}px` }}
      style={{
        ...(round && { height: `${baseWidth}px` }),
      }}>
                       {" "}
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          height: "350px", // Lebar itemWidth sekarang otomatis dihitung ulang
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${
            currentIndex * trackItemOffset + itemWidth / 2
          }px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}>
                               {" "}
        {carouselItems.map((item, index) => {
          const range = [
            -(index + 1) * trackItemOffset,
            -index * trackItemOffset,
            -(index - 1) * trackItemOffset,
          ];
          const outputRange = [90, 0, -90];
          const rotateY = useTransform(x, range, outputRange, { clamp: false });
          return (
            <motion.div
              key={index}
              className={`relative shrink-0 flex flex-col ${
                round
                  ? "items-center justify-center text-center bg-[#060010] border-0"
                  : "items-start justify-between bg-[#222] border border-[#222] rounded-[12px]"
              } overflow-hidden cursor-grab active:cursor-grabbing`}
              style={{
                width: itemWidth,
                height: round ? itemWidth : "100%",
                rotateY: rotateY,
                ...(round && { borderRadius: "50%" }),
              }}
              transition={effectiveTransition}>
              {/* 1. Menampilkan Gambar */}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              )}
              {/* 2. Menampilkan Icon/Placeholder jika tidak ada gambar */}     
                     {" "}
              {!item.image && (
                <div className={`${round ? "p-0 m-0" : "mb-4 p-5"}`}>
                  <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#060010]">
                                        {item.icon}
                  </span>
                </div>
              )}
              {/* 3. Menampilkan Teks di atas Gambar (Z-index dan Overlay disesuaikan) */}
              {/* Perubahan: p-5 -> p-4, bg-black/50 -> bg-black/30, backdrop-blur-sm dihapus */}
              <div className="p-4 absolute bottom-0 w-full bg-black/30 z-10">
                <div className="mb-1 font-black text-base text-white">
                  {item.title}
                </div>
                <p className="text-xs text-white opacity-90">
                  {item.description} 
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      <div
        className={`flex w-full justify-center ${
          round ? "absolute z-20 bottom-12 left-1/2 -translate-x-1/2" : ""
        }`}>
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                currentIndex % items.length === index
                  ? round
                    ? "bg-white"
                    : "bg-[#333333]"
                  : round
                  ? "bg-[#555]"
                  : "bg-[rgba(51,51,51,0.4)]"
              }`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
