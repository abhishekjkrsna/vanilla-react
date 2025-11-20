import { Link } from "@tanstack/react-router";
import { useContext } from "react";
import { LoggedInContext } from "../../context/Context";
export default function Navbar() {
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <strong>Swapi App</strong>
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>{" "}
        <li>
          <Link to="/characters">Characters</Link>
        </li>{" "}
        <li>
          <Link to="/search">Search</Link>
        </li>{" "}
        <li>
          <Link to="/about">About</Link>
        </li>{" "}
        {loggedIn ? (
          <button
            onClick={() => setLoggedIn(false)}
            className="outline secondary"
          >
            Logout
          </button>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
