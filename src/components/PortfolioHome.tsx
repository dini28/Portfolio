'use client';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Project from '@/components/sections/Project';
import Process from '@/components/sections/Process';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';
import GridOverlay from '@/components/common/GridOverlay';
import SpecBackdrop from '@/components/common/SpecBackdrop';
import InspectMode from '@/components/common/InspectMode';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import { SmoothScroll } from '@/components/common/SmoothScroll';

export default function PortfolioHome() {
    return (
        <div className="relative isolate min-h-screen bg-ink text-white">
            <SpecBackdrop />
            <GridOverlay />
            <div aria-hidden="true" className="grain" />
            <SmoothScroll>
                <Header />
                <main id="main-content" className="w-full">
                    <Hero />
                    <About />
                    <Project />
                    <Process />
                    <Skills />
                    <Contact />
                </main>
                <Footer />
                <InspectMode />
                <WhatsAppButton />
            </SmoothScroll>
        </div>
    );
}
