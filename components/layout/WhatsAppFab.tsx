"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { site } from "@/data/site";

export function WhatsAppFab() {
  return (
    <motion.a
      href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Kontaktirajte nas preko WhatsApp-a"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/30 hover:brightness-105"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="h-6 w-6" />
      <span className="sr-only">WhatsApp</span>
    </motion.a>
  );
}
