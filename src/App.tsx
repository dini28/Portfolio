import Footer from "./components/layout/Footer"
import Header from "./components/layout/Header"
import Contact from "./components/sections/Contact"
import Hero from "./components/sections/Hero"
import Project from "./components/sections/Project"
import Skills from "./components/sections/Skills"
import WhatsAppButton from "./components/common/WhatsAppButton"
import About from "./components/sections/About"
import { SmoothScroll } from "./components/common/SmoothScroll"
import PortfolioGuide from "./components/sections/PortfolioGuide"

function App() {
  return (
    <SmoothScroll>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Project />
        <Contact />
      </main>
      <Footer />
      <PortfolioGuide />
      <WhatsAppButton />
    </SmoothScroll>
  )
}

export default App

