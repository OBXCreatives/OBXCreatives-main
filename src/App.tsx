import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Enquiry from "./components/Enquiry";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Enquiry />
      </main>
      <Footer />
    </>
  );
}
