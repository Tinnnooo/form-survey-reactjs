import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import Toast from "./Toast";
import { useEffect } from "react";

export default function DefaultLayout() {
  const { setCurrentUser, userToken, setToken, showToast } = useStateContext();

  if (!userToken) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    axiosClient
      .get("v1/auth/me")
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logout = (e) => {
    e.preventDefault();

    axiosClient
      .post("/v1/auth/logout")
      .then((res) => {
        setToken(null);
        showToast(res.data.message);
      })
      .catch((err) => {
        showToast(err.data.message);
      });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Formify
          </Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Administrator
              </a>
            </li>
            <li className="nav-item">
              <button
                href="#"
                className="btn bg-white text-primary ms-4"
                onClick={logout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <Outlet />

      <Toast />
    </>
  );
}
