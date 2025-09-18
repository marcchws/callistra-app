import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Callistra - Gestão de Escritórios de Advocacia",
  description: "Sistema SaaS para otimizar a gestão de escritórios de advocacia e advogados associados. Simplifique processos, aumente a produtividade e automatize tarefas relacionadas à abertura e acompanhamento de processos judiciais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
