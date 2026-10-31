import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Bell, Briefcase, CheckCircle2, MapPin, Menu, Plus, X } from "lucide-react";

import {
  profile,
  stats,
  services,
  projects,
  experience,
  skills,
  process,
  faqs,
  awards,
  type Project,
} from "@/content/portfolio";

import { WaterRippleEffect } from "@/components/WaterRippleEffect";
import { InteractiveGridPattern } from "@/components/ui/InteractiveGridPattern";
import { LampEffect } from "@/components/ui/LampEffect";
import { LiquidOcean } from "@/components/ui/liquid-ocean";
import { WaveGridBackground } from "@/components/ui/wave-grid-background";

const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("is-in"), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Label({ children }: { children: ReactNode }) {
  return <p className="eyebrow mb-5 text-primary">● {children}</p>;
}

function Header() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const onScroll = () => {
      setDark(window.scrollY > 80);

      const sections = ["contact", "faq", "process", "skills", "experience", "work", "about"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection("top");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  const solid = dark || open;

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 transition-all duration-300 md:top-5 md:px-8">
      <div
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full px-4 transition-all duration-300 sm:px-6 ${solid
          ? "border border-border/80 bg-background/85 text-foreground shadow-2xl backdrop-blur-xl"
          : "border border-black/10 bg-white/20 text-hero-foreground shadow-sm backdrop-blur-md"
          }`}
      >
        {/* Brand identity & Status badge */}
        <a href="#top" className="flex items-center gap-2.5 tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white shadow-sm">
            CS
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <span className="text-sm font-bold">Chirayu S.</span>
            <span className="text-xs font-medium opacity-60">/ Data Analyst</span>
          </span>
          <span
            className={`hidden lg:inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${solid
              ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
              : "border border-black/15 bg-black/5 text-emerald-800"
              }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Available
          </span>
        </a>

        {/* Floating pill navigation */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-1 rounded-full p-1">
          {nav.map((n) => {
            const isActive = activeSection === n.href.slice(1);
            return (
              <a
                key={n.href}
                href={n.href}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all ${isActive
                  ? solid
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-black text-white shadow-sm"
                  : solid
                    ? "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    : "opacity-80 hover:opacity-100 hover:bg-black/5"
                  }`}
              >
                {n.label}
              </a>
            );
          })}
        </nav>

        {/* Action CTA & Mobile trigger */}
        <div className="flex items-center gap-2.5">
          <a
            href="#contact"
            className={`btn-pill hidden sm:inline-flex !py-2 !px-4 text-xs font-semibold transition-all hover:scale-105 ${solid
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
              : "bg-black text-white shadow-md shadow-black/15"
              }`}
          >
            Let's Connect <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <button
            className={`flex h-9 w-9 items-center justify-center rounded-full transition md:hidden ${solid ? "bg-white/10 hover:bg-white/15" : "bg-black/10 hover:bg-black/15"
              }`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="mx-auto mt-2 max-w-md rounded-2xl border border-border bg-card/95 p-5 shadow-2xl backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-1">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-lg font-medium transition hover:bg-white/5"
              >
                {n.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-pill mt-4 w-full justify-center bg-primary text-primary-foreground"
          >
            Let's Connect <ArrowUpRight className="h-4 w-4" />
          </a>
        </nav>
      )}
    </header>
  );
}

function TypewriterHeadline() {
  const [typedChars, setTypedChars] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setTypedChars(0);
    setIsDone(false);

    const startTimer = setTimeout(() => {
      let count = 0;
      const total = 65;
      const timer = setInterval(() => {
        count += 1;
        setTypedChars(count);
        if (count >= total) {
          clearInterval(timer);
          setTimeout(() => setIsDone(true), 2500);
        }
      }, 34);

      return () => clearInterval(timer);
    }, 280);

    return () => clearTimeout(startTimer);
  }, []);

  const L1 = "Hi, I'm Chirayu.";
  const L2 = "Turning raw data";
  const L3a = "into ";
  const L3b = "meaningful";
  const L4 = "business insights.";

  const l1Chars = Math.min(L1.length, Math.max(0, typedChars));
  const textL1 = L1.slice(0, l1Chars);
  const showCursorL1 = !isDone && typedChars <= L1.length;

  const l2Chars = Math.min(L2.length, Math.max(0, typedChars - 16));
  const textL2 = L2.slice(0, l2Chars);
  const showCursorL2 = !isDone && typedChars > 16 && typedChars <= 32;

  const l3aChars = Math.min(L3a.length, Math.max(0, typedChars - 32));
  const textL3a = L3a.slice(0, l3aChars);
  const l3bChars = Math.min(L3b.length, Math.max(0, typedChars - 37));
  const textL3b = L3b.slice(0, l3bChars);
  const showCursorL3 = !isDone && typedChars > 32 && typedChars <= 47;

  const l4Chars = Math.min(L4.length, Math.max(0, typedChars - 47));
  const textL4 = L4.slice(0, l4Chars);
  const showCursorL4 = !isDone && typedChars > 47;

  const Cursor = () => (
    <span
      aria-hidden="true"
      className="inline-block w-[3px] h-[0.85em] ml-1 bg-black align-baseline animate-pulse duration-500 rounded-sm"
    />
  );

  return (
    <h1 className="min-h-[4.4em] sm:min-h-[4.2em] text-[2.75rem] font-bold leading-[1.03] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[5.1rem]">
      <span>{textL1}</span>
      {showCursorL1 && <Cursor />}
      <br />
      {(typedChars > 16 || isDone) && (
        <>
          <span>{textL2}</span>
          {showCursorL2 && <Cursor />}
          <br />
        </>
      )}
      {(typedChars > 32 || isDone) && (
        <>
          <span>{textL3a}</span>
          <span className="serif-i font-normal italic">{textL3b}</span>
          {showCursorL3 && <Cursor />}
          <br />
        </>
      )}
      {(typedChars > 47 || isDone) && (
        <>
          <span className="serif-i font-normal italic">{textL4}</span>
          {showCursorL4 && <Cursor />}
        </>
      )}
    </h1>
  );
}



function Hero() {
  const heroPhoto = profile.heroPhotoUrl || "/hero-full.png";

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-hero pb-12 pt-24 text-hero-foreground md:pb-16 md:pt-28"
    >
      {/* Interactive Water Ripple Effect on Hover/Touch */}
      <WaterRippleEffect />

      <div className="container-x relative z-10 flex w-full flex-col justify-between lg:flex-row lg:items-center">
        {/* LEFT COLUMN - TEXT CONTENT */}
        <div className="w-full max-w-2xl py-6 lg:w-[50%] lg:py-12 xl:max-w-3xl">
          <p className="eyebrow mb-6 text-[12px] font-semibold tracking-[0.24em] text-hero-foreground/80 md:text-[13px]">
            DATA ANALYST • POWER BI DEVELOPER
          </p>

          {/* Dynamic Self-Typing Headline on load/reload */}
          <TypewriterHeadline />

          <p className="mt-8 max-w-lg text-base leading-relaxed text-hero-foreground/85 md:text-lg">
            I build clear, interactive dashboards and transform complex datasets into insights that help teams make better decisions.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="btn-pill bg-black px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800"
            >
              Explore My Work <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="btn-pill border border-black/40 px-7 py-3 text-sm font-semibold text-black transition hover:border-black hover:bg-black/5"
            >
              Let's Connect <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN - COMPLETE HERO ARTWORK (Desktop) */}
        {heroPhoto && (
          <div className="pointer-events-none absolute bottom-0 right-0 top-16 hidden select-none lg:flex lg:w-[54%] lg:items-end lg:justify-end xl:w-[52%]">
            <img
              src={heroPhoto}
              alt={profile.name}
              className="h-auto max-h-[92vh] w-full object-contain object-bottom"
              style={{
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.06))",
              }}
            />
          </div>
        )}

        {/* Mobile / Tablet View */}
        {heroPhoto && (
          <div className="relative z-10 mt-6 flex justify-center lg:hidden">
            <img
              src={heroPhoto}
              alt={profile.name}
              className="max-h-[50vh] w-auto object-contain object-bottom"
            />
          </div>
        )}
      </div>

      {/* SCROLL INDICATOR */}
      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 lg:block"
      >
        <ArrowDown className="h-5 w-5 animate-cue text-hero-foreground/70" />
      </a>
    </section>
  );
}


function Count({ to, suffix }: { to: number; suffix: string }) {
  const [n, setN] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    setN(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1400);
        setN(p >= 1 ? to : Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n.toLocaleString("en-US")}{suffix}</span>;
}


function About() {
  return (
    <section
      id="about"
      className="container-x scroll-mt-20 py-24 md:py-32"
    >
      {/* Section heading */}
      <div className="mb-14 flex items-center justify-between">
        <Label>About Me</Label>
        <span className="hidden text-xs tracking-[0.2em] text-muted-foreground md:block">
          GET TO KNOW ME / 01
        </span>
      </div>

      {/* Main content */}
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.7fr] lg:gap-20">

        {/* Profile image */}
        <div className="reveal">
          <div className="relative max-w-[340px]">
            <div className="absolute -right-3 -top-3 h-full w-full rounded-2xl border border-primary/40" />

            <img
              src={profile.photoUrl}
              alt={profile.name}
              className="relative aspect-[4/5] w-full rounded-2xl border border-border object-cover object-top"
            />

            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-black/75 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {profile.name}
                  </p>
                  <p className="mt-1 text-xs text-white/70">
                    Data Analyst | Power BI Developer
                  </p>
                </div>
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chirayu Sharma LinkedIn profile"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 backdrop-blur transition-all hover:bg-primary hover:border-primary hover:text-primary-foreground hover:scale-105"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Based in {profile.location}
            </div>
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-primary transition-colors hover:underline"
              >
                LinkedIn Profile <ArrowUpRight className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        {/* Introduction */}
        <div className="reveal">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Turning Data Into Decisions
          </p>

          <h2 className="mt-5 text-4xl font-medium leading-[1.15] tracking-tight md:text-6xl">
            I make data
            <span className="serif-i text-primary"> meaningful.</span>
          </h2>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            I'm Chirayu Sharma, a Data Analyst passionate about
            transforming complex datasets into clear, actionable
            business insights.
          </p>

          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            My experience includes developing Power BI dashboards,
            cleaning and transforming data, building DAX measures,
            and creating KPI reports for operational decision-making.
            I enjoy solving business problems through data and
            presenting insights in a simple, meaningful way.
          </p>

          {/* Expertise tags */}
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "Power BI",
              "Microsoft Excel",
              "Power Query",
              "DAX",
              "SQL",
              "Data Visualization",
            ].map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Availability */}
          <div className="mt-10 flex items-center gap-3 border-t border-border pt-7">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <p className="text-sm font-medium">
              Open to Data Analyst & Power BI opportunities
            </p>
          </div>
        </div>
      </div>


      {/* ANALYTICS IMPACT */}
      <div className="mt-24 border-t border-border pt-12">

        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium tracking-[0.22em] text-primary">
              BY THE NUMBERS
            </p>

            <h3 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
              Analytics <span className="serif-i text-primary">at a glance.</span>
            </h3>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            A snapshot of the scale and impact of my Plant & Machinery analytics work.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 md:p-9"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground">
                  0{i + 1} / IMPACT
                </span>

                <span className="h-2 w-2 rounded-full bg-primary" />
              </div>

              <div className="mt-10">
                <p className="text-5xl font-semibold tracking-[-0.05em] md:text-6xl">
                  <Count to={s.value} suffix={s.suffix} />
                </p>

                <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-muted-foreground">
                  {s.label}
                </p>
              </div>

              <div className="mt-9 h-1 w-10 rounded-full bg-primary transition-all duration-300 group-hover:w-20" />

              <span className="pointer-events-none absolute -bottom-10 -right-2 text-8xl font-semibold text-foreground/[0.025]">
                0{i + 1}
              </span>
            </div>
          ))}

        </div>
      </div>

    </section>
  );
}

function Services() {

  return (
    <section className="container-x py-20 md:py-28">
      <Label>Services</Label>
      <h2 className="reveal mb-14 text-4xl font-medium tracking-tight md:text-6xl">What I bring <span className="serif-i">to the table.</span></h2>
      <ul className="border-t border-border">
        {services.map((s, i) => (
          <li key={s.title} className="reveal group grid gap-3 border-b border-border py-8 md:grid-cols-[80px_1fr_1fr_40px] md:items-center">
            <span className="text-sm text-muted-foreground">0{i + 1}</span>
            <h3 className="text-2xl font-medium tracking-tight transition-colors group-hover:text-primary md:text-3xl">{s.title}</h3>
            <p className="text-muted-foreground">{s.desc}</p>
            <ArrowUpRight className="hidden h-5 w-5 -translate-x-2 text-primary opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 md:block" />
          </li>
        ))}
      </ul>
    </section>
  );
}


function CaseStudy({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current!;
    d.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-labelledby="cs-title"
      onClick={(e) =>
        e.target === ref.current && ref.current?.close()
      }
      className="m-0 h-full max-h-none w-full max-w-none bg-background/80 p-0 text-foreground backdrop:bg-background/70 md:p-8"
    >
      <div className="mx-auto h-full max-w-5xl overflow-y-auto border border-border bg-card md:rounded-xl">

        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <button
            onClick={() => ref.current?.close()}
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            ← Back to Projects
          </button>

          <button
            onClick={() => ref.current?.close()}
            aria-label="Close case study"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 md:p-12">

          {/* PROJECT INTRODUCTION */}
          <p className="eyebrow text-primary">{project.tags}</p>

          <h2
            id="cs-title"
            className="mt-4 text-3xl font-medium tracking-tight md:text-5xl"
          >
            {project.title}
          </h2>

          <p className="mt-5 max-w-2xl text-muted-foreground">
            {project.desc}
          </p>

          {/* MAIN PROJECT IMAGE */}
          <img
            src={project.image}
            alt={project.alt}
            width={1600}
            height={1008}
            className="mt-10 w-full rounded-lg border border-border"
          />

          {project.note && (
            <p className="mt-3 text-xs text-muted-foreground">
              {project.note}
            </p>
          )}


          {/* POWER BI DASHBOARD GALLERY */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="mt-16">

              <div className="mb-8">
                <p className="eyebrow text-primary">
                  POWER BI SHOWCASE
                </p>

                <h3 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
                  Dashboard Gallery
                </h3>

                <p className="mt-3 max-w-xl text-muted-foreground">
                  Explore the different analytical views developed
                  for Plant & Machinery operations.
                </p>
              </div>

              {/* Interactive Dashboard Gallery Carousel */}
              <CaseStudyGallery images={project.gallery} />

              <p className="mt-5 text-xs text-muted-foreground">
                Click any dashboard thumbnail or use left/right arrows to inspect the full report suite.
              </p>

            </section>
          )}


          {/* PROJECT DETAILS */}
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {project.detail.map((d) => (
              <div
                key={d.heading}
                className="border-t border-border pt-5"
              >
                <h3 className="eyebrow mb-3 text-muted-foreground">
                  {d.heading}
                </h3>

                <p className="leading-relaxed">
                  {d.body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </dialog>
  );
}


function CaseStudyGallery({ images }: { images: { title: string; image: string; alt: string }[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  const current = images[currentIndex] || images[0];

  return (
    <div className="space-y-4">
      {/* Main Image Stage */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-black/60 shadow-2xl">
        <img
          key={current.image}
          src={current.image}
          alt={current.alt}
          className="h-full w-full object-contain transition-opacity duration-300"
        />

        {/* Top Floating Badge */}
        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-center justify-between sm:inset-x-4 sm:top-4">
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-black/75 px-3.5 py-1.5 text-xs text-white/90 backdrop-blur-md">
            <span className="font-mono text-primary font-semibold">
              {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
            <span className="text-white/40">•</span>
            <span className="truncate max-w-[180px] sm:max-w-md font-medium">{current.title}</span>
          </div>

          <a
            href={current.image}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/75 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md transition-colors hover:bg-black/90 hover:text-white"
          >
            <span>Full Resolution</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prev}
          aria-label="Previous dashboard"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/75 p-2.5 text-white/90 backdrop-blur-md transition-all hover:scale-110 hover:bg-black hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next dashboard"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/75 p-2.5 text-white/90 backdrop-blur-md transition-all hover:scale-110 hover:bg-black hover:text-white"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      {/* Thumbnails Row */}
      <div className="flex gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar">
        {images.map((item, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={item.image}
              onClick={() => setCurrentIndex(idx)}
              className={`group relative flex-shrink-0 overflow-hidden rounded-lg border transition-all duration-200 ${
                isActive
                  ? "border-primary ring-2 ring-primary/40 scale-[1.02]"
                  : "border-border/60 opacity-60 hover:opacity-100 hover:border-foreground/30"
              }`}
            >
              <img
                src={item.image}
                alt={item.alt}
                className="h-16 w-24 object-cover sm:h-20 sm:w-32"
              />
              <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-[9px] font-mono text-white/90">
                0{idx + 1}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}



function Work() {
  const [active, setActive] = useState<Project | null>(null);
  return (
    <section id="work" className="container-x scroll-mt-20 py-20 md:py-32">
      <div className="reveal mb-16 text-center">
        <Label>Selected Work</Label>
        <h2 className="text-4xl font-medium tracking-tight md:text-6xl">Turning data <span className="serif-i">into decisions.</span></h2>
        <p className="mx-auto mt-5 max-w-lg text-muted-foreground">Analytics work built around real operational questions — from raw logs to dashboards people use.</p>
      </div>
      <div className="space-y-24 md:space-y-32">
        {projects.map((p, i) => (
          <article key={p.id} className="reveal grid items-center gap-8 md:grid-cols-12 md:gap-12">
            {p.id === "plant-machinery" ? (
              <div
                onClick={() => setActive(p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(p)}
                aria-label={`Open ${p.title} case study`}
                className={`group relative h-[480px] sm:h-[510px] lg:h-[530px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl transition-all duration-500 hover:border-cyan-400/50 cursor-pointer md:col-span-7 ${
                  i % 2 ? "md:order-2" : ""
                }`}
              >
                <LiquidOcean
                  className="h-full w-full"
                  accentColor={0x00d2ff}
                  gridColor={0x1f2937}
                  backgroundColor={0x000000}
                >
                  <div className="relative flex h-full w-full flex-col justify-between p-6 sm:p-8">
                    {/* Top Section */}
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-semibold tracking-[0.25em] text-cyan-400 uppercase">
                          PLANT & MACHINERY
                        </p>
                        <p className="mt-1 text-xs font-mono tracking-widest text-white/90 uppercase">
                          OPERATIONAL INTELLIGENCE
                        </p>
                      </div>

                      {/* Floating Glass Badges */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {["POWER BI", "DAX", "POWER QUERY", "EXCEL"].map((badge) => (
                          <span
                            key={badge}
                            className="rounded-md border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] font-mono font-medium tracking-wider text-cyan-200/95 backdrop-blur-md transition-colors group-hover:border-cyan-400/30"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Center Section */}
                    <div className="my-auto py-4">
                      <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-950/40 px-3 py-1 text-[11px] font-mono text-cyan-300 backdrop-blur-md mb-3">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
                        </span>
                        Live Telemetry Simulation
                      </div>
                      <h4 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white drop-shadow-md">
                        Plant & Machinery Analytics
                      </h4>
                      <p className="mt-2 max-w-md text-xs sm:text-sm text-white/70 line-clamp-2">
                        Interactive 3D operational intelligence mapping equipment utilization, compliance, and idle telemetry across jobsites.
                      </p>
                    </div>

                    {/* Bottom Information Glass Card */}
                    <div className="grid grid-cols-3 divide-x divide-white/10 rounded-xl border border-white/15 bg-black/70 p-3.5 backdrop-blur-md transition-all group-hover:border-cyan-500/40">
                      <div className="px-2 text-center sm:px-3 sm:text-left">
                        <p className="text-base sm:text-lg font-semibold text-white tracking-tight">1,300+</p>
                        <p className="text-[10px] sm:text-xs text-white/60 font-mono tracking-wide">Equipment</p>
                      </div>
                      <div className="px-2 text-center sm:px-3 sm:text-left">
                        <p className="text-base sm:text-lg font-semibold text-cyan-300 tracking-tight">61</p>
                        <p className="text-[10px] sm:text-xs text-white/60 font-mono tracking-wide">Construction Sites</p>
                      </div>
                      <div className="px-2 text-center sm:px-3 sm:text-left">
                        <p className="text-base sm:text-lg font-semibold text-white tracking-tight">5</p>
                        <p className="text-[10px] sm:text-xs text-white/60 font-mono tracking-wide">Analytics Views</p>
                      </div>
                    </div>
                  </div>
                </LiquidOcean>
              </div>
            ) : p.id === "jobsy" ? (
              <div
                onClick={() => setActive(p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(p)}
                aria-label={`Open ${p.title} case study`}
                className={`group relative h-[520px] w-full overflow-hidden rounded-xl border border-border shadow-2xl transition-all duration-500 hover:border-blue-400/50 cursor-pointer md:col-span-7 ${
                  i % 2 ? "md:order-2" : ""
                }`}
              >
                <WaveGridBackground
                  colorBase="#ffffff"
                  colorHigh="#0055ff"
                >
                  <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-6">
                    {/* Floating Top-Left Card: New Job Opportunity */}
                    <div className="absolute left-3 top-3 sm:left-6 sm:top-6 flex items-center gap-2.5 rounded-xl border border-blue-400/25 bg-slate-950/80 px-3 py-2 text-xs text-white shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-0.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 border border-blue-400/30">
                        <Bell className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-white">New Job Opportunity</span>
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400" />
                        </div>
                        <p className="text-[10px] text-slate-300 font-mono">Express Delivery Fleet</p>
                      </div>
                    </div>

                    {/* Floating Top-Right Card: Delivery Executive / Full-Time */}
                    <div className="absolute right-3 top-3 sm:right-6 sm:top-6 flex items-center gap-2.5 rounded-xl border border-blue-400/25 bg-slate-950/80 px-3.5 py-2 text-xs text-white shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-0.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 border border-blue-400/30">
                        <Briefcase className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">Delivery Executive</span>
                          <span className="rounded bg-blue-600/40 border border-blue-400/40 px-1.5 py-0.5 text-[9px] font-mono text-blue-200 uppercase font-medium">
                            Full-Time
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-300 font-mono">Urban Logistics Network</p>
                      </div>
                    </div>

                    {/* Central Jobsy Branding Card */}
                    <div className="flex flex-col items-center text-center rounded-2xl border border-blue-400/30 bg-slate-950/85 px-7 py-6 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:border-blue-400/60 group-hover:scale-[1.02]">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/40 border border-blue-400/40">
                        <span className="text-xl font-black tracking-tight">J</span>
                      </div>
                      <h4 className="text-3xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-sm">
                        Jobsy
                      </h4>
                      <p className="mt-1 text-[11px] sm:text-xs font-mono font-semibold tracking-[0.2em] text-blue-300 uppercase">
                        DELIVERY JOBS PLATFORM
                      </p>
                      <div className="mt-3.5 flex items-center gap-1.5 rounded-full border border-blue-400/20 bg-blue-950/60 px-3 py-1 text-[10px] font-mono text-blue-200">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                        </span>
                        Connecting Delivery Talent & Employers
                      </div>
                    </div>

                    {/* Floating Bottom-Left Card: Application Status: Submitted */}
                    <div className="absolute left-3 bottom-3 sm:left-6 sm:bottom-6 flex items-center gap-2.5 rounded-xl border border-blue-400/25 bg-slate-950/80 px-3 py-2 text-xs text-white shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:translate-y-0.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-300 font-mono">Application Status</p>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-emerald-300">Submitted</span>
                          <span className="text-[10px] text-slate-400 font-mono">• In Review</span>
                        </div>
                      </div>
                    </div>

                    {/* Floating Bottom-Right Card: Delivery Hub & Route Matching */}
                    <div className="absolute right-3 bottom-3 sm:right-6 sm:bottom-6 hidden sm:flex items-center gap-2.5 rounded-xl border border-blue-400/25 bg-slate-950/80 px-3.5 py-2 text-xs text-white shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:translate-y-0.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 border border-blue-400/30">
                        <MapPin className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <span className="font-semibold text-white">Smart Hub Matching</span>
                        <p className="text-[10px] text-slate-300 font-mono">Geo-routed Hiring</p>
                      </div>
                    </div>
                  </div>
                </WaveGridBackground>
              </div>
            ) : (
              <button
                onClick={() => setActive(p)}
                aria-label={`Open ${p.title} case study`}
                className={`group overflow-hidden rounded-xl border border-border md:col-span-7 ${
                  i % 2 ? "md:order-2" : ""
                }`}
              >
                <img
                  src={p.image}
                  alt={p.alt}
                  width={1600}
                  height={1008}
                  loading="lazy"
                  className="w-full transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </button>
            )}
            <div className="md:col-span-5">
              <p className="text-sm text-muted-foreground">{p.index} — {p.tags}</p>
              <h3 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">{p.title}</h3>
              <p className="mt-5 leading-relaxed text-muted-foreground">{p.desc}</p>
              {p.facts && (
                <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border pt-6 text-sm">
                  {p.facts.map((f) => <li key={f}>{f}</li>)}
                </ul>
              )}
              {p.note && <p className="mt-5 text-xs text-muted-foreground">{p.note}</p>}
              <button onClick={() => setActive(p)} className="btn-pill mt-8 border border-border hover:border-primary hover:text-primary">{p.cta} <ArrowUpRight className="h-4 w-4" /></button>
            </div>
          </article>
        ))}
      </div>
      {active && <CaseStudy project={active} onClose={() => setActive(null)} />}
    </section>
  );
}

function CtaBand() {
  return (
    <section className="relative grid min-h-[500px] place-content-center overflow-hidden border-y border-border bg-background py-24">
      {/* Interactive Grid Pattern with skew and radial mask */}
      <InteractiveGridPattern
        className="inset-0 h-[220%] w-[120%] -translate-x-[10%] -translate-y-[20%] skew-y-12 [mask-image:radial-gradient(460px_circle_at_center,white,transparent)]"
        width={42}
        height={42}
        squares={[28, 28]}
      />

      <div className="container-x relative z-10 text-center">
        <p className="eyebrow mb-4 text-primary">INTERACTIVE DATA MATRIX</p>
        <h2 className="text-4xl font-medium tracking-tight md:text-6xl">
          Need a clearer view?<br />
          <span className="serif-i text-primary">Let's build the dashboard.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
          Transforming scattered spreadsheets and complex machinery logs into live, interactive Power BI intelligence.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#contact"
            className="btn-pill bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-primary/45 hover:-translate-y-0.5"
          >
            Start a Conversation <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="container-x scroll-mt-20 py-24 md:py-32">
      <div className="reveal mb-16 text-center">
        <Label>Experience</Label>
        <h2 className="text-4xl font-medium tracking-tight md:text-6xl">A little about <span className="serif-i">my journey.</span></h2>
      </div>
      <div className="grid gap-x-16 md:grid-cols-2">
        {experience.map((e) => (
          <div key={e.org} className="reveal border-t border-border py-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-medium">{e.org}</h3>
              <span className="text-xs text-muted-foreground">{e.period}</span>
            </div>
            <ul className="mt-2 space-y-1">{e.roles.map((r, i) => <li key={r} className={`text-sm ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>{r}</li>)}</ul>
            <p className="mt-4 leading-relaxed text-muted-foreground">{e.desc}</p>
            {e.certificateUrl && (
              <a
                href={e.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground"
              >
                View Internship Certificate
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        ))}
      </div>
      <div className="reveal mt-10 border-t border-border pt-8 text-sm text-muted-foreground">
        <span className="text-foreground">Education —</span> B.E. Computer Engineering, Indus University · 2022–2026 · CGPA 9.05
      </div>
    </section>
  );
}


function Awards() {
  return (
    <section
      id="awards"
      className="container-x scroll-mt-20 py-24 md:py-32"
    >
      <div className="reveal mb-16 text-center">
        <Label>Recognition</Label>

        <h2 className="text-4xl font-medium tracking-tight md:text-6xl">
          Moments of <span className="serif-i">achievement.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground md:text-base">
          Celebrating milestones, contributions and experiences
          throughout my journey.
        </p>
      </div>

      {awards.map((award) => (
        <div
          key={award.title}
          className="reveal mx-auto grid max-w-6xl items-start gap-8 md:grid-cols-2 md:gap-10"
        >
          {/* Award Photograph & Details */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <a
              href={award.image}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View award photograph in full size"
              className="group/image relative block aspect-video w-full cursor-zoom-in overflow-hidden bg-black"
            >
              <img
                src={award.image}
                alt="Chirayu Sharma's Graphic Lead award from CESA"
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover/image:scale-105"
                loading="lazy"
              />

              <span className="absolute bottom-4 right-4 rounded-full bg-black/75 px-4 py-2 text-xs text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover/image:opacity-100">
                View Full Image ↗
              </span>
            </a>

            <div className="p-6 md:p-8">
              <span className="text-xs uppercase tracking-[0.2em] text-primary">
                Award Recognition
              </span>

              <h3 className="mt-3 text-2xl font-medium">
                {award.title}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {award.organization} · {award.year}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {award.description}
              </p>

              <a
                href={award.image}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:opacity-75"
              >
                View Award Photograph
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Award Ceremony Video */}
          <div>
            <div className="mb-5">
              <span className="text-xs uppercase tracking-[0.2em] text-primary">
                Behind the Moment
              </span>

              <h3 className="mt-3 text-2xl font-medium">
                The Award Ceremony
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                A glimpse of the moment behind this achievement.
              </p>
            </div>

            <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border bg-black">
              <video
                controls
                playsInline
                preload="metadata"
                poster={award.image}
                className="h-full w-full object-contain"
              >
                <source src={award.video} type="video/mp4" />
                Your browser does not support video playback.
              </video>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="container-x scroll-mt-20 py-20 md:py-28">
      <Label>Toolkit</Label>
      <h2 className="reveal mb-14 text-4xl font-medium tracking-tight md:text-6xl">The tools <span className="serif-i">I work with.</span></h2>
      <div className="grid gap-12 md:grid-cols-3">
        {skills.map((g) => (
          <div key={g.group} className="reveal border-t border-border pt-6">
            <h3 className="eyebrow mb-6 text-muted-foreground">{g.group}</h3>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((s) => <li key={s} className="rounded-full border border-border px-3.5 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary">{s}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="container-x py-20 md:py-28">
      <Label>Process</Label>
      <h2 className="reveal mb-14 max-w-3xl text-4xl font-medium tracking-tight md:text-6xl">From raw data to <span className="serif-i">clear decisions.</span></h2>
      <ol className="grid gap-10 md:grid-cols-3">
        {process.map((p, i) => (
          <li key={p.title} className="reveal border-t border-border pt-6">
            <span className="serif-i text-4xl text-primary">0{i + 1}</span>
            <h3 className="mt-6 text-xl font-medium">{p.title}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{p.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden border-y border-border bg-background">
      <LampEffect>
        <div className="container-x reveal text-center">
          <Label>Contact</Label>
          <h2 className="text-4xl font-medium leading-[1.05] tracking-tight md:text-7xl">
            Have a data challenge?<br />
            <span className="serif-i text-primary">Let's find the story in it.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-muted-foreground">
            Looking for a Data Analyst, Power BI Developer, or analytics team member? I'd love to connect.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${profile.email}?subject=Opportunity%20for%20Chirayu%20Sharma`}
              className="btn-pill bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-primary/45"
            >
              Get in Touch <ArrowUpRight className="h-4 w-4" />
            </a>
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn-pill border border-foreground/30 hover:border-primary hover:text-primary transition"
              >
                LinkedIn <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            <a
              href={profile.resumeUrl}
              download="Chirayu_Sharma_Resume.pdf"
              className="btn-pill border border-foreground/30 hover:bg-foreground/10"
            >
              Download Resume <ArrowDown className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-12 flex flex-col items-center gap-2 text-sm text-muted-foreground sm:flex-row sm:justify-center sm:gap-8">
            <a href={`mailto:${profile.email}`} className="hover:text-foreground">
              {profile.email}
            </a>
            <a href={profile.phoneHref} className="hover:text-foreground">
              {profile.phone}
            </a>
            <span>{profile.location}</span>
          </div>
        </div>
      </LampEffect>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="container-x max-w-4xl py-24 md:py-32">
      <div className="mb-12 text-center"><Label>FAQ</Label>
        <h2 className="text-4xl font-medium tracking-tight md:text-5xl">Frequently <span className="serif-i">asked questions.</span></h2></div>
      <div className="border-t border-border">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="border-b border-border">
              <h3>
                <button id={`faq-b-${i}`} aria-expanded={isOpen} aria-controls={`faq-p-${i}`} onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium">
                  {f.q}<Plus className={`h-5 w-5 shrink-0 text-primary transition-transform ${isOpen ? "rotate-45" : ""}`} />
                </button>
              </h3>
              <div id={`faq-p-${i}`} role="region" aria-labelledby={`faq-b-${i}`} hidden={!isOpen} className="pb-6 pr-10 leading-relaxed text-muted-foreground">{f.a}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Footer() {
  const social = [
    { label: "LinkedIn", url: profile.linkedin },
    { label: "GitHub", url: profile.github },
  ];
  return (
    <footer className="relative overflow-hidden bg-glow pt-24">
      <div className="container-x">
        <p className="text-[13vw] font-medium leading-[0.95] tracking-[-0.05em] md:text-[9vw]">Let's make data<br /><span className="serif-i text-primary">mean something.</span></p>
        <div className="mt-20 grid gap-8 border-t border-border py-10 text-sm md:grid-cols-3">
          <div><p className="font-semibold">{profile.name}</p><p className="text-muted-foreground">{profile.title}</p><p className="text-muted-foreground">{profile.location}</p></div>
          <ul className="space-y-2">
            <li><a href={`mailto:${profile.email}`} className="hover:text-primary">{profile.email}</a></li>
            {social.map((s) => <li key={s.label}>{s.url ? <a href={s.url} target="_blank" rel="noreferrer" className="hover:text-primary">{s.label} ↗</a> : <span className="text-muted-foreground">{s.label} — link coming soon</span>}</li>)}
          </ul>
          <ul className="space-y-2 md:text-right">
            <li><a href={profile.resumeUrl} download="Chirayu_Sharma_Resume.pdf" className="hover:text-primary">Download Resume ↓</a></li>
            <li><a href="#top" className="hover:text-primary">Back to top ↑</a></li>
            <li className="text-muted-foreground">© {new Date().getFullYear()} Chirayu Sharma</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export function Portfolio() {
  useReveal();
  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:p-2">Skip to content</a>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Work />
        <CtaBand />
        <Experience />
        <Awards />
        <Skills />
      </main>
      <Footer />
    </>
  );
}
