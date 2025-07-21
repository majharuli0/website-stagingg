import { Button, Heading, Img, Input, Text } from '..'

function index() {
  return (
    <div>
          <div className="flex flex-1 flex-col items-start gap-[2.50rem] self-center md:self-stretch bg-white p-8 rounded-lg ">
            <div className="flex flex-col gap-[1.63rem] self-stretch">
              <div className="flex flex-col items-start border-b border-solid border-border pb-4">
                <Heading
                  size="text5xl"
                  as="h6"
                  className="text-[1.9rem] font-medium text-text md:text-[1.63rem] sm:text-[1.50rem]"
                >
                  Edit Profile
                </Heading>
                <Text as="p" className="mb-[1.90rem] w-full text-[1.25rem] font-normal leading-[1.69rem] text-body">
                  Personalize your profile, Easily update your name and profile picture.
                </Text>
              </div>
              <div className="flex flex-col gap-[1.63rem]">
                <div className="flex flex-col items-start gap-[0.25rem]">
                  <Heading size="headingmd" as="h6" className="text-[1.13rem] font-semibold capitalize text-text">
                    Change Your Profile Image
                  </Heading>
                  <div className="relative h-[6.25rem] content-center self-stretch md:h-auto">
                    <Img
                      src="img_rectangle_4400_100x100.png"
                      width={100}
                      height={100}
                      alt="Rectangle 4400"
                      className="h-[6.25rem] w-[6.25rem] rounded-[50px] object-cover border-2 border-blue-300"
                    />
                    <Img
                      src="img_frame_white.svg"
                      width={30}
                      height={30}
                      alt="Frame"
                      className="absolute bottom-0 left-[6%] top-0 my-auto h-[1.88rem] w-[1.88rem] hover:scale-110 transition-transform duration-200"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start gap-[0.25rem]">
                  <Heading size="headingmd" as="h6" className="text-[1.13rem] font-semibold capitalize text-text">
                    Display Name
                  </Heading>
                  <Input
                    shape="round"
                    name="Label"
                    placeholder={`Kasem Mia`}
                    className="self-stretch rounded-[12px]  capitalize !text-text sm:px-[1.25rem] transition-all duration-200"
                  />
                </div>
              </div>
            </div>
            <Button
              shape="round"
              color="green_200_green_400_01"
              className="min-w-[10.88rem] rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem] hover:bg-green-500 transition-colors duration-200"
            >
              Save Changes
            </Button>
          </div>
        </div>
  )
}

export default index