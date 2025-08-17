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

// Spinner component
const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-current"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    ></path>
  </svg>
);

const Button = ({
  children,
  variant = "gradient",
  size = "xl",
  color = "primary",
  rightIcon,
  shape,
  className = "",
  leftIcon,
  disabled = false,
  loading = false, // New prop
  ...restProps
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      className={`${className} flex flex-row items-center justify-center text-center cursor-pointer whitespace-nowrap 
        ${shape && shapes[shape]} 
        ${size && sizes[size]} 
        ${variant && variants[variant]?.[color]} 
        ${isDisabled ? "opacity-50 !cursor-not-allowed" : ""}`}
      disabled={isDisabled}
      {...restProps}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {!!leftIcon && leftIcon}
          {children}
          {!!rightIcon && rightIcon}
        </>
      )}
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
  disabled: PropTypes.bool,
  loading: PropTypes.bool, // New prop type
};

export { Button };
