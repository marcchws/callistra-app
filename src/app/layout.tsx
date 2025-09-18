import type { Metadata } from "next";
import { Red_Hat_Display, Lato } from "next/font/google";
import "./globals.css";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-red-hat-display",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://callistra.com.br'),
  title: "Callistra | Software de Gestão para Escritórios de Advocacia",
  description: "Callistra: o software de gestão completo para seu escritório de advocacia. Otimize processos, aumente a produtividade e simplifique sua rotina jurídica. Mais de 500 escritórios confiam em nós.",
  keywords: [
    "software para advogados",
    "gestão de escritório de advocacia", 
    "sistema para processos jurídicos",
    "software jurídico",
    "gestão de clientes advocacia",
    "controle de prazos jurídicos",
    "agenda para advogados",
    "relatórios jurídicos",
    "sistema advocacia",
    "gestão jurídica"
  ],
  authors: [{ name: "Callistra" }],
  creator: "Callistra",
  publisher: "Callistra",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://callistra.com.br',
    title: 'Callistra | Software de Gestão para Escritórios de Advocacia',
    description: 'Callistra: o software de gestão completo para seu escritório de advocacia. Otimize processos, aumente a produtividade e simplifique sua rotina jurídica.',
    siteName: 'Callistra',
    images: [
      {
        url: '/callistra-sistema-tarefas.png',
        width: 1200,
        height: 630,
        alt: 'Callistra - Sistema de Gestão para Escritórios de Advocacia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Callistra | Software de Gestão para Escritórios de Advocacia',
    description: 'Callistra: o software de gestão completo para seu escritório de advocacia. Otimize processos, aumente a produtividade e simplifique sua rotina jurídica.',
    images: ['/callistra-sistema-tarefas.png'],
  },
  alternates: {
    canonical: 'https://callistra.com.br',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${redHatDisplay.variable} ${lato.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
