// src/App.jsx
import React from "react";
import pf1 from './assets/magnetky.jpg';
import pf2 from './assets/podtacky.jpg';
import pf3 from './assets/wifi-stojanek.jpg';
import { motion } from "framer-motion";
import {
  Menu, X, Sparkles, Send, Mail, Phone, Clock, CheckCircle2,
  ChevronRight, Shield, Hammer, Palette, Ruler, Instagram, Facebook,
  Sun, Moon
} from "lucide-react";
import logo from "./logo-gravirlab-v1.png";

// ---------- Color system + dark theme ----------
const PaletteStyles = () => (
  <style>{`
    :root{
      --bg: #edf1f7;          /* muted light base */
      --panel: #f9fafb;       /* soft panel */
      --muted: #4d5872;       /* muted text */
      --text: #0b1220;        /* main text */
      --accent-1: #0ea5e9;    /* sky */
      --accent-2: #8b5cf6;    /* violet */
      --accent-3: #f59e0b;    /* amber */
      --grad-2: radial-gradient(1200px 600px at 0% 0%, rgba(139,92,246,0.16), transparent 60%),
                radial-gradient(1200px 600px at 100% 0%, rgba(14,165,233,0.16), transparent 60%),
                radial-gradient(1200px 600px at 50% 100%, rgba(245,158,11,0.12), transparent 60%);
    }
    .dark{
      --bg: #0b1020;          /* deep navy */
      --panel: #11182f;       /* panel surface */
      --muted: #a4b0cf;       /* muted text */
      --text: #e6eeff;        /* main text */
      --accent-1: #22d3ee;    /* cyan */
      --accent-2: #a78bfa;    /* violet */
      --accent-3: #f59e0b;    /* amber */
      --grad-2: radial-gradient(1200px 600px at 0% 0%, rgba(167,139,250,0.22), transparent 60%),
                radial-gradient(1200px 600px at 100% 0%, rgba(34,211,238,0.22), transparent 60%),
                radial-gradient(1200px 600px at 50% 100%, rgba(245,158,11,0.18), transparent 60%);
    }
    html { scroll-behavior: smooth }
    body { background: var(--bg); color: var(--text); }
  `}</style>
);

// ---------- Dark mode hook ----------
const useDarkMode = () => {
  const getPref = () => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("gravirlab-theme") : null;
    if (saved) return saved === "dark";
    return typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  };
  const [dark, setDark] = React.useState(getPref);
  React.useEffect(() => {
    const cls = document.documentElement.classList;
    dark ? cls.add("dark") : cls.remove("dark");
    localStorage.setItem("gravirlab-theme", dark ? "dark" : "light");
  }, [dark]);
  return [dark, setDark];
};

// ---------- Layout helpers ----------
const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Section = ({ id, eyebrow, title, subtitle, children, className = "" }) => (
  <section id={id} className={`relative py-20 sm:py-24 ${className}`}>
    <Container>
      {(eyebrow || title || subtitle) && (
        <div className="mx-auto max-w-3xl text-center mb-12">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 rounded-full bg-black/10 dark:bg-white/10 ring-1 ring-black/15 dark:ring-white/10 px-3 py-1 text-xs uppercase tracking-wider text-[var(--muted)]">
              <Sparkles className="h-3.5 w-3.5" />
              {eyebrow}
            </div>
          )}
          {title && (
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-[var(--text)]">
              {title}
            </h2>
          )}
          {subtitle && <p className="mt-4 text-base sm:text-lg text-[var(--muted)]">{subtitle}</p>}
        </div>
      )}
      {children}
    </Container>
  </section>
);

const GradientButton = ({ children, href = "#contact", className = "", icon: Icon = ChevronRight }) => (
  <a
    href={href}
    className={`group inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-medium text-white transition-all shadow-lg hover:shadow-xl active:scale-[.98] bg-gradient-to-br from-[var(--accent-3)] to-[var(--accent-2)] ${className}`}
  >
    {children}
    <Icon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
  </a>
);

const GhostButton = ({ children, href = "#portfolio" }) => (
  <a
    href={href}
    className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-medium text-[var(--text)] transition-all border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20"
  >
    {children}
  </a>
);

