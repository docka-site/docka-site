import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { COPY } from "@/config/content";

const SAILBOAT_PHOTO = `${import.meta.env.BASE_URL}images/hero-sailboat-v3.png`;

export default function Landing() {
  const scrollToForm = () => {
    document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout>
      {/* ── 1. HERO + BARRA ── */}
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", marginTop: "-80px" }}>
        <section
          style={{
            position: "relative",
            flex: "1 1 auto",
            overflow: "hidden",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url('${SAILBOAT_PHOTO}')`,
              backgroundSize: "cover",
              backgroundPosition: "center right",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(5,12,28,0.92) 0%, rgba(5,12,28,0.82) 35%, rgba(5,12,28,0.60) 58%, rgba(5,12,28,0.50) 75%, rgba(5,12,28,0.40) 100%)",
            }}
          />

          <div style={{ position: "relative", zIndex: 2, maxWidth: "80rem", margin: "0 auto", padding: "6rem 2rem 3rem", width: "100%" }}>
            <div style={{ maxWidth: 640 }}>
              <h1
                className="animate-fade-up"
                style={{
                  opacity: 0,
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2.4rem, 4.8vw, 4rem)",
                  lineHeight: 1.0,
                  textTransform: "none",
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                <span style={{ color: "#ffffff", display: "block" }}>{COPY.hero.title}</span>
                <span style={{ color: "var(--tech-green)", display: "block" }}>{COPY.hero.titleHighlight}</span>
              </h1>

              <p
                className="animate-fade-up delay-1"
                style={{
                  opacity: 0,
                  color: "rgba(255,255,255,0.72)",
                  fontSize: "1rem",
                  lineHeight: 1.65,
                  margin: "20px 0 0",
                  maxWidth: 420,
                  fontFamily: "'Hind', sans-serif",
                }}
              >
                {COPY.hero.subtitle}
              </p>

              <div className="animate-fade-up delay-2" style={{ opacity: 0, marginTop: 28 }}>
                <button
                  onClick={scrollToForm}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    background: "var(--tech-green)",
                    color: "#0d1b3e",
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "0.82rem 2rem",
                    borderRadius: "50px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--tech-green-dark)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--tech-green)";
                  }}
                >
                  {COPY.hero.cta}
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="animate-fade-up delay-3" style={{ opacity: 0, marginTop: 28, display: "flex", alignItems: "flex-start", gap: 10 }}>
                <svg width="16" height="16" fill="none" stroke="var(--tech-green)" strokeWidth="1.5" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <span style={{ color: "rgba(255,255,255,0.50)", fontSize: "0.8rem", fontFamily: "'Hind', sans-serif", lineHeight: 1.55 }}>
                  {COPY.hero.trustline}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── BARRA DE DIFERENCIAIS ── */}
        <section style={{ background: "#0d1b3e", borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
          <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
              {[
                {
                  icon: (
                    <svg width="24" height="24" fill="none" stroke="var(--tech-green)" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
                    </svg>
                  ),
                  title: "GESTÃO DE RISCOS",
                  desc: "Estratégias completas para proteger o que mais importa: seu negócio.",
                },
                {
                  icon: (
                    <svg width="24" height="24" fill="none" stroke="var(--tech-green)" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/>
                    </svg>
                  ),
                  title: "FOCO NO CRESCIMENTO",
                  desc: "Soluções que acompanham cada etapa da jornada da sua empresa.",
                },
                {
                  icon: (
                    <svg width="24" height="24" fill="none" stroke="var(--tech-green)" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
                    </svg>
                  ),
                  title: "EXPERTISE EM TECNOLOGIA",
                  desc: "Entendemos os desafios do ecossistema de inovação e famos junto com você.",
                },
                {
                  icon: (
                    <svg width="24" height="24" fill="none" stroke="var(--tech-green)" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0121 12c0 .778-.099 1.533-.284 2.253M3 12c0 .778.099 1.533.284 2.253"/>
                    </svg>
                  ),
                  title: "PARCEIROS LÍDERES",
                  desc: "Acesso às melhores seguradoras e soluções do mercado global.",
                },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  style={{
                    padding: "0.6rem 1.6rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <div>{icon}</div>
                  <div
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {title}
                  </div>
                  <div style={{ fontFamily: "'Hind', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── 2. O PROBLEMA ── */}
      <section style={{ background: "#fff", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                textTransform: "none",
                color: "var(--navy-800)",
                margin: 0,
              }}
            >
              {COPY.problem.title}
            </h2>
            <div style={{ width: 40, height: 3, background: "var(--tech-green)", margin: "14px auto 0", borderRadius: 2 }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 32 }}>
            {COPY.problem.items.map((item) => (
              <div key={item.title} className="fade-in" style={{ padding: "1.5rem" }}>
                <div style={{ fontSize: "2rem", marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "var(--navy-800)", margin: "0 0 10px" }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: "'Hind', sans-serif", fontSize: "0.875rem", color: "rgba(13,31,78,0.6)", lineHeight: 1.7, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. COBERTURA ── */}
      <section style={{ background: "var(--cream-100)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", color: "var(--navy-800)", margin: 0 }}>
              {COPY.coverage.title}
            </h2>
            <div style={{ width: 40, height: 3, background: "var(--tech-green)", margin: "14px auto 0", borderRadius: 2 }} />
            <p style={{ fontFamily: "'Hind', sans-serif", color: "rgba(13,31,78,0.5)", marginTop: 12, marginBottom: 0 }}>
              {COPY.coverage.subtitle}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 28 }}>
            {COPY.coverage.items.map((item) => (
              <div
                key={item.title}
                className="fade-in"
                style={{
                  background: "#fff",
                  border: "1px solid var(--cream-200)",
                  borderRadius: 8,
                  padding: 24,
                }}
              >
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1rem", fontWeight: 700, color: "var(--navy-800)", margin: "0 0 10px" }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: "'Hind', sans-serif", fontSize: "0.875rem", color: "rgba(13,31,78,0.6)", lineHeight: 1.7, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <p style={{ fontFamily: "'Hind', sans-serif", fontSize: "0.8rem", color: "rgba(13,31,78,0.5)", fontStyle: "italic", margin: 0 }}>
              {COPY.coverage.disclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. EDUCAÇÃO ── */}
      <section style={{ background: "#fff", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", color: "var(--navy-800)", margin: 0 }}>
              {COPY.education.title}
            </h2>
            <div style={{ width: 40, height: 3, background: "var(--tech-green)", margin: "14px auto 0", borderRadius: 2 }} />
            <p style={{ fontFamily: "'Hind', sans-serif", color: "rgba(13,31,78,0.5)", marginTop: 12, marginBottom: 0 }}>
              {COPY.education.subtitle}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
            {COPY.education.items.map((item) => (
              <div key={item.title} className="fade-in" style={{ padding: "1.5rem" }}>
                <div style={{ width: 50, height: 50, background: "var(--tech-green)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#fff" }}>!</span>
                </div>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "var(--navy-800)", margin: "0 0 10px" }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: "'Hind', sans-serif", fontSize: "0.875rem", color: "rgba(13,31,78,0.6)", lineHeight: 1.7, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. COMO FUNCIONA ── */}
      <section style={{ background: "var(--navy-900)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", color: "#fff", margin: 0 }}>
              {COPY.howItWorks.title}
            </h2>
            <div style={{ width: 40, height: 3, background: "var(--tech-green)", margin: "14px auto 0", borderRadius: 2 }} />
            <p style={{ fontFamily: "'Hind', sans-serif", color: "rgba(255,255,255,0.5)", marginTop: 12, marginBottom: 0 }}>
              {COPY.howItWorks.subtitle}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 28 }}>
            {COPY.howItWorks.items.map((item) => (
              <div key={item.step} className="fade-in" style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    background: "var(--tech-green)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "1.8rem",
                    fontWeight: "bold",
                    color: "#0d1b3e",
                  }}
                >
                  {item.step}
                </div>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#fff", margin: "0 0 10px" }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: "'Hind', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <p style={{ fontFamily: "'Hind', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", margin: 0 }}>
              <strong style={{ color: "#fff" }}>{COPY.howItWorks.result}</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. SOBRE EDUARDO ── */}
      <section style={{ background: "var(--cream-100)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div className="fade-in" style={{ maxWidth: 700 }}>
            <h2
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                color: "var(--navy-800)",
                margin: "0 0 20px",
              }}
            >
              {COPY.about.title}
            </h2>
            <div style={{ width: 40, height: 3, background: "var(--tech-green)", marginBottom: 20, borderRadius: 2 }} />
            <p style={{ fontFamily: "'Hind', sans-serif", color: "rgba(13,31,78,0.65)", fontSize: "0.95rem", lineHeight: 1.75, margin: "0 0 16px" }}>
              {COPY.about.description}
            </p>
            <Link
              href="/sobre"
              style={{
                display: "inline-block",
                marginTop: 20,
                color: "var(--tech-green)",
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
                fontFamily: "'Hind', sans-serif",
              }}
            >
              Ler trajetória completa →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. PARA PARCEIROS ── */}
      <section style={{ background: "#fff", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                color: "var(--navy-800)",
                margin: 0,
              }}
            >
              {COPY.partners.title}
            </h2>
            <div style={{ width: 40, height: 3, background: "var(--tech-green)", margin: "14px auto 0", borderRadius: 2 }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            <div className="fade-in" style={{ background: "var(--cream-100)", border: "1px solid var(--cream-200)", borderRadius: 8, padding: 32 }}>
              <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1.2rem", fontWeight: 700, color: "var(--navy-800)", margin: "0 0 12px" }}>
                {COPY.partners.protect.title}
              </h3>
              <p style={{ fontFamily: "'Hind', sans-serif", fontSize: "0.95rem", color: "rgba(13,31,78,0.6)", lineHeight: 1.7, margin: "0 0 20px" }}>
                {COPY.partners.protect.desc}
              </p>
              <button
                onClick={scrollToForm}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--tech-green)",
                  color: "#0d1b3e",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.78rem 1.5rem",
                  borderRadius: "50px",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--tech-green-dark)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--tech-green)";
                }}
              >
                {COPY.partners.protect.cta}
              </button>
            </div>

            <div className="fade-in" style={{ background: "var(--navy-800)", border: "1px solid var(--navy-800)", borderRadius: 8, padding: 32 }}>
              <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1.2rem", fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>
                {COPY.partners.partner.title}
              </h3>
              <p style={{ fontFamily: "'Hind', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: "0 0 20px" }}>
                {COPY.partners.partner.desc}
              </p>
              <Link
                href="/parceiros"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--tech-green)",
                  color: "#0d1b3e",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.78rem 1.5rem",
                  borderRadius: "50px",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "var(--tech-green-dark)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "var(--tech-green)";
                }}
              >
                {COPY.partners.partner.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section style={{ background: "var(--cream-100)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", color: "var(--navy-800)", margin: 0 }}>
              {COPY.faq.title}
            </h2>
            <div style={{ width: 40, height: 3, background: "var(--tech-green)", margin: "14px auto 0", borderRadius: 2 }} />
          </div>

          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            {COPY.faq.items.map((item, index) => (
              <div key={index} className="fade-in" style={{ marginBottom: 24, background: "#fff", border: "1px solid var(--cream-200)", borderRadius: 8, overflow: "hidden" }}>
                <details style={{ padding: "1.5rem" }}>
                  <summary
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: "var(--navy-800)",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                  >
                    {item.q}
                  </summary>
                  <p
                    style={{
                      fontFamily: "'Hind', sans-serif",
                      fontSize: "0.875rem",
                      color: "rgba(13,31,78,0.6)",
                      lineHeight: 1.7,
                      margin: "12px 0 0",
                    }}
                  >
                    {item.a}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. CTA FINAL + FORMULÁRIO ── */}
      <section id="form" style={{ background: "var(--navy-900)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                color: "#fff",
                margin: 0,
                textTransform: "none",
              }}
            >
              Pronto para começar?
            </h2>
            <p style={{ fontFamily: "'Hind', sans-serif", color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.7, margin: "16px 0 0", maxWidth: 500 }}>
              Preencha o formulário abaixo para solicitar sua análise técnica. Responderemos em até 1 dia útil.
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              padding: 40,
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            <form style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <input
                  type="text"
                  placeholder="Seu nome"
                  style={{
                    fontFamily: "'Hind', sans-serif",
                    fontSize: "0.9rem",
                    padding: "10px 14px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 6,
                    background: "rgba(255,255,255,0.05)",
                    color: "#fff",
                  }}
                  onFocus={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                  onBlur={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                />
                <input
                  type="text"
                  placeholder="Sua empresa"
                  style={{
                    fontFamily: "'Hind', sans-serif",
                    fontSize: "0.9rem",
                    padding: "10px 14px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 6,
                    background: "rgba(255,255,255,0.05)",
                    color: "#fff",
                  }}
                  onFocus={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                  onBlur={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                />
              </div>
              <input
                type="email"
                placeholder="Email corporativo"
                style={{
                  fontFamily: "'Hind', sans-serif",
                  fontSize: "0.9rem",
                  padding: "10px 14px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.05)",
                  color: "#fff",
                }}
                onFocus={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                onBlur={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
              />
              <input
                type="tel"
                placeholder="WhatsApp (com DDD)"
                style={{
                  fontFamily: "'Hind', sans-serif",
                  fontSize: "0.9rem",
                  padding: "10px 14px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.05)",
                  color: "#fff",
                }}
                onFocus={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                onBlur={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
              />
              <textarea
                placeholder="Conte um pouco sobre sua empresa (opcional)"
                rows={4}
                style={{
                  fontFamily: "'Hind', sans-serif",
                  fontSize: "0.9rem",
                  padding: "10px 14px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.05)",
                  color: "#fff",
                  resize: "none",
                }}
                onFocus={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                onBlur={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
              />
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                <input
                  type="checkbox"
                  style={{ marginTop: 4 }}
                  required
                />
                <span>Concordo com a política de privacidade e desejo receber informações sobre a Docka Seguros</span>
              </label>
              <button
                type="submit"
                style={{
                  background: "var(--tech-green)",
                  color: "#0d1b3e",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "1rem",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--tech-green-dark)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--tech-green)";
                }}
              >
                Solicitar Análise
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
