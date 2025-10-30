"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Globe,
  Coffee,
  Home,
  Folder,
  Send,
  User,
  Code2,
} from "lucide-react";

import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./theme-toggle";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  globe: Globe,
  coffee: Coffee,
  home: Home,
  folder: Folder,
  send: Send,
  user: User,
  code2: Code2,
};

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Desktop Navbar (Top) */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-6 left-1/2 z-50 -translate-x-1/2 w-[70%] max-w-3xl rounded-full border border-border/40 bg-background/80 backdrop-blur-xl shadow-lg shadow-black/20 hidden md:block">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {siteConfig.navigation.map((item) => (
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="inline-block"
                key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-foreground/60 hover:text-foreground"
                  )}>
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />

            <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile">
                <Github className="h-4 w-4" />
              </Link>
            </Button>

            {/* Mobile Menu (only appears on md:hidden, just for completeness) */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  aria-label="Toggle menu">
                  {isOpen ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Menu className="h-4 w-4" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    {siteConfig.siteName}
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                  {/* Navigation Links */}
                  <nav className="space-y-1">
                    {siteConfig.navigation.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                          pathname === item.href
                            ? "bg-accent text-accent-foreground"
                            : "text-foreground/60 hover:text-foreground"
                        )}>
                        {item.label}
                        {pathname === item.href && (
                          <Badge variant="secondary" className="ml-auto">
                            Current
                          </Badge>
                        )}
                      </Link>
                    ))}
                  </nav>

                  <Separator />

                  {/* Bio */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold">About</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {siteConfig.description}
                    </p>
                  </div>

                  <Separator />

                  {/* Social Links */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold">Connect</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {siteConfig.social.map((social) => {
                        const Icon = social.icon
                          ? iconMap[social.icon as keyof typeof iconMap]
                          : null;
                        return (
                          <Button
                            key={social.url}
                            variant="outline"
                            size="sm"
                            asChild
                            className="justify-start">
                            <Link
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer">
                              {Icon && <Icon className="mr-2 h-4 w-4" />}
                              {social.label}
                            </Link>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>

      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-0 left-0 z-50 w-full border-t border-border/40 bg-background/80 backdrop-blur-xl shadow-lg shadow-black/20 md:hidden">
        <div className="flex justify-around items-center h-16">
          {siteConfig.navigation.map((item) => {
            const isActive = pathname === item.href;
            const iconName = item.label.toLowerCase();

            const Icon = iconName.includes("home")
              ? iconMap.home
              : iconName.includes("project")
              ? iconMap.folder
              : iconName.includes("contact")
              ? iconMap.send
              : iconName.includes("about")
              ? iconMap.user
              : iconName.includes("skill")
              ? iconMap.code2
              : iconMap.globe;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center text-xs font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-foreground/60 hover:text-foreground"
                )}>
                <Icon className="h-5 w-5 mb-1" />
                {item.label}
              </Link>
            );
          })}

          <div className="flex flex-col items-center text-xs font-medium">
            <ThemeToggle />
            <span className="text-[10px] mt-1">Theme</span>
          </div>
        </div>
      </div>
    </>
  );
}
