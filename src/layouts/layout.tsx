import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-[#4caf50]">
      <main className="flex flex-col justify-between min-h-screen gap-12">
        <nav className="h-24 bg-black text-white flex items-center">
          <ul className="flex justify-between w-full text-center items-center text-xl font-bold">
            <li className="w-2/5 flex justify-center items-center">
              <Link to="/">
                <img
                  data-testid="logo"
                  src={require("../assets/clover.png")}
                  alt="logo"
                  className="h-16"
                />
              </Link>
            </li>
            <li className="w-1/5">
              <Link to="/play">Play</Link>
            </li>
            <li className="w-2/5">
              <Link to="challenges">Challenges</Link>
            </li>
          </ul>
        </nav>
        <div className="flex flex-col grow items-center justify- mx-6 md:mx-0">
          <Outlet />
        </div>
        <footer className="bg-black h-24"></footer>
      </main>
    </div>
  );
};
export default Layout;
