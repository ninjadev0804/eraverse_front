import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Community from "@/app/community/page";

// mext/image module mock
jest.mock("next/image", () => ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} />
));

describe("Community component", () => {
  it("renders background image", () => {
    render(<Community />);

    const background = screen.getByAltText("community");
    expect(background).toBeInTheDocument();
    expect(background).toHaveAttribute(
      "src",
      "/eraverse_community_station.png"
    );
    expect(background).toHaveAttribute("alt", "community");
  });
});
