'use client'
import React, { useEffect, useState } from 'react'
import { AnimatedGroup } from '@/components/animations'
import { EditableTextSimple } from '@/components/editable-text-simple'
import { EditableStats } from '@/components/editable-stats'

interface StatItemProps {
  number: number
  label: string
  suffix?: string
}

const StatItem = ({ number, label, suffix = '' }: StatItemProps) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const animateCount = React.useCallback(() => {
    const duration = 2000
    const steps = 60
    const increment = number / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= number) {
        setCount(number)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
  }, [number])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          animateCount()
        }
      },
      { threshold: 0.5 }
    )

    const element = document.getElementById(`stat-${label.replace(/\s+/g, '-').toLowerCase()}`)
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [isVisible, animateCount, label])

  return (
    <div 
      id={`stat-${label.replace(/\s+/g, '-').toLowerCase()}`}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm md:text-base text-muted-foreground font-medium">
        {label}
      </div>
    </div>
  )
}

export default function StatsSection() {
  const defaultStats = [
    { id: 'escritorios', number: 500, label: 'Escritórios Atendidos', suffix: '+' },
    { id: 'processos', number: 15000, label: 'Processos Gerenciados', suffix: '+' },
    { id: 'satisfacao', number: 98, label: 'Satisfação dos Clientes', suffix: '%' },
    { id: 'suporte', number: 24, label: 'Suporte Disponível', suffix: '/7' }
  ]

  return (
    <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <EditableTextSimple
            id="stats-title"
            section="stats"
            as="h2"
            className="text-3xl md:text-4xl font-semibold text-primary mb-4">
            Números que comprovam nossa excelência
          </EditableTextSimple>
          <EditableTextSimple
            id="stats-subtitle"
            section="stats"
            as="p"
            className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mais de uma década transformando a gestão jurídica com resultados comprovados
          </EditableTextSimple>
        </div>

        <EditableStats
          id="stats-data"
          section="stats"
          stats={defaultStats}
        />
      </div>
    </section>
  )
}
