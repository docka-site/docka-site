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
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                  margin: 0,
                  color: "#ffffff",
                }}
              >
                <span style={{ color: "#ffffff", display: "block", fontWeight: 600 }}>REDUZINDO</span>
                <span style={{ color: "var(--tech-green)", display: "block", fontWeight: 500 }}>PREJUÍZOS E PROTEGENDO SUA REPUTAÇÃO</span>
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
            {COPY.problem.items.map((item, index) => {
              const icons = [
                // Documento - Para custos de defesa legal
                <svg key="document" width="24" height="24" fill="none" stroke="var(--tech-green)" strokeWidth="1.5" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="12" y1="13" x2="8" y2="13"/>
                  <line x1="12" y1="17" x2="8" y2="17"/>
                </svg>,
                // Escudo com Checkmark - Para conformidade/requisito
                <svg key="shield-check" width="24" height="24" fill="none" stroke="var(--tech-green)" strokeWidth="1.5" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                  <path d="M12 22s-8-4-8-10V5l8-3 8 3v7c0 6-8 10-8 10z"/>
                  <polyline points="9 12 11 14 15 10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
                // Escudo com Alerta - Para proteção inadequada
                <svg key="shield-alert" width="24" height="24" fill="none" stroke="var(--tech-green)" strokeWidth="1.5" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                  <path d="M12 22s-8-4-8-10V5l8-3 8 3v7c0 6-8 10-8 10z"/>
                  <line x1="12" y1="8" x2="12" y2="13"/>
                  <circle cx="12" cy="16" r="1"/>
                </svg>,
              ];
              return (
                <div key={index} className="fade-in" style={{ padding: "1.5rem", display: "flex", gap: 12 }}>
                  <div style={{ flexShrink: 0 }}>
                    {icons[index]}
                  </div>
                  <p style={{ fontFamily: "'Hind', sans-serif", fontSize: "0.95rem", color: "rgba(13,31,78,0.65)", lineHeight: 1.7, margin: 0 }}>
                    {item}
                  </p>
                </div>
              );
            })}
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
                key={item.name}
                className="fade-in"
                style={{
                  background: "#fff",
                  border: "1px solid var(--cream-200)",
                  borderRadius: 8,
                  padding: 24,
                }}
              >
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1rem", fontWeight: 700, color: "var(--navy-800)", margin: "0 0 10px" }}>
                  {item.name}
                </h3>
                <p style={{ fontFamily: "'Hind', sans-serif", fontSize: "0.875rem", color: "rgba(13,31,78,0.6)", lineHeight: 1.7, margin: 0 }}>
                  {item.desc}
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
            {COPY.education.items.map((item, index) => {
              const icons = [
                // Calendário - Para Retroatividade (tempo/histórico)
                <svg key="calendar" width="32" height="32" fill="none" stroke="#fff" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <path d="M16 2v4M8 2v4"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>,
                // Escudo com Checkmark - Para Limite Adequado (proteção confirmada)
                <svg key="shield" width="32" height="32" fill="none" stroke="#fff" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 22s-8-4-8-10V5l8-3 8 3v7c0 6-8 10-8 10z"/>
                  <polyline points="9 12 11 14 15 10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
                // Dois Escudos - Para RC Prof ≠ Cyber (comparação/diferença)
                <svg key="compare" width="32" height="32" fill="none" stroke="#fff" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 22s-5-3-5-7V6l5-2.5 5 2.5v9c0 4-5 7-5 7z"/>
                  <path d="M12 22s5-3 5-7V6l-5-2.5L7 6v9c0 4 5 7 5 7z" opacity="0.5"/>
                </svg>,
              ];
              return (
                <div key={item.title} className="fade-in" style={{ padding: "1.5rem" }}>
                  <div style={{ width: 50, height: 50, background: "var(--tech-green)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    {icons[index]}
                  </div>
                  <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "var(--navy-800)", margin: "0 0 10px" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: "'Hind', sans-serif", fontSize: "0.875rem", color: "rgba(13,31,78,0.6)", lineHeight: 1.7, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. COMO FUNCIONA ── */}
      <section style={{ background: "#fff", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "1rem" }}>
            <div style={{ display: "inline-block", border: "2px solid var(--gold-500)", borderRadius: "50px", padding: "6px 16px", marginBottom: 24 }}>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "var(--gold-500)", letterSpacing: "0.1em", textTransform: "uppercase" }}>NOSSO FORMATO</span>
            </div>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", color: "var(--navy-800)", margin: "0 0 12px" }}>
              {COPY.howItWorks.title}
            </h2>
            <div style={{ width: 40, height: 3, background: "var(--tech-green)", margin: "0 auto 20px", borderRadius: 2 }} />
            <p style={{ fontFamily: "'Hind', sans-serif", color: "rgba(13,31,78,0.65)", marginTop: 0, marginBottom: 0, maxWidth: 700, margin: "0 auto", fontSize: "1rem", lineHeight: 1.7 }}>
              {COPY.howItWorks.intro}
            </p>
          </div>

          <div style={{ marginTop: "4rem" }}>
            {COPY.howItWorks.items.map((item, index) => {
              const imageMap: { [key: string]: string } = {
                "01": `${import.meta.env.BASE_URL}images/process-01-analise.jpg`,
                "02": `${import.meta.env.BASE_URL}images/process-02-cotacao.jpg`,
                "03": `${import.meta.env.BASE_URL}images/process-03-recomendacao.webp`,
                "04": `${import.meta.env.BASE_URL}images/process-04-contratacao.webp`,
                "05": `${import.meta.env.BASE_URL}images/process-05-gestao.webp`,
              };
              return (
                <div key={item.step} className="fade-in" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", marginBottom: index < COPY.howItWorks.items.length - 1 ? "4rem" : 0, gridAutoFlow: index % 2 === 1 ? "dense" : "row" }}>
                  <div style={{ order: index % 2 === 1 ? 2 : 1 }}>
                    <div style={{ width: 120, height: 120, background: "transparent", border: "3px solid var(--gold-500)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                      <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "3.5rem", fontWeight: 300, color: "var(--gold-500)", lineHeight: 1 }}>
                        {item.step}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1.4rem", fontWeight: 700, color: "var(--gold-500)", margin: "0 0 12px" }}>
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: "'Hind', sans-serif", fontSize: "0.95rem", color: "rgba(13,31,78,0.65)", lineHeight: 1.8, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                  <div style={{ order: index % 2 === 1 ? 1 : 2, borderRadius: 8, height: 320, overflow: "hidden" }}>
                    <img
                      src={imageMap[item.step]}
                      alt={item.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                </div>
              );
            })}
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
              background: "#fff",
              border: "1px solid var(--cream-200)",
              borderRadius: 10,
              padding: 40,
              maxWidth: 700,
              margin: "0 auto",
            }}
          >
            <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--navy-800)", margin: "0 0 24px", textAlign: "center" }}>
              Solicitar Análise Gratuita
            </h3>
            <p style={{ fontFamily: "'Hind', sans-serif", fontSize: "0.9rem", color: "rgba(13,31,78,0.6)", textAlign: "center", margin: "0 0 24px" }}>
              Receba uma recomendação técnica personalizada
            </p>
            <form style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "var(--navy-800)", marginBottom: 6, display: "block", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Nome
                  </label>
                  <input
                    type="text"
                    placeholder="Seu nome completo"
                    style={{
                      width: "100%",
                      fontFamily: "'Hind', sans-serif",
                      fontSize: "0.9rem",
                      padding: "12px 14px",
                      border: "1px solid var(--cream-200)",
                      borderRadius: 6,
                      background: "#fff",
                      color: "var(--navy-800)",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "var(--navy-800)", marginBottom: 6, display: "block", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    style={{
                      width: "100%",
                      fontFamily: "'Hind', sans-serif",
                      fontSize: "0.9rem",
                      padding: "12px 14px",
                      border: "1px solid var(--cream-200)",
                      borderRadius: 6,
                      background: "#fff",
                      color: "var(--navy-800)",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "var(--navy-800)", marginBottom: 6, display: "block", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Telefone
                  </label>
                  <input
                    type="tel"
                    placeholder="(11) 9 0000-0000"
                    style={{
                      width: "100%",
                      fontFamily: "'Hind', sans-serif",
                      fontSize: "0.9rem",
                      padding: "12px 14px",
                      border: "1px solid var(--cream-200)",
                      borderRadius: 6,
                      background: "#fff",
                      color: "var(--navy-800)",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "var(--navy-800)", marginBottom: 6, display: "block", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Empresa
                  </label>
                  <input
                    type="text"
                    placeholder="Nome da empresa"
                    style={{
                      width: "100%",
                      fontFamily: "'Hind', sans-serif",
                      fontSize: "0.9rem",
                      padding: "12px 14px",
                      border: "1px solid var(--cream-200)",
                      borderRadius: 6,
                      background: "#fff",
                      color: "var(--navy-800)",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "var(--navy-800)", marginBottom: 6, display: "block", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Tecnologia
                  </label>
                  <select style={{
                    width: "100%",
                    fontFamily: "'Hind', sans-serif",
                    fontSize: "0.9rem",
                    padding: "12px 14px",
                    border: "1px solid var(--cream-200)",
                    borderRadius: 6,
                    background: "#fff",
                    color: "var(--navy-800)",
                    boxSizing: "border-box",
                  }}>
                    <option>Selecione</option>
                    <option>SaaS</option>
                    <option>Desenvolvimento de Software</option>
                    <option>Consultoria Tech</option>
                    <option>Agência Digital</option>
                    <option>Infraestrutura</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "var(--navy-800)", marginBottom: 6, display: "block", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Faturamento Anual
                  </label>
                  <select style={{
                    width: "100%",
                    fontFamily: "'Hind', sans-serif",
                    fontSize: "0.9rem",
                    padding: "12px 14px",
                    border: "1px solid var(--cream-200)",
                    borderRadius: 6,
                    background: "#fff",
                    color: "var(--navy-800)",
                    boxSizing: "border-box",
                  }}>
                    <option>Selecione</option>
                    <option>Até R$ 500k</option>
                    <option>R$ 500k - R$ 2M</option>
                    <option>R$ 2M - R$ 5M</option>
                    <option>R$ 5M - R$ 10M</option>
                    <option>Acima de R$ 10M</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "var(--navy-800)", marginBottom: 6, display: "block", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Mensagem (opcional)
                </label>
                <textarea
                  placeholder="Conte sobre sua empresa e necessidades de seguro..."
                  rows={4}
                  style={{
                    width: "100%",
                    fontFamily: "'Hind', sans-serif",
                    fontSize: "0.9rem",
                    padding: "12px 14px",
                    border: "1px solid var(--cream-200)",
                    borderRadius: 6,
                    background: "#fff",
                    color: "var(--navy-800)",
                    resize: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: "0.8rem", color: "rgba(13,31,78,0.65)" }}>
                <input
                  type="checkbox"
                  style={{ marginTop: 4, cursor: "pointer" }}
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
