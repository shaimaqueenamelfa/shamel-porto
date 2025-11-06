import Link from "next/link";
import { Github, Mail, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { name: "Home", href: "/" },
        { name: "Projects", href: "#proyek" }, // Tautan ke bagian Projects
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        {
          name: "GitHub Profile",
          href: "https://github.com/shaimaqueenamelfa",
        },
        { name: "Tailwind CSS", href: "https://tailwindcss.com/" },
        { name: "Framer Motion", href: "https://www.framer.com/motion/" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  return (
    <footer className="bg-background text-foreground transition-colors -mt-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Kolom 1: Logo & Deskripsi Singkat */}
          <div className="col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-foreground hover:text-primary dark:hover:text-primary transition">
              Shaima
            </Link>
            <p className="mt-4 text-sm text-foreground max-w-xs">
              Portofolio ini menampilkan perjalanan inovasi dan pembelajaran.
            </p>
            <div className="mt-6 flex space-x-4">
              {/* Social Icons */}
              <a
                href="https://github.com/shaimaqueenamelfa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground transition">
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:shaima.queena19@smk.belajar.id"
                className="text-foreground transition">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Kolom 2, 3, 4: Tautan Cepat (Mapping Links) */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                {section.title}
              </h3>
              <ul role="list" className="mt-4 space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground transition"
                      target={
                        link.href.startsWith("http") ? "_blank" : "_self"
                      }>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Hak Cipta (Copyright) */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
          <p className="text-base text-foreground text-center">
            &copy; {currentYear} Shaima. All rights reserved. Built with Next.js
            and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
