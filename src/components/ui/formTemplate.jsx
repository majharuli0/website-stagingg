"use client";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { Button } from "..";
import LogoIcon from "../Logo/icon";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
export default function AuthFormTemplate({
  title,
  description,
  logo,
  children,
  backButtonText = "Back",
  backRoute,
  onBack,
  isBack = true,
  maxwidth = "500px",
}) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backRoute) {
      router.push(backRoute);
    } else {
      router.back();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 tab:px-3 overflow-hidden bg-gradient-to-br from-white to-gray-50 py-10">
      <div
        style={{ maxWidth: maxwidth }}
        className={` w-full overflow-hidden bg-white flex flex-col items-center rounded-lg shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]`}
      >
        <div className="p-8 tab:px-4 pb-0 w-full flex flex-col items-center ">
          <Link href="/" className="mb-2 hover:scale-95 transition-all ">
            <LogoIcon />
          </Link>
          {title && (
            <h1 className="text-2xl font-bold text-text my-2 text-center">
              {title}
            </h1>
          )}

          {description && (
            <p className="text-gray-500 text-center mb-8">{description}</p>
          )}
        </div>

        <div className="w-full p-8 tab:px-4">{children}</div>

        <div
          className={`bg-[#f0f0f081] w-full flex items-center py-3 px-[1rem] justify-center mt-2`}
          style={{ justifyContent: isBack ? "space-between" : "center" }}
        >
          {isBack && (
            <p
              onClick={handleBack}
              className="rounded-md  font-semibold hover:text-text flex items-center gap-2 text-gray-500 cursor-pointer group"
            >
              <ChevronLeft className="transition-transform duration-200 group-hover:-translate-x-1" />
              {backButtonText}
            </p>
          )}

          <p className="flex  gap-2 text-gray-500 items-center w-fit">
            <Link
              target="blank"
              href="/privacy-policy"
              className="hover:text-text"
            >
              Privacy
            </Link>
            <div className="dot size-1 bg-gray-500 rounded-full"></div>
            <Link
              target="blank"
              href="/terms-and-conditions"
              className="hover:text-text"
            >
              Terms
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

AuthFormTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  logo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node.isRequired,
  backButtonText: PropTypes.string,
  backRoute: PropTypes.string,
  onBack: PropTypes.func,
};
