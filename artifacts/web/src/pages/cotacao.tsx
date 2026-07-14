import { useEffect, useRef, useState } from "react";
import { useLocation, useSearch } from "wouter";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { ChevronRight, ArrowLeft, ShieldCheck, AlertCircle, Building, Briefcase, FileText, ChevronDown, Search } from "lucide-react";
import { useCreateQuote } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";

// Define the exact enums based on OpenAPI schema
const AtividadeProfissional = z.enum(
  ["advogado", "arquiteto", "dentista", "emp_tecnologia", "contador", "medico", "outras_atividades"],
  { errorMap: () => ({ message: "Insira uma profissão válida" }) }
);

const TipoSeguro = z.enum(["novo", "renovacao"]);

const DistribuicaoGeografica = z.enum(["local", "nacional", "internacional"]);

function validateCnpj(cnpj: string): boolean {
  const digits = cnpj.replace(/\D/g, "");
  if (digits.length !== 14) return false;
  if (/^(\d)\1+$/.test(digits)) return false;

  const calc = (d: string, weights: number[]) => {
    const sum = weights.reduce((acc, w, i) => acc + parseInt(d[i], 10) * w, 0);
    const rem = sum % 11;
    return rem < 2 ? 0 : 11 - rem;
  };

  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const d1 = calc(digits, w1);
  const d2 = calc(digits, w2);

  return parseInt(digits[12], 10) === d1 && parseInt(digits[13], 10) === d2;
}

