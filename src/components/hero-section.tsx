'use client'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { TextEffect, AnimatedGroup } from '@/components/animations'
import { CallistraHeader } from '@/components/header'

export default function CalllistraHeroNew() {
    const scrollToPlanos = () => {
        const element = document.getElementById("planos");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const scrollToContato = () => {
        const element = document.getElementById("contato");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <CallistraHeader />
            <main className="overflow-hidden">
                <div
                    aria-hidden
                    className="absolute inset-0 isolate hidden contain-strict lg:block">
                    <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                </div>
                <section>
                    <div className="relative pt-24">
                        <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"></div>
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="sm:mx-auto lg:mr-auto lg:mt-0">
                                <TextEffect
                                    as="h1"
                                    className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 text-primary">
                                    Otimizando a gestão jurídica com <span className="text-secondary-foreground">Callistra</span>
                                </TextEffect>
                                <TextEffect
                                    as="p"
                                    className="mt-8 max-w-2xl text-pretty text-lg text-muted-foreground">
                                    O Callistra é a plataforma completa para gestão de escritórios de advocacia.
                                    Otimize processos, aumente a produtividade e foque no que realmente importa: seus clientes.
                                </TextEffect>

                                <AnimatedGroup
                                    className="mt-12 flex items-center gap-2">
                                    <div
                                        key={1}
                                        className="bg-secondary/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5 border-secondary/30">
                                        <Button
                                            onClick={scrollToPlanos}
                                            size="lg"
                                            className="rounded-xl px-5 text-base bg-primary hover:bg-primary/90">
                                            <span className="text-nowrap">Ver Planos</span>
                                        </Button>
                                    </div>
                                    <Button
                                        key={2}
                                        onClick={scrollToContato}
                                        size="lg"
                                        variant="ghost"
                                        className="h-10.5 rounded-xl px-5 text-base text-secondary-foreground hover:text-primary">
                                        <span className="text-nowrap">Falar com Especialista</span>
                                    </Button>
                                </AnimatedGroup>
                            </div>
                        </div>
                        <AnimatedGroup>
                            <div className="mask-b-from-55% relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-7xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                                    <div className="aspect-15/8 relative bg-muted rounded-2xl overflow-hidden">
                                        <Image
                                            src="/callistra-sistema-tarefas.png"
                                            alt="Interface do Callistra - Sistema de Gestão de Tarefas"
                                            className="w-full h-full object-cover"
                                            width={1200}
                                            height={640}
                                        />
                                    </div>
                                </div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </section>
            </main>
        </>
    )
}