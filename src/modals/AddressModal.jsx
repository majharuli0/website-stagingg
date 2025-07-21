import { Button, Heading, Input } from "@/components";
import { useUserService } from "@/services/userService";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify"; // Import toast
import "./style.css";

const SelectBox = forwardRef(
  ({ name, placeholder, options = [], onChange, className, ...rest }, ref) => (
    <select
      ref={ref}
      name={name}
      onChange={onChange}
      className={className}
      {...rest}
    >
      <option value="">{placeholder}</option>
      {Array.isArray(options) &&
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  )
);

SelectBox.displayName = "SelectBox";

const AddressModal = ({ isOpen, onChange, address }) => {
  const { register, handleSubmit, reset } = useForm();
  const { getCountries, updateUserInfo } = useUserService(); // Import userUpdate
  const [countries, setCountries] = useState([]);

  // // Fetch countries when the modal opens
  // useEffect(() => {
  //   const fetchCountries = async () => {
  //     try {
  //       const response = await getCountries();
  //       if (response && response.data) {
  //         const formattedCountries = response.data.map((country) => ({
  //           label: country.country_name,
  //           value: country._id,
  //         }));
  //         setCountries(formattedCountries);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching countries:", error);
  //     }
  //   };

  //   if (isOpen) {
  //     fetchCountries(); // Fetch countries only when the modal is open
  //   }
  // }, [isOpen]); // Depend on isOpen to avoid unnecessary calls

  // Reset form with address data when modal opens
  useEffect(() => {
    if (isOpen) {
      reset({
        address1: address?.address || "",
        address2: address?.address2 || "",
        city: address?.city || "",
        // country: address?.country_id || "",
        phoneNumber: address?.contact_number || "",
      });
    }
  }, [isOpen, address, reset]); // Depend on isOpen and address

  const onSubmit = async (data) => {
    try {
      const userId = address?._id;
      await updateUserInfo(userId, {
        address: data.address1,
        address2: data.address2,
        city: data.city,
        // country_id: data.country,
        contact_number: data.phoneNumber,
      });
      toast.success("Address updated successfully!");
      onChange(false); // Close the modal
    } catch (error) {
      toast.error("Failed to update address. Please try again."); // Show error toast
    }
  };

  return (
    <div className="flex items-center">
      <Dialog.Root open={isOpen} onOpenChange={onChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent !max-w-[600px] !md:w-[360px] overflow-auto">
            <Dialog.Title className="DialogTitle"></Dialog.Title>
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
                    {...register("address1")} // Register input with react-hook-form
                    className="rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
                  />
                </div>
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
                    {...register("address2")} // Register input with react-hook-form
                    className="self-stretch rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
                  />
                </div>
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
                    {...register("city")} // Register input with react-hook-form
                    className="self-stretch rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
                  />
                </div>
                {/* <div className="flex flex-col items-start gap-[0.38rem] mb-4">
                  <Heading
                    size="headingmd"
                    as="h6"
                    className="text-[1.13rem] font-semibold capitalize text-text"
                  >
                    Country
                  </Heading>
                  <SelectBox
                    name="country"
                    placeholder="Select Country"
                    options={countries} // Use the countries fetched from the API
                    {...register("country")} // Register input with react-hook-form
                    className="w-full rounded-[12px] !border border-solid border-gray-200 px-[1.63rem] capitalize !text-text sm:px-[1.25rem] h-[3.75rem] bg-white"
                  />
                </div> */}
                <div className="flex flex-col items-start gap-[0.38rem] mb-4">
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
                    type="text"
                    {...register("phoneNumber")} // Register input with react-hook-form
                    className="self-stretch rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
                  />
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <Button
                    color="green_200_green_400_01"
                    shape="round"
                    className="w-full rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem]"
                    type="submit" // Submit the form
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
