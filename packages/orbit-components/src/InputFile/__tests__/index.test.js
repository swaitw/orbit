// @flow
import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import InputFile from "../index";
import SPACINGS_AFTER from "../../common/getSpacingToken/consts";
import defaultTheme from "../../defaultTheme";

describe("InputFile", () => {
  it("should have expected DOM output", () => {
    const { container } = render(
      <InputFile
        name="name"
        label="Label"
        buttonLabel="Select file"
        placeholder="No file selected"
        dataTest="test"
        allowedFileTypes={[".png", ".jpg", ".pdf"]}
        spaceAfter={SPACINGS_AFTER.NORMAL}
        help="help message"
        tabIndex="-1"
      />,
    );
    const input = screen.getByLabelText(/Label/);
    expect(input).toHaveAttribute("type", "file");
    expect(input).toHaveAttribute("name", "name");
    expect(screen.getByRole("button", { name: "Select file" })).toBeInTheDocument();
    expect(screen.getByText(/No file selected/)).toBeInTheDocument();
    expect(screen.getByTestId("test")).toBeInTheDocument();
    expect(input).toHaveAttribute("accept", ".png,.jpg,.pdf");
    expect(container.firstChild).toHaveStyle({ marginBottom: defaultTheme.orbit.spaceSmall });
    expect(screen.getByText("help message")).toBeInTheDocument();
    expect(input).toHaveAttribute("tabindex", "-1");
    expect(input).toHaveAttribute("data-state", "ok");
  });
  it("should render given file name", () => {
    render(<InputFile placeholder="No file selected" fileName="fileName.png" />);
    expect(screen.getByText(/fileName\.png/)).toBeInTheDocument();
    expect(screen.queryByText(/No file selected/)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "" })).toBeInTheDocument();
  });
  it("should render given error", () => {
    render(<InputFile label="Label" error="error message" />);
    expect(screen.getByText("error message")).toBeInTheDocument();
    expect(screen.getByLabelText(/Label/)).toHaveAttribute("data-state", "error");
  });
  it("should trigger event handlers", () => {
    const onFocus = jest.fn();
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const onRemoveFile = jest.fn();
    render(
      <InputFile
        label="Label"
        fileName="fileName.png"
        onFocus={onFocus}
        onChange={onChange}
        onBlur={onBlur}
        onRemoveFile={onRemoveFile}
      />,
    );
    const input = screen.getByLabelText(/Label/);
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    userEvent.upload(input, file);
    expect(onFocus).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();
    const closeButton = screen.getByRole("button", { name: "" });
    userEvent.click(closeButton);
    expect(onRemoveFile).toHaveBeenCalled();
  });
});
