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
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--tech-green)" }}>Fundador · Docka Seguros</span>
            <h1 className="animate-fade-up" style={{ opacity: 0, fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3.2rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1.05, margin: "10px 0 0" }}>
              EDUARDO<br /><span style={{ color: "var(--tech-green)" }}>ANDRADE</span>
            </h1>
            <p className="animate-fade-up delay-1" style={{ opacity: 0, color: "rgba(255,255,255,0.65)", fontSize: "1rem", lineHeight: 1.65, margin: "18px 0 0", maxWidth: 480, fontFamily: "'Hind', sans-serif" }}>
              15 anos como atuário em seguros empresariais complexos. Fundador da Docka Seguros.
            </p>
          </div>
        </div>
      </section>

      {/* BIO */}
      <section style={{ background: "var(--cream-100)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "4rem" }} className="fade-in">
            <div>
              <span className="section-label">Trajetória</span>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 700, color: "var(--navy-800)", margin: "8px 0 24px" }}>
                De atuário a corretor especializado
              </h2>
              <p style={{ fontSize: "0.95rem", color: "rgba(13,31,78,0.7)", lineHeight: 1.85, margin: "0 0 20px", fontFamily: "'Hind', sans-serif" }}>
                Por 15 anos, analisei risco do lado das seguradoras — estruturando programas, avaliando exposições, entendendo o que as apólices realmente cobrem e o que elas excluem. Passei pela AIG, uma das maiores seguradoras empresariais do mundo, onde trabalhei com produtos complexos como D&amp;O, E&amp;O, Cyber e Responsabilidade Civil.
              </p>
              <p style={{ fontSize: "0.95rem", color: "rgba(13,31,78,0.7)", lineHeight: 1.85, margin: "0 0 20px", fontFamily: "'Hind', sans-serif" }}>
                Depois fui para a Justos Seguros, onde tive contato direto com o ecossistema de insurtechs e fintechs brasileiras — e vi de perto como empresas de tecnologia lidam (ou não lidam) com seguros corporativos.
              </p>
              <p style={{ fontSize: "0.95rem", color: "rgba(13,31,78,0.7)", lineHeight: 1.85, margin: "0 0 20px", fontFamily: "'Hind', sans-serif" }}>
                O que ficou mais claro: fintechs e startups em crescimento contratam seguros para cumprir exigência de investidor, mas sem análise técnica real. A apólice é assinada correndo, sem que ninguém leia as exclusões — e os gaps só aparecem quando a empresa tenta acionar.
              </p>
              <p style={{ fontSize: "0.95rem", color: "rgba(13,31,78,0.7)", lineHeight: 1.85, margin: 0, fontFamily: "'Hind', sans-serif" }}>
                A Docka existe para mudar isso. Não somos uma corretora que vende apólice — somos um parceiro técnico que analisa risco primeiro, e implementa cobertura adequada depois. A formação atuarial é o diferencial: é como olhamos para cada apólice, cada cláusula, cada exclusão.
              </p>
            </div>
            <div style={{ background: "var(--navy-800)", borderRadius: 10, padding: 28 }}>
              <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "var(--tech-green)", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 20px" }}>Credenciais</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  { t: "Atuário", s: "15 anos de atuação em seguros empresariais" },
                  { t: "AIG", s: "Seguros empresariais complexos — D&O, E&O, Cyber, RC" },
                  { t: "Justos Seguros", s: "Insurtech — contato direto com ecossistema fintech" },
                  { t: "Corretor habilitado SUSEP", s: "Habilitado para todos os ramos de seguro" },
                  { t: "Docka Seguros", s: "Fundador — 2025" },
                ].map(({ t, s }, i) => (
                  <div key={t} style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none", paddingTop: i > 0 ? 18 : 0 }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fff", fontFamily: "'Montserrat', sans-serif" }}>{t}</div>
                    <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", marginTop: 2, fontFamily: "'Hind', sans-serif" }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
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
            Solicite a análise técnica gratuita e eu entro em contato em até 24 horas.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link href="/analise" className="btn-gold">Solicitar análise gratuita</Link>
            <a href="mailto:contato@dockaseguros.com.br" className="btn-outline-white">contato@dockaseguros.com.br</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
