"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Check, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { site } from "@/data/site";

const schema = z.object({
  name: z.string().min(2, "Unesite ime"),
  phone: z.string().min(6, "Broj telefona"),
  email: z.string().email("Neispravan email"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function PropertyInquiryForm({ propertyTitle }: { propertyTitle: string }) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: `Zainteresovan/a sam za: ${propertyTitle}.`,
    },
  });

  const onSubmit = async (values: FormValues) => {
    const res = await fetch("/api/kontakt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, property: propertyTitle }),
    });
    if (res.ok) {
      setSent(true);
      reset({
        name: "",
        phone: "",
        email: "",
        message: `Zainteresovan/a sam za: ${propertyTitle}.`,
      });
      setTimeout(() => setSent(false), 6000);
    }
  };

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold">Upit za nekretninu</h3>
      <p className="mt-1 text-sm text-ink-muted">
        Javljamo se u toku 24h sa kompletnim informacijama i fotografijama.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 grid gap-3" noValidate>
        <input
          {...register("name")}
          placeholder="Ime i prezime"
          className={inputClass(!!errors.name)}
        />
        <input
          type="tel"
          {...register("phone")}
          placeholder="Telefon (+381…)"
          className={inputClass(!!errors.phone)}
        />
        <input
          type="email"
          {...register("email")}
          placeholder="Email"
          className={inputClass(!!errors.email)}
        />
        <textarea
          {...register("message")}
          rows={3}
          className={cn(inputClass(false), "resize-none")}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Šaljem…
            </>
          ) : sent ? (
            <>
              <Check className="h-4 w-4" /> Poslato!
            </>
          ) : (
            "Pošaljite upit"
          )}
        </Button>

        <a
          href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Pozdrav! Zainteresovan/a sam za: ${propertyTitle}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
        >
          <MessageCircle className="h-4 w-4" /> Pitajte na WhatsAppu
        </a>
      </form>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-white px-4 py-2.5 text-[15px] text-ink transition placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-300",
    hasError ? "border-red-300" : "border-line hover:border-brand-200",
  );
}
