import Image from "next/image";
import Link from "next/link";

//import Components below
import Icon from "@/components/icon/index";
import Button from "@/components/button";
import SquareButton from "@/components/squarebutton";

export default function Community() {
  return (
    <div className="bg-black">
      <div className="flex justify-center items-center w-full h-[100vh] fade-in">
        <div className="relative w-[600px] h-[400px]">
          <Image
            src="/eraverse_community_station.png"
            fill={true}
            alt="community"
          />
        </div>

        {/* <div className="relative left-[-17vw]">
          <p className="text-white text-[50px]"> station</p>
        </div> */}
      </div>
    </div>
  );
}
