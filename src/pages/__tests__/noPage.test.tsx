import { render, screen } from "@testing-library/react";
import NoPage from "../noPage";

describe("Test 404 - page", () => {
  it("Shows error message", () => {
    render(<NoPage />);
    expect(screen.getByRole("heading")).toHaveTextContent(
      "404 - This page does not exist"
    );
  });
});
