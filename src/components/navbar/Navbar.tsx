import { Link } from "@tanstack/react-router";
import { useContext } from "react";
import { LoggedInContext } from "../../context/Context";
export default function Navbar() {
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
  return (
    <>
      <nav>
        <Link to="/">
          <h1>Swapi App</h1>
        </Link>
        <div>
          <span>
            <Link to="/">Home</Link>
          </span>{" "}
          <span>
            <Link to="/characters">Characters</Link>
          </span>{" "}
          <span>
            <Link to="/search">Search</Link>
          </span>{" "}
          <span>
            <Link to="/about">About</Link>
          </span>{" "}
          {loggedIn ? (
            <button onClick={() => setLoggedIn(false)}>Logout</button>
          ) : (
            <span>
              <Link to="/login">Login</Link>
            </span>
          )}
        </div>
      </nav>
    </>
  );
}
