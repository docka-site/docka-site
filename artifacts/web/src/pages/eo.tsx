import { Layout } from "@/components/layout";
import { Link } from "wouter";

const HERO_BG = `${import.meta.env.BASE_URL}images/hero-sailboat.png`;

export default function Eo() {
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
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--tech-green)" }}>Produto · Gestão de Riscos</span>
            <h1 className="animate-fade-up" style={{ opacity: 0, fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3.2rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1.05, margin: "10px 0 0" }}>
              RC <span style={{ color: "var(--tech-green)" }}>PROFISSIONAL</span>
            </h1>
            <p className="animate-fade-up delay-1" style={{ opacity: 0, color: "rgba(255,255,255,0.65)", fontSize: "1rem", lineHeight: 1.65, margin: "18px 0 0", maxWidth: 520, fontFamily: "'Hind', sans-serif" }}>
              Responsabilidade profissional por erros, falhas e omissões na prestação de serviços. Para fintechs que prestam serviços financeiros e tecnológicos a clientes — onde uma falha pode gerar perda financeira para terceiros e ação de indenização.
            </p>
          </div>
        </div>
      </section>

      {/* O QUE É E QUANDO É ACIONADO */}
      <section style={{ background: "var(--cream-100)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: "4rem", alignItems: "flex-start" }}>
            <div className="fade-in">
              <span className="section-label">O que é</span>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 700, color: "var(--navy-800)", margin: "8px 0 16px" }}>
                Quando um erro técnico gera perda para seu cliente
              </h2>
              <p style={{ fontSize: "0.92rem", color: "rgba(13,31,78,0.65)", lineHeight: 1.8, margin: "0 0 16px", fontFamily: "'Hind', sans-serif" }}>
                O seguro RC Profissional (Responsabilidade Civil Profissional, também conhecido internacionalmente como E&amp;O — Errors &amp; Omissions) cobre ações movidas por clientes que sofreram perda financeira em razão de falha, erro ou omissão no serviço prestado.
              </p>
              <p style={{ fontSize: "0.92rem", color: "rgba(13,31,78,0.65)", lineHeight: 1.8, margin: "0 0 16px", fontFamily: "'Hind', sans-serif" }}>
                Para fintechs, isso inclui falhas em processamento de pagamentos, erros em análise de crédito, bugs que causam prejuízo financeiro ao usuário, e falhas em serviços de custódia ou gestão de ativos.
              </p>
              <p style={{ fontSize: "0.92rem", color: "rgba(13,31,78,0.65)", lineHeight: 1.8, margin: 0, fontFamily: "'Hind', sans-serif" }}>
                Mesmo com todo cuidado técnico, erros acontecem. A questão é ter cobertura para defender-se e indenizar sem comprometer o caixa da empresa.
              </p>
            </div>
            <div className="fade-in" style={{ background: "var(--navy-800)", borderRadius: 10, padding: 32 }}>
              <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: 700, color: "var(--tech-green)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 20px" }}>
                Exemplos de sinistros em fintechs
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { t: "Bug em processamento de pagamento", s: "Falha técnica gera cobranças duplicadas ou transferências indevidas — clientes exigem indenização" },
                  { t: "Erro em análise de crédito", s: "Modelo aprova crédito indevidamente ou nega indevidamente — prejuízo para a empresa ou ação do cliente prejudicado" },
                  { t: "Falha em custódia de ativos", s: "Erro operacional em plataforma de investimentos resulta em perda ou bloqueio indevido de ativos do cliente" },
                  { t: "Falha de integração com banco parceiro", s: "Problema técnico em integração via Open Finance causa perda financeira para o usuário final" },
                ].map(({ t, s }) => (
                  <div key={t} style={{ padding: 16, background: "rgba(255,255,255,0.05)", borderRadius: 6, borderLeft: "2px solid var(--tech-green)" }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fff", marginBottom: 4, fontFamily: "'Montserrat', sans-serif" }}>{t}</div>
                    <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.5, fontFamily: "'Hind', sans-serif" }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COBERTURAS */}
      <section style={{ background: "#fff", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div className="fade-in" style={{ marginBottom: 40 }}>
            <span className="section-label">Coberturas</span>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 700, color: "var(--navy-800)", margin: "8px 0 0" }}>O que um RC Profissional bem estruturado cobre</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
            {[
              { t: "Despesas de defesa", d: "Se um cliente processar sua empresa, o seguro paga o advogado e as custas do processo — adiantado, antes mesmo de saber quem vai vencer o caso." },
              { t: "Indenizações a clientes", d: "Se a Justiça decidir que sua empresa causou prejuízo financeiro a um cliente por erro ou falha no serviço, o seguro cobre o valor da indenização." },
              { t: "Acordos extrajudiciais", d: "Muitos casos se resolvem sem ir a julgamento. O seguro cobre o custo de um acordo negociado — geralmente mais rápido e mais barato do que um processo." },
              { t: "Reclamações regulatórias", d: "Se o Banco Central ou a CVM abrir um processo administrativo por falha na prestação de um serviço regulado, o seguro cobre a defesa." },
            ].map(({ t, d }) => (
              <div key={t} className="card fade-in" style={{ padding: 28 }}>
                <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy-800)", margin: "0 0 8px", fontFamily: "'Montserrat', sans-serif" }}>{t}</h4>
                <p style={{ fontSize: "0.82rem", color: "rgba(13,31,78,0.6)", lineHeight: 1.65, margin: 0, fontFamily: "'Hind', sans-serif" }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--navy-900)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem", textAlign: "center" }} className="fade-in">
          <span className="section-label">Análise gratuita</span>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 700, color: "#fff", margin: "8px 0 16px" }}>
            Sua empresa tem RC Profissional adequado para os serviços que presta?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 32px", fontFamily: "'Hind', sans-serif" }}>
            Analisamos sua apólice atual ou mapeamos o que você precisa. Relatório técnico completo em 3 a 4 dias, sem custo.
          </p>
          <Link href="/analise" className="btn-gold">Solicitar análise técnica gratuita</Link>
        </div>
      </section>
    </Layout>
  );
}
