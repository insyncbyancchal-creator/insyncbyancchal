"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import styles from "./ContactExperience.module.css";

/* ------------------------------------------------------------------ */
/* EDIT THESE: single source of truth for studio details              */
/* ------------------------------------------------------------------ */
const STUDIO = {
  name: "INSYNC INTERIORS",
  subName: "by Ancchal",
  addressLines: [
    "INSYNC INTERIORS",
    "SCF - 1, Third Floor, I Block Market,",
    "Sarabha Nagar (Opp. Nav Durga Mata Mandir),",
    "Ludhiana – 141001",
  ],
  mapQuery: "INSYNC INTERIORS, SCF - 1, Third Floor, I Block Market, Sarabha Nagar (Opp. Nav Durga Mata Mandir), Ludhiana 141001",
  hours: "Monday – Saturday · 10:00 AM – 6:00 PM",
  phone: "+91 98774 17531",
  phoneHref: "+919877417531",
  whatsapp: "919877417531",
  email: "hello@insyncinteriors.com",
  instagram: "https://www.instagram.com/insync_byancchal/",
};

const PROJECT_TYPES = [
  "Residential Interiors",
  "Commercial Space",
  "Architectural Design",
  "Procurement",
  "Delivery & Installation",
  "Insync Home (décor)",
];

const BUDGETS = ["Under ₹25L", "₹25L – 50L", "₹50L – 1Cr", "₹1Cr +", "Not sure yet"];
const TIMELINES = ["Immediately", "1 – 3 months", "3 – 6 months", "Just exploring"];
const CALL_SLOTS = ["Morning", "Afternoon", "Evening", "WhatsApp only"];

const STEPS = [
  { key: "name", q: "First, what may we call you?", hint: "Your name" },
  { key: "types", q: "What are you dreaming of?", hint: "Choose one or more" },
  { key: "scope", q: "Tell us about the space.", hint: "Location, budget & timing" },
  { key: "message", q: "Paint us a picture.", hint: "Style, mood, references, anything" },
  { key: "reach", q: "Where shall we reply?", hint: "We respond within one working day" },
];

const GREETINGS = ["Contact", "Namaste", "Sat Sri Akal", "Hello"];

/* ------------------------------------------------------------------ */
/* Small helpers                                                      */
/* ------------------------------------------------------------------ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.in);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// Live "open now" status in Indian Standard Time, whatever the visitor's timezone
function useOpenStatus() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const calc = () => {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }).formatToParts(new Date());

      const get = (t) => parts.find((p) => p.type === t)?.value;
      const day = get("weekday");
      const mins = (parseInt(get("hour"), 10) % 24) * 60 + parseInt(get("minute"), 10);
      const open = day !== "Sun" && mins >= 600 && mins < 1080;

      setStatus(
        open
          ? { open: true, text: "Studio is open now" }
          : {
              open: false,
              text:
                day === "Sat" || day === "Sun"
                  ? "Opens Monday, 10 AM"
                  : mins < 600
                  ? "Opens today, 10 AM"
                  : "Opens tomorrow, 10 AM",
            }
      );
    };

    calc();
    const t = setInterval(calc, 60000);
    return () => clearInterval(t);
  }, []);

  return status;
}

function useISTClock() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const update = () => {
      const formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());
      setTime(formatted);
    };

    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

function Chips({ options, value, onToggle }) {
  return (
    <div className={styles.chips}>
      {options.map((o) => {
        const on = Array.isArray(value) ? value.includes(o) : value === o;
        return (
          <button
            type="button"
            key={o}
            className={`${styles.chip} ${on ? styles.chipOn : ""}`}
            onClick={() => onToggle(o)}
            aria-pressed={on}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */
