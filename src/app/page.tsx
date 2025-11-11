import { Footer } from "@/components/Fooder";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Header />
      <Hero />
      <div>
        <Footer />
      </div>
    </div>
  );
}
