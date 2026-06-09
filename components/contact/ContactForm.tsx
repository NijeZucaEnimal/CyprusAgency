"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2, "Unesite ime i prezime"),
  phone: z
    .string()
    .min(6, "Unesite valjan broj telefona")
    .regex(/^[0-9+\s\-()]+$/, "Samo brojevi i simboli +, -, ()"),
  email: z.string().email("Neispravan email"),
  message: z.string().min(10, "Poruka mora imati bar 10 karaktera"),
  city: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const [sent, setSent] = useState(false);

  const onSubmit = async (values: FormValues) => {
    const res = await fetch("/api/kontakt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      setSent(true);
      reset();
      setTimeout(() => setSent(false), 6000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Ime i prezime" error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            {...register("name")}
            className={inputClass(!!errors.name)}
            placeholder="Petar Petrović"
          />
        </Field>

        <Field label="Telefon" error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            {...register("phone")}
            className={inputClass(!!errors.phone)}
            placeholder="+381 64 123 4567"
          />
        </Field>
      </div>

      <Field label="Email" error={errors.email?.message}>
        <input
          type="email"
          autoComplete="email"
          {...register("email")}
          className={inputClass(!!errors.email)}
          placeholder="petar@email.com"
        />
      </Field>

      <Field label="Region koji vas zanima (opciono)" error={errors.city?.message}>
        <select {...register("city")} className={inputClass(false)}>
          <option value="">Nisam siguran/sigurna</option>
          <option value="kirenija">Kirenija (Girne)</option>
          <option value="iskele">İskele</option>
          <option value="famagusta">Famagusta</option>
          <option value="esentepe">Esentepe</option>
          <option value="lefke">Lefke</option>
        </select>
      </Field>

      <Field label="Vaša poruka" error={errors.message?.message}>
        <textarea
          rows={4}
          {...register("message")}
          className={inputClass(!!errors.message, "resize-none")}
          placeholder="Kratko opišite šta tražite — budžet, tip nekretnine, kada planirate kupovinu…"
        />
      </Field>

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-xs text-ink-muted">
          Vašu poruku obrađujemo u toku 24h. Bez slanja nepotrebnih mejlova.
        </p>
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
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
      </div>

      {sent && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
        >
          <Check className="mt-0.5 h-5 w-5 shrink-0" />
          <span>
            Hvala! Vaša poruka je primljena. Kontaktiraćemo vas u toku 24h — najčešće mnogo
            ranije.
          </span>
        </motion.div>
      )}
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-ink">{label}</span>
      {children}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}

function inputClass(hasError: boolean, extra = "") {
  return cn(
    "w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-ink transition placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-300",
    hasError ? "border-red-300" : "border-line hover:border-brand-200",
    extra,
  );
}
