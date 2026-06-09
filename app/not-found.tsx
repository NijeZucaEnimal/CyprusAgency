import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="grid min-h-[70vh] place-items-center py-20 text-center">
      <div className="max-w-md">
        <p className="text-eyebrow uppercase text-brand-600">Greška 404</p>
        <h1 className="mt-4 text-display-lg text-balance">
          Ova stranica je otplovila u Mediteran
        </h1>
        <p className="mt-5 text-pretty text-ink-muted">
          Stranica koju tražite ne postoji ili je premeštena. Vratite se na
          početnu ili pretražite nekretnine.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">
            <Home className="h-4 w-4" /> Na početnu
          </Button>
          <Button href="/nekretnine" variant="secondary">
            <ArrowLeft className="h-4 w-4" /> Sve nekretnine
          </Button>
        </div>
      </div>
    </Container>
  );
}
