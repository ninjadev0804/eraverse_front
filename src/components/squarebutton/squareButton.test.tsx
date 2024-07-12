import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SquareButton from ".";

// SVG mocks
jest.mock("../../assets/svg/Logo.svg", () => () => "Logo");
jest.mock("../../assets/svg/BackArrow.svg", () => () => "BackArrow");

describe(`<SquareButton/> component`, () => {
  it("renders eraverese Logo", () => {
    render(<SquareButton src="Logo" />);
    const squareButton = screen.getByTestId("square-button");
    expect(squareButton).toBeInTheDocument();
  });

  it("renders backArrow button", () => {
    render(<SquareButton src="BackArrow" />);
    const squareButton = screen.getByTestId("square-button");
    expect(squareButton).toBeInTheDocument();
  });
});
