import { Layout } from "@/components/layout";
import { Link } from "wouter";

const HERO_BG = `${import.meta.env.BASE_URL}images/hero-sailboat.png`;

export default function Cyber() {
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
              CYBER<br /><span style={{ color: "var(--tech-green)" }}>RISCOS CIBERNÉTICOS</span>
            </h1>
            <p className="animate-fade-up delay-1" style={{ opacity: 0, color: "rgba(255,255,255,0.65)", fontSize: "1rem", lineHeight: 1.65, margin: "18px 0 0", maxWidth: 520, fontFamily: "'Hind', sans-serif" }}>
              Cobertura técnica para incidentes de segurança da informação — vazamento de dados, ransomware, interrupção de sistemas e responsabilidade por dados de terceiros. Crítico para fintechs que processam dados financeiros e precisam estar em conformidade com a LGPD.
            </p>
          </div>
        </div>
      </section>

      {/* POR QUE FINTECHS PRECISAM */}
      <section style={{ background: "var(--cream-100)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "4rem", alignItems: "flex-start" }}>
            <div className="fade-in">
              <span className="section-label">Por que fintechs são expostas</span>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 700, color: "var(--navy-800)", margin: "8px 0 16px" }}>
                Dados financeiros são o ativo mais visado
              </h2>
              <p style={{ fontSize: "0.92rem", color: "rgba(13,31,78,0.65)", lineHeight: 1.8, margin: "0 0 16px", fontFamily: "'Hind', sans-serif" }}>
                Fintechs processam dados financeiros e pessoais sensíveis — CPF, renda, histórico de transações, dados bancários. São alvos prioritários de ataques cibernéticos exatamente porque têm esses dados.
              </p>
              <p style={{ fontSize: "0.92rem", color: "rgba(13,31,78,0.65)", lineHeight: 1.8, margin: "0 0 16px", fontFamily: "'Hind', sans-serif" }}>
                Com a LGPD, um vazamento de dados pode resultar em multas de até 2% do faturamento (limitado a R$ 50 milhões por infração), além de ações de indenização por titulares e investigações da ANPD.
              </p>
              <p style={{ fontSize: "0.92rem", color: "rgba(13,31,78,0.65)", lineHeight: 1.8, margin: 0, fontFamily: "'Hind', sans-serif" }}>
                A questão não é se um incidente vai acontecer — é quando, e se sua empresa estará preparada para responder e cobrir os custos.
              </p>
            </div>
            <div className="fade-in" style={{ background: "var(--navy-800)", borderRadius: 10, padding: 32 }}>
              <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: 700, color: "var(--tech-green)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 20px" }}>
                Os incidentes mais comuns em fintechs
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { t: "Ransomware", d: "sistemas sequestrados, operação paralisada, extorsão para liberar acesso" },
                  { t: "Vazamento de base de dados", d: "exposição de CPFs, dados bancários e informações de clientes" },
                  { t: "Engenharia social e phishing", d: "funcionário enganado transfere valores ou entrega credenciais" },
                  { t: "Violação de API", d: "ataque explora vulnerabilidade em integração com terceiros" },
                  { t: "Interrupção de serviço (DDoS)", d: "plataforma fora do ar, perda de receita e reputação" },
                ].map(({ t, d }) => (
                  <div key={t} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--tech-green)", flexShrink: 0, marginTop: 6 }} />
                    <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.5, fontFamily: "'Hind', sans-serif" }}>
                      <strong style={{ color: "#fff" }}>{t}</strong> — {d}
                    </div>
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
            <span className="section-label">Estrutura de cobertura</span>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 700, color: "var(--navy-800)", margin: "8px 0 0" }}>
              Dois blocos que precisam trabalhar juntos
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24, marginBottom: 24 }}>
            <div className="card fade-in" style={{ padding: 32, background: "var(--navy-800)", border: "none" }}>
              <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--tech-green)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'Montserrat', sans-serif" }}>Cobertura própria (First-party)</div>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", margin: "0 0 12px", fontFamily: "'Montserrat', sans-serif" }}>Custos que a empresa absorve diretamente</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
                {["Custos de resposta ao incidente (forensic, notificação a titulares)", "Pagamento de extorsão cibernética (ransomware)", "Perda de receita por interrupção de sistemas", "Custos de restauração de sistemas e dados", "Gestão de crise e comunicação"].map(d => (
                  <div key={d} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", display: "flex", gap: 10, fontFamily: "'Hind', sans-serif" }}>
                    <span style={{ color: "var(--tech-green)" }}>→</span> {d}
                  </div>
                ))}
              </div>
            </div>
            <div className="card fade-in" style={{ padding: 32 }}>
              <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--gold-500)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'Montserrat', sans-serif" }}>Responsabilidade civil (Third-party)</div>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--navy-800)", margin: "0 0 12px", fontFamily: "'Montserrat', sans-serif" }}>Reclamações de terceiros afetados</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
                {["Ações de clientes cujos dados foram vazados", "Multas e penalidades regulatórias (ANPD, BACEN)", "Ações de parceiros afetados por incidente em seus sistemas", "Defesa jurídica em processos relacionados ao incidente", "Indenizações a titulares de dados por dano moral"].map(d => (
                  <div key={d} style={{ fontSize: "0.82rem", color: "rgba(13,31,78,0.65)", display: "flex", gap: 10, fontFamily: "'Hind', sans-serif" }}>
                    <span style={{ color: "var(--gold-500)" }}>→</span> {d}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXCLUSÕES */}
      <section style={{ background: "var(--navy-900)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "4rem", alignItems: "flex-start" }}>
            <div className="fade-in">
              <span className="section-label">Onde estão os riscos ocultos</span>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 700, color: "#fff", margin: "8px 0 16px" }}>
                Exclusões que eliminam justamente os riscos que você tem
              </h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.92rem", lineHeight: 1.75, margin: "0 0 24px", fontFamily: "'Hind', sans-serif" }}>
                Apólices de Cyber variam muito em qualidade técnica. As exclusões abaixo aparecem com frequência e podem tornar a cobertura inútil para fintechs.
              </p>
              <Link href="/analise" className="btn-gold">Analisar minha apólice</Link>
            </div>
            <div className="fade-in">
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { t: "Exclusão de ransomware", r: "Algumas apólices excluem extorsão cibernética explicitamente — o risco mais comum em pequenas e médias empresas." },
                  { t: "Franquia proibitiva", r: "Franquia de R$ 500 mil em uma apólice de R$ 1 milhão significa que a seguradora só paga a faixa mais catastrófica." },
                  { t: "Exclusão de sistemas de terceiros", r: "Se o ataque entrar por um fornecedor de cloud ou API, algumas apólices não cobrem — fintechs são altamente dependentes de terceiros." },
                  { t: "Multas regulatórias excluídas", r: "Apólices que não cobrem penalidades da ANPD e BACEN deixam de fora exatamente o risco mais preocupante pós-LGPD." },
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
            Sua apólice de Cyber cobre ransomware?
          </h2>
          <p style={{ color: "rgba(13,31,78,0.6)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 32px", fontFamily: "'Hind', sans-serif" }}>
            Analisamos sua apólice e identificamos o que está e o que não está coberto. Gratuito, relatório técnico completo em 3 a 4 dias.
          </p>
          <Link href="/analise" className="btn-gold">Solicitar análise técnica gratuita</Link>
        </div>
      </section>
    </Layout>
  );
}
