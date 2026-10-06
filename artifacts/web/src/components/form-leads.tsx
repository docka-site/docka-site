import { useState } from "react";
import { submitLeadForm } from "@/lib/hubspot";

interface FormLeadsProps {
  onSuccess?: () => void;
  title?: string;
  subtitle?: string;
}

export function FormLeads({ onSuccess, title, subtitle }: FormLeadsProps) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    company: "",
    jobtitle: "",
    segmento: "",
    faturamento: "",
    contrato_exige_seguro: "",
    comentarios: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const success = await submitLeadForm(formData);
      if (success) {
        setSubmitted(true);
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          company: "",
          jobtitle: "",
          segmento: "",
          faturamento: "",
          contrato_exige_seguro: "",
          comentarios: "",
        });
        if (onSuccess) onSuccess();
        // Redirect to thank you page after 2 seconds
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

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <h3 style={{ color: "var(--tech-green)", fontSize: "1.3rem", fontWeight: 700 }}>
          ✓ Formulário enviado com sucesso!
        </h3>
        <p style={{ color: "rgba(13,31,78,0.6)", marginTop: 10 }}>
          Redirecionando...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "0 auto" }}>
      {title && (
        <h3
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "var(--navy-800)",
            marginBottom: 8,
          }}
        >
          {title}
        </h3>
      )}
      {subtitle && (
        <p
          style={{
            fontFamily: "'Hind', sans-serif",
            fontSize: "0.95rem",
            color: "rgba(13,31,78,0.6)",
            marginBottom: 20,
          }}
        >
          {subtitle}
        </p>
      )}

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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <input
          type="text"
          name="firstname"
          placeholder="Nome"
          value={formData.firstname}
          onChange={handleChange}
          required
          style={{
            padding: "12px 14px",
            border: "1px solid var(--cream-200)",
            borderRadius: 6,
            fontFamily: "'Hind', sans-serif",
            fontSize: "0.95rem",
          }}
        />
        <input
          type="text"
          name="lastname"
          placeholder="Sobrenome"
          value={formData.lastname}
          onChange={handleChange}
          required
          style={{
            padding: "12px 14px",
            border: "1px solid var(--cream-200)",
            borderRadius: 6,
            fontFamily: "'Hind', sans-serif",
            fontSize: "0.95rem",
          }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <input
          type="email"
          name="email"
          placeholder="E-mail corporativo"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            padding: "12px 14px",
            border: "1px solid var(--cream-200)",
            borderRadius: 6,
            fontFamily: "'Hind', sans-serif",
            fontSize: "0.95rem",
          }}
        />
        <input
          type="tel"
          name="phone"
          placeholder="WhatsApp"
          value={formData.phone}
          onChange={handleChange}
          required
          style={{
            padding: "12px 14px",
            border: "1px solid var(--cream-200)",
            borderRadius: 6,
            fontFamily: "'Hind', sans-serif",
            fontSize: "0.95rem",
          }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <input
          type="text"
          name="company"
          placeholder="Empresa"
          value={formData.company}
          onChange={handleChange}
          required
          style={{
            padding: "12px 14px",
            border: "1px solid var(--cream-200)",
            borderRadius: 6,
            fontFamily: "'Hind', sans-serif",
            fontSize: "0.95rem",
          }}
        />
        <input
          type="text"
          name="jobtitle"
          placeholder="Cargo"
          value={formData.jobtitle}
          onChange={handleChange}
          required
          style={{
            padding: "12px 14px",
            border: "1px solid var(--cream-200)",
            borderRadius: 6,
            fontFamily: "'Hind', sans-serif",
            fontSize: "0.95rem",
          }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <select
          name="segmento"
          value={formData.segmento}
          onChange={handleChange}
          required
          style={{
            padding: "12px 14px",
            border: "1px solid var(--cream-200)",
            borderRadius: 6,
            fontFamily: "'Hind', sans-serif",
            fontSize: "0.95rem",
          }}
        >
          <option value="">Segmento</option>
          <option value="Tecnologia">Tecnologia</option>
          <option value="Contabilidade">Contabilidade</option>
          <option value="Advocacia">Advocacia</option>
          <option value="Engenharia">Engenharia/Arquitetura</option>
          <option value="Consultoria">Consultoria</option>
          <option value="Outro">Outro</option>
        </select>
        <select
          name="faturamento"
          value={formData.faturamento}
          onChange={handleChange}
          required
          style={{
            padding: "12px 14px",
            border: "1px solid var(--cream-200)",
            borderRadius: 6,
            fontFamily: "'Hind', sans-serif",
            fontSize: "0.95rem",
          }}
        >
          <option value="">Faturamento anual</option>
          <option value="0-500k">Até R$ 500k</option>
          <option value="500k-2m">R$ 500k - R$ 2M</option>
          <option value="2m-5m">R$ 2M - R$ 5M</option>
          <option value="5m-10m">R$ 5M - R$ 10M</option>
          <option value="10m+">Acima de R$ 10M</option>
        </select>
      </div>

      <select
        name="contrato_exige_seguro"
        value={formData.contrato_exige_seguro}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "12px 14px",
          border: "1px solid var(--cream-200)",
          borderRadius: 6,
          fontFamily: "'Hind', sans-serif",
          fontSize: "0.95rem",
          marginBottom: 16,
        }}
      >
        <option value="">Algum contrato exige seguro?</option>
        <option value="Sim">Sim</option>
        <option value="Não">Não</option>
        <option value="Não sei">Não sei</option>
      </select>

      <textarea
        name="comentarios"
        placeholder="Comentários (opcional)"
        value={formData.comentarios}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "12px 14px",
          border: "1px solid var(--cream-200)",
          borderRadius: 6,
          fontFamily: "'Hind', sans-serif",
          fontSize: "0.95rem",
          minHeight: 100,
          marginBottom: 16,
          resize: "vertical",
        }}
      />

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
        {loading ? "Enviando..." : "Solicitar Análise"}
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
        Responderemos em até 1 dia útil
      </p>
    </form>
  );
}
