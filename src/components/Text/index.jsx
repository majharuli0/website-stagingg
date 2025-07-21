"use client"
// Define text sizes
const sizes = {
  regular_13px: "text-[0.88rem] font-normal not-italic",
  web_body_1: "font-segoeui text-[0.88rem] font-normal",
  text_sm_normal: "font-inter text-[0.88rem] font-normal not-italic",
  textxl: "text-[1.00rem] font-normal not-italic",
  text2xl: "text-[1.13rem] font-normal",
  text5xl: "text-[1.56rem] font-normal not-italic md:text-[1.44rem] sm:text-[1.31rem]",
};

// Text component definition
const Text = ({ 
  children, 
  className = "", 
  as, 
  size = "text2xl", 
  ...restProps 
}) => {
  const Component = as || "p"; // Default to <p> if no 'as' prop is provided
  
  return (
    <Component 
      className={`text-body font-poppins ${className} ${sizes[size]}`} 
      {...restProps}
    >
      {children}
    </Component>
  );
};

// Export the Text component
export { Text };

