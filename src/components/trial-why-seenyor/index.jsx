import { FaPersonFalling } from "react-icons/fa6";
import { BsCameraVideoOffFill } from "react-icons/bs";
import { FaHeartPulse } from "react-icons/fa6";
import { PiPhoneCallFill } from "react-icons/pi";
import { MdAddHome } from "react-icons/md";
import { MdAppSettingsAlt } from "react-icons/md";

export default function TrialWhySeenyor() {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
                    Why Choose <span className="text-blue-500">Seenyor?</span>
                </h1>

                <div className="grid grid-cols-3 gap-8 mt-8 md:grid-cols-1 ">
                    <div className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl dark:bg-gray-800">
                        <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
                            <FaPersonFalling size={25} /> 
                       
                        </span>
                        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Fall Detection with Instant Alerts</h1>
                    </div>
                     <div className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl dark:bg-gray-800">
                        <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
                            <BsCameraVideoOffFill size={25} />
                        </span>
                        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">No Wearables, No Cameras</h1>
                    </div>
                     <div className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl dark:bg-gray-800">
                        <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
                          <FaHeartPulse  size={25}/>
                        </span>
                        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Heart & Breathing Monitoring While Sleeping</h1>
                    </div>
                     <div className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl dark:bg-gray-800">
                        <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
                           <PiPhoneCallFill size={25} />
                        </span>
                        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Two-Way Voice Communication</h1>
                    </div>
                       <div className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl dark:bg-gray-800">
                        <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
                          <MdAddHome size={25}/>
                        </span>
                        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">3-Day Free In-Home Trial</h1>
                    </div>
                       <div className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl dark:bg-gray-800">
                        <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
                           <MdAppSettingsAlt size={25} />
                        </span>
                        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Easy Install – Just Mount & Connect</h1>
                    </div>
                </div>
            </div>
        </section>
    );
}    
