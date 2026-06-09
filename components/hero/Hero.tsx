"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroParallax } from "./HeroParallax";
import { MapLoader } from "@/components/map3d/MapLoader";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-sky pt-24 md:pt-28">
      <HeroParallax />

      <Container className="relative z-10 grid items-center gap-10 pb-12 lg:grid-cols-12 lg:gap-8 lg:pb-20">
        {/* Tekst */}
        <div className="lg:col-span-5">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display-xl text-balance"
          >
            Vaš dom uz{" "}
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              340 sunčanih dana
            </span>{" "}
            godišnje
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-pretty text-lg text-ink-muted"
          >
            Premium nekretnine na Severnom Kipru, kompletna pravna podrška na
            srpskom i rate bez kamate direktno od developera. Investicija sa
            povratom za 6 do 8 godina.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button href="/kontakt" size="lg">
              Zakažite besplatne konsultacije
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/nekretnine" size="lg" variant="secondary">
              Pogledajte nekretnine
            </Button>
          </motion.div>

          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-6 text-sm text-ink-muted"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-sun" />
              <span>
                <strong className="font-bold text-ink">850+</strong> prodatih
                nekretnina
              </span>
            </div>
            <div className="h-4 w-px bg-line" />
            <div>
              <strong className="font-bold text-ink">20+</strong> godina
              iskustva
            </div>
            <div className="h-4 w-px bg-line" />
            <div>
              VNŽ za <strong className="font-bold text-ink">celu porodicu</strong>
            </div>
          </motion.div>
        </div>

        {/* 3D Mapa */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-b from-[#D7EEFB] to-[#A9D2FF]/60 shadow-lg lg:aspect-[5/4]">
            <MapLoader />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
