import { Radio, CheckCircle2 } from "lucide-react"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

const serviceDetails = [
  "Estudios, Diseños, Ejecución, Inspección, Mantenimiento y Asesoramiento de Obras en Proyectos de Ingeniería Comunicaciones, Residenciales, Comerciales e Industriales.",
  "Sistemas de comunicación LEAKY FEEDER para túneles y minería.",
  "Sistemas de comunicación satelital (telefonía, mensajería e internet).",
  "Sistemas ISP.",
  "Instalación y mantenimiento de CCTV.",
  "Cableado estructurado.",
  "Telefonía IP, analógica y citofonía.",
  "Sistemas de seguridad con alarmas sonoras.",
  "Radio enlaces punto a punto y multipunto.",
  "Redes wifi-centralizadas.",
  "Sistemas de seguridad biométricos para control de acceso de personal.",
  "Control de accesos instalaciones (barras y torniquetes).",
]

export default function ComunicacionesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
              <Radio className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Ingeniería Comunicaciones
            </h1>
          </div>
          <p className="text-lg text-white/80 max-w-3xl">
            Sistemas de comunicación, cableado estructurado, CCTV, redes y seguridad electrónica.
          </p>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Nuestros Servicios en Ingeniería de Comunicaciones</h2>
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Imagen izquierda */}
            <div className="lg:w-2/5 shrink-0">
              <img
                src="/technician-engineer-fixing-problem-with-servers-data-cables-room.jpg"
                alt="Técnico en sala de servidores"
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
