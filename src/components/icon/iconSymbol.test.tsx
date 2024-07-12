import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import IconSymbol from ".";

// SVG mocks
jest.mock("../../assets/svg/discord_d.svg", () => () => "Discord_d");
jest.mock("../../assets/svg/instagram_d.svg", () => () => "Instagram_d");
jest.mock("../../assets/svg/x_d.svg", () => () => "X_d");
jest.mock("../../assets/svg/mirror_d.svg", () => () => "Mirror_d");
jest.mock(
  "../../assets/GlowingSVG/discord_d_glow.svg",
  () => () => "Discord_d_glow"
);
jest.mock(
  "../../assets/GlowingSVG/instagram_d_glow.svg",
  () => () => "Instagram_d_glow"
);
jest.mock("../../assets/GlowingSVG/x_d_glow.svg", () => () => "X_d_glow");
jest.mock(
  "../../assets/GlowingSVG/mirror_d_glow.svg",
  () => () => "Mirror_d_glow"
);

describe(`Displays icon for the "CommunityPage" `, () => {
  it("renders correct SVG based on src prop", () => {
    render(<IconSymbol src="Discord_icon" />);
    const svg = screen.getByTestId("svg");
    expect(svg).toBeInTheDocument();
  });
});

describe("check the hoverstate on community icons", () => {
  it("should render glowing svg when hovered and when not in hover should render normal svg", () => {
    render(<IconSymbol src="Instagram_icon" />);
    const icon_wrapper = screen.getByTestId("icon-wrapper");
    fireEvent.mouseEnter(icon_wrapper);
    const glow_svg = screen.getByTestId("glow-svg");
    expect(glow_svg).toBeInTheDocument();
    fireEvent.mouseLeave(icon_wrapper);
    const svg = screen.getByTestId("svg");
    expect(svg).toBeInTheDocument();
  });
});
