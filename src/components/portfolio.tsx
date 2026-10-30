import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUpRight, Menu, Plus, X } from "lucide-react";
import { profile, stats, services, projects, experience, skills, process, faqs, type Project } from "@/content/portfolio";
import { WaterRippleEffect } from "@/components/WaterRippleEffect";
import { InteractiveGridPattern } from "@/components/ui/InteractiveGridPattern";
import { LampEffect } from "@/components/ui/LampEffect";

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
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full px-4 transition-all duration-300 sm:px-6 ${
          solid
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
            className={`hidden lg:inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${
              solid
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
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                  isActive
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
            className={`btn-pill hidden sm:inline-flex !py-2 !px-4 text-xs font-semibold transition-all hover:scale-105 ${
              solid
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "bg-black text-white shadow-md shadow-black/15"
            }`}
          >
            Let's Connect <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <button
            className={`flex h-9 w-9 items-center justify-center rounded-full transition md:hidden ${
              solid ? "bg-white/10 hover:bg-white/15" : "bg-black/10 hover:bg-black/15"
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
              <p className="text-sm font-semibold text-white">
                {profile.name}
              </p>
              <p className="mt-1 text-xs text-white/70">
                Data Analyst | Power BI Developer
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Based in {profile.location}
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

              <div className="grid gap-6 md:grid-cols-2">
                {project.gallery.map((item, index) => (
                  <a
                    key={item.title}
                    href={item.image}
                    target="_blank"
                    rel="noreferrer"
                    className="group overflow-hidden rounded-xl border border-border bg-background transition-all duration-300 hover:border-primary/50"
                  >
                    <div className="overflow-hidden bg-muted">
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                        className="aspect-video w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-3 p-4">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          DASHBOARD 0{index + 1}
                        </p>

                        <h4 className="mt-1 font-medium">
                          {item.title}
                        </h4>
                      </div>

                      <ArrowUpRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </a>
                ))}
              </div>

              <p className="mt-5 text-xs text-muted-foreground">
                Select any dashboard to view the full-size screenshot.
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
            <button onClick={() => setActive(p)} aria-label={`Open ${p.title} case study`} className={`group overflow-hidden rounded-xl border border-border md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
              <img src={p.image} alt={p.alt} width={1600} height={1008} loading="lazy" className="w-full transition-transform duration-700 group-hover:scale-[1.03]" />
            </button>
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
          </div>
        ))}
      </div>
      <div className="reveal mt-10 border-t border-border pt-8 text-sm text-muted-foreground">
        <span className="text-foreground">Education —</span> B.E. Computer Engineering, Indus University · 2022–2026 · CGPA 9.05
      </div>
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
        <Hero /><About /><Services /><Work /><CtaBand /><Experience /><Skills /><Process /><Contact /><Faq />
      </main>
      <Footer />
    </>
  );
}
