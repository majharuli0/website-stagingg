"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Navbar/index";

export default function Layout({ children }) {
  const pathname = usePathname();

  return (
    <>
      <Header />
      <main>{children}</main>
      {pathname !== "/register" && <Footer />}
    </>
  );
}
