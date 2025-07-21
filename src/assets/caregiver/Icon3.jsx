import * as React from "react";
const Icon3 = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={81}
    height={80}
    fill="none"
    {...props}
  >
    <rect width={80} height={80} x={0.333} fill="#29B9E7" rx={20} />
    <path fill="url(#a)" d="M15 16h50v50H15z" />
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
export default Icon3;
