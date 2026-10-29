import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUpRight, Menu, Plus, X } from "lucide-react";
import { profile, stats, services, projects, experience, skills, process, faqs, type Project } from "@/content/portfolio";

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
  useEffect(() => {
    const on = () => setDark(window.scrollY > window.innerHeight * 0.55);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);
  const solid = dark || open;
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${solid ? "border-b border-border bg-background/90 text-foreground backdrop-blur" : "text-hero-foreground"}`}>
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="text-sm font-bold tracking-tight">CS. <span className="font-medium opacity-70">/ DATA ANALYTICS</span></a>
        <nav aria-label="Primary" className="hidden items-center gap-8 text-sm font-medium md:flex">
          {nav.map((n) => <a key={n.href} href={n.href} className="opacity-80 transition-opacity hover:opacity-100">{n.label}</a>)}
        </nav>
        <a href="#contact" className={`btn-pill hidden !py-2 md:inline-flex ${solid ? "bg-primary text-primary-foreground" : "bg-hero-foreground text-foreground"}`}>Let's Connect <ArrowUpRight className="h-4 w-4" /></a>
        <button className="md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="container-x flex flex-col gap-1 border-t border-border pb-6 pt-2 md:hidden">
          {nav.map((n) => <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-border py-4 text-2xl font-medium">{n.label}</a>)}
          <a href="#contact" onClick={() => setOpen(false)} className="btn-pill mt-4 justify-center bg-primary text-primary-foreground">Let's Connect <ArrowUpRight className="h-4 w-4" /></a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-[78vh] items-end bg-hero pb-16 pt-28 text-hero-foreground md:min-h-[82vh]">
      <div className="container-x">
        <p className="eyebrow mb-8 opacity-80">Data Analyst • Power BI Developer</p>
        <h1 className="text-[2.6rem] font-medium leading-[1.02] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[5.6rem]">
          Hi, I'm Chirayu.<br />Turning raw data<br />into <span className="serif-i">meaningful</span><br /><span className="serif-i">business insights.</span>
        </h1>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-base leading-relaxed opacity-85 md:text-lg">I build clear, interactive dashboards and transform complex datasets into insights that help teams make better decisions.</p>
          <div className="flex flex-wrap gap-3">
            <a href="#work" className="btn-pill bg-hero-foreground text-foreground">Explore My Work <ArrowDown className="h-4 w-4" /></a>
            <a href="#contact" className="btn-pill border border-hero-foreground/40 hover:bg-hero-foreground/10">Let's Connect <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <a href="#about" aria-label="Scroll to about" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 md:block"><ArrowDown className="animate-cue h-5 w-5 opacity-70" /></a>
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
    <section id="about" className="container-x scroll-mt-20 py-24 md:py-36">
      <Label>About</Label>
      <div className="reveal grid gap-10 md:grid-cols-[180px_1fr]">
        <div aria-label="Portrait placeholder — add a professional photo" className="flex aspect-square w-32 items-center justify-center rounded-lg border border-dashed border-border bg-card text-3xl font-semibold text-muted-foreground md:w-full">CS</div>
        <div>
          <h2 className="text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl">I turn complex operational data into clear, <span className="serif-i text-primary">actionable insights</span> that drive better decisions.</h2>
          <dl className="mt-14 grid gap-8 border-t border-border pt-10 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-5xl font-medium tracking-tight md:text-6xl"><Count to={s.value} suffix={s.suffix} /></dd>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-xs text-muted-foreground">Figures relate to Plant & Machinery analytics work.</p>
          <p className="mt-8 inline-flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-primary" /> Open to Data Analyst and Power BI opportunities.</p>
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

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current!;
    d.showModal();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  return (
    <dialog ref={ref} onClose={onClose} aria-labelledby="cs-title" onClick={(e) => e.target === ref.current && ref.current?.close()}
      className="m-0 h-full max-h-none w-full max-w-none bg-background/80 p-0 text-foreground backdrop:bg-background/70 md:p-8">
      <div className="mx-auto h-full max-w-4xl overflow-y-auto border border-border bg-card md:rounded-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <button onClick={() => ref.current?.close()} className="text-sm font-medium text-muted-foreground hover:text-foreground">← Back to Projects</button>
          <button onClick={() => ref.current?.close()} aria-label="Close case study"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-6 md:p-12">
          <p className="eyebrow text-primary">{project.tags}</p>
          <h2 id="cs-title" className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">{project.title}</h2>
          <p className="mt-5 max-w-2xl text-muted-foreground">{project.desc}</p>
          <img src={project.image} alt={project.alt} width={1600} height={1008} className="mt-10 w-full rounded-lg border border-border" />
          {project.note && <p className="mt-3 text-xs text-muted-foreground">{project.note}</p>}
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {project.detail.map((d) => (
              <div key={d.heading} className="border-t border-border pt-5">
                <h3 className="eyebrow mb-3 text-muted-foreground">{d.heading}</h3>
                <p className="leading-relaxed">{d.body}</p>
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
    <section className="relative overflow-hidden bg-hero text-hero-foreground">
      <div className="container-x flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center">
        <h2 className="text-4xl font-medium leading-tight tracking-tight md:text-5xl">Need a clearer view?<br /><span className="serif-i">Let's build the dashboard.</span></h2>
        <a href="#contact" className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-foreground text-center text-sm font-semibold text-background transition-transform hover:scale-105">Let's Talk ↗</a>
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
    <section id="contact" className="relative scroll-mt-16 overflow-hidden border-y border-border bg-glow py-28 md:py-40">
      <div className="container-x reveal text-center">
        <Label>Contact</Label>
        <h2 className="text-4xl font-medium leading-[1.05] tracking-tight md:text-7xl">Have a data challenge?<br /><span className="serif-i">Let's find the story in it.</span></h2>
        <p className="mx-auto mt-6 max-w-lg text-muted-foreground">Looking for a Data Analyst, Power BI Developer, or analytics team member? I'd love to connect.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={`mailto:${profile.email}?subject=Opportunity%20for%20Chirayu%20Sharma`} className="btn-pill bg-primary text-primary-foreground">Get in Touch <ArrowUpRight className="h-4 w-4" /></a>
          <a href={profile.resumeUrl} download="Chirayu_Sharma_Resume.pdf" className="btn-pill border border-foreground/30 hover:bg-foreground/10">Download Resume <ArrowDown className="h-4 w-4" /></a>
        </div>
        <div className="mt-12 flex flex-col items-center gap-2 text-sm text-muted-foreground sm:flex-row sm:justify-center sm:gap-8">
          <a href={`mailto:${profile.email}`} className="hover:text-foreground">{profile.email}</a>
          <a href={profile.phoneHref} className="hover:text-foreground">{profile.phone}</a>
          <span>{profile.location}</span>
        </div>
      </div>
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
