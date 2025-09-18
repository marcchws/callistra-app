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
  title: "Callistra | Software de Gestão para Escritórios de Advocacia",
  description: "Callistra: o software de gestão completo para seu escritório de advocacia. Otimize processos, aumente a produtividade e simplifique sua rotina.",
  keywords: ["software para advogados", "gestão de escritório de advocacia", "sistema para processos jurídicos"],
  authors: [{ name: "Callistra" }],
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
