'use client'
import React from 'react'
import { EditableTextSimple } from '@/components/editable-text-simple'
import { EditableTestimonials } from '@/components/editable-testimonials'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface TestimonialProps {
  name: string
  role: string
  company: string
  content: string
  avatar?: string
  rating: number
}

const TestimonialCard = ({ name, role, company, content, avatar, rating }: TestimonialProps) => {
  return (
    <Card className="h-full shadow-lg border-primary/10 hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        
        <Quote className="w-8 h-8 text-primary/20 mb-4" />
        
        <p className="text-muted-foreground mb-6 flex-grow italic">
          &ldquo;{content}&rdquo;
        </p>
        
        <div className="flex items-center">
          <Avatar className="w-12 h-12 mr-4">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-primary">{name}</div>
            <div className="text-sm text-muted-foreground">{role}</div>
            <div className="text-sm text-muted-foreground">{company}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function TestimonialsSection() {
  const defaultTestimonials = [
    {
      id: "carlos-mendes",
      name: "Dr. Carlos Mendes",
      role: "Sócio Fundador",
      company: "Mendes & Associados",
      content: "O Callistra revolucionou nosso escritório. A organização dos processos melhorou 300% e nunca mais perdemos um prazo importante. A produtividade da equipe aumentou significativamente.",
      rating: 5
    },
    {
      id: "ana-silva",
      name: "Dra. Ana Silva",
      role: "Advogada",
      company: "Silva Advocacia",
      content: "Interface intuitiva e funcionalidades completas. O sistema de relatórios nos ajuda muito na tomada de decisões estratégicas. Recomendo para qualquer escritório que busca eficiência.",
      rating: 5
    },
    {
      id: "roberto-santos",
      name: "Dr. Roberto Santos",
      role: "Diretor Jurídico",
      company: "Santos & Cia",
      content: "Suporte excepcional e sistema robusto. O Callistra nos permitiu escalar nosso escritório mantendo a qualidade do atendimento. Investimento que se paga rapidamente.",
      rating: 5
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <EditableTextSimple
            id="testimonials-title"
            section="testimonials"
            as="h2"
            className="text-3xl md:text-4xl font-semibold text-primary mb-4">
            O que nossos clientes dizem
          </EditableTextSimple>
          <EditableTextSimple
            id="testimonials-subtitle"
            section="testimonials"
            as="p"
            className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mais de 500 escritórios confiam no Callistra para otimizar sua gestão jurídica
          </EditableTextSimple>
        </div>

        <EditableTestimonials
          id="testimonials-data"
          section="testimonials"
          testimonials={defaultTestimonials}
        />
      </div>
    </section>
  )
}
