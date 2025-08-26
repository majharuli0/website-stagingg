import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./style.css";

const Checkbox = ({ checked, onChange, disabled }) => (
  <div
    onClick={onChange}
    className={`flex items-center justify-center !h-6 !w-6 border-2 rounded-md cursor-pointer transition-colors duration-300 ${
      checked ? "bg-primary border-transparent" : "bg-white border-gray-300"
    } ${disabled ? "opacity-80 bg-slate-200" : "opacity-100"}`}
  >
    {checked && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    )}
  </div>
);

const TermsCheckbox = ({ onMainCheckboxChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termChecks, setTermChecks] = useState({
    term1: false,
    term2: false,
    term3: false,
    term4: false,
    term5: false,
    term6: false,
    term7: false,
    term8: false,
    term9: false,
  });
  const allChecked = Object.values(termChecks).every(Boolean);

  const handleTermChange = (term) => {
    const updatedChecks = { ...termChecks, [term]: !termChecks[term] };
    setTermChecks(updatedChecks);
  };
  const handleMainCheckboxClick = () => {
    if (!allChecked) {
      setIsModalOpen(true);
    }
  };
  // Update the parent when the main checkbox is checked/unchecked
  useEffect(() => {
    onMainCheckboxChange(allChecked);
    if (allChecked) {
      setIsModalOpen(false); // Close modal when all checkboxes are checked
    }
  }, [allChecked]);
  const terms = [
    {
      title: "24-Month Commitment",
      description:
        "I understand that by purchasing the Seenyor system, I am committing to a 24-month contract.",
    },
    {
      title: "Early Termination Fee",
      description:
        "I acknowledge that an early termination fee will apply if I cancel before 24 months.",
    },
    {
      title: "Non-Refundable Installation Fee",
      description: "The installation fee is non-refundable once completed.",
    },
    {
      title: "No Refunds After Cooling-Off Period",
      description:
        "I agree to the no-refund policy after the 10-day cooling-off period.",
    },
    {
      title: "Device Installed",
      description:
        "By proceeding with installation and activation of the device, you acknowledge that the statutory cooling-off period no longer applies and you are entering into a binding two-year contract.",
    },
    {
      title: "Liability Disclaimer",
      description:
        "I acknowledge and accept Seenyor’s liability disclaimer, including that the device and services are not substitutes for emergency services.",
    },
    {
      title: "No Integration with Third-Party Systems",
      description:
        "I understand that Seenyor is not responsible for integrating third-party systems.",
    },
    {
      title: "Consent for Data Collection and Use",
      description:
        "I consent to the collection and use of my data as outlined in the Privacy Policy.",
    },
    {
      title: "Terms of Service",
      description: "I have read and agree to the Seenyor Terms of Service.",
    },
  ];

  return (
    <div className="flex items-center">
      <Checkbox
        checked={allChecked}
        disabled={!allChecked}
        onChange={handleMainCheckboxClick}
      />

      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Trigger asChild>
          <label className="ml-2 text-gray-600 cursor-pointer">
            <span className="text-primary underline cursor-pointer">
              I agree
            </span>
            &nbsp; {""}to The Terms and Conditions.
          </label>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent !max-w-[600px] !md:w-[360px] overflow-auto">
            <Dialog.Title className="DialogTitle"></Dialog.Title>
            <Dialog.Description className="DialogDescription p-2">
              <em className="text-lg md:text-base font-semibold opacity-85">
                Before completing your purchase or subscription, please review
                and acknowledge the following terms:
              </em>
              <ul className="list-disc ml-4 mt-5 gap-4 flex flex-col">
                {terms.map((term, idx) => (
                  <li key={idx} className="flex text-[18px] font-medium gap-3">
                    <div className="pt-2">
                      <Checkbox
                        checked={termChecks[`term${idx + 1}`]}
                        onChange={() => handleTermChange(`term${idx + 1}`)}
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <span className="mt-1 font-semibold">{term.title}</span>
                      <span className="text-[16px] font-normal">
                        {term.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </Dialog.Description>
            <Dialog.Close asChild>
              <button className="IconButton cursor-pointer" aria-label="Close">
                <Cross2Icon className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default TermsCheckbox;
