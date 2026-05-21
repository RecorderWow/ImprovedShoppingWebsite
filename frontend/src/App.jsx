import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";

function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home />;
      case "cart":
        return <Cart />;
      case "login":
        return <Login setPage={setPage} />;
      case "register":
        return <Register setPage={setPage} />;
      case "admin":
        return <Admin />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <Navbar setPage={setPage} />
      {renderPage()}
    </div>
  );
}

export default App;