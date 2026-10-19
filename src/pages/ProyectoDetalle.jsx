import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import projects from '../data/projects.json'
import Cursor from '../components/Cursor/Cursor'
import './ProyectoDetalle.scss'

const toArray = (value) => {
    if (Array.isArray(value)) return value
    return value ? [value] : []
}

function ProyectoDetalle() {
    const { slug } = useParams()

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }, [slug])

    const project = projects.find((item) => item.slug === slug)

    if (!project) {
        return (
            <main className="project-detail">
                <div className="project-detail__hero-wrap">
                    <h1 className="project-detail__title">Proyecto no encontrado</h1>
                    <p className="project-detail__description">
                        El proyecto que buscas no existe.
                    </p>
                    <Link className="project-detail__back" to="/proyectos">
                        Volver a proyectos
                    </Link>
                </div>
            </main>
        )
    }

    const { projectInfo = {}, steps = [] } = project

    const meta = [
        { label: 'Año', value: project.year },
        { label: 'Tipo', value: projectInfo.type },
        { label: 'Rol', value: toArray(projectInfo.role).join(', ') },
        { label: 'Herramientas', value: toArray(projectInfo.tools).join(', ') },
    ].filter((item) => item.value)

    return (
        <>
            <Cursor />
            <main className="project-detail">
                {/* ---------- Hero ---------- */}
                <section className="project-detail__hero">
                    <div className="project-detail__hero-wrap">
                        {/* <Link className="project-detail__back" to="/proyectos">
                        Volver a proyectos
                    </Link> */}

                        <p className="project-detail__category">
                            {toArray(project.category).join(', ')}
                        </p>

                        <h1 className="project-detail__title">{project.title}</h1>

                        <p className="project-detail__description">{project.description}</p>

                        <dl className="project-detail__meta">
                            {meta.map((item) => (
                                <div className="project-detail__meta-item" key={item.label}>
                                    <dt>{item.label}</dt>
                                    <dd>{item.value}</dd>
                                </div>
                            ))}
                        </dl>

                        <div className="project-detail__cover-wrap">
                            <img
                                src={project.cover}
                                alt={`Portada del proyecto ${project.title}`}
                                className="project-detail__cover"
                            />
                        </div>
                    </div>
                </section>

                {/* ---------- Los 5 pasos ---------- */}
                <section className="project-detail__chapters">
                    <div className="project-detail__chapters-wrap">
                        {steps.map((step, index) => (
                            <article
                                className="project-detail__step"
                                id={step.id}
                                key={step.id}
                            >
                                <header className="project-detail__step-head">
                                    <span className="project-detail__step-number">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <span className="project-detail__step-label">
                                        {step.label}
                                    </span>
                                </header>

                                <div className="project-detail__step-body">
                                    <h2 className="project-detail__step-title">{step.title}</h2>

                                    {toArray(step.content).length > 0 && (
                                        <div className="project-detail__step-copy">
                                            {toArray(step.content).map((paragraph) => (
                                                <p
                                                    className="project-detail__step-text"
                                                    key={paragraph}
                                                >
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    )}

                                    {toArray(step.metrics).length > 0 && (
                                        <ul className="project-detail__metrics">
                                            {step.metrics.map((metric) => (
                                                <li
                                                    className="project-detail__metric"
                                                    key={metric.label}
                                                >
                                                    <span className="project-detail__metric-value">
                                                        {metric.value}
                                                    </span>
                                                    <span className="project-detail__metric-label">
                                                        {metric.label}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {toArray(step.media).length > 0 && (
                                        <div className="project-detail__media">
                                            {step.media.map((item, mediaIndex) => (
                                                <figure
                                                    className={`project-detail__figure project-detail__figure--${item.type || 'screen'} project-detail__figure--${item.size || 'full'}`}
                                                    key={`${step.id}-${mediaIndex}`}
                                                >
                                                    <div className="project-detail__frame">
                                                        <img
                                                            src={item.src}
                                                            alt={item.alt || ''}
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                    {item.caption && (
                                                        <figcaption className="project-detail__caption">
                                                            {item.caption}
                                                        </figcaption>
                                                    )}
                                                </figure>
                                            ))}
                                        </div>
                                    )}

                                    {toArray(step.points).length > 0 && (
                                        <ul className="project-detail__points">
                                            {step.points.map((point) => (
                                                <li
                                                    className="project-detail__point"
                                                    key={point.label}
                                                >
                                                    <h3 className="project-detail__point-label">
                                                        {point.label}
                                                    </h3>
                                                    <p className="project-detail__point-text">
                                                        {point.text}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {index === steps.length - 1 && (
                                        <div className="project-detail__actions">
                                            <Link
                                                className="project-detail__button project-detail__button--ghost"
                                                to="/proyectos"
                                            >
                                                Volver a proyectos
                                            </Link>

                                            {project.siteUrl && (
                                                <a
                                                    className="project-detail__button project-detail__button--solid"
                                                    href={project.siteUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="Visitar sitio (se abre en una pestaña nueva)"
                                                >
                                                    Visitar sitio
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

        </>
    )
}

export default ProyectoDetalle