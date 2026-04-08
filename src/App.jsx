import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
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
  Globe,
  BedDouble,
  PalmTree,
  Instagram,
  CheckCircle2,
} from "lucide-react";
import { siteData, translations } from "./siteData";

const roomFilters = ["All", "Available"];

function formatPrice(priceUSD, currencyKey) {
  const currency = siteData.currencies[currencyKey];
  const value = priceUSD * currency.rate;
  const rounded =
    currencyKey === "MXN" || currencyKey === "BRL"
      ? Math.round(value)
      : Math.round(value * 100) / 100;
  return `${currency.symbol}${rounded.toLocaleString()} ${currency.label}`;
}

function SectionHeading({ eyebrow, title, copy, align = "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-600">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-600">{copy}</p>
    </div>
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
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <div>
          <p className="text-lg font-semibold tracking-tight text-slate-950">{siteData.brand.name}</p>
          <p className="text-xs text-slate-500">{t.near}</p>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <a href="#rooms" className="text-slate-600 hover:text-slate-950">{t.navRooms}</a>
          <a href="#gallery" className="text-slate-600 hover:text-slate-950">{t.navGallery}</a>
          <a href="#attractions" className="text-slate-600 hover:text-slate-950">{t.navAttractions}</a>
          <a href="#reviews" className="text-slate-600 hover:text-slate-950">{t.navReviews}</a>
          <a href="#booking" className="rounded-full bg-slate-900 px-4 py-2 text-white">{t.navBook}</a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <Languages className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none focus:border-slate-400"
            >
              {siteData.supportedLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.label}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <DollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="rounded-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none focus:border-slate-400"
            >
              {Object.keys(siteData.currencies).map((code) => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero({ t, whatsappHref }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.12),transparent_26%)]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <div className="relative flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm">
            <Sparkles className="h-4 w-4" />
            {t.directBooking}
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{t.near}</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
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

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
            {[
              t.ratings,
              t.directBooking,
              t.multiReady,
            ].map((item) => (
              <span key={item} className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {siteData.highlights.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative grid grid-cols-2 gap-4">
          <div className="col-span-2 overflow-hidden rounded-[34px] shadow-xl">
            <img src={siteData.heroImages[0]} alt="Tropical beach" className="h-72 w-full object-cover sm:h-[420px]" />
          </div>
          <div className="overflow-hidden rounded-[28px] shadow-md">
            <img src={siteData.heroImages[1]} alt="Room interior" className="h-44 w-full object-cover sm:h-56" />
          </div>
          <div className="overflow-hidden rounded-[28px] shadow-md">
            <img src={siteData.heroImages[2]} alt="Outdoor area" className="h-44 w-full object-cover sm:h-56" />
          </div>
        </div>
      </div>
    </section>
  );
}

function RoomCard({ room, currency, t, language }) {
  const description = room.descriptions?.[language] || room.descriptions?.en || room.description;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm shadow-slate-200/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={room.image} alt={room.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm">
          {room.badge}
        </div>
        <div className="absolute bottom-4 right-4 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {room.season}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{room.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{room.sleeps} · {room.bed} · {room.size}</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            {room.status}
          </span>
        </div>

        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {room.features.map((feature) => (
            <span key={feature} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {feature}
            </span>
          ))}
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
      <div className="rounded-xl bg-sky-50 p-2 text-sky-700">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </div>
  );
}

function TravelerCard({ icon: Icon, title, copy }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="w-fit rounded-2xl bg-emerald-50 p-3 text-emerald-700">
        <Icon className="h-5 w-5" />
      </div>
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
        <div className="rounded-2xl bg-cyan-50 p-3 text-cyan-700">
          <Icon className="h-5 w-5" />
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{item.time}</span>
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{item.type}</p>
      <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.name}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{item.copy}</p>
    </div>
  );
}

function SeasonalPricing({ currency, t }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <SectionHeading
        eyebrow={t.seasonEyebrow}
        title={t.seasonTitle}
        copy={t.seasonCopy}
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {siteData.seasons.map((season) => (
          <div key={season.name} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{season.months}</p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900">{season.name}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{season.copy}</p>
            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">{t.sampleNightlyRate}</p>
              <p className="mt-1 text-lg font-semibold text-cyan-700">
                {formatPrice(season.sampleRateUSD, currency)} / night
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReviewsSection({ t }) {
  return (
    <section id="reviews" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <SectionHeading eyebrow={t.reviewsEyebrow} title={t.testimonialsTitle} copy={t.reviewsCopy} />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {siteData.testimonials.map((review) => (
          <div key={review.name} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-3 flex gap-1 text-amber-500">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-sm leading-6 text-slate-600">{review.text}</p>
            <p className="mt-4 text-sm font-semibold text-slate-900">{review.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AddOnsSection({ t }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <SectionHeading eyebrow={t.addOnsEyebrow} title={t.addOnsTitle} copy={t.addOnsCopy} />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {siteData.addOns.map((item) => (
          <div key={item.title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            <p className="mt-4 text-lg font-semibold text-cyan-700">{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function NeighborhoodSection({ t }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <SectionHeading eyebrow={t.neighborhoodEyebrow} title={t.neighborhoodTitle} copy={t.neighborhoodCopy} />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {siteData.neighborhood.map((item) => (
          <div key={item.title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AvailabilitySection({ t }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <SectionHeading eyebrow={t.availabilityEyebrow} title={t.availabilityTitle} copy={t.availabilityCopy} />
      <div className="mt-10 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <div className="grid border-b border-slate-200 md:grid-cols-5">
          {siteData.availabilityMonths.map((month) => (
            <div key={month.name} className="border-r border-slate-200 p-5 last:border-r-0">
              <p className="text-sm font-semibold text-slate-900">{month.name}</p>
              <div className="mt-4 space-y-2">
                {month.statuses.map((row) => (
                  <div key={row.label} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm">
                    <span className="text-slate-600">{row.label}</span>
                    <span className={`font-medium ${row.value === "Good" ? "text-emerald-700" : row.value === "Limited" ? "text-amber-700" : "text-rose-700"}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-5 p-5 text-sm text-slate-600">
          <div className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Good = usually open</div>
          <div className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-amber-600" /> Limited = ask first</div>
          <div className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-rose-600" /> Busy = book early</div>
        </div>
      </div>
    </section>
  );
}

function MapSection({ t }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <SectionHeading eyebrow={t.mapEyebrow} title={t.locationTitle} copy={t.locationCopy} />
      <div className="mt-10 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <iframe
          title="map"
          src="https://maps.google.com/maps?q=cancun&t=&z=11&ie=UTF8&iwloc=&output=embed"
          className="h-[420px] w-full border-0"
        />
      </div>
    </section>
  );
}

function BookingSection({ t, currency, whatsappHref }) {
  return (
    <section id="booking" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <div>
          <SectionHeading eyebrow={t.bookingEyebrow} title={t.bookingTitle} copy={t.bookingCopy} />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Calendar, title: t.chooseDates, copy: t.chooseDatesCopy },
              { icon: BedDouble, title: t.pickRoom, copy: t.pickRoomCopy },
              { icon: MessageCircle, title: t.confirmFast, copy: t.confirmFastCopy },
            ].map((step) => (
              <div key={step.title} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                <step.icon className="h-5 w-5 text-slate-700" />
                <h4 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900">{t.requestStay}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{t.formIntro}</p>

          <form name="booking-request" method="POST" data-netlify="true" className="mt-6 space-y-4">
            <input type="hidden" name="form-name" value="booking-request" />
            <input name="name" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none placeholder:text-slate-400 focus:border-slate-400" placeholder={t.fullName} />
            <input name="email" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none placeholder:text-slate-400 focus:border-slate-400" placeholder={t.email} />
            <div className="grid grid-cols-2 gap-4">
              <input name="checkin" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none placeholder:text-slate-400 focus:border-slate-400" placeholder={t.checkIn} />
              <input name="checkout" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none placeholder:text-slate-400 focus:border-slate-400" placeholder={t.checkOut} />
            </div>
            <select name="room" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-600 outline-none focus:border-slate-400">
              <option>{t.selectRoom}</option>
              {siteData.rooms.map((room) => (
                <option key={room.id}>{room.name} — {formatPrice(room.priceUSD, currency)}</option>
              ))}
            </select>
            <textarea name="notes" className="min-h-[120px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none placeholder:text-slate-400 focus:border-slate-400" placeholder={t.questions} />
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
    </section>
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
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50/40 text-slate-900">
      <StickyWhatsApp href={whatsappHref} />
      <NavBar
        t={t}
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
      />
      <Hero t={t} whatsappHref={whatsappHref} />

      <section id="rooms" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={t.roomsEyebrow} title={t.roomsTitle} copy={t.roomsCopy} />
          <div className="flex flex-wrap gap-2">
            {roomFilters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  filter === item ? "bg-slate-900 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-slate-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {visibleRooms.map((room) => (
            <RoomCard key={room.id} room={room} currency={currency} t={t} language={language} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <SectionHeading eyebrow={t.amenitiesEyebrow} title={t.amenitiesTitle} copy={t.amenitiesCopy} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {siteData.amenities.map((item) => (
            <AmenityCard key={item.label} icon={item.icon} label={item.label} />
          ))}
        </div>
      </section>

      <section id="gallery" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading eyebrow={t.galleryEyebrow} title={t.galleryTitle} copy={t.galleryCopy} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {siteData.gallery.map((image, i) => (
            <motion.div
              key={image + i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`overflow-hidden rounded-[28px] ${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}
            >
              <img src={image} alt={`Gallery ${i + 1}`} className="h-full min-h-[220px] w-full object-cover" />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading eyebrow={t.tripEyebrow} title={t.tripTitle} copy={t.tripCopy} />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {siteData.travelerTypes.map((item) => (
            <TravelerCard key={item.title} icon={item.icon} title={item.title} copy={item.copy} />
          ))}
        </div>
      </section>

      <section id="attractions" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading eyebrow={t.attractionsEyebrow} title={t.attractionsTitle} copy={t.attractionsCopy} />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {siteData.attractions.map((item) => (
            <AttractionCard key={item.name} item={item} />
          ))}
        </div>
      </section>

      <NeighborhoodSection t={t} />
      <SeasonalPricing currency={currency} t={t} />
      <AvailabilitySection t={t} />
      <ReviewsSection t={t} />
      <AddOnsSection t={t} />
      <MapSection t={t} />
      <BookingSection t={t} currency={currency} whatsappHref={whatsappHref} />

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="rounded-[32px] bg-slate-950 p-8 text-white">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">{t.socialEyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">{t.socialTitle}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">{t.socialCopy}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a href="#" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900">
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
              <a href={whatsappHref} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-lg font-semibold text-slate-900">{siteData.brand.name}</p>
            <p className="mt-1 text-sm text-slate-500">{siteData.brand.tagline}</p>
            <p className="mt-2 text-sm text-slate-500">{t.footerTag}</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
            <a href={whatsappHref} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2">
              <Phone className="h-4 w-4" /> WhatsApp
            </a>
            <a href={`mailto:${siteData.brand.email}`} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2">
              <Mail className="h-4 w-4" /> Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
