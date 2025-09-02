import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ContactForm from "../components/ContactForm";

describe("ContactForm", () => {
  it("renders fields and validates empty submit", () => {
    render(<ContactForm apiBaseUrl="" />);
    fireEvent.click(screen.getByText(/Send Message/i));
    expect(screen.getByText(/Name is required|Message is required|Email is required/)).toBeDefined();
  });
});
