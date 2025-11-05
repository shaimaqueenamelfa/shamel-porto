"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  Calendar,
  AlertCircle,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export function ProjectsGrid() {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [allTopics, setAllTopics] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [showTags, setShowTags] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
        // Collect all topics from all projects, remove duplicates
        const topicsSet = new Set<string>();
        data.forEach((project: GitHubRepo) => {
          project.topics.forEach((topic) => topicsSet.add(topic));
        });
        setAllTopics(Array.from(topicsSet).sort());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // --- Filtering and Pagination Logic (Kept as is) ---

  // Filter logic based on search and selectedTopic (though the logic inside seems to keep all for now)
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.description?.toLowerCase().includes(search.toLowerCase()) ||
      project.topics.some((topic) =>
        topic.toLowerCase().includes(search.toLowerCase())
      );

    const matchesTopic = selectedTopic
      ? project.topics.includes(selectedTopic)
      : true;

    return matchesSearch && matchesTopic;
  });

  const displayedProjects = filteredProjects; // Use filteredProjects instead of projects
  const totalPages = Math.ceil(displayedProjects.length / pageSize);
  const paginatedProjects = displayedProjects.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // --- Rendering States (Kept as is) ---

  if (loading) {
    return (
      <div className="mb-6">
        {/* Centered Search Bar with icon, like PostsSearch */}
        <div className="relative max-w-md mx-auto mb-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground transform -translate-y-1/2 transition-colors" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-background/50 backdrop-blur-sm border-border/60 focus:border-primary/50"
            disabled={true}
          />
        </div>
        {/* Skeleton for filter bar */}
        <div className="flex flex-wrap gap-2 mb-4 px-4 md:px-6 lg:px-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Button
              key={i}
              disabled
              className="rounded-full px-4 py-1 text-xs opacity-50">
              <span className="sr-only">Loading</span>
              <span className="animate-pulse">&nbsp;</span>
            </Button>
          ))}
        </div>
        {/* Skeleton grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 px-4 md:px-6 lg:px-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card
              key={i}
              className="group h-full min-h-[420px] flex flex-col flex-1 overflow-hidden border-0 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl">
              <div className="relative h-32 w-full overflow-hidden mb-2">
                <div className="animate-pulse bg-muted w-full h-full rounded-t-xl" />
              </div>
              <CardHeader className="relative space-y-4 flex-1">
                <div className="space-y-2 flex-1">
                  <div className="h-5 w-3/4 bg-muted rounded animate-pulse mb-2" />
                  <div className="h-4 w-full bg-muted rounded animate-pulse" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground ml-4">
                  <div className="h-4 w-8 bg-muted rounded animate-pulse" />
                </div>
              </CardHeader>
              <CardContent className="relative space-y-4 flex-1 flex flex-col justify-between">
                <div className="flex flex-wrap gap-2">
                  <div className="h-4 w-16 bg-muted rounded-full animate-pulse" />
                  <div className="h-4 w-12 bg-muted rounded-full animate-pulse" />
                  <div className="h-4 w-10 bg-muted rounded-full animate-pulse" />
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-14 bg-muted rounded animate-pulse" />
                </div>
                <div className="flex items-center gap-3 pt-4">
                  <div className="h-9 w-full bg-muted rounded-lg animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] px-4">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <h3 className="text-lg font-semibold">Unable to load projects</h3>
          <p className="text-muted-foreground">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // --- Main Content Rendering (Modify this part for visual change) ---
  return (
    <>
      {/* Projects Search Bar & Tag Filter (mobile/desktop combined controls) */}
      <div className="mb-6 px-4 md:px-6 lg:px-8">
        {/* Centered Search Bar */}
        <div className="relative max-w-md mx-auto mb-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground transform -translate-y-1/2 transition-colors" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset page on search
            }}
            className="pl-10 bg-background/50 backdrop-blur-sm border-border/60 focus:border-primary/50"
          />
        </div>
        <div className="flex sm:hidden justify-between items-center mb-2">
          <button
            className="px-4 py-2 rounded-full border text-xs font-medium transition-colors bg-primary text-primary-foreground border-border"
            onClick={() => setShowTags((v) => !v)}
            aria-label="Toggle tags filter">
            {showTags ? "Hide Tags" : "Show Tags"}
          </button>
          <button
            className={`px-4 py-2 rounded-full border text-xs font-medium transition-colors ${
              selectedTopic === null && search === ""
                ? "bg-background text-foreground"
                : "bg-primary text-primary-foreground"
            } border-border`}
            onClick={() => {
              setSelectedTopic(null);
              setSearch("");
            }}>
            Clear All
          </button>
        </div>
        {/* Collapsible Tags for Mobile and Desktop */}
        {(showTags || window.innerWidth >= 640) && (
          <div
            className={`flex flex-wrap items-center gap-3 mt-4 justify-start ${
              showTags ? "" : "hidden sm:flex"
            }`}>
            <button
              className={`px-4 py-2 rounded-full border text-xs font-medium transition-colors h-7 ${
                selectedTopic === null && search === ""
                  ? "bg-background text-foreground"
                  : "bg-primary text-primary-foreground"
              } border-border`}
              onClick={() => {
                setSelectedTopic(null);
                setSearch("");
              }}>
              Clear Filter
            </button>
            {allTopics.map((topic) => (
              <Button
                key={topic}
                variant={selectedTopic === topic ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedTopic(topic);
                  setSearch(""); // Clear search when topic is selected
                  setCurrentPage(1);
                }}
                className="text-xs h-7">
                {topic}
              </Button>
            ))}
          </div>
        )}

        {/* Active Filters Display */}
        {(search || selectedTopic) && (
          <div className="flex flex-wrap items-center gap-2 mt-2 justify-start px-4 md:px-0">
            <span className="text-sm text-muted-foreground">
              Active filters:
            </span>
            {search && (
              <Badge variant="secondary" className="text-xs">
                Search: &quot;{search}&quot;
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearch("");
                    setCurrentPage(1);
                  }}
                  className="ml-1 h-4 w-4 p-0">
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {selectedTopic && (
              <Badge variant="secondary" className="text-xs">
                Tag: {selectedTopic}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedTopic(null);
                    setCurrentPage(1);
                  }}
                  className="ml-1 h-4 w-4 p-0">
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Projects Grid (VISUAL CHANGE AREA) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-10 px-4 md:px-6 lg:px-8">
        {paginatedProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="h-full flex flex-col">
            {/* Hapus min-h-[420px] dan kurangi padding/ukuran font di mobile */}
            <Card className="group h-full flex flex-col flex-1 overflow-hidden border-0 bg-card shadow-lg hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-500 hover:-translate-y-1 rounded-xl">
              {/* Subtle Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Preview Image: Tinggi dikurangi di mobile (h-28) */}
              <div className="relative h-28 sm:h-32 w-full overflow-hidden mb-2">
                <Image
                  src={`https://opengraph.githubassets.com/1/${project.full_name}`}
                  alt={project.name}
                  width={400}
                  height={128}
                  className="object-cover w-full h-full rounded-t-xl group-hover:scale-[1.02] transition-transform duration-500"
                  priority={index < 4}
                  unoptimized
                />
              </div>

              {/* CardHeader: Padding dan Font Size dikurangi di mobile */}
              <CardHeader className="relative space-y-2 flex-1 p-3 sm:p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-base sm:text-lg group-hover:text-primary transition-colors line-clamp-1">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 leading-relaxed text-xs text-muted-foreground">
                      {project.description || "No description available"}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground ml-2 flex-shrink-0">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    <span>{project.stargazers_count}</span>
                  </div>
                </div>
                {/* Language Badge: Font Size dikurangi di mobile */}
                {project.language && (
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: getLanguageColor(project.language),
                      }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {project.language}                 
                    </span>
                    {/* className={`h-2 w-2 rounded-full bg-[${getLanguageColor(
                        project.language
                      )}]`}
                    /> */}

                    <span className="text-xs text-muted-foreground">
                      {project.language}
                    </span>
                  </div>
                )}
              </CardHeader>

              {/* CardContent: Padding dan Margin dikurangi di mobile */}
              <CardContent className="relative space-y-3 flex flex-col justify-end p-3 sm:p-4 pt-0">
                {/* Tags: Margin dan ukuran badge dikurangi */}
                {project.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.topics.slice(0, 3).map((topic) => (
                      <Badge
                        key={topic}
                        variant="secondary"
                        className="text-[10px] h-5 bg-primary/10 hover:bg-primary/20 transition-colors border-primary/20 text-primary">
                        {topic}
                      </Badge>
                    ))}
                    {project.topics.length > 3 && (
                      <Badge variant="outline" className="text-[10px] h-5">
                        +{project.topics.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Footer Stats: Padding atas dan ukuran font dikurangi */}
                <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-dashed border-border/50">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Updated {formatDate(project.updated_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" />
                    <span>{project.forks_count} Forks</span>
                  </div>
                </div>

                {/* Tombol Link: Padding atas dan ukuran tombol dikurangi */}
                <div className="flex items-center gap-2 pt-2">
                  <Button
                    asChild
                    size="sm" // Gunakan sm/h-8 untuk mobile agar tidak terlalu kecil
                    variant="outline"
                    className="flex-1 h-8 text-xs border-primary/50 text-primary hover:bg-primary hover:text-white">
                    <Link
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2">
                      <Github className="h-3 w-3" />
                      Code
                    </Link>
                  </Button>
                  {project.homepage && (
                    <Button
                      asChild
                      size="sm" // Gunakan sm/h-8 untuk mobile
                      className="flex-1 h-8 text-xs bg-indigo-600 hover:bg-indigo-700">
                      <Link
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2">
                        <ExternalLink className="h-3 w-3" />
                        Live
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1)
                    setCurrentPage((p) => Math.max(1, p - 1));
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                  }}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages)
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}

// Helper Functions (Kept as is)
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) return "today";
  if (diffInDays === 1) return "yesterday";
  if (diffInDays < 30) return `${diffInDays} days ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}

function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572a5",
    Java: "#b07219",
    "C#": "#239120",
    Go: "#00add8",
    Rust: "#dea584",
    PHP: "#4f5d95",
    Ruby: "#701516",
    Swift: "#ffac45",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",
    CSS: "#1572b6",
    HTML: "#e34c26",
    Vue: "#4FC08D",
    React: "#61DAFB",
    Svelte: "#ff3e00",
  };

  return colors[language] || "#6b7280";
}
