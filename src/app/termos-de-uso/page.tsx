import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Termos de Uso | Callistra",
  description: "Termos de uso do Callistra - Software de gestão para escritórios de advocacia.",
};

export default function TermosDeUso() {
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
              Termos de Uso
            </h1>
            <p className="text-gray-600">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                1. Aceitação dos Termos
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Ao acessar e utilizar a plataforma Callistra, você concorda em cumprir e
                estar vinculado a estes Termos de Uso. Se você não concordar com qualquer
                parte destes termos, não poderá acessar ou usar nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                2. Descrição do Serviço
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                O Callistra é uma plataforma SaaS (Software as a Service) de gestão para
                escritórios de advocacia que oferece funcionalidades para:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Gestão de processos jurídicos</li>
                <li>Cadastro e gerenciamento de clientes</li>
                <li>Agenda integrada e controle de prazos</li>
                <li>Gestão financeira e faturamento</li>
                <li>Comunicação interna e helpdesk</li>
                <li>Relatórios e análises</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                3. Elegibilidade e Cadastro
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-[#0A3D62] mb-2">
                    3.1 Requisitos
                  </h3>
                  <p className="text-gray-700">
                    Para utilizar nossos serviços, você deve: (a) ter pelo menos 18 anos
                    de idade; (b) fornecer informações precisas e completas durante o
                    cadastro; (c) manter suas informações atualizadas.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#0A3D62] mb-2">
                    3.2 Responsabilidade da Conta
                  </h3>
                  <p className="text-gray-700">
                    Você é responsável por manter a confidencialidade de suas credenciais
                    de acesso e por todas as atividades realizadas em sua conta.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                4. Uso Permitido
              </h2>
              <p className="text-gray-700 mb-4">
                Você concorda em usar nossos serviços apenas para:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Finalidades legais e legítimas</li>
                <li>Gestão de atividades jurídicas profissionais</li>
                <li>Conforme as leis e regulamentos aplicáveis</li>
                <li>De acordo com as melhores práticas profissionais</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                5. Uso Proibido
              </h2>
              <p className="text-gray-700 mb-4">
                É expressamente proibido:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Violar qualquer lei ou regulamento aplicável</li>
                <li>Interferir no funcionamento dos serviços</li>
                <li>Tentar obter acesso não autorizado aos sistemas</li>
                <li>Usar os serviços para atividades ilegais ou fraudulentas</li>
                <li>Compartilhar sua conta com terceiros não autorizados</li>
                <li>Fazer engenharia reversa do software</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                6. Planos e Pagamentos
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-[#0A3D62] mb-2">
                    6.1 Assinaturas
                  </h3>
                  <p className="text-gray-700">
                    Nossos serviços são oferecidos através de planos de assinatura com
                    cobrança recorrente. Os preços e recursos de cada plano estão
                    disponíveis em nosso site.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#0A3D62] mb-2">
                    6.2 Renovação e Cancelamento
                  </h3>
                  <p className="text-gray-700">
                    As assinaturas são renovadas automaticamente. Você pode cancelar
                    sua assinatura a qualquer momento através de sua conta ou entrando
                    em contato conosco.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                7. Propriedade Intelectual
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Todos os direitos de propriedade intelectual relacionados aos nossos
                serviços, incluindo software, design, texto, gráficos e marcas,
                são de propriedade da Callistra ou de seus licenciadores. Você
                mantém a propriedade dos dados que carrega em nossa plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                8. Privacidade e Proteção de Dados
              </h2>
              <p className="text-gray-700 leading-relaxed">
                O tratamento de seus dados pessoais é regido por nossa Política de
                Privacidade, que faz parte integrante destes Termos de Uso e está
                em conformidade com a Lei Geral de Proteção de Dados (LGPD).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                9. Disponibilidade e Suporte
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Nos esforçamos para manter nossos serviços disponíveis 24/7, mas
                não garantimos operação ininterrupta. Oferecemos suporte técnico
                conforme os termos de cada plano de assinatura.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                10. Limitação de Responsabilidade
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Em nenhuma circunstância a Callistra será responsável por danos
                indiretos, incidentais, especiais ou consequenciais decorrentes
                do uso ou incapacidade de usar nossos serviços, exceto conforme
                exigido por lei.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                11. Rescisão
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Podemos suspender ou encerrar sua conta em caso de violação destes
                termos. Você pode encerrar sua conta a qualquer momento. Após o
                encerramento, seus dados serão tratados conforme nossa Política
                de Privacidade.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                12. Lei Aplicável
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Estes Termos de Uso são regidos pelas leis da República Federativa
                do Brasil. Quaisquer disputas serão resolvidas nos tribunais
                competentes da cidade de São Paulo, SP.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                13. Alterações
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Reservamo-nos o direito de modificar estes Termos de Uso a qualquer
                momento. Alterações significativas serão comunicadas com antecedência
                adequada através de nossos canais oficiais.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">
                14. Contato
              </h2>
              <p className="text-gray-700 mb-4">
                Para dúvidas sobre estes Termos de Uso, entre em contato:
              </p>
              <div className="bg-[#F8F9FA] p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Callistra Tecnologia Jurídica Ltda.</strong><br />
                  <strong>E-mail:</strong> juridico@callistra.com.br<br />
                  <strong>Telefone:</strong> +55 (11) 4004-1234<br />
                  <strong>Endereço:</strong> Rua da Tecnologia, 123 - São Paulo, SP - CEP: 01234-567
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}