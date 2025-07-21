import { Img } from "..";

function PaymentImg() {
  return (
    <div className="mt-[1.88rem] flex justify-center items-center">
      <div  className="container-xs flex md:px-[1.25rem">
      <Img
        src="img_group_1.svg"
        width={156}
        height={32}
        alt="success"
        className="h-[2.00rem] w-[12%] object-contain"
      />
      </div>
    
    </div>
  );
}

export default PaymentImg;
