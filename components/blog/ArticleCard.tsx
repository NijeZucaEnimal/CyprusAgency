import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/format";
import type { Article } from "@/lib/types";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className={`group block h-full overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-brand-500 ${
        featured ? "md:grid md:grid-cols-5" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          featured
            ? "aspect-[16/10] md:col-span-3 md:aspect-auto"
            : "aspect-[16/10]"
        }`}
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes={featured ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          <Badge variant="dark" size="sm">{article.category}</Badge>
        </div>
      </div>
      <div className={`p-6 ${featured ? "md:col-span-2 md:p-8" : ""}`}>
        <div className="flex items-center gap-3 text-xs text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatDate(article.publishedAt)}
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {article.readingMinutes} min
          </span>
        </div>
        <h3
          className={`mt-3 line-clamp-2 font-bold leading-snug text-ink transition-colors group-hover:text-brand-700 ${
            featured ? "text-2xl" : "text-lg"
          }`}
        >
          {article.title}
        </h3>
        <p className={`mt-2 text-sm text-ink-muted ${featured ? "line-clamp-3" : "line-clamp-2"}`}>
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