// Zod Schema for validation
const quoteSchema = z.object({
  nome: z.string().min(1, "Nome completo é obrigatório"),
  telefone: z.string()
    .min(1, "Telefone é obrigatório")
    .refine(
      (val) => val.replace(/\D/g, "").length >= 8,
      "Informe um número de telefone válido"
    ),
  cnpj: z.string()
    .min(1, "CNPJ é obrigatório")
    .refine(
      (val) => val.replace(/\D/g, "").length === 14,
      "Informe o CNPJ completo"
    )
    .refine(
      (val) => validateCnpj(val),
      "CNPJ inválido — verifique os dígitos e tente novamente"
    ),
  email: z.string().email("E-mail inválido"),
  atividadeProfissional: AtividadeProfissional,
  tipoSeguro: TipoSeguro,
  faturamentoAnual: z.coerce.number({ invalid_type_error: "Insira um valor válido" }).min(0, "O valor não pode ser negativo"),
  dataInicioOperacoes: z.string()
    .min(1, "Data é obrigatória")
    .refine((val) => val !== "INVALID", "Informe a data de abertura da empresa no formato dd/mm/aaaa")
    .refine((val) => val !== "FUTURE", "A data não pode ser futura")
    .refine((val) => {
      if (val === "INVALID" || val === "FUTURE" || !val) return false;
      const parts = val.split("-");
      if (parts.length !== 3) return false;
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      const d = parseInt(parts[2], 10);
      const date = new Date(y, m - 1, d);
      // Round-trip: rejects impossible dates like 2020-13-32
      if (date.getFullYear() !== y || date.getMonth() + 1 !== m || date.getDate() !== d) return false;
      const now = new Date();
      const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
      return date <= todayEnd;
    }, "A data não pode ser futura"),
  distribuicaoGeografica: DistribuicaoGeografica,
  qtdAcoes: z.preprocess(
    (val) => (typeof val === "number" && isNaN(val) ? undefined : val),
    z.number({ required_error: "Informe quantas ações judiciais a empresa teve nos últimos 5 anos" })
      .int("Informe quantas ações judiciais a empresa teve nos últimos 5 anos")
      .min(0, "O valor não pode ser negativo")
  ),
  valorAcoes: z.preprocess(
    (val) => (typeof val === "number" && isNaN(val) ? undefined : val),
    z.number({ required_error: "Informe o valor total das ações judiciais" })
      .min(0, "O valor não pode ser negativo")
  ),
  qtdSinistro: z.preprocess(
    (val) => (typeof val === "number" && isNaN(val) ? undefined : val),
    z.number({ required_error: "Informe quantos sinistros a empresa teve nos últimos 5 anos" })
      .int("Informe quantos sinistros a empresa teve nos últimos 5 anos")
      .min(0, "O valor não pode ser negativo")
  ),
  valorSinistro: z.preprocess(
    (val) => (typeof val === "number" && isNaN(val) ? undefined : val),
    z.number({ required_error: "Informe o valor total dos sinistros" })
      .min(0, "O valor não pode ser negativo")
  ),
  politicasRh: z.boolean({
    required_error: "Informe se a empresa possui políticas estruturadas de RH",
    invalid_type_error: "Informe se a empresa possui políticas estruturadas de RH",
  }),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

const steps = [
  { id: 1, title: "Dados Iniciais", icon: Briefcase },
  { id: 2, title: "Operação", icon: Building },
  { id: 3, title: "Histórico", icon: FileText },
];

function CurrencyInput({
  value,
  onChange,
  onBlur,
  name,
}: {
  value: number;
  onChange: (val: number) => void;
  onBlur?: () => void;
  name?: string;
}) {
  const fmt = (num: number) =>
    new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);

  const [display, setDisplay] = useState(() =>
    value !== undefined && !isNaN(value) ? fmt(value) : ""
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    if (digits.length === 0) {
      setDisplay("");
      onChange(NaN);
      return;
    }
    const numeric = parseInt(digits, 10) / 100;
    setDisplay(fmt(numeric));
    onChange(numeric);
  };

  return (
    <div className="flex items-center w-full rounded-xl bg-white border border-slate-200 hover:border-slate-300 focus-within:ring-4 focus-within:ring-primary/15 focus-within:border-primary transition-all duration-200 ease-out">
      <span className="pl-4 pr-1 text-slate-500 font-medium shrink-0 select-none">R$</span>
      <input
        type="text"
        inputMode="numeric"
        placeholder="0,00"
        value={display}
        onChange={handleChange}
        onBlur={onBlur}
        name={name}
        className="flex-1 py-3 pr-4 pl-1 bg-transparent focus:outline-none text-slate-900 placeholder:text-slate-400 rounded-r-xl"
      />
    </div>
  );
}

function DateInput({
  value,
  onChange,
  onBlur,
  name,
}: {
  value: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
  name?: string;
}) {
  const toDisplay = (iso: string) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    if (!y || !m || !d) return "";
    return `${d}/${m}/${y}`;
  };

  const [display, setDisplay] = useState(() => toDisplay(value));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 8);
    let masked = digits;
    if (digits.length > 2) masked = digits.slice(0, 2) + "/" + digits.slice(2);
    if (digits.length > 4) masked = digits.slice(0, 2) + "/" + digits.slice(2, 4) + "/" + digits.slice(4);
    setDisplay(masked);

    if (digits.length === 8) {
      const d = parseInt(digits.slice(0, 2), 10);
      const m = parseInt(digits.slice(2, 4), 10);
      const y = parseInt(digits.slice(4, 8), 10);
      // Local date construction avoids UTC-3 timezone issues
      const date = new Date(y, m - 1, d);
      const roundTripOk =
        date.getFullYear() === y &&
        date.getMonth() + 1 === m &&
        date.getDate() === d;
      if (!roundTripOk) {
        onChange("INVALID");
        return;
      }
      const now = new Date();
      const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      if (date >= startOfTomorrow) {
        onChange("FUTURE");
        return;
      }
      const iso = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      onChange(iso);
    } else {
      onChange("");
    }
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      placeholder="dd/mm/aaaa"
      value={display}
      onChange={handleChange}
      onBlur={onBlur}
      name={name}
      maxLength={10}
      className="form-input"
    />
  );
}

interface CountryDial {
  code: string;
  dial: string;
  flag: string;
  name: string;
}

