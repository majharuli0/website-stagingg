import { Button, Heading, Input } from "@/components";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { forwardRef } from "react";
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

const AddressModal = ({ isOpen, onChange, }) => {
  

  return (
    <div className="flex items-center">
      <Dialog.Root open={isOpen} onOpenChange={onChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent !max-w-[500px] !md:w-[360px] overflow-auto">
            <Dialog.Title className="DialogTitle"></Dialog.Title>
            <Dialog.Description className="DialogDescription p-2">
              <Heading
                size="text4xl"
                as="h2"
                className="text-[1.50rem] font-medium text-text md:text-[1.38rem] mb-4"
              >
               Add A New E-Mail
              </Heading>

              <form className="flex flex-col gap-[0.88rem]">
                <div className="flex flex-col gap-[0.25rem] mb-4">
                  <Heading
                    size="headingmd"
                    as="h6"
                    className="text-[1.13rem] font-semibold capitalize text-text"
                  >
                    Email
                  </Heading>
                  <Input
                    size="xl"
                    shape="round"
                    type="text"
                    placeholder="Enter Your Email"
                    // {...register("address1")} // Register input with react-hook-form
                    className="rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
                  />
                </div>
                <div className="flex flex-col items-start gap-[0.38rem] mb-4">
                  <Heading
                    size="headingmd"
                    as="h6"
                    className="text-[1.13rem] font-semibold capitalize text-text"
                  >
                    Password
                  </Heading>
                  <Input
                    size="xl"
                    shape="round"
                    type="text"
                    placeholder="Enter Your Password"
                   // Register input with react-hook-form
                    className="self-stretch rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
                  />
                </div>
            
                <div className="flex justify-center gap-4 mt-6">
                  <Button
                    color="green_200_green_400_01"
                    shape="round"
                    className=" rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem]"
                    type="submit" // Submit the form
                  >
                   Add Email Address
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