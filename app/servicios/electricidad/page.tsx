import { Zap, CheckCircle2 } from "lucide-react"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

const serviceDetails = [
  "Estudios, Diseños, Ejecución, Inspección, Mantenimiento y Asesoramiento de Obras y Proyectos de Ingeniería Eléctrica, Residenciales, Comerciales e Industriales en Baja, Media y Alta Tensión.",
  "Diseños y ejecución de proyectos de Iluminación interiores y exteriores.",
  "Certificación de instalaciones eléctricas según el RETIE (Reglamento Técnico de Instalaciones Eléctricas), y según el RETILAP (Reglamento Técnico de Instalaciones de Iluminación y Alumbrado Público).",
  "Trámites ante operadores de red para legalizar peticiones de punto de conexión nuevos y/o ampliación de las instalaciones.",
  "Mantenimientos Correctivos a todo tipo de maquinaria eléctrica.",
  "Desarrollo de planes de mantenimiento preventivo-predictivo.",
  "Análisis de calidad energética de instalaciones en baja y media tensión. (Incluye plan de mejoramiento, por compensación de reactivos y/o control de armónicos).",
  "Revisión-Reparación y/o mantenimiento de equipos eléctricos & electrónicos.",
  "Diseño de Controles Eléctricos y Sistemas de Automatización para procesos.",
  "Sistemas SCADA.",
  "Estudios, diseños y montajes de ingeniería para alternativas de suministro de energía eléctrica autónoma o inyección a la red, mediante generación fotovoltaica parcial o completa.",
  "Desarrollo e implementación de proyectos fotovoltaicos a nivel residencial, comercial e industrial.",
  "Tramites de solicitud de petición para inyección a la red de una AGPE ante el OR.",
  "Gestión ante OR, suministro e instalación de medidores bidireccionales para instalaciones AGPE.",
]

export default function ElectricidadPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Ingeniería Eléctrica
            </h1>
          </div>
          <p className="text-lg text-white/80 max-w-3xl">
            Estudios, diseños, ejecución e inspección de proyectos eléctricos residenciales, comerciales e industriales.
          </p>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Nuestros Servicios en Ingeniería Eléctrica</h2>
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Imágenes izquierda */}
            <div className="flex flex-col gap-4 lg:w-2/5 shrink-0">
              <img
                src="/electrical-engineer-woman-checking-voltage-power-distribution-cabinet-control-roompreventive-maintenance-yearlythailand-electrician-working-company.jpg"
                alt="Ingeniera eléctrica revisando tablero"
                className="w-full rounded-xl object-cover aspect-4/3"
              />
              <img
                src="/three-men-orange-safety-gear-are-working-control-panel.jpg"
                alt="Técnicos trabajando en panel eléctrico"
                className="w-full rounded-xl object-cover aspect-4/3"
              />
              <img
                src="/professional-engineer-service-solar-panel-worker-maintenance-cleaning-replacing-solar-panel-solar-photovoltaic-panel-system-industry-roof-saving-energy-with-clean-power.jpg"
                alt="Ingeniero en mantenimiento de paneles solares"
                className="w-full rounded-xl object-cover aspect-4/3"
              />
            </div>
            {/* Lista de servicios */}
            <ul className="space-y-4 flex-1">
              {serviceDetails.map((item, i) => (
                <li key={i} className="flex gap-4 p-4 rounded-lg bg-muted">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </main>
  )
}
