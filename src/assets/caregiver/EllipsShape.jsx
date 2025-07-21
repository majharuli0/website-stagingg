import * as React from "react";
const EllipsShape = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={176}
    height={271}
    fill="none"
    {...props}
  >
    <circle cx={132} cy={139} r={131.5} stroke="#fff" strokeOpacity={0.5} />
    <circle cx={140} cy={132} r={131.5} stroke="#fff" strokeOpacity={0.5} />
  </svg>
);
export default EllipsShape;
