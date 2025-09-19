'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

export default function ConfirmacaoEmailPage() {
  const [status, setStatus] = useState<'waiting' | 'expired' | 'confirmed' | 'error'>('waiting');
  const [email, setEmail] = useState('');
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    // Recuperar email do localStorage (se disponível)
    const registrationData = localStorage.getItem('registrationData');
    if (registrationData) {
      const data = JSON.parse(registrationData);
      setEmail(data.email || '');
    }

    // Simular verificação do link de confirmação
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const action = urlParams.get('action');

    if (token && action === 'confirm') {
      // Simular validação do token
      setTimeout(() => {
        if (token === 'expired') {
          setStatus('expired');
        } else if (token === 'invalid') {
          setStatus('error');
        } else {
          setStatus('confirmed');
          // Limpar dados temporários
          localStorage.removeItem('registrationData');
        }
      }, 1000);
    }
  }, []);

  const reenviarEmail = async () => {
    setIsResending(true);
    try {
      // Simular reenvio
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('E-mail de confirmação reenviado com sucesso!');
      setStatus('waiting');
    } catch {
      alert('Erro ao reenviar e-mail. Tente novamente.');
    } finally {
      setIsResending(false);
    }
  };

  const atualizarEmail = async (novoEmail: string) => {
    try {
      // Simular atualização do email
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmail(novoEmail);
      alert('E-mail atualizado! Verificação enviada para o novo endereço.');
      setStatus('waiting');
    } catch {
      alert('Erro ao atualizar e-mail. Tente novamente.');
    }
  };

  if (status === 'confirmed') {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                E-mail Confirmado!
              </h1>
              <p className="text-muted-foreground mb-6">
                Sua conta foi ativada com sucesso. Você agora tem acesso completo ao plano Free por 30 dias.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-medium">
                  Plano Free ativado!
                </p>
                <p className="text-green-600 text-sm">
                  Aproveite todas as funcionalidades da Callistra pelos próximos 30 dias.
                </p>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={() => window.location.href = '/dashboard'}
                  className="w-full"
                >
                  Acessar Plataforma
                </Button>
                <Button
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  className="w-full"
                >
                  Voltar ao Início
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Link Inválido
              </h1>
              <p className="text-muted-foreground mb-6">
                O link de confirmação é inválido ou não foi encontrado.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={reenviarEmail}
                  disabled={isResending}
                  className="w-full"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Reenviando...
                    </>
                  ) : (
                    'Reenviar E-mail de Confirmação'
                  )}
                </Button>
                <Button
                  onClick={() => window.location.href = '/registro'}
                  variant="outline"
                  className="w-full"
                >
                  Fazer Novo Cadastro
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (status === 'expired') {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-orange-600" />
                Link Expirado
              </CardTitle>
              <CardDescription>
                O link de confirmação expirou. Reenvie um novo e-mail ou atualize seu endereço.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-900 font-medium text-sm mb-2">
                  Link de confirmação expirado
                </p>
                <p className="text-orange-700 text-sm">
                  Os links de confirmação expiram em 24 horas por motivos de segurança.
                </p>
              </div>

              <div>
                <Label htmlFor="email">E-mail cadastrado:</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                  />
                  <Button
                    onClick={() => atualizarEmail(email)}
                    disabled={!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                  >
                    Atualizar
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={reenviarEmail}
                  disabled={isResending}
                  className="w-full"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Reenviando...
                    </>
                  ) : (
                    'Reenviar E-mail de Confirmação'
                  )}
                </Button>
                <Button
                  onClick={() => window.location.href = '/registro'}
                  variant="outline"
                  className="w-full"
                >
                  Fazer Novo Cadastro
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
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Confirme seu E-mail
            </CardTitle>
            <CardDescription>
              Enviamos um link de confirmação para seu e-mail
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Verifique sua Caixa de Entrada
              </h2>
              <p className="text-muted-foreground mb-4">
                Enviamos um e-mail de confirmação para:
              </p>
              <p className="text-lg font-medium text-primary mb-6">
                {email || 'seu@email.com'}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">Próximos passos:</h3>
              <ol className="text-blue-800 text-sm space-y-1">
                <li>1. Verifique sua caixa de entrada (e spam/lixo eletrônico)</li>
                <li>2. Clique no link de confirmação no e-mail</li>
                <li>3. Sua conta será ativada automaticamente</li>
                <li>4. Faça login e comece a usar a Callistra</li>
              </ol>
            </div>

            <div className="space-y-3">
              <Button
                onClick={reenviarEmail}
                disabled={isResending}
                variant="outline"
                className="w-full"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Reenviando...
                  </>
                ) : (
                  'Reenviar E-mail de Confirmação'
                )}
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  E-mail incorreto?
                </p>
                <Button
                  onClick={() => window.location.href = '/registro'}
                  variant="ghost"
                  className="text-primary hover:text-primary/80"
                >
                  Corrigir E-mail
                </Button>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-muted-foreground text-center">
                O link de confirmação expira em 24 horas. Se não receber o e-mail em alguns minutos,
                verifique sua pasta de spam ou solicite o reenvio.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}