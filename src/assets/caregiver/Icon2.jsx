import * as React from "react";
const Icon2 = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={80}
    height={80}
    fill="none"
    {...props}
  >
    <rect width={80} height={80} fill="#F48C06" rx={20} />
    <path fill="url(#a)" d="M12 14h52v52H12z" />
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
export default Icon2;
2;
