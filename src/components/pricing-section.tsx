"use client";

import { Button } from "@/components/ui/button";
import { EditablePricingSimple } from "@/components/editable-pricing-simple";
import { EditableTextSimple } from "@/components/editable-text-simple";

export function PricingSection() {
  const handleContractPlan = () => {
    const element = document.getElementById("contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const defaultPlans = [
    {
      id: "essencial",
      name: "Essencial",
      price: 97,
      description: "Ideal para advogados autônomos",
      features: [
        "Até 3 usuários",
        "50 processos ativos",
        "Agenda básica",
        "Suporte por email",
        "Backup automático"
      ],
      buttonText: "Começar Agora"
    },
    {
      id: "profissional",
      name: "Profissional",
      price: 197,
      description: "Para escritórios em crescimento",
      features: [
        "Até 10 usuários",
        "Processos ilimitados",
        "Agenda avançada",
        "Chat interno",
        "Relatórios completos",
        "Suporte prioritário",
        "Integrações básicas"
      ],
      isPopular: true,
      buttonText: "Contratar Pro"
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 497,
      description: "Para grandes escritórios",
      features: [
        "Usuários ilimitados",
        "Processos ilimitados",
        "API completa",
        "Customizações avançadas",
        "Suporte 24/7",
        "Gerente de conta dedicado",
        "Treinamento incluso"
      ],
      buttonText: "Contratar Enterprise"
    }
  ];

  return (
    <section id="planos" className="bg-muted py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 lg:mb-20">
          <EditableTextSimple
            id="pricing-title"
            section="pricing"
            as="h2"
            className="text-3xl font-semibold sm:text-4xl lg:text-5xl text-primary">
            Planos
          </EditableTextSimple>
          <EditableTextSimple
            id="pricing-subtitle"
            section="pricing"
            as="p"
            className="text-muted-foreground mt-4 max-w-2xl text-sm sm:text-base">
            Escolha o plano ideal para o seu escritório jurídico. Sem taxas ocultas, sem surpresas.
          </EditableTextSimple>
        </div>

        <EditablePricingSimple
          id="pricing-plans"
          section="pricing"
          plans={defaultPlans}
          className="max-w-7xl mx-auto"
        />

        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <EditableTextSimple
            id="pricing-custom-title"
            section="pricing"
            as="h3"
            className="text-2xl sm:text-3xl font-semibold text-primary mb-3">
            Precisa de algo personalizado?
          </EditableTextSimple>
          <EditableTextSimple
            id="pricing-custom-description"
            section="pricing"
            as="p"
            className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto mb-6">
            Vamos conversar e encontrar a solução ideal para seu escritório.
          </EditableTextSimple>
          <Button
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 font-medium transition-colors duration-200"
            onClick={handleContractPlan}
          >
            <EditableTextSimple
              id="pricing-custom-button"
              section="pricing"
              className="inline">
              Falar com Especialista
            </EditableTextSimple>
          </Button>
        </div>
      </div>
    </section>
  );
}