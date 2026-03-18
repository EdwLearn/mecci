import { Wrench, CheckCircle2 } from "lucide-react"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

const serviceDetails = [
  "Estudios, Diseños, Planificación y Ejecución de Proyectos Industriales de Ingeniería Mecánica.",
  "Diseño de sistemas mecánicos o térmicos para procesos industriales.",
  "Planificar, programar, ejecutar, desarrollar y actualizar programas de mantenimiento preventivo-predictivo de instalaciones, maquinarias y equipos.",
  "Estudios de mantenimiento predictivo mediante el análisis de vibraciones, termografía infrarroja, rayos X y análisis de tribología de aceites.",
  "Diseñar, implementar y mantener planes y proyectos de mejora continua en los sistemas y procesos asignados con el fin de incrementar la eficiencia.",
  "Coordinar actividades de mantenimiento correctivo de instalaciones, maquinarias y equipos, con el fin de corregir y rectificar fallas o averías que se presenten fuera del plan específico de mantenimiento.",
  "Supervisar y controlar las actividades del personal asignado, con el fin de administrar eficientemente su disponibilidad, detectar desviaciones y tomar acciones correctivas.",
]

export default function MecanicaPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
              <Wrench className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Ingeniería Mecánica
            </h1>
          </div>
          <p className="text-lg text-white/80 max-w-3xl">
            Diseño de sistemas mecánicos, mantenimiento industrial y mejora continua de procesos.
          </p>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Nuestros Servicios en Ingeniería Mecánica</h2>
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Imagen izquierda */}
            <div className="lg:w-2/5 shrink-0">
              <img
                src="/welder-working-night.jpg"
                alt="Soldador trabajando"
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
