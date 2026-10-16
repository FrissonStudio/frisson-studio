import './Estudio.scss';

export default function Estudio() {
    return (
        <section className="estudio" id="estudio">
            <div className="estudio__wrap">
                <div className="estudio__grid">
                    <div className="estudio__photo">
                        <div className="estudio__ring" aria-hidden="true" />
                        <div className="estudio__frame">
                            <img src="/projects/yio1.png" alt="Benjamín, fundador de Frisson" loading="lazy" />
                        </div>
                    </div>

                    <div className="estudio__content">
                        <h2 className="estudio__title">
                            <span style={{ color: '#C8A97E' }}>Frisson</span> es un estudio independiente.
                        </h2>
                        <p className="estudio__intro">
                            Texto introductorio sobre Frisson: quiénes somos, cómo trabajamos y qué tipo de
                            proyectos nos interesan.
                        </p>

                        <div className="estudio__person">
                            <h3 className="estudio__name">Benjamín</h3>
                            <p className="estudio__role">Founder, Designer &amp; Developer</p>
                            <p className="estudio__bio">
                                Breve presentación: de dónde viene, qué le interesa del diseño y por qué decidió
                                crear Frisson.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}