import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ComingSoon from "./components/ComingSoon";
import Enquiry from "./components/Enquiry";
import Footer from "./components/Footer";
import { COMING_SOON } from "./site";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        {COMING_SOON ? <ComingSoon /> : <Hero />}
        <Enquiry />
      </main>
      <Footer />
    </>
  );
}
