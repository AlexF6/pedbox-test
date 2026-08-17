// src/pages/Login.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Login } from "./Login";
import { useAuth } from "../hooks/useAuth";

vi.mock("../hooks/useAuth");
const mockUseAuth = useAuth as any;

describe("Login Page Component", () => {
  it("should render credentials form fields correctly", () => {
    mockUseAuth.mockReturnValue({
      login: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /Dimension/i })).toBeDefined();
    
    expect(screen.getByLabelText(/^Email$/i)).toBeDefined();
    expect(screen.getByLabelText(/^Password$/i)).toBeDefined();
    
    expect(screen.getByRole("button", { name: /Sign in/i })).toBeDefined();
  });

  it("should update form fields on user typing", async () => {
    mockUseAuth.mockReturnValue({
      login: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/^Email$/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/^Password$/i) as HTMLInputElement;

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });
});