import { useState } from "react";
import { Layout } from "@/components/layout";
import { submitPartnerForm } from "@/lib/hubspot";

export default function Parceiros() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    company: "",
    profissao: "",
    interesse: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const success = await submitPartnerForm(formData);
      if (success) {
        setSubmitted(true);
        setTimeout(() => {
          window.location.href = "/confirmacao";
        }, 2000);
      } else {
        setError("Erro ao enviar. Tente novamente.");
      }
    } catch (err) {
      setError("Erro ao enviar. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section style={{ background: "var(--navy-900)", padding: "6rem 0 3rem", marginTop: "-80px" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
            <h1
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                color: "#fff",
                margin: 0,
                textTransform: "uppercase",
                lineHeight: 1.1,
              }}
            >
              Seja Parceiro Docka
            </h1>
            <p
              style={{
                fontFamily: "'Hind', sans-serif",
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                margin: "20px 0 0",
              }}
            >
              Indique clientes empresariais e deixe com a gente a análise técnica e cotação de seguros.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: "var(--cream-100)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "start" }}>
            {/* Info */}
            <div>
              <h2
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.6rem",
                  color: "var(--navy-800)",
                  margin: "0 0 24px",
                }}
              >
                Como Funciona
              </h2>

              {[
                {
                  title: "1. Você indica",
                  desc: "Indique seus clientes empresariais que precisam de proteção em RC Profissional.",
                },
                {
                  title: "2. Docka analisa",
                  desc: "Fazemos análise técnica, comparamos opções e estruturamos a melhor solução.",
                },
                {
                  title: "3. Cliente fica protegido",
                  desc: "Entregamos cotação e documentação. Você mantém a relação com seu cliente.",
                },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: 32 }}>
                  <h3
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--navy-800)",
                      margin: "0 0 8px",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Hind', sans-serif",
                      fontSize: "0.95rem",
                      color: "rgba(13,31,78,0.6)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}

              <div style={{ marginTop: 40, padding: 24, background: "#fff", borderRadius: 8, border: "1px solid var(--cream-200)" }}>
                <h3
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--tech-green)",
                    margin: "0 0 16px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontSize: "0.9rem",
                  }}
                >
                  Por que Parceirizar?
                </h3>
                {[
                  "Você foca no cliente; a gente foca na proteção técnica",
                  "Análise gratuita para seus clientes",
                  "Acesso a cotações comparativas das melhores seguradoras",
                  "Suporte total durante análise e implementação",
                  "Você mantém a relação comercial",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                    <svg width="18" height="18" fill="none" stroke="var(--tech-green)" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span style={{ fontFamily: "'Hind', sans-serif", fontSize: "0.9rem", color: "rgba(13,31,78,0.7)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 20px", background: "#fff", borderRadius: 8 }}>
                  <h3 style={{ color: "var(--tech-green)", fontSize: "1.3rem", fontWeight: 700 }}>
                    ✓ Cadastro recebido!
                  </h3>
                  <p style={{ color: "rgba(13,31,78,0.6)", marginTop: 10 }}>
                    Entraremos em contato em breve.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    background: "#fff",
                    border: "1px solid var(--cream-200)",
                    borderRadius: 8,
                    padding: 32,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "var(--navy-800)",
                      margin: "0 0 20px",
                    }}
                  >
                    Cadastro de Parceiro
                  </h3>

                  {error && (
                    <div
                      style={{
                        padding: 12,
                        background: "#fee",
                        border: "1px solid #f99",
                        borderRadius: 6,
                        color: "#c00",
                        marginBottom: 20,
                        fontSize: "0.9rem",
                      }}
                    >
                      {error}
                    </div>
                  )}

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "var(--navy-800)", marginBottom: 6 }}>
                      Nome *
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      placeholder="Seu nome"
                      value={formData.firstname}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        border: "1px solid var(--cream-200)",
                        borderRadius: 6,
                        fontFamily: "'Hind', sans-serif",
                        fontSize: "0.95rem",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "var(--navy-800)", marginBottom: 6 }}>
                      Escritório *
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Nome do escritório"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        border: "1px solid var(--cream-200)",
                        borderRadius: 6,
                        fontFamily: "'Hind', sans-serif",
                        fontSize: "0.95rem",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "var(--navy-800)", marginBottom: 6 }}>
                      Profissão *
                    </label>
                    <select
                      name="profissao"
                      value={formData.profissao}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        border: "1px solid var(--cream-200)",
                        borderRadius: 6,
                        fontFamily: "'Hind', sans-serif",
                        fontSize: "0.95rem",
                      }}
                    >
                      <option value="">Selecione</option>
                      <option value="Contador">Contador</option>
                      <option value="Advogado">Advogado</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "var(--navy-800)", marginBottom: 6 }}>
                      E-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        border: "1px solid var(--cream-200)",
                        borderRadius: 6,
                        fontFamily: "'Hind', sans-serif",
                        fontSize: "0.95rem",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "var(--navy-800)", marginBottom: 6 }}>
                      WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="(11) 9XXXX-XXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        border: "1px solid var(--cream-200)",
                        borderRadius: 6,
                        fontFamily: "'Hind', sans-serif",
                        fontSize: "0.95rem",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "var(--navy-800)", marginBottom: 6 }}>
                      Interesse *
                    </label>
                    <select
                      name="interesse"
                      value={formData.interesse}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        border: "1px solid var(--cream-200)",
                        borderRadius: 6,
                        fontFamily: "'Hind', sans-serif",
                        fontSize: "0.95rem",
                      }}
                    >
                      <option value="">Selecione</option>
                      <option value="Seguro para escritório">Seguro para meu escritório</option>
                      <option value="Parceria">Parceria (indicar clientes)</option>
                      <option value="Ambos">Ambos</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "14px 20px",
                      background: loading ? "rgba(139,195,74,0.6)" : "var(--tech-green)",
                      color: "#0d1b3e",
                      border: "none",
                      borderRadius: 6,
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      cursor: loading ? "not-allowed" : "pointer",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.currentTarget.style.background = "var(--tech-green-dark)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!loading) {
                        e.currentTarget.style.background = "var(--tech-green)";
                      }
                    }}
                  >
                    {loading ? "Enviando..." : "Cadastrar"}
                  </button>

                  <p
                    style={{
                      fontFamily: "'Hind', sans-serif",
                      fontSize: "0.8rem",
                      color: "rgba(13,31,78,0.5)",
                      marginTop: 14,
                      textAlign: "center",
                    }}
                  >
                    Entraremos em contato em breve
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
