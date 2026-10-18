import './Estudio.scss';

export default function Estudio() {
    return (
        <section className="estudio" id="estudio">
            <div className="estudio__wrap">
                <div className="estudio__grid">
                    <div className="estudio__photo">
                        <div className="estudio__ring" aria-hidden="true" />
                        <div className="estudio__frame">
                            <img
                                src="/projects/yio4.svg"
                                alt="Benjamín, fundador de Frisson Studio"
                                loading="lazy"
                            />
                        </div>
                    </div>

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