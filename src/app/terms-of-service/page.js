"use client";
import Header from "@/components/layouts/Navbar";
import "../terms-style.css";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import Footer from "@/components/layouts/Footer";
export default function TermsOfServicePage() {
  const { country } = useAuth();
  const [TermsComponent, setTermsComponent] = useState(null);

  useEffect(() => {
    async function loadComponent() {
      try {
        const component = await import(`./terms-of-service-${country}`);
        setTermsComponent(() => component.default);
      } catch (error) {
        console.error("Error loading terms component:", error);
        const fallbackComponent = await import("./terms-of-service-global");
        setTermsComponent(() => fallbackComponent.default);
      }
    }
    loadComponent();
  }, [country]);

  return (
    <>
      <Header />
      {TermsComponent ? <TermsComponent /> : <div>Loading...</div>}
      <Footer />
    </>
  );
}
