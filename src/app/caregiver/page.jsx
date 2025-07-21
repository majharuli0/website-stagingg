import Ambassidor from "@/components/Caregiver/Ambassidor";
import CaregiverHero from "@/components/Caregiver/CaregiverHero";
import Detection from "@/components/Caregiver/Detection";
import Discover from "@/components/Caregiver/Discover";
import EarningWith from "@/components/Caregiver/EarningWith";
import Form from "@/components/Caregiver/Form";
import StepPage from "@/components/Caregiver/StepPage";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Navbar";

const page = () => {
  return (
    <div className="flex flex-col gap-[60px] font-poppins overflow-x-hidden">
      <div className="bg-[#E8F4FA]">
        <Header />
        <CaregiverHero />
      </div>
      <Ambassidor />
      <EarningWith />
      <Detection />
      <Discover />
      <StepPage />
      <Form />
      <Discover />
      <Footer />
    </div>
  );
};

export default page;
