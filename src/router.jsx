import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import Home from "./views/Home";
import CreateForm from "./views/CreateForm";
import Notfound from "./views/Notfound";
import DetailForm from "./views/DetailForm";
import SubmitForm from "./views/SubmitForm";
import Forbidden from "./views/Forbidden";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/create/form",
        element: <CreateForm />,
      },
      {
        path: "/form/:form_slug",
        element: <DetailForm />,
      },
      {
        path: "/form/:form_slug/invited",
        element: <SubmitForm />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <Notfound />,
  },
  {
    path: "/forbidden",
    element: <Forbidden />,
  },
]);

export default router;
