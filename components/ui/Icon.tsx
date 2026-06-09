import {
  Home, Tag, Key, Scale, Plane, Compass,
  Coins, TrendingUp, BadgeCheck, Sun, Wallet, ShieldCheck,
  Bed, Bath, Maximize2, Waves, Building2, Car, Trees,
  Star, CalendarDays, Map, Phone, Mail, MapPin, MessageCircle, Send,
  ArrowRight, ArrowUpRight, Check, X, ChevronRight, Sparkles,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Home, Tag, Key, Scale, Plane, Compass,
  Coins, TrendingUp, BadgeCheck, Sun, Wallet, ShieldCheck,
  Bed, Bath, Maximize2, Waves, Building2, Car, Trees,
  Star, CalendarDays, Map, Phone, Mail, MapPin, MessageCircle, Send,
  ArrowRight, ArrowUpRight, Check, X, ChevronRight, Sparkles,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Component = iconMap[name];
  if (!Component) return null;
  return <Component className={className} aria-hidden />;
}
