import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

import type { Route } from "./+types/home";
import NavBar from "~/Components/NavBar";
import { resumes } from "~/constants";
import ResumeCard from "~/Components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "HireLens" },
    { name: "description", content: "Smart Assistant For techies to Polish Your Techniques" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();
  const location = useLocation();

  // extract "next" param if present, fallback to "/"
  const next = new URLSearchParams(location.search).get("next") || "/";

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate(`/auth?next=${encodeURIComponent(next)}`);
    }
  }, [auth.isAuthenticated, next, navigate]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <NavBar />

      <section className="main-section">
        <div className="page-heading py-10">
          <h1>Know Where Your Application Stands</h1>
          <h2>Turn Applications Into Opportunities with AI</h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
