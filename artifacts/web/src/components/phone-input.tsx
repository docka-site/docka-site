import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

interface CountryDial {
  code: string;
  dial: string;
  flag: string;
  name: string;
}

const COUNTRIES: CountryDial[] = [
  { code: "BR", dial: "55",  flag: "\u{1F1E7}\u{1F1F7}", name: "Brasil" },
  { code: "AR", dial: "54",  flag: "\u{1F1E6}\u{1F1F7}", name: "Argentina" },
  { code: "BO", dial: "591", flag: "\u{1F1E7}\u{1F1F4}", name: "Bol\u00edvia" },
  { code: "CL", dial: "56",  flag: "\u{1F1E8}\u{1F1F1}", name: "Chile" },
  { code: "CO", dial: "57",  flag: "\u{1F1E8}\u{1F1F4}", name: "Col\u00f4mbia" },
  { code: "EC", dial: "593", flag: "\u{1F1EA}\u{1F1E8}", name: "Equador" },
  { code: "GY", dial: "592", flag: "\u{1F1EC}\u{1F1FE}", name: "Guiana" },
  { code: "PE", dial: "51",  flag: "\u{1F1F5}\u{1F1EA}", name: "Peru" },
  { code: "PY", dial: "595", flag: "\u{1F1F5}\u{1F1FE}", name: "Paraguai" },
  { code: "SR", dial: "597", flag: "\u{1F1F8}\u{1F1F7}", name: "Suriname" },
  { code: "UY", dial: "598", flag: "\u{1F1FA}\u{1F1FE}", name: "Uruguai" },
  { code: "VE", dial: "58",  flag: "\u{1F1FB}\u{1F1EA}", name: "Venezuela" },
  { code: "US", dial: "1",   flag: "\u{1F1FA}\u{1F1F8}", name: "Estados Unidos" },
  { code: "CA", dial: "1",   flag: "\u{1F1E8}\u{1F1E6}", name: "Canad\u00e1" },
  { code: "MX", dial: "52",  flag: "\u{1F1F2}\u{1F1FD}", name: "M\u00e9xico" },
  { code: "PT", dial: "351", flag: "\u{1F1F5}\u{1F1F9}", name: "Portugal" },
  { code: "ES", dial: "34",  flag: "\u{1F1EA}\u{1F1F8}", name: "Espanha" },
  { code: "FR", dial: "33",  flag: "\u{1F1EB}\u{1F1F7}", name: "Fran\u00e7a" },
  { code: "DE", dial: "49",  flag: "\u{1F1E9}\u{1F1EA}", name: "Alemanha" },
  { code: "GB", dial: "44",  flag: "\u{1F1EC}\u{1F1E7}", name: "Reino Unido" },
  { code: "IT", dial: "39",  flag: "\u{1F1EE}\u{1F1F9}", name: "It\u00e1lia" },
  { code: "NL", dial: "31",  flag: "\u{1F1F3}\u{1F1F1}", name: "Holanda" },
  { code: "CH", dial: "41",  flag: "\u{1F1E8}\u{1F1ED}", name: "Su\u00ed\u00e7a" },
  { code: "AT", dial: "43",  flag: "\u{1F1E6}\u{1F1F9}", name: "\u00c1ustria" },
  { code: "BE", dial: "32",  flag: "\u{1F1E7}\u{1F1EA}", name: "B\u00e9lgica" },
  { code: "JP", dial: "81",  flag: "\u{1F1EF}\u{1F1F5}", name: "Jap\u00e3o" },
  { code: "CN", dial: "86",  flag: "\u{1F1E8}\u{1F1F3}", name: "China" },
  { code: "IN", dial: "91",  flag: "\u{1F1EE}\u{1F1F3}", name: "\u00cdndia" },
  { code: "AU", dial: "61",  flag: "\u{1F1E6}\u{1F1FA}", name: "Austr\u00e1lia" },
  { code: "AO", dial: "244", flag: "\u{1F1E6}\u{1F1F4}", name: "Angola" },
  { code: "MZ", dial: "258", flag: "\u{1F1F2}\u{1F1FF}", name: "Mo\u00e7ambique" },
  { code: "ZA", dial: "27",  flag: "\u{1F1FF}\u{1F1E6}", name: "\u00c1frica do Sul" },
];

