import Image from "next/image";

export default function ButtonMint({ title }: any) {
  return (
    <div
      data-testid="mintButton-wrapper"
      className="cursor-pointer flex justify-enter items-center h-full px-[19.5px] border-[1px] border-white border-solid bg-white rounded-lg"
    >
      <p className="text-[14px] text-[#222] font-medium">{title}</p>
    </div>
  );
}
