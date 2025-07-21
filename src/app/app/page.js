import AppHero from "@/components/App/AppHero";
import Features from "@/components/App/Features";
import FeaturesSection from "@/components/App/FeaturesSection";
import Intelligent from "@/components/App/Intelligent";
import Scaner from "@/components/App/Scaner";
import CallbackForm from "@/components/Home/CallbackForm";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Navbar";
import { cookies } from "next/headers";

import React from "react";

const page = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");
  return (
    <div className="flex flex-col items-center font-poppins overflow-x-hidden">
      <Header />
      <AppHero />
      <Intelligent />
      <Features />
      <FeaturesSection />
      <Scaner />
      <CallbackForm accessToken={accessToken} />
      <Footer />
    </div>
  );
};

export default page;