function formatBrNumber(digits: string): string {
  const d = digits.slice(0, 11);
  if (!d) return "";
  let r = "(" + d.slice(0, 2);
  if (d.length > 2) r += ") " + d.slice(2, 7);
  if (d.length > 7) r += "-" + d.slice(7, 11);
  return r;
}

function formatGenericNumber(digits: string): string {
  const d = digits.slice(0, 15);
  return d.match(/.{1,5}/g)?.join(" ") ?? d;
}

export function PhoneInput({
  value,
  onChange,
  onBlur,
  name,
  className,
  initialValue,
}: {
  value: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
  name?: string;
  className?: string;
  initialValue?: string;
}) {
  const [country, setCountry] = useState<CountryDial>(COUNTRIES[0]);
  const [numberDisplay, setNumberDisplay] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    if (initialValue) {
      const match = initialValue.match(/^\+(\d+)\s+(.+)$/);
      if (match) {
        const dial = match[1];
        const found = COUNTRIES.find((c) => c.dial === dial);
        if (found) {
          setCountry(found);
          const digits = match[2].replace(/\D/g, "");
          setNumberDisplay(dial === "55" ? formatBrNumber(digits) : formatGenericNumber(digits));
          return;
        }
      }
      const digits = initialValue.replace(/\D/g, "");
      setNumberDisplay(formatBrNumber(digits));
      return;
    }

    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data: { country_calling_code?: string; country_code?: string }) => {
        const raw = data.country_calling_code?.replace("+", "") ?? "";
        const isoCode = data.country_code ?? "";
        const found =
          COUNTRIES.find((c) => c.code === isoCode) ||
          COUNTRIES.find((c) => c.dial === raw);
        if (found) setCountry(found);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const applyFormat = (digits: string, dial: string) =>
    dial === "55" ? formatBrNumber(digits) : formatGenericNumber(digits);

  const emitValue = (dial: string, digits: string) => {
    if (digits.length < 6) { onChange(""); return; }
    onChange(`+${dial} ${applyFormat(digits, dial)}`);
  };

  const handleCodeSelect = (c: CountryDial) => {
    setCountry(c);
    setOpen(false);
    setSearch("");
    const digits = numberDisplay.replace(/\D/g, "");
    setNumberDisplay(applyFormat(digits, c.dial));
    emitValue(c.dial, digits);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 15);
    const formatted = applyFormat(digits, country.dial);
    setNumberDisplay(formatted);
    emitValue(country.dial, digits);
  };

  const filtered = search
    ? COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.dial.includes(search.replace(/\D/g, ""))
      )
    : COUNTRIES;

  const placeholder = country.dial === "55" ? "(11) 99999-9999" : "N\u00famero";

  return (
    <div
      className={className || "flex w-full rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus-within:ring-4 focus-within:ring-primary/15 focus-within:border-primary transition-all duration-200"}
    >
      <div ref={dropdownRef} className="relative shrink-0">
        <button
          type="button"
          onClick={() => { setOpen((o) => !o); setSearch(""); }}
          className="flex items-center gap-1.5 h-full px-3 border-r border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-l-xl transition-colors text-sm font-medium text-slate-700"
        >
          <span className="text-base leading-none">{country.flag}</span>
          <span>+{country.dial}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="absolute left-0 top-full mt-1.5 w-68 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden"
            style={{ minWidth: "16rem" }}>
            <div className="px-3 py-2 border-b border-slate-100">
              <div className="flex items-center gap-2 px-2 py-1.5 bg-slate-50 rounded-lg">
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar pa\u00eds ou c\u00f3digo..."
                  className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>
            <ul className="max-h-56 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <li className="px-4 py-3 text-sm text-slate-400 text-center">Nenhum pa\u00eds encontrado</li>
              ) : (
                filtered.map((c) => (
                  <li key={c.code}>
                    <button
                      type="button"
                      onClick={() => handleCodeSelect(c)}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors hover:bg-slate-50 ${
                        c.code === country.code ? "bg-primary/5 text-primary font-medium" : "text-slate-700"
                      }`}
                    >
                      <span className="text-base shrink-0">{c.flag}</span>
                      <span className="flex-1 truncate">{c.name}</span>
                      <span className="text-slate-400 shrink-0">+{c.dial}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      <input
        type="text"
        inputMode="tel"
        placeholder={placeholder}
        value={numberDisplay}
        onChange={handleNumberChange}
        onBlur={onBlur}
        name={name}
        className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-slate-900 placeholder:text-slate-400 rounded-r-xl"
      />
    </div>
  );
}
