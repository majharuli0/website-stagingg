
export default function Test() {
  return ( <>
      <div className="w-full h-[100dvh] bg-center bg-cover  relative  ">
        

<video className='absolute top-0 left-0 h-full w-full object-cover'
 autoPlay
  muted
   loop
    source
     src={'/trial.mp4'} 
     type='trial.mp4' />

        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background: "rgba(0,0,0,0.4)"
          }}
        ></div>
        <div className="flex items-center justify-center w-full h-full absolute top-0 left-0">
          <div className="text-center z-10 w-full">
            <h1 className="text-3xl font-semibold text-white lg:text-4xl">
              Protect <span className="text-yellow-500"> Mum or Dad</span> Without Wearables or Cameras
            </h1>
            <h3 className="text-color_white-a700">
              Seenyor detects falls, breathing issues, and more — and alerts you instantly
            </h3>
            <button className="w-fit px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
             <a href="https://tidycal.com/m4x5jv3/30-minute-meeting"> Book Free Trial Now</a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}