import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import Pricing from "~/components/Pricing";
import Reveal from "~/components/Reveal";

export default function pricing() {
  return (
    <>
      <Navbar />
      <div className="px-8 md:px-32 mt-32 flex flex-col items-center">
        <h1 className="text-4xl font-bold">Truly mind-blowing 🤯</h1>
        <p className="mt-4 opacity-50">Pay once, use forever</p>
        <Reveal>
          <Pricing />
        </Reveal>
      </div>
      <Footer />
    </>
  );
}
