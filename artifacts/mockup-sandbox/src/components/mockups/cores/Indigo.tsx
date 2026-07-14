const ACCENT = "#818CF8";
const ACCENT_DARK = "#6366F1";
const ACCENT_TEXT = "#0f0b2d";

export function Indigo() {
  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: "#05142a", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 28px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="26" height="34" viewBox="0 0 38 52" fill="none">
            <polygon points="19,2 19,40 2,40" fill={ACCENT}/>
            <polygon points="22,10 22,40 36,40" fill={ACCENT_DARK}/>
            <rect x="1" y="43" width="36" height="3" rx="1.5" fill={ACCENT}/>
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.06em" }}>DOCKA</span>
            <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400, fontSize: "0.38rem", letterSpacing: "0.28em" }}>SEGUROS</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ color: "#fff", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.08em" }}>E&O</span>
          <span style={{ color: "#fff", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.08em" }}>CYBER</span>
          <span style={{ color: "#fff", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.08em" }}>D&O</span>
          <span style={{ color: "#fff", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.08em" }}>SOBRE NÓS</span>
          <span style={{ color: "#fff", fontSize: "0.6rem", fontWeight: 600, padding: "4px 12px", border: `1.5px solid ${ACCENT}`, borderRadius: 50, letterSpacing: "0.07em" }}>ACESSE SUA CONTA</span>
        </div>
      </nav>
      <div style={{ flex: 1, padding: "52px 32px 32px" }}>
        <h1 style={{ margin: 0, fontWeight: 800, fontSize: "2.2rem", lineHeight: 1.05, textTransform: "uppercase" }}>
          <span style={{ color: "#fff", display: "block" }}>CRESÇA</span>
          <span style={{ color: ACCENT, display: "block" }}>COM CONFIANÇA.</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.78rem", lineHeight: 1.6, margin: "14px 0 0", maxWidth: 300 }}>
          Proteção e gestão de riscos para startups, fintechs e empresas de tecnologia.
        </p>
        <div style={{ marginTop: 22 }}>
          <span style={{ background: ACCENT, color: "#fff", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "10px 22px", borderRadius: 50, display: "inline-flex", alignItems: "center", gap: 6 }}>
            AGENDAR DIAGNÓSTICO <span style={{ fontSize: "0.7rem" }}>›</span>
          </span>
        </div>
        <div style={{ marginTop: 32, padding: "10px 14px", background: "rgba(255,255,255,0.05)", borderRadius: 6, display: "inline-block" }}>
          <span style={{ color: ACCENT, fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.05em" }}>{ACCENT}</span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", marginLeft: 8 }}>Índigo / Violeta</span>
        </div>
      </div>
    </div>
  );
}
