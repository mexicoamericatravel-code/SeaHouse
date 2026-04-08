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
} from "lucide-react";

const translations = {
  en: {
    navRooms: "Rooms",
    navAmenities: "Amenities",
    navGallery: "Gallery",
    navAttractions: "Attractions",
    navAbout: "About",
    navBook: "Book",
    near: "Near Cancun, Mexico",
    heroTitle: "A modern tropical stay near Cancun that feels easy, warm, and unforgettable.",
    heroCopy:
      "Private rooms, direct booking, local hosting, and a calm Caribbean vibe — designed for travelers who want something more personal than a big resort.",
    viewRooms: "View rooms",
    requestBooking: "Request a booking",
    directBooking: "Direct booking — no platform fees",
    ratings: "4.98 rating · 84 reviews",
    roomsEyebrow: "Stay",
    roomsTitle: "Choose the room that fits your trip",
    roomsCopy:
      "A simpler room-first layout with clear details, better photos, and less clutter than a typical rental site.",
    startingFrom: "Starting from",
    requestThisRoom: "Request this room",
    amenitiesEyebrow: "Included",
    amenitiesTitle: "Everything guests usually ask about, upfront",
    amenitiesCopy: "Make the important details obvious so guests can say yes faster.",
    galleryEyebrow: "Gallery",
    galleryTitle: "Bright photos. Clean layout. Strong first impression.",
    galleryCopy: "Good photos do most of the selling. Keep the design simple and let the home feel real.",
    tripEyebrow: "Perfect for",
    tripTitle: "Different kinds of trips, one calm home base",
    tripCopy: "Help guests picture themselves here by speaking directly to the kind of stay they want.",
    attractionsEyebrow: "Nearby",
    attractionsTitle: "Easy access to the best of Cancun and the coast",
    attractionsCopy: "This section helps turn interest into booking by showing guests what they can enjoy nearby.",
    bookingEyebrow: "Book direct",
    bookingTitle: "Keep bookings simple now, upgrade later",
    bookingCopy: "Version 1 should collect booking requests by form, email, or WhatsApp.",
    chooseDates: "Choose dates",
    chooseDatesCopy: "Guests share preferred check-in and check-out dates.",
    pickRoom: "Pick a room",
    pickRoomCopy: "They select the room that fits their stay best.",
    confirmFast: "Confirm quickly",
    confirmFastCopy: "The host responds by WhatsApp or email.",
    requestStay: "Request a stay",
    formIntro: "This can stay simple for now. Later it can connect to Netlify Forms or a booking backend.",
    fullName: "Full name",
    email: "Email",
    checkIn: "Check-in",
    checkOut: "Check-out",
    selectRoom: "Select a room",
    questions: "Questions, arrival time, number of guests...",
    sendBooking: "Send booking request",
    testimonialsTitle: "What guests say",
    addOnsTitle: "Enhance your stay",
    locationTitle: "Location",
    locationCopy: "Near Cancun, with easy access to beaches, day trips, restaurants, and airport connections.",
    footerTag: "Built for direct bookings — no platform fees.",
  },
  es: {
    navRooms: "Habitaciones",
    navAmenities: "Servicios",
    navGallery: "Galería",
    navAttractions: "Atracciones",
    navAbout: "Acerca de",
    navBook: "Reservar",
    near: "Cerca de Cancún, México",
    heroTitle: "Una estadía tropical moderna cerca de Cancún, fácil, cálida e inolvidable.",
    heroCopy:
      "Habitaciones privadas, reservas directas, atención local y un ambiente caribeño tranquilo.",
    viewRooms: "Ver habitaciones",
    requestBooking: "Solicitar reserva",
    directBooking: "Reserva directa — sin comisiones",
    ratings: "Calificación 4.98 · 84 reseñas",
    roomsEyebrow: "Hospedaje",
    roomsTitle: "Elige la habitación ideal para tu viaje",
    roomsCopy: "Un diseño simple y enfocado en habitaciones con detalles claros y mejores fotos.",
    startingFrom: "Desde",
    requestThisRoom: "Solicitar esta habitación",
    amenitiesEyebrow: "Incluido",
    amenitiesTitle: "Todo lo importante, al frente",
    amenitiesCopy: "Muestra los detalles clave para que sea más fácil reservar.",
    galleryEyebrow: "Galería",
    galleryTitle: "Fotos luminosas. Diseño limpio. Gran impresión.",
    galleryCopy: "Las buenas fotos hacen gran parte de la venta.",
    tripEyebrow: "Ideal para",
    tripTitle: "Diferentes tipos de viaje, una base tranquila",
    tripCopy: "Ayuda a los huéspedes a imaginarse aquí según el tipo de estancia.",
    attractionsEyebrow: "Cerca",
    attractionsTitle: "Acceso fácil a lo mejor de Cancún y la costa",
    attractionsCopy: "Esta sección ayuda a convertir interés en reservas.",
    bookingEyebrow: "Reserva directa",
    bookingTitle: "Mantén las reservas simples ahora",
    bookingCopy: "La versión 1 debe recibir solicitudes por formulario, correo o WhatsApp.",
    chooseDates: "Elegir fechas",
    chooseDatesCopy: "Los huéspedes comparten sus fechas de entrada y salida.",
    pickRoom: "Elegir habitación",
    pickRoomCopy: "Seleccionan la habitación ideal para su viaje.",
    confirmFast: "Confirmar rápido",
    confirmFastCopy: "La anfitriona responde por WhatsApp o correo.",
    requestStay: "Solicitar estancia",
    formIntro: "Por ahora puede seguir siendo simple. Después se puede conectar a Netlify Forms.",
    fullName: "Nombre completo",
    email: "Correo electrónico",
    checkIn: "Entrada",
    checkOut: "Salida",
    selectRoom: "Selecciona una habitación",
    questions: "Preguntas, hora de llegada, número de huéspedes...",
    sendBooking: "Enviar solicitud",
    testimonialsTitle: "Lo que dicen los huéspedes",
    addOnsTitle: "Mejora tu estancia",
    locationTitle: "Ubicación",
    locationCopy: "Cerca de Cancún, con acceso fácil a playas, excursiones, restaurantes y aeropuerto.",
    footerTag: "Hecho para reservas directas — sin comisiones.",
  },
  fr: {
    navRooms: "Chambres",
    navAmenities: "Services",
    navGallery: "Galerie",
    navAttractions: "Attractions",
    navAbout: "À propos",
    navBook: "Réserver",
    near: "Près de Cancún, Mexique",
    heroTitle: "Un séjour tropical moderne près de Cancún, simple, chaleureux et inoubliable.",
    heroCopy: "Chambres privées, réservation directe, accueil local et ambiance caribéenne paisible.",
    viewRooms: "Voir les chambres",
    requestBooking: "Demander une réservation",
    directBooking: "Réservation directe — sans frais",
    ratings: "Note 4,98 · 84 avis",
    roomsEyebrow: "Séjour",
    roomsTitle: "Choisissez la chambre idéale pour votre voyage",
    roomsCopy: "Une présentation simple, centrée sur les chambres, avec des détails clairs.",
    startingFrom: "À partir de",
    requestThisRoom: "Demander cette chambre",
    amenitiesEyebrow: "Inclus",
    amenitiesTitle: "Tout ce que les voyageurs demandent souvent",
    amenitiesCopy: "Affichez clairement les points importants.",
    galleryEyebrow: "Galerie",
    galleryTitle: "Photos lumineuses. Mise en page épurée.",
    galleryCopy: "De bonnes photos font une grande partie du travail.",
    tripEyebrow: "Parfait pour",
    tripTitle: "Différents styles de voyage, une base paisible",
    tripCopy: "Aidez les voyageurs à se projeter ici.",
    attractionsEyebrow: "À proximité",
    attractionsTitle: "Accès facile au meilleur de Cancún et de la côte",
    attractionsCopy: "Cette section aide à transformer l’intérêt en réservation.",
    bookingEyebrow: "Réserver en direct",
    bookingTitle: "Gardez la réservation simple maintenant",
    bookingCopy: "La version 1 doit recueillir des demandes par formulaire, e-mail ou WhatsApp.",
    chooseDates: "Choisir les dates",
    chooseDatesCopy: "Les voyageurs partagent leurs dates d’arrivée et de départ.",
    pickRoom: "Choisir une chambre",
    pickRoomCopy: "Ils sélectionnent la chambre la plus adaptée.",
    confirmFast: "Confirmer rapidement",
    confirmFastCopy: "L’hôte répond par WhatsApp ou par e-mail.",
    requestStay: "Demander un séjour",
    formIntro: "Cela peut rester simple pour l’instant. Plus tard, le formulaire pourra être relié à Netlify Forms.",
    fullName: "Nom complet",
    email: "E-mail",
    checkIn: "Arrivée",
    checkOut: "Départ",
    selectRoom: "Choisissez une chambre",
    questions: "Questions, heure d’arrivée, nombre de voyageurs...",
    sendBooking: "Envoyer la demande",
    testimonialsTitle: "Avis des voyageurs",
    addOnsTitle: "Améliorez votre séjour",
    locationTitle: "Emplacement",
    locationCopy: "Près de Cancún, avec un accès facile aux plages, excursions et à l’aéroport.",
    footerTag: "Conçu pour la réservation directe — sans frais.",
  },
  pt: {
    navRooms: "Quartos",
    navAmenities: "Comodidades",
    navGallery: "Galeria",
    navAttractions: "Atrações",
    navAbout: "Sobre",
    navBook: "Reservar",
    near: "Perto de Cancún, México",
    heroTitle: "Uma estadia tropical moderna perto de Cancún, fácil, acolhedora e inesquecível.",
    heroCopy: "Quartos privativos, reserva direta, atendimento local e clima caribenho tranquilo.",
    viewRooms: "Ver quartos",
    requestBooking: "Solicitar reserva",
    directBooking: "Reserva direta — sem taxas",
    ratings: "Nota 4,98 · 84 avaliações",
    roomsEyebrow: "Hospedagem",
    roomsTitle: "Escolha o quarto ideal para sua viagem",
    roomsCopy: "Um layout simples e focado nos quartos, com detalhes claros.",
    startingFrom: "A partir de",
    requestThisRoom: "Solicitar este quarto",
    amenitiesEyebrow: "Incluído",
    amenitiesTitle: "Tudo o que os hóspedes costumam perguntar",
    amenitiesCopy: "Mostre os detalhes importantes com clareza.",
    galleryEyebrow: "Galeria",
    galleryTitle: "Fotos iluminadas. Layout limpo.",
    galleryCopy: "Boas fotos fazem grande parte da venda.",
    tripEyebrow: "Ideal para",
    tripTitle: "Diferentes tipos de viagem, uma base tranquila",
    tripCopy: "Ajude o hóspede a se imaginar aqui.",
    attractionsEyebrow: "Por perto",
    attractionsTitle: "Acesso fácil ao melhor de Cancún e da costa",
    attractionsCopy: "Esta seção ajuda a transformar interesse em reserva.",
    bookingEyebrow: "Reserve direto",
    bookingTitle: "Mantenha a reserva simples agora",
    bookingCopy: "A versão 1 deve receber pedidos por formulário, e-mail ou WhatsApp.",
    chooseDates: "Escolher datas",
    chooseDatesCopy: "Os hóspedes enviam datas de check-in e check-out.",
    pickRoom: "Escolher quarto",
    pickRoomCopy: "Eles selecionam o quarto ideal para a estadia.",
    confirmFast: "Confirmar rápido",
    confirmFastCopy: "A anfitriã responde por WhatsApp ou e-mail.",
    requestStay: "Solicitar estadia",
    formIntro: "Pode continuar simples por enquanto. Depois, isso pode se conectar ao Netlify Forms.",
    fullName: "Nome completo",
    email: "E-mail",
    checkIn: "Check-in",
    checkOut: "Check-out",
    selectRoom: "Selecione um quarto",
    questions: "Perguntas, horário de chegada, número de hóspedes...",
    sendBooking: "Enviar solicitação",
    testimonialsTitle: "O que os hóspedes dizem",
    addOnsTitle: "Melhore sua estadia",
    locationTitle: "Localização",
    locationCopy: "Perto de Cancún, com fácil acesso a praias, passeios, restaurantes e aeroporto.",
    footerTag: "Feito para reservas diretas — sem taxas.",
  },
};

