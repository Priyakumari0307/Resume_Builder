import Hero from '../components/Home/Hero.jsx'
import Banner from '../components/Home/Banner.jsx'
import Features from '../components/Home/Features.jsx'
import Testimonials from '../components/Home/Testimonials.jsx'
import Footer from '../components/Home/Footer.jsx'
import Navbar from '../components/Home/Navbar.jsx'

const Home = () => {
    return(
        <div style={{ scrollBehavior: 'smooth' }}>
            <Banner/>
            <Navbar/>
            <section id="home">
                <Hero/>
            </section>
            <section id="features">
                <Features/>
            </section>
            <section id="testimonials">
                <Testimonials/>
            </section>
            <Footer/>
        </div>
    )
}

export default Home;