import Header from "./components/Header";
import Hero from "./components/Hero";
import AnimatedBackground from "./components/Hero/AnimatedBackground";
// import Portfolio from "./components/Portfolio";
// import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Services from "./components/Services";
// import PricingTable from "./components/Services/PricingTable";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <AnimatedBackground className="fixed inset-0 z-0" />
      <Header className="relative z-10" />
      <main className="relative z-10">
        <Hero />
        <Services />
        {/* <PricingTable /> */}
        {/* <Portfolio /> */}
        {/* <Testimonials /> */}
        <Contact />
      </main>
      <Footer className="relative z-10" />
    </div>
  );
}