const COUNTRIES: CountryDial[] = [
  { code: "BR", dial: "55",  flag: "🇧🇷", name: "Brasil" },
  { code: "AR", dial: "54",  flag: "🇦🇷", name: "Argentina" },
  { code: "BO", dial: "591", flag: "🇧🇴", name: "Bolívia" },
  { code: "CL", dial: "56",  flag: "🇨🇱", name: "Chile" },
  { code: "CO", dial: "57",  flag: "🇨🇴", name: "Colômbia" },
  { code: "EC", dial: "593", flag: "🇪🇨", name: "Equador" },
  { code: "GY", dial: "592", flag: "🇬🇾", name: "Guiana" },
  { code: "PE", dial: "51",  flag: "🇵🇪", name: "Peru" },
  { code: "PY", dial: "595", flag: "🇵🇾", name: "Paraguai" },
  { code: "SR", dial: "597", flag: "🇸🇷", name: "Suriname" },
  { code: "UY", dial: "598", flag: "🇺🇾", name: "Uruguai" },
  { code: "VE", dial: "58",  flag: "🇻🇪", name: "Venezuela" },
  { code: "US", dial: "1",   flag: "🇺🇸", name: "Estados Unidos" },
  { code: "CA", dial: "1",   flag: "🇨🇦", name: "Canadá" },
  { code: "MX", dial: "52",  flag: "🇲🇽", name: "México" },
  { code: "PT", dial: "351", flag: "🇵🇹", name: "Portugal" },
  { code: "ES", dial: "34",  flag: "🇪🇸", name: "Espanha" },
  { code: "FR", dial: "33",  flag: "🇫🇷", name: "França" },
  { code: "DE", dial: "49",  flag: "🇩🇪", name: "Alemanha" },
  { code: "GB", dial: "44",  flag: "🇬🇧", name: "Reino Unido" },
  { code: "IT", dial: "39",  flag: "🇮🇹", name: "Itália" },
  { code: "NL", dial: "31",  flag: "🇳🇱", name: "Holanda" },
  { code: "CH", dial: "41",  flag: "🇨🇭", name: "Suíça" },
  { code: "AT", dial: "43",  flag: "🇦🇹", name: "Áustria" },
  { code: "BE", dial: "32",  flag: "🇧🇪", name: "Bélgica" },
  { code: "JP", dial: "81",  flag: "🇯🇵", name: "Japão" },
  { code: "CN", dial: "86",  flag: "🇨🇳", name: "China" },
  { code: "IN", dial: "91",  flag: "🇮🇳", name: "Índia" },
  { code: "AU", dial: "61",  flag: "🇦🇺", name: "Austrália" },
  { code: "AO", dial: "244", flag: "🇦🇴", name: "Angola" },
  { code: "MZ", dial: "258", flag: "🇲🇿", name: "Moçambique" },
  { code: "ZA", dial: "27",  flag: "🇿🇦", name: "África do Sul" },
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

function PhoneInput({
  value,
  onChange,
  onBlur,
  name,
}: {
  value: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
  name?: string;
}) {
  const [country, setCountry] = useState<CountryDial>(COUNTRIES[0]);
  const [numberDisplay, setNumberDisplay] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-detect country from IP on mount
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data: { country_calling_code?: string; country_code?: string }) => {
        const raw = data.country_calling_code?.replace("+", "") ?? "";
        const isoCode = data.country_code ?? "";
        // Prefer match by ISO country code for disambiguation (e.g. US vs CA both = "1")
        const found =
          COUNTRIES.find((c) => c.code === isoCode) ||
          COUNTRIES.find((c) => c.dial === raw);
        if (found) setCountry(found);
      })
      .catch(() => {}); // fail silently — defaults to Brasil
  }, []);

  // Close dropdown on outside click
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

  const placeholder = country.dial === "55" ? "(11) 99999-9999" : "Número";

  return (
    <div
      className="flex w-full rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus-within:ring-4 focus-within:ring-primary/15 focus-within:border-primary transition-all duration-200"
    >
      {/* Country code button */}
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
            {/* Search */}
            <div className="px-3 py-2 border-b border-slate-100">
              <div className="flex items-center gap-2 px-2 py-1.5 bg-slate-50 rounded-lg">
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar país ou código..."
                  className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>
            {/* List */}
            <ul className="max-h-56 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <li className="px-4 py-3 text-sm text-slate-400 text-center">Nenhum país encontrado</li>
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

      {/* Number input */}
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

function CnpjInput({
  value,
  onChange,
  onBlur,
  name,
}: {
  value: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
  name?: string;
}) {
  const applyMask = (digits: string) => {
    const d = digits.slice(0, 14);
    let result = d.slice(0, 2);
    if (d.length > 2) result += "." + d.slice(2, 5);
    if (d.length > 5) result += "." + d.slice(5, 8);
    if (d.length > 8) result += "/" + d.slice(8, 12);
    if (d.length > 12) result += "-" + d.slice(12, 14);
    return result;
  };

  const [display, setDisplay] = useState(() => applyMask(value.replace(/\D/g, "")));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 14);
    const masked = applyMask(digits);
    setDisplay(masked);
    onChange(masked);
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      placeholder="00.000.000/0000-00"
      value={display}
      onChange={handleChange}
      onBlur={onBlur}
      name={name}
      className="form-input"
    />
  );
}

