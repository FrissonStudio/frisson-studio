import { useEffect, useRef } from 'react';
import './Servicios.scss';

const SERVICIOS = [
    {
        id: 'crear',
        num: '01',
        title: 'Crear',
        tint: 'sage',
        rings: 1,
        desc: 'Para empresas que necesitan construir su presencia digital desde cero.',
        items: [
            'UX/UI',
            'Arquitectura de información',
            'Diseño responsive',
            'Desarrollo web',
            'WordPress',
            'React',
        ],
    },
    {
        id: 'transformar',
        num: '02',
        title: 'Transformar',
        tint: 'lilac',
        rings: 2,
        desc: 'Para empresas que tienen un sitio, pero ya no representa lo que son o necesitan.',
        items: [
            'Rediseño',
            'Reestructuración',
            'Mejora de UX',
            'Optimización',
            'Evolución visual y funcional',
        ],
    },
    {
        id: 'reconstruir',
        num: '03',
        title: 'Reconstruir',
        tint: 'sand',
        rings: 3,
        desc: 'Para proyectos que necesitan una transformación más profunda.',
        items: [
            'Migraciones',
            'Reconstrucción de sitios',
            'Desarrollo personalizado',
            'Integraciones',
            'Modernización tecnológica',
        ],
    },
];

// Radios de los anillos: 1 círculo -> Crear, 2 -> Transformar, 3 -> Reconstruir
const RING_RADII = [12, 22, 32];

// Ajustes del efecto
const STEP_Y = 26;      // px que asoma cada carta de atrás
const STEP_SCALE = 0.045; // cuánto se reduce cada carta de atrás

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

function Rings({ count }) {
    return (
        <svg className="servicios__rings" viewBox="0 0 68 68" aria-hidden="true">
            <circle className="servicios__ring-fill" cx="34" cy="34" r="12" />
            <circle cx="34" cy="34" r="12" />
            {RING_RADII.slice(1, count).map((r) => (
                <circle key={r} cx="34" cy="34" r={r} />
            ))}
        </svg>
    );
}

export default function Servicios() {
    const stackRef = useRef(null);
    const stageRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const stack = stackRef.current;
        const stage = stageRef.current;
        const cards = cardRefs.current;
        let raf = null;

        const update = () => {
            raf = null;

            const stickTop = parseFloat(getComputedStyle(stage).top) || 0;
            const total = stack.offsetHeight - stage.offsetHeight;
            const raw = total > 0 ? (stickTop - stack.getBoundingClientRect().top) / total : 0;
            const p = clamp(raw, 0, 1) * (cards.length - 1);

            // Easing: cada carta "descansa" en su posición y luego transiciona
            const base = Math.floor(p);
            const f = p - base;
            const progress = base + f * f * (3 - 2 * f);

            cards.forEach((card, i) => {
                if (!card) return;
                const d = i - progress; // >0: detrás · 0: al frente · <0: saliendo

                let transform;
                let opacity = 1;
                let content = 1;

                if (d >= 0) {
                    const depth = Math.min(d, 2);
                    transform = `translate3d(0, ${depth * STEP_Y}px, 0) scale(${1 - depth * STEP_SCALE})`;
                    content = clamp(1 - d * 1.4, 0, 1); // el contenido aparece al acercarse
                } else {
                    const t = Math.min(-d, 1);
                    transform = `translate3d(0, ${-t * 115}%, 0) rotate(${-t * 3}deg)`;
                    opacity = 1 - t * t;
                }

                card.style.transform = transform;
                card.style.opacity = opacity;
                card.style.setProperty('--content', content);
                card.classList.toggle('is-active', Math.abs(d) < 0.5);
            });
        };

        const onScroll = () => {
            if (raf === null) raf = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);

        return () => {
            if (raf !== null) cancelAnimationFrame(raf);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    return (
        <section className="servicios" id="servicios">
            <div className="servicios__wrap">
                <h2 className="servicios__title">No todos los proyectos necesitan lo mismo.</h2>
                <p className="servicios__intro">
                    Desde una web nueva hasta la evolución de un sitio existente, trabajamos a partir de lo
                    que cada proyecto realmente necesita.
                </p>

                <div
                    className="servicios__stack"
                    ref={stackRef}
                    style={{ '--steps': SERVICIOS.length - 1 }}
                >
                    <div className="servicios__stage" ref={stageRef}>
                        {SERVICIOS.map((s, i) => (
                            <article
                                key={s.id}
                                ref={(el) => (cardRefs.current[i] = el)}
                                className={`servicios__card servicios__card--${s.tint}`}
                                style={{ zIndex: SERVICIOS.length - i }}
                                aria-labelledby={`servicio-${s.id}`}
                            >
                                <div className="servicios__head">
                                    <Rings count={s.rings} />
                                    <div>
                                        <span className="servicios__num">{s.num}</span>
                                        <h3 id={`servicio-${s.id}`} className="servicios__name">
                                            {s.title}
                                        </h3>
                                    </div>
                                </div>

                                <p className="servicios__desc">{s.desc}</p>

                                <ul className="servicios__chips">
                                    {s.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </div>

                <p className="servicios__close">
                    No partimos de una lista de servicios. Partimos de lo que el proyecto necesita.
                </p>
            </div>
        </section>
    );
}