/* 
const PROJECTS = [
    {
        id: 'huincacara',
        img: '/projects/huincacara-lodge/huinca2.svg',
        alt: 'Huincacara Lodge',
        tags: ['Desarrollo Web', 'Rediseño'],
        title: 'Huincacara Lodge',
        description:
            'Rediseño de sitio web convertido en experiencia digital para conectar con el lugar real.',
    },
    {
        id: 'cristianveas',
        img: '/projects/Cristianveas/maccristian.svg',
        alt: 'CristianVeas',
        tags: ['Diseño Web'],
        title: 'CristianVeas',
        description: 'Rediseño + nuevo sistema de cotización por carrito',
    },
    {
        id: 'Explosed',
        img: '/projects/Explosed/macexplosed.svg',
        alt: 'Explosed',
        tags: ['Desarrollo Web'],
        title: 'Explosed',
        description:
            'Rediseño enfocado en jerarquía visual, navegación y percepción del sitio.',
    },
    {
        id: 'desaloon',
        img: '/projects/Desaloon/macdesalon.svg',
        alt: 'De Saloon',
        tags: ['Desarrollo Web'],
        title: 'De Saloon',
        description:
            'Rediseño enfocado en jerarquía visual, navegación y percepción del sitio.',
    },
    {
        id: 'Arthum',
        img: '/projects/Arthum/macarthum.svg',
        alt: 'Arthum',
        tags: ['Rediseño'],
        title: 'Arthum',
        description:
            'Modernización completa de e-commerce para destacar obras y mejorar exploración.',
    },
    {
        id: 'Linkin Park',
        img: '/projects/Linkinpark/maclinkin.svg',
        alt: 'Linkin Park',
        tags: ['Educativo'],
        title: 'Linkin Park',
        description:
            'Sitio completo con enfoque en contenido, interacción y experiencia para fans.',
    },
    {
        id: 'Mineduc',
        img: '/projects/Mineduc/macmineduc.svg',
        alt: 'Mineduc',
        tags: ['Educativo'],
        title: 'Mineduc',
        description:
            'Rediseño del home de Mineduc enfocado en accesibilidad, aplicando los estándares WCAG para mejorar la legibilidad.',
    },
    {
        id: 'Carsjdm',
        img: '/projects/Carsjdm/maccars.svg',
        alt: 'Carsjdm',
        tags: ['Desarrollo web'],
        title: 'Carsjdm',
        description:
            'Plataforma diseñada para facilitar la visualización de productos y optimizar las consultas recibidas por el negocio.',
    },
] */
import Cursor from '../components/Cursor/Cursor'
import Footer from '../components/Footer/Footer'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import projects from '../data/projects.json'
import './Proyectos.scss'

// Los filtros salen solos de las categorías del JSON
const FILTERS = ['Todos', ...new Set(projects.flatMap((p) => p.category))]

function Proyectos() {
    const [active, setActive] = useState('Todos')

    const visible =
        active === 'Todos'
            ? projects
            : projects.filter((p) => p.category.includes(active))

    return (

        <>
            <Cursor />
            <main className="proyectos">
                <section className="proyectos__hero">
                    <div className="proyectos__hero-wrap">
                        <h1 className="proyectos__title">
                            Proyectos con <em>historia</em>
                        </h1>

                        <div className="proyectos__hero-foot">
                            <p className="proyectos__lead">
                                Una selección de trabajos donde el diseño y el desarrollo se
                                encuentran para resolver problemas reales.
                            </p>

                            {/* Dato contextual: solo el conteo real */}
                            <p className="proyectos__count">
                                <span className="proyectos__count-num">
                                    {String(projects.length).padStart(2, '0')}
                                </span>
                                <span className="proyectos__count-label">proyectos</span>
                            </p>
                        </div>
                    </div>
                </section>

                <section className="proyectos__work">
                    <div className="proyectos__work-wrap">
                        <div className="proyectos__bar">
                            <div className="proyectos__filters">
                                {FILTERS.map((filter) => (
                                    <button
                                        key={filter}
                                        type="button"
                                        className={`proyectos__filter ${active === filter ? 'is-active' : ''}`}
                                        onClick={() => setActive(filter)}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>

                            <p className="proyectos__status">
                                {visible.length} {visible.length === 1 ? 'proyecto' : 'proyectos'}
                            </p>
                        </div>

                        {/* el key remonta la grilla y reinicia la animación de entrada */}
                        <div className="proyectos__grid" key={active}>
                            {visible.map((p, i) => (
                                <article
                                    key={p.slug}
                                    className="project-card"
                                    style={{ '--i': i, position: 'relative' }} // Necesario para posicionar el enlace
                                >
                                    {/* Enlace estirado que cubre toda la card */}
                                    <Link
                                        to={`/proyectos/${p.slug}`}
                                        className="project-card__anchor"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            zIndex: 1, // Se coloca encima de los elementos
                                            textIndent: '-9999px' // Oculta el texto redundante para accesibilidad visual
                                        }}
                                    >
                                        Ver proyecto: {p.title}
                                    </Link>

                                    <div className="project-card__mockup2">
                                        <img src={p.cardImage} alt={p.title} />
                                    </div>

                                    <div className="project-card__info">
                                        <p className="project-card__category">
                                            {p.number} {p.category.join(' · ')}
                                        </p>

                                        <h3 className="project-card__title">
                                            {p.title}
                                        </h3>

                                        <p className="project-card__description">{p.summary}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Proyectos