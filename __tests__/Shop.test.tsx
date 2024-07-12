import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Shop from "@/app/shop/page";

// mext/image module mock
jest.mock("next/image", () => ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} />
));

describe("Shop component", () => {
  it("renders the big text", () => {
    render(<Shop />);

    const text_1 = screen.getByTestId("text_1");

    expect(text_1).toBeInTheDocument();
    expect(text_1).toHaveTextContent(
      /ERAVERSE \[LIMITED\] APPAREL AND\sCOLLECTIBLES\./
    );
  });

  it("renders small text `COMING SOON` ", () => {
    render(<Shop />);

    const text_2 = screen.getByTestId("text_2");

    expect(text_2).toBeInTheDocument();
    expect(text_2).toHaveTextContent("COMING SOON");
  });

  it("renders logo ", () => {
    render(<Shop />);

    const logo = screen.getByAltText("eraverseLogo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/eraverse_logo.png");
    expect(logo).toHaveAttribute("alt", "eraverseLogo");
  });

  it("renders background image ", () => {
    render(<Shop />);

    const background = screen.getByAltText("background");
    expect(background).toBeInTheDocument();
    expect(background).toHaveAttribute("src", "/bg.png");
    expect(background).toHaveAttribute("alt", "background");
  });
});
