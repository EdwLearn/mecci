"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const services = [
  {
    image: "/three-men-orange-safety-gear-are-working-control-panel.jpg",
    title: "Ingeniería Eléctrica",
    description: "Estudios, diseños, ejecución e inspección de proyectos eléctricos residenciales, comerciales e industriales.",
    href: "/servicios/electricidad",
  },
  {
    image: "/technician-using-smartphone-while-installing-fiber-optic-internet-system-electric-pole.jpg",
    title: "Ingeniería Comunicaciones",
    description: "Sistemas de comunicación, cableado estructurado, CCTV, redes y seguridad electrónica.",
    href: "/servicios/comunicaciones",
  },
  {
    image: "/asian-two-business-man-construction-engineers-supervising-progress-construction-project-construction-site.jpg",
    title: "Ingeniería Civil",
    description: "Proyectos integrales de infraestructura civil, consultoría técnica, gerencia de proyectos y estudios especializados.",
    href: "/servicios/civil",
  },
  {
    image: "/welding-male-worker-metal-steel-is-part-beam-structure.jpg",
    title: "Ingeniería Mecánica",
    description: "Diseño de sistemas mecánicos, mantenimiento industrial y mejora continua de procesos.",
    href: "/servicios/mecanica",
  },
]

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="servicios" ref={sectionRef} className="py-20 sm:py-32 bg-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Nuestros Servicios
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Ofrecemos soluciones integrales en ingeniería y construcción
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <Link key={index} href={service.href}>
              <Card
                className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-primary cursor-pointer h-full overflow-hidden ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-foreground/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{service.title}</h3>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
                  <span className="text-primary font-medium group-hover:underline">Ver más →</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
