import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GreenRippleGlow from ".";

describe("GreenRippleGlow Component", () => {
  it("just renders what do you expect this to do", () => {
    render(<GreenRippleGlow />);

    const GreenRippleDot = screen.getByTestId("green-ripple-glow");
    expect(GreenRippleDot).toBeInTheDocument();
  });
});
