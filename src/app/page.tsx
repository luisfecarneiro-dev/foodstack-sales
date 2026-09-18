import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FoodStackHero } from "@/features/hero/FoodStackHero";
import { Storytelling } from "@/features/storytelling/Storytelling";
import { CaseShowcase } from "@/features/showcase/CaseShowcase";
import { Engineering } from "@/features/storytelling/Engineering";
import { FinalCTA } from "@/features/contact/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <FoodStackHero />
        <Storytelling />
        <CaseShowcase />
        <Engineering />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
