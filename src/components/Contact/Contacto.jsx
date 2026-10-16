import { useState } from 'react';
import './Contacto.scss';

const EMAIL = 'hola@frisson.studio'; // ← cambia por tu correo

function Mock({ variant }) {
    return (
        <div className={`contacto__mock contacto__mock--${variant}`} aria-hidden="true">
            <div className="contacto__mock-nav">
                <span className="contacto__mock-logo" />
                <span className="contacto__mock-links">
                    <i /><i /><i /><i />
                </span>
            </div>

            <div className="contacto__mock-hero">
                <p className="contacto__mock-title">
                    {variant === 'before' ? 'Bienvenidos a nuestra empresa' : 'Hacemos que tu marca se sienta'}
                </p>
                <span className="contacto__mock-line" />
                <span className="contacto__mock-line contacto__mock-line--short" />
                <span className="contacto__mock-btn" />
            </div>

            <div className="contacto__mock-cards">
                <span /><span /><span />
            </div>
        </div>
    );
}

export default function Contacto() {
    const [pos, setPos] = useState(50);

    return (
        <section className="contacto" id="contacto">
            <div className="contacto__wrap">
                <div className="contacto__info">
                    <h2 className="contacto__title">
                        ¿Tu sitio ya no te representa? Vamos con el tuyo.
                    </h2>

                    <p className="contacto__text">
                        Cuéntame sobre tu empresa, tu proyecto o eso que sientes que ya no funciona
                        como debería.
                    </p>

                    <a className="contacto__btn" href={`mailto:${EMAIL}`}>
                        Enviar Correo
                    </a>
                </div>

                <div className="contacto__compare" style={{ '--pos': `${pos}%` }}>
                    <div className="contacto__layer contacto__layer--before">
                        <Mock variant="before" />
                    </div>

                    <div className="contacto__layer contacto__layer--after">
                        <Mock variant="after" />
                    </div>

                    <span className="contacto__tag contacto__tag--before">Antes</span>
                    <span className="contacto__tag contacto__tag--after">Después</span>

                    <span className="contacto__divider" aria-hidden="true">
                        <span className="contacto__handle">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
                            </svg>
                        </span>
                    </span>

                    <input
                        className="contacto__range"
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={pos}
                        onChange={(e) => setPos(Number(e.target.value))}
                        aria-label="Comparar el sitio antes y después"
                    />
                </div>
            </div>
        </section>
    );
}