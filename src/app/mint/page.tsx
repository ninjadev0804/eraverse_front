"use client";
import Image from "next/image";

export default function Mint() {
  return (
    <div className="">
      <div className="h-[100vh] flex items-center justify-center w-[100%] fade-in">
        <div className="relative h-[52vh] w-[50vh] blur-[10px]">
          <Image
            src="/IMG_0704.gif"
            fill={true}
            alt="nft"
            className="rounded-lg "
          />
        </div>
      </div>
    </div>
  );
}
