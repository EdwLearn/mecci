"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const differentiators = [
    "Equipo multidisciplinario de profesionales",
    "Tecnología de punta en diseño y construcción",
    "Compromiso con la calidad y seguridad",
    "Experiencia en proyectos de gran envergadura",
  ]

  return (
    <section id="sobre-nosotros" ref={sectionRef} className="py-20 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <img src="/portrait-male-engineer-working-field-engineers-day-celebration.jpg" alt="MECI Team" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">¿Quiénes Somos?</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Somos una empresa colombiana especializada en ingenierías y construcción de infraestructura. Con un grupo
              de profesionales que respaldan con más de 10 años de experiencia, transformamos ideas en proyectos
              exitosos.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Nuestro equipo de profesionales altamente calificados trabaja con dedicación para entregar soluciones
              innovadoras que superan las expectativas de nuestros clientes, manteniendo siempre los más altos
              estándares de calidad y seguridad.
            </p>

            {/* Differentiators */}
            <div className="space-y-4 mb-8">
              {differentiators.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>


          </div>
        </div>
      </div>
    </section>
  )
}
