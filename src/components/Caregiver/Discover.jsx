import EllipsShape from "@/assets/caregiver/EllipsShape";
import Starshape from "@/assets/caregiver/Starshape";

const Discover = () => {
  return (
    <div className="bg-[#61B78E] text-[#FFFFFF] w-full flex items-center justify-center overflow-hidden md:p-10">
      <div className="max-w-[1672px] relative">
        <Starshape className="absolute top-[-280px] left-[-150px] md:top-[-200px] md:left-[-100px] sm:top-[-150px] sm:left-[-50px]" />
        <EllipsShape className="absolute top-[-280px] right-[-1800px] md:top-[-200px] md:right-[-1200px] sm:top-[-150px] sm:right-[-800px]" />
      </div>
      <div className="container max-w-[1672px] h-[246px] flex items-center justify-between md:flex-col md:h-auto md:gap-8 sm:gap-6">
        <h1 className="text-[36px] font-semibold max-w-[1239px] md:w-full md:text-[28px] sm:text-[24px] md:text-center md:max-w-full">
          Discover the Advanced Functionalities of Our Innovative Monitoring
          Solutions Engineered for Peak Performance
        </h1>
        <button
          type="button"
          className="bg-[#FFFFFF] text-[#61B78E] w-[276px] h-[78px] rounded-[8px] text-[24px] font-semibold active:scale-95 md:w-[220px] md:h-[64px] md:text-[20px] sm:w-[180px] sm:h-[50px] sm:text-[16px]"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Discover;
