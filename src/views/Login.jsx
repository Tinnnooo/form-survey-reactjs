import { useEffect, useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
  useEffect(() => {
    document.title = "Login - Formify";
  });
  const { setCurrentUser, setToken } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    axiosClient
      .post("/v1/auth/login", {
        email,
        password,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setToken(data.user.accessToken);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  return (
    <form action="manage-forms.html" onSubmit={onSubmit} method="POST">
      <div className="form-group my-3">
        <label htmlFor="email" className="mb-1 text-muted">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
      </div>

      <div className="form-group my-3">
        <label htmlFor="password" className="mb-1 text-muted">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </div>
    </form>
  );
}
