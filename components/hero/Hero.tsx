"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import heroImage from "./hero2.avif";

/**
 * Dijagonalni split hero:
 *  - Leva strana: teget background (čisti okvir za tekst max-w-2xl ~672px).
 *  - Desna strana: hero slika, odsečena pod uglom.
 *  - Dijagonala: 75% → 60% viewport-a. Tekst (max 55% viewport-a na xl+) ostaje
 *    van image zone sa dovoljnim margin-om.
 *  - Clip aktivan samo na xl+ (≥1280px). Ispod toga: full-bleed slika + overlay.
 */

// Clip-path za sliku (desna strana sa ukošenom levom ivicom).
const IMAGE_CLIP = "polygon(75% 0, 100% 0, 100% 100%, 60% 100%)";
// Clip-path za zlatnu dijagonalnu liniju (tanak trougao duž ivice).
const LINE_CLIP = "polygon(75% 0, 75.4% 0, 60.4% 100%, 60% 100%)";

export function Hero() {
  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden bg-gradient-brand pt-24 md:pt-28">
      {/* ───── Pozadina (slika sa dijagonalnim clip-om) ───── */}
      <div className="absolute inset-0 -z-10">
        {/* Slika — na xl+ clip-ovana, ispod toga full */}
        <div
          className="absolute inset-0 xl:[clip-path:var(--image-clip)]"
          style={{ ["--image-clip" as string]: IMAGE_CLIP }}
        >
          <Image
            src={heroImage}
            alt="Mediteranska obala — Severni Kipar"
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className="object-cover"
          />
          {/* Suptilni dark gradient preko slike — da ne bude previše naglasna */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-900/30 via-transparent to-brand-900/40" />
        </div>

        {/* Zlatna dijagonalna linija (samo xl+) */}
        <div
          className="absolute inset-0 hidden xl:block"
          style={{
            clipPath: LINE_CLIP,
            background:
              "linear-gradient(180deg, rgba(209,180,124,0.9) 0%, rgba(184,148,94,0.6) 100%)",
            boxShadow: "0 0 24px rgba(209,180,124,0.35)",
          }}
          aria-hidden
        />

        {/* Overlay za <xl — ivory wash da teget tekst bude čitljiv */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/95 via-bg/85 to-bg/60 xl:hidden" />

        {/* Zlatni glow gore-desno (sunce) */}
        <div className="pointer-events-none absolute -top-24 right-[-6rem] h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-gold-200/25 via-gold-300/10 to-transparent blur-3xl" />
      </div>

      <Container className="relative z-10 flex min-h-[80vh] items-center pb-20 pt-10 md:pt-16 lg:pb-28">
        <div className="max-w-2xl text-brand-900 xl:text-white">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-eyebrow uppercase text-gold-500 xl:text-gold-300"
          >
            Severni Kipar — Premium nekretnine
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-display-xl text-balance text-brand-900 xl:text-white"
          >
            Vaš dom uz{" "}
            <span className="font-serif-italic text-gold-500 xl:text-gold-300">
              340 sunčanih dana
            </span>{" "}
            godišnje
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 h-px w-16 origin-left bg-gradient-gold"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-pretty text-lg text-brand-800/85 xl:text-white/85"
          >
            Pažljivo odabrane nekretnine na Mediteranu, kompletna pravna podrška
            na srpskom i rate bez kamate direktno od developera. Investicija sa
            povratom za 6 do 8 godina.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button href="/kontakt" size="lg" variant="gold">
              Zakažite besplatne konsultacije
              <ArrowRight className="h-4 w-4" />
            </Button>
            {/* Secondary CTA — na mobilnom teget-on-ivory, na xl+ bela outline */}
            <Button
              href="/nekretnine"
              size="lg"
              variant="outline"
              className="border-brand-700/30 bg-brand-900/5 text-brand-900 hover:border-gold-400 hover:bg-brand-900/10 hover:text-brand-700 xl:border-white/30 xl:bg-white/5 xl:text-white xl:hover:border-gold-300 xl:hover:bg-white/10 xl:hover:text-gold-200"
            >
              Pogledajte nekretnine
            </Button>
          </motion.div>

          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center gap-6 text-sm text-brand-800/80 xl:text-white/80"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-gold-500 xl:text-gold-300" />
              <span>
                <strong className="font-semibold text-brand-900 xl:text-white">
                  850+
                </strong>{" "}
                prodatih nekretnina
              </span>
            </div>
            <div className="h-4 w-px bg-brand-900/20 xl:bg-white/25" />
            <div>
              <strong className="font-semibold text-brand-900 xl:text-white">
                20+
              </strong>{" "}
              godina iskustva
            </div>
            <div className="h-4 w-px bg-brand-900/20 xl:bg-white/25" />
            <div>
              VNŽ za{" "}
              <strong className="font-semibold text-brand-900 xl:text-white">
                celu porodicu
              </strong>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
