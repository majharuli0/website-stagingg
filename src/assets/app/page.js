import AppHero from "@/components/App/AppHero";
import Features from "@/components/App/Features";
import FeaturesSection from "@/components/App/FeaturesSection";
import Intelligent from "@/components/App/Intelligent";
import Scaner from "@/components/App/Scaner";
import Header from "@/components/layouts/Navbar";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center font-poppins overflow-x-hidden">
      <Header />
      <AppHero />
      <Intelligent />
      <Features />
      <FeaturesSection />
      <Scaner />
    </div>
  );
};

export default page;
