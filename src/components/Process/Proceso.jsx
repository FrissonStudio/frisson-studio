import { useEffect, useRef, useState } from 'react';
import './Proceso.scss';

const STEPS = [
    { number: '01', name: 'Observar', width: 22 },
    { number: '02', name: 'Entender', width: 34 },
    { number: '03', name: 'Preservar', width: 46 },
    { number: '04', name: 'Transformar', width: 58 },
    { number: '05', name: 'Construir', width: 70 },
];

export default function Proceso() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect(); // se anima una sola vez
                }
            },
            { threshold: 0.35 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`process ${visible ? 'is-visible' : ''}`}
        >
            <div className="process__inner">
                <h2 className="process__title">
                    Primero entendemos.
                    <span> Después transformamos.</span>
                </h2>

                <ol className="process__chart">
                    {STEPS.map((step, i) => (
                        <li
                            key={step.number}
                            className="process__row"
                            style={{ '--i': i, '--w': `${step.width}%` }}
                        >
                            <span className="process__label">
                                <b>{step.number}</b> — {step.name}
                            </span>
                            <span className="process__bar" aria-hidden="true" />
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}