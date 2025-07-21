"use client";
import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";

const SelectBox = React.forwardRef(
  (
    {
      size = "xs",
      color = "border",
      shape,
      variant = "outline",
      isSearchable = false,
      isMulti = false,
      indicator,
      className = "",
      options = [],
      children,
      ...restProps
    },
    ref
  ) => {
    const [menuPortalTarget, setMenuPortalTarget] = React.useState(null);

    React.useEffect(() => {
      setMenuPortalTarget(document.body);
    }, []);

    const sizes = {
      xs: "h-[4.00rem] px-[1.63rem] text-[1.13rem]",
    };

    const colors = {
      border: "border-border border border-solid text-text",
    };

    const shapes = {
      round: "rounded-[12px]",
    };

    const variants = {
      outline: {},
    };

    return (
      <>
        <Select
          ref={ref}
          options={options}
          className={`${className} flex ${shape && shapes[shape]} ${size && sizes[size]} ${variant && variants[variant]?.[color]}`}
          isSearchable={isSearchable}
          isMulti={isMulti}
          components={{
            IndicatorSeparator: () => null,
            ...(indicator && { DropdownIndicator: () => indicator }),
          }}
          styles={{
            indicatorsContainer: (provided) => ({
              ...provided,
              padding: 0,
              width: "max-content",
              "& > div": { padding: 0 },
            }),
            container: (provided) => ({
              ...provided,
              zIndex: 0,
              alignItems: "center",
            }),
            control: (provided) => ({
              ...provided,
              backgroundColor: "transparent",
              border: "0 !important",
              boxShadow: "none !important",
              minHeight: "auto",
              width: "100%",
              "&:hover": {
                border: "0 !important",
              },
            }),
            input: (provided) => ({
              ...provided,
              color: "inherit",
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected ? "#70b795" : "transparent",
              color: state.isSelected ? "#ffffff" : "inherit",
              "&:hover": {
                backgroundColor: "#70b795",
                color: "#ffffff",
              },
            }),
            singleValue: (provided) => ({
              ...provided,
              display: "flex",
            }),
            valueContainer: (provided) => ({
              ...provided,
              padding: 0,
              display: "flex",
            }),
            placeholder: (provided) => ({
              ...provided,
              margin: 0,
            }),
            menuPortal: (base) => ({ ...base, zIndex: 999999 }),
            menu: (base) => ({ ...base, minWidth: "max-content", width: "max-content" }),
          }}
          menuPortalTarget={menuPortalTarget}
          closeMenuOnScroll={(event) => event.target.id === "scrollContainer"}
          {...restProps}
        />
        {children}
      </>
    );
  }
);

// Add displayName for better debugging
SelectBox.displayName = "SelectBox";

SelectBox.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array,
  isSearchable: PropTypes.bool,
  isMulti: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  indicator: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["xs"]),
  variant: PropTypes.oneOf(["outline"]),
  color: PropTypes.oneOf(["border"]),
};

export { SelectBox };

