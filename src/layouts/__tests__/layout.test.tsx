import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Layout from "../layout";

test("renders learn react link", () => {
  render(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
  const home = screen.getByTestId("logo");
  const play = screen.getByText("Play");
  const challenges = screen.getByText("Challenges");
  expect(home).toBeInTheDocument();
  expect(play).toBeInTheDocument();
  expect(challenges).toBeInTheDocument();
});
