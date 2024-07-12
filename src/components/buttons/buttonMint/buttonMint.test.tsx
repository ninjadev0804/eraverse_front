import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ButtonMint from ".";

describe("Mint button <ButtonMint/>", () => {
  it("renders the correct title", () => {
    render(<ButtonMint title="Mint" />);
    const mintButton = screen.getByText("Mint");
    expect(mintButton).toBeInTheDocument();
  });

  it("renders the correct className", () => {
    render(<ButtonMint title="Mint" />);
    const mintButton = screen.getByTestId("mintButton-wrapper");
    expect(mintButton).toHaveClass(
      "cursor-pointer flex justify-enter items-center h-full px-[19.5px] border-[1px] border-white border-solid bg-white rounded-lg"
    );
  });
});
