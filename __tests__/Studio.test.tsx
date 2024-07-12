import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Studio from "@/app/studio/page";

// mext/image module mock
jest.mock("next/image", () => ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} />
));

describe("Studio component", () => {
  it("renders background image", () => {
    render(<Studio />);

    const background = screen.getByAltText("studio");
    expect(background).toBeInTheDocument();
    expect(background).toHaveAttribute("src", "/eraverse_studio.png");
    expect(background).toHaveAttribute("alt", "studio");
  });
});
