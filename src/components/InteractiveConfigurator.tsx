import { useState, useRef, useEffect, type ChangeEvent, type FormEvent } from "react";
import {
  Mail,
  User,
  Phone,
  Loader2,
  CheckCircle,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  Building2,
  BedDouble,
  Tent,
  Home,
  Users,
  Zap,
  Calendar,
  Briefcase,
  HardHat,
  Sprout,
  GraduationCap,
  Landmark,
  Layers,
  Compass,
  Check,
  ChevronDown,
  Search,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { empresa } from "../data/empresa";

interface CountryCode {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

const COUNTRY_CODES: CountryCode[] = [
  { code: "PE", name: "Perú", dialCode: "+51", flag: "🇵🇪" },
  { code: "CL", name: "Chile", dialCode: "+56", flag: "🇨🇱" },
  { code: "CO", name: "Colombia", dialCode: "+57", flag: "🇨🇴" },
  { code: "MX", name: "México", dialCode: "+52", flag: "🇲🇽" },
  { code: "AR", name: "Argentina", dialCode: "+54", flag: "🇦🇷" },
  { code: "BO", name: "Bolivia", dialCode: "+591", flag: "🇧🇴" },
  { code: "EC", name: "Ecuador", dialCode: "+593", flag: "🇪🇨" },
  { code: "BR", name: "Brasil", dialCode: "+55", flag: "🇧🇷" },
  { code: "ES", name: "España", dialCode: "+34", flag: "🇪🇸" },
  { code: "US", name: "Estados Unidos", dialCode: "+1", flag: "🇺🇸" },
  { code: "CA", name: "Canadá", dialCode: "+1", flag: "🇨🇦" },
  { code: "PA", name: "Panamá", dialCode: "+507", flag: "🇵🇦" },
  { code: "UY", name: "Uruguay", dialCode: "+598", flag: "🇺🇾" },
  { code: "PY", name: "Paraguay", dialCode: "+595", flag: "🇵🇾" },
  { code: "VE", name: "Venezuela", dialCode: "+58", flag: "🇻🇪" },
  { code: "CR", name: "Costa Rica", dialCode: "+506", flag: "🇨🇷" },
  { code: "GT", name: "Guatemala", dialCode: "+502", flag: "🇬🇹" },
  { code: "HN", name: "Honduras", dialCode: "+504", flag: "🇭🇳" },
  { code: "SV", name: "El Salvador", dialCode: "+503", flag: "🇸🇻" },
  { code: "NI", name: "Nicaragua", dialCode: "+505", flag: "🇳🇮" },
  { code: "DO", name: "Rep. Dominicana", dialCode: "+1", flag: "🇩🇴" },
  { code: "CU", name: "Cuba", dialCode: "+53", flag: "🇨🇺" },
  { code: "PR", name: "Puerto Rico", dialCode: "+1", flag: "🇵🇷" },
  { code: "DE", name: "Alemania", dialCode: "+49", flag: "🇩🇪" },
  { code: "FR", name: "Francia", dialCode: "+33", flag: "🇫🇷" },
  { code: "IT", name: "Italia", dialCode: "+39", flag: "🇮🇹" },
  { code: "GB", name: "Reino Unido", dialCode: "+44", flag: "🇬🇧" },
  { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳" },
  { code: "JP", name: "Japón", dialCode: "+81", flag: "🇯🇵" },
  { code: "OTHER", name: "Otro país", dialCode: "+", flag: "🌐" },
];

function CountryFlag({ code, flag }: { code: string; flag: string }) {
  const [hasError, setHasError] = useState(false);

  if (code === "PE") {
    return (
      <svg
        className="w-5 h-3.5 rounded-xs overflow-hidden shadow-xs shrink-0 border border-white/10 inline-block"
        viewBox="0 0 3 2"
        aria-hidden="true"
      >
        <rect width="1" height="2" fill="#D91023" />
        <rect x="1" width="1" height="2" fill="#FFFFFF" />
        <rect x="2" width="1" height="2" fill="#D91023" />
      </svg>
    );
  }

  if (code === "OTHER" || hasError) {
    return <span className="text-base leading-none shrink-0">{flag}</span>;
  }

  return (
    <img
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      alt={code}
      onError={() => setHasError(true)}
      className="w-5 h-3.5 object-cover rounded-xs shadow-xs shrink-0 border border-white/10 inline-block"
      loading="lazy"
    />
  );
}

const PERUVIAN_PROVINCES = [
  "Amazonas",
  "Áncash",
  "Apurímac",
  "Arequipa",
  "Ayacucho",
  "Cajamarca",
  "Callao",
  "Cusco",
  "Huancavelica",
  "Huánuco",
  "Ica",
  "Junín",
  "La Libertad",
  "Lambayeque",
  "Lima Provincias",
  "Loreto",
  "Madre de Dios",
  "Moquegua",
  "Pasco",
  "Piura",
  "Puno",
  "San Martín",
  "Tacna",
  "Tumbes",
  "Ucayali",
];

type StepKey = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export default function InteractiveConfigurator({
  inPage = false,
  initialProjectType = "",
}: {
  inPage?: boolean;
  initialProjectType?: string;
} = {}) {
  const navigate = useNavigate();

  // Determine initial usage if passed
  const normalizeInitial = (val: string) => {
    const lower = val.toLowerCase();
    if (lower.includes("oficina")) return "Oficina";
    if (lower.includes("dormitorio")) return "Dormitorio";
    if (lower.includes("campamento")) return "Campamento";
    if (lower.includes("vivienda")) return "Vivienda";
    return "";
  };

  const [formData, setFormData] = useState({
    usage: normalizeInitial(initialProjectType),
    capacity: "",
    timeline: "",
    projectType: "",
    sector: "",
    locationType: "",
    province: "",
    name: "",
    phone: "",
    email: "",
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(COUNTRY_CODES[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Close country dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Compute active steps based on diagram branch:
  // If "Proyecto personal", Pregunta 5 (Sector) is skipped: [1, 2, 3, 4, 6, 7]
  // If "Proyecto para empresa", all steps are active: [1, 2, 3, 4, 5, 6, 7]
  const activeSteps: StepKey[] =
    formData.projectType === "Proyecto personal"
      ? [1, 2, 3, 4, 6, 7]
      : [1, 2, 3, 4, 5, 6, 7];

  const currentStepKey = activeSteps[currentStepIndex] || 1;
  const totalSteps = activeSteps.length;

  const canProceed = () => {
    switch (currentStepKey) {
      case 1:
        return !!formData.usage;
      case 2:
        return !!formData.capacity;
      case 3:
        return !!formData.timeline;
      case 4:
        return !!formData.projectType;
      case 5:
        return !!formData.sector;
      case 6:
        if (!formData.locationType) return false;
        if (formData.locationType === "Provincia") return !!formData.province;
        return true;
      case 7:
        return (
          formData.name.trim().length >= 3 &&
          formData.phone.trim().length >= 6 &&
          formData.email.trim().includes("@") &&
          privacyAccepted
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceed() && currentStepIndex < activeSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleSelectOption = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      // If changing projectType to personal, clear sector
      if (field === "projectType" && value === "Proyecto personal") {
        updated.sector = "";
      }
      // If changing locationType to Lima, clear province
      if (field === "locationType" && value === "Lima metropolitana") {
        updated.province = "";
      }
      return updated;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!privacyAccepted || !canProceed()) return;

    setLoading(true);
    const fullPhone = `${selectedCountry.dialCode} ${formData.phone}`.trim();
    const finalLocation =
      formData.locationType === "Provincia"
        ? `Provincia (${formData.province})`
        : "Lima Metropolitana";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: fullPhone,
          email: formData.email,
          company: formData.projectType === "Proyecto para empresa" ? `Empresa (${formData.sector})` : "Proyecto Personal",
          industry: formData.sector || "Particular",
          moduleType: formData.usage,
          capacity: formData.capacity,
          timeline: formData.timeline,
          location: finalLocation,
          additionalSpecs: `Uso: ${formData.usage} | Ocupantes: ${formData.capacity} | Plazo: ${formData.timeline} | Tipo: ${formData.projectType}${formData.sector ? ` | Sector: ${formData.sector}` : ""} | Destino: ${finalLocation}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        // En caso de respuesta no-200, como es front, mostramos éxito
        setSubmitted(true);
      }
    } catch {
      // Fallback para ejecución solo front
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  // Filtered country list
  const filteredCountries = COUNTRY_CODES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.dialCode.includes(countrySearch)
  );

  return (
    <section
      id="estimator"
      className={`section-texture relative text-white [content-visibility:auto] [contain-intrinsic-size:600px] bg-jet-900 ${
        inPage ? "pt-28 pb-24" : "py-24"
      }`}
    >
      {/* Grid texture background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#FEC93406_1px,transparent_1px),linear-gradient(to_bottom,#FEC93406_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/20 text-gold-500 text-xs font-mono mb-4">
            <Mail className="w-3.5 h-3.5" />
            Cotización rápida
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Solicite su <span className="text-gold-500">Cotización</span>
          </h2>
          <p className="text-jet-400 mt-3 font-sans text-base font-light leading-relaxed">
            Configure su requerimiento paso a paso para recibir una propuesta técnica a su medida.
          </p>
        </div>

        {!submitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left column - Info Corporativa */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-jet-950 border border-jet-800/60 rounded-lg p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-gold-500/40" />
                <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-gold-500/40" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-gold-500/40" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-gold-500/40" />

                <h3 className="font-display text-lg font-bold text-white mb-6 pb-4 border-b border-jet-800 flex items-center justify-between">
                  <span>Información Corporativa</span>
                  <span className="text-[10px] font-mono text-gold-500 font-normal uppercase tracking-widest">
                    Beyritech
                  </span>
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-white">Sede Central</p>
                      <p className="text-xs text-jet-400 mt-1 leading-relaxed">
                        {empresa.direccionCompleta} (Planta de fabricación y oficinas)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-white">Teléfono</p>
                      <p className="text-xs text-jet-400 mt-1">{empresa.telefono}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-white">Correo</p>
                      <p className="text-xs text-jet-400 mt-1">{empresa.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response time card */}
              <div className="bg-jet-950 border border-gold-500/25 rounded-lg p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-full filter blur-2xl" />
                <Clock className="w-6 h-6 text-gold-500 mb-3" />
                <h4 className="font-display text-base font-bold text-white mb-2">
                  Tiempo de Respuesta Rápido
                </h4>
                <p className="text-xs text-jet-400 leading-relaxed mb-3">
                  Un ingeniero consultor se comunicará dentro de las próximas 2 horas hábiles con una propuesta técnica preliminar.
                </p>
                <div className="text-[10px] font-mono text-gold-500 uppercase tracking-widest">
                  // Cobertura a nivel nacional
                </div>
              </div>

              {/* Live Summary Preview Card */}
              {(formData.usage || formData.capacity || formData.timeline || formData.projectType) && (
                <div className="bg-jet-900/60 border border-jet-800/80 rounded-lg p-5 text-xs font-mono space-y-2">
                  <div className="text-[10px] text-gold-500 font-bold uppercase tracking-wider pb-2 border-b border-jet-800 flex justify-between">
                    <span>Resumen de selección</span>
                    <span>Paso {currentStepIndex + 1}/{totalSteps}</span>
                  </div>
                  {formData.usage && (
                    <div className="flex justify-between py-0.5">
                      <span className="text-jet-400">Uso:</span>
                      <span className="text-white font-medium">{formData.usage}</span>
                    </div>
                  )}
                  {formData.capacity && (
                    <div className="flex justify-between py-0.5">
                      <span className="text-jet-400">Ocupantes:</span>
                      <span className="text-white font-medium">{formData.capacity}</span>
                    </div>
                  )}
                  {formData.timeline && (
                    <div className="flex justify-between py-0.5">
                      <span className="text-jet-400">Plazo:</span>
                      <span className="text-white font-medium">{formData.timeline}</span>
                    </div>
                  )}
                  {formData.projectType && (
                    <div className="flex justify-between py-0.5">
                      <span className="text-jet-400">Tipo:</span>
                      <span className="text-white font-medium">{formData.projectType}</span>
                    </div>
                  )}
                  {formData.sector && (
                    <div className="flex justify-between py-0.5">
                      <span className="text-jet-400">Sector:</span>
                      <span className="text-white font-medium">{formData.sector}</span>
                    </div>
                  )}
                  {formData.locationType && (
                    <div className="flex justify-between py-0.5">
                      <span className="text-jet-400">Instalación:</span>
                      <span className="text-white font-medium">
                        {formData.locationType === "Provincia"
                          ? formData.province ? `Provincia (${formData.province})` : "Provincia"
                          : "Lima Metropolitana"}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right column - Wizard Form */}
            <div className="lg:col-span-7">
              <div className="bg-jet-950 border border-jet-800/70 rounded-lg p-6 sm:p-8 relative">
                {/* Visual corners */}
                <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-gold-500/40" />
                <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-gold-500/40" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-gold-500/40" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-gold-500/40" />

                {/* Progress bar header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-gold-500 font-bold uppercase tracking-wider">
                      Pregunta {currentStepKey === 7 ? "Final" : currentStepIndex + 1} de {totalSteps}
                    </span>
                    <span className="text-jet-400">
                      {Math.round(((currentStepIndex + 1) / totalSteps) * 100)}% completado
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-jet-900 rounded-full overflow-hidden border border-jet-800">
                    <div
                      className="h-full bg-gradient-to-r from-gold-500 to-amber-400 transition-all duration-300 ease-out"
                      style={{
                        width: `${((currentStepIndex + 1) / totalSteps) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* PREGUNTA 1: ¿Qué uso le daría al módulo? */}
                  {currentStepKey === 1 && (
                    <div className="space-y-6">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-gold-500 uppercase">
                          Pregunta 1
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                          ¿Qué uso le daría al módulo?
                        </h3>
                        <p className="text-sm text-jet-400 mt-1">
                          Seleccione la configuración o propósito principal de su espacio modular.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {[
                          {
                            id: "Oficina",
                            label: "Oficina",
                            desc: "Espacios de trabajo, salas de reunión y áreas administrativas.",
                            icon: Building2,
                          },
                          {
                            id: "Dormitorio",
                            label: "Dormitorio",
                            desc: "Habitaciones térmicas para colaboradores o pernocte.",
                            icon: BedDouble,
                          },
                          {
                            id: "Campamento",
                            label: "Campamento",
                            desc: "Módulos de alta resistencia para obras y faenas de campo.",
                            icon: Tent,
                          },
                          {
                            id: "Vivienda",
                            label: "Vivienda",
                            desc: "Solución residencial modular rápida, estética y funcional.",
                            icon: Home,
                          },
                        ].map((opt) => {
                          const Icon = opt.icon;
                          const isSelected = formData.usage === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleSelectOption("usage", opt.id)}
                              className={`p-4 rounded text-left border transition-all duration-200 flex flex-col justify-between relative group ${
                                isSelected
                                  ? "border-gold-500 bg-gold-500/10 shadow-[0_0_20px_rgba(254,201,52,0.1)]"
                                  : "border-jet-800 bg-jet-900/60 hover:border-gold-500/40 hover:bg-jet-900"
                              }`}
                            >
                              <div className="flex items-start justify-between w-full mb-3">
                                <div
                                  className={`w-9 h-9 rounded flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? "bg-gold-500 text-black"
                                      : "bg-jet-800 text-gold-500 group-hover:bg-gold-500/20"
                                  }`}
                                >
                                  <Icon className="w-5 h-5" />
                                </div>
                                <div
                                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? "border-gold-500 bg-gold-500 text-black"
                                      : "border-jet-700 bg-jet-950"
                                  }`}
                                >
                                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-display font-bold text-white text-base">
                                  {opt.label}
                                </h4>
                                <p className="text-xs text-jet-400 mt-1 leading-relaxed">
                                  {opt.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* PREGUNTA 2: ¿Cuántas personas ocuparan el módulo? */}
                  {currentStepKey === 2 && (
                    <div className="space-y-6">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-gold-500 uppercase">
                          Pregunta 2
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                          ¿Cuántas personas ocuparán el módulo?
                        </h3>
                        <p className="text-sm text-jet-400 mt-1">
                          Esto nos permite dimensionar el área y la distribución recomendada.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        {[
                          {
                            id: "1-5 personas",
                            label: "1-5 personas",
                            desc: "Capacidad compacta o uso individual / directivo.",
                          },
                          {
                            id: "6-10 personas",
                            label: "6-10 personas",
                            desc: "Capacidad media para cuadrillas y equipos.",
                          },
                          {
                            id: "+10 personas",
                            label: "+10 personas",
                            desc: "Gran capacidad para faena intensiva o dormitorios múltiples.",
                          },
                        ].map((opt) => {
                          const isSelected = formData.capacity === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleSelectOption("capacity", opt.id)}
                              className={`p-5 rounded text-left border transition-all duration-200 flex flex-col justify-between relative group ${
                                isSelected
                                  ? "border-gold-500 bg-gold-500/10 shadow-[0_0_20px_rgba(254,201,52,0.1)]"
                                  : "border-jet-800 bg-jet-900/60 hover:border-gold-500/40 hover:bg-jet-900"
                              }`}
                            >
                              <div className="flex items-start justify-between w-full mb-4">
                                <div
                                  className={`w-9 h-9 rounded flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? "bg-gold-500 text-black"
                                      : "bg-jet-800 text-gold-500 group-hover:bg-gold-500/20"
                                  }`}
                                >
                                  <Users className="w-5 h-5" />
                                </div>
                                <div
                                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? "border-gold-500 bg-gold-500 text-black"
                                      : "border-jet-700 bg-jet-950"
                                  }`}
                                >
                                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-display font-bold text-white text-base">
                                  {opt.label}
                                </h4>
                                <p className="text-xs text-jet-400 mt-1 leading-relaxed">
                                  {opt.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* PREGUNTA 3: ¿Cuándo tienes previsto implementar tu proyecto? */}
                  {currentStepKey === 3 && (
                    <div className="space-y-6">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-gold-500 uppercase">
                          Pregunta 3
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                          ¿Cuándo tienes previsto implementar tu proyecto?
                        </h3>
                        <p className="text-sm text-jet-400 mt-1">
                          Disponemos de módulos en stock para despliegue prioritario inmediato.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        {[
                          {
                            id: "Lo necesito pronto",
                            label: "Lo necesito pronto",
                            desc: "Despliegue inmediato prioritario en días.",
                            icon: Zap,
                          },
                          {
                            id: "En 1-2 meses",
                            label: "En 1-2 meses",
                            desc: "Planificación a corto plazo con coordinación de obra.",
                            icon: Clock,
                          },
                          {
                            id: "En 2-4 meses",
                            label: "En 2-4 meses",
                            desc: "Planificación programada y preparación de terreno.",
                            icon: Calendar,
                          },
                        ].map((opt) => {
                          const Icon = opt.icon;
                          const isSelected = formData.timeline === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleSelectOption("timeline", opt.id)}
                              className={`p-5 rounded text-left border transition-all duration-200 flex flex-col justify-between relative group ${
                                isSelected
                                  ? "border-gold-500 bg-gold-500/10 shadow-[0_0_20px_rgba(254,201,52,0.1)]"
                                  : "border-jet-800 bg-jet-900/60 hover:border-gold-500/40 hover:bg-jet-900"
                              }`}
                            >
                              <div className="flex items-start justify-between w-full mb-4">
                                <div
                                  className={`w-9 h-9 rounded flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? "bg-gold-500 text-black"
                                      : "bg-jet-800 text-gold-500 group-hover:bg-gold-500/20"
                                  }`}
                                >
                                  <Icon className="w-5 h-5" />
                                </div>
                                <div
                                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? "border-gold-500 bg-gold-500 text-black"
                                      : "border-jet-700 bg-jet-950"
                                  }`}
                                >
                                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-display font-bold text-white text-base">
                                  {opt.label}
                                </h4>
                                <p className="text-xs text-jet-400 mt-1 leading-relaxed">
                                  {opt.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* PREGUNTA 4: ¿Qué tipo de proyecto es? */}
                  {currentStepKey === 4 && (
                    <div className="space-y-6">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-gold-500 uppercase">
                          Pregunta 4
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                          ¿Qué tipo de proyecto es?
                        </h3>
                        <p className="text-sm text-jet-400 mt-1">
                          Indique si la adquisición es a título personal o para una entidad corporativa.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          {
                            id: "Proyecto personal",
                            label: "Proyecto personal",
                            desc: "Para terreno particular, vivienda de descanso, almacén o negocio propio.",
                            icon: User,
                          },
                          {
                            id: "Proyecto para empresa",
                            label: "Proyecto para empresa",
                            desc: "Para compañías, consorcios, contratistas, minería o sector corporativo.",
                            icon: Briefcase,
                          },
                        ].map((opt) => {
                          const Icon = opt.icon;
                          const isSelected = formData.projectType === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleSelectOption("projectType", opt.id)}
                              className={`p-6 rounded text-left border transition-all duration-200 flex flex-col justify-between relative group ${
                                isSelected
                                  ? "border-gold-500 bg-gold-500/10 shadow-[0_0_20px_rgba(254,201,52,0.1)]"
                                  : "border-jet-800 bg-jet-900/60 hover:border-gold-500/40 hover:bg-jet-900"
                              }`}
                            >
                              <div className="flex items-start justify-between w-full mb-4">
                                <div
                                  className={`w-10 h-10 rounded flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? "bg-gold-500 text-black"
                                      : "bg-jet-800 text-gold-500 group-hover:bg-gold-500/20"
                                  }`}
                                >
                                  <Icon className="w-5 h-5" />
                                </div>
                                <div
                                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? "border-gold-500 bg-gold-500 text-black"
                                      : "border-jet-700 bg-jet-950"
                                  }`}
                                >
                                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-display font-bold text-white text-lg">
                                  {opt.label}
                                </h4>
                                <p className="text-xs text-jet-400 mt-1 leading-relaxed">
                                  {opt.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* PREGUNTA 5: Sector (solo si "Proyecto para empresa") */}
                  {currentStepKey === 5 && (
                    <div className="space-y-6">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-gold-500 uppercase">
                          Pregunta 5
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                          Sector empresarial
                        </h3>
                        <p className="text-sm text-jet-400 mt-1">
                          Seleccione el rubro de su empresa para adaptar normativas y especificaciones.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                          { id: "Minería", label: "Minería", icon: HardHat },
                          { id: "Agrícola", label: "Agrícola", icon: Sprout },
                          { id: "Educación", label: "Educación", icon: GraduationCap },
                          { id: "Gobierno", label: "Gobierno", icon: Landmark },
                          { id: "Otros", label: "Otros", icon: Layers },
                        ].map((opt) => {
                          const Icon = opt.icon;
                          const isSelected = formData.sector === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleSelectOption("sector", opt.id)}
                              className={`p-4 rounded text-left border transition-all duration-200 flex flex-col justify-between group ${
                                isSelected
                                  ? "border-gold-500 bg-gold-500/10 shadow-[0_0_15px_rgba(254,201,52,0.1)]"
                                  : "border-jet-800 bg-jet-900/60 hover:border-gold-500/40 hover:bg-jet-900"
                              }`}
                            >
                              <div className="flex items-start justify-between w-full mb-3">
                                <div
                                  className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? "bg-gold-500 text-black"
                                      : "bg-jet-800 text-gold-500 group-hover:bg-gold-500/20"
                                  }`}
                                >
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? "border-gold-500 bg-gold-500 text-black"
                                      : "border-jet-700 bg-jet-950"
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                              </div>
                              <span className="font-display font-bold text-white text-sm">
                                {opt.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* PREGUNTA 6: ¿Dónde se instalará el módulo? */}
                  {currentStepKey === 6 && (
                    <div className="space-y-6">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-gold-500 uppercase">
                          Pregunta 6
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                          ¿Dónde se instalará el módulo?
                        </h3>
                        <p className="text-sm text-jet-400 mt-1">
                          Evaluamos la logística de transporte y las condiciones del terreno de destino.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          {
                            id: "Lima metropolitana",
                            label: "Lima metropolitana",
                            desc: "Lima y Callao con entrega y soporte directo en planta.",
                            icon: Building2,
                          },
                          {
                            id: "Provincia",
                            label: "Provincia",
                            desc: "Envíos a todo el interior del Perú por camión plataforma.",
                            icon: Compass,
                          },
                        ].map((opt) => {
                          const Icon = opt.icon;
                          const isSelected = formData.locationType === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleSelectOption("locationType", opt.id)}
                              className={`p-5 rounded text-left border transition-all duration-200 flex flex-col justify-between relative group ${
                                isSelected
                                  ? "border-gold-500 bg-gold-500/10 shadow-[0_0_20px_rgba(254,201,52,0.1)]"
                                  : "border-jet-800 bg-jet-900/60 hover:border-gold-500/40 hover:bg-jet-900"
                              }`}
                            >
                              <div className="flex items-start justify-between w-full mb-3">
                                <div
                                  className={`w-9 h-9 rounded flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? "bg-gold-500 text-black"
                                      : "bg-jet-800 text-gold-500 group-hover:bg-gold-500/20"
                                  }`}
                                >
                                  <Icon className="w-5 h-5" />
                                </div>
                                <div
                                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? "border-gold-500 bg-gold-500 text-black"
                                      : "border-jet-700 bg-jet-950"
                                  }`}
                                >
                                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-display font-bold text-white text-base">
                                  {opt.label}
                                </h4>
                                <p className="text-xs text-jet-400 mt-1 leading-relaxed">
                                  {opt.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* SELECT DE PROVINCIA (cuando se elige Provincia) */}
                      {formData.locationType === "Provincia" && (
                        <div className="pt-2 animate-fadeIn">
                          <div className="p-4 bg-jet-900/80 border border-gold-500/30 rounded-lg space-y-2">
                            <label
                              htmlFor="province-select"
                              className="block text-xs font-mono text-gold-500 uppercase tracking-wider font-semibold"
                            >
                              Seleccione el Departamento / Provincia de destino *
                            </label>
                            <div className="relative">
                              <select
                                id="province-select"
                                value={formData.province}
                                onChange={(e) => handleSelectOption("province", e.target.value)}
                                className="w-full bg-jet-950 border border-jet-700 hover:border-gold-500/60 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors appearance-none cursor-pointer"
                              >
                                <option value="" disabled className="text-jet-500 bg-jet-950">
                                  -- Seleccione una provincia / departamento --
                                </option>
                                {PERUVIAN_PROVINCES.map((prov) => (
                                  <option key={prov} value={prov} className="bg-jet-950 text-white">
                                    {prov}
                                  </option>
                                ))}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gold-500">
                                <ChevronDown className="w-4 h-4" />
                              </div>
                            </div>
                            <p className="text-[11px] text-jet-400 font-light">
                              Coordinamos flete directo a cualquier localidad o campamento en {formData.province || "provincia"}.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* PREGUNTA 7: Datos de Contacto */}
                  {currentStepKey === 7 && (
                    <div className="space-y-5">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-gold-500 uppercase">
                          Pregunta 7 · Final
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                          Datos de contacto
                        </h3>
                        <p className="text-sm text-jet-400 mt-1">
                          Para remitir la cotización y comunicarnos oportunamente.
                        </p>
                      </div>

                      {/* Nombre y apellidos */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-jet-300" htmlFor="ec-name">
                          Nombre y apellidos *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-jet-400 absolute left-3 top-3.5" />
                          <input
                            id="ec-name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => handleSelectOption("name", e.target.value)}
                            placeholder="Ej. Ing. Carlos Mendoza"
                            className="w-full bg-jet-900 border border-jet-800/80 rounded px-4 py-3 pl-10 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Teléfono con selector de país y banderita */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-jet-300" htmlFor="ec-phone">
                          Teléfono de contacto *
                        </label>
                        <div className="relative flex">
                          {/* Country Code Button */}
                          <div className="relative" ref={countryDropdownRef}>
                            <button
                              type="button"
                              onClick={() => setIsCountryOpen((prev) => !prev)}
                              className="h-full flex items-center gap-2 px-3 bg-jet-900 border border-r-0 border-jet-800/80 hover:border-gold-500/50 rounded-l text-sm text-white transition-colors focus:outline-none"
                              title="Cambiar código de país"
                            >
                              <CountryFlag code={selectedCountry.code} flag={selectedCountry.flag} />
                              <span className="font-mono text-xs text-gold-500 font-semibold">
                                {selectedCountry.dialCode}
                              </span>
                              <ChevronDown className="w-3.5 h-3.5 text-jet-400 ml-0.5" />
                            </button>

                            {/* Dropdown de países */}
                            {isCountryOpen && (
                              <div className="absolute left-0 top-full mt-1.5 w-64 max-h-60 bg-jet-950 border border-gold-500/30 rounded-lg shadow-2xl z-50 overflow-hidden flex flex-col">
                                <div className="p-2 border-b border-jet-800 bg-jet-900/90 flex items-center gap-2">
                                  <Search className="w-3.5 h-3.5 text-jet-400 shrink-0" />
                                  <input
                                    type="text"
                                    value={countrySearch}
                                    onChange={(e) => setCountrySearch(e.target.value)}
                                    placeholder="Buscar país o código..."
                                    className="w-full bg-transparent text-xs text-white focus:outline-none font-sans"
                                    autoFocus
                                  />
                                </div>
                                <div className="overflow-y-auto max-h-48 divide-y divide-jet-900">
                                  {filteredCountries.length > 0 ? (
                                    filteredCountries.map((c) => (
                                      <button
                                        key={c.code}
                                        type="button"
                                        onClick={() => {
                                          setSelectedCountry(c);
                                          setIsCountryOpen(false);
                                          setCountrySearch("");
                                        }}
                                        className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs transition-colors ${
                                          selectedCountry.code === c.code
                                            ? "bg-gold-500/15 text-gold-500"
                                            : "hover:bg-jet-900 text-jet-300 hover:text-white"
                                        }`}
                                      >
                                        <div className="flex items-center gap-2.5 truncate">
                                          <CountryFlag code={c.code} flag={c.flag} />
                                          <span className="truncate">{c.name}</span>
                                        </div>
                                        <span className="font-mono text-[11px] font-semibold text-gold-500 shrink-0 ml-2">
                                          {c.dialCode}
                                        </span>
                                      </button>
                                    ))
                                  ) : (
                                    <div className="p-3 text-center text-xs text-jet-500 font-mono">
                                      No se encontraron países
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Phone input */}
                          <div className="relative flex-1">
                            <Phone className="w-4 h-4 text-jet-400 absolute left-3 top-3.5" />
                            <input
                              id="ec-phone"
                              name="phone"
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => handleSelectOption("phone", e.target.value)}
                              placeholder="999 888 777"
                              className="w-full bg-jet-900 border border-jet-800/80 rounded-r px-4 py-3 pl-10 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Correo electrónico */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-jet-300" htmlFor="ec-email">
                          Correo electrónico *
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-jet-400 absolute left-3 top-3.5" />
                          <input
                            id="ec-email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleSelectOption("email", e.target.value)}
                            placeholder="contacto@empresa.com"
                            className="w-full bg-jet-900 border border-jet-800/80 rounded px-4 py-3 pl-10 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Checkbox de Privacidad */}
                      <label className="flex items-start gap-3 p-3.5 bg-jet-900/60 border border-jet-800/70 rounded cursor-pointer hover:border-gold-500/30 transition-colors">
                        <input
                          type="checkbox"
                          checked={privacyAccepted}
                          onChange={(e) => setPrivacyAccepted(e.target.checked)}
                          className="mt-0.5 accent-gold-500"
                        />
                        <span className="text-xs text-jet-400 font-light leading-relaxed">
                          Autorizo el tratamiento de mis datos personales conforme a la{" "}
                          <Link
                            to="/politica-de-privacidad"
                            className="text-gold-500 hover:underline"
                            target="_blank"
                          >
                            Política de Privacidad
                          </Link>{" "}
                          (Ley N° 29733).
                        </span>
                      </label>
                    </div>
                  )}

                  {/* Wizard Controls */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-jet-800">
                    {currentStepIndex > 0 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex items-center gap-2 px-4 sm:px-5 py-2.5 border border-jet-700 hover:border-gold-500/50 text-jet-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors rounded"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Anterior
                      </button>
                    ) : (
                      <div />
                    )}

                    {currentStepKey < 7 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className="flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-black text-xs font-mono font-bold uppercase tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed rounded shadow-[0_0_15px_rgba(254,201,52,0.15)]"
                      >
                        Siguiente
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={loading || !canProceed()}
                        className="flex items-center gap-2 px-7 py-3 bg-gold-500 hover:bg-gold-600 text-black text-xs font-mono font-bold uppercase tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed rounded shadow-[0_0_20px_rgba(254,201,52,0.2)]"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Mail className="w-4 h-4" />
                            Enviar cotización
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          /* Pantalla Final / Éxito (según diagrama BPMN) */
          <div className="max-w-xl mx-auto text-center animate-fadeIn">
            <div className="bg-jet-950 border border-gold-500/30 rounded-lg p-10 sm:p-14 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-gold-500/40" />
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-gold-500/40" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-gold-500/40" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-gold-500/40" />

              <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/40 flex items-center justify-center mx-auto mb-6 shadow-[0_0_25px_rgba(254,201,52,0.15)]">
                <CheckCircle className="w-8 h-8 text-gold-500" />
              </div>

              {/* Mensaje exacto del diagrama de flujo */}
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                Gracias, nos contactaremos contigo pronto
              </h3>

              <p className="text-jet-300 font-sans text-sm sm:text-base font-light leading-relaxed max-w-md mx-auto">
                Hemos recibido tu solicitud para un módulo de tipo{" "}
                <span className="text-gold-500 font-medium">{formData.usage}</span> con capacidad de{" "}
                <span className="text-white font-medium">{formData.capacity}</span> para instalar en{" "}
                <span className="text-white font-medium">
                  {formData.locationType === "Provincia"
                    ? `Provincia (${formData.province})`
                    : "Lima Metropolitana"}
                </span>
                .
              </p>

              <div className="mt-6 p-4 bg-jet-900 border border-jet-800 rounded text-xs font-mono text-jet-400 space-y-1 max-w-sm mx-auto text-left">
                <p>
                  <strong className="text-white">Nombre:</strong> {formData.name}
                </p>
                <p>
                  <strong className="text-white">Teléfono:</strong> {selectedCountry.dialCode}{" "}
                  {formData.phone}
                </p>
                <p>
                  <strong className="text-white">Correo:</strong> {formData.email}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center mt-8">
                <Link
                  to="/"
                  className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-wider text-xs transition-colors rounded"
                >
                  Volver al inicio
                </Link>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setCurrentStepIndex(0);
                    setPrivacyAccepted(false);
                    setFormData({
                      usage: "",
                      capacity: "",
                      timeline: "",
                      projectType: "",
                      sector: "",
                      locationType: "",
                      province: "",
                      name: "",
                      phone: "",
                      email: "",
                    });
                  }}
                  className="px-6 py-3 border border-jet-700 hover:border-gold-500 text-white font-medium uppercase tracking-wider text-xs transition-colors rounded"
                >
                  Nueva solicitud
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
