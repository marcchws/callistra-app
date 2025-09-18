import { Scale, Users, Calendar, CreditCard } from 'lucide-react'
import { EditableTextSimple } from '@/components/editable-text-simple'
import { EditableImageSimple } from '@/components/editable-image-simple'

export default function AboutSection() {
    return (
        <section className="py-16 md:py-32 bg-white">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col items-center text-center mb-12 sm:mb-16 lg:mb-20">
                    <EditableTextSimple
                        id="about-title"
                        section="about"
                        as="h2"
                        className="text-3xl font-semibold sm:text-4xl lg:text-5xl text-primary">
                        O Callistra otimiza processos cotidianos na gestão de escritórios e advogados
                    </EditableTextSimple>
                    <EditableTextSimple
                        id="about-subtitle"
                        section="about"
                        as="p"
                        className="text-muted-foreground mt-4 max-w-3xl text-lg">
                        Uma plataforma SaaS completa que simplifica e automatiza tarefas jurídicas, aumentando a produtividade do seu escritório.
                    </EditableTextSimple>
                </div>
                <EditableImageSimple
                    id="about-main-image"
                    section="about"
                    className="rounded-lg mb-16 w-full"
                    src="/3855.jpg"
                    alt="Profissional trabalhando com laptop em escritório moderno"
                    width={1200}
                    height={600}
                />

                <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Scale className="size-4 text-primary" />
                            <EditableTextSimple
                                id="about-feature-1-title"
                                section="about"
                                as="h3"
                                className="text-sm font-semibold text-primary">
                                Gestão de Processos
                            </EditableTextSimple>
                        </div>
                        <EditableTextSimple
                            id="about-feature-1-description"
                            section="about"
                            as="p"
                            className="text-muted-foreground text-sm">
                            Acompanhe e gerencie todos os seus processos jurídicos de forma centralizada e eficiente.
                        </EditableTextSimple>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Users className="size-4 text-secondary-foreground" />
                            <EditableTextSimple
                                id="about-feature-2-title"
                                section="about"
                                as="h3"
                                className="text-sm font-semibold text-primary">
                                Gestão de Clientes
                            </EditableTextSimple>
                        </div>
                        <EditableTextSimple
                            id="about-feature-2-description"
                            section="about"
                            as="p"
                            className="text-muted-foreground text-sm">
                            Cadastre e gerencie clientes, advogados associados e toda a estrutura do seu escritório.
                        </EditableTextSimple>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Calendar className="size-4 text-primary" />
                            <EditableTextSimple
                                id="about-feature-3-title"
                                section="about"
                                as="h3"
                                className="text-sm font-semibold text-primary">
                                Agenda Integrada
                            </EditableTextSimple>
                        </div>
                        <EditableTextSimple
                            id="about-feature-3-description"
                            section="about"
                            as="p"
                            className="text-muted-foreground text-sm">
                            Organize compromissos, audiências e prazos com uma agenda inteligente e notificações automáticas.
                        </EditableTextSimple>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <CreditCard className="size-4 text-secondary-foreground" />
                            <EditableTextSimple
                                id="about-feature-4-title"
                                section="about"
                                as="h3"
                                className="text-sm font-semibold text-primary">
                                Gestão Financeira
                            </EditableTextSimple>
                        </div>
                        <EditableTextSimple
                            id="about-feature-4-description"
                            section="about"
                            as="p"
                            className="text-muted-foreground text-sm">
                            Controle receitas, despesas e gere relatórios financeiros detalhados para seu escritório.
                        </EditableTextSimple>
                    </div>
                </div>
            </div>
        </section>
    )
}
