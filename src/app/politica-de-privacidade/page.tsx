import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Política de Privacidade | Callistra",
  description: "Política de privacidade e proteção de dados do Callistra - Software de gestão para escritórios de advocacia.",
};

export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao site
              </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">
              Política de Privacidade
            </h1>
            <p className="text-gray-600">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                1. Introdução
              </h2>
              <p className="text-gray-700 leading-relaxed">
                A Callistra Tecnologia Jurídica Ltda. (&quot;Callistra&quot;, &quot;nós&quot; ou &quot;nossa empresa&quot;)
                está comprometida com a proteção da privacidade e dos dados pessoais de nossos
                usuários. Esta Política de Privacidade descreve como coletamos, usamos,
                compartilhamos e protegemos suas informações pessoais em conformidade com a
                Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                2. Dados Coletados
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-[#0A3D62] mb-2">
                    2.1 Dados fornecidos voluntariamente
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Nome e informações de contato (e-mail, telefone)</li>
                    <li>Informações do escritório de advocacia</li>
                    <li>Dados de cadastro de usuários e clientes</li>
                    <li>Informações de processos e casos jurídicos</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#0A3D62] mb-2">
                    2.2 Dados coletados automaticamente
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Endereço IP e informações do dispositivo</li>
                    <li>Dados de navegação e uso da plataforma</li>
                    <li>Logs de sistema e dados de performance</li>
                    <li>Cookies e tecnologias similares</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                3. Finalidades do Tratamento
              </h2>
              <p className="text-gray-700 mb-4">Utilizamos seus dados pessoais para:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Fornecer e operar nossos serviços de gestão jurídica</li>
                <li>Processar pagamentos e gerenciar assinaturas</li>
                <li>Oferecer suporte técnico e atendimento ao cliente</li>
                <li>Enviar comunicações sobre o serviço e atualizações</li>
                <li>Melhorar nossos produtos e desenvolver novos recursos</li>
                <li>Cumprir obrigações legais e regulamentares</li>
                <li>Prevenir fraudes e garantir a segurança da plataforma</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                4. Compartilhamento de Dados
              </h2>
              <p className="text-gray-700 mb-4">
                Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros,
                exceto nas seguintes situações:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Com seu consentimento expresso</li>
                <li>Para cumprir obrigações legais ou decisões judiciais</li>
                <li>Com provedores de serviços que nos auxiliam na operação da plataforma</li>
                <li>Em caso de fusão, aquisição ou venda de ativos da empresa</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                5. Seus Direitos
              </h2>
              <p className="text-gray-700 mb-4">
                Conforme a LGPD, você tem os seguintes direitos:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Confirmação da existência de tratamento de dados</li>
                <li>Acesso aos seus dados pessoais</li>
                <li>Correção de dados incompletos, inexatos ou desatualizados</li>
                <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
                <li>Portabilidade dos dados</li>
                <li>Eliminação dos dados tratados com seu consentimento</li>
                <li>Revogação do consentimento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                6. Segurança
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Implementamos medidas técnicas e organizacionais adequadas para proteger seus
                dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
                Isso inclui criptografia, controles de acesso, monitoramento de segurança e
                treinamento regular de nossa equipe.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                7. Retenção de Dados
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as
                finalidades descritas nesta política, respeitando os prazos legais de
                retenção e os requisitos de nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                8. Contato
              </h2>
              <p className="text-gray-700 mb-4">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política,
                entre em contato conosco:
              </p>
              <div className="bg-[#F8F9FA] p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>E-mail:</strong> privacidade@callistra.com.br<br />
                  <strong>Telefone:</strong> +55 (11) 4004-1234<br />
                  <strong>Endereço:</strong> Rua da Tecnologia, 123 - São Paulo, SP - CEP: 01234-567
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                9. Alterações
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Esta Política de Privacidade pode ser atualizada periodicamente. Notificaremos
                sobre alterações significativas através de nossos canais de comunicação habituais.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}