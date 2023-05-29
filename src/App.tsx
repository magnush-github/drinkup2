import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import Layout from "./layouts/layout";
import Home from "./pages/home";
import Challenges from "./pages/challenges";
import NoPage from "./pages/noPage";
/* @ts-ignore */
import Play from "./pages/play";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
