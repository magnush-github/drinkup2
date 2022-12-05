import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReactPlayer from "react-player";
import ChooseDifficulty from "../../components/chooseDifficulty";
import GamePlaying from "../../components/gamePlaying";
import ShowChallenge from "../../components/showChallenge";
import { defaultChallenges } from "../../utils/defaultChallenges";
import { setStorage } from "../../utils/functions";
import Play from "../play";

window.HTMLMediaElement.prototype.play = async () => undefined;
window.HTMLMediaElement.prototype.pause = async () => undefined;
describe("Play tests", () => {
  beforeEach(() => {
    localStorage.removeItem("drinkupChallenges");
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  test("expect choose difficulty to render correctly", () => {
    const { getByText, getByRole } = render(<Play />);

    setStorage([]);
    expect(getByRole("heading")).toHaveTextContent(
      "Choose a difficulty and press play"
    );
    expect(getByRole("button", { name: "Weak" })).toBeInTheDocument();
    expect(getByRole("button", { name: /medium/i })).toBeInTheDocument();
    expect(getByRole("button", { name: /hard/i })).toBeInTheDocument();
    expect(getByRole("button", { name: /colgate/i })).toBeInTheDocument();
    expect(
      screen.getByLabelText(/choose a song or leave blank/i)
    ).toBeInTheDocument();
    expect(getByRole("button", { name: /start/i })).toBeInTheDocument();
    expect(screen.getByTestId("song")).toBeInTheDocument();
    userEvent.click(getByText(/Start/i));
    expect(
      getByText(/No challenges in difficulty "Weak"/i)
    ).toBeInTheDocument();
  });
  test("it starts playing and shows challenge", () => {
    jest.useFakeTimers();
    setStorage(defaultChallenges);
    const { getByText } = render(<Play />);
    userEvent.click(getByText(/Start/i));
    expect(getByText(/Pass the phone!/i)).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(30000);
    });
    expect(getByText(/run like a/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /continue/i })
    ).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: /continue/i }));
    expect(getByText(/pass the phone/i)).toBeInTheDocument();
  });
  test("show challenge correctly", () => {
    let statuschange = "stopped";
    render(
      <ShowChallenge
        challenge={defaultChallenges[0]}
        changeStatus={() => (statuschange = "playing")}
      />
    );
    expect(screen.getByText(/run like a/i)).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: /continue/i }));
    expect(statuschange).toEqual("playing");
  });
  test("test statuschange in gameplaying", () => {
    jest.useFakeTimers();
    const cs = jest.fn();
    render(<GamePlaying changeStatus={cs} />);
    expect(cs).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(30000);
    });
    expect(cs).toHaveBeenCalled();
  });
  test("test difficulty change in choose difficulty", () => {
    const cD = jest.fn((d) => {
      difficulty = d;
    });
    let difficulty = 0;
    const cStatus = jest.fn();
    const cSong = jest.fn();
    render(
      <ChooseDifficulty
        changeDifficulty={cD}
        changeSong={cSong}
        changeStatus={cStatus}
        difficulty={difficulty}
      />
    );
    userEvent.click(screen.getByRole("button", { name: /medium/i }));
    expect(cD).toHaveBeenCalled();
    expect(difficulty).toEqual(1);
    userEvent.click(screen.getByRole("button", { name: /hard/i }));
    expect(cD).toHaveBeenCalled();
    expect(difficulty).toEqual(2);
    userEvent.click(screen.getByRole("button", { name: /colgate/i }));
    expect(cD).toHaveBeenCalled();
    expect(difficulty).toEqual(3);
    userEvent.click(screen.getByRole("button", { name: /weak/i }));
    expect(cD).toHaveBeenCalled();
    expect(difficulty).toEqual(0);
    userEvent.click(screen.getByRole("button", { name: /start/i }));
    expect(cStatus).toHaveBeenCalled();
    userEvent.type(screen.getByRole("textbox"), "nostalgi");
    expect(cSong).toHaveBeenCalledTimes("nostalgi".length);
  });
  test("react player", () => {
    let playerReady = false;
    let playing = false;
    const onStart = jest.fn();
    const ready = jest.fn(() => {
      playerReady = true;
    });
    render(
      <ReactPlayer
        playsinline
        onReady={ready}
        onStart={onStart}
        url={
          "https://www.youtube.com/watch?v=yYchF3OLkm4&list=RDyYchF3OLkm4&start_radio=1"
        }
        playing={playing}
      ></ReactPlayer>
    );
    waitFor(() => expect(playerReady).toBe(true));
    playing = true;
    waitFor(() => expect(onStart).toHaveBeenCalled());
  });
  test("plays with song nostalgi", () => {
    setStorage(defaultChallenges);
    render(<Play />);
    userEvent.type(screen.getByRole("textbox"), "nostalgi");
    waitFor(() =>
      expect(screen.getByText(/pass the phone/i)).toBeInTheDocument()
    );
  });
});
