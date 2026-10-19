import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import './Header.scss'

const RANGE = 240 // px de scroll para completar la transición
const DOCK = 0.4  // desde este progreso el logo es clicable y los enlaces se desactivan
const clamp = (v) => Math.min(1, Math.max(0, v))

function Header() {
    const headerRef = useRef(null)
    const location = useLocation()
    const isHome = location.pathname === '/'

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const header = headerRef.current
        let target = clamp(window.scrollY / RANGE)
        let current = target
        let raf = null

        const apply = () => {
            header.style.setProperty('--s', current.toFixed(4))
            header.classList.toggle('is-docked', current > DOCK)
        }

        const tick = () => {
            current += (target - current) * 0.12 // suavizado: menor = más lento
            if (Math.abs(target - current) < 0.001) current = target
            apply()
            raf = current === target ? null : requestAnimationFrame(tick)
        }

        const onScroll = () => {
            target = clamp(window.scrollY / RANGE)
            if (raf === null) raf = requestAnimationFrame(tick)
        }

        apply()
        window.addEventListener('scroll', onScroll, { passive: true })

        return () => {
            if (raf !== null) cancelAnimationFrame(raf)
            window.removeEventListener('scroll', onScroll)
        }
    }, [])

    return (
        <header className="header" ref={headerRef}>
            <a
                href="/proyectos"
                className="header__link"
                data-text="VER PROYECTOS"
            >
                VER PROYECTOS
            </a>

            <a
                href={isHome ? '#estudio' : '/#estudio'}
                className="header__link header__link--center"
                data-text="CONOCER FRISSON"
            >
                CONOCER FRISSON
            </a>

            <a
                href="/"
                className="header__brand"
                aria-label="Frisson Studio, volver al inicio"
            >
                Frisson <em>Studio</em>
            </a>

            <div className="header__circle" aria-hidden="true">
                <svg
                    className="header__circle-svg"
                    viewBox="0 0 460 460"
                >
                    <defs>
                        {/* Anillo exterior: radio 190 */}
                        <path
                            id="circlePathOuter"
                            d="M 230,230 m -190,0 a 190,190 0 1,1 380,0 a 190,190 0 1,1 -380,0"
                        />
                        {/* Anillo interior: radio 130 */}
                        <path
                            id="circlePathInner"
                            d="M 230,230 m -130,0 a 130,130 0 1,1 260,0 a 130,130 0 1,1 -260,0"
                        />
                    </defs>

                    {/* Anillo exterior */}
                    <g className="header__ring header__ring--outer">
                        <text className="header__circle-text header__circle-text--outer">
                            <textPath
                                href="#circlePathOuter"
                                textLength="1190"
                                lengthAdjust="spacing"
                            >
                                DISEÑO · UX/UI · DESARROLLO · ESTRATEGIA · DISEÑO · UX/UI · DESARROLLO · ESTRATEGIA ·
                            </textPath>
                        </text>
                    </g>

                    {/* Anillo interior (gira al revés) */}
                    <g className="header__ring header__ring--inner">
                        <text className="header__circle-text header__circle-text--inner">
                            <textPath
                                href="#circlePathInner"
                                textLength="810"
                                lengthAdjust="spacing"
                            >
                                IDENTIDAD ✦ INTERFACES ✦ MOVIMIENTO ✦ IDENTIDAD ✦ INTERFACES ✦ MOVIMIENTO ✦
                            </textPath>
                        </text>
                    </g>

                    {/* Asterisco central */}
                    <g className="header__star">
                        <line x1="230" y1="206" x2="230" y2="254" />
                        <line x1="230" y1="206" x2="230" y2="254" transform="rotate(60 230 230)" />
                        <line x1="230" y1="206" x2="230" y2="254" transform="rotate(120 230 230)" />
                    </g>
                </svg>
            </div>
        </header>
    )
}

export default Header