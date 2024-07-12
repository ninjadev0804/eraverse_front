"use client";
import { usePathname } from "next/navigation";
import Button from "@/components/button";
import ButtonSec from "@/components/buttonsec";
import Icon from "@/components/icon";
import SquareButton from "@/components/squarebutton";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/svg/Home_bg.svg";

export default function Home() {
  const pathname = usePathname();
  return (
    <div className="bg-black">
      <div className="fade-in flex justify-center items-center w-full h-[100vh]">
        <div className="relative w-[500px] h-[500px]">
          <Image src={"/Home_bg.svg"} alt="eraverseLogo" fill={true} />
        </div>
        <div className="fixed w-full h-full screen_hidden text-white">
          <div className="flex flex-col justify-center mt-[80px] h-full text-center text-[14px]">
            era[verse] is currently a desktop-only site.
          </div>
        </div>
      </div>
    </div>
  );
}
