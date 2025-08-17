import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
