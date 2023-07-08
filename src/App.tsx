import { Navbar } from "flowbite-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <div className="w-full flex items-center justify-center flex-col">
        <Navbar className="border-2 max-w-7xl w-full backdrop-blur-md bg-white/70 sticky top-0">
          <h1 className="font-bold text-2xl">Moviesin</h1>
          <ul className="flex justify-center items-center space-x-4">
            <li>
              <p>Home</p>
            </li>
            <li>
              <p>Movies List</p>
            </li>
            <li>
              <p>ddfg</p>
            </li>
          </ul>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
