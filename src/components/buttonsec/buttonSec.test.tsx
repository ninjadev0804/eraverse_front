import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ButtonSec from ".";

describe("<ButtonSec/> component", () => {
  it("renders with correct title", () => {
    render(<ButtonSec title="test" />);
    const buttonSec = screen.getByText("test");
    expect(buttonSec).toBeInTheDocument();
  });

  it("renders with default styling", () => {
    render(<ButtonSec title="test" />);
    const buttonSec = screen.getByTestId("default-buttonSec");
    expect(buttonSec).toHaveClass(
      "cursor-pointer flex justify-enter items-center h-full px-[16.5px] border-[1px] border-[#4E4E4E] border-solid rounded-lg transition-all duration-700 drop-shadow-none hover:drop-shadow-[0_30px_30px_rgb(0,0,0)]"
    );
  });

  it("renders with alternate styling", () => {
    render(<ButtonSec title="test" textcolor={true} />);
    const buttonSec = screen.getByTestId("optional-buttonSec");
    expect(buttonSec).toHaveClass(
      "cursor-pointer flex justify-enter items-center h-full px-[16.5px] border-[1px] border-[#4E4E4E] border-solid rounded-lg transition-all duration-700"
    );
  });

  it("applies hover styles on `Button` ", () => {
    render(<ButtonSec title="test" />);
    const buttonSec = screen.getByTestId("default-buttonSec");
    fireEvent.mouseEnter(buttonSec);
    expect(buttonSec).toHaveStyle(
      "text-shadow: 0 0 10px rgba(255, 255, 255, 1)"
    );
  });

  // it("applies hover styles on `ButtonText`", () => {
  //   render(<ButtonSec title="test" />);
  //   const buttonSec = screen.getByTestId("button-text");
  //   fireEvent.mouseEnter(buttonSec);
  //   expect(buttonSec).toHaveStyle("font-weight: bold");
  // });
});
