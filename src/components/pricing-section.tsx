"use client";

import { RocketIcon, UsersIcon, ZapIcon } from "lucide-react";
import { SpringButton } from "../../components/gsap/spring-button";
import { StaggerOnScroll } from "../../components/gsap/stagger-on-scroll";
import { Button } from "@/components/ui/button";

export function PricingSection() {
  const handleContractPlan = () => {
    const element = document.getElementById("contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="planos" className="bg-muted py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl font-semibold sm:text-4xl lg:text-5xl text-primary">Planos</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl text-sm sm:text-base">
            Escolha o plano ideal para o seu escritório jurídico. Sem taxas ocultas, sem surpresas.
          </p>
        </div>

        <StaggerOnScroll
          effect="slideInRight"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">

        <div className="bg-card flex flex-col rounded-lg border p-6 sm:p-8 h-full shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-primary">Essencial</h3>
            <div className="text-right">
              <span className="text-primary/70 text-lg font-medium">R$</span>
              <span className="text-3xl sm:text-4xl font-bold text-primary">97</span>
              <span className="text-muted-foreground text-sm">/mês</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm italic mb-6">Ideal para advogados autônomos</p>
          
          <div className="flex-1">
            <p className="text-primary/50 text-xs font-semibold uppercase tracking-wider mb-3">Recursos</p>
            <ul className="space-y-2 text-foreground text-sm">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                Até 3 usuários
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                50 processos ativos
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                Agenda básica
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                Suporte por email
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                Backup automático
              </li>
            </ul>
          </div>
          
          <div className="mt-8">
            <SpringButton
              scale={0.95}
              shaking={false}
              className="hover:bg-primary hover:text-white flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-primary py-3 text-primary font-medium transition-colors duration-200"
              onClick={handleContractPlan}>
              <RocketIcon className="size-4" />
              Começar Agora
            </SpringButton>
          </div>
        </div>

        <div className="bg-white relative flex flex-col rounded-lg border-2 border-secondary-foreground p-6 sm:p-8 h-full shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="bg-secondary-foreground text-white absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-semibold">
            Mais Popular
          </div>
          
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-primary">Profissional</h3>
            <div className="text-right">
              <span className="text-primary/70 text-lg font-medium">R$</span>
              <span className="text-3xl sm:text-4xl font-bold text-primary">197</span>
              <span className="text-muted-foreground text-sm">/mês</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm italic mb-6">Para escritórios em crescimento</p>
          
          <div className="flex-1">
            <p className="text-primary/50 text-xs font-semibold uppercase tracking-wider mb-3">Recursos</p>
            <ul className="space-y-2 text-foreground text-sm">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-secondary-foreground rounded-full mr-3"></span>
                Até 10 usuários
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-secondary-foreground rounded-full mr-3"></span>
                Processos ilimitados
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-secondary-foreground rounded-full mr-3"></span>
                Agenda avançada
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-secondary-foreground rounded-full mr-3"></span>
                Chat interno
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-secondary-foreground rounded-full mr-3"></span>
                Relatórios completos
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-secondary-foreground rounded-full mr-3"></span>
                Suporte prioritário
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-secondary-foreground rounded-full mr-3"></span>
                Integrações básicas
              </li>
            </ul>
          </div>
          
          <div className="mt-8">
            <SpringButton
              scale={0.95}
              shaking={false}
              className="bg-secondary-foreground text-white hover:bg-secondary-foreground/90 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md py-3 font-medium transition-colors duration-200"
              onClick={handleContractPlan}>
              <ZapIcon className="size-4" />
              Contratar Pro
            </SpringButton>
          </div>
        </div>

        <div className="bg-card flex flex-col rounded-lg border p-6 sm:p-8 h-full shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-primary">Enterprise</h3>
            <div className="text-right">
              <span className="text-primary/70 text-lg font-medium">R$</span>
              <span className="text-3xl sm:text-4xl font-bold text-primary">497</span>
              <span className="text-muted-foreground text-sm">/mês</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm italic mb-6">Para grandes escritórios</p>
          
          <div className="flex-1">
            <p className="text-primary/50 text-xs font-semibold uppercase tracking-wider mb-3">Recursos</p>
            <ul className="space-y-2 text-foreground text-sm">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                Usuários ilimitados
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                Processos ilimitados
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                API completa
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                Customizações avançadas
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                Suporte 24/7
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                Gerente de conta dedicado
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                <span className="flex items-center gap-2">
                  Treinamento incluso
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium">
                    Novo
                  </span>
                </span>
              </li>
            </ul>
          </div>
          
          <div className="mt-8">
            <SpringButton
              scale={0.95}
              shaking={false}
              className="bg-secondary hover:bg-primary hover:text-primary-foreground text-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border py-3 font-medium transition-colors duration-200"
              onClick={handleContractPlan}>
              <UsersIcon className="size-4" />
              Contratar Enterprise
            </SpringButton>
          </div>
        </div>
      </StaggerOnScroll>

      <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
        <h3 className="text-2xl sm:text-3xl font-semibold text-primary mb-3">Precisa de algo personalizado?</h3>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto mb-6">
          Vamos conversar e encontrar a solução ideal para seu escritório.
        </p>
        <Button
          className="bg-primary hover:bg-primary/90 text-white px-8 py-3 font-medium transition-colors duration-200"
          onClick={handleContractPlan}
        >
          Falar com Especialista
        </Button>
      </div>
    </div>
  </section>
  );
}