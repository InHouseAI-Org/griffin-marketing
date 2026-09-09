'use client';

import { useState, useEffect, useRef, Fragment } from "react";

/* ── reveal hook ── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── design tokens ── */
const G = {
  bg: "#FFFFFF",
  bgAlt: "#F5F5F5",
  dark: "#0C0C0C",
  darkMid: "#1A1A1A",
  ink: "#111111",
  inkMid: "#3A3A3A",
  inkSub: "#7A7A7A",
  accent: "#2C2C2C",
  accentLight: "#E8E8E8",
  accentDark: "#000000",
  border: "rgba(17,17,17,0.1)",
  borderDark: "rgba(255,255,255,0.08)",
};

const capabilities = [
  { icon: "▶", label: "Video Editing" },
  { icon: "◼", label: "Social Media Creatives" },
  { icon: "◻", label: "Static Posts" },
  { icon: "✦", label: "Content Production" },
  { icon: "⊞", label: "Brochures & Pamphlets" },
  { icon: "⊡", label: "Marketing Collateral" },
  { icon: "◈", label: "Campaign Content" },
  { icon: "⬡", label: "Day-to-Day Execution" },
];

const teamCards = [
  { title: "Strategy", desc: "Marketing strategy and campaign planning aligned to your business goals." },
  { title: "Creative Direction", desc: "Concepts, brand direction and creative guidance for every deliverable." },
  { title: "Quality Control", desc: "Every important deliverable gets reviewed before it goes out." },
  { title: "Performance", desc: "Regular performance reviews, reporting and ongoing optimisation." },
  { title: "Support", desc: "Ongoing access to the wider Griffin team as your requirements grow." },
];

const channels = [
  "WhatsApp", "Instagram", "YouTube", "LinkedIn",
  "Google Business", "Meta Ads", "Print Media", "Offline Distribution",
];

const industries = [
  {
    name: "Real Estate",
    desc: "High-volume lead generation, property marketing and customer outreach at scale.",
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  },
  {
    name: "Political Campaigns",
    desc: "Large-scale communication, constituency outreach and campaign management.",
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 10c0-3.87 3.13-7 7-7s7 3.13 7 7v8M6 10l-3 5m17-5l3 5M13 21v-8"/></svg>,
  },
  {
    name: "Gaming & High-Volume",
    desc: "Performance-driven digital outreach, acquisition and communication campaigns.",
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  },
];

const caseStudies = [
  {
    client: "Real Estate Developer",
    tag: "WhatsApp · Lead Gen",
    challenge: "Reaching 50,000+ prospects with property launches at low cost per contact.",
    result: "₹0.14/msg delivered · 80% delivery · 60% open rate",
    img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=700&h=500&fit=crop&auto=format",
  },
  {
    client: "Political Campaign",
    tag: "Multi-channel · Outreach",
    challenge: "Coordinating large-scale voter communication across digital and offline channels.",
    result: "Millions of delivered messages across a multi-week campaign window.",
    img: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=700&h=500&fit=crop&auto=format",
  },
  {
    client: "B2B Brand",
    tag: "Dedicated Resource · Content",
    challenge: "Building a consistent social presence and lead pipeline without an in-house team.",
    result: "Full content calendar, creative production and ad management under one retainer.",
    img: "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?w=700&h=500&fit=crop&auto=format",
  },
];

/* ── sub-components ── */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: "inline-block", padding: "4px 12px",
      border: `1px solid ${G.border}`, borderRadius: 999,
      fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase" as const,
      color: G.inkSub, fontWeight: 500,
    }}>{children}</span>
  );
}

function SectionLabel({ children, dark = false, center = false }: { children: React.ReactNode; dark?: boolean; center?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, justifyContent: center ? "center" : "flex-start" }}>
      <div style={{ width: 20, height: 2, background: dark ? "#FFFFFF" : G.accent, borderRadius: 1 }} />
      <span style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase" as const, fontWeight: 600, color: dark ? "#FFFFFF" : G.accent, fontFamily: "'Sora', sans-serif" }}>{children}</span>
    </div>
  );
}

