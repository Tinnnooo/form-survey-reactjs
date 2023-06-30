import { useEffect, useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
  useEffect(() => {
    document.title = "Login - Formify";
  });
  const { setCurrentUser, setToken, showToast } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ __html: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    setError({ __html: "" });

    axiosClient
      .post("/v1/auth/login", {
        email,
        password,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setToken(data.user.accessToken);
        showToast(data.message);
      })
      .catch(({ response }) => {
        showToast(response.data.message, "red");
        if (response.data.errors) {
          const errors = Object.values(response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          setError({ __html: errors.join("<br>") });
        }
      });
  };

  return (
    <form action="manage-forms.html" onSubmit={onSubmit} method="POST">
      {error.__html && (
        <div className="text-danger" dangerouslySetInnerHTML={error}></div>
      )}
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
