import { Img } from "..";

function index() {
  return (
    <>
      <div className="gap-[2.63rem] ">
        <Img
          src="img_group_1.svg"
          width={156}
          height={32}
          alt="Group 1"
          className="h-[2.00rem] w-[12%] md:w-[80%] object-contain mx-auto"
        />
      </div>
    </>
  );
}

export default index;
