import './Hero.scss'

function Hero() {
    return (
        <section className="hero">
            <h1 className="hero__title">
                <span className="hero__title-text">FRISSON</span>
                <span className="hero__shape" aria-hidden="true" />
                <span className="hero__studio">Studio</span>
            </h1>

            <div className="hero__content">
                <p className="hero__lead">
                    Tu empresa ya tiene una identidad. Hagamos que tu sitio
                    también la tenga.
                </p>

                <p className="hero__text">
                    Diseño y desarrollo de sitios digitales personalizados para
                    empresas que quieren evolucionar sin dejar de sentirse
                    propias.
                </p>
            </div>
        </section>
    )
}

export default Hero