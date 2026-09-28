import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const HERO_BG = `${import.meta.env.BASE_PATH}images/hero-sailboat.png`;

export default function Embedded() {
  return (
    <Layout>
      {/* HERO */}
      <section style={{ position: "relative", minHeight: 400, overflow: "hidden", display: "flex", alignItems: "flex-end", marginTop: "-80px" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${HERO_BG}')`, backgroundSize: "cover", backgroundPosition: "center 60%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(5,12,28,0.97) 0%, rgba(5,12,28,0.88) 50%, rgba(5,12,28,0.5) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "80rem", margin: "0 auto", padding: "3rem 2rem", width: "100%" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", textDecoration: "none", marginBottom: 20, transition: "color 0.2s", fontFamily: "'Hind', sans-serif" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
            ← Voltar
          </Link>
          <div style={{ maxWidth: 640 }}>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--tech-green)" }}>Solução · Integração</span>
            <h1 className="animate-fade-up" style={{ opacity: 0, fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3.2rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1.05, margin: "10px 0 0" }}>
              Seguros <span style={{ color: "var(--tech-green)" }}>EMBARCADOS</span>
            </h1>
            <p className="animate-fade-up delay-1" style={{ opacity: 0, color: "rgba(255,255,255,0.65)", fontSize: "1rem", lineHeight: 1.65, margin: "18px 0 0", maxWidth: 520, fontFamily: "'Hind', sans-serif" }}>
              Integre proteção de seguros diretamente em sua plataforma. Ofereça cobertura sem deixar a experiência do usuário.
            </p>
          </div>
        </div>
      </section>

      {/* O QUE É */}
      <section style={{ background: "var(--cream-100)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: "4rem", alignItems: "flex-start" }}>
            <div className="fade-in">
              <span className="section-label">O que é</span>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 700, color: "var(--navy-800)", margin: "8px 0 16px" }}>
                Seguros integrados à sua plataforma
              </h2>
              <p style={{ fontSize: "0.92rem", color: "rgba(13,31,78,0.65)", lineHeight: 1.8, margin: "0 0 16px", fontFamily: "'Hind', sans-serif" }}>
                Seguros embarcados (embedded insurance) é quando você oferece proteção de seguros diretamente dentro da sua aplicação, marketplace ou plataforma — sem que o usuário precise sair para contratar.
              </p>
              <p style={{ fontSize: "0.92rem", color: "rgba(13,31,78,0.65)", lineHeight: 1.8, margin: "0 0 16px", fontFamily: "'Hind', sans-serif" }}>
                Para fintech, marketplace e plataformas SaaS, isso significa adicionar uma camada de proteção que aumenta a confiança do cliente, reduz churn e gera receita adicional com comissões.
              </p>
              <p style={{ fontSize: "0.92rem", color: "rgba(13,31,78,0.65)", lineHeight: 1.8, margin: 0, fontFamily: "'Hind', sans-serif" }}>
                A Docka Seguros oferece soluções customizadas de seguros embarcados para suas necessidades específicas.
              </p>
            </div>
            <div className="fade-in" style={{ background: "var(--navy-800)", borderRadius: 10, padding: 32 }}>
              <h3 style={{ color: "#fff", fontFamily: "'Montserrat', sans-serif", fontSize: "1rem", fontWeight: 700, marginBottom: 16, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Como funciona
              </h3>
              <ul className="check-list">
                <li><span className="dot"></span>Integração via API</li>
                <li><span className="dot"></span>Fluxo sem fricção para o usuário</li>
                <li><span className="dot"></span>Cotação e contratação em segundos</li>
                <li><span className="dot"></span>Suporte ao cliente 24/7</li>
                <li><span className="dot"></span>Relatórios em tempo real</li>
                <li><span className="dot"></span>Customização por segmento</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--navy-800)", padding: "5rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem,3vw,2.2rem)", color: "#fff", margin: "0 0 20px" }}>
            Pronto para integrar seguros na sua plataforma?
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.75)", margin: "0 0 32px", fontFamily: "'Hind', sans-serif", maxWidth: 500, margin: "0 auto 32px" }}>
            Converse com nosso time técnico para entender as possibilidades de integração.
          </p>
          <a href="/analise" className="btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            Agendar Diagnóstico <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </Layout>
  );
}
