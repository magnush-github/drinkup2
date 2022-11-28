import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="-mt-24 flex flex-col max-w-md items-center ">
      <h1 className="text-2xl text-center font-bold mb-6">Drink Up!</h1>
      <p data-testid="home-info" className="font-semibold">
        Click play to begin. Pass the phone (object) from person to person. When
        the music stops, whoever is holding the phone must follow the directions
        on the screen. Then click the continue button to keep playing.
      </p>
      <div>
        <Link to="/play">
          <button className="bg-black text-white font-semibold p-2 w-32 mt-12 rounded">
            Play
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Home;
