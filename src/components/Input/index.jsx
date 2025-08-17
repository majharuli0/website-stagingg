"use client";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // using lucide-react icons

// Define shape variants
const shapes = {
  square: "rounded-[0px]",
  round: "rounded-[10px]",
};

// Define variant styles
const variants = {
  fill: {
    white: "bg-white shadow-2xl text-gray-900_7f",
    gray_100_01: "bg-gray-100_01 text-text",
  },
  outline: {
    primary: "border-primary border border-solid text-text",
    border: "border-border border border-solid text-border",
  },
};

// Define size variants
const sizes = {
  xs: "h-[1.13rem] px-[0.75rem] text-[0.88rem]",
  sm: "h-[1.88rem] px-[0.75rem] text-[1.13rem]",
  md: "h-[2.25rem] px-[0.63rem] text-[0.88rem]",
  lg: "h-[3.13rem] px-[0.75rem] text-[1.25rem]",
  xl: "h-[3.38rem] px-[0.88rem] text-[1.00rem]",
  "2xl": "h-[3.75rem] px-[1.63rem] text-[1.13rem]",
  "3xl": "h-[3.75rem] px-[1.63rem]",
  "4xl": "h-[4.38rem] px-[1.25rem] text-[1.25rem]",
};

const Input = React.forwardRef(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      label = "",
      prefix,
      suffix,
      onChange,
      disabled,
      shape,
      dateLimition,
      variant = "outline",
      size = "2xl",
      color = "border",
      ...restProps
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    // Add this function to get tomorrow's date in YYYY-MM-DD format
    const getTomorrowDate = (days) => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + days);
      return tomorrow.toLocaleDateString("en-CA");
    };

    const isPasswordType = type === "password";

    return (
      <label
        style={{ backgroundColor: disabled ? "#e2e6e6" : "white" }}
        className={`${className} flex items-center justify-between cursor-text
          ${shape && shapes[shape]} 
          ${variant && (variants[variant]?.[color] || variants[variant])} 
          ${size && sizes[size]}`}
      >
        {!!label && label}
        {!!prefix && prefix}
        <input
          ref={ref}
          type={isPasswordType ? (showPassword ? "text" : "password") : type}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
          className={`${
            type === "date" ? "!uppercase" : ""
          } flex-1 bg-transparent outline-none`}
          min={type === "date" ? getTomorrowDate(1) : undefined}
          {...restProps}
        />
        {isPasswordType && (
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="cursor-pointer ml-2"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        )}
        {!!suffix && suffix}
      </label>
    );
  }
);

Input.displayName = "Input";

// Define prop types for better validation and documentation
Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  shape: PropTypes.oneOf(["square", "round"]),
  size: PropTypes.oneOf(["xs", "xl", "4xl", "sm", "3xl", "lg", "md", "2xl"]),
  variant: PropTypes.oneOf(["fill", "outline"]),
  color: PropTypes.oneOf(["white", "gray_100_01", "primary", "border"]),
};

export { Input };
