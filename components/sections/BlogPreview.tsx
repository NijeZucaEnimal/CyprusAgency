import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getRecentArticles } from "@/data/blog";
import { formatDate } from "@/lib/format";

export function BlogPreview() {
  const articles = getRecentArticles(3);

  return (
    <Section id="blog" tone="default" size="lg">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeader
          eyebrow="Blog i vesti"
          title="Vodiči, poređenja i analize tržišta"
          description="Sve što treba da znate pre kupovine — od pravnih saveta do investicionih izveštaja."
        />
        <Button href="/blog" variant="secondary" size="md" className="shrink-0">
          Svi članci <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {articles.map((article, i) => (
          <Reveal key={article.slug} delay={i * 0.08}>
            <Link
              href={`/blog/${article.slug}`}
              className="group block h-full overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-brand-500"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4">
                  <Badge variant="dark" size="sm">{article.category}</Badge>
                </div>
              </div>
              <div className="p-6">
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
                <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-snug text-ink transition-colors group-hover:text-brand-700">
                  {article.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-ink-muted">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