function IntegerInput({
  value,
  onChange,
  onBlur,
  name,
}: {
  value: number;
  onChange: (val: number) => void;
  onBlur?: () => void;
  name?: string;
}) {
  const fmt = (num: number) => new Intl.NumberFormat("pt-BR").format(num);

  const [display, setDisplay] = useState(() =>
    value !== undefined && !isNaN(value) ? fmt(value) : ""
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    if (digits.length === 0) {
      setDisplay("");
      onChange(NaN);
      return;
    }
    const numeric = parseInt(digits, 10);
    setDisplay(fmt(numeric));
    onChange(numeric);
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      placeholder="0"
      value={display}
      onChange={handleChange}
      onBlur={onBlur}
      name={name}
      className="form-input"
    />
  );
}

export default function Cotacao() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const emailParams = new URLSearchParams(searchString).get("email");
  
  const [currentStep, setCurrentStep] = useState(1);
  const createQuoteMutation = useCreateQuote();

  const {
    register,
    control,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors }
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      email: emailParams || "",
      dataInicioOperacoes: "",
    },
    mode: "onChange"
  });

  // Redirect if no email
  useEffect(() => {
    if (!emailParams) {
      setLocation("/");
    }
  }, [emailParams, setLocation]);

  const nextStep = async () => {
    let fieldsToValidate: (keyof QuoteFormValues)[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ['nome', 'telefone', 'cnpj', 'email', 'atividadeProfissional', 'tipoSeguro'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['faturamentoAnual', 'dataInicioOperacoes', 'distribuicaoGeografica'];
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async (data: QuoteFormValues) => {
    try {
      await createQuoteMutation.mutateAsync({ data });
      setLocation("/confirmacao");
    } catch (err) {
      console.error("Failed to submit quote:", err);
      // In a real app, we'd show a toast here
    }
  };

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          {/* Progress Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Configure sua Apólice</h1>
            <p className="text-slate-500">Precisamos de alguns detalhes para gerar a melhor cotação.</p>
            
            <div className="mt-8 flex items-start justify-between relative">
              <div className="absolute left-5 right-5 top-5 -translate-y-1/2 z-0">
                <div className="relative w-full h-1 bg-slate-200 rounded-full">
                  <div
                    className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;
                
                return (
                  <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300
                      ${isActive ? 'bg-white border-primary text-primary shadow-lg shadow-primary/20' : 
                        isCompleted ? 'bg-primary border-primary text-white' : 
                        'bg-white border-slate-200 text-slate-400'}
                    `}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-xs font-semibold ${isActive ? 'text-primary' : 'text-slate-500'}`}>
                      {step.title}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Form Card */}
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* STEP 1: Dados Iniciais */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-display font-bold text-slate-900 mb-4">Dados Básicos</h3>
                  </div>

                  <div>
                    <label className="form-label">Nome Completo do Contato</label>
                    <input
                      type="text"
                      placeholder="Maria Silva"
                      {...register("nome")}
                      className="form-input"
                    />
                    {errors.nome && <p className="form-error"><AlertCircle className="w-3.5 h-3.5"/> {errors.nome.message}</p>}
                  </div>

                  <div>
                    <label className="form-label">Telefone</label>
                    <Controller
                      name="telefone"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <PhoneInput
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                        />
                      )}
                    />
                    {errors.telefone && <p className="form-error"><AlertCircle className="w-3.5 h-3.5"/> {errors.telefone.message}</p>}
                  </div>

                  <div>
                    <label className="form-label">CNPJ</label>
                    <Controller
                      name="cnpj"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CnpjInput
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                        />
                      )}
                    />
                    {errors.cnpj && <p className="form-error"><AlertCircle className="w-3.5 h-3.5"/> {errors.cnpj.message}</p>}
                  </div>

                  <div>
                    <label className="form-label">E-mail de Contato</label>
                    <input 
                      type="email" 
                      readOnly
                      {...register("email")} 
                      className="form-input bg-slate-50 text-slate-500 cursor-not-allowed border-slate-200 focus:ring-0"
                    />
                    <p className="text-xs text-slate-500 mt-2 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5"/> E-mail verificado</p>
                  </div>

                  <div>
                    <label className="form-label">Atividade Profissional</label>
                    <select {...register("atividadeProfissional")} className="form-input appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] pr-10">
                      <option value="">Selecione uma atividade...</option>
                      <option value="advogado">Advogado</option>
                      <option value="arquiteto">Arquiteto / Engenheiro</option>
                      <option value="dentista">Dentista</option>
                      <option value="emp_tecnologia">Empresa de Tecnologia</option>
                      <option value="contador">Contador</option>
                      <option value="medico">Médico</option>
                      <option value="outras_atividades">Outras Atividades</option>
                    </select>
                    {errors.atividadeProfissional && <p className="form-error"><AlertCircle className="w-3.5 h-3.5"/> {errors.atividadeProfissional.message}</p>}
                  </div>

                  <div>
                    <label className="form-label">Tipo de Seguro</label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="relative flex cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm focus-within:ring-2 focus-within:ring-primary hover:bg-slate-50 hover:border-slate-300 has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:ring-1 has-[:checked]:ring-primary transition-all">
                        <input type="radio" value="novo" {...register("tipoSeguro")} className="sr-only" />
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900">Novo</span>
                          <span className="text-xs text-slate-500 mt-1">Primeira apólice</span>
                        </div>
                      </label>
                      <label className="relative flex cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm focus-within:ring-2 focus-within:ring-primary hover:bg-slate-50 hover:border-slate-300 has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:ring-1 has-[:checked]:ring-primary transition-all">
                        <input type="radio" value="renovacao" {...register("tipoSeguro")} className="sr-only" />
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900">Renovação</span>
                          <span className="text-xs text-slate-500 mt-1">Já possuo seguro</span>
                        </div>
                      </label>
                    </div>
                    {errors.tipoSeguro && <p className="form-error"><AlertCircle className="w-3.5 h-3.5"/> Selecione o tipo de seguro</p>}
                  </div>
                </div>
              )}

              {/* STEP 2: Operação */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-display font-bold text-slate-900 mb-4">Dados da Operação</h3>
                  </div>

                  <div>
                    <label className="form-label">Faturamento Anual Bruto</label>
                    <Controller
                      control={control}
                      name="faturamentoAnual"
                      render={({ field }) => (
                        <CurrencyInput
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                        />
                      )}
                    />
                    {errors.faturamentoAnual && <p className="form-error"><AlertCircle className="w-3.5 h-3.5"/> {errors.faturamentoAnual.message}</p>}
                  </div>

                  <div>
                    <label className="form-label">Data de Início das Operações</label>
                    <Controller
                      control={control}
                      name="dataInicioOperacoes"
                      render={({ field }) => (
                        <DateInput
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                        />
                      )}
                    />
                    {errors.dataInicioOperacoes && <p className="form-error"><AlertCircle className="w-3.5 h-3.5"/> {errors.dataInicioOperacoes.message}</p>}
                  </div>

                  <div>
                    <label className="form-label">Distribuição Geográfica da Prestação de Serviço</label>
                    <div className="space-y-3">
                      {["local", "nacional", "internacional"].map((val) => (
                        <label key={val} className="flex items-center p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 has-[:checked]:bg-primary/5 has-[:checked]:border-primary transition-colors">
                          <input 
                            type="radio" 
                            value={val} 
                            {...register("distribuicaoGeografica")} 
                            className="w-4 h-4 text-primary focus:ring-primary border-slate-300"
                          />
                          <span className="ml-3 font-medium text-slate-700 capitalize">{val}</span>
                        </label>
                      ))}
                    </div>
                    {errors.distribuicaoGeografica && <p className="form-error"><AlertCircle className="w-3.5 h-3.5"/> Selecione a distribuição</p>}
                  </div>
                </div>
              )}

              {/* STEP 3: Histórico e Risco */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-display font-bold text-slate-900 mb-1">Histórico de Risco</h3>
                    <p className="text-sm text-slate-500 mb-6">Informe eventos dos últimos 5 anos.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div>
                      <label className="form-label">Qtd. de Ações Judiciais</label>
                      <Controller
                        control={control}
                        name="qtdAcoes"
                        render={({ field }) => (
                          <IntegerInput
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                          />
                        )}
                      />
                      {errors.qtdAcoes && <p className="form-error"><AlertCircle className="w-3.5 h-3.5"/> {errors.qtdAcoes.message}</p>}
                    </div>
                    <div>
                      <label className="form-label">Valor total (Ações)</label>
                      <Controller
                        control={control}
                        name="valorAcoes"
                        render={({ field }) => (
                          <CurrencyInput
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                          />
                        )}
                      />
                      {errors.valorAcoes && <p className="form-error"><AlertCircle className="w-3.5 h-3.5"/> {errors.valorAcoes.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div>
                      <label className="form-label">Qtd. de Sinistros (Acionamentos)</label>
                      <Controller
                        control={control}
                        name="qtdSinistro"
                        render={({ field }) => (
                          <IntegerInput
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                          />
                        )}
                      />
                      {errors.qtdSinistro && <p className="form-error"><AlertCircle className="w-3.5 h-3.5"/> {errors.qtdSinistro.message}</p>}
                    </div>
                    <div>
                      <label className="form-label">Valor total (Sinistros)</label>
                      <Controller
                        control={control}
                        name="valorSinistro"
                        render={({ field }) => (
                          <CurrencyInput
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                          />
                        )}
                      />
                      {errors.valorSinistro && <p className="form-error"><AlertCircle className="w-3.5 h-3.5"/> {errors.valorSinistro.message}</p>}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <label className="form-label text-base">A empresa possui políticas estruturadas de Recursos Humanos?</label>
                    <Controller
                      control={control}
                      name="politicasRh"
                      render={({ field }) => (
                        <div className="flex gap-4 mt-3">
                          <label className={`flex-1 relative flex justify-center cursor-pointer rounded-xl border p-4 shadow-sm transition-all ${field.value === true ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                            <input
                              type="radio"
                              className="sr-only"
                              checked={field.value === true}
                              onChange={() => { field.onChange(true); field.onBlur(); }}
                              name={field.name}
                            />
                            <span className="font-semibold text-slate-900">Sim, possui</span>
                          </label>
                          <label className={`flex-1 relative flex justify-center cursor-pointer rounded-xl border p-4 shadow-sm transition-all ${field.value === false ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                            <input
                              type="radio"
                              className="sr-only"
                              checked={field.value === false}
                              onChange={() => { field.onChange(false); field.onBlur(); }}
                              name={field.name}
                            />
                            <span className="font-semibold text-slate-900">Não possui</span>
                          </label>
                        </div>
                      )}
                    />
                    {errors.politicasRh && <p className="form-error mt-2"><AlertCircle className="w-3.5 h-3.5"/> {errors.politicasRh.message}</p>}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                {currentStep > 1 ? (
                  <button 
                    type="button" 
                    onClick={prevStep}
                    className="btn-secondary px-4 py-3"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Voltar
                  </button>
                ) : (
                  <div></div> /* Spacer */
                )}
                
                {currentStep < 3 ? (
                  <button 
                    type="button" 
                    onClick={nextStep}
                    className="btn-primary"
                  >
                    Próximo Passo
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    disabled={createQuoteMutation.isPending}
                    className="btn-primary"
                  >
                    {createQuoteMutation.isPending ? "Enviando..." : "Finalizar Cotação"}
                    {!createQuoteMutation.isPending && <ShieldCheck className="w-5 h-5 ml-2" />}
                  </button>
                )}
              </div>

              {createQuoteMutation.isError && (
                 <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-start gap-3 mt-4 border border-red-100">
                   <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                   <p className="text-sm font-medium">Ocorreu um erro ao enviar sua cotação. Verifique os dados e tente novamente.</p>
                 </div>
              )}

            </form>
          </motion.div>

        </div>
      </div>
    </Layout>
  );
}
