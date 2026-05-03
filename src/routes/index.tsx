import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Calendar, MessageCircle, Sparkles, Vote, ChevronDown, IdCard, MapPin, Smartphone, Languages, HelpCircle } from "lucide-react";
import { useLang } from "@/components/language-provider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Matdaan — Your first vote, made simple" },
      { name: "description", content: "Friendly, step-by-step guide to India's election process for first-time voters. Understand registration, voting day, and results." },
      { property: "og:title", content: "Matdaan — Your first vote, made simple" },
      { property: "og:description", content: "Friendly, step-by-step guide to India's election process for first-time voters." },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useLang();
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Animated orbs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-30 blur-3xl animate-float-slow"
            style={{ background: "var(--gradient-saffron)" }} />
          <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-25 blur-3xl animate-float-slower"
            style={{ background: "var(--gradient-magenta)" }} />
          <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] rounded-full opacity-20 blur-3xl animate-float-slow"
            style={{ background: "var(--gradient-teal)" }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-foreground/80">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Built for first-time voters in India
          </div>

          <h1 className="mt-8 text-6xl sm:text-8xl font-display tracking-tight leading-[0.92]">
            Your first vote,
            <br />
            <span className="text-gradient-hero">made simple.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
            From registering as a voter to standing in the booth — a clear, modern guide to the Indian election process. No jargon. No politics. Just clarity.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/walkthrough" className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold shadow-[var(--shadow-glow)] hover:scale-[1.02] active:scale-[0.98] transition-transform">
              Start the walkthrough
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/assistant" className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-card/80 transition">
              <Sparkles className="w-4 h-4 text-secondary" />
              Ask the AI assistant
            </Link>
          </div>

          {/* Stat strip */}
          <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl">
            <Stat number="970M+" label="Eligible voters" />
            <Stat number="7" label="Phases" />
            <Stat number="1.05M" label="Polling stations" />
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary">/ 01 Tools</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-display">Three ways to learn</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard
            to="/walkthrough"
            number="01"
            icon={<CheckCircle2 className="w-5 h-5" />}
            title="Guided walkthrough"
            desc="Seven friendly steps — from checking eligibility to understanding results."
            gradient="var(--gradient-saffron)"
          />
          <FeatureCard
            to="/dates"
            number="02"
            icon={<Calendar className="w-5 h-5" />}
            title="Key dates tracker"
            desc="Visual timeline of nomination, polling phases, counting, and results."
            gradient="var(--gradient-teal)"
          />
          <FeatureCard
            to="/assistant"
            number="03"
            icon={<MessageCircle className="w-5 h-5" />}
            title="Ask the assistant"
            desc="Get answers to any election question in plain, simple language."
            gradient="var(--gradient-magenta)"
          />
        </div>
      </section>

      {/* Quick facts — redesigned */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary">{t.factsKicker}</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-display">{t.factsHeading}</h2>
            <p className="mt-3 text-muted-foreground max-w-xl">{t.factsSub}</p>
          </div>
          <Link to="/walkthrough" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/80 hover:text-foreground transition">
            {t.seeWalkthrough} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {t.facts.map((f, i) => (
            <FactCard
              key={i}
              icon={[<Vote className="w-5 h-5" />, <IdCard className="w-5 h-5" />, <Smartphone className="w-5 h-5" />, <MapPin className="w-5 h-5" />][i]}
              kicker={f.kicker}
              title={f.title}
              desc={f.desc}
              gradient={["var(--gradient-saffron)", "var(--gradient-magenta)", "var(--gradient-teal)", "var(--gradient-saffron)"][i]}
            />
          ))}
        </div>
      </section>

      {/* Eligibility quick-check */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <EligibilityCheck />
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-28">
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary">{t.faqKicker}</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-display">{t.faqHeading}</h2>
          <p className="mt-3 text-muted-foreground max-w-xl">
            {t.faqSubBefore}
            <Link to="/assistant" className="text-foreground underline-offset-4 hover:underline">{t.faqSubLink}</Link>
            {t.faqSubAfter}
          </p>
        </div>
        <div className="space-y-3">
          {t.faqs.map((f, i) => (
            <FaqItem key={`${i}-${f.q}`} q={f.q} a={f.a} />
          ))}
        </div>
      </section>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl glass overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left hover:bg-card/40 transition"
        aria-expanded={open}
      >
        <span className="flex items-start gap-3">
          <HelpCircle className="w-4 h-4 mt-1 text-secondary shrink-0" />
          <span className="font-medium text-foreground">{q}</span>
        </span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 sm:px-6 pb-5 pt-0 pl-12 text-sm text-muted-foreground leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

function EligibilityCheck() {
  const { t } = useLang();
  const [age, setAge] = useState<boolean | null>(null);
  const [citizen, setCitizen] = useState<boolean | null>(null);
  const [resident, setResident] = useState<boolean | null>(null);

  const allAnswered = age !== null && citizen !== null && resident !== null;
  const eligible = age && citizen && resident;

  return (
    <div className="relative overflow-hidden rounded-3xl glass p-7 sm:p-10">
      <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--gradient-teal)" }} />
      <div className="relative grid lg:grid-cols-[1fr_1.2fr] gap-8 items-center">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary flex items-center gap-2">
            <Languages className="w-3.5 h-3.5" /> {t.quizKicker}
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display leading-tight">{t.quizHeading}</h2>
          <p className="mt-4 text-muted-foreground">{t.quizSub}</p>
        </div>
        <div className="space-y-3">
          <YesNo q={t.qAge} yes={t.yes} no={t.no} value={age} onChange={setAge} />
          <YesNo q={t.qCitizen} yes={t.yes} no={t.no} value={citizen} onChange={setCitizen} />
          <YesNo q={t.qResident} yes={t.yes} no={t.no} value={resident} onChange={setResident} />
          {allAnswered && (
            <div className={`mt-4 rounded-2xl p-5 border ${eligible ? "border-primary/40 bg-primary/5" : "border-border bg-card/40"}`}>
              {eligible ? (
                <>
                  <p className="font-display text-2xl">{t.eligibleTitle}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{t.eligibleDesc}</p>
                  <Link to="/walkthrough" className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition">
                    {t.eligibleCta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              ) : (
                <>
                  <p className="font-display text-2xl">{t.notEligibleTitle}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{t.notEligibleDesc}</p>
                  <Link to="/walkthrough" className="mt-4 inline-flex items-center gap-1.5 rounded-full glass px-5 py-2.5 text-sm font-semibold hover:bg-card/80 transition">
                    {t.notEligibleCta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function YesNo({ q, yes, no, value, onChange }: { q: string; yes: string; no: string; value: boolean | null; onChange: (v: boolean) => void }) {
  return (
    <div className="rounded-2xl glass p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <p className="text-sm text-foreground/90">{q}</p>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onChange(true)}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${value === true ? "bg-primary text-primary-foreground" : "bg-card/60 text-foreground/70 hover:bg-card border border-border"}`}
        >{yes}</button>
        <button
          onClick={() => onChange(false)}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${value === false ? "bg-foreground text-background" : "bg-card/60 text-foreground/70 hover:bg-card border border-border"}`}
        >{no}</button>
      </div>
    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-3xl sm:text-4xl font-display text-gradient-saffron">{number}</div>
      <div className="mt-1 text-xs sm:text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function FeatureCard({ to, number, icon, title, desc, gradient }: { to: "/walkthrough" | "/dates" | "/assistant"; number: string; icon: React.ReactNode; title: string; desc: string; gradient: string }) {
  return (
    <Link to={to} className="group relative overflow-hidden rounded-3xl glass p-7 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500"
        style={{ background: gradient }} />
      <div className="relative flex items-start justify-between">
        <span className="inline-flex w-11 h-11 rounded-2xl items-center justify-center text-primary-foreground"
          style={{ background: gradient }}>{icon}</span>
        <span className="text-xs font-mono text-muted-foreground/60">{number}</span>
      </div>
      <h3 className="relative mt-6 text-2xl font-display">{title}</h3>
      <p className="relative mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
      <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground group-hover:gap-3 transition-all">
        Explore <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  );
}

function FactCard({ icon, kicker, title, desc, gradient }: { icon: React.ReactNode; kicker: string; title: string; desc: string; gradient: string }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl glass p-6 hover:-translate-y-1 hover:border-primary/30 transition-all duration-300">
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-20 group-hover:opacity-40 blur-2xl transition-opacity duration-500"
        style={{ background: gradient }} />
      <div className="relative flex items-center justify-between">
        <span className="inline-flex w-11 h-11 rounded-2xl items-center justify-center text-primary-foreground shadow-[var(--shadow-glow)]"
          style={{ background: gradient }}>{icon}</span>
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/70">{kicker}</span>
      </div>
      <div className="relative mt-5 text-3xl font-display text-gradient-saffron">{title}</div>
      <p className="relative mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
