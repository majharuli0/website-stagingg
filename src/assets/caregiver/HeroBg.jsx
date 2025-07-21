import * as React from "react";

const HeroBg = (props) => (
  <div className="w-full h-auto overflow-hidden">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1920 1118"
      preserveAspectRatio="xMidYMid slice"
      className="w-full"
      {...props}
    >
      <path fill="#E8F4FA" d="M0 0h1920v990s-302 128-960 128S0 990 0 990V0Z" />
    </svg>
  </div>
);

export default HeroBg;
