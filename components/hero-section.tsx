"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/power-plant-is-located-heart-city.jpg"
        >
          <source src="https://videos.pexels.com/video-files/2491284/2491284-hd_1920_1080_24fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/90 via-foreground/70 to-foreground/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance">
            Construyendo el Futuro de la Ingeniería en Colombia
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto text-balance">
            Soluciones integrales en diseño, construcción y mantenimiento de infraestructuras
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8" asChild>
              <a href="#portafolio">
                Ver Proyectos
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-foreground text-lg px-8 bg-transparent"
              asChild
            >
              <a href="#contacto">Contactar</a>
            </Button>
          </div>

          {/* Stats Counter */}
          <StatsCounter />
        </div>
      </div>
    </section>
  )
}

function StatsCounter() {
  const [counts, setCounts] = useState({ years: 0, projects: 0, clients: 0 })
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          animateCounters()
        }
      },
      { threshold: 0.5 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const animateCounters = () => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setCounts({
        years: Math.floor(10 * progress),
        projects: Math.floor(50 * progress),
        clients: Math.floor(20 * progress),
      })

      if (step >= steps) {
        clearInterval(timer)
        setCounts({ years: 10, projects: 50, clients: 20 })
      }
    }, interval)
  }

  const stats = [
    { value: `+${counts.years}`, label: "Años de Experiencia" },
    { value: `+${counts.projects}`, label: "Proyectos Completados" },
    { value: `+${counts.clients}`, label: "Empresas Satisfechas" },
  ]

  return (
    <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <div key={index} className="text-white">
          <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">{stat.value}</div>
          <div className="text-sm sm:text-base text-white/80">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
