import Link from 'next/link'

const links = [
    {
        title: 'Funcionalidades',
        href: '#funcionalidades',
    },
    {
        title: 'Planos',
        href: '#planos',
    },
    {
        title: 'Sobre',
        href: '#sobre',
    },
    {
        title: 'Contato',
        href: '#contato',
    },
    {
        title: 'Política de Privacidade',
        href: '/politica-de-privacidade',
    },
    {
        title: 'Termos de Uso',
        href: '/termos-de-uso',
    },
]

export default function FooterSection() {
    return (
        <footer className="border-t bg-white py-12 dark:bg-transparent">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-wrap justify-between gap-6">
                    <span className="text-muted-foreground order-last block text-center text-sm md:order-first">© {new Date().getFullYear()} Callistra Soluções Tecnológicas Ltda. Todos os direitos reservados.</span>
                    <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="text-muted-foreground hover:text-primary block duration-150">
                                <span>{link.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
