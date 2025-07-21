import { Activity, Bell, Brain, CheckCircle, Phone } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Fall Detection Devices",
    description:
      "Instantly alerts caregivers or emergency services in case of a fall, ensuring prompt assistance for seniors.",
    icon: Phone,
  },
  {
    title: "Sleep Monitoring Systems",
    description:
      "Provides comprehensive insights into seniors' sleep patterns and quality, helping caregivers detect and address potential sleep-related issues.",
    icon: Brain,
  },
  {
    title: "Medication Reminders",
    description:
      "Custom-made schedules and audible alerts promoting medication adherence and health management.",
    icon: Bell,
  },
  {
    title: "Activity Trackers",
    description:
      "Monitors seniors' daily activity levels and mobility, empowering caregivers to track progress and encourage healthy habits.",
    icon: Activity,
  },
];

const features = [
  {
    title: "Expertise",
    description:
      "Our team consists of experienced professionals with in-deep understanding of elder care needs and technology solutions.",
  },
  {
    title: "Innovation",
    description:
      "We continuously innovate and develop new solutions to meet the evolving needs of seniors and their caregivers.",
  },
  {
    title: "Peace of Mind Caregivers",
    description:
      "Our smart services offer peace of mind, ensuring loved ones' safety and care, even from afar.",
  },
  {
    title: "Dedication to Customer Support",
    description:
      "We prioritize customer satisfaction, offering personalized assistance to ensure every need is met.",
  },
];
const page = () => {
  return (
    <div className=" flex  flex-col gap-10 sm:gap-5 bg-white py-5 mx-6 sm:mx-2">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl font-semibold">About Seenyor</h2>
        <p className="text-[#6C7482] pt-3 pb-16">
          We are dedicated to enhancing the quality of life for seniors through
          innovative smart devices designed to provide safety, security, and
          peace of mind. Learn more about who we are, our mission, and the
          services we offer.
        </p>
        <div className="flex justify-center items-center sm:flex-col gap-5">
          <div className="bg-[#F1F8F5] p-6">
            <p className="text-[#7F87FC] font-semibold">our goal!</p>
            <p>
              We are dedicated to enhancing the quality of life for seniors
              through innovative smart devices designed to provide safety,
              security, and peace of mind. Learn more about who we are, our
              mission, and the services we offer.
            </p>
          </div>
          <div className="bg-[#FEF6E6] p-6">
            <p className="text-[#F0A905] font-semibold">Our Story!</p>
            <p>
              We are dedicated to enhancing the quality of life for seniors
              through innovative smart devices designed to provide safety,
              security, and peace of mind. Learn more about who we are, our
              mission, and the services we offer.
            </p>
          </div>
        </div>

        {/* what we do section */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-2">
            <h2 className="text-3xl font-bold my-4">What We Do</h2>
            <p className="text-gray-600 pb-12">
              At Seniyor, We Specialize in Providing Cutting-Edge Tech Services
              Tailored For Elderly Care. Our Range Of Products Include:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-1 gap-3">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg  p-3">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-center">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#7F87FC] py-16 px-8">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Why Choose Us
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-1 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 border border-white rounded-xl p-3"
                >
                  <CheckCircle className="w-6 h-6 text-white shrink-0 mt-1" />
                  <p className="text-indigo-100">
                    <span className="font-semibold text-white">
                      {" "}
                      {feature.title}:
                    </span>{" "}
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <div className="max-w-7xl my-0 w-full mx-auto rounded-xl  md:p-5 sm:p-2 bg-[#2C3142] flex justify-between items-center px-8 py-6 sm:text-sm sm:px-4 sm:py-3">
        <p className="text-white">
          Your Journey to Safety and Peace of Mind Begins Here
        </p>
        <Link href="/systembuilder">
          <button className="bg-[#7F87FC] min-w-24 text-white font-semibold px-2 sm:px-1 py-2 sm:text-xs rounded">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default page;
