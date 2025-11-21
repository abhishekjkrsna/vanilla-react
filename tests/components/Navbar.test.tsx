import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Navbar from "../../src/components/navbar/Navbar";
import { LoggedInContext } from "../../src/context/Context";

const renderNavbar = (loggedIn: boolean, setLoggedIn = vi.fn()) => {
  return render(
    <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
      <Navbar />
    </LoggedInContext.Provider>
  );
};

describe("Navbar Component", () => {
  it("should display the Login link when the user is logged out", () => {
    renderNavbar(false);
    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /logout/i })
    ).not.toBeInTheDocument();
  });

  it("should display the Logout button when the user is logged in", () => {
    renderNavbar(true);
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /login/i })
    ).not.toBeInTheDocument();
  });

  it("should call setLoggedIn with false when Logout is clicked", () => {
    const setLoggedInMock = vi.fn();
    renderNavbar(true, setLoggedInMock);

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(setLoggedInMock).toHaveBeenCalledTimes(1);
    expect(setLoggedInMock).toHaveBeenCalledWith(false);
  });

  it("should display links for Home, Characters, Search, and About", () => {
    renderNavbar(false);
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /characters/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
  });
});
