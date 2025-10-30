import dynamic from "next/dynamic";
import React from "react";

// Impor Lanyard secara dinamis dan nonaktifkan Server Side Rendering (SSR)
// Ini adalah langkah KRITIS untuk mengatasi TypeError.
const LanyardComponent = dynamic(
  () => import("@/components/ui/lanyard/lanyard"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Memuat konten 3D...
        </p>
      </div>
    ),
  }
);

interface LanyardWrapperProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

/**
 * Wrapper yang memastikan komponen Lanyard (Canvas R3F) hanya di-render di sisi klien.
 * Ini mencegah error runtime yang disebabkan oleh inisialisasi objek Three.js di server.
 */
export default function LanyardWrapper(props: LanyardWrapperProps) {
  // LanyardWrapper harus mengembalikan kontainer dengan dimensi yang sama
  // seperti yang didefinisikan di Ab.tsx.
  return (
    // Karena Ab.tsx sudah mendefinisikan dimensi, kita cukup memastikan
    // wrapper ini menggunakan lebar dan tinggi penuh dari kontainernya.
    <div className="w-full h-full">
      <LanyardComponent {...props} />
    </div>
  );
}
