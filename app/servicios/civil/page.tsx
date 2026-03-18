import { HardHat, CheckCircle2 } from "lucide-react"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

const serviceDetails = [
  "Ingeniería civil integral: estudios, diseños, ejecución, supervisión, inspección e interventoría de proyectos residenciales, comerciales, industriales e infraestructura pública.",
  "Consultoría técnica especializada: peritajes técnicos, evaluación de materiales, métodos constructivos, estudios de idoneidad técnica y análisis de patologías en construcción.",
  "Gerencia y gestión de proyectos: apoyo en Project Management, planificación, control de costos, cronogramas, riesgos, calidad y evaluación técnica de anteproyectos y soluciones alternativas.",
  "Licencias y normatividad: elaboración de pliegos técnicos, especificaciones constructivas y gestión de trámites ante curadurías, alcaldías y entidades regulatorias.",
  "Planeación y ordenamiento territorial: planeación urbana y rural, desarrollo territorial, sistemas de transporte, lotificaciones, urbanizaciones y propiedad horizontal.",
  "Topografía y geotecnia: levantamientos topográficos y geodésicos, estudios de suelos y rocas, estabilidad de taludes, cimentaciones y mejoramiento del terreno.",
  "Ingeniería estructural: diseño, evaluación y reforzamiento estructural, análisis de riesgos sísmicos y rehabilitación de edificaciones existentes.",
  "Ingeniería hidráulica y sanitaria: diseño y construcción de sistemas de acueducto, alcantarillado, drenaje pluvial, regulación fluvial, saneamiento urbano y rural, captación, abastecimiento y tratamiento de aguas.",
  "Ingeniería ambiental: control de erosión, manejo ambiental de obras, estudios hidrológicos y gestión sostenible de recursos hidráulicos.",
  "Infraestructura vial y transporte: diseño, construcción y mantenimiento de vías, pavimentos, obras de movilidad y espacio público.",
]

export default function CivilPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
              <HardHat className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Ingeniería Civil
            </h1>
          </div>
          <p className="text-lg text-white/80 max-w-3xl">
            Proyectos integrales de infraestructura civil, consultoría técnica, gerencia de proyectos y estudios especializados.
          </p>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Nuestros Servicios en Ingeniería Civil</h2>
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Imagen izquierda */}
            <div className="lg:w-2/5 shrink-0">
              <img
                src="/construction-site-22.jpg"
                alt="Obra de ingeniería civil"
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
