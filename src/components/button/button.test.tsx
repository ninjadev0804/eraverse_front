import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from ".";

describe(`Button component`, () => {
  it(`renders <Button/> with default "Title" when no title is porvided`, () => {
    render(<Button title="" />);
    const buttonTitle = screen.getByText("Title");
    expect(buttonTitle).toBeInTheDocument();
  });

  it(`renders <Button/> with the provided "Title"`, () => {
    render(<Button title="HelloWorld" />);
    const buttonTitle = screen.getByText("HelloWorld");
    expect(buttonTitle).toBeInTheDocument();
  });

  it(`renders <Button/> with the "loading" style when "loading" is true`, () => {
    render(<Button title="" loading={true} />);
    const button = screen.getByTestId("button-wrapper");
    expect(button).toHaveClass("text-[#78DD64]");
  });

  it(`renders <Button/> without "loading" style when "loading" is false`, () => {
    render(<Button title="" loading={false} />);
    const button = screen.getByTestId("button-wrapper");
    expect(button).not.toHaveClass("text-[#78DD64]");
  });
});
