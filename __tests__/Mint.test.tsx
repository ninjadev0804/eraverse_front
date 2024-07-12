import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Mint from "@/app/mint/page";

// mext/image module mock
jest.mock("next/image", () => ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} />
));

describe("Mint component", () => {
  it("renders nft gif", () => {
    render(<Mint />);

    const nft = screen.getByAltText("nft");
    expect(nft).toBeInTheDocument();
    expect(nft).toHaveAttribute("src", "/IMG_0704.gif");
    expect(nft).toHaveAttribute("alt", "nft");
  });
});
