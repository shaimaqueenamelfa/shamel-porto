// src/global.d.ts

export {};
// Baris ini memastikan file diperlakukan sebagai modul global, bukan lokal.

// 1. DEKLARASI ASET (GLB & PNG)
// Memungkinkan TypeScript menerima 'import' untuk file-file ini
// tanpa error (meskipun kita menggunakan string path di kode).
declare module "*.glb";
declare module "*.png";

// 2. DEKLARASI MESHLINE LIBRARY
// Mendefinisikan tipe untuk komponen MeshLine yang diimpor.
declare module "meshline" {
  export const MeshLineGeometry: any;
  export const MeshLineMaterial: any;
}

// 3. DEKLARASI ELEMEN JSX KUSTOM (WAJIB)
// Ini adalah bagian KRITIS yang mengatasi error merah pada
// <meshLineGeometry /> dan <meshLineMaterial /> karena
// elemen tersebut bukan elemen HTML standar atau elemen R3F bawaan.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}
