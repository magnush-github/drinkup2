import { render, screen, waitFor } from "@testing-library/react";
import { getStorage, localVar, setStorage } from "../../utils/functions";
import Challenges from "../challenges";
import userEvent from "@testing-library/user-event";
import { defaultChallenges } from "../../utils/defaultChallenges";
import { wait } from "@testing-library/user-event/dist/utils";

describe("Test challenges page", () => {
  beforeEach(() => {
    localStorage.removeItem(localVar);
  });
  test("renders header", () => {
    render(<Challenges />);
    expect(
      screen.getByRole("heading", { name: /Challenges/i })
    ).toBeInTheDocument();
  });
  test("readers category headers", () => {
    render(<Challenges />);
    expect(screen.getByRole("heading", { name: /Weak/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Medium/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Hard/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Colgate/i })
    ).toBeInTheDocument();
  });
  test("add challenge", () => {
    render(<Challenges />);
    userEvent.click(screen.getByText(/add challenge/i));
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /weak/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /medium/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /hard/i })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: /colgate/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    userEvent.type(screen.getByRole("textbox"), "Chug!");
    userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: /medium/i })
    );
    userEvent.click(screen.getByRole("button", { name: /save/i }));
    userEvent.click(screen.getByRole("button", { name: /medium/i }));
    expect(screen.getByText(/chug/i)).toBeInTheDocument();
    expect(getStorage()).toStrictEqual([
      {
        id: 0,
        description: "Chug!",
        difficulty: 1,
      },
    ]);
    userEvent.click(screen.getByText(/add challenge/i));
    userEvent.type(screen.getByRole("textbox"), "Chug!");
    userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: /medium/i })
    );
    userEvent.click(screen.getByRole("button", { name: /save/i }));
    userEvent.click(screen.getByRole("button", { name: /medium/i }));
    expect(getStorage()).toStrictEqual([
      {
        id: 0,
        description: "Chug!",
        difficulty: 1,
      },
      {
        id: 1,
        description: "Chug!",
        difficulty: 1,
      },
    ]);
  });
  test("edit challenge", () => {
    render(<Challenges />);
    userEvent.click(screen.getByText(/add challenge/i));
    userEvent.type(screen.getByRole("textbox"), "Chug!");
    userEvent.click(screen.getByRole("button", { name: /save/i }));
    userEvent.click(screen.getByRole("button", { name: /weak/i }));
    userEvent.click(screen.getByText(/chug/i));
    expect(screen.getByLabelText(/edit challenge/i)).toBeInTheDocument();
    userEvent.click(screen.getByLabelText(/edit challenge/i));
    const editTextbox = screen.getByRole("textbox");
    expect(editTextbox).toBeInTheDocument();
    expect(editTextbox).toHaveTextContent("Chug!");
    userEvent.type(screen.getByRole("textbox"), "Chug123");
    expect(editTextbox).toHaveTextContent("Chug!Chug123");
    userEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(screen.getByText(/Chug!Chug123/i)).toBeInTheDocument();
  });
  test("delete challenge", () => {
    render(<Challenges />);
    userEvent.click(screen.getByText(/add challenge/i));
    userEvent.type(screen.getByRole("textbox"), "Chug!");
    userEvent.click(screen.getByRole("button", { name: /save/i }));
    userEvent.click(screen.getByRole("button", { name: /weak/i }));
    userEvent.click(screen.getByText(/chug/i));
    expect(screen.getByLabelText(/delete challenge/i)).toBeInTheDocument();
    userEvent.click(screen.getByLabelText(/delete challenge/i));
    expect(getStorage()).toStrictEqual([]);
    expect(screen.queryByText(/chug/i)).toBeFalsy();
  });
  test("set default challenges", () => {
    render(<Challenges />);
    userEvent.click(
      screen.getByRole("button", { name: /default challenges/i })
    );
    expect(getStorage()).toStrictEqual(defaultChallenges);
  });
  test("fails on invalid JSON in storage", () => {
    localStorage.setItem(localVar, "Hei på deg[]{}");
    expect(getStorage()).toStrictEqual([]);
  });
});