// ---------- Sticky socials ----------
const StickySocials = () => (
  <div className="fixed right-4 bottom-4 flex flex-col gap-3 z-50">
    <a href="https://www.facebook.com/profile.php?id=61572591066011" aria-label="Facebook"
       className="p-3 rounded-full bg-[var(--panel)] border border-black/10 dark:border-white/10 shadow hover:shadow-lg transition">
      <Facebook className="h-5 w-5 text-[var(--accent-1)]" />
    </a>
    <a href="https://www.instagram.com/gravirlab/" aria-label="Instagram"
       className="p-3 rounded-full bg-[var(--panel)] border border-black/10 dark:border-white/10 shadow hover:shadow-lg transition">
      <Instagram className="h-5 w-5 text-[var(--accent-2)]" />
    </a>
  </div>
);

// ---------- Navbar ----------
const Nav = () => {
  const [open, setOpen] = React.useState(false);
  const [dark, setDark] = useDarkMode();
  const links = [
    { href: "#services", label: "Služby" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#process", label: "Proces" },
    { href: "#about", label: "O nás" },
  ];
  return (
    <div className="fixed top-4 left-0 right-0 z-50">
      <Container>
        <div className=" rounded-2xl border border-black/10 dark:border-white/10 bg-[var(--panel)]/90 backdrop-blur supports-[backdrop-filter]:bg-[var(--panel)]/80 px-4 py-3 flex items-center justify-between shadow-xl">
          <a href="#top" className="flex items-center gap-3">
            <img src={logo} alt="Gravirlab logo" className="h-12 w-12 object-contain rounded-xl" />
            <div className="leading-tight">
              <div className="text-[var(--text)] font-semibold">Gravírlab</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-[var(--muted)]">
            {links.map(l => (
              <a key={l.href} href={l.href} className="hover:text-[var(--text)] transition-colors">
                {l.label}
              </a>
            ))}
            <button
              onClick={() => setDark(!dark)}
              className="rounded-xl border border-black/10 dark:border-white/10 px-3 py-2 text-[var(--muted)] hover:text-[var(--text)] flex items-center gap-2"
              aria-label="Přepnout téma"
              title="Přepnout téma"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {dark ? "Light" : "Dark"}
            </button>
            <GradientButton href="#contact" className="ml-1" icon={Send}>Poptat zakázku</GradientButton>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setDark(!dark)}
              className="rounded-lg border border-black/10 dark:border-white/10 p-2 text-[var(--muted)] hover:text-[var(--text)]"
              aria-label="Přepnout téma"
              title="Přepnout téma"
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button onClick={() => setOpen(!open)} className="text-[var(--text)] p-2 rounded-lg border border-black/10 dark:border-white/10">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden mt-2 rounded-2xl border border-black/10 dark:border-white/10 bg-[var(--panel)]/95 backdrop-blur p-4 space-y-2">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                 className="block px-3 py-2 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-black/5 dark:hover:bg-white/5">
                {l.label}
              </a>
            ))}
            <GradientButton href="#contact" className="w-full justify-center" icon={Send}>Poptat zakázku</GradientButton>
          </div>
        )}
      </Container>
    </div>
  );
};

// ---------- Hero ----------
const Hero = () => (
  <section id="top" className="relative overflow-hidden">
    <div className="absolute inset-0 -z-10" style={{ background: "var(--grad-2)", backgroundColor: "var(--bg)" }} />
    <Container className="pt-36 sm:pt-40 pb-16">
      <div className=" grid items-center gap-12 lg:grid-cols-2">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}
            className="text-4xl sm:text-6xl font-semibold text-[var(--text)] leading-tight">
            Přenáším <span className="bg-clip-text text-transparent bg-gradient-to-br from-[var(--accent-3)] to-[var(--accent-2)]">vaše nápady</span> do překližky
          </motion.h1>
          <p className=" mt-5 text-[var(--muted)] text-lg max-w-xl">
            Precizní laserové gravírování z dřevěné překližky. Kusovky i malé série, návrh motivu a konzultace zdarma.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <GradientButton href="#contact" icon={Send}>Nezávazná poptávka</GradientButton>
            <GhostButton href="#portfolio">Zobrazit portfolio</GhostButton>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[var(--muted)]">
            {["Zakázková výroba", "Kusovky i malé série", "Návrh & poradenství", "Překližka – bříza/dub"].map((t, i) => (
              <div key={i} className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-2 text-center">{t}</div>
            ))}
          </div>
        </div>

        {/* Visual card */}
        <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .6, delay: .1 }} className="relative">
          <div className=" relative rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-[var(--panel)] shadow-2xl">
            <div className=" border border-gray-400 rounded-xl aspect-[4/3] w-full grid place-items-center">
              <div className="w-5/6 h-5/6  rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-black/5 dark:from-white/10 to-black/0 relative overflow-hidden">
                <div className=" absolute inset-0 opacity-20 dark:opacity-30" style={{
                  backgroundImage: `radial-gradient(circle at 20% 20%, currentColor 1px, transparent 1px), radial-gradient(circle at 70% 60%, currentColor 1px, transparent 1px)`,
                  color: "rgba(0,0,0,0.7)"
                }} />
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                  <span className="text-[10px] text-[var(--muted)]">Ukázková gravura – břízová překližka</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Container>
  </section>
);

