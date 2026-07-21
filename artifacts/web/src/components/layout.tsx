import { ReactNode, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";

interface LayoutProps {
  children: ReactNode;
}

const NAV_H = 80;

const navLinks = [
  { label: "HOME",      href: "/" },
  { label: "Embedded",  href: "/embedded" },
  { label: "Sobre Nós", href: "/sobre" },
];

const produtosLinks = [
  { label: "RC Profissional", href: "/eo" },
  { label: "Riscos Cibernéticos", href: "/cyber" },
  { label: "RC Diretores", href: "/dao" },
];

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [produtosOpen, setProdutosOpen] = useState(false);
  const [mobileProdutosOpen, setMobileProdutosOpen] = useState(false);
  const produtosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{`
        .docka-nav-desktop { display: flex; }
        .docka-nav-mobile-btn { display: none; }
        @media (max-width: 767px) {
          .docka-nav-desktop { display: none !important; }
          .docka-nav-mobile-btn { display: flex !important; }
        }
      `}</style>

      {/* ── Navbar fixa — transparente no topo, solid ao rolar ── */}
      <nav id="navbar" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(5,12,28,0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.3)" : "none",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        transition: "background 0.35s ease, border-color 0.35s, box-shadow 0.35s",
      }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: NAV_H }}>

            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 3, textDecoration: "none" }}>
              {/* Bússola */}
              <svg width="46" height="46" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="35" stroke="white" strokeWidth="4"/>
                <line x1="50" y1="10" x2="50" y2="20" stroke="white" strokeWidth="4.5" strokeLinecap="round"/>
                <line x1="90" y1="50" x2="80" y2="50" stroke="white" strokeWidth="4.5" strokeLinecap="round"/>
                <line x1="50" y1="90" x2="50" y2="80" stroke="white" strokeWidth="4.5" strokeLinecap="round"/>
                <line x1="10" y1="50" x2="20" y2="50" stroke="white" strokeWidth="4.5" strokeLinecap="round"/>
                <path d="M50,20 L59,50 L50,80 L41,50 Z" stroke="white" strokeWidth="4.5" strokeLinejoin="round"/>
              </svg>
              {/* Texto */}
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                <span style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600, fontSize: "1.4rem",
                  color: "#ffffff", letterSpacing: "0.005em",
                }}>Docka</span>
                <span style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 500, fontSize: "0.62rem",
                  color: "rgba(255,255,255,0.75)", letterSpacing: "0.2em",
                  textTransform: "uppercase", marginTop: 1,
                }}>Seguros</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div style={{ alignItems: "center", gap: "1.75rem" }} className="docka-nav-desktop">
              {/* HOME */}
              <Link href="/" className={`nav-link${location === "/" ? " active" : ""}`}>HOME</Link>

              {/* PRODUTOS dropdown */}
              <div ref={produtosRef} style={{ position: "relative" }}
                onMouseEnter={() => setProdutosOpen(true)}
                onMouseLeave={() => setProdutosOpen(false)}
              >
                <button className={`nav-link${produtosLinks.some(p => location === p.href) ? " active" : ""}`}
                  style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, padding: 0 }}
                >
                  PRODUTOS
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transition: "transform 0.2s", transform: produtosOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {produtosOpen && (
                  <div style={{
                    position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)",
                    paddingTop: 12,
                    zIndex: 100,
                  }}>
                  <div style={{
                    background: "rgba(5,12,28,0.97)", backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
                    padding: "8px 0", minWidth: 220,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  }}>
                    {produtosLinks.map(({ label, href }) => (
                      <Link key={label} href={href} onClick={() => setProdutosOpen(false)}
                        style={{
                          display: "block", padding: "10px 20px", whiteSpace: "nowrap",
                          color: location === href ? "var(--tech-green)" : "rgba(255,255,255,0.75)",
                          fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em",
                          textTransform: "uppercase", textDecoration: "none",
                          fontFamily: "'Montserrat', sans-serif",
                          transition: "color 0.15s",
                        }}
                        onMouseEnter={e => { if (location !== href) e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={e => { if (location !== href) e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                  </div>
                )}
              </div>

              {/* Remaining links (Embedded, Sobre Nós) */}
              {navLinks.slice(1).map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className={`nav-link${location === href ? " active" : ""}`}
                >
                  {label}
                </Link>
              ))}

              {/* ACESSE SUA CONTA — ghost sutil */}
              <Link href="/portal" style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.72rem", fontWeight: 600,
                color: "#fff",
                background: "transparent",
                padding: "0.48rem 1.4rem",
                borderRadius: "50px",
                textDecoration: "none",
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                border: "1.5px solid var(--tech-green)",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(139,195,74,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                ACESSE SUA CONTA
              </Link>
            </div>

            {/* Mobile menu btn */}
            <button
              className="docka-nav-mobile-btn"
              onClick={() => setMobileOpen(v => !v)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", padding: 4, alignItems: "center" }}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{ background: "rgba(5,12,28,0.97)", backdropFilter: "blur(8px)", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "1rem 2rem 1.5rem" }}>
            {/* HOME */}
            <Link href="/" onClick={() => setMobileOpen(false)}
              style={{ display: "block", color: "rgba(255,255,255,0.7)", padding: "0.65rem 0", fontSize: "0.9rem", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.06)", fontFamily: "'Hind', sans-serif" }}>
              HOME
            </Link>
            {/* PRODUTOS expandable */}
            <div>
              <button onClick={() => setMobileProdutosOpen(v => !v)}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", padding: "0.65rem 0", fontSize: "0.9rem", cursor: "pointer", fontFamily: "'Hind', sans-serif" }}>
                PRODUTOS
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: mobileProdutosOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {mobileProdutosOpen && produtosLinks.map(({ label, href }) => (
                <Link key={label} href={href} onClick={() => { setMobileOpen(false); setMobileProdutosOpen(false); }}
                  style={{ display: "block", color: "rgba(255,255,255,0.55)", padding: "0.5rem 0 0.5rem 1rem", fontSize: "0.85rem", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.04)", fontFamily: "'Hind', sans-serif" }}>
                  {label}
                </Link>
              ))}
            </div>
            {/* Remaining links */}
            {navLinks.slice(1).map(({ label, href }) => (
              <Link key={label} href={href} onClick={() => setMobileOpen(false)}
                style={{ display: "block", color: "rgba(255,255,255,0.7)", padding: "0.65rem 0", fontSize: "0.9rem", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.06)", fontFamily: "'Hind', sans-serif" }}>
                {label}
              </Link>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "1.25rem" }}>
              <Link href="/portal" onClick={() => setMobileOpen(false)} style={{
                display: "block", textAlign: "center", padding: "0.65rem",
                border: "1px solid rgba(255,255,255,0.3)", borderRadius: 3,
                color: "#fff", fontSize: "0.8rem", fontWeight: 600,
                letterSpacing: "0.06em", textDecoration: "none", fontFamily: "'Hind', sans-serif",
              }}>
                ACESSE SUA CONTA
              </Link>
              <Link href="/analise" onClick={() => setMobileOpen(false)} style={{
                display: "block", textAlign: "center", padding: "0.65rem",
                border: "1.5px solid rgba(255,255,255,0.75)", borderRadius: 3,
                color: "#fff", fontSize: "0.8rem", fontWeight: 700,
                letterSpacing: "0.09em", textDecoration: "none", fontFamily: "'Montserrat', sans-serif",
                textTransform: "uppercase",
              }}>
                SOLICITAR ANÁLISE
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── Content — paddingTop para não esconder atrás da navbar fixa ── */}
      <main style={{ flex: 1, paddingTop: NAV_H }}>
        {children}
      </main>

      {/* ── Footer ── */}
      <footer id="footer" style={{ background: "var(--navy-950)", color: "rgba(255,255,255,0.5)" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "4rem 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "2rem", paddingBottom: "2.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div>
              <div style={{ marginBottom: "1.25rem" }}>
                <img
                  src={`${import.meta.env.BASE_URL}images/docka-logo-horizontal.png`}
                  alt="Docka Seguros"
                  style={{ height: 44, width: "auto", opacity: 0.85 }}
                />
              </div>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.7, maxWidth: 240, margin: "0 0 8px", fontFamily: "'Hind', sans-serif" }}>
                Corretora especializada em D&amp;O, Cyber e E&amp;O para fintechs e startups brasileiras.
              </p>
              <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.2)", margin: 0, fontFamily: "'Hind', sans-serif" }}>contato@dockaseguros.com.br</p>
            </div>

            <div>
              <h4 style={{ fontSize: "0.72rem", fontWeight: 600, color: "#fff", margin: "0 0 1rem", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Montserrat', sans-serif" }}>Produtos</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {[{ label: "RC Profissional", href: "/eo" }, { label: "Riscos Cibernéticos", href: "/cyber" }, { label: "RC Diretores", href: "/dao" }, { label: "Embedded", href: "/embedded" }].map(({ label, href }) => (
                  <Link key={label} href={href} style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.35)", textDecoration: "none", fontFamily: "'Hind', sans-serif", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: "0.72rem", fontWeight: 600, color: "#fff", margin: "0 0 1rem", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Montserrat', sans-serif" }}>Empresa</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {[{ label: "Sobre", href: "/sobre" }, { label: "Avaliação de risco", href: "/analise" }].map(({ label, href }) => (
                  <Link key={label} href={href} style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.35)", textDecoration: "none", fontFamily: "'Hind', sans-serif", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                  >
                    {label}
                  </Link>
                ))}
                <Link href="/portal" style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.35)", textDecoration: "none", fontFamily: "'Hind', sans-serif", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                >
                  Acesse sua conta
                </Link>
                <a href="mailto:contato@dockaseguros.com.br" style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.35)", textDecoration: "none", fontFamily: "'Hind', sans-serif", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                >
                  Contato
                </a>
              </div>
            </div>
          </div>

          <div style={{ paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
            <p style={{ fontSize: "0.73rem", color: "rgba(255,255,255,0.18)", margin: 0, fontFamily: "'Hind', sans-serif" }}>
              © {new Date().getFullYear()} Docka Seguros. Todos os direitos reservados.
            </p>
            <p style={{ fontSize: "0.73rem", color: "rgba(255,255,255,0.18)", margin: 0, fontFamily: "'Hind', sans-serif" }}>
              Habilitada SUSEP · Corretora de seguros
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
