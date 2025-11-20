import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useContext, useState } from "react";
import { LoggedInContext } from "../context/Context";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { setLoggedIn } = useContext(LoggedInContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate({ from: "/login" });

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (userName === "admin" && password === "admin") {
      setLoggedIn(true);
      navigate({ to: "/characters" });
    } else {
      alert("Wrong Credentials");
    }
    setUserName("");
    setPassword("");
  };
  return (
    <form onSubmit={(e) => handlesubmit(e)}>
      <fieldset>
        <div>
          <label htmlFor="">Enter Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="">Enter Password</label>
          <input
            type="text"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </fieldset>
      <div>
        <input type="submit" value="Login" />
      </div>
    </form>
  );
}
