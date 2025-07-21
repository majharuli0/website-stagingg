import PropTypes from "prop-types";

// Define size variants
const sizes = {
  xs: "h-[2.25rem] px-[0.88rem] text-[1.00rem]",
  sm: "h-[2.50rem] px-[0.75rem] text-[1.00rem]",
  md: "h-[2.75rem] px-[2.13rem] text-[1.00rem]",
  lg: "h-[2.75rem] px-[0.88rem]",
  xl: "h-[3.25rem] px-[1.75rem] text-[1.00rem]",
};

// Define color variants for the button styles
const variants = {
  fill: {
    green_300_19: "bg-green-300_19 text-green-300_d8",
  },
  gradient: {
    green_200_green_400_01: "bg-gradient text-white",
  },
  outline: {
    gray_10101: "bg-gray-10101 text-text",
    new_p_shade_new_p_shade_50: "bg-new_p_shade-new_p_shade_50 text-primary",
    primary: "bg-primary text-white",
    light_green_A700_light_green_900_01:
      "border-[3px] border-solid light_green_A700_light_green_900_01_border",
    body: "border-body border border-solid text-text",
  },
};

// Define shape variants for the button
const shapes = {
  circle: "rounded-full",
  round: "rounded-[14px]",
};

const Button = ({
  children,
  variant = "gradient", // Default variant is "gradient"
  size = "xl", // Default size is "xl"
  color = "primary", // Default color is "primary"
  rightIcon,
  shape,
  className = "",
  leftIcon,
  disabled = false, // Default disabled state is false
  ...restProps
}) => {
  return (
    <button
      className={`${className}  flex flex-row items-center justify-center text-center cursor-pointer whitespace-nowrap 
        ${shape && shapes[shape]} 
        ${size && sizes[size]} 
        ${variant && variants[variant]?.[color]} 
        ${disabled ? "opacity-50 !cursor-not-allowed" : ""}`} // Add disabled styles
      disabled={disabled} // Set the disabled property
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

// Define prop types for better validation and documentation
Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["circle", "round"]),
  size: PropTypes.oneOf(["lg", "md", "sm", "xs", "xl"]),
  variant: PropTypes.oneOf(["fill", "outline", "gradient"]),
  color: PropTypes.oneOf([
    "green_300_19",
    "gray_10101",
    "new_p_shade_new_p_shade_50",
    "primary",
    "light_green_A700_light_green_900_01",
    "body",
    "green_200_green_400_01",
  ]),
  disabled: PropTypes.bool, // Add disabled prop type
};

export { Button };
