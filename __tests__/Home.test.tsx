import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

// mext/image module mock
jest.mock("next/image", () => ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} />
));

describe("Home component", () => {
  it("renders a glowing logo image", () => {
    render(<Home />);

    const logo = screen.getByAltText("eraverseLogo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/Home_bg.svg");
    expect(logo).toHaveAttribute("alt", "eraverseLogo");
  });
});