const siteData = {
  brand: {
    name: "Casa Brisa del Mar",
    tagline: "Modern tropical stays near Cancun",
    whatsappNumber: "+52 998 000 0000",
    email: "hello@casabrisadelmar.com",
  },
  currencies: {
    USD: { symbol: "$", rate: 1, label: "USD" },
    MXN: { symbol: "$", rate: 16.7, label: "MXN" },
    EUR: { symbol: "€", rate: 0.92, label: "EUR" },
    CAD: { symbol: "C$", rate: 1.36, label: "CAD" },
    GBP: { symbol: "£", rate: 0.79, label: "GBP" },
    BRL: { symbol: "R$", rate: 4.95, label: "BRL" },
  },
  supportedLanguages: [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "fr", label: "Français" },
    { code: "pt", label: "Português" },
  ],
  heroImages: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=900&q=80",
  ],
  highlights: [
    "Direct booking with the host",
    "Near beaches, day trips, and local dining",
    "Fast Wi-Fi and warm hospitality",
    "Great for couples, families, solo travelers, and small groups",
  ],
  amenities: [
    { label: "High-speed Wi-Fi", icon: Wifi },
    { label: "Private pool", icon: Waves },
    { label: "Breakfast included", icon: Coffee },
    { label: "Free parking", icon: Car },
    { label: "Safe & secure", icon: ShieldCheck },
    { label: "Sunny Caribbean vibe", icon: Sun },
  ],
  rooms: [
    {
      id: "room-1",
      name: "The Ocean Room",
      priceUSD: 85,
      sleeps: "2 guests",
      size: "28 m²",
      description: "A bright room with a king bed, soft breezes, and a private terrace feel.",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      features: ["King bed", "Private terrace", "A/C", "Rain shower"],
      status: "Available",
      badge: "Most popular",
    },
    {
      id: "room-2",
      name: "The Garden Suite",
      priceUSD: 110,
      sleeps: "4 guests",
      size: "42 m²",
      description: "A larger room for families or friends with outdoor access and more space.",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
      features: ["King + sofa bed", "Pool access", "Kitchenette", "Garden view"],
      status: "Available",
      badge: "Best for families",
    },
    {
      id: "room-3",
      name: "The Rooftop Loft",
      priceUSD: 95,
      sleeps: "2 guests",
      size: "32 m²",
      description: "A more private romantic option with a rooftop atmosphere and slower pace.",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      features: ["Queen bed", "Private rooftop", "Hammock", "Premium linens"],
      status: "Available",
      badge: "Most romantic",
    },
  ],
  travelerTypes: [
    { title: "Solo trips", icon: Compass, copy: "Quiet, safe, personal, and easy to navigate." },
    { title: "Couples", icon: Heart, copy: "Great for romantic getaways and slow tropical days together." },
    { title: "Family trips", icon: Baby, copy: "Outdoor space and calmer atmosphere for easy family stays." },
    { title: "Small groups", icon: Users, copy: "Perfect for friend groups, retreat weekends, and shared stays." },
  ],
  attractions: [
    { name: "Nearby beaches", type: "Beach", time: "5–15 min", copy: "Easy beach access for swimming and sunset walks.", icon: Waves },
    { name: "Downtown Cancun dining", type: "Food & nightlife", time: "15–25 min", copy: "Local restaurants, tacos, cafes, and nightlife.", icon: Coffee },
    { name: "Isla Mujeres ferry", type: "Day trip", time: "20–30 min", copy: "Easy add-on for beach clubs, snorkeling, and island escapes.", icon: Plane },
    { name: "Cenotes & nature spots", type: "Adventure", time: "30–60 min", copy: "A more natural and memorable Yucatán experience.", icon: Sun },
    { name: "Shopping & essentials", type: "Convenience", time: "10–20 min", copy: "Groceries, pharmacies, and practical stops close by.", icon: MapPin },
    { name: "Airport access", type: "Travel", time: "25–40 min", copy: "Convenient for weekend stays and smooth arrivals.", icon: Clock3 },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=900&q=80",
  ],
  testimonials: [
    { name: "Sarah (USA)", text: "This felt way more personal than a resort. Super clean, great host, and easy booking.", rating: 5 },
    { name: "Luis (Mexico)", text: "Muy cómodo, excelente ubicación y muy buena atención.", rating: 5 },
    { name: "Claire (France)", text: "Beautiful place, peaceful and close to everything. Would stay again.", rating: 5 },
  ],
  addOns: [
    { title: "Airport pickup", price: "$40", desc: "Private pickup from Cancun airport" },
    { title: "Grocery setup", price: "$25", desc: "Fridge stocked before arrival" },
    { title: "Local tours", price: "$60+", desc: "Cenotes, island trips, excursions" },
    { title: "Romantic setup", price: "$50", desc: "Decor and wine for couples" },
  ],
};

