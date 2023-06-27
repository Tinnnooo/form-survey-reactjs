import { Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
  const { userToken } = useStateContext();

  if (!userToken) {
    return <Navigate to="/login" />;
  }

  return <div>DefaultLayout</div>;
}
