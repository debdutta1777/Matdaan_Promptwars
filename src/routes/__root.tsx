import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Vote } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageProvider } from "@/components/language-provider";
import { LanguageSelector } from "@/components/language-selector";
import { LocationProvider } from "@/components/location-provider";
import { StateSelector } from "@/components/state-selector";
import { LocationPrompt } from "@/components/location-prompt";
import { FeedbackButton } from "@/components/feedback-button";

const themeInitScript = `(function(){try{var t=localStorage.getItem('matdaan.theme');var d=t?t==='dark':window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;if(d){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display font-semibold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Matdaan — Your first vote, made simple" },
      { name: "description", content: "A friendly guide to India's election process for first-time voters. Step-by-step walkthrough, key dates, and an AI assistant." },
      { property: "og:title", content: "Matdaan — Your first vote, made simple" },
      { property: "og:description", content: "A friendly guide to India's election process for first-time voters." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=JetBrains+Mono:wght@400;500&display=swap" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function Header() {
  const linkCls = "px-3.5 py-2 rounded-full text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-card/60 transition";
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/60 border-b border-border/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="w-9 h-9 rounded-xl flex items-center justify-center shadow-[var(--shadow-glow)] text-primary-foreground"
            style={{ background: "var(--gradient-saffron)" }}>
            <Vote className="w-5 h-5" />
          </span>
          <span className="font-display text-xl">Matdaan</span>
        </Link>
        <nav className="flex items-center gap-1">
          <Link to="/walkthrough" className={linkCls} activeProps={{ className: linkCls + " !bg-card/80 !text-foreground" }}>Walkthrough</Link>
          <Link to="/dates" className={linkCls} activeProps={{ className: linkCls + " !bg-card/80 !text-foreground" }}>Key dates</Link>
          <Link to="/assistant" className="ml-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition" activeProps={{ className: "ml-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground shadow-[var(--shadow-glow)]" }}>
            Ask AI
          </Link>
          <div className="ml-1.5 flex items-center gap-1.5">
            <StateSelector />
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/40 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-sm text-muted-foreground flex flex-col sm:flex-row justify-between gap-4">
        <p className="max-w-2xl leading-relaxed">Made for first-time Indian voters. Informational only — verify details on official sources like <a className="text-foreground hover:text-primary transition underline-offset-4 hover:underline" href="https://eci.gov.in" target="_blank" rel="noreferrer">eci.gov.in</a> and <a className="text-foreground hover:text-primary transition underline-offset-4 hover:underline" href="https://voters.eci.gov.in" target="_blank" rel="noreferrer">voters.eci.gov.in</a>.</p>
        <p className="font-mono text-xs">© {new Date().getFullYear()} MATDAAN</p>
      </div>
    </footer>
  );
}

function RootComponent() {
  return (
    <LanguageProvider>
      <LocationProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
          <Toaster />
          <LocationPrompt />
          <FeedbackButton />
        </div>
      </LocationProvider>
    </LanguageProvider>
  );
}
