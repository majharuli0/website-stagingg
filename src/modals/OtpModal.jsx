"use client";

import { Heading, Text } from "@/components";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./style.css";

import React, { useCallback, useRef, useState } from "react";

const OtpInput = React.memo(({ onChange, onKeyDown, onPaste, inputRef }) => (
  <input
    ref={inputRef}
    type="text"
    inputMode="numeric"
    maxLength={1}
    onChange={onChange}
    onKeyDown={onKeyDown}
    onPaste={onPaste}
    className="w-16 sm:w-[2.5rem] h-16 sm:h-[2.5rem] text-center text-2xl font-semibold text-text border-2 border-solid border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
  />
));
OtpInput.displayName = "OtpInput";

const OtpModal = ({ isOpen, onChange, onVerify, error, setError, email }) => {
  const [isResending, setIsResending] = useState(false);
  // const { email } = useAuth();
  const inputRefs = useRef([]);
  const otpRef = useRef(["", "", "", "", "", ""]);

  const handleChange = useCallback((index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    otpRef.current[index] = value;

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  }, []);

  const handleKeyDown = useCallback((index, e) => {
    if (e.key === "Backspace") {
      if (otpRef.current[index] === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  }, []);

  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    pastedData.forEach((value, index) => {
      if (index < 6 && !isNaN(value)) {
        otpRef.current[index] = value;
        inputRefs.current[index].value = value;
      }
    });
    inputRefs.current[Math.min(5, pastedData.length)].focus();
  }, []);

  const verifyCode = useCallback(() => {
    const code = otpRef.current.join("");
    if (code.length !== 6) {
      setError("Please enter all 6 digits.");
      return;
    }
    onVerify(code);
  }, [onVerify, setError]);

  // const handleResend = useCallback(async () => {
  //   setIsResending(true);
  //   setError(""); // Clear any existing errors
  //   try {
  //     await onResend();
  //   } catch (err) {
  //     setError("Failed to resend OTP. Please try again.");
  //   } finally {
  //     setIsResending(false);
  //   }
  // }, [setError]);

  return (
    <div className="flex items-center">
      <Dialog.Root open={isOpen} onOpenChange={onChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent !max-w-[600px] !md:w-[360px] overflow-auto">
            <Dialog.Title className="DialogTitle">
              <div className="flex flex-col gap-2 w-full md:justify-center items-center">
                <Heading size="heading7xl" as="h2" className="font-bold text-green-200 ">
                  Check your email
                </Heading>
                <Text as="p" className="text-[1.5rem] sm:text-[1rem] font-normal leading-[1.69rem] text-body md:text-center sm:px-2">
                  We&apos;ve emailed a 6-digit code to{" "}
                  <span className="font-medium text-text">{email}</span>. Please use it soon.
                </Text>
              </div>
            </Dialog.Title>
            <Dialog.Description className="DialogDescription p-2">
              <div className="flex flex-col items-center justify-center gap-6 w-full">
                <div className="flex justify-center md:justify-center w-[100%] flex-2 md:w-full gap-4 px-6 py-3.5 sm:px-5">
                  {Array(6)
                    .fill(0)
                    .map((_, index) => (
                      <OtpInput
                        key={index}
                        onChange={(e) => handleChange(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        inputRef={(el) => (inputRefs.current[index] = el)}
                      />
                    ))}
                </div>
                {error && (
                  <Text as="p" className="text-red-500 text-sm">
                    {error}
                  </Text>
                )}
                <button
                  onClick={verifyCode}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Verify Code
                </button>
             
              </div>
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

export default OtpModal;