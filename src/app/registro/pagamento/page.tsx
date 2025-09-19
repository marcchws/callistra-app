'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, QrCode, FileText, Check, Clock, X } from 'lucide-react';

// Schema para pagamento com cartão
const cartaoSchema = z.object({
  numeroCartao: z.string().regex(/^\d{16}$/, 'Número do cartão deve ter 16 dígitos'),
  validadeCartao: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Validade deve estar no formato MM/AA'),
  cvv: z.string().regex(/^\d{3,4}$/, 'CVV deve ter 3 ou 4 dígitos'),
  nomeTitular: z.string().min(2, 'Nome do titular é obrigatório'),
  parcelas: z.string().min(1, 'Selecione o número de parcelas'),
  cpfCnpj: z.string().regex(/^\d{11}$|^\d{14}$/, 'CPF deve ter 11 dígitos ou CNPJ 14 dígitos'),
  endereco: z.string().min(10, 'Endereço completo é obrigatório'),
  cep: z.string().regex(/^\d{8}$/, 'CEP deve ter 8 dígitos'),
  cidade: z.string().min(2, 'Cidade é obrigatória'),
  estado: z.string().length(2, 'Estado deve ter 2 letras'),
});

// Schema para PIX/Boleto
const pixBoletoSchema = z.object({
  cpfCnpj: z.string().regex(/^\d{11}$|^\d{14}$/, 'CPF deve ter 11 dígitos ou CNPJ 14 dígitos'),
  endereco: z.string().min(10, 'Endereço completo é obrigatório'),
});

type CartaoForm = z.infer<typeof cartaoSchema>;
type PixBoletoForm = z.infer<typeof pixBoletoSchema>;

const planos = {
  essencial: { name: 'Essencial', price: 97 },
  profissional: { name: 'Profissional', price: 197 },
  enterprise: { name: 'Enterprise', price: 497 },
};

