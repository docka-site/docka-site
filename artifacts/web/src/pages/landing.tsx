import { Layout } from "@/components/layout";
import { Link } from "wouter";

const SAILBOAT_PHOTO = `${import.meta.env.BASE_URL}images/hero-sailboat-v3.png`;

export default function Landing() {
  return (
    <Layout>

      {/* ── HERO + BARRA ── juntos preenchem exatamente 100vh, sem sobrar nem faltar */}
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", marginTop: "-80px" }}>
      <section style={{
        position: "relative",
        flex: "1 1 auto",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-start",
      }}>
        {/* Foto do veleiro */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url('${SAILBOAT_PHOTO}')`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
        }} />

        {/* Overlay gradiente: sólido navy à esquerda, transparente à direita */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(5,12,28,0.92) 0%, rgba(5,12,28,0.82) 35%, rgba(5,12,28,0.60) 58%, rgba(5,12,28,0.50) 75%, rgba(5,12,28,0.40) 100%)",
        }} />

        {/* Conteúdo — começa no topo */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: "80rem", margin: "0 auto", padding: "6rem 2rem 3rem", width: "100%" }}>
          <div style={{ maxWidth: 640 }}>

            <h1 className="animate-fade-up" style={{
              opacity: 0,
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.4rem, 4.8vw, 4rem)",
              lineHeight: 1.0,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              margin: 0,
            }}>
              <span style={{ color: "#ffffff", display: "block", fontWeight: 600 }}>CRESÇA</span>
              <span style={{ color: "var(--tech-green)", display: "block", whiteSpace: "nowrap", fontWeight: 500 }}>COM CONFIANÇA</span>
            </h1>

            <p className="animate-fade-up delay-1" style={{
              opacity: 0,
              color: "rgba(255,255,255,0.72)",
              fontSize: "1rem",
              lineHeight: 1.65,
              margin: "20px 0 0",
              maxWidth: 420,
              fontFamily: "'Hind', sans-serif",
            }}>
              Proteção e gestão de riscos para startups, fintechs e empresas de tecnologia que estão construindo o futuro.
            </p>

            <div className="animate-fade-up delay-2" style={{ opacity: 0, marginTop: 28 }}>
              <Link href="/analise" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "var(--tech-green)", color: "#0d1b3e",
                fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
                fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "0.82rem 2rem", borderRadius: "50px",
                textDecoration: "none", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--tech-green-dark)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--tech-green)"; }}
              >
                AGENDAR DIAGNÓSTICO
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>

            {/* Trust line — 2 linhas como na referência */}
            <div className="animate-fade-up delay-3" style={{ opacity: 0, marginTop: 28, display: "flex", alignItems: "flex-start", gap: 10 }}>
              <svg width="16" height="16" fill="none" stroke="var(--tech-green)" strokeWidth="1.5" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
              </svg>
              <span style={{ color: "rgba(255,255,255,0.50)", fontSize: "0.8rem", fontFamily: "'Hind', sans-serif", lineHeight: 1.55 }}>
                Soluções personalizadas. Atendimento especialista.<br />
                Parceiros líderes de mercado.
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ── BARRA DE DIFERENCIAIS ── fundo navy escuro, 4 colunas */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3 12c0 .778.099 1.533.284 2.253"/>
                  </svg>
                ),
                title: "PARCEIROS LÍDERES",
                desc: "Acesso às melhores seguradoras e soluções do mercado global.",
              },
            ].map(({ icon, title, desc }, i) => (
              <div key={title} style={{
                padding: "0.6rem 1.6rem",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
                display: "flex", flexDirection: "column", gap: 4,
              }}>
                <div>{icon}</div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem", fontWeight: 700, color: "#fff", letterSpacing: "0.12em", textTransform: "uppercase" }}>{title}</div>
                <div style={{ fontFamily: "'Hind', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>

      {/* ── SOLUÇÕES ── fundo branco, 6 colunas com ícones SVG */}
      <section id="solucoes" style={{ background: "#fff", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>

          <div className="fade-in" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 style={{
              fontFamily: "'Montserrat', sans-serif", fontWeight: 800,
              fontSize: "clamp(1.1rem, 2.5vw, 1.45rem)",
              textTransform: "uppercase", letterSpacing: "0.1em",
              color: "var(--navy-800)", margin: 0,
            }}>SOLUÇÕES PARA EMPRESAS QUE INOVAM</h2>
            <div style={{ width: 40, height: 3, background: "var(--tech-green)", margin: "14px auto 0", borderRadius: 2 }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 32 }}>
            {[
              {
                href: "/cyber",
                icon: (
                  <svg width="40" height="40" fill="none" stroke="var(--navy-700)" strokeWidth="1.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
                  </svg>
                ),
                name: "CYBER RISK",
                desc: "Proteção contra ameaças digitais e vazamento de dados.",
              },
              {
                href: "/dao",
                icon: (
                  <svg width="40" height="40" fill="none" stroke="var(--navy-700)" strokeWidth="1.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
                  </svg>
                ),
                name: "D&O",
                desc: "Proteção para diretores e executivos.",
              },
              {
                href: "/eo",
                icon: (
                  <svg width="40" height="40" fill="none" stroke="var(--navy-700)" strokeWidth="1.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>
                  </svg>
                ),
                name: "ERROS & OMISSÕES",
                desc: "Cobertura para falhas, erros e omissões.",
              },
              {
                href: "/eo",
                icon: (
                  <svg width="40" height="40" fill="none" stroke="var(--navy-700)" strokeWidth="1.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"/>
                  </svg>
                ),
                name: "RISCOS TECNOLÓGICOS",
                desc: "Proteção para infraestrutura, nuvem e sistemas.",
              },
              {
                href: "/sobre",
                icon: (
                  <svg width="40" height="40" fill="none" stroke="var(--navy-700)" strokeWidth="1.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"/>
                  </svg>
                ),
                name: "RESPONSABILIDADE CIVIL",
                desc: "Cobertura para danos corporativos e operacionais.",
              },
              {
                href: "/embedded",
                icon: (
                  <svg width="40" height="40" fill="none" stroke="var(--navy-700)" strokeWidth="1.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                  </svg>
                ),
                name: "BENEFÍCIOS PARA TIMES",
                desc: "Soluções completas para cuidar do seu maior ativo: pessoas.",
              },
            ].map(({ href, icon, name, desc }) => (
              <Link key={name} href={href} style={{ textDecoration: "none", display: "block" }}>
                <div className="fade-in" style={{ textAlign: "center", padding: "1.5rem 1rem", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>{icon}</div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--navy-800)", marginBottom: 10 }}>{name}</div>
                  <p style={{ fontFamily: "'Hind', sans-serif", fontSize: "0.82rem", color: "rgba(13,31,78,0.55)", lineHeight: 1.6, margin: 0 }}>{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIFERENCIAIS ── fundo creme */}
      <section style={{ background: "var(--cream-100)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-label">Por que a Docka</span>
            <h2 className="font-display" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, color: "var(--navy-800)", margin: "8px 0 0" }}>
              Análise técnica antes de qualquer apólice
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
            {[
              { title: "Expertise atuarial", desc: "Lemos cada apólice linha por linha. Exclusões, sub-limites, franquias — identificamos o que realmente importa antes de recomendar qualquer cobertura.", dark: false },
              { title: "Especialistas em fintechs", desc: "Conhecemos os riscos específicos do setor — exigências de investidores, LGPD, compliance com Banco Central. Sua cobertura é estruturada para o seu contexto.", dark: true },
              { title: "Corretora própria", desc: "Da análise à implementação em um só lugar. Se a recomendação técnica fizer sentido, executamos — sem intermediários adicionais.", dark: false },
            ].map(({ title, desc, dark }) => (
              <div key={title} className="fade-in" style={{
                background: dark ? "var(--navy-800)" : "#fff",
                border: `1px solid ${dark ? "var(--navy-800)" : "var(--cream-200)"}`,
                borderRadius: 8, padding: 32,
              }}>
                <div style={{ width: 40, height: 40, background: dark ? "rgba(139,195,74,0.15)" : "var(--navy-800)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <svg width="18" height="18" fill="none" stroke={dark ? "var(--tech-green)" : "var(--tech-green)"} strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.040.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1.05rem", fontWeight: 700, color: dark ? "#fff" : "var(--navy-800)", margin: "0 0 10px" }}>{title}</h3>
                <p style={{ fontFamily: "'Hind', sans-serif", fontSize: "0.875rem", color: dark ? "rgba(255,255,255,0.55)" : "rgba(13,31,78,0.6)", lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA CENTRAL ── */}
      <section style={{ background: "var(--navy-900)", padding: "5rem 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -60, top: 0, bottom: 0, width: "45%", opacity: 0.06 }}>
          <div style={{ width: "100%", height: "100%", backgroundImage: `url('${SAILBOAT_PHOTO}')`, backgroundSize: "cover", backgroundPosition: "center left" }} />
        </div>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }}>
            <div className="fade-in">
              <span className="section-label">Oferta para novas empresas</span>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#fff", lineHeight: 1.1, margin: "8px 0 0", textTransform: "uppercase" }}>
                DIAGNÓSTICO<br />
                <span style={{ color: "var(--tech-green)" }}>GRATUITO</span><br />
                PARA SUA EMPRESA
              </h2>
              <p style={{ fontFamily: "'Hind', sans-serif", color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.7, margin: "20px 0 0", maxWidth: 400 }}>
                Envie suas apólices atuais de D&amp;O e Cyber. Em 3 a 4 dias, entregamos um relatório técnico completo com gaps de cobertura e benchmarks de mercado.
              </p>
              <Link href="/analise" style={{
                display: "inline-flex", alignItems: "center", gap: 10, marginTop: 28,
                background: "var(--tech-green)", color: "#0d1b3e",
                fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
                fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "0.78rem 2rem", borderRadius: "50px", textDecoration: "none",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--tech-green-dark)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--tech-green)"; }}
              >
                AGENDAR DIAGNÓSTICO
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>

            <div className="fade-in" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: 32 }}>
              <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "var(--tech-green)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 20px" }}>O diagnóstico inclui</h3>
              <ul className="check-list">
                {[
                  { t: "Leitura linha por linha",            s: "Coberturas, exclusões, limites, sub-limites e franquias" },
                  { t: "Gaps de cobertura identificados",    s: "Riscos não cobertos que deveriam estar na apólice" },
                  { t: "Benchmark de mercado",               s: "Comparação com coberturas típicas de fintechs similares" },
                  { t: "Exigências de investidores",         s: "Conformidade com o que VCs e fundos exigem" },
                  { t: "Relatório PDF + reunião de 60 min",  s: "Documento técnico e apresentação remota ou presencial" },
                ].map(({ t, s }) => (
                  <li key={t}><span className="dot" /><div><strong style={{ color: "#fff", fontSize: "0.875rem" }}>{t}</strong><div style={{ fontSize: "0.8rem", marginTop: 2 }}>{s}</div></div></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUARDO ── */}
      <section style={{ background: "var(--navy-800)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "flex-start" }}>
            <div className="fade-in">
              <span className="section-label">Quem está por trás</span>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "#fff", margin: "8px 0 0" }}>Eduardo Andrade</h2>
              <div className="gold-rule" />
              <p style={{ fontFamily: "'Hind', sans-serif", color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.75, margin: "0 0 16px" }}>
                15 anos como atuário analisando riscos corporativos complexos — D&amp;O, Cyber, E&amp;O, RC. Passou pela AIG e pela Justos Seguros antes de fundar a Docka.
              </p>
              <p style={{ fontFamily: "'Hind', sans-serif", color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.75, margin: 0 }}>
                A Docka nasceu de uma observação direta: fintechs contratam seguros para atender investidores, mas sem análise técnica real. O resultado são apólices com exclusões críticas que só aparecem na hora do sinistro.
              </p>
              <Link href="/sobre" style={{ display: "inline-block", marginTop: 28, color: "var(--tech-green)", fontSize: "0.875rem", fontWeight: 500, textDecoration: "none", fontFamily: "'Hind', sans-serif" }}>
                Ler trajetória completa →
              </Link>
            </div>

            <div className="fade-in" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: 32 }}>
              {[
                { t: "Atuário com 15 anos de mercado",  s: "Especialista em análise de risco e estruturação de programas de seguro" },
                { t: "Ex-AIG",                          s: "Formação técnica em uma das maiores seguradoras empresariais do mundo" },
                { t: "Ex-Justos Seguros",               s: "Experiência direta no ecossistema de insurtechs e fintechs brasileiras" },
                { t: "Corretor habilitado SUSEP",        s: "Habilitado para corretagem em todos os ramos de seguro" },
              ].map(({ t, s }) => (
                <div key={t} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--tech-green)", flexShrink: 0, marginTop: 6 }} />
                  <div>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "#fff" }}>{t}</div>
                    <div style={{ fontFamily: "'Hind', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", marginTop: 3 }}>{s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EMBEDDED ── */}
      <section style={{ background: "var(--cream-100)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div className="fade-in" style={{ maxWidth: 600 }}>
            <span className="section-label">Para parceiros</span>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "var(--navy-800)", margin: "8px 0 0" }}>Embedded Insurance</h2>
            <p style={{ fontFamily: "'Hind', sans-serif", color: "rgba(13,31,78,0.6)", fontSize: "0.95rem", lineHeight: 1.75, margin: "16px 0 0", maxWidth: 480 }}>
              Quer integrar seguros diretamente ao seu produto? Trabalhamos com empresas de tecnologia para estruturar soluções de embedded insurance — seguros que fazem parte da experiência do usuário, não uma etapa separada.
            </p>
            <Link href="/embedded" style={{
              display: "inline-flex", alignItems: "center", gap: 8, marginTop: 28,
              fontFamily: "'Hind', sans-serif", fontWeight: 600, fontSize: "0.875rem",
              color: "var(--navy-800)", textDecoration: "none",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--tech-green)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--navy-800)"; }}
            >
              Saiba mais sobre Embedded Insurance →
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
}
