"use client"

import { Card } from "@/components/ui/card"
import { useState, useEffect, useRef, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface Project {
  title: string
  category: string
  location: string
  images: string[]
}

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("Todos")
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return
      if (e.key === "Escape") setSelectedProject(null)
      if (e.key === "ArrowLeft") handlePrevImage()
      if (e.key === "ArrowRight") handleNextImage()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedProject, currentImageIndex])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedProject])

  const handlePrevImage = useCallback(() => {
    if (!selectedProject) return
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedProject.images.length - 1 : prev - 1
    )
  }, [selectedProject])

  const handleNextImage = useCallback(() => {
    if (!selectedProject) return
    setCurrentImageIndex((prev) => 
      prev === selectedProject.images.length - 1 ? 0 : prev + 1
    )
  }, [selectedProject])

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

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

  const filters = [
    "Todos",
    "Electricidad Industrial",
    "Redes Media Tensión",
    "Instalaciones en Minas",
    "Iluminación Deportiva",
    "Radiocomunicaciones",
    "Sistemas ITS",
    "Obras Civiles",
    "Obras Mecánicas",
    "Fibra Óptica",
  ]

  const projects = [
    {
      title: "CTC",
      category: "Electricidad Industrial",
      location: "Colombia",
      images: [
        "/01.%20CTC/01.jpg","/01.%20CTC/02.jpg","/01.%20CTC/03.jpg","/01.%20CTC/04.jpg",
        "/01.%20CTC/05.jpg","/01.%20CTC/06.jpg","/01.%20CTC/07.jpg","/01.%20CTC/08.jpg",
        "/01.%20CTC/09.jpg","/01.%20CTC/10.jpg","/01.%20CTC/11.jpg","/01.%20CTC/12.jpeg",
        "/01.%20CTC/13.jpg","/01.%20CTC/14.jpeg","/01.%20CTC/15.jpeg",
      ],
    },
    {
      title: "ENECON",
      category: "Redes Media Tensión",
      location: "Colombia",
      images: [
        "/02.%20ENECON/01.JPEG","/02.%20ENECON/02.jpg","/02.%20ENECON/03.jpg","/02.%20ENECON/04.jpg",
        "/02.%20ENECON/05.JPEG","/02.%20ENECON/06.jpg","/02.%20ENECON/07.JPEG","/02.%20ENECON/08.jpg",
        "/02.%20ENECON/09.jpg","/02.%20ENECON/10.jpg","/02.%20ENECON/11.jpg","/02.%20ENECON/12.jpg",
        "/02.%20ENECON/13.JPEG","/02.%20ENECON/14.JPEG","/02.%20ENECON/15.JPEG","/02.%20ENECON/16.jpg",
        "/02.%20ENECON/17.jpg","/02.%20ENECON/18.jpg","/02.%20ENECON/19.jpg","/02.%20ENECON/20.jpg",
      ],
    },
    {
      title: "COTECSO - RADIANTE T. ORIENTE",
      category: "Radiocomunicaciones",
      location: "Colombia",
      images: [
        "/03.%20COTECSO%20-%20RADIANTE%20T.%20ORIENTE/02.jpg","/03.%20COTECSO%20-%20RADIANTE%20T.%20ORIENTE/03.jpg",
        "/03.%20COTECSO%20-%20RADIANTE%20T.%20ORIENTE/04.jpg","/03.%20COTECSO%20-%20RADIANTE%20T.%20ORIENTE/05.jpg",
        "/03.%20COTECSO%20-%20RADIANTE%20T.%20ORIENTE/06.jpg","/03.%20COTECSO%20-%20RADIANTE%20T.%20ORIENTE/07.jpg",
        "/03.%20COTECSO%20-%20RADIANTE%20T.%20ORIENTE/08.jpg","/03.%20COTECSO%20-%20RADIANTE%20T.%20ORIENTE/09.jpg",
        "/03.%20COTECSO%20-%20RADIANTE%20T.%20ORIENTE/10.jpg","/03.%20COTECSO%20-%20RADIANTE%20T.%20ORIENTE/11.jpg",
        "/03.%20COTECSO%20-%20RADIANTE%20T.%20ORIENTE/12.jpg","/03.%20COTECSO%20-%20RADIANTE%20T.%20ORIENTE/13.jpg",
        "/03.%20COTECSO%20-%20RADIANTE%20T.%20ORIENTE/14.jpeg",
      ],
    },
    {
      title: "MINA LA MARIA - RED MT",
      category: "Instalaciones en Minas",
      location: "Colombia",
      images: [
        "/04.%20MINA%20LA%20MARIA%20-%20RED%20MT/01.JPEG","/04.%20MINA%20LA%20MARIA%20-%20RED%20MT/02.JPEG",
        "/04.%20MINA%20LA%20MARIA%20-%20RED%20MT/03.JPEG","/04.%20MINA%20LA%20MARIA%20-%20RED%20MT/05.JPEG",
        "/04.%20MINA%20LA%20MARIA%20-%20RED%20MT/06.JPEG","/04.%20MINA%20LA%20MARIA%20-%20RED%20MT/08.JPEG",
        "/04.%20MINA%20LA%20MARIA%20-%20RED%20MT/09.JPEG","/04.%20MINA%20LA%20MARIA%20-%20RED%20MT/10.JPEG",
        "/04.%20MINA%20LA%20MARIA%20-%20RED%20MT/12.JPEG","/04.%20MINA%20LA%20MARIA%20-%20RED%20MT/14.JPEG",
        "/04.%20MINA%20LA%20MARIA%20-%20RED%20MT/15.JPEG",
      ],
    },
    {
      title: "CALDAS GOLD - MINERIA",
      category: "Instalaciones en Minas",
      location: "Colombia",
      images: [
        "/05.%20CALDAS%20GOLD%20-%20MINERIA/02.JPEG","/05.%20CALDAS%20GOLD%20-%20MINERIA/04.JPEG",
        "/05.%20CALDAS%20GOLD%20-%20MINERIA/06.JPEG","/05.%20CALDAS%20GOLD%20-%20MINERIA/07.JPEG",
        "/05.%20CALDAS%20GOLD%20-%20MINERIA/09.JPEG","/05.%20CALDAS%20GOLD%20-%20MINERIA/10.JPEG",
        "/05.%20CALDAS%20GOLD%20-%20MINERIA/11.JPEG","/05.%20CALDAS%20GOLD%20-%20MINERIA/12.JPEG",
      ],
    },
    {
      title: "CONSTRUCTORA T. ORIENTE - ARCFLASH",
      category: "Electricidad Industrial",
      location: "Colombia",
      images: [
        "/06.%20CONSTRUCTORA%20T.%20ORIENTE%20-%20ARCFLASH/01.JPEG",
        "/06.%20CONSTRUCTORA%20T.%20ORIENTE%20-%20ARCFLASH/02.JPEG",
        "/06.%20CONSTRUCTORA%20T.%20ORIENTE%20-%20ARCFLASH/05.JPEG",
      ],
    },
    {
      title: "CONSORCIO KRIV - PARQUES DEL RIO",
      category: "Sistemas ITS",
      location: "Medellín",
      images: [
        "/07.%20CONSORCIO%20KRIV%20-%20PARQUES%20DEL%20RIO/03.JPEG",
        "/07.%20CONSORCIO%20KRIV%20-%20PARQUES%20DEL%20RIO/01.JPEG",
        "/07.%20CONSORCIO%20KRIV%20-%20PARQUES%20DEL%20RIO/06.JPEG",
        "/07.%20CONSORCIO%20KRIV%20-%20PARQUES%20DEL%20RIO/08.JPEG",
        "/07.%20CONSORCIO%20KRIV%20-%20PARQUES%20DEL%20RIO/09.JPEG",
        "/07.%20CONSORCIO%20KRIV%20-%20PARQUES%20DEL%20RIO/13.JPEG",
        "/07.%20CONSORCIO%20KRIV%20-%20PARQUES%20DEL%20RIO/14.JPEG",
      ],
    },
    {
      title: "COTECSO - RADIANTE T. SINIFANA",
      category: "Radiocomunicaciones",
      location: "Colombia",
      images: [
        "/08.%20COTECSO%20-%20RADIANTE%20T.%20SINIFANA/02.JPEG",
        "/08.%20COTECSO%20-%20RADIANTE%20T.%20SINIFANA/03.JPEG",
        "/08.%20COTECSO%20-%20RADIANTE%20T.%20SINIFANA/04.JPEG",
        "/08.%20COTECSO%20-%20RADIANTE%20T.%20SINIFANA/05.JPEG",
        "/08.%20COTECSO%20-%20RADIANTE%20T.%20SINIFANA/06.JPEG",
        "/08.%20COTECSO%20-%20RADIANTE%20T.%20SINIFANA/07.JPEG",
      ],
    },
    {
      title: "COTECSO - RADIANTE T. LA QUIEBRA",
      category: "Radiocomunicaciones",
      location: "Colombia",
      images: [
        "/09.%20COTECSO%20-%20RADIANTE%20T.%20LA%20QUIEBRA/01.jpg",
        "/09.%20COTECSO%20-%20RADIANTE%20T.%20LA%20QUIEBRA/02.PNG",
        "/09.%20COTECSO%20-%20RADIANTE%20T.%20LA%20QUIEBRA/04.JPEG",
        "/09.%20COTECSO%20-%20RADIANTE%20T.%20LA%20QUIEBRA/05.JPEG",
        "/09.%20COTECSO%20-%20RADIANTE%20T.%20LA%20QUIEBRA/07.JPEG",
        "/09.%20COTECSO%20-%20RADIANTE%20T.%20LA%20QUIEBRA/08.JPEG",
        "/09.%20COTECSO%20-%20RADIANTE%20T.%20LA%20QUIEBRA/09.JPEG",
        "/09.%20COTECSO%20-%20RADIANTE%20T.%20LA%20QUIEBRA/12.JPEG",
      ],
    },
    {
      title: "MAYEKAWA - COLANTA SAN PEDRO",
      category: "Electricidad Industrial",
      location: "Colombia",
      images: [
        "/10.%20MAYEKAWA%20-%20COLANTA%20SAN%20PEDRO/01.JPEG",
        "/10.%20MAYEKAWA%20-%20COLANTA%20SAN%20PEDRO/02.JPEG",
        "/10.%20MAYEKAWA%20-%20COLANTA%20SAN%20PEDRO/03.JPEG",
        "/10.%20MAYEKAWA%20-%20COLANTA%20SAN%20PEDRO/04.JPEG",
        "/10.%20MAYEKAWA%20-%20COLANTA%20SAN%20PEDRO/07.JPEG",
        "/10.%20MAYEKAWA%20-%20COLANTA%20SAN%20PEDRO/08.JPEG",
        "/10.%20MAYEKAWA%20-%20COLANTA%20SAN%20PEDRO/09.JPEG",
        "/10.%20MAYEKAWA%20-%20COLANTA%20SAN%20PEDRO/11.JPEG",
        "/10.%20MAYEKAWA%20-%20COLANTA%20SAN%20PEDRO/12.JPEG",
      ],
    },
    {
      title: "INECTEL - TESALIA ITS",
      category: "Sistemas ITS",
      location: "Colombia",
      images: [
        "/11.%20INECTEL%20-%20TESALIA%20ITS/02.JPEG",
        "/11.%20INECTEL%20-%20TESALIA%20ITS/03.PNG",
        "/11.%20INECTEL%20-%20TESALIA%20ITS/06.JPEG",
        "/11.%20INECTEL%20-%20TESALIA%20ITS/07.JPEG",
      ],
    },
    {
      title: "COTECSO - RADIANTE T. SUMAPAZ",
      category: "Radiocomunicaciones",
      location: "Colombia",
      images: [
        "/12.%20COTECSO%20-%20RADIANTE%20T.%20SUMAPAZ/02.JPEG",
        "/12.%20COTECSO%20-%20RADIANTE%20T.%20SUMAPAZ/03.JPEG",
        "/12.%20COTECSO%20-%20RADIANTE%20T.%20SUMAPAZ/05.JPEG",
      ],
    },
    {
      title: "MEIER - ESTADIO ATANASIO",
      category: "Iluminación Deportiva",
      location: "Medellín",
      images: [
        "/13.%20MEIER%20-%20ESTADIO%20ATANASIO/03.JPEG","/13.%20MEIER%20-%20ESTADIO%20ATANASIO/04.JPEG",
        "/13.%20MEIER%20-%20ESTADIO%20ATANASIO/05.JPEG","/13.%20MEIER%20-%20ESTADIO%20ATANASIO/06.JPEG",
        "/13.%20MEIER%20-%20ESTADIO%20ATANASIO/01.JPEG","/13.%20MEIER%20-%20ESTADIO%20ATANASIO/02.JPEG",    
        "/13.%20MEIER%20-%20ESTADIO%20ATANASIO/07.JPEG","/13.%20MEIER%20-%20ESTADIO%20ATANASIO/08.JPEG",
        "/13.%20MEIER%20-%20ESTADIO%20ATANASIO/09.JPEG","/13.%20MEIER%20-%20ESTADIO%20ATANASIO/11.JPEG",
        "/13.%20MEIER%20-%20ESTADIO%20ATANASIO/12.JPEG","/13.%20MEIER%20-%20ESTADIO%20ATANASIO/13.JPEG",
        "/13.%20MEIER%20-%20ESTADIO%20ATANASIO/14.JPEG","/13.%20MEIER%20-%20ESTADIO%20ATANASIO/15.JPEG",
        "/13.%20MEIER%20-%20ESTADIO%20ATANASIO/16.JPEG","/13.%20MEIER%20-%20ESTADIO%20ATANASIO/17.JPEG",
        "/13.%20MEIER%20-%20ESTADIO%20ATANASIO/18.JPEG","/13.%20MEIER%20-%20ESTADIO%20ATANASIO/19.JPEG",
      ],
    },
    {
      title: "KAPSCH - ITS SOLAR ARM",
      category: "Sistemas ITS",
      location: "Colombia",
      images: [
        "/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/01.JPEG","/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/02.JPEG",
        "/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/03.JPEG","/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/04.JPEG",
        "/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/06.JPEG","/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/07.JPEG",
        "/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/09.JPEG","/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/10.JPEG",
        "/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/11.JPEG","/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/12.JPEG",
        "/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/13.JPEG","/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/14.JPEG",
        "/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/15.JPEG","/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/16.JPEG",
        "/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/17.JPEG","/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/18.JPEG",
        "/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/19.JPEG","/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/20.JPEG",
        "/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/21.JPEG","/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/22.JPEG",
        "/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/23.JPEG","/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/24.JPEG",
        "/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/25.JPEG","/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/26.JPEG",
        "/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/27.JPEG","/14.%20KAPSCH%20-%20ITS%20SOLAR%20ARM/29.JPEG",
      ],
    },
    {
      title: "MINEXCORP - RED MT 1500 KVA",
      category: "Instalaciones en Minas",
      location: "Colombia",
      images: [
        "/15.%20MINEXCORP%20-%20RED%20MT%201500%20KVA/02.JPEG","/15.%20MINEXCORP%20-%20RED%20MT%201500%20KVA/03.JPEG",
        "/15.%20MINEXCORP%20-%20RED%20MT%201500%20KVA/04.JPEG","/15.%20MINEXCORP%20-%20RED%20MT%201500%20KVA/05.JPEG",
        "/15.%20MINEXCORP%20-%20RED%20MT%201500%20KVA/06.JPEG","/15.%20MINEXCORP%20-%20RED%20MT%201500%20KVA/07.JPEG",
        "/15.%20MINEXCORP%20-%20RED%20MT%201500%20KVA/08.JPEG","/15.%20MINEXCORP%20-%20RED%20MT%201500%20KVA/09.JPEG",
        "/15.%20MINEXCORP%20-%20RED%20MT%201500%20KVA/10.JPEG","/15.%20MINEXCORP%20-%20RED%20MT%201500%20KVA/11.JPEG",
        "/15.%20MINEXCORP%20-%20RED%20MT%201500%20KVA/12.JPEG","/15.%20MINEXCORP%20-%20RED%20MT%201500%20KVA/13.JPEG",
        "/15.%20MINEXCORP%20-%20RED%20MT%201500%20KVA/14.JPEG","/15.%20MINEXCORP%20-%20RED%20MT%201500%20KVA/15.JPEG",
      ],
    },
    {
      title: "MAYEKAWA - CEDI - ELECTRICO",
      category: "Electricidad Industrial",
      location: "Colombia",
      images: [
        "/16.%20MAYEKAWA%20-%20CEDI%20-%20ELECTRICO/ELECTRICO/01.JPEG","/16.%20MAYEKAWA%20-%20CEDI%20-%20ELECTRICO/ELECTRICO/02.JPEG",
        "/16.%20MAYEKAWA%20-%20CEDI%20-%20ELECTRICO/ELECTRICO/03.JPEG","/16.%20MAYEKAWA%20-%20CEDI%20-%20ELECTRICO/ELECTRICO/04.JPEG",
        "/16.%20MAYEKAWA%20-%20CEDI%20-%20ELECTRICO/ELECTRICO/05.JPEG","/16.%20MAYEKAWA%20-%20CEDI%20-%20ELECTRICO/ELECTRICO/06.JPEG",
        "/16.%20MAYEKAWA%20-%20CEDI%20-%20ELECTRICO/ELECTRICO/07.JPEG","/16.%20MAYEKAWA%20-%20CEDI%20-%20ELECTRICO/ELECTRICO/08.JPEG",
        "/16.%20MAYEKAWA%20-%20CEDI%20-%20ELECTRICO/ELECTRICO/09.JPEG","/16.%20MAYEKAWA%20-%20CEDI%20-%20ELECTRICO/ELECTRICO/11.JPEG",
        "/16.%20MAYEKAWA%20-%20CEDI%20-%20ELECTRICO/ELECTRICO/12.JPEG","/16.%20MAYEKAWA%20-%20CEDI%20-%20ELECTRICO/ELECTRICO/13.JPEG",
        "/16.%20MAYEKAWA%20-%20CEDI%20-%20ELECTRICO/ELECTRICO/14.JPEG","/16.%20MAYEKAWA%20-%20CEDI%20-%20ELECTRICO/ELECTRICO/15.JPEG",
        "/16.%20MAYEKAWA%20-%20CEDI%20-%20ELECTRICO/ELECTRICO/16.JPEG","/16.%20MAYEKAWA%20-%20CEDI%20-%20ELECTRICO/ELECTRICO/17.JPEG",
        "/16.%20MAYEKAWA%20-%20CEDI%20-%20ELECTRICO/ELECTRICO/18.JPEG","/16.%20MAYEKAWA%20-%20CEDI%20-%20ELECTRICO/ELECTRICO/20.JPEG",
      ],
    },
    {
      title: "MAYEKAWA - CEDI - MECANICO",
      category: "Obras Mecánicas",
      location: "Colombia",
      images: [
        "/17.%20MAYEKAWA%20-%20CEDI%20-%20MECANICO/MECANICO/01.JPEG","/17.%20MAYEKAWA%20-%20CEDI%20-%20MECANICO/MECANICO/02.JPEG",
        "/17.%20MAYEKAWA%20-%20CEDI%20-%20MECANICO/MECANICO/03.JPEG","/17.%20MAYEKAWA%20-%20CEDI%20-%20MECANICO/MECANICO/04.JPEG",
        "/17.%20MAYEKAWA%20-%20CEDI%20-%20MECANICO/MECANICO/05.JPEG","/17.%20MAYEKAWA%20-%20CEDI%20-%20MECANICO/MECANICO/06.JPEG",
        "/17.%20MAYEKAWA%20-%20CEDI%20-%20MECANICO/MECANICO/07.JPEG","/17.%20MAYEKAWA%20-%20CEDI%20-%20MECANICO/MECANICO/08.JPEG",
        "/17.%20MAYEKAWA%20-%20CEDI%20-%20MECANICO/MECANICO/09.JPEG","/17.%20MAYEKAWA%20-%20CEDI%20-%20MECANICO/MECANICO/10.JPEG",
        "/17.%20MAYEKAWA%20-%20CEDI%20-%20MECANICO/MECANICO/11.JPEG","/17.%20MAYEKAWA%20-%20CEDI%20-%20MECANICO/MECANICO/12.JPEG",
        "/17.%20MAYEKAWA%20-%20CEDI%20-%20MECANICO/MECANICO/13.JPEG","/17.%20MAYEKAWA%20-%20CEDI%20-%20MECANICO/MECANICO/14.JPEG",
        "/17.%20MAYEKAWA%20-%20CEDI%20-%20MECANICO/MECANICO/15.JPEG",
      ],
    },
    {
      title: "MAYEKAWA - CEDI - CIVIL",
      category: "Obras Civiles",
      location: "Colombia",
      images: [
        "/18.%20MAYEKAWA%20-%20CEDI%20-%20CIVIL/CIVIL/01.JPEG","/18.%20MAYEKAWA%20-%20CEDI%20-%20CIVIL/CIVIL/02.JPEG",
        "/18.%20MAYEKAWA%20-%20CEDI%20-%20CIVIL/CIVIL/03.JPEG","/18.%20MAYEKAWA%20-%20CEDI%20-%20CIVIL/CIVIL/04.JPEG",
        "/18.%20MAYEKAWA%20-%20CEDI%20-%20CIVIL/CIVIL/05.JPEG","/18.%20MAYEKAWA%20-%20CEDI%20-%20CIVIL/CIVIL/06.JPEG",
        "/18.%20MAYEKAWA%20-%20CEDI%20-%20CIVIL/CIVIL/07.JPEG","/18.%20MAYEKAWA%20-%20CEDI%20-%20CIVIL/CIVIL/08.JPEG",
        "/18.%20MAYEKAWA%20-%20CEDI%20-%20CIVIL/CIVIL/10.JPEG","/18.%20MAYEKAWA%20-%20CEDI%20-%20CIVIL/CIVIL/11.JPEG",
        "/18.%20MAYEKAWA%20-%20CEDI%20-%20CIVIL/CIVIL/12.JPEG","/18.%20MAYEKAWA%20-%20CEDI%20-%20CIVIL/CIVIL/13.JPEG",
        "/18.%20MAYEKAWA%20-%20CEDI%20-%20CIVIL/CIVIL/14.JPEG","/18.%20MAYEKAWA%20-%20CEDI%20-%20CIVIL/CIVIL/15.JPEG",
      ],
    },
    {
      title: "COTECSO - T. AMAGA",
      category: "Radiocomunicaciones",
      location: "Colombia",
      images: [
        "/20.%20COTECSO%20-%20T.%20AMAGA/01.JPEG","/20.%20COTECSO%20-%20T.%20AMAGA/03.JPEG",
        "/20.%20COTECSO%20-%20T.%20AMAGA/04.JPEG","/20.%20COTECSO%20-%20T.%20AMAGA/06.JPEG",
        "/20.%20COTECSO%20-%20T.%20AMAGA/07.JPEG","/20.%20COTECSO%20-%20T.%20AMAGA/08.JPEG",
        "/20.%20COTECSO%20-%20T.%20AMAGA/09.jpg","/20.%20COTECSO%20-%20T.%20AMAGA/10.jpg",
        "/20.%20COTECSO%20-%20T.%20AMAGA/12.jpg",
      ],
    },
    {
      title: "COTECSO - T. OCCIDENTE DEVIMAR",
      category: "Radiocomunicaciones",
      location: "Colombia",
      images: [
        "/21.%20COTECSO%20-%20T.%20OCCIDENTE%20DEVIMAR/02.JPEG","/21.%20COTECSO%20-%20T.%20OCCIDENTE%20DEVIMAR/03.JPEG",
        "/21.%20COTECSO%20-%20T.%20OCCIDENTE%20DEVIMAR/04.JPEG","/21.%20COTECSO%20-%20T.%20OCCIDENTE%20DEVIMAR/06.JPEG",
        "/21.%20COTECSO%20-%20T.%20OCCIDENTE%20DEVIMAR/07.JPEG","/21.%20COTECSO%20-%20T.%20OCCIDENTE%20DEVIMAR/08.JPEG",
        "/21.%20COTECSO%20-%20T.%20OCCIDENTE%20DEVIMAR/09.JPEG","/21.%20COTECSO%20-%20T.%20OCCIDENTE%20DEVIMAR/10.JPEG",
        "/21.%20COTECSO%20-%20T.%20OCCIDENTE%20DEVIMAR/11.JPEG","/21.%20COTECSO%20-%20T.%20OCCIDENTE%20DEVIMAR/12.JPEG",
        "/21.%20COTECSO%20-%20T.%20OCCIDENTE%20DEVIMAR/13.jpg",
      ],
    },
    {
      title: "COTECSO - ITS CA DEVIMAR",
      category: "Sistemas ITS",
      location: "Colombia",
      images: [
        "/22.%20COTECSO%20-%20ITS%20CA%20DEVIMAR/01.JPEG","/22.%20COTECSO%20-%20ITS%20CA%20DEVIMAR/02.JPEG",
        "/22.%20COTECSO%20-%20ITS%20CA%20DEVIMAR/03.JPEG","/22.%20COTECSO%20-%20ITS%20CA%20DEVIMAR/05.JPEG",
        "/22.%20COTECSO%20-%20ITS%20CA%20DEVIMAR/06.JPEG","/22.%20COTECSO%20-%20ITS%20CA%20DEVIMAR/07.JPEG",
        "/22.%20COTECSO%20-%20ITS%20CA%20DEVIMAR/08.JPEG","/22.%20COTECSO%20-%20ITS%20CA%20DEVIMAR/09.JPEG",
        "/22.%20COTECSO%20-%20ITS%20CA%20DEVIMAR/10.JPEG","/22.%20COTECSO%20-%20ITS%20CA%20DEVIMAR/12.JPEG",
        "/22.%20COTECSO%20-%20ITS%20CA%20DEVIMAR/18.JPEG","/22.%20COTECSO%20-%20ITS%20CA%20DEVIMAR/19.JPEG",
        "/22.%20COTECSO%20-%20ITS%20CA%20DEVIMAR/20.JPEG",
      ],
    },
    {
      title: "COTECSO - CIVIL ITS DEVIMAR",
      category: "Obras Civiles",
      location: "Colombia",
      images: [
        "/23.%20COTECSO%20-%20CIVIL%20ITS%20DEVIMAR/01.JPEG","/23.%20COTECSO%20-%20CIVIL%20ITS%20DEVIMAR/02.JPEG",
        "/23.%20COTECSO%20-%20CIVIL%20ITS%20DEVIMAR/03.JPEG","/23.%20COTECSO%20-%20CIVIL%20ITS%20DEVIMAR/04.JPEG",
        "/23.%20COTECSO%20-%20CIVIL%20ITS%20DEVIMAR/05.JPEG","/23.%20COTECSO%20-%20CIVIL%20ITS%20DEVIMAR/06.JPEG",
        "/23.%20COTECSO%20-%20CIVIL%20ITS%20DEVIMAR/09.JPEG","/23.%20COTECSO%20-%20CIVIL%20ITS%20DEVIMAR/10.JPEG",
        "/23.%20COTECSO%20-%20CIVIL%20ITS%20DEVIMAR/11.JPEG","/23.%20COTECSO%20-%20CIVIL%20ITS%20DEVIMAR/12.jpg",
        "/23.%20COTECSO%20-%20CIVIL%20ITS%20DEVIMAR/13.jpg","/23.%20COTECSO%20-%20CIVIL%20ITS%20DEVIMAR/14.jpg",
        "/23.%20COTECSO%20-%20CIVIL%20ITS%20DEVIMAR/15.jpg","/23.%20COTECSO%20-%20CIVIL%20ITS%20DEVIMAR/17.jpg",
        "/23.%20COTECSO%20-%20CIVIL%20ITS%20DEVIMAR/18.jpg",
      ],
    },
    {
      title: "PROING - MEDELLIN",
      category: "Obras Mecánicas",
      location: "Medellín",
      images: [
        "/24.%20PROING%20-%20MEDELLIN/1.JPEG","/24.%20PROING%20-%20MEDELLIN/4.JPEG",
        "/24.%20PROING%20-%20MEDELLIN/5.JPEG","/24.%20PROING%20-%20MEDELLIN/6.JPEG",
        "/24.%20PROING%20-%20MEDELLIN/7.JPEG","/24.%20PROING%20-%20MEDELLIN/8.JPEG",
        "/24.%20PROING%20-%20MEDELLIN/10.JPEG",
      ],
    },
    {
      title: "CMAM - ITS",
      category: "Sistemas ITS",
      location: "Colombia",
      images: [
        "/25.%20CMAM%20-%20ITS/1.JPEG","/25.%20CMAM%20-%20ITS/3.JPEG",
        "/25.%20CMAM%20-%20ITS/4.JPEG","/25.%20CMAM%20-%20ITS/5.jpg",
        "/25.%20CMAM%20-%20ITS/6.jpg","/25.%20CMAM%20-%20ITS/7.jpg",
        "/25.%20CMAM%20-%20ITS/8.jpg","/25.%20CMAM%20-%20ITS/9.jpg",
        "/25.%20CMAM%20-%20ITS/10.jpg","/25.%20CMAM%20-%20ITS/11.jpg",
        "/25.%20CMAM%20-%20ITS/12.JPEG","/25.%20CMAM%20-%20ITS/13.JPEG",
      ],
    },
    {
      title: "CMAM - FIBRA OPTICA DEVIMAR",
      category: "Fibra Óptica",
      location: "Colombia",
      images: [
        "/26.%20CMAM%20-%20FIBRA%20OPTICA%20DEVIMAR/01.jpg","/26.%20CMAM%20-%20FIBRA%20OPTICA%20DEVIMAR/02.jpg",
        "/26.%20CMAM%20-%20FIBRA%20OPTICA%20DEVIMAR/08.JPEG","/26.%20CMAM%20-%20FIBRA%20OPTICA%20DEVIMAR/09.JPEG",
        "/26.%20CMAM%20-%20FIBRA%20OPTICA%20DEVIMAR/10.JPEG","/26.%20CMAM%20-%20FIBRA%20OPTICA%20DEVIMAR/11.JPEG",
      ],
    },
    {
      title: "COMSA - ITS UF5 PACIFICO 3",
      category: "Sistemas ITS",
      location: "Colombia",
      images: [
        "/27.%20COMSA%20-%20ITS%20UF5%20PACIFICO%203/01.JPEG","/27.%20COMSA%20-%20ITS%20UF5%20PACIFICO%203/02.JPEG",
        "/27.%20COMSA%20-%20ITS%20UF5%20PACIFICO%203/03.JPEG","/27.%20COMSA%20-%20ITS%20UF5%20PACIFICO%203/04.JPEG",
        "/27.%20COMSA%20-%20ITS%20UF5%20PACIFICO%203/05.JPEG","/27.%20COMSA%20-%20ITS%20UF5%20PACIFICO%203/06.jpg",
        "/27.%20COMSA%20-%20ITS%20UF5%20PACIFICO%203/07.jpg","/27.%20COMSA%20-%20ITS%20UF5%20PACIFICO%203/10.jpg",
      ],
    },
    {
      title: "CONSECION ABURRA - RECONECTADORES",
      category: "Redes Media Tensión",
      location: "Colombia",
      images: [
        "/28.%20CONSECION%20ABURRA%20-%20RECONECTADORES/01.JPEG","/28.%20CONSECION%20ABURRA%20-%20RECONECTADORES/02.JPEG",
        "/28.%20CONSECION%20ABURRA%20-%20RECONECTADORES/03.JPEG","/28.%20CONSECION%20ABURRA%20-%20RECONECTADORES/04.JPEG",
        "/28.%20CONSECION%20ABURRA%20-%20RECONECTADORES/05.jpg","/28.%20CONSECION%20ABURRA%20-%20RECONECTADORES/06.jpg",
        "/28.%20CONSECION%20ABURRA%20-%20RECONECTADORES/07.JPEG","/28.%20CONSECION%20ABURRA%20-%20RECONECTADORES/08.JPEG",
        "/28.%20CONSECION%20ABURRA%20-%20RECONECTADORES/09.jpg",
      ],
    },
    {
      title: "PROING - REDES MT",
      category: "Redes Media Tensión",
      location: "Colombia",
      images: [
        "/29.%20PROING%20-%20REDES%20MT/06.JPEG","/29.%20PROING%20-%20REDES%20MT/07.JPEG",
        "/29.%20PROING%20-%20REDES%20MT/08.JPEG","/29.%20PROING%20-%20REDES%20MT/13.jpg",
        "/29.%20PROING%20-%20REDES%20MT/15.JPEG","/29.%20PROING%20-%20REDES%20MT/17.JPEG",
        "/29.%20PROING%20-%20REDES%20MT/18.jpg","/29.%20PROING%20-%20REDES%20MT/19.jpg",
        "/29.%20PROING%20-%20REDES%20MT/20.JPEG",
      ],
    },
    {
      title: "MAYEKAWA - BAVARIA",
      category: "Electricidad Industrial",
      location: "Colombia",
      images: [
        "/30.%20MAYEKAWA%20-%20BAVARIA/01.JPEG","/30.%20MAYEKAWA%20-%20BAVARIA/02.JPEG",
        "/30.%20MAYEKAWA%20-%20BAVARIA/04.JPEG","/30.%20MAYEKAWA%20-%20BAVARIA/05.JPEG",
        "/30.%20MAYEKAWA%20-%20BAVARIA/06.JPEG","/30.%20MAYEKAWA%20-%20BAVARIA/08.JPEG",
        "/30.%20MAYEKAWA%20-%20BAVARIA/09.jpg","/30.%20MAYEKAWA%20-%20BAVARIA/11.JPEG",
        "/30.%20MAYEKAWA%20-%20BAVARIA/12.JPEG","/30.%20MAYEKAWA%20-%20BAVARIA/13.JPEG",
        "/30.%20MAYEKAWA%20-%20BAVARIA/14.JPEG","/30.%20MAYEKAWA%20-%20BAVARIA/15.JPEG",
        "/30.%20MAYEKAWA%20-%20BAVARIA/16.JPEG","/30.%20MAYEKAWA%20-%20BAVARIA/17.JPEG",
        "/30.%20MAYEKAWA%20-%20BAVARIA/18.JPEG","/30.%20MAYEKAWA%20-%20BAVARIA/19.JPEG",
        "/30.%20MAYEKAWA%20-%20BAVARIA/20.JPEG","/30.%20MAYEKAWA%20-%20BAVARIA/21.JPEG",
        "/30.%20MAYEKAWA%20-%20BAVARIA/22.JPEG","/30.%20MAYEKAWA%20-%20BAVARIA/23.JPEG",
        "/30.%20MAYEKAWA%20-%20BAVARIA/24.JPEG","/30.%20MAYEKAWA%20-%20BAVARIA/25.JPEG",
        "/30.%20MAYEKAWA%20-%20BAVARIA/26.JPEG","/30.%20MAYEKAWA%20-%20BAVARIA/27.JPEG",
        "/30.%20MAYEKAWA%20-%20BAVARIA/28.JPEG","/30.%20MAYEKAWA%20-%20BAVARIA/30.jpg",
        "/30.%20MAYEKAWA%20-%20BAVARIA/31.JPEG","/30.%20MAYEKAWA%20-%20BAVARIA/32.JPEG",
        "/30.%20MAYEKAWA%20-%20BAVARIA/33.JPEG",
      ],
    },
    {
      title: "MAYEKAWA - JM NEIVA",
      category: "Electricidad Industrial",
      location: "Colombia",
      images: [
        "/31.%20MAYEKAWA%20-%20JM%20NEIVA/01.JPEG","/31.%20MAYEKAWA%20-%20JM%20NEIVA/04.JPEG",
        "/31.%20MAYEKAWA%20-%20JM%20NEIVA/05.JPEG","/31.%20MAYEKAWA%20-%20JM%20NEIVA/06.JPEG",
        "/31.%20MAYEKAWA%20-%20JM%20NEIVA/07.JPEG","/31.%20MAYEKAWA%20-%20JM%20NEIVA/08.JPEG",
        "/31.%20MAYEKAWA%20-%20JM%20NEIVA/09.JPEG","/31.%20MAYEKAWA%20-%20JM%20NEIVA/10.JPEG",
        "/31.%20MAYEKAWA%20-%20JM%20NEIVA/11.JPEG","/31.%20MAYEKAWA%20-%20JM%20NEIVA/12.JPEG",
        "/31.%20MAYEKAWA%20-%20JM%20NEIVA/13.JPEG","/31.%20MAYEKAWA%20-%20JM%20NEIVA/14.JPEG",
        "/31.%20MAYEKAWA%20-%20JM%20NEIVA/15.JPEG","/31.%20MAYEKAWA%20-%20JM%20NEIVA/16.JPEG",
        "/31.%20MAYEKAWA%20-%20JM%20NEIVA/17.JPEG","/31.%20MAYEKAWA%20-%20JM%20NEIVA/18.JPEG",
        "/31.%20MAYEKAWA%20-%20JM%20NEIVA/19.JPEG","/31.%20MAYEKAWA%20-%20JM%20NEIVA/21.JPEG",
        "/31.%20MAYEKAWA%20-%20JM%20NEIVA/22.JPEG","/31.%20MAYEKAWA%20-%20JM%20NEIVA/23.JPEG",
        "/31.%20MAYEKAWA%20-%20JM%20NEIVA/24.JPEG","/31.%20MAYEKAWA%20-%20JM%20NEIVA/25.JPEG",
        "/31.%20MAYEKAWA%20-%20JM%20NEIVA/26.JPEG","/31.%20MAYEKAWA%20-%20JM%20NEIVA/27.JPEG",
        "/31.%20MAYEKAWA%20-%20JM%20NEIVA/28.JPEG","/31.%20MAYEKAWA%20-%20JM%20NEIVA/29.JPEG",
        "/31.%20MAYEKAWA%20-%20JM%20NEIVA/30.JPEG","/31.%20MAYEKAWA%20-%20JM%20NEIVA/31.JPEG",
        "/31.%20MAYEKAWA%20-%20JM%20NEIVA/36.JPEG","/31.%20MAYEKAWA%20-%20JM%20NEIVA/37.JPEG",
        "/31.%20MAYEKAWA%20-%20JM%20NEIVA/39.JPEG",
      ],
    },
    {
      title: "MAYEKAWA - ECLA CARTAGENA",
      category: "Electricidad Industrial",
      location: "Colombia",
      images: [
        "/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/1.JPEG","/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/02.JPEG",
        "/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/04.JPEG","/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/05.JPEG",
        "/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/06.JPEG","/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/07.JPEG",
        "/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/09.JPEG","/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/10.JPEG",
        "/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/11.JPEG","/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/12.JPEG",
        "/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/13.JPEG","/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/14.JPEG",
        "/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/17.JPEG","/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/18.JPEG",
        "/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/19.JPEG","/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/20.JPEG",
        "/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/21.JPEG","/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/22.JPEG",
        "/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/23.JPEG","/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/24.JPEG",
        "/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/26.JPEG","/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/27.JPEG",
        "/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/28.JPEG","/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/29.jpeg",
        "/32.%20MAYEKAWA%20-%20ECLA%20CARTAGENA/30.jpeg",
      ],
    },
    {
      title: "AUTOPISTA URABA",
      category: "Fibra Óptica",
      location: "Colombia",
      images: [
        "/33.%20AUTOPISTA%20URABA/03.JPEG","/33.%20AUTOPISTA%20URABA/04.JPEG",
        "/33.%20AUTOPISTA%20URABA/05.JPEG","/33.%20AUTOPISTA%20URABA/06.JPEG",
        "/33.%20AUTOPISTA%20URABA/07.JPEG","/33.%20AUTOPISTA%20URABA/08.JPEG",
        "/33.%20AUTOPISTA%20URABA/09.JPEG","/33.%20AUTOPISTA%20URABA/10.jpeg",
        "/33.%20AUTOPISTA%20URABA/11.jpeg","/33.%20AUTOPISTA%20URABA/12.jpeg",
        "/33.%20AUTOPISTA%20URABA/14.jpeg","/33.%20AUTOPISTA%20URABA/15.jpeg",
        "/33.%20AUTOPISTA%20URABA/16.jpeg",
      ],
    },
  ]

  // When "Todos" is selected, show only 1 project per category
  const getFilteredProjects = () => {
    if (activeFilter === "Todos") {
      const seenCategories = new Set<string>()
      return projects.filter((project) => {
        if (seenCategories.has(project.category)) {
          return false
        }
        seenCategories.add(project.category)
        return true
      })
    }
    return projects.filter((p) => p.category === activeFilter)
  }

  const filteredProjects = getFilteredProjects()

  return (
    <>
      {/* Modal Carousel */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Project info */}
          <div className="absolute top-4 left-4 z-50 text-white">
            <h3 className="text-xl sm:text-2xl font-bold">{selectedProject.title}</h3>
            <p className="text-sm text-white/70">{selectedProject.category} - {selectedProject.location}</p>
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {currentImageIndex + 1} / {selectedProject.images.length}
          </div>

          {/* Previous button */}
          {selectedProject.images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrevImage()
              }}
              className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {/* Image container */}
          <div 
            className="relative max-w-5xl max-h-[80vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedProject.images[currentImageIndex]}
              alt={`${selectedProject.title} - Imagen ${currentImageIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>

          {/* Next button */}
          {selectedProject.images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNextImage()
              }}
              className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Thumbnail strip */}
          {selectedProject.images.length > 1 && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50 flex gap-2 max-w-[90vw] overflow-x-auto p-2 bg-black/50 rounded-lg">
              {selectedProject.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(idx)
                  }}
                  className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                    idx === currentImageIndex ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <section id="portafolio" ref={sectionRef} className="py-20 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Proyectos
          </h2>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-primary text-white shadow-lg"
                    : "bg-card text-foreground hover:bg-muted border border-border"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <Card
              key={`${project.category}-${index}`}
              className="group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
              onClick={() => openModal(project)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.images[0] || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {project.images.length > 1 && (
                  <div className="absolute top-3 right-3 bg-foreground/80 text-white text-xs px-2 py-1 rounded-full">
                    +{project.images.length - 1} fotos
                  </div>
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm mb-1">{project.category}</p>
                    <p className="text-sm text-white/80">{project.location}</p>
                    <button className="mt-4 px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-sm font-medium transition-colors">
                      Ver Galeria
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}