export default function PagamentoPage() {
  const [metodoPagamento, setMetodoPagamento] = useState('cartao');
  const [statusPagamento, setStatusPagamento] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [pixCode, setPixCode] = useState('');
  const [boletoUrl, setBoletoUrl] = useState('');

  // Recuperar plano selecionado da URL
  const [planoSelecionado, setPlanoSelecionado] = useState('profissional');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const planFromUrl = urlParams.get('plan');

    if (planFromUrl && planos[planFromUrl as keyof typeof planos]) {
      setPlanoSelecionado(planFromUrl);
    }
  }, []);

  const plano = planos[planoSelecionado as keyof typeof planos];

  const cartaoForm = useForm<CartaoForm>({
    resolver: zodResolver(cartaoSchema)
  });

  const pixBoletoForm = useForm<PixBoletoForm>({
    resolver: zodResolver(pixBoletoSchema)
  });

  const gerarParcelas = (valor: number) => {
    const opcoes = [];
    for (let i = 1; i <= 12; i++) {
      const valorParcela = valor / i;
      opcoes.push({
        value: i.toString(),
        label: `${i}x de R$ ${valorParcela.toFixed(2)}${i === 1 ? ' à vista' : ''}`
      });
    }
    return opcoes;
  };

  const formatarCartao = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 16);
  };

  const formatarCPFCNPJ = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 14);
  };

  const formatarCEP = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 8);
  };

  const processarPagamentoCartao = async (data: CartaoForm) => {
    setStatusPagamento('processing');

    try {
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simular aprovação (80% de chance)
      if (Math.random() > 0.2) {
        setStatusPagamento('success');
        // Enviar emails de confirmação
        console.log('Pagamento aprovado:', data);
      } else {
        setStatusPagamento('error');
      }
    } catch {
      setStatusPagamento('error');
    }
  };

  const gerarPIX = async (data: PixBoletoForm) => {
    setStatusPagamento('processing');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simular geração do PIX
      const pixMock = '00020126580014BR.GOV.BCB.PIX0136' +
        Math.random().toString(36).substring(2, 15) +
        '5204000053039865802BR5913CALLISTRA APP6009SAO PAULO';

      setPixCode(pixMock);
      setStatusPagamento('success');
      console.log('PIX gerado:', data);
    } catch {
      setStatusPagamento('error');
    }
  };

  const gerarBoleto = async (data: PixBoletoForm) => {
    setStatusPagamento('processing');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simular geração do boleto
      setBoletoUrl('/boleto-mock.pdf');
      setStatusPagamento('success');
      console.log('Boleto gerado:', data);
    } catch {
      setStatusPagamento('error');
    }
  };

  if (statusPagamento === 'success' && metodoPagamento === 'cartao') {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Pagamento Aprovado!
              </h1>
              <p className="text-muted-foreground mb-6">
                Seu cadastro foi realizado com sucesso. Você receberá um e-mail de confirmação em instantes.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-medium">
                  Plano {plano.name} ativado com sucesso!
                </p>
                <p className="text-green-600 text-sm">
                  Acesso liberado automaticamente - você já está logado na plataforma.
                </p>
              </div>
              <Button
                onClick={() => window.location.href = '/dashboard'}
                className="w-full"
              >
                Acessar Plataforma
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (statusPagamento === 'success' && pixCode) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                PIX Gerado com Sucesso
              </CardTitle>
              <CardDescription>
                Use o código abaixo para realizar o pagamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="w-48 h-48 bg-muted rounded-lg mx-auto flex items-center justify-center">
                  <QrCode className="h-24 w-24 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground absolute mt-32">QR Code PIX</p>
                </div>

                <div className="bg-background p-4 rounded-lg">
                  <Label className="text-sm font-medium">Código PIX:</Label>
                  <div className="flex mt-2">
                    <Input
                      value={pixCode}
                      readOnly
                      className="font-mono text-xs"
                    />
                    <Button
                      onClick={() => navigator.clipboard.writeText(pixCode)}
                      variant="outline"
                      className="ml-2"
                    >
                      Copiar
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-left">
                      <p className="text-blue-900 font-medium text-sm">
                        Pagamento em análise
                      </p>
                      <p className="text-blue-700 text-sm">
                        Após a confirmação do pagamento, você receberá um e-mail de ativação da conta.
                      </p>
                    </div>
                  </div>
                </div>

                <Button onClick={() => window.location.href = '/'} variant="outline">
                  Voltar ao Início
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (statusPagamento === 'success' && boletoUrl) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Boleto Gerado com Sucesso
              </CardTitle>
              <CardDescription>
                Faça o download e realize o pagamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <FileText className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <p className="text-orange-900 font-medium mb-2">
                    Boleto bancário gerado
                  </p>
                  <p className="text-orange-700 text-sm mb-4">
                    Vencimento: {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}
                  </p>
                  <Button
                    onClick={() => window.open(boletoUrl, '_blank')}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Download Boleto
                  </Button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-left">
                      <p className="text-blue-900 font-medium text-sm">
                        Pagamento em análise
                      </p>
                      <p className="text-blue-700 text-sm">
                        Após a confirmação do pagamento, você receberá um e-mail de ativação da conta.
                      </p>
                    </div>
                  </div>
                </div>

                <Button onClick={() => window.location.href = '/'} variant="outline">
                  Voltar ao Início
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (statusPagamento === 'error') {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="h-8 w-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Pagamento Recusado
              </h1>
              <p className="text-muted-foreground mb-6">
                Houve um problema ao processar seu pagamento. Verifique os dados e tente novamente.
              </p>
              <Button
                onClick={() => setStatusPagamento('idle')}
                className="w-full"
              >
                Tentar Novamente
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Finalizar Pagamento
          </h1>
          <p className="text-muted-foreground">
            Complete seu cadastro realizando o pagamento
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Plano {plano.name}</span>
                    <span className="font-medium">R$ {plano.price},00</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>R$ {plano.price},00</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Cobrança mensal recorrente
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formas de Pagamento */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Escolha a forma de pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={metodoPagamento} onValueChange={setMetodoPagamento}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="cartao" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Cartão
                    </TabsTrigger>
                    <TabsTrigger value="pix" className="flex items-center gap-2">
                      <QrCode className="h-4 w-4" />
                      PIX
                    </TabsTrigger>
                    <TabsTrigger value="boleto" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Boleto
                    </TabsTrigger>
                  </TabsList>

                  {/* Pagamento com Cartão */}
                  <TabsContent value="cartao">
                    <form onSubmit={cartaoForm.handleSubmit(processarPagamentoCartao)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <Label htmlFor="numeroCartao">Número do Cartão *</Label>
                          <Input
                            id="numeroCartao"
                            {...cartaoForm.register('numeroCartao')}
                            placeholder="1234 5678 9012 3456"
                            onChange={(e) => {
                              const formatted = formatarCartao(e.target.value);
                              cartaoForm.setValue('numeroCartao', formatted);
                            }}
                          />
                          {cartaoForm.formState.errors.numeroCartao && (
                            <p className="text-destructive text-sm mt-1">
                              {cartaoForm.formState.errors.numeroCartao.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="validadeCartao">Validade *</Label>
                          <Input
                            id="validadeCartao"
                            {...cartaoForm.register('validadeCartao')}
                            placeholder="MM/AA"
                          />
                          {cartaoForm.formState.errors.validadeCartao && (
                            <p className="text-destructive text-sm mt-1">
                              {cartaoForm.formState.errors.validadeCartao.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            {...cartaoForm.register('cvv')}
                            placeholder="123"
                          />
                          {cartaoForm.formState.errors.cvv && (
                            <p className="text-destructive text-sm mt-1">
                              {cartaoForm.formState.errors.cvv.message}
                            </p>
                          )}
                        </div>

                        <div className="col-span-2">
                          <Label htmlFor="nomeTitular">Nome do Titular *</Label>
                          <Input
                            id="nomeTitular"
                            {...cartaoForm.register('nomeTitular')}
                            placeholder="Nome como está no cartão"
                          />
                          {cartaoForm.formState.errors.nomeTitular && (
                            <p className="text-destructive text-sm mt-1">
                              {cartaoForm.formState.errors.nomeTitular.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="parcelas">Parcelas *</Label>
                          <select
                            id="parcelas"
                            {...cartaoForm.register('parcelas')}
                            className="w-full p-2 border border-border rounded-md"
                          >
                            <option value="">Selecione</option>
                            {gerarParcelas(plano.price).map((opcao) => (
                              <option key={opcao.value} value={opcao.value}>
                                {opcao.label}
                              </option>
                            ))}
                          </select>
                          {cartaoForm.formState.errors.parcelas && (
                            <p className="text-destructive text-sm mt-1">
                              {cartaoForm.formState.errors.parcelas.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="cpfCnpjCartao">CPF/CNPJ *</Label>
                          <Input
                            id="cpfCnpjCartao"
                            {...cartaoForm.register('cpfCnpj')}
                            placeholder="Apenas números"
                            onChange={(e) => {
                              const formatted = formatarCPFCNPJ(e.target.value);
                              cartaoForm.setValue('cpfCnpj', formatted);
                            }}
                          />
                          {cartaoForm.formState.errors.cpfCnpj && (
                            <p className="text-destructive text-sm mt-1">
                              {cartaoForm.formState.errors.cpfCnpj.message}
                            </p>
                          )}
                        </div>

                        <div className="col-span-2">
                          <Label htmlFor="endereco">Endereço de Cobrança *</Label>
                          <Input
                            id="endereco"
                            {...cartaoForm.register('endereco')}
                            placeholder="Rua, número, bairro"
                          />
                          {cartaoForm.formState.errors.endereco && (
                            <p className="text-destructive text-sm mt-1">
                              {cartaoForm.formState.errors.endereco.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="cep">CEP *</Label>
                          <Input
                            id="cep"
                            {...cartaoForm.register('cep')}
                            placeholder="12345678"
                            onChange={(e) => {
                              const formatted = formatarCEP(e.target.value);
                              cartaoForm.setValue('cep', formatted);
                            }}
                          />
                          {cartaoForm.formState.errors.cep && (
                            <p className="text-destructive text-sm mt-1">
                              {cartaoForm.formState.errors.cep.message}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="cidade">Cidade *</Label>
                            <Input
                              id="cidade"
                              {...cartaoForm.register('cidade')}
                              placeholder="São Paulo"
                            />
                            {cartaoForm.formState.errors.cidade && (
                              <p className="text-destructive text-sm mt-1">
                                {cartaoForm.formState.errors.cidade.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="estado">Estado *</Label>
                            <Input
                              id="estado"
                              {...cartaoForm.register('estado')}
                              placeholder="SP"
                              maxLength={2}
                            />
                            {cartaoForm.formState.errors.estado && (
                              <p className="text-destructive text-sm mt-1">
                                {cartaoForm.formState.errors.estado.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={statusPagamento === 'processing'}
                      >
                        {statusPagamento === 'processing' ? 'Processando...' : 'Finalizar Pagamento'}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Pagamento PIX */}
                  <TabsContent value="pix">
                    <form onSubmit={pixBoletoForm.handleSubmit(gerarPIX)} className="space-y-4">
                      <div>
                        <Label htmlFor="cpfCnpjPix">CPF/CNPJ *</Label>
                        <Input
                          id="cpfCnpjPix"
                          {...pixBoletoForm.register('cpfCnpj')}
                          placeholder="Apenas números"
                          onChange={(e) => {
                            const formatted = formatarCPFCNPJ(e.target.value);
                            pixBoletoForm.setValue('cpfCnpj', formatted);
                          }}
                        />
                        {pixBoletoForm.formState.errors.cpfCnpj && (
                          <p className="text-destructive text-sm mt-1">
                            {pixBoletoForm.formState.errors.cpfCnpj.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="enderecoPix">Endereço *</Label>
                        <Input
                          id="enderecoPix"
                          {...pixBoletoForm.register('endereco')}
                          placeholder="Endereço completo"
                        />
                        {pixBoletoForm.formState.errors.endereco && (
                          <p className="text-destructive text-sm mt-1">
                            {pixBoletoForm.formState.errors.endereco.message}
                          </p>
                        )}
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-blue-900 font-medium text-sm mb-2">
                          Pagamento via PIX
                        </p>
                        <p className="text-blue-700 text-sm">
                          Você receberá um QR Code para pagamento instantâneo.
                          O acesso será liberado após confirmação.
                        </p>
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={statusPagamento === 'processing'}
                      >
                        {statusPagamento === 'processing' ? 'Gerando PIX...' : 'Gerar PIX'}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Pagamento Boleto */}
                  <TabsContent value="boleto">
                    <form onSubmit={pixBoletoForm.handleSubmit(gerarBoleto)} className="space-y-4">
                      <div>
                        <Label htmlFor="cpfCnpjBoleto">CPF/CNPJ *</Label>
                        <Input
                          id="cpfCnpjBoleto"
                          {...pixBoletoForm.register('cpfCnpj')}
                          placeholder="Apenas números"
                          onChange={(e) => {
                            const formatted = formatarCPFCNPJ(e.target.value);
                            pixBoletoForm.setValue('cpfCnpj', formatted);
                          }}
                        />
                        {pixBoletoForm.formState.errors.cpfCnpj && (
                          <p className="text-destructive text-sm mt-1">
                            {pixBoletoForm.formState.errors.cpfCnpj.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="enderecoBoleto">Endereço *</Label>
                        <Input
                          id="enderecoBoleto"
                          {...pixBoletoForm.register('endereco')}
                          placeholder="Endereço completo"
                        />
                        {pixBoletoForm.formState.errors.endereco && (
                          <p className="text-destructive text-sm mt-1">
                            {pixBoletoForm.formState.errors.endereco.message}
                          </p>
                        )}
                      </div>

                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <p className="text-orange-900 font-medium text-sm mb-2">
                          Pagamento via Boleto Bancário
                        </p>
                        <p className="text-orange-700 text-sm">
                          Vencimento em 3 dias úteis. O acesso será liberado após a confirmação do pagamento.
                        </p>
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={statusPagamento === 'processing'}
                      >
                        {statusPagamento === 'processing' ? 'Gerando Boleto...' : 'Gerar Boleto'}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}