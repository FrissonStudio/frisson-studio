import { useEffect, useRef, useState } from 'react';
import './Filosofia.scss';

const PRINCIPLES = [
    {
        title: 'Entender antes de intervenir',
        text: 'Primero el contexto y el problema real; después, la solución.',
    },
    {
        title: 'No cambiar por cambiar',
        text: 'Conservamos lo que funciona y transformamos lo que ya no responde.',
    },
    {
        title: 'La solución debe sentirse propia',
        text: 'Cada sitio responde a la identidad de la empresa, no a una estética impuesta.',
    },
];

export default function Filosofia() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`philosophy ${visible ? 'is-visible' : ''}`}
        >
            <div className="philosophy__inner">
                <ul className="philosophy__list">
                    {PRINCIPLES.map((item, i) => (
                        <li
                            key={item.title}
                            className="philosophy__item reveal"
                            style={{ '--i': i + 2 }}
                        >
                            <h3 className="philosophy__title">{item.title}</h3>
                            <p className="philosophy__text">{item.text}</p>
                        </li>
                    ))}
                </ul>

                <div className="philosophy__intro">

                    <h2 className="philosophy__statement reveal" style={{ '--i': 1 }}>
                        Diseñar es decidir qué{' '}
                        <em className="philosophy__change">cambiar</em>, qué{' '}
                        <span className="philosophy__keep">conservar</span> y por qué.
                    </h2>

                    <p className="philosophy__closing reveal" style={{ '--i': 5 }}>
                        Criterio antes que{' '}
                        <span className="philosophy__struck">tendencia</span>.
                    </p>
                </div>
            </div>
        </section>
    );
}