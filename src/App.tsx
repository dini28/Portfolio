import Footer from "./components/layout/Footer"
import Header from "./components/layout/Header"
import Contact from "./components/sections/Contact"
import Hero from "./components/sections/Hero"
import Project from "./components/sections/Project"
import Skills from "./components/sections/Skills"
import WhatsAppButton from "./components/common/WhatsAppButton"
import About from "./components/sections/About"
import { SmoothScroll } from "./components/common/SmoothScroll"


import { ThreeDParticleCanvas } from "./components/common/ThreeDParticleCanvas"

function App() {
  return (
    <SmoothScroll>
      {/* Global fixed background layer */}
      <div className="fixed inset-0 bg-black z-0 pointer-events-none overflow-hidden">
        <ThreeDParticleCanvas />
      </div>

      {/* Main content layer */}
      <div className="relative z-10">
        <Header />
        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Project />
          <Contact />
        </main>
        <Footer />

        <WhatsAppButton />
      </div>
    </SmoothScroll>
  )
}

export default App


