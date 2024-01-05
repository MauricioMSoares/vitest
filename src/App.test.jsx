import { fireEvent, logRoles, render, screen } from "@testing-library/react";
import App from "./App";
import { describe, expect, it, test } from "vitest";
import { kebabCaseToTitleCase } from "./helpers";

test("button click flow", () => {
  const { container } = render(<App />);
  logRoles(container);

  const button = screen.getByRole("button", { name: /blue/i});
  expect(button).toHaveClass("red");

  fireEvent.click(button);
  expect(button).toHaveClass("blue");
  expect(button).toHaveTextContent(/red/i);
});

test("checkbox flow", () => {
  render(<App />);

  const button = screen.getByRole("button", { name: /blue/i});
  const checkbox = screen.getByRole("checkbox", { name: /disable button/i});
  
  expect(button).toBeEnabled();
  expect(checkbox).not.toBeChecked();
});

test("when checkbox is checked, button should be disabled", () => {
  render(<App />);

  const button = screen.getByRole("button", { name: /blue/i});
  const checkbox = screen.getByRole("checkbox", { name: /disable button/i});

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
  expect(checkbox).toBeChecked();
});

test("when checkbox is unchecked, button should be enabled", () => {
  render(<App />);

  const button = screen.getByRole("button", { name: /blue/i});
  const checkbox = screen.getByRole("checkbox", { name: /disable button/i});

  fireEvent.click(checkbox);
  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
  expect(checkbox).not.toBeChecked();
});

test("disabled button should have gray background and reverts to red", () => {
  render(<App />);

  const button = screen.getByRole("button", { name: /blue/i});
  const checkbox = screen.getByRole("checkbox", { name: /disable button/i});

  fireEvent.click(checkbox);
  expect(button).toHaveClass("gray");
  fireEvent.click(checkbox);
  expect(button).toHaveClass("red");
});

test("disabled button should have gray background and reverts to blue", () => {
  render(<App />);

  const button = screen.getByRole("button", { name: /blue/i});
  const checkbox = screen.getByRole("checkbox", { name: /disable button/i});

  fireEvent.click(button);
  fireEvent.click(checkbox);
  expect(button).toHaveClass("gray");
  fireEvent.click(checkbox);
  expect(button).toHaveClass("blue");
});

describe("kebabCaseToTitleCase", () => {
  it("works for no hyphens", () => {
    expect(kebabCaseToTitleCase("red")).toBe("Red");
  });

  it("works for one hyphen", () => {
    expect(kebabCaseToTitleCase("light-blue")).toBe("Light Blue");
  });

  it("works for multiple hyphens", () => {
    expect(kebabCaseToTitleCase("very-light-blue")).toBe("Very Light Blue");
  });
});