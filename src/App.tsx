import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import Layout from "./layouts/layout";
import Home from "./pages/home";
import Play from "./pages/play";
import Challenges from "./pages/challenges";
import NoPage from "./pages/noPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/challenges" element={<Challenges />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
