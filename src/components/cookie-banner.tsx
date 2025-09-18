"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Cookie } from "lucide-react";
import Link from "next/link";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem("callistra-cookie-consent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("callistra-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("callistra-cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-6 sm:right-6 md:left-auto md:max-w-md">
      <Card className="border shadow-lg bg-card">
        <div className="p-4 sm:p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Cookie className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-primary mb-2">
                Consentimento de Cookies
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Utilizamos cookies para aprimorar sua experiência. Ao clicar em &apos;Aceitar&apos;,
                você concorda com nosso uso de cookies. Consulte nossa{" "}
                <Link
                  href="/politica-de-privacidade"
                  className="text-primary underline hover:text-secondary-foreground"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={acceptCookies}
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-white flex-1"
                >
                  Aceitar
                </Button>
                <Button
                  onClick={declineCookies}
                  size="sm"
                  variant="outline"
                  className="border text-muted-foreground hover:bg-muted flex-1"
                >
                  Recusar
                </Button>
              </div>
            </div>
            <button
              onClick={declineCookies}
              className="flex-shrink-0 text-muted-foreground hover:text-foreground"
              aria-label="Fechar banner de cookies"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}