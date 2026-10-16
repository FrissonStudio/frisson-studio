import { Link } from 'react-router-dom'
import './SelectedWork.scss'

function SelectedWork() {
    return (
        <section className="selected-work" id="trabajo">
            <div className="selected-work__projects">

                {/* 1. Huincacara Lodge */}
                <article className="project-card" style={{ position: 'relative' }}>
                    <Link
                        to="/proyectos/huincacara-lodge"
                        className="project-card__anchor"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 1,
                            textIndent: '-9999px'
                        }}
                    >
                        Ver proyecto: Huincacara Lodge
                    </Link>

                    <div className="project-card__mockup">
                        <img
                            src="/projects/huincacara-lodge/huinca2.svg"
                            alt="Huincacara Lodge"
                        />
                    </div>

                    <div className="project-card__info">
                        <p className="project-card__category">
                            01 Desarrollo Web · Rediseño
                        </p>

                        <h3 className="project-card__title">
                            Huincacara Lodge
                        </h3>

                        <p className="project-card__description">
                            Rediseño de sitio web convertido en experiencia digital para
                            conectar con el lugar real.
                        </p>
                    </div>
                </article>

                {/* 2. Cristian Veas */}
                <article className="project-card" style={{ position: 'relative' }}>
                    <Link
                        to="/proyectos/Cristian-Veas"
                        className="project-card__anchor"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 1,
                            textIndent: '-9999px'
                        }}
                    >
                        Ver proyecto: CristianVeas
                    </Link>

                    <div className="project-card__mockup">
                        <img
                            src="/projects/Cristianveas/maccristian.svg"
                            alt="Proyecto 02"
                        />
                    </div>

                    <div className="project-card__info">
                        <p className="project-card__category">
                            02 Diseño Web
                        </p>

                        <h3 className="project-card__title">
                            CristianVeas
                        </h3>

                        <p className="project-card__description">
                            Rediseño + nuevo sistema de cotización por carrito
                        </p>
                    </div>
                </article>

                {/* 3. De Saloon */}
                <article className="project-card" style={{ position: 'relative' }}>
                    <Link
                        to="/proyectos/De-Saloon"
                        className="project-card__anchor"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 1,
                            textIndent: '-9999px'
                        }}
                    >
                        Ver proyecto: De Saloon
                    </Link>

                    <div className="project-card__mockup">
                        <img
                            src="/projects/Desaloon/macdesalon.svg"
                            alt="Proyecto 03"
                        />
                    </div>

                    <div className="project-card__info">
                        <p className="project-card__category">
                            03 Desarrollo Web
                        </p>

                        <h3 className="project-card__title">
                            De Saloon
                        </h3>

                        <p className="project-card__description">
                            Rediseño enfocado en jerarquía visual, navegación y percepción del sitio.
                        </p>
                    </div>
                </article>

            </div>

            <Link to="/proyectos" className="selected-work__action">
                Ver todos los proyectos
            </Link>

        </section>
    )
}

export default SelectedWork