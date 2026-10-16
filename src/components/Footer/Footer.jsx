import { useEffect, useState } from 'react'
import './Footer.scss'

const EMAIL = 'hola@frisson.studio' // ← cambia por tu correo

const NAV = [
    { label: 'Trabajo', href: '#trabajo' },
    { label: 'Proceso', href: '#servicios' },
    { label: 'Estudio', href: '#estudio' },
    { label: 'Contacto', href: '#contacto' },
]

const SOCIAL = [
    { label: 'Instagram', href: 'https://instagram.com/' }, // ← tu perfil
    { label: 'LinkedIn', href: 'https://linkedin.com/' },   // ← tu perfil
    { label: 'Correo', href: `mailto:${EMAIL}` },
]

const NAMES = [1, 2, 3, 4,5]
const CYCLE_MS = 2800 // cada cuánto cambia la fuente de cada palabra

// Una palabra que rota entre las 4 fuentes (--1 a --4 en el SCSS)
function Word({ start, delay }) {
    const [font, setFont] = useState(start)

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const next = () => setFont((f) => (f % 4) + 1)
        let interval
        const timeout = setTimeout(() => {
            next()
            interval = setInterval(next, CYCLE_MS)
        }, delay)

        return () => {
            clearTimeout(timeout)
            clearInterval(interval)
        }
    }, [delay])

    // el key remonta el span en cada cambio y reinicia la animación de entrada
    return (
        <span key={font} className={`footer__name footer__name--${font}`}>
            Frisson
        </span>
    )
}

function Names({ side }) {
    // a la derecha las fuentes arrancan desplazadas para no ser un espejo
    const shift = side === 'left' ? 0 : 2
    const lag = side === 'left' ? 0 : 350

    return (
        <div className={`footer__names footer__names--${side}`} aria-hidden="true">
            {NAMES.map((n, i) => (
                <Word
                    key={n}
                    start={((n - 1 + shift) % 4) + 1}
                    delay={CYCLE_MS / 4 * i + lag}
                />
            ))}
        </div>
    )
}

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__wrap">
                <Names side="left" />

                <div className="footer__center">
                    <div className="footer__cols">
                        <nav className="footer__col" aria-label="Navegación del sitio">
                            <ul className="footer__list">
                                {NAV.map((l) => (
                                    <li key={l.label}>
                                        <a className="footer__link" href={l.href}>
                                            {l.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <nav className="footer__col" aria-label="Redes y contacto">
                            <ul className="footer__list">
                                {SOCIAL.map((l) => (
                                    <li key={l.label}>
                                        <a
                                            className="footer__link"
                                            href={l.href}
                                            {...(l.href.startsWith('http')
                                                ? { target: '_blank', rel: 'noopener noreferrer' }
                                                : {})}
                                        >
                                            {l.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <p className="footer__tagline">
                            <strong>Frisson</strong>
                            Independent design &amp; development studio
                        </p>
                    </div>

                    <span className="footer__line" aria-hidden="true" />

                    <p className="footer__copy">
                        © {new Date().getFullYear()} Frisson Studio todos los derechos reservados
                    </p>
                </div>

                <Names side="right" />
            </div>
        </footer>
    )
}

export default Footer