const filters = ["All", "Available"];

function formatPrice(priceUSD, currencyKey) {
  const currency = siteData.currencies[currencyKey];
  const value = priceUSD * currency.rate;
  const rounded = currencyKey === "MXN" || currencyKey === "BRL" ? Math.round(value) : Math.round(value * 100) / 100;
  return `${currency.symbol}${rounded.toLocaleString()} ${currency.label}`;
}

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-600">{copy}</p>
    </div>
  );
}

function RoomCard({ room, currencyKey, t }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={room.image} alt={room.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm">{room.badge}</div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{room.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{room.sleeps} · {room.size}</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">{room.status}</span>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">{room.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {room.features.map((feature) => (
            <span key={feature} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{feature}</span>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">{t.startingFrom}</p>
            <p className="text-lg font-semibold text-slate-900">{formatPrice(room.priceUSD, currencyKey)} / night</p>
          </div>
          <a href="#booking" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:translate-y-[-1px]">
            {t.requestThisRoom} <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function InfoCard({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="rounded-xl bg-sky-50 p-2 text-sky-700"><Icon className="h-5 w-5" /></div>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </div>
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
      <a href={whatsappHref} className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-white shadow-lg transition hover:scale-105">
        <MessageCircle className="h-4 w-4" /> Chat
      </a>

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
            <a href="#booking" className="rounded-full bg-slate-900 px-4 py-2 text-white">{t.navBook}</a>
          </nav>
          <div className="flex items-center gap-3">
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
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm">
              <Sparkles className="h-4 w-4" /> {t.directBooking}
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{t.near}</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">{t.heroTitle}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{t.heroCopy}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#rooms" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm">{t.viewRooms}</a>
              <a href="#booking" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800">{t.requestBooking}</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">{t.ratings}</span>
              <span className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">{t.directBooking}</span>
              <span className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">Multi-language + currency ready</span>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {siteData.highlights.map((item) => <div key={item} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">{item}</div>)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 overflow-hidden rounded-[34px] shadow-xl">
              <img src={siteData.heroImages[0]} alt="Tropical beach" className="h-72 w-full object-cover sm:h-96" />
            </div>
            <div className="overflow-hidden rounded-[28px] shadow-md">
              <img src={siteData.heroImages[1]} alt="Room interior" className="h-44 w-full object-cover sm:h-56" />
            </div>
            <div className="overflow-hidden rounded-[28px] shadow-md">
              <img src={siteData.heroImages[2]} alt="Outdoor area" className="h-44 w-full object-cover sm:h-56" />
            </div>
          </div>
        </section>

        <section id="rooms" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow={t.roomsEyebrow} title={t.roomsTitle} copy={t.roomsCopy} />
            <div className="flex flex-wrap gap-2">
              {filters.map((item) => (
                <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-4 py-2 text-sm font-medium ${filter === item ? "bg-slate-900 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200"}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {visibleRooms.map((room) => <RoomCard key={room.id} room={room} currencyKey={currency} t={t} />)}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <SectionHeading eyebrow={t.amenitiesEyebrow} title={t.amenitiesTitle} copy={t.amenitiesCopy} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {siteData.amenities.map((item) => <InfoCard key={item.label} icon={item.icon} label={item.label} />)}
          </div>
        </section>

        <section id="gallery" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading eyebrow={t.galleryEyebrow} title={t.galleryTitle} copy={t.galleryCopy} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {siteData.gallery.map((image, i) => (
              <motion.div key={image + i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`overflow-hidden rounded-[28px] ${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}>
                <img src={image} alt={`Gallery ${i + 1}`} className="h-full min-h-[220px] w-full object-cover" />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading eyebrow={t.tripEyebrow} title={t.tripTitle} copy={t.tripCopy} />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {siteData.travelerTypes.map((item) => <InfoCard key={item.title} icon={item.icon} label={item.title} />)}
          </div>
        </section>

        <section id="attractions" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading eyebrow={t.attractionsEyebrow} title={t.attractionsTitle} copy={t.attractionsCopy} />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {siteData.attractions.map((item) => (
              <div key={item.name} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-2xl bg-cyan-50 p-3 text-cyan-700"><item.icon className="h-5 w-5" /></div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{item.time}</span>
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{item.type}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading eyebrow="Reviews" title={t.testimonialsTitle} copy="Social proof builds trust fast." />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {siteData.testimonials.map((review) => (
              <div key={review.name} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 flex gap-1 text-amber-500">{Array.from({ length: review.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
                <p className="text-sm leading-6 text-slate-600">{review.text}</p>
                <p className="mt-4 text-sm font-semibold text-slate-900">{review.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading eyebrow="Add-ons" title={t.addOnsTitle} copy="Easy ways to increase booking value over time." />
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

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading eyebrow="Map" title={t.locationTitle} copy={t.locationCopy} />
          <div className="mt-10 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=cancun&t=&z=11&ie=UTF8&iwloc=&output=embed"
              className="h-[420px] w-full border-0"
            />
          </div>
        </section>

        <section id="booking" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <SectionHeading eyebrow={t.bookingEyebrow} title={t.bookingTitle} copy={t.bookingCopy} />
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Calendar, title: t.chooseDates, copy: t.chooseDatesCopy },
                  { icon: Globe, title: t.pickRoom, copy: t.pickRoomCopy },
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
                <input name="name" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder={t.fullName} />
                <input name="email" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder={t.email} />
                <div className="grid grid-cols-2 gap-4">
                  <input name="checkin" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder={t.checkIn} />
                  <input name="checkout" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder={t.checkOut} />
                </div>
                <select name="room" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-600 outline-none">
                  <option>{t.selectRoom}</option>
                  {siteData.rooms.map((room) => <option key={room.id}>{room.name} — {formatPrice(room.priceUSD, currency)}</option>)}
                </select>
                <textarea name="notes" className="min-h-[120px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder={t.questions} />
                <button type="submit" className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
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
      </main>

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
