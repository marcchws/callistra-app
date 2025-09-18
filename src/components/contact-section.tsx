"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MessageCircle } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    escritorio: "",
    telefone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    // Validate required fields
    if (!formData.nome || !formData.email || !formData.escritorio || !formData.telefone) {
      setSubmitMessage("Preencha os campos obrigatórios");
      setIsSubmitting(false);
      return;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      setSubmitMessage("Insira um e-mail válido");
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission (replace with actual API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Here you would typically send the data to your backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...formData, destination: 'leads@callistra.com.br' })
      // });

      setSubmitMessage("Formulário enviado com sucesso");
      setFormData({ nome: "", email: "", escritorio: "", telefone: "" });
    } catch {
      setSubmitMessage("Erro ao enviar formulário. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Telefone",
      value: "+55 (11) 4004-1234",
      action: "tel:+5511400412 34",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "+55 (11) 91234-5678",
      action: "https://wa.me/5511912345678",
    },
    {
      icon: Mail,
      title: "E-mail",
      value: "contato@callistra.com.br",
      action: "mailto:contato@callistra.com.br",
    },
  ];

  return (
    <section id="contato" className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Fale com um especialista
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Entre em contato conosco e descubra como o Callistra pode transformar
            a gestão do seu escritório de advocacia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="lg:order-1">
            <Card className="border-0 shadow-lg h-full flex flex-col">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-2xl text-primary">
                  Solicite uma demonstração
                </CardTitle>
                <CardDescription>
                  Preencha os dados abaixo e entraremos em contato em até 24 horas.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
                  <div className="space-y-4 flex-1">
                    <div>
                      <Label htmlFor="nome">Nome *</Label>
                      <Input
                        id="nome"
                        name="nome"
                        type="text"
                        value={formData.nome}
                        onChange={handleInputChange}
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="escritorio">Nome do Escritório *</Label>
                      <Input
                        id="escritorio"
                        name="escritorio"
                        type="text"
                        value={formData.escritorio}
                        onChange={handleInputChange}
                        placeholder="Nome do seu escritório"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="telefone">Telefone *</Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        type="tel"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-auto space-y-4">
                    {submitMessage && (
                      <div className={`p-3 rounded-md text-sm ${
                        submitMessage.includes("sucesso")
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {submitMessage}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-white py-3"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Methods */}
          <div className="lg:order-2 space-y-4">
            <h3 className="text-xl font-semibold text-primary mb-4">
              Outras formas de contato
            </h3>

            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4">
                    <a
                      href={method.action}
                      target={method.action.startsWith('http') ? '_blank' : undefined}
                      rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center space-x-4 hover:text-primary transition-colors"
                    >
                      <div className="w-12 h-12 bg-secondary-foreground rounded-full flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary">{method.title}</h4>
                        <p className="text-muted-foreground">{method.value}</p>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}