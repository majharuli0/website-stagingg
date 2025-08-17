import { Button, Heading, Input } from "@/components";
import { useUserService } from "@/services/userService";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "./style.css";
import { updateAddressSchema } from "../../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/context/AuthContext";

const SelectBox = forwardRef(
  (
    {
      name,
      placeholder,
      options = [],
      onChange,
      className,
      defaultValue,
      ...rest
    },
    ref
  ) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue);

    useEffect(() => {
      setSelectedValue(defaultValue);
    }, [defaultValue]);

    const handleChange = (e) => {
      const value = e.target.value;
      setSelectedValue(value);
      onChange(e);
    };

    return (
      <select
        key={ref}
        ref={ref}
        name={name}
        onChange={handleChange}
        className={className}
        value={selectedValue}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {Array.isArray(options) &&
          options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    );
  }
);
SelectBox.displayName = "SelectBox";

const AddressModal = ({ isOpen, onChange, address, countryData }) => {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateAddressSchema),
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      address: "",
      address2: "",
      city: "",
      contact_number: "",
      contact_code: "",
    },
  });

  const { updateUserInfo } = useUserService();
  const { fetchUserDetails } = useAuth();

  const [countriesForCode, setCountriesForCode] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    const formattedCountriesCode = countryData.map((country, ind) => ({
      id: ind,
      label: country.country_name,
      value: country.country_code,
    }));
    setCountriesForCode(formattedCountriesCode);
  }, [countryData, isOpen]);

  useEffect(() => {
    if (isOpen && address) {
      const matchedCountry = countriesForCode?.find(
        (c) => c.value === address?.contact_code
      );
      const formData = {
        address: address?.address || "",
        address2: address?.address2 || "",
        city: address?.city || "",
        contact_number: address?.contact_number || "",
        contact_code: matchedCountry?.id + "_" + matchedCountry?.value || "",
      };
      reset(formData);
      setInitialValues(formData);
    }
  }, [isOpen, address, reset, countriesForCode]);

  const currentValues = watch();
  // Compare without lodash: stringify both objects
  const hasChanges =
    JSON.stringify(currentValues) !== JSON.stringify(initialValues);

  const onSubmit = async (data) => {
    if (!hasChanges) return;
    setLoading(true);
    try {
      const payload = {
        ...data,
        contact_code: data.contact_code.split("_")[1],
      };
      await updateUserInfo(address?._id, payload);
      toast.success("Address updated successfully!");
      fetchUserDetails();
      onChange(false);
    } catch (error) {
      console.error("Failed to update address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center">
      <Dialog.Root open={isOpen} onOpenChange={onChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent !max-w-[600px] !md:w-[360px] overflow-auto">
            <Dialog.Description className="DialogDescription p-2">
              <Heading
                size="text4xl"
                as="h2"
                className="text-[1.50rem] font-medium text-text md:text-[1.38rem] mb-4"
              >
                Change Address
              </Heading>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-[0.88rem]"
              >
                {/* Address 1 */}
                <div className="flex flex-col gap-[0.25rem] mb-4">
                  <Heading
                    size="headingmd"
                    as="h6"
                    className="text-[1.13rem] font-semibold capitalize text-text"
                  >
                    Address 1
                  </Heading>
                  <Input
                    size="xl"
                    shape="round"
                    type="text"
                    {...register("address")}
                    className="rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
                  />
                  {errors.address && (
                    <span className="text-red-500 text-sm">
                      {errors.address.message}
                    </span>
                  )}
                </div>

                {/* Address 2 */}
                <div className="flex flex-col items-start gap-[0.38rem] mb-4">
                  <Heading
                    size="headingmd"
                    as="h6"
                    className="text-[1.13rem] font-semibold capitalize text-text"
                  >
                    Address 2
                  </Heading>
                  <Input
                    size="xl"
                    shape="round"
                    type="text"
                    {...register("address2")}
                    className="self-stretch rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
                  />
                  {errors.address2 && (
                    <span className="text-red-500 text-sm">
                      {errors.address2.message}
                    </span>
                  )}
                </div>

                {/* City */}
                <div className="flex flex-col items-start gap-[0.38rem] mb-4">
                  <Heading
                    size="headingmd"
                    as="h6"
                    className="text-[1.13rem] font-semibold capitalize text-text"
                  >
                    City
                  </Heading>
                  <Input
                    size="xl"
                    shape="round"
                    type="text"
                    {...register("city")}
                    className="self-stretch rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
                  />
                  {errors.city && (
                    <span className="text-red-500 text-sm">
                      {errors.city.message}
                    </span>
                  )}
                </div>

                {/* Phone Number */}
                <div className="flex flex-col items-start gap-[0.38rem] mb-4">
                  <div className="flex items-start gap-2">
                    <div className="w-[45%]">
                      <Heading
                        size="headingmd"
                        as="h6"
                        className="text-[1.13rem] font-semibold capitalize text-text"
                      >
                        Phone Code
                      </Heading>
                      <SelectBox
                        name="contact_code"
                        placeholder="Select Country Code"
                        options={
                          countriesForCode?.length > 0 &&
                          countriesForCode?.map((country) => ({
                            value: country.id + "_" + country.value,
                            label: `${country.label} (${country.value})`,
                          }))
                        }
                        {...register("contact_code")}
                        onChange={(e) => {
                          setValue("contact_code", e.target.value);
                          trigger("contact_code");
                        }}
                        className="rounded-[12px] w-full !border border-solid border-gray-200 px-[1.63rem] capitalize !text-text sm:px-[1.25rem] h-[3.38rem] bg-white"
                      />
                      {errors.contact_code && (
                        <span className="text-red-500 text-sm">
                          {errors.contact_code.message}
                        </span>
                      )}
                    </div>

                    <div className="w-full">
                      <Heading
                        size="headingmd"
                        as="h6"
                        className="text-[1.13rem] font-semibold capitalize text-text"
                      >
                        Phone Number
                      </Heading>
                      <Input
                        size="xl"
                        shape="round"
                        type="number"
                        {...register("contact_number")}
                        className="self-stretch rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem] w-full"
                      />
                      {errors.contact_number && (
                        <span className="text-red-500 text-sm">
                          {errors.contact_number.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Confirm Button */}
                <div className="flex justify-end gap-4 mt-6">
                  <Button
                    loading={loading}
                    disabled={!hasChanges}
                    color="green_200_green_400_01"
                    shape="round"
                    className="w-full rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem]"
                    type="submit"
                  >
                    Confirm
                  </Button>
                </div>
              </form>
            </Dialog.Description>

            <Dialog.Close asChild>
              <button className="IconButton cursor-pointer" aria-label="Close">
                <Cross2Icon className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default AddressModal;
