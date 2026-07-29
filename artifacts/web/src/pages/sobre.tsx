import { Layout } from "@/components/layout";
import { Link } from "wouter";

const HERO_BG = `${import.meta.env.BASE_URL}images/hero-sailboat.png`;

export default function Sobre() {
  return (
    <Layout>
      {/* HERO */}
      <section style={{ position: "relative", minHeight: 400, overflow: "hidden", display: "flex", alignItems: "flex-end", marginTop: "-80px" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${HERO_BG}')`, backgroundSize: "cover", backgroundPosition: "center 60%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(5,12,28,0.97) 0%, rgba(5,12,28,0.88) 50%, rgba(5,12,28,0.5) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "80rem", margin: "0 auto", padding: "3rem 2rem", width: "100%" }}>
          <div style={{ maxWidth: 640 }}>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--tech-green)" }}>Fundadores · Docka Seguros</span>
            <h1 className="animate-fade-up" style={{ opacity: 0, fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3.2rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1.05, margin: "10px 0 0" }}>
              Nossa Origem
            </h1>
            <p className="animate-fade-up delay-1" style={{ opacity: 0, color: "rgba(255,255,255,0.65)", fontSize: "1rem", lineHeight: 1.65, margin: "18px 0 0", maxWidth: 480, fontFamily: "'Hind', sans-serif" }}>
              Depois de 15 anos avaliando os maiores riscos corporativos do mercado, percebemos que muitas empresas estavam protegidas apenas no papel. Foi por isso que nasceu a Docka Seguros: para transformar seguros em estratégia de proteção patrimonial.
            </p>
          </div>
        </div>
      </section>

      {/* SOBRE A DOCKA */}
      <section style={{ background: "#fff", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div className="fade-in" style={{ maxWidth: 780 }}>
            <span className="section-label">Sobre a Docka</span>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 700, color: "var(--navy-800)", margin: "8px 0 24px" }}>
              Muito além de uma apólice
            </h2>
            <p style={{ fontSize: "0.95rem", color: "rgba(13,31,78,0.7)", lineHeight: 1.85, margin: "0 0 20px", fontFamily: "'Hind', sans-serif" }}>
              Na Docka Seguros, acreditamos que proteger uma empresa vai muito além da contratação de uma apólice. Atuamos como parceiros estratégicos na gestão de riscos corporativos, desenvolvendo soluções personalizadas que acompanham o crescimento e a evolução de cada negócio.
            </p>
            <p style={{ fontSize: "0.95rem", color: "rgba(13,31,78,0.7)", lineHeight: 1.85, margin: 0, fontFamily: "'Hind', sans-serif" }}>
              Nossa abordagem consultiva une excelência técnica, tecnologia e atendimento próximo para entregar proteção inteligente, processos eficientes e segurança para que nossos clientes possam focar no que realmente importa: fazer seus negócios crescerem.
            </p>
          </div>
        </div>
      </section>

      {/* FILOSOFIA */}
      <section style={{ background: "#fff", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div className="fade-in" style={{ maxWidth: 700 }}>
            <span className="section-label">Filosofia</span>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 700, color: "var(--navy-800)", margin: "8px 0 24px" }}>
              Análise técnica independente, sempre
            </h2>
            <p style={{ fontSize: "0.95rem", color: "rgba(13,31,78,0.65)", lineHeight: 1.85, margin: "0 0 20px", fontFamily: "'Hind', sans-serif" }}>
              Toda empresa que trabalha com a Docka recebe uma análise técnica antes de qualquer recomendação de produto. Se a cobertura atual estiver adequada, dizemos isso. Não existe incentivo para vender cobertura que não é necessária.
            </p>
            <p style={{ fontSize: "0.95rem", color: "rgba(13,31,78,0.65)", lineHeight: 1.85, margin: "0 0 20px", fontFamily: "'Hind', sans-serif" }}>
              Somos transparentes sobre o modelo de negócio: quando uma empresa decide implementar seguros via nossa corretora, recebemos comissão das seguradoras — padrão do mercado, sem custo adicional para o cliente. Se preferir implementar por outro caminho, a análise técnica que fizemos continua sendo sua.
            </p>
            <p style={{ fontSize: "0.95rem", color: "rgba(13,31,78,0.65)", lineHeight: 1.85, margin: 0, fontFamily: "'Hind', sans-serif" }}>
              O objetivo é longo prazo: empresas que entendem seus riscos e têm coberturas adequadas não precisam ser convencidas a renovar. A relação se sustenta pela qualidade técnica, não pela pressão comercial.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--navy-900)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem", textAlign: "center" }} className="fade-in">
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 700, color: "#fff", margin: "0 0 16px" }}>
            Quer conversar?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 460, margin: "0 auto 32px", fontFamily: "'Hind', sans-serif" }}>
            Solicite a análise técnica e nossa equipe entra em contato
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link href="/analise" className="btn-gold">Avalie se sua empresa está realmente protegida</Link>
            <a href="mailto:contato@dockaseguros.com.br" className="btn-outline-white">contato@dockaseguros.com.br</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
