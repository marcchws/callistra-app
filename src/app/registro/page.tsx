'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Check, Zap } from 'lucide-react';

// Validação do formulário
const registrationSchema = z.object({
  officeName: z.string().min(2, 'Nome do escritório deve ter pelo menos 2 caracteres'),
  contractorName: z.string().min(2, 'Nome do contratante deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  cnpj: z.string().regex(/^\d{14}$/, 'CNPJ deve conter 14 dígitos'),
  phone: z.string().regex(/^\+55\d{10,11}$/, 'Telefone deve estar no formato +55DDDNÚMERO'),
  password: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 'Senha deve conter letras, números e caracteres especiais'),
  confirmPassword: z.string(),
  selectedPlan: z.string().min(1, 'Selecione um plano'),
  acceptTerms: z.boolean().refine(val => val === true, 'Você deve aceitar os termos de uso')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

type RegistrationForm = z.infer<typeof registrationSchema>;

const plans = [
  {
    id: 'free',
    name: 'Plano Free',
    price: 0,
    duration: '30 dias grátis',
    description: 'Experimente todas as funcionalidades',
    features: [
      'Acesso completo por 30 dias',
      'Até 3 usuários',
      'Suporte por email',
      'Backup automático'
    ],
    popular: false,
    color: 'bg-muted border-border'
  },
  {
    id: 'essencial',
    name: 'Essencial',
    price: 97,
    duration: 'por mês',
    description: 'Ideal para advogados autônomos',
    features: [
      'Até 3 usuários',
      '50 processos ativos',
      'Agenda básica',
      'Suporte por email',
      'Backup automático'
    ],
    popular: false,
    color: 'bg-primary/10 border-primary/20'
  },
  {
    id: 'profissional',
    name: 'Profissional',
    price: 197,
    duration: 'por mês',
    description: 'Para escritórios em crescimento',
    features: [
      'Até 10 usuários',
      'Processos ilimitados',
      'Agenda avançada',
      'Chat interno',
      'Relatórios completos',
      'Suporte prioritário'
    ],
    popular: true,
    color: 'bg-green-50 border-green-500'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 497,
    duration: 'por mês',
    description: 'Para grandes escritórios',
    features: [
      'Usuários ilimitados',
      'Processos ilimitados',
      'API completa',
      'Customizações avançadas',
      'Suporte 24/7',
      'Gerente de conta dedicado'
    ],
    popular: false,
    color: 'bg-accent border-accent-foreground/20'
  }
];

export default function RegistroPage() {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema)
  });

  useEffect(() => {
    // Pegar plano da URL se fornecido
    const urlParams = new URLSearchParams(window.location.search);
    const planFromUrl = urlParams.get('plan');

    if (planFromUrl && plans.find(p => p.id === planFromUrl)) {
      setSelectedPlan(planFromUrl);
      setValue('selectedPlan', planFromUrl);
    }
  }, [setValue]);

  const watchedPlan = watch('selectedPlan');

  const onSubmit = async (data: RegistrationForm) => {
    try {
      console.log('Dados do registro:', data);

      if (data.selectedPlan === 'free') {
        // Registro direto para plano gratuito
        alert('Cadastro realizado! Verificação de e-mail enviada.');
        // Simular redirecionamento para confirmação
        window.location.href = '/registro/confirmacao-email';
      } else {
        // Salvar dados no localStorage temporariamente
        localStorage.setItem('registrationData', JSON.stringify(data));
        // Redirecionar para pagamento
        window.location.href = `/registro/pagamento?plan=${data.selectedPlan}`;
      }
    } catch (error) {
      console.error('Erro no registro:', error);
      alert('Erro ao processar registro. Tente novamente.');
    }
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&';
    let password = '';

    // Garantir pelo menos um de cada tipo
    password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
    password += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
    password += '0123456789'[Math.floor(Math.random() * 10)];
    password += '@$!%*?&'[Math.floor(Math.random() * 7)];

    // Completar com caracteres aleatórios
    for (let i = 4; i < 12; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }

    // Embaralhar
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    setValue('password', password);
    setValue('confirmPassword', password);
  };

  const formatCNPJ = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 14);
  };

  const formatPhone = (value: string) => {
    let digits = value.replace(/\D/g, '');
    if (!digits.startsWith('55')) {
      digits = '55' + digits;
    }
    return '+' + digits.slice(0, 13);
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Finalizar Pagamento</CardTitle>
              <CardDescription>
                Complete seu cadastro realizando o pagamento do plano selecionado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-lg mb-4">
                  Plano selecionado: <strong>{plans.find(p => p.id === watchedPlan)?.name}</strong>
                </p>
                <p className="text-2xl font-bold text-green-600 mb-6">
                  R$ {plans.find(p => p.id === watchedPlan)?.price},00/mês
                </p>
                <p className="text-muted-foreground mb-8">
                  Implementação do gateway de pagamento em desenvolvimento...
                </p>
                <Button onClick={() => setStep(1)} variant="outline">
                  Voltar ao Registro
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Registre seu Escritório
          </h1>
          <p className="text-muted-foreground">
            Escolha seu plano e comece a usar a Callistra hoje mesmo
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Seleção de Planos */}
          <div>
            <h2 className="text-xl font-semibold mb-6">1. Escolha seu Plano</h2>
            <div className="space-y-4">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? plan.color + ' ring-2 ring-offset-2 ring-current'
                      : 'hover:shadow-md'
                  } ${plan.popular ? 'ring-2 ring-green-500' : ''}`}
                  onClick={() => {
                    setSelectedPlan(plan.id);
                    setValue('selectedPlan', plan.id);
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{plan.name}</h3>
                          {plan.popular && (
                            <Badge className="bg-green-500 text-white">Mais Popular</Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm">{plan.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {plan.price === 0 ? 'Grátis' : `R$ ${plan.price}`}
                        </div>
                        <div className="text-sm text-muted-foreground">{plan.duration}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {selectedPlan === plan.id && (
                      <div className="mt-3 p-2 bg-green-100 rounded text-green-800 text-sm font-medium">
                        ✓ Plano Selecionado
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            {errors.selectedPlan && (
              <p className="text-destructive text-sm mt-2">{errors.selectedPlan.message}</p>
            )}
          </div>

          {/* Formulário de Registro */}
          <div>
            <h2 className="text-xl font-semibold mb-6">2. Dados do Escritório</h2>
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="officeName">Nome do Escritório *</Label>
                    <Input
                      id="officeName"
                      {...register('officeName')}
                      placeholder="Ex: Silva & Associados Advocacia"
                    />
                    {errors.officeName && (
                      <p className="text-destructive text-sm mt-1">{errors.officeName.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="contractorName">Nome do Contratante *</Label>
                    <Input
                      id="contractorName"
                      {...register('contractorName')}
                      placeholder="Nome completo do responsável"
                    />
                    {errors.contractorName && (
                      <p className="text-destructive text-sm mt-1">{errors.contractorName.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail do Contratante *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="email@exemplo.com"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="cnpj">CNPJ *</Label>
                    <Input
                      id="cnpj"
                      {...register('cnpj')}
                      placeholder="Apenas números (14 dígitos)"
                      onChange={(e) => {
                        const formatted = formatCNPJ(e.target.value);
                        setValue('cnpj', formatted);
                      }}
                    />
                    {errors.cnpj && (
                      <p className="text-destructive text-sm mt-1">{errors.cnpj.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      {...register('phone')}
                      placeholder="+55DDDNÚMERO (Ex: +5511999999999)"
                      onChange={(e) => {
                        const formatted = formatPhone(e.target.value);
                        setValue('phone', formatted);
                      }}
                    />
                    {errors.phone && (
                      <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">Senha *</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={generatePassword}
                      >
                        <Zap className="h-4 w-4 mr-1" />
                        Gerar
                      </Button>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      {...register('password')}
                      placeholder="Mínimo 6 caracteres (letras, números, especiais)"
                    />
                    {errors.password && (
                      <p className="text-destructive text-sm mt-1">{errors.password.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      {...register('confirmPassword')}
                      placeholder="Digite a senha novamente"
                    />
                    {errors.confirmPassword && (
                      <p className="text-destructive text-sm mt-1">{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="acceptTerms"
                      {...register('acceptTerms')}
                      className="mt-1"
                    />
                    <Label htmlFor="acceptTerms" className="text-sm">
                      Aceito os{' '}
                      <a href="/termos-de-uso" className="text-primary hover:underline">
                        Termos de Uso
                      </a>
                      {' '}e{' '}
                      <a href="/politica-de-privacidade" className="text-primary hover:underline">
                        Política de Privacidade
                      </a>
                    </Label>
                  </div>
                  {errors.acceptTerms && (
                    <p className="text-destructive text-sm">{errors.acceptTerms.message}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting || !selectedPlan}
                  >
                    {isSubmitting ? 'Processando...' :
                     selectedPlan === 'free' ? 'Criar Conta Gratuita' : 'Continuar para Pagamento'
                    }
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}