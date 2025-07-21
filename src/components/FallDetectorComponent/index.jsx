"use client";
import { useCart } from "../../context/CartContext";
import { Heading, Img, Input } from "./..";

export default function FallDetectorProfile({
  id,
  fallDetectorImage = "img_fall_detector_2.png",
  fallDetectorTitle = "Fall Detector",
  fallDetectorDescription = "Ensure peace of mind for you and your loved ones with advanced fall detection technology. Receive instant alerts in case of a fall emergency.",
  price = 250,
  decrementButton = "-",
  incrementButton = "+",
  packageDescription = "has 2x from basic package",
  ...props
}) {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

  // Find the item in the cart
  const cartItem = cart.find(item => item.id === id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleIncrement = () => {
    if (cartItem) {
      updateQuantity(id, quantity + 1);
    } else {
      addToCart({
        id,
        name: fallDetectorTitle,
        price,
        image: fallDetectorImage,
        quantity: 1
      });
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else if (quantity === 1) {
      removeFromCart(id);
    }
  };

  return (
    <div
      {...props}
      className={`${props.className} flex tab:flex-col items-center p-[2.13rem] sm:p-[1.25rem] bg-gray-100_01 flex-1 rounded-[24px] container-xs`}
    >
      {/* Image Section */}
      <div className="flex flex-1 items-center gap-[1.75rem] tab:flex-col tab:self-stretch">
        <Img
          src={fallDetectorImage}
          width={130}
          height={184}
          alt="Fall Detector 2"
          className="h-[11.50rem] w-[14%] object-contain tab:w-full"
        />
        <div className="flex flex-1 flex-col items-start gap-[0.38rem] tab:self-stretch">
          <Heading size="headingxl" as="h5" className="text-[1.38rem] font-semibold capitalize text-text">
            {fallDetectorTitle}
          </Heading>
          <Heading as="p" className="w-[76%] text-[1.00rem] font-normal leading-[1.50rem] text-body tab:w-full">
            {fallDetectorDescription}
          </Heading>
        </div>
      </div>

      {/* Price and Quantity Section */}
      <div className="flex w-[28%] flex-col items-end gap-[1.25rem] tab:w-full">
        <Heading
          size="heading4xl"
          as="h3"
          className="text-[1.75rem] font-bold lowercase text-text tab:text-[1.63rem] sm:text-[1.50rem]"
        >
          ${price}
        </Heading>
        <div className="flex flex-col items-end gap-[0.38rem] self-stretch">
          <div className="flex w-[38%] justify-end tab:justify-center rounded-lg border border-solid border-primary tab:w-full">
            {/* Decrement Button */}
            <div
              onClick={handleDecrement}
              className="flex w-[2.75rem] cursor-pointer flex-col items-center justify-center rounded-bl-lg rounded-tl-lg bg-new_p_shade-new_p_shade_50"
            >
              <Heading size="headingmd" as="h6" className="text-[1.13rem] font-bold text-primary">
                {decrementButton}
              </Heading>
            </div>

            {/* Quantity Input */}
            <Input
              color="primary"
              size="md"
              shape="square"
              name="Frame 1261153928"
              placeholder={`00`}
              type="number"
              step="1"
              min="0"
              value={quantity}
              onChange={(e) => {
                const newQuantity = e.target.valueAsNumber;
                if (newQuantity === 0) {
                  removeFromCart(id);
                } else {
                  updateQuantity(id, newQuantity);
                }
              }}
              className="w-[3.13rem] !border px-[0.63rem] font-medium"
            />

            {/* Increment Button */}
            <div
              onClick={handleIncrement}
              className="flex w-[2.75rem] cursor-pointer flex-col items-center justify-center rounded-br-lg rounded-tr-lg bg-new_p_shade-new_p_shade_50"
            >
              <Heading size="headingmd" as="h6" className="text-[1.13rem] font-bold text-primary">
                {incrementButton}
              </Heading>
            </div>
          </div>

          {/* Package Description */}
          <Heading
            size="textmd"
            as="p"
            className="text-[0.88rem] font-normal capitalize italic text-body"
          >
            {packageDescription}
          </Heading>
        </div>
      </div>
    </div>
  );
}