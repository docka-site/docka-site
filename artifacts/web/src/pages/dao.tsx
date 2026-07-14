import { Layout } from "@/components/layout";
import { Link } from "wouter";

const HERO_BG = `${import.meta.env.BASE_URL}images/hero-sailboat.png`;

export default function Dao() {
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
              RC <span style={{ color: "var(--tech-green)" }}>DIRETORES</span>
            </h1>
            <p className="animate-fade-up delay-1" style={{ opacity: 0, color: "rgba(255,255,255,0.65)", fontSize: "1rem", lineHeight: 1.65, margin: "18px 0 0", maxWidth: 520, fontFamily: "'Hind', sans-serif" }}>
              Protege diretores, administradores e conselheiros contra ações movidas por terceiros em razão de decisões tomadas no exercício do cargo. Essencial para fintechs com investidores institucionais.
            </p>
          </div>
        </div>
      </section>

      {/* O QUE É D&O */}
      <section style={{ background: "var(--cream-100)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "4rem", alignItems: "flex-start" }}>
            <div className="fade-in">
              <span className="section-label">O que é</span>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 700, color: "var(--navy-800)", margin: "8px 0 16px" }}>
                Proteção para quem toma decisões
              </h2>
              <p style={{ fontSize: "0.92rem", color: "rgba(13,31,78,0.65)", lineHeight: 1.8, margin: "0 0 16px", fontFamily: "'Hind', sans-serif" }}>
                O seguro RC Diretores (Responsabilidade Civil de Diretores e Administradores, também conhecido internacionalmente como D&amp;O — Directors &amp; Officers) cobre a responsabilidade pessoal de diretores, administradores e conselheiros por atos de gestão — decisões estratégicas, alocações de capital, contratações, demissões, comunicados ao mercado.
              </p>
              <p style={{ fontSize: "0.92rem", color: "rgba(13,31,78,0.65)", lineHeight: 1.8, margin: "0 0 16px", fontFamily: "'Hind', sans-serif" }}>
                Qualquer pessoa afetada por uma decisão da gestão pode acionar: sócios minoritários, investidores, credores, funcionários, reguladores como o Banco Central e a CVM.
              </p>
              <p style={{ fontSize: "0.92rem", color: "rgba(13,31,78,0.65)", lineHeight: 1.8, margin: 0, fontFamily: "'Hind', sans-serif" }}>
                Em fintechs pós-seed, a pressão por performance dos investidores aumenta o risco de acionamentos — e o patrimônio pessoal dos fundadores e executivos fica exposto sem cobertura adequada.
              </p>
            </div>
            <div className="fade-in" style={{ background: "var(--navy-800)", borderRadius: 10, padding: 32 }}>
              <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: 700, color: "var(--tech-green)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 20px" }}>
                Quando o RC Diretores é acionado
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { t: "Investidor insatisfeito com resultado", s: "Ação alegando má gestão, desvio de estratégia ou quebra de dever fiduciário" },
                  { t: "Autuação regulatória", s: "Processo do Banco Central, SUSEP ou CVM por irregularidade na gestão" },
                  { t: "Ação trabalhista por decisão de gestão", s: "Demissão em massa, reestruturação, ou discriminação alegada por ex-funcionário" },
                  { t: "Falência ou recuperação judicial", s: "Credores e sócios questionando decisões que antecederam a crise" },
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
            <span className="section-label">Coberturas típicas</span>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 700, color: "var(--navy-800)", margin: "8px 0 0" }}>O que um RC Diretores bem estruturado cobre</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
            {[
              { tag: "Cobertura A", t: "Proteção individual", d: "Cobre o patrimônio pessoal dos diretores quando a empresa não pode ou não quer indenizá-los." },
              { tag: "Cobertura B", t: "Reembolso à empresa", d: "Reembolsa a empresa quando ela arca com as despesas de defesa dos diretores em seu lugar." },
              { tag: "Cobertura C", t: "Proteção da entidade", d: "Cobre a própria empresa em ações envolvendo valores mobiliários — comum em fintechs com investidores institucionais." },
            ].map(({ tag, t, d }) => (
              <div key={tag} className="card fade-in" style={{ padding: 28 }}>
                <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--tech-green)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Montserrat', sans-serif" }}>{tag}</div>
                <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy-800)", margin: "0 0 8px", fontFamily: "'Montserrat', sans-serif" }}>{t}</h4>
                <p style={{ fontSize: "0.82rem", color: "rgba(13,31,78,0.6)", lineHeight: 1.65, margin: 0, fontFamily: "'Hind', sans-serif" }}>{d}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, marginTop: 20 }}>
            {[
              { t: "Despesas de defesa", d: "Honorários advocatícios, custas processuais e despesas com investigação — pagas antecipadamente, sem aguardar desfecho." },
              { t: "Investigações regulatórias", d: "Custos de resposta a inquéritos e investigações formais de reguladores, mesmo sem processo judicial aberto." },
            ].map(({ t, d }) => (
              <div key={t} className="card fade-in" style={{ padding: 28 }}>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--navy-800)", margin: "0 0 8px", fontFamily: "'Montserrat', sans-serif" }}>{t}</h4>
                <p style={{ fontSize: "0.82rem", color: "rgba(13,31,78,0.6)", lineHeight: 1.65, margin: 0, fontFamily: "'Hind', sans-serif" }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXCLUSÕES */}
      <section style={{ background: "var(--navy-900)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "4rem", alignItems: "flex-start" }}>
            <div className="fade-in">
              <span className="section-label">O que o olhar técnico revela</span>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 700, color: "#fff", margin: "8px 0 16px" }}>
                Exclusões críticas que muitas apólices trazem
              </h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.92rem", lineHeight: 1.75, margin: "0 0 24px", fontFamily: "'Hind', sans-serif" }}>
                A maioria das empresas só descobre essas exclusões quando tenta acionar o seguro. Nossa análise técnica identifica esses pontos antes — enquanto ainda há tempo de corrigir.
              </p>
              <Link href="/analise" className="btn-gold">Solicitar análise gratuita</Link>
            </div>
            <div className="fade-in">
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { t: "Exclusão de fraude e desonestidade", r: "Risco: se a exclusão for ampla demais, qualquer alegação de má-fé pode afastar toda a cobertura, mesmo antes de comprovação." },
                  { t: "Exclusão de conflito de interesses", r: "Risco: em fintechs com sócios fundadores no board, transações entre partes relacionadas podem ser excluídas por padrão." },
                  { t: "Retroatividade limitada", r: "Risco: apólice sem retroatividade plena não cobre decisões tomadas antes da vigência, mesmo que o processo seja aberto agora." },
                  { t: "Limite insuficiente para múltiplos sinistros", r: "Risco: limite agregado baixo esgota-se em um único sinistro, deixando diretores desprotegidos em ações subsequentes." },
                ].map(({ t, r }) => (
                  <div key={t} style={{ padding: "16px 18px", background: "rgba(255,255,255,0.04)", borderRadius: 6, border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fff", marginBottom: 4, fontFamily: "'Montserrat', sans-serif" }}>{t}</div>
                    <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.5, fontFamily: "'Hind', sans-serif" }}>{r}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ background: "var(--cream-100)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem", textAlign: "center" }} className="fade-in">
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 700, color: "var(--navy-800)", margin: "0 0 16px" }}>
            Sua apólice de RC Diretores foi analisada por um atuário?
          </h2>
          <p style={{ color: "rgba(13,31,78,0.6)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 32px", fontFamily: "'Hind', sans-serif" }}>
            Se você já tem RC Diretores, analisamos sua apólice linha por linha e apresentamos os gaps. Se ainda não tem, mapeamos o que sua empresa precisa. Gratuito, sem compromisso.
          </p>
          <Link href="/analise" className="btn-gold">Solicitar análise técnica gratuita</Link>
        </div>
      </section>
    </Layout>
  );
}
