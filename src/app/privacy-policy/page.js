"use client";
import "../terms-style.css";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import Header from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
export default function PrivacyPolicyPage() {
  const { country } = useAuth();
  const [TermsComponent, setTermsComponent] = useState(null);
  useEffect(() => {
    async function loadComponent() {
      try {
        const component = await import(`./privacy-policy-${country}`);
        setTermsComponent(() => component.default);
      } catch (error) {
        console.error("Error loading terms component:", error);
        const fallbackComponent = await import("./privacy-policy-global");
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
