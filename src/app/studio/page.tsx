import Button from "@/components/button";
import Icon from "@/components/icon";
import SquareButton from "@/components/squarebutton";
import Image from "next/image";
import Link from "next/link";

export default function Studio() {
  return (
    <div className="bg-black">
      <div className="flex justify-center items-center w-full h-[100vh] fade-in">
        <div className="flex gap-4">
          {/* <div className="text-[#DADADA] text-center text-[50px] font-medium font-NEO studio_shadow">studio</div>
          <div className="text-[#DADADA] text-center text-[50px] font-medium">coming soon</div> */}
          <div className="relative w-[700px] h-[500px]">
            <Image src="/eraverse_studio.png" fill={true} alt="studio" />
          </div>
        </div>
      </div>
    </div>
  );
}
