/* import Header from '../components/Header/Header' */
import Hero from '../components/Hero/Hero'
import SelectedWork from '../components/SelectedWork/SelectedWork'
import Proceso from '../components/Process/Proceso'
import Filosofia from '../components/Filosofie/Filosofia'
import Servicios from '../components/Services/Servicios'
import Estudio from '../components/Studio/Estudio'
import Cursor from '../components/Cursor/Cursor'
import Contacto from '../components/Contact/Contacto'
import Footer from '../components/Footer/Footer'

function Home() {
    return (
        <>
            <Cursor />
     {/*        <Header /> */}
            <Hero />
            <SelectedWork />
            <Proceso />
            <Filosofia />
            <Servicios />
            <Estudio />
            <Contacto />
            <Footer />
        </>
    )
}

export default Home