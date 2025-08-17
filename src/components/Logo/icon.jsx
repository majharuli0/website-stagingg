import { Img } from "..";

function LogoIcon() {
  return (
    <>
      <div className="gap-[2.63rem] ">
        <Img
          src="logo-icon.svg"
          width={156}
          height={32}
          alt="Group 1"
          className="h-12 md:h-10 w-fit object-contain mx-auto"
        />
      </div>
    </>
  );
}

export default LogoIcon;
