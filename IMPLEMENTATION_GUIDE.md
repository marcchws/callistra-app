# Guia de Implementação da Identidade Visual - Callistra

## 1. Resumo da Tarefa

O objetivo é atualizar a identidade visual da landing page para refletir o novo manual da marca, conforme a imagem `Captura de tela 2025-09-18 160955.png`. Isso envolve a atualização da paleta de cores e da tipografia em todo o site.

## 2. Nova Identidade Visual

### 2.1. Paleta de Cores

| Cor               | Hex        | Oklch (aproximado)        | Uso Principal                     |
| ----------------- | ---------- | ------------------------- | --------------------------------- |
| **Azul Primário** | `#0033A0`  | `oklch(0.29 0.11 264)`    | Cor principal, botões, títulos    |
| **Azul Claro**    | `#A8DDEE`  | `oklch(0.88 0.05 225)`    | Destaques, fundos de seção      |
| **Fundo**         | `#FFFFFF`  | `oklch(1 0 0)`            | Fundo principal da página         |
| **Texto (Corpo)** | `#343A40`  | `oklch(0.29 0.01 265)`    | Parágrafos e textos longos      |
| **Branco**        | `#FFFFFF`  | `oklch(1 0 0)`            | Texto sobre fundos escuros      |

### 2.2. Tipografia

- **Títulos**: `Montserrat`
- **Corpo**: `Lato`

---

## 3. Instruções de Implementação

### Passo 1: Atualizar a Tipografia

O projeto atualmente usa a fonte "Inter". Precisamos substituí-la por "Montserrat" e "Lato".

**Arquivo a modificar**: `src/app/layout.tsx`

1.  **Importar as novas fontes do Google Fonts**:
    Substitua a importação da fonte `Inter` pelo seguinte:

    ```typescript
    import { Montserrat, Lato } from "next/font/google";

    const montserrat = Montserrat({
      subsets: ["latin"],
      variable: "--font-montserrat",
      display: "swap",
    });

    const lato = Lato({
      subsets: ["latin"],
      weight: ["400", "700"],
      variable: "--font-lato",
      display: "swap",
    });
    ```

2.  **Aplicar as fontes no HTML**:
    Atualize a tag `<html>` para incluir as novas variáveis de fonte:

    ```tsx
    // Antes
    <html lang="en" className={inter.variable}>

    // Depois
    <html lang="en" className={`${montserrat.variable} ${lato.variable}`}>
    ```

### Passo 2: Atualizar as Variáveis de Cor e Fonte

**Arquivo a modificar**: `src/app/globals.css`

1.  **Mapear Novas Fontes**:
    Encontre a variável `--font-sans` e aponte para a nova fonte do corpo (`Lato`). Adicione uma variável para a fonte de títulos (`Montserrat`).

    ```css
    /* Dentro de @theme inline ou similar */
    --font-sans: var(--font-lato);
    --font-heading: var(--font-montserrat);
    ```

2.  **Atualizar a Paleta de Cores (`:root`)**:
    Substitua os valores `oklch` das variáveis de cor no seletor `:root` para alinhá-los com a nova paleta.

    ```css
    /* Valores Antigos (Exemplo) */
    :root {
      --radius: 0.625rem;
      --background: oklch(1 0 0);
      --foreground: oklch(0.129 0.042 264.695);
      --primary: oklch(0.208 0.042 265.755);
      --primary-foreground: oklch(0.984 0.003 247.858);
      --secondary: oklch(0.968 0.007 247.896);
      --secondary-foreground: oklch(0.208 0.042 265.755);
      /* ... etc ... */
    }

    /* Novos Valores */
    :root {
      --radius: 0.625rem;
      --background: oklch(1 0 0); /* Branco (Fundo) */
      --foreground: oklch(0.29 0.01 265); /* Cinza Escuro (Texto (Corpo)) */
      
      --card: oklch(1 0 0);
      --card-foreground: oklch(0.29 0.01 265);
      
      --popover: oklch(1 0 0);
      --popover-foreground: oklch(0.29 0.01 265);
      
      --primary: oklch(0.29 0.11 264); /* Azul Primário */
      --primary-foreground: oklch(1 0 0); /* Branco (para texto em botões primários) */
      
      --secondary: oklch(0.88 0.05 225); /* Azul Claro */
      --secondary-foreground: oklch(0.29 0.11 264); /* Azul Primário (para texto em fundos claros) */
      
      --muted: oklch(0.88 0.05 225 / 0.5); /* Azul Claro com transparência */
      --muted-foreground: oklch(0.29 0.01 265 / 0.7); /* Cinza Escuro com transparência */
      
      --accent: oklch(0.88 0.05 225); /* Azul Claro */
      --accent-foreground: oklch(0.29 0.11 264); /* Azul Primário */
      
      --destructive: oklch(0.577 0.245 27.325); /* Manter ou ajustar se necessário */
      
      --border: oklch(0.29 0.11 264 / 0.2); /* Azul Primário com transparência */
      --input: oklch(0.29 0.11 264 / 0.25); /* Azul Primário com transparência */
      --ring: oklch(0.29 0.11 264); /* Azul Primário */
    }
    ```
    **Nota**: As cores de `destructive` e `chart` não foram especificadas. Elas podem ser mantidas ou ajustadas para tons de azul/cinza, se desejado. A configuração do tema escuro (`.dark`) também precisará de uma revisão similar, usando uma paleta invertida (fundos escuros com textos claros).

### Passo 3: Aplicar a Fonte de Título

Para aplicar a fonte `Montserrat` aos títulos (h1, h2, h3, etc.), você pode adicionar uma regra ao `globals.css` ou usar classes do Tailwind.

**Opção A: CSS Global (Recomendado para consistência)**
Adicione ao final de `src/app/globals.css`:

```css
@layer base {
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
  }
}
```

**Opção B: Classes do Tailwind**
Crie uma utilidade de fonte em `tailwind.config.ts` (se o arquivo for criado) e aplique a classe `font-heading` manualmente nos componentes.

### Passo 4: Verificação

1.  Execute o servidor de desenvolvimento (`npm run dev`).
2.  Navegue pela landing page e verifique se:
    - As cores foram atualizadas em todos os componentes (botões, textos, fundos).
    - A fonte `Montserrat` é usada nos títulos e `Lato` no corpo do texto.
    - A legibilidade está boa em todas as seções.
    - O logo está sendo exibido corretamente (mesmo que seja um placeholder).

---
