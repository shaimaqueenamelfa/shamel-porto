"use client";

import { useState, useEffect } from "react";
import { ProjectsGrid } from "./projects-grid";

export function ProjectsWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <ProjectsGrid />;
}
