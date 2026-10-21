import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export function FAQ({ items, title }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{ background: "#fff", padding: "5rem 0" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
        {title && (
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                color: "var(--navy-800)",
                margin: 0,
              }}
            >
              {title}
            </h2>
            <div
              style={{
                width: 40,
                height: 3,
                background: "var(--tech-green)",
                margin: "14px auto 0",
                borderRadius: 2,
              }}
            />
          </div>
        )}

        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {items.map((item, index) => (
            <div
              key={index}
              className="fade-in"
              style={{
                border: "1px solid var(--cream-200)",
                borderRadius: 8,
                marginBottom: 12,
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{
                  width: "100%",
                  padding: "20px",
                  background: openIndex === index ? "var(--cream-100)" : "#fff",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (openIndex !== index) {
                    e.currentTarget.style.background = "var(--cream-100)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (openIndex !== index) {
                    e.currentTarget.style.background = "#fff";
                  }
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--navy-800)",
                      margin: 0,
                    }}
                  >
                    {item.q}
                  </h3>
                </div>
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="var(--tech-green)"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  style={{
                    transform: openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                    flexShrink: 0,
                    marginLeft: 16,
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {openIndex === index && (
                <div style={{ padding: "0 20px 20px", background: "var(--cream-100)" }}>
                  <p
                    style={{
                      fontFamily: "'Hind', sans-serif",
                      fontSize: "0.95rem",
                      color: "rgba(13, 31, 78, 0.7)",
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
