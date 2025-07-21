import * as React from "react";
const Icon1 = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={81}
    height={81}
    fill="none"
    {...props}
  >
    <rect width={80} height={80} x={0.667} y={0.5} fill="#02C846" rx={20} />
    <path fill="url(#a)" d="M18 21h46v46H18z" />
    <defs>
      <pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#b" transform="scale(.01563)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="b"
        width={64}
        height={64}
      />
    </defs>
  </svg>
);
export default Icon1;
