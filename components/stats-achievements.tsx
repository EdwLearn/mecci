"use client"

import { useEffect, useRef, useState } from "react"

export function StatsAchievements() {
  const [counts, setCounts] = useState({ years: 0, projects: 0, clients: 0, professionals: 0 })
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
        professionals: Math.floor(250 * progress),
      })

      if (step >= steps) {
        clearInterval(timer)
        setCounts({ years: 10, projects: 50, clients: 20, professionals: 250 })
      }
    }, interval)
  }

  const stats = [
    { value: `+${counts.years}`, label: "Años", sublabel: "Experiencia en ingenierías" },
    { value: `+${counts.projects}`, label: "Proyectos", sublabel: "Completados exitosamente" },
    { value: `+${counts.clients}`, label: "Empresas", sublabel: "Confiaron en nuestro equipo" },
    { value: `+${counts.professionals}`, label: "Profesionales", sublabel: "Nos han apoyado" },
  ]

  return (
    <section ref={sectionRef} className="py-20 sm:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-5xl sm:text-6xl font-bold mb-2">{stat.value}</div>
              <div className="text-xl font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-white/80">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
