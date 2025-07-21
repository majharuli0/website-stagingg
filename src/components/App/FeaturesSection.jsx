import Image from "next/image";
import img from "@/assets/app/Vector1.png";

export default function FeaturesSection() {
  const features = [
    {
      title: "Activity Analysis",
      description:
        "Gain insights into routines and behavior for informed caregiving with detailed activity analysis.",
    },
    {
      title: "Manage Device",
      description:
        "Effortlessly control your caregiving environment by managing device settings for optimal well-being.",
    },
    {
      title: "Manage Room",
      description:
        "Fine-tune the room environment to ensure comfort and safety for your loved one.",
    },
  ];

  const card = [
    {
      title: "Manage Family Members",
      description:
        "Simplify coordination by efficiently managing family members within the app for a collaborative caregiving approach.",
    },
    {
      title: "Senior Look-out",
      description:
        "Stay informed with real-time updates on your senior's status and receive alerts for peace of mind.",
    },
  ];

  return (
    <div className="w-full max-w-[1720px] xxl:py-7 md:py-6 tab:py-2 px-6">
      <div className="bg-[#70B896] rounded-t-lg relative flex justify-center overflow-hidden px-5">
        <Image
          src={img}
          alt="img"
          width={180}
          height={105}
          className="absolute top-0 left-0"
        />
        <div className="flex md:grid grid-cols-1 md:text-center items-start justify-between  gap-[10px]  text-white">
          {features.map((feature, index) => (
            <div
              key={index}
              className="md:p-6 p-10 flex flex-col gap-1 justify-center"
            >
              <h3 className="font-semibold text-3xl md:text-xl">
                {feature.title}
              </h3>
              <p className="text-xl md:text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full bg-[#F1F8F5] rounded-b-lg px-5 flex md:grid grid-cols-1 md:text-center justify-between md:justify-center items-center ">
        {card.map((card, index) => (
          <div
            key={index}
            className="md:p-6 p-10 min-w-[40%] md:min-w-full flex flex-col gap-1 justify-center max-w-[595px]"
          >
            <h3 className="font-semibold text-3xl md:text-xl">{card.title}</h3>
            <p className="text-xl md:text-sm">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
