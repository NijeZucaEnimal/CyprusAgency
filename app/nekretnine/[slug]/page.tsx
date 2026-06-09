import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bed,
  Bath,
  Maximize2,
  Waves,
  CalendarDays,
  MapPin,
  Check,
  Wallet,
  ArrowLeft,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PropertyInquiryForm } from "@/components/property/PropertyInquiryForm";
import { PropertyCard } from "@/components/property/PropertyCard";
import {
  getPropertyBySlug,
  properties,
  getPropertiesByCity,
} from "@/data/properties";
import { getCityBySlug } from "@/data/cities";
import { site } from "@/data/site";
import { formatEur, formatArea, formatDistance } from "@/lib/format";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return { title: "Nekretnina nije pronađena" };

  const city = getCityBySlug(property.city);
  return {
    title: property.title,
    description: property.shortDescription,
    openGraph: {
      title: property.title,
      description: property.shortDescription,
      type: "article",
      images: [property.image],
    },
    alternates: {
      canonical: `/nekretnine/${property.slug}`,
    },
    other: city ? { "geo.region": city.name } : undefined,
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const city = getCityBySlug(property.city);
  const similar = getPropertiesByCity(property.city)
    .filter((p) => p.slug !== property.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: property.title,
    description: property.shortDescription,
    image: [property.image, ...property.gallery],
    address: city
      ? {
          "@type": "PostalAddress",
          addressLocality: city.name,
          addressCountry: "Cyprus (Northern)",
        }
      : undefined,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.sqm,
      unitCode: "MTK",
    },
    numberOfRooms: property.bedrooms,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: property.price,
      availability: "https://schema.org/InStock",
      seller: { "@type": "RealEstateAgent", name: site.name },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container className="pt-28 md:pt-32">
        <Link
          href="/nekretnine"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Nazad na sve nekretnine
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge variant="brand" size="md">
            {property.type.toUpperCase()}
          </Badge>
          {property.interestFreePlan && (
            <Badge variant="sun" size="md">
              Rate bez kamate
            </Badge>
          )}
          {property.status === "u-prodaji" && (
            <Badge variant="outline" size="md">
              U prodaji
            </Badge>
          )}
        </div>

        <h1 className="mt-4 text-display-md text-balance">{property.title}</h1>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" /> {city?.name}
            {city?.localName && city.localName !== city.name && (
              <span className="text-ink-muted/70">({city.localName})</span>
            )}
          </span>
          {property.completionYear && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" /> Završetak{" "}
              {property.completionYear}
            </span>
          )}
        </div>
      </Container>

      <Container className="mt-10 grid gap-10 lg:grid-cols-12">
        {/* Galerija + opis */}
        <div className="lg:col-span-7">
          <PropertyGallery
            title={property.title}
            mainImage={property.image}
            gallery={property.gallery}
          />

          {/* Brzi pregled */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Spec
              icon={<Bed className="h-5 w-5" />}
              label="Spavaće"
              value={property.bedrooms > 0 ? `${property.bedrooms}` : "Studio"}
            />
            <Spec
              icon={<Bath className="h-5 w-5" />}
              label="Kupatila"
              value={String(property.bathrooms)}
            />
            <Spec
              icon={<Maximize2 className="h-5 w-5" />}
              label="Površina"
              value={formatArea(property.sqm)}
            />
            <Spec
              icon={<Waves className="h-5 w-5" />}
              label="Od mora"
              value={formatDistance(property.distanceToSea)}
            />
          </div>

          <section className="mt-10">
            <h2 className="text-display-md text-2xl font-bold">Opis</h2>
            <div className="mt-4 space-y-4 text-pretty text-ink-muted">
              {property.description
                .split("\n\n")
                .map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold">Karakteristike</h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {property.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 rounded-xl border border-line bg-white px-4 py-3 text-sm"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {property.paymentPlan && (
            <section className="mt-10 rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-brand text-white shadow-brand">
                  <Wallet className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Plan plaćanja</h2>
                  <p className="mt-2 text-pretty text-ink-muted">
                    {property.paymentPlan.note}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Badge variant="brand" size="md">
                      Učešće: {property.paymentPlan.downPayment}%
                    </Badge>
                    <Badge variant="brand" size="md">
                      Rate: {property.paymentPlan.installments} mesečnih
                    </Badge>
                    <Badge variant="sun" size="md">
                      Bez kamate
                    </Badge>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Sticky bočni panel: cena + forma */}
        <aside className="space-y-6 lg:col-span-5">
          <div className="sticky top-24 grid gap-6">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
              <p className="text-eyebrow uppercase text-brand-600">Cena</p>
              <p className="mt-1.5 text-4xl font-bold text-ink">
                {formatEur(property.price)}
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                {formatEur(Math.round(property.price / property.sqm))} / m²
              </p>
              {property.paymentPlan && (
                <p className="mt-3 text-sm font-semibold text-brand-700">
                  Učešće od {formatEur(Math.round((property.price * property.paymentPlan.downPayment) / 100))}
                </p>
              )}
            </div>

            <PropertyInquiryForm propertyTitle={property.title} />
          </div>
        </aside>
      </Container>

      {/* Slične nekretnine */}
      {similar.length > 0 && (
        <Container className="mt-20 pb-20">
          <h2 className="text-2xl font-bold">Slične nekretnine u {city?.name}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p) => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>
        </Container>
      )}
    </>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white px-4 py-4 text-center">
      <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-700">
        {icon}
      </div>
      <p className="mt-2 text-xs uppercase tracking-wider text-ink-muted">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-bold text-ink">{value}</p>
    </div>
  );
}
