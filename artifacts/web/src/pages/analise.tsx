import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { useState } from "react";

export default function Analise() {
  const [form, setForm] = useState({
    nome: "", empresa: "", cargo: "", email: "", telefone: "", situacao: "", contexto: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, source: "analise-form", metadata: form }),
      });
      if (res.ok) setStatus("sent");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Layout>
      {/* HERO */}
      <section className="hero-gradient relative overflow-hidden" style={{ padding: "140px 0 80px", marginTop: "-80px" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ maxWidth: 640 }}>
            <span className="section-label">Sem custo · Sem compromisso</span>
            <h1 className="font-display animate-fade-up" style={{ opacity: 0, fontSize: "clamp(2.4rem,4.5vw,3.6rem)", fontWeight: 400, color: "#fff", lineHeight: 1.1, margin: "8px 0 0" }}>
              Avalie se<br /><em>sua empresa está<br />realmente protegida</em>
            </h1>
            <p className="animate-fade-up delay-1" style={{ opacity: 0, color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.7, margin: "20px 0 0", maxWidth: 480 }}>
              Nossa equipe analisa seu programa de seguros com profundidade, exclusões, gaps e benchmarks. Relatório técnico e reunião de apresentação.
            </p>
          </div>
        </div>
        <div className="wave-bottom">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 60 }}>
            <path d="M0 60 L0 35 Q360 5 720 35 Q1080 65 1440 35 L1440 60 Z" fill="var(--cream-100)"/>
          </svg>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="bg-cream-100 py-20">
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="section-label">Como funciona</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24, marginBottom: 64 }}>
            {[
              { n: "01", t: "Levantamento dos Riscos",    c: "var(--navy-800)", tc: "#fff", pc: "rgba(255,255,255,0.5)",
                d: "Dados da empresa, operação atual e situação atual de seguros." },
              { n: "02", t: "Nossa equipe faz a análise técnica", c: "var(--cream-50)",  tc: "var(--navy-800)", pc: "rgba(13,31,78,0.6)",
                d: "Revisão das apólices atuais (ou mapeamento do que você precisa, se ainda não tiver)" },
              { n: "03", t: "Reunião de apresentação",       c: "var(--cream-50)",  tc: "var(--navy-800)", pc: "rgba(13,31,78,0.6)",
                d: "Apresentação do cenário atual: o que está suficiente, o que está em risco, e recomendações técnicas. Você decide o que fazer." },
            ].map(({ n, t, c, tc, pc, d }) => (
              <div key={n} className="card fade-in" style={{ padding: 32, textAlign: "center", background: c, borderColor: c }}>
                <div className="font-display" style={{ fontSize: "3rem", fontWeight: 300, color: "var(--gold-500)", lineHeight: 1, marginBottom: 16 }}>{n}</div>
                <h4 style={{ fontSize: "1rem", fontWeight: 600, color: tc, margin: "0 0 10px" }}>{t}</h4>
                <p style={{ fontSize: "0.82rem", color: pc, lineHeight: 1.65, margin: 0 }}>{d}</p>
              </div>
            ))}
          </div>

          {/* O que a análise entrega */}
          <div className="fade-in" style={{ background: "var(--navy-800)", borderRadius: 10, padding: 40, maxWidth: 800, margin: "0 auto" }}>
            <h3 className="font-display" style={{ fontSize: "1.3rem", fontWeight: 500, color: "#fff", margin: "0 0 24px", textAlign: "center" }}>
              O que a análise entrega
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
              {[
                "Apresentação das coberturas, exclusões, limites e sub-limites",
                "Identificação de gaps de cobertura e riscos não cobertos",
                "Comparação com benchmarks de empresa similares",
                "Avaliação frente a exigências típicas de investidores",
              ].map(d => (
                <div key={d} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold-400)", flexShrink: 0, marginTop: 6 }}></div>
                  <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{d}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)", margin: "20px 0 0", textAlign: "center" }}>
              Sem compromisso de contratação. A análise é sua independentemente de qualquer decisão posterior.
            </p>
          </div>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section className="bg-cream-50 py-20">
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px,100%), 1fr))", gap: "4rem" }}>
            <div className="fade-in">
              <span className="section-label">Solicitar análise</span>
              <h2 className="font-display" style={{ fontSize: "2rem", fontWeight: 400, color: "var(--navy-800)", margin: "8px 0 16px" }}>
                Preencha e nossa equipe entrará em contato
              </h2>
              <div style={{ padding: 20, background: "var(--cream-100)", borderRadius: 8, border: "1px solid var(--cream-200)", marginTop: 16 }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--navy-800)", marginBottom: 4 }}>Preferência de contato direto?</div>
                <a href="mailto:contato@dockaseguros.com.br" style={{ fontSize: "0.85rem", color: "var(--navy-800)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                  </svg>
                  contato@dockaseguros.com.br
                </a>
              </div>
            </div>

            <div className="fade-in">
              {status === "sent" ? (
                <div style={{ background: "#fff", border: "1px solid var(--cream-200)", borderRadius: 10, padding: 48, textAlign: "center" }}>
                  <div style={{ fontSize: "3rem", marginBottom: 16 }}>✓</div>
                  <h3 className="font-display" style={{ fontSize: "1.6rem", color: "var(--navy-800)", marginBottom: 12 }}>Solicitação recebida!</h3>
                  <p style={{ fontSize: "0.9rem", color: "rgba(13,31,78,0.6)", lineHeight: 1.7, maxWidth: 380, margin: "0 auto" }}>
                    Nossa equipe entrará em contato em até 24 horas úteis para confirmar o recebimento e alinhar os próximos passos.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ background: "#fff", border: "1px solid var(--cream-200)", borderRadius: 10, padding: 36 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 20 }}>
                    <div>
                      <label className="form-label" htmlFor="nome">Nome *</label>
                      <input className="form-input" type="text" id="nome" name="nome" required placeholder="Seu nome" value={form.nome} onChange={handleChange} />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="empresa">Empresa *</label>
                      <input className="form-input" type="text" id="empresa" name="empresa" required placeholder="Nome da empresa" value={form.empresa} onChange={handleChange} />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 20, marginTop: 20 }}>
                    <div>
                      <label className="form-label" htmlFor="cargo">Cargo</label>
                      <input className="form-input" type="text" id="cargo" name="cargo" placeholder="Ex: CEO, CFO" value={form.cargo} onChange={handleChange} />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="email">Email *</label>
                      <input className="form-input" type="email" id="email" name="email" required placeholder="seu@empresa.com" value={form.email} onChange={handleChange} />
                    </div>
                  </div>

                  <div style={{ marginTop: 20 }}>
                    <label className="form-label" htmlFor="telefone">Telefone / WhatsApp</label>
                    <input className="form-input" type="tel" id="telefone" name="telefone" placeholder="(11) 99999-9999" value={form.telefone} onChange={handleChange} />
                  </div>

                  <div style={{ marginTop: 20 }}>
                    <label className="form-label">Situação atual de seguros</label>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                      {[
                        { v: "Já tenho apólices RC Diretores/Riscos Cibernéticos", l: "Já tenho apólices de RC Diretores e/ou Riscos Cibernéticos" },
                        { v: "Tenho alguns mas não todos",  l: "Tenho alguns mas não tenho tudo estruturado" },
                        { v: "Ainda não tenho seguros",     l: "Ainda não tenho — estou mapeando o que preciso" },
                      ].map(({ v, l }) => (
                        <label key={v} className="radio-option">
                          <input type="radio" name="situacao" value={v} checked={form.situacao === v}
                            onChange={() => setForm(f => ({ ...f, situacao: v }))}
                            style={{ accentColor: "var(--navy-800)" }} />
                          {l}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: 20 }}>
                    <label className="form-label" htmlFor="contexto">Contexto ou dúvida (opcional)</label>
                    <textarea className="form-input" id="contexto" name="contexto" rows={3}
                      placeholder="Ex: levantamos Série A e o investidor pediu D&O, ou: renovação em 2 meses e quero uma segunda opinião técnica..."
                      value={form.contexto} onChange={handleChange} />
                  </div>

                  {status === "error" && (
                    <p style={{ fontSize: "0.82rem", color: "hsl(0 84.2% 60.2%)", marginTop: 12 }}>
                      Ocorreu um erro. Por favor, envie um email para contato@dockaseguros.com.br
                    </p>
                  )}

                  <button type="submit" className="btn-gold" disabled={status === "sending"}
                    style={{ width: "100%", marginTop: 24, padding: 16, justifyContent: "center" }}>
                    {status === "sending" ? "Enviando..." : "Avalie se sua empresa está realmente protegida"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
