import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  MessageCircle,
  Star,
  Languages,
  DollarSign,
  ChevronRight,
  Phone,
  Mail,
  Sun,
  Menu,
  X,
  ArrowUp,
  BadgeCheck,
  Clock,
  Luggage,
  Utensils,
  BedDouble,
  CheckCircle2,
  Instagram,
} from "lucide-react";
import { siteData, translations } from "./siteData";

function formatPrice(priceUSD, currencyKey) {
  const currency = siteData.currencies[currencyKey];
  const value = priceUSD * currency.rate;
  const rounded = currencyKey === "MXN" || currencyKey === "BRL" ? Math.round(value) : Math.round(value * 100) / 100;
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
    <Link to="/" className="inline-flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">
        <Sun className="h-5 w-5" />
      </div>
      <div>
        <p className="text-lg font-semibold tracking-tight text-slate-950">{siteData.brand.name}</p>
        <p className="text-xs text-slate-500">{siteData.brand.locationShort}</p>
      </div>
    </Link>
  );
}

function StickyWhatsApp({ href }) {
  return (
    <a href={href} aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/30 transition hover:scale-[1.03]">
      <MessageCircle className="h-4 w-4" />
      WhatsApp
    </a>
  );
}

function NavBar({ language, setLanguage, currency, setCurrency }) {
  const [open, setOpen] = useState(false);
  const t = translations.en;
  const navItem = "text-sm font-medium text-slate-600 hover:text-slate-950";
  const active = "text-slate-950";
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={({isActive}) => `${navItem} ${isActive ? active : ""}`}>{t.navHome}</NavLink>
          <NavLink to="/rooms" className={({isActive}) => `${navItem} ${isActive ? active : ""}`}>{t.navRooms}</NavLink>
          <NavLink to="/experiences" className={({isActive}) => `${navItem} ${isActive ? active : ""}`}>{t.navExperiences}</NavLink>
          <NavLink to="/itineraries" className={({isActive}) => `${navItem} ${isActive ? active : ""}`}>{t.navItineraries}</NavLink>
          <NavLink to="/booking" className={({isActive}) => `rounded-full px-4 py-2 text-sm font-medium ${isActive ? "bg-slate-700 text-white" : "bg-slate-900 text-white"}`}>{t.navBook}</NavLink>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <div className="relative">
            <Languages className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="rounded-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none">
              {siteData.supportedLanguages.map((lang) => <option key={lang.code} value={lang.code}>{lang.label}</option>)}
            </select>
          </div>
          <div className="relative">
            <DollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="rounded-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none">
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
            <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/rooms" onClick={() => setOpen(false)}>Rooms</NavLink>
            <NavLink to="/experiences" onClick={() => setOpen(false)}>Experiences</NavLink>
            <NavLink to="/itineraries" onClick={() => setOpen(false)}>Itineraries</NavLink>
            <NavLink to="/booking" onClick={() => setOpen(false)}>Book</NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const t = translations.en;
  const [index, setIndex] = useState(0);
  const whatsappHref = `https://wa.me/${siteData.brand.whatsappNumber.replace(/\D/g, "")}`;
  useEffect(() => {
    const timer = setInterval(() => setIndex((v) => (v + 1) % siteData.heroImages.length), 4500);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="relative overflow-hidden bg-slate-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-16">
        <div className="relative z-10 flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200">
            {t.directBooking}
          </div>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">{t.heroTitle}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{t.heroCopy}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/rooms" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm">{t.viewRooms}</Link>
            <Link to="/booking" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800">{t.requestBooking}</Link>
            <a href={whatsappHref} className="rounded-full border border-emerald-200 bg-emerald-50 px-6 py-3 text-sm font-semibold text-emerald-800">WhatsApp</a>
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
            <motion.img key={siteData.heroImages[index]} src={siteData.heroImages[index]} alt="Property view" initial={{ opacity: 0.35, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0.35 }} transition={{ duration: 0.6 }} className="absolute inset-0 h-full w-full object-cover" />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {siteData.homeStats.map((item) => (
                <div key={item.label} className="rounded-2xl bg-white/12 p-4 text-white backdrop-blur-md ring-1 ring-white/15">
                  <p className="text-2xl font-semibold">{item.value}</p>
                  <p className="mt-1 text-sm text-white/75">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-6 right-6 flex gap-2">
            {siteData.heroImages.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} className={`h-2.5 w-8 rounded-full transition ${i === index ? "bg-white" : "bg-white/40"}`} />
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

function HomePage() {
  return (
    <>
      <Hero />
      <InfoStrip />
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading eyebrow="Rooms" title="A room for every kind of stay" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {siteData.rooms.map((room) => (
              <div key={room.id} className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
                <img src={room.image} alt={room.name} className="aspect-[4/3] w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900">{room.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{room.description}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-lg font-semibold text-slate-900">{formatPrice(room.priceUSD, "USD")} / night</span>
                    <Link to="/rooms" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                      View <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading eyebrow="Plan better" title="Use the site as a light trip-planning tool too" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Link to="/experiences" className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">Experiences</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">Browse activity ideas like cenotes, island days, snorkeling, scenic stops, and lagoon outings.</p>
            </Link>
            <Link to="/itineraries" className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">Itineraries</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">Suggested day plans by energy level so travelers can decide quickly without too much information.</p>
            </Link>
            <Link to="/booking" className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">Booking</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">A clean direct-booking flow with dates, nights, and a pricing preview before sending a request.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function RoomsPage({ currency }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading eyebrow="Rooms" title="Choose the room that fits your trip" />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {siteData.rooms.map((room) => (
            <div key={room.id} className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
              <img src={room.image} alt={room.name} className="aspect-[4/3] w-full object-cover" />
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{room.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{room.sleeps} · {room.bed} · {room.size}</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">{room.badge}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{room.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {room.features.map((feature) => <span key={feature} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{feature}</span>)}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-lg font-semibold text-slate-900">{formatPrice(room.priceUSD, currency)} / night</span>
                  <Link to="/booking" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                    Book <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperiencesPage() {
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(siteData.experiences.map((x) => x.category)))];
  const items = category === "All" ? siteData.experiences : siteData.experiences.filter((x) => x.category === category);
  return (
    <section className="bg-slate-50/60">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Experiences" title="Helpful activity ideas without overwhelming the page" copy="These are simple planning cards tourists can scan quickly. They help visitors picture a trip before they ever message the host." />
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button key={item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-sm font-medium ${category === item ? "bg-slate-900 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200"}`}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
                <img src={item.image} alt={item.title} className="h-64 w-full object-cover" />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">{item.category}</p>
                      <h3 className="mt-2 text-2xl font-semibold text-slate-950">{item.title}</h3>
                    </div>
                    <div className="rounded-2xl bg-slate-100 p-3 text-slate-800"><Icon className="h-5 w-5" /></div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.summary}</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-600"><span className="font-medium text-slate-900">Time:</span> {item.time}</div>
                    <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-600"><span className="font-medium text-slate-900">Level:</span> {item.level}</div>
                    <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-600"><span className="font-medium text-slate-900">Best for:</span> {item.bestFor}</div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.highlights.map((h) => <span key={h} className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-800">{h}</span>)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ItinerariesPage() {
  const [level, setLevel] = useState("All");
  const levels = ["All", ...Array.from(new Set(siteData.itineraries.map((x) => x.activityLevel)))];
  const items = level === "All" ? siteData.itineraries : siteData.itineraries.filter((x) => x.activityLevel === level);
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Itineraries" title="Suggested day plans by activity level" copy="This page keeps planning useful but light. Travelers can pick an energy level first, then see a simple idea for how to structure their day." />
          <div className="flex flex-wrap gap-2">
            {levels.map((item) => (
              <button key={item} onClick={() => setLevel(item)} className={`rounded-full px-4 py-2 text-sm font-medium ${level === item ? "bg-slate-900 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200"}`}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-[30px] border border-slate-200 bg-slate-50/70 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">{item.activityLevel}</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-950">{item.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">{item.duration}</span>
                <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">{item.pace}</span>
              </div>
              <div className="mt-5 space-y-3">
                {item.items.map((step, idx) => (
                  <div key={step} className="flex gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-slate-200">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">{idx + 1}</span>
                    <span className="text-sm text-slate-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingPage({ currency }) {
  const t = translations.en;
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
  const whatsappHref = `https://wa.me/${siteData.brand.whatsappNumber.replace(/\D/g, "")}`;
  return (
    <section className="bg-slate-100/80">
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
              <input name="name" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder={t.fullName} />
              <input name="email" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder={t.email} />
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="rounded-2xl border border-slate-200 p-4">
                  <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{t.checkIn}</span>
                  <input type="date" name="checkin" value={checkIn} min={defaultIn} onChange={(e) => { setCheckIn(e.target.value); if (e.target.value >= checkOut) { const next = new Date(e.target.value + "T00:00:00"); next.setDate(next.getDate() + 1); setCheckOut(next.toISOString().slice(0, 10)); } }} className="w-full bg-transparent text-sm text-slate-900 outline-none" />
                  <p className="mt-2 text-sm text-slate-500">{formatDate(checkIn)}</p>
                </label>
                <label className="rounded-2xl border border-slate-200 p-4">
                  <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{t.checkOut}</span>
                  <input type="date" name="checkout" value={checkOut} min={checkIn} onChange={(e) => setCheckOut(e.target.value)} className="w-full bg-transparent text-sm text-slate-900 outline-none" />
                  <p className="mt-2 text-sm text-slate-500">{formatDate(checkOut)}</p>
                </label>
              </div>
              <select name="room" value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-700 outline-none">
                {siteData.rooms.map((room) => <option key={room.id} value={room.name}>{room.name} — {formatPrice(room.priceUSD, currency)}</option>)}
              </select>
              <textarea name="notes" className="min-h-[120px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder={t.questions} />
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
              <button type="submit" className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">Send request</button>
            </form>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a href={whatsappHref} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
              <a href={`mailto:${siteData.brand.email}`} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700"><Mail className="h-4 w-4" /> Email</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const t = translations.en;
  const whatsappHref = `https://wa.me/${siteData.brand.whatsappNumber.replace(/\D/g, "")}`;
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
            <a href={siteData.brand.instagram} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2"><Instagram className="h-4 w-4" /> Instagram</a>
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2"><ArrowUp className="h-4 w-4" /> {t.backToTop}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("USD");
  const whatsappHref = `https://wa.me/${siteData.brand.whatsappNumber.replace(/\D/g, "")}`;
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <StickyWhatsApp href={whatsappHref} />
      <NavBar language={language} setLanguage={setLanguage} currency={currency} setCurrency={setCurrency} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms" element={<RoomsPage currency={currency} />} />
        <Route path="/experiences" element={<ExperiencesPage />} />
        <Route path="/itineraries" element={<ItinerariesPage />} />
        <Route path="/booking" element={<BookingPage currency={currency} />} />
      </Routes>
      <Footer />
    </div>
  );
}
