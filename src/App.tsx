import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/layout";
import Home from "./pages/home";
import Play from "./pages/play";
import Challenges from "./pages/challenges";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/challenges" element={<Challenges />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
