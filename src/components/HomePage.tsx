import { useEffect, useState } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import GrainOverlay from "./GrainOverlay";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Manifesto from "./Manifesto";
import Cars from "./Cars";
import Destinations from "./Destinations";
import EnquiryModal from "./EnquiryModal";
import Footer from "./Footer";

/**
 * Page composition — mirrors the original `Landing` in App.js 1:1:
 * grain overlay → header → hero → marquee → manifesto → fleet → trips → footer
 * → (teleported) enquiry modal.
 */
export default function HomePage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [presetCar, setPresetCar] = useState("");
  const [presetDestination, setPresetDestination] = useState("");

  // Lenis smooth scroll, exactly as the original (lerp .09, wheelMultiplier 1).
  // Deviation: skipped entirely under prefers-reduced-motion.
  // `anchors: true` lets the in-page nav links scroll through Lenis instead of
  // fighting it with a native hash jump.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, anchors: true });
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const openEnquiry = (car = "", destination = "") => {
    setPresetCar(car);
    setPresetDestination(destination);
    setEnquiryOpen(true);
  };

  return (
    <div className="App" data-testid="yatravibes-app">
      <GrainOverlay />
      <Navbar onBook={() => openEnquiry()} />
      <main>
        <Hero onBook={() => openEnquiry()} />
        <Marquee />
        <Manifesto />
        <Cars onBook={(car) => openEnquiry(car)} />
        <Destinations onBook={(dest) => openEnquiry("", dest)} />
      </main>
      <Footer />
      <EnquiryModal
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        presetCar={presetCar}
        presetDestination={presetDestination}
      />
      <Toaster theme="dark" position="bottom-center" />
    </div>
  );
}
