import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, User } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { articles, getArticleBySlug } from "@/data/blog";
import { formatDate } from "@/lib/format";
import { site } from "@/data/site";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Članak nije pronađen" };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      images: [article.image],
      authors: [article.author],
    },
    alternates: { canonical: `/blog/${article.slug}` },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = articles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3);

  const fallbackRelated = articles
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  const relatedToShow = related.length > 0 ? related : fallbackRelated;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    author: { "@type": "Person", name: article.author },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    datePublished: article.publishedAt,
    mainEntityOfPage: `${site.url}/blog/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <Container className="pt-28 md:pt-32">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> Nazad na blog
          </Link>

          <div className="mt-6 max-w-3xl">
            <Badge variant="brand" size="md">{article.category}</Badge>
            <h1 className="mt-4 text-display-lg text-balance leading-tight">
              {article.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" /> {article.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" /> {formatDate(article.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {article.readingMinutes} min čitanja
              </span>
            </div>
          </div>
        </Container>

        <Container className="mt-10">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover"
            />
          </div>
        </Container>

        <Container className="mt-12">
          <div className="prose-blog mx-auto max-w-3xl">
            {article.content.split("\n\n").map((para, i) => (
              <p key={i} className="mb-5 text-lg leading-relaxed text-ink/85">
                {para}
              </p>
            ))}
          </div>
        </Container>
      </article>

      {relatedToShow.length > 0 && (
        <section className="border-t border-line bg-surface py-20">
          <Container>
            <h2 className="text-2xl font-bold">Slični članci</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {relatedToShow.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
