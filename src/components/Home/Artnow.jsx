import Image from "next/image";
import { Img } from "..";

const cardData = [
  {
    id: 1,
    imageSrc: "/images/home/card1.webp",
    altText: "stroke",
    title: "A Single Fall Can Change Everything",
    description:
      "Falls are the #1 cause of injury for seniors. What happens if no one is around to help them in time?",
    bottomText: "Don’t wait—protect them today.",
    tagText: "1 IN 4 SENIORS FALL",
    tagBgColor: "#F1D9E6",
    iconSrc: "cardIcon1.svg",
  },
  {
    id: 2,
    imageSrc: "/images/home/card2.webp",
    altText: "stroke",
    title: "Emergencies Don’t Wait",
    description:
      "Health emergencies can strike in an instant. Be sure help is always there when they need it most.",
    bottomText: "Every second counts. Don’t risk waiting.",
    tagText: "1 IN 5 FACE CRISES",
    tagBgColor: "#E3EFF8",
    iconSrc: "cardIcon2.svg",
  },
  {
    id: 3,
    imageSrc: "/images/home/card3.webp",
    altText: "stroke",
    title: "Caring for Them Is Caring for You",
    description:
      "Keep your loved ones safe, and gain peace of mind, even when you’re not around.",
    bottomText: "Stop worrying and start protecting.",
    tagText: "80% CAREGIVERS WORRY",
    tagBgColor: "#FFFFFF",
    iconSrc: "cardIcon3.svg",
  },
];
const Artnow = () => {
  return (
    <div className="max-w-[1320px] my-0 mx-auto w-full rounded-xl">
      <div className="flex justify-center">
        <p className="tab:hidden bg-neutral-950 tab:mt-8 text-white my-0 text-[40px] tab:text-2xl md:text-3xl px-16 py-[8px] font-semibold">
          Act Now
        </p>
        <p className="hidden tab:block bg-neutral-950 rounded-2xl  text-white my-0 text-base  px-8 py-[8px] font-bold">
          Act Now
        </p>
      </div>
      <p className="text-[40px] tab:text-2xl md:text-3xl tab:font-bold mb-4 pb-12 tab:pb-5 text-center py-4">
        Take Action to Secure Their Safety Today
      </p>

      {/* cards */}
      <div className="flex justify-between items-center w-full tab:flex-col gap-6 md:gap-3">
        {cardData.map((card) => (
          <div
            key={card.id}
            className="h-[569px] tab:my-[6px] md:h-[350px] w-full max-w-[426px] tab:h-[500px] sm:h-[450px] overflow-hidden relative bg-[#EEEFEF] shadow-md shadow-slate-200 rounded-md"
          >
            {/* Image */}
            <figure>
              <Image
                src={card.imageSrc}
                alt={card.altText}
                height={300}
                width={200}
                quality={100}
                className="object-cover h-[278px] tab:h-auto md:h-[146px] tab-h-auto w-full"
              />
            </figure>

            {/* Body */}
            <div className="p-2">
              <h3 className="text-[22px] py-3 md:text-[19px] font-bold">
                {card.title}
              </h3>
              <p className="text-[18px] md:text-sm">{card.description}</p>
            </div>
            <p className="text-sm md:text-[12px] absolute bottom-5 left-3">
              {card.bottomText}
            </p>

            {/* Tag and Icon */}
            <div className="absolute top-3 z-10 w-full">
              <div className="flex justify-between items-center px-5 md:px-2 tab:px-5">
                <p
                  className="text-xs md:text-[10px] font-semibold inline-block px-3 md:px-2 py-2 rounded-3xl"
                  style={{ backgroundColor: card.tagBgColor }}
                >
                  {card.tagText}
                </p>
                <Image
                  src={`/images/${card.iconSrc}`}
                  width={48}
                  height={48}
                  alt="Icon"
                  className="bg-[#2C3142] w-12 h-12 md:h-10 md:w-10 p-3 rounded-full object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border tab:hidden border-b-1 border-black-900 mt-12"></div>
    </div>
  );
};

export default Artnow;
