// SVG
import Logo from "../../assets/svg/Logo.svg";
import BackArrow from "../../assets/svg/BackArrow.svg";

export default function SquareButton({ src }: any) {
  let SvgComponent;
  switch (src) {
    case `Logo`:
      SvgComponent = Logo;
      break;
    case "BackArrow":
      SvgComponent = BackArrow;
      break;
  }

  return (
    <div className="flex flex-col justify-center text-center bg-[#3E3E3E] rounded-lg w-[60px] h-[60px]">
      <div data-testid="square-button" className="flex justify-center">
        <SvgComponent />
      </div>
    </div>
  );
}
