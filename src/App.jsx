import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PerfilMascota from "./pages/PerfilMascota";
import Memorial from "./pages/Memorial";
import NotFound from "./pages/NotFound";
import Registro from "./pages/Registro";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<PerfilMascota />} />
        <Route path="/memorial" element={<Memorial />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
