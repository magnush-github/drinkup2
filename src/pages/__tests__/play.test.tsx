import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../home";
test("renders home", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const header = screen.getByRole("heading");
  const textContent = screen.getByTestId("home-info");
  const button = screen.getByRole("link");
  expect(header).toHaveTextContent("Drink Up!");
  expect(textContent).toBeInTheDocument();
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("Play");
  expect(button.getAttribute("href")).toEqual("/play");
});
