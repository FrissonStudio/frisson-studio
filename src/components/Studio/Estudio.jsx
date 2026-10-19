import { useEffect, useRef } from 'react';
import './Estudio.scss';

// Escribe en --r un valor de 1 (piezas lejos) a 0 (ensambladas).
// Llega a 0 justo cuando el centro de la sección = centro de la ventana.
function useAssembleOnScroll(sectionRef, targetRef) {
    useEffect(() => {
        const section = sectionRef.current;
        const target = targetRef.current;
        if (!section || !target) return;

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (reduce.matches) return; // --r se queda en 0: todo en su lugar

        let ticking = false;

        const update = () => {
            ticking = false;
            const rect = section.getBoundingClientRect();
            const vh = window.innerHeight;

            const d = rect.top + rect.height / 2 - vh / 2;
            const range = (vh / 2 + rect.height / 2) * 0.8;

            let r = Math.min(Math.max(d / range, 0), 1);
            r = r * r * (3 - 2 * r);

            target.style.setProperty('--r', r.toFixed(4));
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [sectionRef, targetRef]);
}

export default function Estudio() {
    const sectionRef = useRef(null);
    const photoRef = useRef(null);
    useAssembleOnScroll(sectionRef, photoRef);

    return (
        <section className="estudio" id="estudio" ref={sectionRef}>
            <div className="estudio__wrap">
                <div className="estudio__grid">
                    <div className="estudio__photo" ref={photoRef}>
                        <div className="estudio__shape" aria-hidden="true">
                            <div className="estudio__ring" />
                            <div className="estudio__frame" />
                        </div>

                        <img
                            className="estudio__img"
                            src="/projects/yio5.svg"
                            alt="Benjamín, fundador de Frisson Studio"
                            loading="lazy"
                        />
                    </div>
                    {/* <div className="estudio__photo">
                        <div className="estudio__ring" aria-hidden="true" />
                        <div className="estudio__frame">
                            <img
                                src="/projects/yio5.svg"
                                alt="Benjamín, fundador de Frisson Studio"
                                loading="lazy"
                            />
                        </div>
                    </div> */}

                    <div className="estudio__content">
                        <h2 className="estudio__title">
                            <span style={{ color: '#C8A97E' }}>Frisson</span> es un estudio independiente.
                        </h2>

                        <p className="estudio__intro">
                            Cada proyecto plantea un desafío distinto. En Frisson,
                            nos interesa entenderlo antes de intervenir: conocer
                            cada negocio, descubrir lo que lo hace particular y
                            desarrollar soluciones digitales que respondan a sus
                            necesidades sin perder su identidad.
                        </p>

                        <div className="estudio__person">
                            <h3 className="estudio__name">Benjamín</h3>
                            <p className="estudio__role">
                                Fundador · Diseñador y desarrollador web
                            </p>
                            <p className="estudio__bio">
                                Soy diseñador y desarrollador web. Me interesan los desafíos que exigen mirar más allá de lo evidente, y creo en investigar, experimentar y cuidar cada detalle con un propósito. Frisson nace de esas ideas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}