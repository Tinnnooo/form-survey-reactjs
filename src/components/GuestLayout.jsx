import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
  const { userToken } = useStateContext();

  if (userToken) {
    return <Navigate to="/" />;
  }

  return (
    <main>
      <section className="login">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6">
              <h1 className="text-center mb-4">Formify</h1>
              <div className="card card-default">
                <div className="card-body">
                  <h3 className="mb-3">Login</h3>
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
