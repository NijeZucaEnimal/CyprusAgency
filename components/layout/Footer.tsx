import Link from "next/link";
import { MessageCircle, Send, Mail, Phone, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons/InstagramIcon";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { footerNav } from "@/data/navigation";
import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-900 text-white">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo variant="light" />
            <p className="mt-5 max-w-md text-pretty text-brand-100/80">
              {site.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href={`https://t.me/${site.telegram}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <Send className="h-5 w-5" />
              </a>
              <a
                href={`https://instagram.com/${site.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {footerNav.map((column) => (
            <div key={column.title} className="lg:col-span-2">
              <h3 className="text-eyebrow uppercase text-brand-200">{column.title}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-brand-100/80 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-3">
            <h3 className="text-eyebrow uppercase text-brand-200">Kontakt</h3>
            <ul className="mt-5 flex flex-col gap-4 text-brand-100/80">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
                <span>
                  {site.office.address}
                  <br />
                  {site.office.city}, {site.office.country}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <Phone className="h-5 w-5 shrink-0 text-brand-300" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <Mail className="h-5 w-5 shrink-0 text-brand-300" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm text-brand-200/70 sm:flex-row sm:items-center">
          <p>© {year} {site.name}. Sva prava zadržana.</p>
          <p>Sajt napravljen sa pažnjom za srpske kupce nekretnina.</p>
        </div>
      </Container>
    </footer>
  );
}
