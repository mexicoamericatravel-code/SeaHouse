import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  MessageCircle,
  Star,
  Wifi,
  Waves,
  Coffee,
  Car,
  ShieldCheck,
  Sun,
  ChevronRight,
  Phone,
  Mail,
  Languages,
  DollarSign,
  Users,
  Heart,
  Baby,
  Compass,
  Plane,
  Clock3,
  Sparkles,
  BedDouble,
  Instagram,
  ArrowUp,
  CheckCircle2,
  BadgeCheck,
  Luggage,
  Utensils,
  Clock,
  CircleHelp,
  Menu,
  X,
} from "lucide-react";
import { siteData, translations } from "./siteData";

const roomFilters = ["All", "Available"];

function formatPrice(priceUSD, currencyKey) {
  const currency = siteData.currencies[currencyKey];
  const value = priceUSD * currency.rate;
  const rounded = currencyKey === "MXN" || currencyKey === "BRL"
    ? Math.round(value)
    : Math.round(value * 100) / 100;
  return `${currency.symbol}${rounded.toLocaleString()} ${currency.label}`;
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const a = new Date(checkIn + "T00:00:00");
  const b = new Date(checkOut + "T00:00:00");
  const diff = Math.round((b - a) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

function SectionHeading({ eyebrow, title, copy, align = "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      {copy ? <p className="mt-4 text-base leading-7 text-slate-600">{copy}</p> : null}
    </div>
  );
}

function Logo() {
  return (
    <a href="#top" className="inline-flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">
        <Sun className="h-5 w-5" />
      </div>
      <div>
        <p className="text-lg font-semibold tracking-tight text-slate-950">{siteData.brand.name}</p>
        <p className="text-xs text-slate-500">{siteData.brand.locationShort}</p>
      </div>
    </a>
  );
}

function StickyWhatsApp({ href }) {
  return (
    <a
      href={href}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/30 transition hover:scale-[1.03]"
    >
      <MessageCircle className="h-4 w-4" />
      WhatsApp
    </a>
  );
}

function NavBar({ t, language, setLanguage, currency, setCurrency }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["#rooms", t.navRooms],
    ["#gallery", t.navGallery],
    ["#attractions", t.navAttractions],
    ["#reviews", t.navReviews],
    ["#location", t.navLocation],
    ["#booking", t.navBook],
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="text-slate-600 hover:text-slate-950">{label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:gap-3 md:flex">
          <div className="relative">
            <Languages className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="rounded-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none focus:border-slate-400">
              {siteData.supportedLanguages.map((lang) => <option key={lang.code} value={lang.code}>{lang.label}</option>)}
            </select>
          </div>
          <div className="relative">
            <DollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="rounded-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none focus:border-slate-400">
              {Object.keys(siteData.currencies).map((code) => <option key={code} value={code}>{code}</option>)}
            </select>
          </div>
        </div>

        <button className="md:hidden rounded-full border border-slate-200 p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm font-medium">
            {links.map(([href, label]) => (
              <a key={href} href={href} className="text-slate-700" onClick={() => setOpen(false)}>{label}</a>
            ))}
            <div className="flex gap-3 pt-2">
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none">
                {siteData.supportedLanguages.map((lang) => <option key={lang.code} value={lang.code}>{lang.label}</option>)}
              </select>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none">
                {Object.keys(siteData.currencies).map((code) => <option key={code} value={code}>{code}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ t, whatsappHref }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((v) => (v + 1) % siteData.heroImages.length), 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden bg-slate-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-16">
        <div className="relative z-10 flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200">
            <Sparkles className="h-4 w-4 text-cyan-600" />
            {t.directBooking}
          </div>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            {t.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{t.heroCopy}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#rooms" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:translate-y-[-1px]">
              {t.viewRooms}
            </a>
            <a href="#booking" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400">
              {t.requestBooking}
            </a>
            <a href={whatsappHref} className="rounded-full border border-emerald-200 bg-emerald-50 px-6 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100">
              WhatsApp
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {siteData.specials.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">{item.badge}</p>
                <p className="mt-2 text-sm font-medium text-slate-900">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[520px] overflow-hidden rounded-[36px] shadow-xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={siteData.heroImages[index]}
              src={siteData.heroImages[index]}
              alt="Property view"
              initial={{ opacity: 0.35, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.35 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {siteData.heroStats.map((item) => (
                <div key={item.label} className="rounded-2xl bg-white/12 p-4 text-white backdrop-blur-md ring-1 ring-white/15">
                  <p className="text-2xl font-semibold">{item.value}</p>
                  <p className="mt-1 text-sm text-white/75">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-6 right-6 flex gap-2">
            {siteData.heroImages.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} className={`h-2.5 w-8 rounded-full transition ${i === index ? "bg-white" : "bg-white/40"}`} aria-label={`Go to slide ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoStrip() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-4 px-6 py-4 text-sm text-slate-600 md:grid-cols-4 lg:px-8">
        {siteData.infoStrip.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-2 text-slate-700"><Icon className="h-4 w-4" /></div>
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function RoomCard({ room, currency, t, language }) {
  const description = room.descriptions?.[language] || room.descriptions?.en;
  return (
    <motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }} className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm shadow-slate-200/60">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={room.image} alt={room.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm">{room.badge}</div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{room.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{room.sleeps} · {room.bed} · {room.size}</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">{room.status}</span>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {room.features.map((feature) => <span key={feature} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{feature}</span>)}
        </div>
        <div className="mt-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">{t.startingFrom}</p>
            <p className="text-lg font-semibold text-slate-900">{formatPrice(room.priceUSD, currency)} / night</p>
          </div>
          <a href="#booking" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:translate-y-[-1px]">
            {t.requestThisRoom} <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function AmenityCard({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="rounded-xl bg-sky-50 p-2 text-sky-700"><Icon className="h-5 w-5" /></div>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </div>
  );
}

function TravelerCard({ icon: Icon, title, copy }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="w-fit rounded-2xl bg-emerald-50 p-3 text-emerald-700"><Icon className="h-5 w-5" /></div>
      <h3 className="mt-4 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
    </div>
  );
}

function AttractionCard({ item }) {
  const Icon = item.icon;
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-2xl bg-cyan-50 p-3 text-cyan-700"><Icon className="h-5 w-5" /></div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{item.time}</span>
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{item.type}</p>
      <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.name}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{item.copy}</p>
    </div>
  );
}

function WhyChooseUs() {
  return (
    <section className="bg-slate-50/70">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading eyebrow="Why stay here" title="A stronger direct-booking experience while real content is still coming in" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {siteData.whyChooseUs.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="w-fit rounded-2xl bg-slate-100 p-3 text-slate-800"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-4 text-lg font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.copy}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ComparisonTable({ currency }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading eyebrow="Compare" title="A cleaner way to compare rooms at a glance" />
        <div className="mt-10 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-900">Room</th>
                  <th className="px-6 py-4 font-semibold text-slate-900">Guests</th>
                  <th className="px-6 py-4 font-semibold text-slate-900">Bed</th>
                  <th className="px-6 py-4 font-semibold text-slate-900">Best for</th>
                  <th className="px-6 py-4 font-semibold text-slate-900">Rate</th>
                </tr>
              </thead>
              <tbody>
                {siteData.rooms.map((room) => (
                  <tr key={room.id} className="border-t border-slate-200">
                    <td className="px-6 py-4 font-medium text-slate-900">{room.name}</td>
                    <td className="px-6 py-4 text-slate-600">{room.sleeps}</td>
                    <td className="px-6 py-4 text-slate-600">{room.bed}</td>
                    <td className="px-6 py-4 text-slate-600">{room.badge}</td>
                    <td className="px-6 py-4 font-semibold text-cyan-700">{formatPrice(room.priceUSD, currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function DayPlans() {
  return (
    <section className="bg-sky-50/35">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading eyebrow="Ideas" title="Easy trip ideas guests can picture immediately" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {siteData.dayPlans.map((plan) => (
            <div key={plan.title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">{plan.badge}</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-950">{plan.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{plan.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PoliciesSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading eyebrow="Stay details" title="Clear policies make booking feel easier" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {siteData.policyCards.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-[28px] border border-slate-200 bg-slate-50/70 p-6 shadow-sm">
                <div className="w-fit rounded-2xl bg-white p-3 text-slate-800 ring-1 ring-slate-200"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-4 text-lg font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.copy}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HostSection() {
  return (
    <section className="bg-slate-50/70">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div className="overflow-hidden rounded-[32px] shadow-lg">
          <img src={siteData.host.image} alt="Host" className="h-full min-h-[320px] w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <SectionHeading eyebrow="Host" title={siteData.host.title} copy={siteData.host.copy} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {siteData.host.highlights.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AvailabilitySection({ t }) {
  return (
    <section className="bg-slate-50/70">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading eyebrow={t.availabilityEyebrow} title={t.availabilityTitle} />
        <div className="mt-10 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="grid md:grid-cols-5">
            {siteData.availabilityMonths.map((month) => (
              <div key={month.name} className="border-b border-r border-slate-200 p-5 last:border-r-0 md:border-b-0">
                <p className="text-sm font-semibold text-slate-900">{month.name}</p>
                <div className="mt-4 space-y-2">
                  {month.statuses.map((row) => (
                    <div key={row.label} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm">
                      <span className="text-slate-600">{row.label}</span>
                      <span className={`font-medium ${row.value === "Good" ? "text-emerald-700" : row.value === "Limited" ? "text-amber-700" : "text-rose-700"}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-5 p-5 text-sm text-slate-600">
            <div className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Good</div>
            <div className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-amber-600" /> Limited</div>
            <div className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-rose-600" /> Busy</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection({ t }) {
  return (
    <section id="reviews" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading eyebrow={t.reviewsEyebrow} title={t.testimonialsTitle} align="center" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {siteData.testimonials.map((review) => (
            <div key={review.name} className="rounded-[28px] border border-slate-200 bg-slate-50/70 p-6 shadow-sm">
              <div className="mb-3 flex gap-1 text-amber-500">{Array.from({ length: review.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <p className="text-sm leading-6 text-slate-600">{review.text}</p>
              <p className="mt-4 text-sm font-semibold text-slate-900">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-sky-50/35">
      <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="Questions guests usually ask before booking" align="center" />
        <div className="mt-10 space-y-4">
          {siteData.faqs.map((item, idx) => (
            <div key={item.q} className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
              <button onClick={() => setOpen(open === idx ? -1 : idx)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                <span className="font-semibold text-slate-950">{item.q}</span>
                <ChevronRight className={`h-5 w-5 text-slate-500 transition ${open === idx ? "rotate-90" : ""}`} />
              </button>
              {open === idx && <div className="border-t border-slate-200 px-6 py-5 text-sm leading-7 text-slate-600">{item.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingSection({ t, currency, whatsappHref }) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const defaultIn = today.toISOString().slice(0, 10);
  const defaultOut = tomorrow.toISOString().slice(0, 10);

  const [checkIn, setCheckIn] = useState(defaultIn);
  const [checkOut, setCheckOut] = useState(defaultOut);
  const [selectedRoom, setSelectedRoom] = useState(siteData.rooms[0].name);

  const nights = nightsBetween(checkIn, checkOut);
  const room = siteData.rooms.find((r) => r.name === selectedRoom) || siteData.rooms[0];
  const total = nights > 0 ? room.priceUSD * nights : room.priceUSD;

  return (
    <section id="booking" className="bg-slate-100/80">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeading eyebrow={t.bookingEyebrow} title={t.bookingTitle} />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Calendar, title: t.chooseDates },
                { icon: BedDouble, title: t.pickRoom },
                { icon: MessageCircle, title: t.confirmFast },
              ].map((step) => (
                <div key={step.title} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                  <step.icon className="h-5 w-5 text-slate-700" />
                  <h4 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h4>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Booking perks</p>
              <div className="mt-4 space-y-3">
                {siteData.bookingPerks.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-slate-600">
                    <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900">{t.requestStay}</h3>

            <form name="booking-request" method="POST" data-netlify="true" className="mt-6 space-y-4">
              <input type="hidden" name="form-name" value="booking-request" />
              <input name="name" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" placeholder={t.fullName} />
              <input name="email" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" placeholder={t.email} />

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="rounded-2xl border border-slate-200 p-4">
                  <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{t.checkIn}</span>
                  <input
                    type="date"
                    name="checkin"
                    value={checkIn}
                    min={defaultIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      if (e.target.value >= checkOut) {
                        const next = new Date(e.target.value + "T00:00:00");
                        next.setDate(next.getDate() + 1);
                        setCheckOut(next.toISOString().slice(0, 10));
                      }
                    }}
                    className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  />
                  <p className="mt-2 text-sm text-slate-500">{formatDate(checkIn)}</p>
                </label>

                <label className="rounded-2xl border border-slate-200 p-4">
                  <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{t.checkOut}</span>
                  <input
                    type="date"
                    name="checkout"
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  />
                  <p className="mt-2 text-sm text-slate-500">{formatDate(checkOut)}</p>
                </label>
              </div>

              <select name="room" value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-700 outline-none focus:border-slate-400">
                {siteData.rooms.map((room) => <option key={room.id} value={room.name}>{room.name} — {formatPrice(room.priceUSD, currency)}</option>)}
              </select>

              <textarea name="notes" className="min-h-[120px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" placeholder={t.questions} />

              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>{t.lengthOfStay}</span>
                  <span className="font-medium text-slate-900">{nights} {nights === 1 ? t.night : t.nights}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm text-slate-600">
                  <span>{t.estimatedTotal}</span>
                  <span className="font-semibold text-slate-950">{formatPrice(total, currency)}</span>
                </div>
              </div>

              <button type="submit" className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px]">
                {t.sendBooking}
              </button>
            </form>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a href={whatsappHref} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a href={`mailto:${siteData.brand.email}`} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ t, whatsappHref }) {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-slate-500">{t.footerTag}</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
            <a href={whatsappHref} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2"><Phone className="h-4 w-4" /> WhatsApp</a>
            <a href={`mailto:${siteData.brand.email}`} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2"><Mail className="h-4 w-4" /> Email</a>
            <a href="#top" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2"><ArrowUp className="h-4 w-4" /> {t.backToTop}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [filter, setFilter] = useState("All");
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("USD");

  const t = translations[language];
  const whatsappHref = `https://wa.me/${siteData.brand.whatsappNumber.replace(/\D/g, "")}`;

  const visibleRooms = useMemo(() => {
    if (filter === "All") return siteData.rooms;
    return siteData.rooms.filter((room) => room.status === filter);
  }, [filter]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <StickyWhatsApp href={whatsappHref} />
      <NavBar t={t} language={language} setLanguage={setLanguage} currency={currency} setCurrency={setCurrency} />
      <Hero t={t} whatsappHref={whatsappHref} />
      <InfoStrip />

      <section id="rooms" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow={t.roomsEyebrow} title={t.roomsTitle} />
            <div className="flex flex-wrap gap-2">
              {roomFilters.map((item) => (
                <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${filter === item ? "bg-slate-900 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-slate-300"}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {visibleRooms.map((room) => <RoomCard key={room.id} room={room} currency={currency} t={t} language={language} />)}
          </div>
        </div>
      </section>

      <ComparisonTable currency={currency} />

      <section className="bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading eyebrow={t.amenitiesEyebrow} title={t.amenitiesTitle} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {siteData.amenities.map((item) => <AmenityCard key={item.label} icon={item.icon} label={item.label} />)}
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <section id="gallery" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading eyebrow={t.galleryEyebrow} title={t.galleryTitle} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {siteData.gallery.map((image, i) => (
              <motion.div key={image + i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`overflow-hidden rounded-[28px] ${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}>
                <img src={image} alt={`Gallery ${i + 1}`} className="h-full min-h-[220px] w-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sky-50/40">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading eyebrow={t.tripEyebrow} title={t.tripTitle} />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {siteData.travelerTypes.map((item) => <TravelerCard key={item.title} icon={item.icon} title={item.title} copy={item.copy} />)}
          </div>
        </div>
      </section>

      <section id="attractions" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading eyebrow={t.attractionsEyebrow} title={t.attractionsTitle} />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {siteData.attractions.map((item) => <AttractionCard key={item.name} item={item} />)}
          </div>
        </div>
      </section>

      <DayPlans />
      <PoliciesSection />
      <HostSection />
      <AvailabilitySection t={t} />
      <ReviewsSection t={t} />
      <FAQSection />

      <section id="location" className="bg-sky-50/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading eyebrow={t.mapEyebrow} title={t.locationTitle} />
          <div className="mt-10 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <iframe title="map" src="https://maps.google.com/maps?q=cancun&t=&z=11&ie=UTF8&iwloc=&output=embed" className="h-[420px] w-full border-0" />
          </div>
        </div>
      </section>

      <BookingSection t={t} currency={currency} whatsappHref={whatsappHref} />
      <Footer t={t} whatsappHref={whatsappHref} />
    </div>
  );
}
