import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Simulacao from "./pages/Simulacao";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/simulacao" element={<Simulacao />} />
    </Routes>
  );
}
