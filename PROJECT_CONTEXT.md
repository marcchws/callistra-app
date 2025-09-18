# Contexto do Projeto: Callistra

## 1. Visão Geral do Projeto

**Callistra** é um sistema web (SaaS) projetado para otimizar a gestão de escritórios de advocacia e advogados associados. O objetivo é simplificar processos diários, aumentar a produtividade e automatizar tarefas relacionadas à abertura e acompanhamento de processos judiciais.

**Nota sobre o Escopo:** Este documento descreve a visão ampla do sistema Callistra. A fase de desenvolvimento atual se concentrará na implementação de um subconjunto inicial de quatro funcionalidades principais, que servem como a base do produto.

### Arquitetura e Tecnologia

*   **Tipo:** Aplicação Web SaaS (Software as a Service).
*   **Frontend:** Next.js (React) com TypeScript.
*   **Estilo:** CSS Modules, PostCSS.
*   **Linguagem:** TypeScript.

### Perfis de Usuário

O sistema completo prevê quatro perfis de usuário distintos:

1.  **Equipe Callistra (Admin do SaaS):** Gerencia a plataforma, os planos de assinatura e os escritórios clientes.
2.  **Escritório como Cliente (Admin do Escritório):** Contrata o sistema, gerencia seus próprios usuários (funcionários, advogados), clientes e processos. Pode personalizar níveis de acesso e gerenciar o plano de assinatura.
3.  **Advogados Associados:** Acessam o sistema com permissões definidas pelo administrador do seu escritório para trabalhar nos processos.
4.  **Clientes dos Escritórios:** Acessam um portal para visualizar informações de seus processos, dados cadastrais, financeiros e se comunicar com o escritório via chat.

## 2. Módulos e Funcionalidades em Foco (Escopo Atual)

As quatro funcionalidades a seguir representam o escopo de implementação para a fase atual do projeto.

### Módulo: Callistra como SaaS (Admin)

#### 2.1. Landing Page & Site Institucional

*   **Objetivo:** Criar um site institucional responsivo para apresentar a empresa, os planos e capturar leads.
*   **Critérios de Aceite:**
    *   Layout responsivo com SEO básico e aviso de cookies (LGPD).
    *   Páginas: "Sobre", "Serviços e Planos", "Política de Privacidade".
    *   Formulário de contato com botões para chamada telefônica, e-mail e WhatsApp.
    *   Permitir a inserção de scripts externos (Pixel, Chat Widgets, Tags).

#### 2.2. Gestão de Conteúdo do Site

*   **Objetivo:** Permitir que a "Equipe Callistra" edite o conteúdo do site através de um painel administrativo.
*   **Critérios de Aceite:**
    *   Editor simplificado para alterar textos (com formatação básica) e imagens.
    *   Gerenciar a visibilidade dos planos de assinatura na página.
    *   Manter um histórico de alterações (auditoria).

### Módulo: Escritório como Cliente

#### 3.1. Registro de Escritório

*   **Objetivo:** Permitir que novos escritórios se cadastrem na plataforma a partir da Landing Page.
*   **Critérios de Aceite:**
    *   Formulário de registro com seleção de plano inicial (o padrão é um plano "Free" com prazo de validade).
    *   Envio de e-mail com link de ativação da conta.
    *   Criação de um acesso personalizado para o escritório (ex: `nome-do-escritorio.callistra.com.br`).
    *   Permitir personalização visual da tela de login do escritório (logo e cores).
*   **Campos Principais:** Nome do Escritório, Nome do Contratante, E-mail, CNPJ, Telefone, Senha.

#### 3.2. Seleção e Gestão de Plano de Assinatura

*   **Objetivo:** Permitir que o administrador do escritório assine, faça upgrade ou downgrade do seu plano.
*   **Critérios de Aceite:**
    *   Visualização clara dos planos disponíveis e do plano ativo.
    *   Processo de checkout completo para planos pagos, com opções de pagamento (Cartão de Crédito, PIX, Boleto).
    *   Envio de e-mails transacionais sobre o status da compra (recebido, em análise, aprovado).
    *   **Lógica de Upgrade:** Acesso imediato às novas funcionalidades com cobrança *prorata* (proporcional) pela diferença de valor até o fim do ciclo.
    *   **Lógica de Downgrade:** A mudança é agendada para o final do ciclo de cobrança atual.
*   **Campos Principais:** Plano Selecionado, Dados do Pagador (CPF/CNPJ, Endereço), Dados do Cartão (se aplicável).

