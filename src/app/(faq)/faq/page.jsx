import SearchBar from "@/components/searchBar/SearchBar";
import Image from "next/image";
import Link from "next/link";

const helpTopics = [
  {
    title: "First Time Use",
    description: "Welcome to Seenyor Application",
    icon: "/images/help1.svg",
    link: "#",
  },
  {
    title: "Product Features and Overview",
    description: "Creating Personalized Care and Monitoring",
    icon: "/images/help2.svg",
    link: "#",
  },
  // {
  //   title: "Device Issues",
  //   description: "Monitor Device Performance and Updates",
  //   icon: "/images/help3.svg",
  //   link: "#",
  // },
  {
    title: "Device Troubleshooting",
    description: "Solutions for a Smooth Experience",
    icon: "/images/help4.svg",
    link: "#",
  },
  {
    title: "Device Logins and Account Management",
    description: "A Guide to Using Key App Features",
    icon: "/images/help5.svg",
    link: "#",
  },
  {
    title: "Account Login",
    description: "Managing Seenyor Account",
    icon: "/images/help8.svg",
    link: "#",
  },
  // {
  //   title: "Videos",
  //   description: "Interactive Video Materials",
  //   icon: "/images/help9.svg",
  //   link: "#",
  // },
  {
    title: "Installation FAQs",
    description: "Welcome to Seenyor Download Zone",
    icon: "/images/help10.svg",
    link: "#",
  },
];
const Knowledge = () => {
  return (
    <div>
      <SearchBar />
      <div className="flex flex-col gap-10 bg-white mb-8">
        <div className="mx-auto max-w-[1320px] bg-[#F5F5FB] w-full p-6">
          <h2 className="my-8 pb-2 border-b border-slate-400 text-2xl font-semibold">
            Help Topics
          </h2>

          <div className="grid grid-cols-4 sm:block md:grid-cols-2 gap-4">
            {helpTopics.map((topic, index) => (
              <Link
                href={`faq/${topic?.title}`}
                key={index}
                className="flex sm:my-4 justify-center sm:justify-start items-center bg-white rounded-xl p-4 min-h-[140px] md:min-h-[100px]"
              >
                <div className="flex flex-row items-start  gap-4 ">
                  <Image
                    src={topic?.icon}
                    height={10}
                    width={10}
                    alt=""
                    className="h-[30px] w-[30px] mt-2"
                  />
                  <div>
                    <h3 className="font-semibold text-lg md:text-[16px]">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-gray-500">{topic.description}</p>
                  </div>
                </div>
              </Link>
            ))}

            <div className="tab:col-span-1 col-span-2 flex sm:my-4 justify-center sm:justify-start items-center bg-white rounded-xl p-4 min-h-[140px] md:min-h-[100px]">
              <div className="flex tab:block bg-white rounded-xl min-h-[100px] flex-row items-center gap-3 p-4">
                <div className="flex justify-between items-center gap-4">
                  <Image
                    src="/images/help11.svg"
                    height={10}
                    width={10}
                    alt=""
                    className="h-7 w-7"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg md:text-[16px]">
                      Need Support?
                    </h3>
                    <p className="text-sm text-gray-500">
                      Can’t find the answer you’re looking for? Don’t worry,
                      we’re here to help!
                    </p>
                  </div>
                </div>
                <Link href="/contact-us?section=call_back_form">
                  <button className="bg-[#80CAA7] tab:mt-5 w-56 text-sm hover:bg-emerald-300 text-white font-semibold py-[8px] px-4 rounded">
                    Contact Support
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Knowledge;
