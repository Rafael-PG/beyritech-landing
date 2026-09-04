import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const article = document.getElementById("article-content");
      if (!article) {
        const docH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        setProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0);
        return;
      }

      const rect = article.getBoundingClientRect();
      const articleTop = rect.top + window.scrollY;
      const articleHeight = article.offsetHeight;
      const scrolled = window.scrollY - articleTop;
      const pct = Math.min(100, Math.max(0, (scrolled / articleHeight) * 100));
      setProgress(pct);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-50 h-[3px] bg-gold-500 transition-[width] duration-100 ease-linear shadow-[0_0_12px_rgba(254,201,52,0.7)]"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-label="Progreso de lectura"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
