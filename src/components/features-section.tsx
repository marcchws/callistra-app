import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FileText, Users, Calendar, BarChart3 } from 'lucide-react'
import { ReactNode } from 'react'

export default function FeaturesSection() {
    return (
        <section id="servicos" className="bg-white py-16 md:py-32">
            <div className="@container mx-auto max-w-7xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl text-primary">Funcionalidades que transformam sua gestão jurídica</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">O Callistra oferece todas as ferramentas necessárias para otimizar a gestão do seu escritório de advocacia, desde o controle de processos até relatórios avançados.</p>
                </div>
                <div className="@min-4xl:max-w-full @min-4xl:grid-cols-4 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
                    <Card className="group shadow-zinc-950/5 border-primary/10 hover:shadow-lg transition-all duration-300">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <FileText
                                    className="size-6 text-primary"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-semibold text-primary">Gestão de Processos</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm text-muted-foreground">Gerencie todos os seus processos jurídicos de forma organizada e eficiente, com acompanhamento completo de prazos e andamentos.</p>
                        </CardContent>
                    </Card>

                    <Card className="group shadow-zinc-950/5 border-primary/10 hover:shadow-lg transition-all duration-300">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Users
                                    className="size-6 text-primary"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-semibold text-primary">Controle de Clientes</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm text-muted-foreground">Mantenha um cadastro completo dos seus clientes com histórico de atendimentos e documentos organizados.</p>
                        </CardContent>
                    </Card>

                    <Card className="group shadow-zinc-950/5 border-primary/10 hover:shadow-lg transition-all duration-300">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Calendar
                                    className="size-6 text-primary"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-semibold text-primary">Agenda Integrada</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm text-muted-foreground">Nunca mais perca um prazo ou compromisso importante com nossa agenda inteligente e notificações automáticas.</p>
                        </CardContent>
                    </Card>

                    <Card className="group shadow-zinc-950/5 border-primary/10 hover:shadow-lg transition-all duration-300">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <BarChart3
                                    className="size-6 text-primary"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-semibold text-primary">Relatórios Completos</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm text-muted-foreground">Tenha acesso a relatórios detalhados sobre performance, faturamento e produtividade do seu escritório.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,hsl(var(--primary))_20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
        />

        <div className="bg-white absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t border-primary/20 rounded-tl-lg">{children}</div>
    </div>
)
