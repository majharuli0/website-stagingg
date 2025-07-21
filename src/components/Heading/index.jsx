"use client"
// Define various text sizes and font styles
const sizes = {
  textxs: "text-[0.63rem] font-medium",
  texts: "text-[0.75rem] font-medium",
  textmd: "text-[0.81rem] font-medium",
  textlg: "text-[0.88rem] font-medium",
  text3xl: "text-[1.25rem] font-medium",
  text4xl: "text-[1.50rem] font-medium md:text-[1.38rem]",
  text6xl: "text-[1.75rem] font-medium md:text-[1.63rem] sm:text-[1.50rem]",
  headingxs: "text-[0.88rem] font-semibold",
  headings: "text-[1.00rem] font-semibold",
  headingmd: "text-[1.13rem] font-semibold",
  headinglg: "text-[1.25rem] font-bold xss:text-[0.80rem]",
  headingxl: "text-[1.38rem] font-semibold",
  heading2xl: "text-[1.44rem] font-bold md:text-[1.31rem]",
  heading3xl: "text-[1.50rem] font-semibold md:text-[1.38rem]",
  heading4xl: "text-[1.75rem] font-bold md:text-[1.63rem] sm:text-[1.50rem]",
  heading5xl: "text-[1.88rem] font-semibold md:text-[1.75rem] sm:text-[1.63rem]",
  heading6xl: "text-[2.00rem] font-bold md:text-[1.88rem] sm:text-[1.30rem]",
  heading7xl: "text-[2.11rem] font-bold md:text-[2.00rem] sm:text-[1.88rem]",
  heading8xl: "text-[2.25rem] font-semibold md:text-[2.13rem] sm:text-[2.00rem]",
  heading9xl: "text-[2.38rem] font-bold md:text-[2.25rem] sm:text-[2.13rem]",
  heading10xl: "text-[3.00rem] font-bold md:text-[2.75rem] sm:text-[2.38rem]",
  heading11xl: "text-[3.25rem] font-extrabold md:text-[2.75rem] sm:text-[2.38rem]",
  bold_11px_cap: "tracking-[0.06rem] uppercase text-[0.81rem] font-semibold",
  semi_bold_16px: "text-[1.00rem] font-medium",
};

// Define the Heading component
const Heading = ({ children, className = "", size = "semi_bold_16px", as, ...restProps }) => {
  // Use the specified heading element or default to h6
  const Component = as || "h6";

  return (
    <Component className={`text-text font-poppins ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };

