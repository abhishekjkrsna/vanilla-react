import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useContext, useRef } from "react";
import { LoggedInContext } from "../context/Context";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { setLoggedIn } = useContext(LoggedInContext);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate({ from: "/login" });

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!formRef.current) return;
    const userName = formRef.current.username.value;
    const password = formRef.current.password.value;
    if (userName === "admin" && password === "admin") {
      setLoggedIn(true);
      navigate({ to: "/characters" });
    } else {
      alert("Wrong Credentials");
    }
    formRef.current.reset();
  };
  return (
    <form onSubmit={(e) => handlesubmit(e)} ref={formRef}>
      <fieldset>
        <div>
          <label htmlFor="username">Enter Username</label>
          <input
            type="text"
            name="username"
            id="username"
            required={true}
            placeholder="Eg: admin"
          />
        </div>
        <div>
          <label htmlFor="password">Enter Password</label>
          <input
            type="text"
            name="password"
            id="password"
            required={true}
            placeholder="Eg: admin"
          />
        </div>
      </fieldset>
      <div>
        <input type="submit" value="Login" />
      </div>
    </form>
  );
}
