import Image from "next/image";

export default function Shop() {
  return (
    <div className="bg-black">
      <div className="fade-in flex justify-center items-center h-screen w-screen">
        <div className="relative h-[27vw] w-screen">
          {/* background */}
          <Image
            src="/bg.png"
            layout="fill"
            objectFit="cover"
            alt="background"
          />
          <div className="bg-opacity-50 bg-black h-full w-full flex justify-center items-center">
            <div className="text-white">
              <div className="flex justify-center items-center">
                {/* Logo begins here*/}
                <div className="relative top-[-3vw] h-[20vw] w-[35vw]">
                  <Image
                    src="/eraverse_logo.png"
                    layout="fill"
                    objectFit="cover"
                    alt="eraverseLogo"
                  />
                </div>
                {/* Logo ends here */}
              </div>

              {/* Text begins here */}
              <p
                data-testid="text_1"
                className="relative m-0 top-[-4.5vw] text-4xl text-white text-center font-medium"
              >
                ERAVERSE [LIMITED] APPAREL AND
                <br /> COLLECTIBLES.
              </p>
              <p
                data-testid="text_2"
                className="relative top-[-4vw] text-white text-center text-sm "
              >
                COMING SOON
              </p>
              {/* Text ends here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
