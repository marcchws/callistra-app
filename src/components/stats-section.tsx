'use client'
import React, { useEffect, useState } from 'react'
import { AnimatedGroup } from '@/components/animations'

interface StatItemProps {
  number: number
  label: string
  suffix?: string
}

const StatItem = ({ number, label, suffix = '' }: StatItemProps) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

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
  }, [isVisible])

  const animateCount = () => {
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
  }

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
  const stats = [
    { number: 500, label: 'Escritórios Atendidos', suffix: '+' },
    { number: 15000, label: 'Processos Gerenciados', suffix: '+' },
    { number: 98, label: 'Satisfação dos Clientes', suffix: '%' },
    { number: 24, label: 'Suporte Disponível', suffix: '/7' }
  ]

  return (
    <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-4">
            Números que comprovam nossa excelência
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mais de uma década transformando a gestão jurídica com resultados comprovados
          </p>
        </div>
        
        <AnimatedGroup className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index}>
              <StatItem 
                number={stat.number} 
                label={stat.label} 
                suffix={stat.suffix}
              />
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  )
}
