import Footer from "@/components/layouts/Footer";
import SecondaryNav from "@/components/layouts/Navbar/SecondaryNav";

export default function Layout({ children }) {
  return (
    <>
      <SecondaryNav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