// ---------- Service card ----------
const ServiceCard = ({ icon: Icon, title, desc }) => (
  <div className="rounded-2xl p-6 border border-black/20 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
    <div className="h-11 w-11 rounded-xl bg-[var(--panel)] grid place-items-center mb-4 border border-black/10 dark:border-white/10">
      <Icon className="h-5 w-5 text-[var(--accent-1)]" />
    </div>
    <h3 className="text-lg font-semibold text-[var(--text)]">{title}</h3>
    <p className="mt-2 text-[var(--muted)] text-sm">{desc}</p>
  </div>
);

// ---------- Portfolio item ----------
// ---- Portfolio item (kliknutelná karta) ----
const PortfolioItem = ({ src, label, onOpen }) => (
  <button
    type="button"
    onClick={() => onOpen(src, label)}
    className="group relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]"
    aria-label={`Otevřít náhled: ${label}`}
  >
    <img src={src} alt={label} className="w-full aspect-square object-cover transition-transform group-hover:scale-[1.02]" />
    <div className="absolute bottom-0 left-0 right-0 p-3 text-xs text-[var(--muted)] bg-[var(--panel)]/80 backdrop-blur">
      {label}
    </div>
  </button>
);

// Lightbox (z-index posílám vysoko, zavírání: klik ven, ✕, Esc, ←/→)
const Lightbox = ({ open, item, onClose, onPrev, onNext }) => {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, onPrev, onNext]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={item.src} alt={item.label} className="w-full h-auto rounded-2xl shadow-2xl" />

        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span className="hidden sm:block text-xs px-2 py-1 rounded bg-black/60 text-white">
            {item.label}
          </span>
          <button
            onClick={onClose}
            aria-label="Zavřít náhled"
            className="h-9 w-9 grid place-items-center rounded-full bg-black/70 text-white hover:bg-black/80"
            title="Zavřít (Esc)"
          >
            ✕
          </button>
        </div>

        <button
          onClick={onPrev}
          aria-label="Předchozí"
          className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/70 text-white grid place-items-center hover:bg-black/80"
          title="Předchozí (←)"
        >‹</button>

        <button
          onClick={onNext}
          aria-label="Další"
          className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/70 text-white grid place-items-center hover:bg-black/80"
          title="Další (→)"
        >›</button>
      </div>
    </div>
  );
};

