import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Reveal } from "@/components/ui/Reveal";
import { articles } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog i vesti",
  description:
    "Vodiči, poređenja i analize tržišta nekretnina na Severnom Kipru. Sve što treba da znate pre kupovine.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const sorted = [...articles].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
  const [featured, ...rest] = sorted;

  return (
    <>
      <section className="bg-gradient-sky pb-12 pt-28 md:pt-32">
        <Container>
          <p className="text-eyebrow uppercase text-brand-600">Blog i vesti</p>
          <h1 className="mt-3 text-display-lg text-balance">
            Vodiči i analize za pametnu kupovinu
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-ink-muted">
            Sve što naši klijenti najčešće pitaju — pravila, troškovi, poređenja,
            i vesti sa tržišta Severnog Kipra.
          </p>
        </Container>
      </section>

      <Container className="py-14 md:py-20">
        {featured && (
          <Reveal>
            <ArticleCard article={featured} featured />
          </Reveal>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((article, i) => (
            <Reveal key={article.slug} delay={(i % 3) * 0.06}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