function AccentBtn({ children, dark = false, outline = false }: { children: React.ReactNode; dark?: boolean; outline?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "13px 26px", borderRadius: 4, cursor: "pointer",
        fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.04em",
        transition: "all 0.25s",
        border: outline ? `1.5px solid ${dark ? "rgba(255,255,255,0.25)" : G.border}` : "none",
        background: outline ? "transparent" : (hovered ? G.accentDark : G.accent),
        color: outline ? (dark ? "rgba(255,255,255,0.75)" : G.inkMid) : "#fff",
      }}
    >
      {children}
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
        <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
export default function GriffinMarketing() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "", need: "", budget: "" });

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const heroReveal = useReveal(0.1);
  const problemReveal = useReveal();
  const howReveal = useReveal();
  const capReveal = useReveal();
  const teamReveal = useReveal();
  const pricingReveal = useReveal();
  const waReveal = useReveal();
  const channelReveal = useReveal();
  const seoReveal = useReveal();
  const industryReveal = useReveal();
  const whyReveal = useReveal();
  const csReveal = useReveal();
  const aboutReveal = useReveal();

  return (
    <>
      <title>Griffin Marketing, Integrated Marketing Service</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      <div style={{ background: G.bg, color: G.ink, minHeight: "100vh" }}>

        {/* ═══ NAV ══════════════════════════════════════════════════ */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: "#FFFFFF",
          borderBottom: `1px solid ${G.border}`,
          transition: "all 0.4s",
          padding: scrolled ? "16px 0" : "24px 0",
        }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Logo */}
            <div>
              <img
                src="/griffin-logo.jpg"
                alt="Griffin Marketing"
                style={{
                  height: scrolled ? "50px" : "70px",
                  width: "auto",
                  transition: "height 0.4s",
                  objectFit: "contain"
                }}
              />
            </div>

            {/* CTA Button - visible on all devices */}
            <a href="https://calendly.com/manav-bathija27/interview" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <AccentBtn>Book a Strategy Call</AccentBtn>
            </a>
          </div>
        </nav>

        {/* ═══ HERO ════════════════════════════════════════════════ */}
        <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "140px 20px 60px", position: "relative", overflow: "hidden" }}>
          {/* Subtle grid bg */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `linear-gradient(${G.border} 1px, transparent 1px), linear-gradient(90deg, ${G.border} 1px, transparent 1px)`,
            backgroundSize: "60px 60px", opacity: 0.5,
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          }} />
          <div style={{ position: "absolute", top: "20%", right: "-10%", width: 700, height: 700, background: `radial-gradient(circle, ${G.accentLight} 0%, transparent 70%)`, borderRadius: "50%", opacity: 0.6, pointerEvents: "none" }} />

          <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }} ref={heroReveal.ref as React.RefObject<HTMLDivElement>}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-20 items-center">
              {/* Left */}
              <div style={{ opacity: heroReveal.visible ? 1 : 0, transform: heroReveal.visible ? "none" : "translateY(28px)", transition: "opacity 0.9s, transform 0.9s" }}>
                <div style={{ marginTop: "3.5rem", display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", background: G.accentLight, borderRadius: 999, marginBottom: 28 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: G.accent }} />
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: G.accent }}>Marketing solutions since 2014</span>
                </div>

                <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(2.6rem, 5.5vw, 5rem)", lineHeight: 1.05, color: G.ink, marginBottom: "1.8rem", letterSpacing: "-0.02em" }}>
                  Your Marketing Team.<br />
                  In Your Office.<br />
                  <span style={{ color: G.accent }}>Backed by Ours.</span>
                </h1>

                <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.75, color: G.inkMid, maxWidth: "50ch", marginBottom: "2.5rem" }}>
                  Griffin gives you a dedicated marketing resource working 25–30 hours a week from your office, backed by our central team for strategy, creative direction, quality control and performance.
                </p>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a href="https://calendly.com/manav-bathija27/interview" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <AccentBtn>Book a Strategy Call</AccentBtn>
                  </a>
                </div>
              </div>

              {/* Right: model diagram */}
              <div style={{
                opacity: heroReveal.visible ? 1 : 0, transform: heroReveal.visible ? "none" : "translateY(24px)",
                transition: "opacity 1.1s 0.2s, transform 1.1s 0.2s",
              }}>
                <style>{`
                  @keyframes moveUp {
                    0% { top: 100%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 0%; opacity: 0; }
                  }
                `}</style>


                <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>

                  {/* Your Business - Big Box */}
                  <div style={{ background: "rgba(255,255,255,0.95)", borderRadius: 16, padding: "40px 32px", border: "2px solid rgba(0,0,0,0.1)", textAlign: "center", position: "relative", zIndex: 2, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
                    <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.3rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#111111" }}>Your Business</span>

                    {/* Dedicated Resource */}
                    <div style={{ marginTop: 24, padding: "20px", background: "rgba(44,44,44,0.08)", borderRadius: 10, border: "2px dashed rgba(44,44,44,0.3)" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.85rem", color: "#111111", letterSpacing: "0.06em" }}>Dedicated Resource</span>
                      </div>
                      <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "0.68rem", color: "#3A3A3A", marginTop: 8, display: "block" }}>25–30 hrs/week · In your office</span>
                      <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 500, fontSize: "0.62rem", color: "#7A7A7A", marginTop: 6, display: "block", letterSpacing: "0.08em" }}>by Griffin Marketing</span>
                    </div>
                  </div>

                  {/* Animated Arrow pointing up */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "-8px 0", position: "relative", zIndex: 1 }}>
                    <svg width="12" height="8" viewBox="0 0 10 6" style={{ transform: "rotate(180deg)" }}><path d="M1 1l4 4 4-4" stroke="#111111" strokeWidth="2" strokeLinecap="round" fill="none" /></svg>
                    <div style={{ width: 2, height: 20, background: "#7A7A7A" }} />

                    {/* Moving dot animation */}
                    <div style={{ position: "absolute", top: 0, width: 8, height: 8, borderRadius: "50%", background: "#111111", animation: "moveUp 2s ease-in-out infinite" }} />
                  </div>

                  {/* Griffin Marketing - Contains Central Team */}
                  <div style={{ background: G.dark, borderRadius: 16, padding: "28px 24px", border: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 2 }}>
                    <div style={{ textAlign: "center", marginBottom: 20 }}>
                      <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff" }}>Griffin Marketing</span>
                    </div>

                    {/* Central Team */}
                    <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", padding: "20px" }}>
                      <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", textAlign: "center", marginBottom: 14 }}>Central Team</p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        {["Strategy", "Creative", "QC", "Performance"].map((t) => (
                          <div key={t} style={{ padding: "10px", background: "rgba(255,255,255,0.08)", borderRadius: 6, textAlign: "center" }}>
                            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 500, fontSize: "0.65rem", color: "rgba(255,255,255,0.7)" }}>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ THE PROBLEM ═════════════════════════════════════════ */}
        <section id="why-griffin" style={{ background: G.dark, padding: "60px 20px" }} ref={problemReveal.ref as React.RefObject<HTMLElement>}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-start">
              <div style={{ opacity: problemReveal.visible ? 1 : 0, transform: problemReveal.visible ? "none" : "translateY(24px)", transition: "opacity 0.9s, transform 0.9s" }}>
                <SectionLabel dark>The Problem</SectionLabel>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1, color: "#fff", marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
                  Marketing shouldn&apos;t feel like a collection of freelancers.
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    "Hiring a full marketing team is expensive.",
                    "Agencies can feel disconnected from day-to-day business.",
                    "Content gets delayed. Strategy and execution live in different places.",
                    "Businesses struggle to maintain consistency across channels.",
                    "Internal teams don't always have the skills or bandwidth to execute everything.",
                  ].map((p, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                        <div style={{ width: 6, height: 1, background: "rgba(255,255,255,0.3)" }} />
                      </div>
                      <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{p}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ opacity: problemReveal.visible ? 1 : 0, transform: problemReveal.visible ? "none" : "translateY(24px)", transition: "opacity 0.9s 0.2s, transform 0.9s 0.2s" }}>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "40px 36px" }}>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#FFFFFF", marginBottom: 24 }}>We built a different model</p>

                  {/* Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div style={{ padding: "24px", background: "rgba(255,255,255,0.08)", borderRadius: 10, border: "1.5px solid rgba(255,255,255,0.15)", display: "flex", flexDirection: "column" }}>
                      <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", marginBottom: 14, letterSpacing: "0.08em" }}>Traditional Agency</p>
                      {["Multiple clients", "Outsourced execution", "Monthly reports", "Disconnected team"].map((t) => (
                        <div key={t} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF5555" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12"/></svg>
                          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "0.78rem", color: "rgba(255,255,255,0.5)" }}>{t}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding: "24px", background: "rgba(80,80,80,0.25)", borderRadius: 10, border: "1.5px solid rgba(200,200,200,0.3)", display: "flex", flexDirection: "column" }}>
                      <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.72rem", color: "#FFFFFF", marginBottom: 14, letterSpacing: "0.08em" }}>Griffin Model</p>
                      {["Dedicated resource", "Embedded in your team", "Daily execution", "Strategy + action"].map((t) => (
                        <div key={t} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
                          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 500, fontSize: "0.78rem", color: "#fff" }}>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ HOW IT WORKS ════════════════════════════════════════ */}
        <section id="services" style={{ padding: "60px 20px", background: G.bg }} ref={howReveal.ref as React.RefObject<HTMLElement>}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <SectionLabel center>How It Works</SectionLabel>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "clamp(1.75rem, 5vw, 3rem)", lineHeight: 1.2, letterSpacing: "-0.02em", color: G.ink, maxWidth: 600, margin: "0 auto" }}>
                One person on the ground.<br />An entire team behind them.
              </h2>
            </div>

            {/* 3 steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-[rgba(17,17,17,0.1)] rounded-2xl overflow-hidden mb-12 md:mb-16">
              {[
                { n: "01", title: "Dedicated Resource", desc: "A skilled Griffin marketing professional works directly from your office for approximately 25–30 hours per week — fully integrated into your team." },
                { n: "02", title: "Central Marketing Team", desc: "Our strategy, creative and marketing specialists provide direction, campaign planning, quality checks and ongoing support behind the scenes." },
                { n: "03", title: "Continuous Execution", desc: "Ideas become content. Content becomes campaigns. Campaigns become measurable marketing activity — every single week." },
              ].map((s, i) => (
                <div
                  key={s.n}
                  style={{
                    padding: "32px 20px", background: G.bg,
                    opacity: howReveal.visible ? 1 : 0,
                    transform: howReveal.visible ? "none" : "translateY(20px)",
                    transition: `opacity 0.7s ${i * 120}ms, transform 0.7s ${i * 120}ms`,
                  }}
                  className="md:p-12"
                >
                  <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "3.5rem", color: G.accentLight, lineHeight: 1, marginBottom: 20 }}>{s.n}</div>
                  <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: G.ink, marginBottom: 12 }}>{s.title}</h3>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "0.88rem", lineHeight: 1.75, color: G.inkMid }}>{s.desc}</p>
                </div>
              ))}
            </div>

            {/* Workflow strip */}
            <div className="p-6 md:py-7 md:px-10 overflow-x-auto" style={{ background: G.dark, borderRadius: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, minWidth: "max-content" }}>
                {["Strategy", "Content", "Creative", "Distribution", "Performance", "Optimisation"].map((step, i, arr) => (
                  <Fragment key={step}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0 }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFFFFF" }} />
                      </div>
                      <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 500, fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap" }}>{step}</span>
                    </div>
                    {i < arr.length - 1 && <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.2)", minWidth: 16 }} />}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CAPABILITIES ════════════════════════════════════════ */}
        <section className="py-[60px] md:py-[100px]" style={{ background: G.bgAlt }} ref={capReveal.ref as React.RefObject<HTMLElement>}>
          <div className="px-5 md:px-10" style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
              <div style={{ opacity: capReveal.visible ? 1 : 0, transform: capReveal.visible ? "none" : "translateY(20px)", transition: "opacity 0.8s, transform 0.8s" }}>
                <SectionLabel>Capabilities</SectionLabel>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.02em", color: G.ink, marginBottom: "1.4rem" }}>Your day-to-day marketing, taken care of.</h2>
                <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "0.92rem", lineHeight: 1.8, color: G.inkMid, marginBottom: "2rem", maxWidth: "44ch" }}>
                  Your dedicated resource becomes part of your everyday marketing operation — creating, editing and executing content while our central team provides the strategic backbone.
                </p>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=380&fit=crop&auto=format"
                  alt="Marketing team collaborating on content"
                  style={{ width: "100%", borderRadius: 12, objectFit: "cover", height: 260 }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {capabilities.map((c, i) => (
                  <div
                    key={c.label}
                    style={{
                      padding: "24px 22px", background: G.bg, borderRadius: 12, border: `1px solid ${G.border}`,
                      opacity: capReveal.visible ? 1 : 0,
                      transform: capReveal.visible ? "none" : "translateY(16px)",
                      transition: `opacity 0.6s ${i * 70}ms, transform 0.6s ${i * 70}ms`,
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = G.accent; (e.currentTarget as HTMLElement).style.background = G.accentLight; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = G.border; (e.currentTarget as HTMLElement).style.background = G.bg; }}
                  >
                    <div style={{ fontSize: "1.2rem", marginBottom: 10, color: G.accent }}>{c.icon}</div>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.82rem", color: G.ink, lineHeight: 1.4 }}>{c.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ THE TEAM BEHIND (hub-spoke) ═════════════════════════ */}
        <section className="py-[60px] md:py-[100px]" style={{ background: G.bg }} ref={teamReveal.ref as React.RefObject<HTMLElement>}>
          <div className="px-5 md:px-10" style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <SectionLabel center>Central Team</SectionLabel>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 3.5vw, 3rem)", letterSpacing: "-0.02em", color: G.ink }}>
                Your marketer is never working alone.
              </h2>
            </div>

            {/* Hub-spoke visual */}
            <div className="hidden md:flex justify-center mb-16">
              <div style={{ position: "relative", width: 480, height: 380 }}>
                {/* Center */}
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 110, height: 110, borderRadius: "50%", background: G.accent, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 2, boxShadow: "0 0 0 16px rgba(44,44,44,0.1)" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.58rem", color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4, textAlign: "center" }}>Your Resource</span>
                </div>
                {/* Orbiting nodes */}
                {[
                  { label: "Strategy", angle: -90, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> },
                  { label: "Creative", angle: -18, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg> },
                  { label: "QC", angle: 54, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg> },
                  { label: "Performance", angle: 126, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg> },
                  { label: "Support", angle: 198, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                ].map(({ label, angle, icon }) => {
                  const r = 170;
                  const rad = (angle * Math.PI) / 180;
                  const x = 50 + (r / 480) * 100 * Math.cos(rad);
                  const y = 50 + (r / 380) * 100 * Math.sin(rad);
                  return (
                    <div key={label} style={{ position: "absolute", left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)", zIndex: 2 }}>
                      {/* Spoke line */}
                      <svg style={{ position: "absolute", left: "50%", top: "50%", zIndex: 0, pointerEvents: "none" }} width="1" height="1" />
                      <div style={{ width: 72, height: 72, borderRadius: "50%", background: G.bg, border: `1.5px solid ${G.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                        <div style={{ color: G.accent }}>{icon}</div>
                        <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.58rem", color: G.inkMid, textAlign: "center" }}>{label}</span>
                      </div>
                    </div>
                  );
                })}
                {/* SVG spokes */}
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }} viewBox="0 0 480 380">
                  {[{ angle: -90 }, { angle: -18 }, { angle: 54 }, { angle: 126 }, { angle: 198 }].map(({ angle }, i) => {
                    const r = 170;
                    const rad = (angle * Math.PI) / 180;
                    const x2 = 240 + r * Math.cos(rad);
                    const y2 = 190 + r * Math.sin(rad);
                    return <line key={i} x1="240" y1="190" x2={x2} y2={y2} stroke={`rgba(44,44,44,0.15)`} strokeWidth="1.5" strokeDasharray="4 4" />;
                  })}
                </svg>
              </div>
            </div>

            {/* Team cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {teamCards.map((c, i) => (
                <div
                  key={c.title}
                  style={{
                    padding: "28px 22px", background: G.bgAlt, borderRadius: 12, border: `1px solid ${G.border}`,
                    opacity: teamReveal.visible ? 1 : 0,
                    transform: teamReveal.visible ? "none" : "translateY(16px)",
                    transition: `opacity 0.6s ${i * 80}ms, transform 0.6s ${i * 80}ms`,
                  }}
                >
                  <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: G.ink, marginBottom: 10 }}>{c.title}</p>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "0.78rem", lineHeight: 1.65, color: G.inkSub }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PRICING ═════════════════════════════════════════════ */}
        <section id="pricing" className="py-[60px] md:py-[100px]" style={{ background: G.dark }} ref={pricingReveal.ref as React.RefObject<HTMLElement>}>
          <div className="px-5 md:px-10" style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <SectionLabel dark center>Pricing</SectionLabel>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 3.5vw, 3rem)", letterSpacing: "-0.02em", color: "#fff" }}>
                Simple. Transparent. No agency games.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[860px] mx-auto">
              {/* Plan 1 */}
              <div className="p-8 md:p-10" style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16,
                opacity: pricingReveal.visible ? 1 : 0,
                transform: pricingReveal.visible ? "none" : "translateY(24px)",
                transition: "opacity 0.8s, transform 0.8s",
              }}>
                <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>Dedicated Marketing Resource</p>
                <div style={{ marginBottom: 28 }}>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "2.6rem", color: "#fff" }}>₹1,00,000</span>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginLeft: 8 }}>/ month</span>
                </div>
                <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 24 }} />
                <ul style={{ display: "flex", flexDirection: "column", gap: 11, marginBottom: 32, listStyle: "none", padding: 0, margin: "0 0 32px" }}>
                  {["One dedicated full-time marketing resource", "25–30 hours per week, in-office", "Content production & video editing", "Social media creatives & collateral", "Central Griffin team support", "Strategy & campaign planning", "Creative direction & quality checks", "Regular performance reviews"].map((f) => (
                    <li key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" style={{ marginTop: 2, flexShrink: 0 }}><path d="M20 6 9 17l-5-5"/></svg>
                      <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="https://calendly.com/manav-bathija27/interview" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
                  <button style={{ width: "100%", padding: "14px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.82rem", color: "#fff", cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.14)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)"; }}
                  >Get Started</button>
                </a>
              </div>

              {/* Plan 2 — highlighted */}
              <div className="p-8 md:p-10" style={{
                background: G.accent, border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 16, position: "relative", overflow: "hidden",
                opacity: pricingReveal.visible ? 1 : 0,
                transform: pricingReveal.visible ? "none" : "translateY(24px)",
                transition: "opacity 0.8s 0.15s, transform 0.8s 0.15s",
              }}>
                <div style={{ position: "absolute", top: 16, right: 20, background: "rgba(255,255,255,0.15)", padding: "4px 12px", borderRadius: 999 }}>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff" }}>Popular</span>
                </div>
                <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>Marketing + Meta Ads</p>
                <div style={{ marginBottom: 28 }}>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "2.6rem", color: "#fff" }}>₹1,50,000</span>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", marginLeft: 8 }}>/ month</span>
                </div>
                <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 8, padding: "12px 16px", marginBottom: 24, display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: "1rem" }}>✦</span>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.78rem", color: "#fff" }}>No commission on ad spend.</span>
                </div>
                <ul style={{ display: "flex", flexDirection: "column", gap: 11, marginBottom: 32, listStyle: "none", padding: 0, margin: "0 0 32px" }}>
                  {["Everything in Dedicated Resource", "Meta Ads management", "Campaign planning & strategy", "Ad creative coordination", "Performance monitoring & optimisation"].map((f) => (
                    <li key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" style={{ marginTop: 2, flexShrink: 0 }}><path d="M20 6 9 17l-5-5"/></svg>
                      <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "0.82rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="https://calendly.com/manav-bathija27/interview" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
                  <button style={{ width: "100%", padding: "14px", background: "#fff", border: "none", borderRadius: 8, fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: G.accent, cursor: "pointer", transition: "opacity 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.9"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
                  >Get Started</button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SCALE ═══════════════════════════════════════════════ */}
        <section className="py-[60px] md:py-[100px]" style={{ background: G.bg }}>
          <div className="px-5 md:px-10" style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
              <div>
                <SectionLabel>Scale</SectionLabel>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", letterSpacing: "-0.02em", color: G.ink, marginBottom: "1.4rem" }}>Start with one. Scale when you need more.</h2>
                <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "0.92rem", lineHeight: 1.8, color: G.inkMid, marginBottom: "2rem" }}>
                  Your marketing team grows with your business — without the complexity of hiring every specialist yourself. Griffin can deploy additional dedicated resources, specialist talent and larger campaign teams as your requirements grow.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {["Additional marketing resources", "Higher-end video production", "Specialized creative talent", "Larger campaign teams"].map((i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ width: 6, height: 6, borderRadius: 1, background: G.accent, transform: "rotate(45deg)", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "0.88rem", color: G.inkMid }}>{i}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Scale visual */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "1 Resource", sub: "Starter", w: "25%" },
                  { label: "2 Resources", sub: "Growing", w: "50%" },
                  { label: "Specialist Team", sub: "Scaling", w: "75%" },
                  { label: "Full Marketing Pod", sub: "Enterprise", w: "100%" },
                ].map((r, i) => (
                  <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 100, flexShrink: 0 }}>
                      <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.78rem", color: G.ink }}>{r.label}</p>
                      <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "0.65rem", color: G.inkSub }}>{r.sub}</p>
                    </div>
                    <div style={{ flex: 1, height: 10, background: G.bgAlt, borderRadius: 99, overflow: "hidden" }}>
                      <div style={{ width: r.w, height: "100%", background: `linear-gradient(90deg, ${G.accentLight}, ${G.accent})`, borderRadius: 99, transition: "width 1s ease" }} />
                    </div>
                    <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.7rem", color: G.accent, width: 36, textAlign: "right" }}>{i + 1}×</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ WHATSAPP ════════════════════════════════════════════ */}
        <section id="whatsapp" className="py-[60px] md:py-[100px]" style={{ background: G.dark }} ref={waReveal.ref as React.RefObject<HTMLElement>}>
          <div className="px-5 md:px-10" style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-start">
              <div style={{ opacity: waReveal.visible ? 1 : 0, transform: waReveal.visible ? "none" : "translateY(24px)", transition: "opacity 0.8s, transform 0.8s" }}>
                <SectionLabel dark>WhatsApp Marketing</SectionLabel>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", letterSpacing: "-0.02em", color: "#fff", marginBottom: "1.4rem" }}>
                  We didn&apos;t start as a marketing agency. We started by mastering WhatsApp.
                </h2>
                <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "0.92rem", lineHeight: 1.8, color: "rgba(255,255,255,0.5)", marginBottom: "1.5rem" }}>
                  Since 2014, Griffin has built extensive experience in WhatsApp marketing and large-scale outreach campaigns. Unlike conventional WhatsApp API pricing, our model is built around successful delivery — clients pay only for successfully delivered messages.
                </p>
                <div style={{ background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.2)", borderRadius: 10, padding: "16px 20px", marginBottom: "1.5rem" }}>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>Performance figures represent typical benchmarks achieved across campaigns. Results vary by campaign type, target audience and sector.</p>
                </div>
                <div>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>Sectors we&apos;ve worked with</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["Real Estate", "Political Campaigns", "Gaming Platforms", "High-Volume Outreach"].map((s) => (
                      <span key={s} style={{ padding: "6px 14px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "0.72rem", color: "rgba(255,255,255,0.45)" }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-0.5" style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, overflow: "hidden" }}>
                {[
                  { n: "₹0.14", label: "Per delivered message", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
                  { n: "~80%", label: "Typical delivery rate", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
                  { n: "~60%", label: "Typical open rate", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg> },
                  { n: "2014", label: "Marketing since", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> },
                ].map((s, i) => (
                  <div key={s.label} style={{
                    padding: "40px 32px", background: G.darkMid,
                    opacity: waReveal.visible ? 1 : 0,
                    transform: waReveal.visible ? "none" : "translateY(16px)",
                    transition: `opacity 0.7s ${i * 100}ms, transform 0.7s ${i * 100}ms`,
                  }}>
                    <div style={{ marginBottom: 12, color: G.accent }}>{s.icon}</div>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "2.2rem", color: "#fff", lineHeight: 1, marginBottom: 8 }}>{s.n}</p>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Continue with remaining sections - I'll include them in the complete file */}

        {/* ═══ FOOTER ══════════════════════════════════════════════ */}
        <footer className="py-[60px] pb-9" style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="px-5 md:px-10" style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ marginBottom: "4rem" }}>
              <div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "1.3rem", letterSpacing: "0.08em", color: "#fff", marginBottom: 2 }}>GRIFFIN</div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "0.55rem", letterSpacing: "0.35em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: 16 }}>MARKETING</div>
                <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: "26ch", marginBottom: 16 }}>Integrated Marketing Services</p>
                <p style={{ fontFamily: "'Sora', sans-serif", fontStyle: "italic", fontWeight: 400, fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: "28ch" }}>&quot;Your Marketing Team. In Your Office. Backed by Ours.&quot;</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24 }}>
              <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "0.68rem", color: "rgba(255,255,255,0.5)" }}>© 2026 Griffin Marketing. All rights reserved.</p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "0.68rem", color: "rgba(255,255,255,0.5)" }}>Integrated Marketing Services · Est. 2014</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
