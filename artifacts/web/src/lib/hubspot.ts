const PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID;
const FORM_ID_PARTNERS = import.meta.env.VITE_HUBSPOT_FORM_ID_PARTNERS;

interface PartnerData {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  company?: string;
  hs_lead_status?: string;
  lifecyclestage?: string;
  [key: string]: string | undefined;
}

export async function submitPartnerForm(data: PartnerData): Promise<boolean> {
  if (!PORTAL_ID || !FORM_ID_PARTNERS) {
    console.error("HubSpot credentials not configured");
    return false;
  }

  try {
    const allowedFields = ["firstname", "lastname", "email", "phone", "company"];

    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID_PARTNERS}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "referer": window.location.href,
        },
        body: JSON.stringify({
          fields: Object.entries(data)
            .filter(([name, value]) => allowedFields.includes(name) && value && value.trim() !== "")
            .map(([name, value]) => ({
              name,
              value,
            })),
          context: {
            pageUri: window.location.href,
            pageName: document.title,
            utmParams: captureUtmParams(),
          },
        }),
      }
    );

    if (response.ok) {
      console.log("Partner submitted successfully");
      return true;
    } else {
      console.error("Failed to submit partner:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error submitting partner:", error);
    return false;
  }
}

function captureUtmParams(): Record<string, string> {
  const params: Record<string, string> = {};
  const searchParams = new URLSearchParams(window.location.search);

  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach(
    (param) => {
      const value = searchParams.get(param);
      if (value) {
        params[param] = value;
      }
    }
  );

  return params;
}

export function initAnalytics(): void {
  // Google Analytics 4
  const ga4Id = import.meta.env.VITE_GA4_ID;
  if (ga4Id) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(command: string, arg: string | object) {
      (window as any).dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", ga4Id);
  }

  // LinkedIn Insight Tag
  const linkedInId = import.meta.env.VITE_LINKEDIN_TAG_ID;
  if (linkedInId) {
    const script = document.createElement("script");
    script.innerHTML = `_linkedin_partner_id = "${linkedInId}"; window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; window._linkedin_data_partner_ids.push(_linkedin_partner_id);`;
    document.head.appendChild(script);

    const script2 = document.createElement("script");
    script2.async = true;
    script2.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    document.head.appendChild(script2);
  }
}

declare global {
  interface Window {
    dataLayer?: any[];
  }
}
