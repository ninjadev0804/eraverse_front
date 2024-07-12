import { useState } from "react";

import Discord_d_glow from "../../assets/GlowingSVG/discord_d_glow.svg";
import X_d_glow from "../../assets/GlowingSVG/x_d_glow.svg";
import Instagram_d_glow from "../../assets/GlowingSVG/instagram_d_glow.svg";
import Mirror_d_glow from "../../assets/GlowingSVG/mirror_d_glow.svg";
import Mirror_d from "../../assets/svg/mirror_d.svg";
import Discord_d from "../../assets/svg/discord_d.svg";
import X_d from "../../assets/svg/x_d.svg";
import Instagram_d from "../../assets/svg/instagram_d.svg";

export default function IconSymbol({ src }: any) {
  const [isHovered, setIsHovered] = useState(false);

  let SvgComponent = Discord_d;
  let SvgComponent_glow = Discord_d_glow;
  switch (src) {
    case `Discord_icon`:
      SvgComponent = Discord_d;
      SvgComponent_glow = Discord_d_glow;
      break;
    case "Instagram_icon":
      SvgComponent = Instagram_d;
      SvgComponent_glow = Instagram_d_glow;
      break;
    case "X_icon":
      SvgComponent = X_d;
      SvgComponent_glow = X_d_glow;
      break;
    case "Mirror_icon":
      SvgComponent = Mirror_d;
      SvgComponent_glow = Mirror_d_glow;
      break;
  }

  return (
    <div
      data-testid="icon-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={` cursor-pointer flex justify-enter items-center w-[54px] h-[48px]  border-[1px] border-[#4E4E4E] border-solid rounded-md transition-opacity duration-300 ease-in-out drop-shadow-[0_30px_30px_rgb(0,0,0)]`}
    >
      {isHovered ? (
        <div data-testid="glow-svg" className={`px-[1.5px]`}>
          <SvgComponent_glow />
        </div>
      ) : (
        <div data-testid="svg" className={` px-[16.5px]`}>
          <SvgComponent />
        </div>
      )}
    </div>
  );
}