// Sekce Portfolio – kliknutelné karty volají open(i)
const PortfolioSection = () => {
  const items = [
    { src: pf1, label: "Magnetky – gravura do překližky" },
    { src: pf2, label: "Podtácky – různé kusy" },
    { src: pf3, label: "Destička s QR kódem pro připojení k WiFi" }
  ];

  const [state, setState] = React.useState({ open: false, index: 0 });
  const open  = (idx) => { setState({ open: true, index: idx }); };
  const close = ()     => { setState((s) => ({ ...s, open: false })); };
  const prev  = ()     => { setState((s) => ({ ...s, index: (s.index - 1 + items.length) % items.length })); };
  const next  = ()     => { setState((s) => ({ ...s, index: (s.index + 1) % items.length })); };

  return (
    <Section
      id="portfolio"
      eyebrow="Portfolio"
      title="Ukázky realizací"
      subtitle="Ukázka reálných zakázek a vzorků."
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((it, i) => (
          <button
            key={i}
            type="button"
            onClick={() => open(i)}
            className="group relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]"
            aria-label={`Otevřít náhled: ${it.label}`}
          >
            <img src={it.src} alt={it.label} className="w-full aspect-square object-cover transition-transform group-hover:scale-[1.02]" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-xs text-[var(--muted)] bg-[var(--panel)]/80 backdrop-blur">
              {it.label}
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={state.open}
        item={items[state.index]}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </Section>
  );
};




const ContactForm = () => {
  const inputBase =
    "rounded-xl bg-[var(--panel)] border-2 border-black/20 hover:border-black/30 " +
    "focus:border-[var(--accent-1)] focus:ring-2 focus:ring-[var(--accent-1)]/30 " +
    "px-3 py-2 text-[var(--text)] placeholder:text-[var(--muted)] transition-all";

  const textAreaBase =
    "rounded-xl bg-[var(--panel)] border-2 border-black/20 hover:border-black/30 " +
    "focus:border-[var(--accent-1)] focus:ring-2 focus:ring-[var(--accent-1)]/30 " +
    "px-3 py-2 text-[var(--text)] placeholder:text-[var(--muted)] transition-all";

  return (
    <div className="rounded-3xl border border-black/10 bg-black/5 p-6 sm:p-8">
      <p className="text-sm text-[var(--muted)] mb-4">
        Vyplňte poptávku – odpovím obvykle do 24 hodin.
      </p>
      <form
        action="https://formspree.io/f/mqalwaby"
        method="POST"
        encType="multipart/form-data"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Honeypot */}
        <input type="text" name="_gotcha" className="hidden" aria-hidden="true" />

        <div className="flex flex-col gap-2">
          <label className="text-sm text-[var(--muted)]">Jméno *</label>
          <input required name="name" placeholder="Jan Novák" className={inputBase} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-[var(--muted)]">E-mail *</label>
          <input required type="email" name="email" placeholder="jan@example.com" className={inputBase} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-[var(--muted)]">Telefon</label>
          <input name="phone" placeholder="+420 777 000 000" className={inputBase} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-[var(--muted)]">Preferované doručení *</label>
          <select
            required
            name="delivery"
            className={inputBase}
          >
            <option value="">-- Vyberte --</option>
            <option value="Zásilkovna">Zásilkovna</option>
            <option value="DPD">DPD</option>
            <option value="PPL">PPL</option>
            <option value="Osobní odběr">Osobní odběr</option>
          </select>
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-sm text-[var(--muted)]">Popis zakázky *</label>
          <textarea
            required
            name="message"
            rows={6}
            placeholder="Krátce popište, co chcete vyrobit (rozměr, materiál – bříza/dub, množství)…"
            className={textAreaBase}
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-sm text-[var(--muted)]">Příloha (náčrt, logo)</label>
          <input
            name="attachment"
            type="file"
            accept="image/*,.pdf,.ai,.svg"
            className={inputBase + " file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border-0 file:bg-black/10 file:text-[var(--text)]"}
          />
        </div>

        <div className="md:col-span-2 flex items-start justify-between gap-4 mt-2">
          <div className="text-xs text-[var(--muted)]">
            Odesláním souhlasíte se zpracováním údajů za účelem vyřízení poptávky.
          </div>
          <button className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-medium text-white transition-all shadow-lg hover:shadow-xl active:scale-[.98] bg-gradient-to-br from-[var(--accent-3)] to-[var(--accent-2)]">
            Odeslat poptávku <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};


const Footer = () => (
  <footer className="mt-20 border-t border-black/10 dark:border-white/10">
    <Container className="py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--muted)]">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Gravírlab – logo" className="h-9 w-9 object-contain rounded-full" />
          <span>© {new Date().getFullYear()} Gravírlab. Všechna práva vyhrazena.</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#contact" className="hover:text-[var(--text)]">Kontakt</a>
          <a href="#top" className="hover:text-[var(--text)]">Nahoru</a>
          <a href="https://www.facebook.com/profile.php?id=61572591066011" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[var(--text)]">
            <Facebook className="h-4 w-4" /> Facebook
          </a>
          <a href="https://www.instagram.com/gravirlab/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[var(--text)]">
            <Instagram className="h-4 w-4" /> Instagram
          </a>
        </div>
      </div>
    </Container>
  </footer>
);

export default function App() {
  return (
    <div className=" min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <PaletteStyles />
      <head>
        <title>Gravírlab – Gravírování z překližky</title>
        <meta name="description" content="Zakázkové laserové gravírování z dřevěné překližky – kusovky i malé série. Návrh motivu a konzultace zdarma." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <Nav />
      <Hero />

      <Section id="services" eyebrow="Služby" title="Specialista na překližku" subtitle="Zakázkové gravírování z dřevěné překližky – kusovky i malé série.">
        <div className=" grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <ServiceCard icon={Hammer} title="Gravírování překližky" desc="Přesná kresba na březové/dubové překližce. Cedulky, jmenovky, dárky, dekorace." />
          <ServiceCard icon={Palette} title="Návrh motivu" desc="Podklady připravím nebo upravím (SVG, PDF, AI, PNG nebo JPG). Náhled před výrobou zdarma." />
          <ServiceCard icon={Ruler} title="Kusová výroba i série" desc="Od jednoho kusu po malé série. Stabilní kvalita a opakovatelnost." />
          <ServiceCard icon={Shield} title="Povrchová úprava" desc="Na přání jemné broušení a olej/vosk pro delší životnost." />
          <ServiceCard icon={Clock} title="Standardní termíny" desc="Dodání dle domluvy a složitosti – bez expresních příplatků." />
        </div>
      </Section>

      <PortfolioSection id="portfolio" eyebrow="Portfolio" title="Ukázky realizací" subtitle=" Ukázka reálných zakázek a vzorků.">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[
          { src: pf1, label: "Magnetky – gravura do překližky" },
          { src: pf2, label: "Podtácky - různé velikosti" },
        ].map((item, i) => (
          <PortfolioItem key={i} src={item.src} label={item.label} />
        ))}
      </div>
    </PortfolioSection>

      <Section id="process" eyebrow="Jak to probíhá" title="Jednoduchý 4-krokový postup">
  <div className="grid md:grid-cols-4 gap-5">
    {[
      { title: "Poptávka", desc: "Popište představu, rozměry a množství." },
      { title: "Návrh a kalkulace", desc: "Pošlu vizualizaci a cenu ke schválení." },
      { title: "Výroba", desc: "Jakmile je platba potvrzena, laser se pouští do práce." },
      { title: "Předání", desc: "Zasílám přes Zásilkovnu, PPL nebo DPD. Po domluvě je možný i osobní odběr." },
    ].map((s, i) => (
      <div
        key={i}
        className="rounded-2xl border border-gray-400 dark:border-gray-600 bg-black/5 dark:bg-white/5 p-6"
      >
        <div className="h-8 w-8 rounded-lg bg-[var(--panel)] grid place-items-center mb-3">
          <span className="text-sm font-semibold text-[var(--accent-1)]">{i + 1}</span>
        </div>
        <div className="text-[var(--text)] font-semibold">{s.title}</div>
        <div className="text-sm text-[var(--muted)] mt-1">{s.desc}</div>
      </div>
    ))}
  </div>
</Section>




      <Section id="about" eyebrow="O nás" title="Poctivé řemeslo, moderní technologie" subtitle="Malé studio s důrazem na osobní přístup a detail.">
        <div className="max-w-3xl mx-auto text-center">
          <ul className="space-y-3 text-[var(--muted)]">
            <li className="flex gap-3 justify-center"><CheckCircle2 className="h-5 w-5 text-[var(--success)] mt-0.5" /> Specializuji se na gravírování do překližky – bříza, dub, buk a topol.</li>
            <li className="flex gap-3 justify-center"><CheckCircle2 className="h-5 w-5 text-[var(--success)] mt-0.5" /> Osobní přístup a pečlivé doladění detailů.</li>
            <li className="flex gap-3 justify-center"><CheckCircle2 className="h-5 w-5 text-[var(--success)] mt-0.5" /> Náhled před výrobou a možnost personalizace.</li>
          </ul>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            <div className="inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"><Mail className="h-4 w-4" /> gravirlab@gmail.com</div>
          </div>
        </div>
      </Section>

      <Section id="contact" eyebrow="Kontakt" title="Nezávazná poptávka & konzultace">
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2"><ContactForm /></div>
          <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-[var(--text)]">Rychlé informace</h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
              <li className="flex gap-3"><Clock className="h-4 w-4 text-[var(--accent-1)] mt-0.5" /> Dodání obvykle 3–7 pracovních dnů.</li>
              <li className="flex gap-3"><Palette className="h-4 w-4 text-[var(--accent-1)] mt-0.5" /> Podklady: SVG, PDF, AI, PNG (300 dpi+).</li>
              <li className="flex gap-3"><Ruler className="h-4 w-4 text-[var(--accent-1)] mt-0.5" /> Maximální rozměr jedné věci je max 295x195mm.</li>
            </ul>
            <div className="mt-6">
            </div>
          </div>
        </div>
      </Section>

      <Footer />
      <StickySocials />
    </div>
  );
}
