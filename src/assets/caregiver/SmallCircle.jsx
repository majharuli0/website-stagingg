import * as React from "react";
const SmallCircle = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={41}
    height={41}
    fill="none"
    {...props}
  >
    <circle cx={20.5} cy={20.5} r={20.5} fill="#fff" fillOpacity={0.5} />
  </svg>
);
export default SmallCircle;
