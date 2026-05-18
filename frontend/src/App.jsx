import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div>
      <Navbar setPage={setPage} />

      {page === "home" && <Home />}
      {page === "cart" && <Cart />}
    </div>
  );
}