export default function ContactExperience() {
  useReveal();
  const openStatus = useOpenStatus();
  const time = useISTClock();

  const [gi, setGi] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setGi((prev) => (prev + 1) % GREETINGS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [mapLive, setMapLive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const startedAt = useRef(null);
  const cardRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Open modal if URL query param indicates enquiry intent
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("enquire") || params.get("service") || params.get("open")) {
        setIsModalOpen(true);
        if (params.get("service")) {
          const serv = params.get("service");
          setData((d) => ({
            ...d,
            types: d.types.includes(serv) ? d.types : [...d.types, serv],
          }));
        }
        if (params.get("note")) {
          setData((d) => ({
            ...d,
            message: params.get("note"),
          }));
        }
      }
    }
  }, []);

  // Lock background scrolling while modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const [data, setData] = useState({
    name: "",
    types: [],
    location: "",
    budget: "",
    timeline: "",
    message: "",
    email: "",
    phone: "",
    slot: "",
    company: "", // honeypot
  });

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const toggleType = (t) =>
    set(
      "types",
      data.types.includes(t) ? data.types.filter((x) => x !== t) : [...data.types, t]
    );

  const validate = () => {
    if (step === 0 && data.name.trim().length < 2) return "Please tell us your name.";
    if (step === 1 && data.types.length === 0) return "Pick at least one service.";
    if (step === 4) {
      if (!/^\S+@\S+\.\S+$/.test(data.email)) return "Please enter a valid email.";
      if (data.phone && data.phone.replace(/\D/g, "").length < 8)
        return "That phone number looks short.";
    }
    return "";
  };

  const next = () => {
    const err = validate();
    if (err) return setErrorMsg(err);
    setErrorMsg("");
    if (step < STEPS.length - 1) {
      setDir(1);
      setStep(step + 1);
    } else submit();
  };

  const back = () => {
    setErrorMsg("");
    setDir(-1);
    setStep(Math.max(0, step - 1));
  };

  const submit = async () => {
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, elapsed: Date.now() - startedAt.current }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Failed");
      setState("done");
    } catch (e) {
      setState("error");
      setErrorMsg("Something went wrong. Please try again or WhatsApp us directly.");
    }
  };

  // Enter advances (but never inside the textarea)
  const onKeyDown = (e) => {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA" && state !== "sending") {
      e.preventDefault();
      next();
    }
  };

  // Cursor-follow gold glow on the form card
  const onMove = (e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    cardRef.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    cardRef.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  // Magnetic button
  const magnet = (e) => {
    const b = btnRef.current;
    if (!b) return;
    const r = b.getBoundingClientRect();
    b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${
      (e.clientY - r.top - r.height / 2) * 0.28
    }px)`;
  };

  const unmagnet = () => btnRef.current && (btnRef.current.style.transform = "");

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${STUDIO.name}, ${STUDIO.addressLines.join(" ")}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const mapSrc = useMemo(
    () => `https://maps.google.com/maps?q=${encodeURIComponent(STUDIO.mapQuery)}&z=16&output=embed`,
    []
  );

  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(STUDIO.mapQuery)}`;
  const progress = state === "done" ? 100 : ((step + 1) / STEPS.length) * 100;
  const cur = STEPS[step];

  return (
    <main
      className={styles.root}
      style={{
        fontFamily: "'Bodoni Moda', serif",
        "--sans": "'Montserrat', sans-serif",
      }}
    >
      {/* ---------- HERO ---------- */}
      <section className={styles.hero}>
        <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8 lg:gap-12">
          {/* Left Hero Content: Greeting, Headline, Lede & Status Clock */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 min-w-0 max-w-4xl"
          >
            <p className={styles.eyebrow} aria-label="Contact">
              <span key={gi} className={styles.greet}>
                {GREETINGS[gi]}
              </span>
            </p>
            <h1 className={styles.title}>
              <span className={styles.line}>
                <span style={{ "--d": "0s" }}>
                  LET’S BEGIN <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059]">a quiet</span> CONVERSATION.
                </span>
              </span>
            </h1>
            <p className={`${styles.lede} ${styles.sans}`}>
              Tell us about the space you imagine. We&rsquo;ll listen first, then design.
            </p>
            {time && (
              <p className={`${styles.clock} ${styles.sans}`}>Ludhiana · {time} IST</p>
            )}
          </motion.div>

          {/* Right Hero Content: Elegant ENQUIRE NOW Button in the open space */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start md:items-end justify-end pb-2 md:pr-4 lg:pr-8"
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex items-center justify-center gap-3.5 px-9 py-4 sm:px-11 sm:py-4.5 bg-[#1A1A1A] text-[#FBF9F6] rounded-none border border-[#C5A059]/50 hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#1A1A1A] hover:-translate-y-0.5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_8px_24px_rgba(27,26,23,0.12)] hover:shadow-[0_14px_40px_rgba(197,160,89,0.38)] active:scale-98 cursor-pointer"
              aria-label="Open project enquiry form"
            >
              <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.28em] font-semibold transition-colors duration-300">
                ENQUIRE NOW
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#C5A059] group-hover:text-[#1A1A1A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </button>
            <p className="mt-3 text-[14px] font-serif italic text-[#4A463F] tracking-[0.03em] text-left md:text-right">
              Begin your bespoke architectural commission
            </p>
          </motion.div>
        </div>

        <span className={styles.scrollCue} aria-hidden="true" />
      </section>

      {/* ---------- HORIZONTAL STUDIO DETAILS ---------- */}
      <section
        className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-2 pb-16 sm:pb-24 text-[#1B1A17]"
      >
        {/* Top Header Row with Studio Title, Live Status Badge, and Hairline Rule */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#C5A059]/30"
        >
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#C5A059] font-normal tracking-[0.06em]">
              {STUDIO.name}
            </h2>
            {openStatus && (
              <p className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-[#555048] font-medium mt-2">
                <span className={`w-2 h-2 rounded-full ${openStatus.open ? 'bg-[#5f9b6b] animate-pulse shadow-[0_0_8px_rgba(95,155,107,0.6)]' : 'bg-[#C5A059]'}`} />
                {openStatus.text}
              </p>
            )}
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[12.5px] font-sans uppercase tracking-[0.22em] text-[#555048] font-semibold block">
              SARABHA NAGAR &bull; LUDHIANA
            </span>
            <span className="text-[14px] font-serif italic text-[#B58D44] block mt-1">
              Architecture &bull; Interiors &bull; Insync Home
            </span>
          </div>
        </motion.div>

        {/* 3 Horizontal Columns Directly on Background (Seamless Editorial Luxury Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-16 mt-10 sm:mt-12">
          
          {/* 1. VISIT */}
          <motion.div
            initial={{ opacity: 0, y: 35, x: -20 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#C5A059]/20">
                <span className="text-xs font-sans uppercase tracking-[0.22em] text-[#C5A059] font-semibold">
                  01 / ATELIER
                </span>
                <span className="text-xs font-serif italic text-[#555048]">Punjab</span>
              </div>
              <h3 className="text-xs font-sans uppercase tracking-[0.24em] font-semibold text-[#1A1A1A] mb-3">
                VISIT
              </h3>
              <address className="not-italic text-[15px] text-[#3E3A34] leading-[1.85] font-normal font-sans">
                {STUDIO.addressLines.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </address>
            </div>

            <div className="flex items-center gap-5 pt-5 mt-5 border-t border-[#C5A059]/15 text-xs font-sans uppercase tracking-[0.2em] font-semibold">
              <a
                href={directions}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C5A059] hover:text-[#1A1A1A] transition-colors"
              >
                Get directions ↗
              </a>
              <button
                type="button"
                onClick={copyAddress}
                className="text-[#C5A059] hover:text-[#1A1A1A] transition-colors cursor-pointer"
              >
                {copied ? "Copied ✓" : "Copy address"}
              </button>
            </div>
          </motion.div>

          {/* 2. HOURS */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#C5A059]/20">
                <span className="text-xs font-sans uppercase tracking-[0.22em] text-[#C5A059] font-semibold">
                  02 / SCHEDULE
                </span>
                <span className="text-xs font-serif italic text-[#555048]">IST</span>
              </div>
              <h3 className="text-xs font-sans uppercase tracking-[0.24em] font-semibold text-[#1A1A1A] mb-3">
                HOURS
              </h3>
              <div className="space-y-2 text-[15px] text-[#3E3A34] font-sans leading-[1.75]">
                <p className="font-medium text-[#1A1A1A]">
                  Monday – Saturday
                </p>
                <p className="text-[#6B665E]">
                  10:00 AM – 6:00 PM IST
                </p>
                <p className="text-[13px] text-[#555048] pt-1">
                  Sunday: Studio Closed
                </p>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-[#C5A059]/15">
              <p className="text-sm text-[#555048] italic font-serif leading-relaxed">
                Private architectural and design consultations by appointment.
              </p>
            </div>
          </motion.div>

          {/* 3. REACH US */}
          <motion.div
            initial={{ opacity: 0, y: 35, x: 20 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#C5A059]/20">
                <span className="text-xs font-sans uppercase tracking-[0.22em] text-[#C5A059] font-semibold">
                  03 / CONNECT
                </span>
                <span className="text-xs font-serif italic text-[#555048]">Direct</span>
              </div>
              <h3 className="text-xs font-sans uppercase tracking-[0.24em] font-semibold text-[#1A1A1A] mb-3">
                REACH US
              </h3>
              <div className="space-y-2 text-[15px] text-[#3E3A34] font-sans">
                <p>
                  <a href={`tel:${STUDIO.phoneHref}`} className="hover:text-[#C5A059] transition-colors">
                    {STUDIO.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${STUDIO.email}`} className="hover:text-[#C5A059] transition-colors">
                    {STUDIO.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 pt-5 mt-5 border-t border-[#C5A059]/15 text-xs font-sans uppercase tracking-[0.2em] font-semibold">
              <a
                href={`https://wa.me/${STUDIO.whatsapp}?text=${encodeURIComponent(
                  "Hello Insync, I'd like to discuss a project."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C5A059] hover:text-[#1A1A1A] transition-colors"
              >
                WhatsApp ↗
              </a>
              <a
                href={STUDIO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C5A059] hover:text-[#1A1A1A] transition-colors"
              >
                Instagram ↗
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ---------- BEAUTIFUL BLURRED POPUP MODAL BOX ---------- */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Project Consultation Form"
          >
            {/* Blurred Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="fixed inset-0 bg-black/65 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Small Beautiful Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[580px] bg-white rounded-2xl sm:rounded-3xl border border-[#C5A059]/35 shadow-[0_25px_70px_rgba(0,0,0,0.4),0_0_0_1px_rgba(197,160,89,0.2)] overflow-hidden my-auto z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Hairline Progress Bar */}
              <div className={styles.progress} aria-hidden="true">
                <span style={{ width: `${progress}%` }} />
              </div>

              {/* Modal Top Header Bar with Close Button */}
              <div className="flex items-center justify-between px-6 sm:px-8 pt-5 pb-3 border-b border-[#C5A059]/15">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  <span className="text-[10px] font-sans uppercase tracking-[0.24em] text-[#C5A059] font-semibold">
                    INSYNC BY ANCCHAL · ENQUIRY
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-none flex items-center justify-center text-[#6B665E] hover:text-[#1A1A1A] hover:bg-[#F3EFE6] border border-transparent hover:border-[#C5A059]/30 transition-colors cursor-pointer"
                  aria-label="Close enquiry modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Form Body */}
              <div className="p-6 sm:p-8 md:p-9 max-h-[80vh] overflow-y-auto">
                {state === "done" ? (
                  <div className={styles.done}>
                    <svg viewBox="0 0 52 52" className={styles.tick} aria-hidden="true">
                      <circle cx="26" cy="26" r="24" />
                      <path d="M15 27l8 8 14-16" />
                    </svg>
                    <h2>Thank you, {data.name.split(" ")[0]}.</h2>
                    <p className={styles.sans}>
                      Your enquiry has reached our studio. A confirmation is on its way to{" "}
                      <b>{data.email}</b>. We&rsquo;ll be in touch within one working day.
                    </p>
                    <div className="mt-6 flex justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setIsModalOpen(false);
                          setState("idle");
                          setStep(0);
                        }}
                        className="px-8 py-3 bg-[#1A1A1A] text-white rounded-none text-xs uppercase tracking-[0.24em] font-semibold hover:bg-[#C5A059] hover:text-[#1A1A1A] border border-[#C5A059]/50 transition-colors cursor-pointer"
                      >
                        CLOSE
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onKeyDown={onKeyDown} onSubmit={(e) => e.preventDefault()} noValidate>
                    <div className={`${styles.stepHead} ${styles.sans}`}>
                      <span>
                        {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
                      </span>
                      <span>{cur.hint}</span>
                    </div>

                    {/* step body with question and inputs */}
                    <div key={step} className={`${styles.stepBody} ${dir > 0 ? styles.fromR : styles.fromL}`}>
                      <h2 className={styles.q}>{cur.q}</h2>

                      {step === 0 && (
                        <input
                          autoFocus
                          className={`${styles.field} ${styles.big}`}
                          placeholder="Full name"
                          value={data.name}
                          onChange={(e) => set("name", e.target.value)}
                          autoComplete="name"
                        />
                      )}

                      {step === 1 && <Chips options={PROJECT_TYPES} value={data.types} onToggle={toggleType} />}

                      {step === 2 && (
                        <div className={styles.stack}>
                          <input
                            className={styles.field}
                            placeholder="City / location of the project"
                            value={data.location}
                            onChange={(e) => set("location", e.target.value)}
                          />
                          <p className={`${styles.label} ${styles.sans}`}>Approximate budget</p>
                          <Chips
                            options={BUDGETS}
                            value={data.budget}
                            onToggle={(o) => set("budget", data.budget === o ? "" : o)}
                          />
                          <p className={`${styles.label} ${styles.sans}`}>Timeline</p>
                          <Chips
                            options={TIMELINES}
                            value={data.timeline}
                            onToggle={(o) => set("timeline", data.timeline === o ? "" : o)}
                          />
                        </div>
                      )}

                      {step === 3 && (
                        <textarea
                          autoFocus
                          rows={4}
                          className={`${styles.field} ${styles.area}`}
                          placeholder="A calm, warm 3BHK with lots of natural wood…"
                          value={data.message}
                          onChange={(e) => set("message", e.target.value)}
                          maxLength={2000}
                        />
                      )}

                      {step === 4 && (
                        <div className={styles.stack}>
                          <input
                            autoFocus
                            type="email"
                            className={styles.field}
                            placeholder="Email address"
                            value={data.email}
                            onChange={(e) => set("email", e.target.value)}
                            autoComplete="email"
                          />
                          <input
                            type="tel"
                            className={styles.field}
                            placeholder="Phone (optional)"
                            value={data.phone}
                            onChange={(e) => set("phone", e.target.value)}
                            autoComplete="tel"
                          />
                          <p className={`${styles.label} ${styles.sans}`}>Best time to reach you</p>
                          <Chips
                            options={CALL_SLOTS}
                            value={data.slot}
                            onToggle={(o) => set("slot", data.slot === o ? "" : o)}
                          />
                          {/* honeypot */}
                          <input
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                            className={styles.hp}
                            value={data.company}
                            onChange={(e) => set("company", e.target.value)}
                            name="company"
                          />
                        </div>
                      )}
                    </div>

                    <p className={`${styles.err} ${styles.sans}`} role="alert">
                      {errorMsg}
                    </p>

                    <div className={`${styles.nav} ${styles.sans}`}>
                      <button
                        type="button"
                        className={styles.back}
                        onClick={back}
                        disabled={step === 0 || state === "sending"}
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        ref={btnRef}
                        className={styles.next}
                        onClick={next}
                        onMouseMove={magnet}
                        onMouseLeave={unmagnet}
                        disabled={state === "sending"}
                      >
                        <span>
                          {state === "sending"
                            ? "Sending…"
                            : step === STEPS.length - 1
                            ? "Send enquiry"
                            : "Continue"}
                        </span>
                        <i aria-hidden="true">→</i>
                      </button>
                    </div>

                    <p className={`${styles.keyhint} ${styles.sans}`}>
                      press <kbd>Enter ↵</kbd>
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ---------- MAP ---------- */}
      <section className={styles.mapSection}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#C5A059]/25"
        >
          {/* Left: Eyebrow Tag + Gold Accent Line */}
          <div className="flex flex-col items-start pb-1">
            <span className="text-xs sm:text-[13px] font-sans uppercase tracking-[0.28em] text-[#C5A059] font-semibold block">
              FIND THE ATELIER
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-[1.5px] bg-[#C5A059] mt-2.5 origin-left"
            />
          </div>

          {/* Right: Atelier City Headline */}
          <div className="flex flex-col sm:items-end text-left sm:text-right">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-light leading-tight">
              SARABHA NAGAR, <span className="montecarlo-regular italic lowercase font-normal text-[#C5A059] text-[1.15em]">Ludhiana</span>
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className={`${styles.mapFrame} ${mapLive ? styles.mapLive : ""}`}
          onMouseLeave={() => setMapLive(false)}
        >
          <iframe
            title="Insync by Ancchal on Google Maps"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          {/* Overlay stops the page-scroll hijack. Click once to interact with the map. */}
          {!mapLive && (
            <button
              type="button"
              className={`${styles.mapShield} ${styles.sans}`}
              onClick={() => setMapLive(true)}
            >
              <span>Click to explore the map</span>
            </button>
          )}
          <div className={`${styles.pin} ${styles.sans}`}>
            <strong>INSYNC INTERIORS</strong>
            <span>SCF - 1, Third Floor, I Block Market, Sarabha Nagar</span>
            <span className="text-[11px] text-[#7A746B]">(Opp. Nav Durga Mata Mandir), Ludhiana 141001</span>
            <a href={directions} target="_blank" rel="noopener noreferrer">
              Directions ↗
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
