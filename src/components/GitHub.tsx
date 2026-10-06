"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";
import { Github, Star, GitFork, Code2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type GitHubUser = {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
};

type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  archived: boolean;
  fork: boolean;
};

function getGitHubUsername(profileUrl: string) {
  try {
    const url = new URL(profileUrl);
    const parts = url.pathname.split("/").filter(Boolean);
    return parts[0] || "supernitin06";
  } catch {
    return "supernitin06";
  }
}

export function GitHub() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".github-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      const statBars = statsRef.current?.querySelectorAll(".stat-bar");
      statBars?.forEach((bar, i) => {
        const el = bar as HTMLElement;
        const width = el.dataset.width || "70";
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
          },
          width: 0,
          duration: 1.2,
          delay: i * 0.15,
          ease: "power2.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const username = useMemo(
    () => getGitHubUsername(portfolioData.personal.github),
    []
  );

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setError(null);
        const [userRes, repoRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, {
            headers: { Accept: "application/vnd.github+json" },
          }),
          fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
            { headers: { Accept: "application/vnd.github+json" } }
          ),
        ]);

        if (!userRes.ok) throw new Error(`GitHub user request failed (${userRes.status})`);
        if (!repoRes.ok) throw new Error(`GitHub repos request failed (${repoRes.status})`);

        const userJson = (await userRes.json()) as GitHubUser;
        const repoJson = (await repoRes.json()) as GitHubRepo[];

        const filtered = repoJson
          .filter((r) => !r.fork && !r.archived)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6); // Adjusted to 6 for a nicer grid

        if (!cancelled) {
          setUser(userJson);
          setRepos(filtered);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load GitHub data");
          setRepos([]);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return (
    <section id="github" ref={sectionRef} className="py-32 px-6 bg-[#0a0a0f] relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#FB4D03]/10 to-transparent blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 github-title">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="cyber-badge">
              <span>🐙</span> OPEN SOURCE & CODE ACTIVITY
            </span>
          </div>
          <h2 ref={titleRef} className="text-3xl md:text-5xl font-black text-white">
            GitHub <span className="text-gradient">Activity</span> & Repos
          </h2>
        </div>

        <div ref={cardRef} className="glass rounded-[2rem] p-8 md:p-12 border border-white/10 bg-[#111116] backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 mb-12 border-b border-white/5 pb-12">

            {/* Profile Section */}
            <div className="flex-1 text-center lg:text-left flex flex-col justify-center h-full">
              <h3 className="text-3xl font-bold text-white mb-2 leading-tight">Code <span className="text-[#FB4D03]">&</span> Contributions</h3>
              <p className="text-gray-400 mb-8 max-w-sm mx-auto lg:mx-0">
                Explore my open source projects, activity, and overall code quality.
              </p>

              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center lg:justify-start gap-2 px-8 py-3.5 rounded-full bg-white text-black font-bold hover:bg-[#FB4D03] hover:text-white transition-all duration-300 mx-auto lg:mx-0 w-fit"
              >
                <Github className="w-5 h-5" />
                View GitHub Profile
              </a>

              {user ? (
                <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                  <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-center min-w-[100px]">
                    <span className="block text-2xl font-bold text-white mb-1">{user.public_repos}</span>
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Repos</span>
                  </div>
                  <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-center min-w-[100px]">
                    <span className="block text-2xl font-bold text-[#FB4D03] mb-1">{user.followers}</span>
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Followers</span>
                  </div>
                </div>
              ) : (
                <div className="mt-8 h-[76px] w-[220px] bg-white/5 animate-pulse rounded-2xl border border-white/10 mx-auto lg:mx-0" />
              )}
            </div>

            {/* Stats Bars section */}
            <div ref={statsRef} className="flex-1 w-full flex flex-col justify-center space-y-6 lg:pl-12 lg:border-l lg:border-white/5 h-full pt-8 lg:pt-0">
              <div className="w-full">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-white font-medium text-sm md:text-base">Contributions</span>
                  <span className="text-[#FB4D03] font-bold text-xs uppercase tracking-wider bg-[#FB4D03]/10 px-2.5 py-1 rounded-full">Active</span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="stat-bar h-full bg-gradient-to-r from-violet-500 to-[#FB4D03] rounded-full" data-width="85" style={{ width: "85%" }} />
                </div>
              </div>

              <div className="w-full">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-white font-medium text-sm md:text-base">Code Quality</span>
                  <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded-full">High</span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="stat-bar h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" data-width="90" style={{ width: "90%" }} />
                </div>
              </div>

              <div className="w-full">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-white font-medium text-sm md:text-base">Repositories</span>
                  <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider bg-cyan-500/10 px-2.5 py-1 rounded-full">Growing</span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="stat-bar h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" data-width="70" style={{ width: "70%" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <h4 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <Code2 className="w-6 h-6 text-[#FB4D03]" />
              Recent Top Repositories
            </h4>

            {error && (
              <div className="p-6 rounded-2xl border border-red-500/30 bg-red-500/10 text-red-200 text-center font-medium">
                {error}
              </div>
            )}

            {!repos && !error && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-32 bg-white/5 rounded-2xl animate-pulse border border-white/5" />
                ))}
              </div>
            )}

            {repos && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 rounded-2xl border border-white/5 bg-[#1a1a1f]/80 hover:bg-[#1f1f25] hover:border-[#FB4D03]/30 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#FB4D03]/5"
                  >
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <h5 className="font-bold text-white group-hover:text-[#FB4D03] transition-colors truncate text-lg">
                        {repo.name}
                      </h5>
                    </div>

                    <p className="text-sm text-gray-400 mb-6 line-clamp-2 leading-relaxed min-h-[40px]">
                      {repo.description || "No description provided."}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex gap-4">
                        <span className="flex items-center gap-1.5 text-xs text-gray-300 font-medium">
                          <Star className="w-3.5 h-3.5 text-yellow-500" /> {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-300 font-medium">
                          <GitFork className="w-3.5 h-3.5 text-gray-400" /> {repo.forks_count}
                        </span>
                      </div>
                      {repo.language && (
                        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-white/10 text-gray-300">
                          {repo.language}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Katana Sword Slash Divider ── */}
        <div className="katana-divider mt-24" />
      </div>
    </section>
  );
}
