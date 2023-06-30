import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: {},
  choiceTypes: [],
  toast: {
    message: null,
    color: null,
    show: false,
  },
  setCurrentUser: () => { },
  setUserToken: () => { },
});

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, setUserToken] = useState(
    localStorage.getItem("accessToken") || ""
  );
  const [choiceTypes] = useState([
    "short answer",
    "paragraph",
    "date",
    "multiple choice",
    "dropdown",
    "checkboxes",
  ]);
  const [toast, setToast] = useState({
    message: "",
    color: "green",
    show: false,
  });

  const setToken = (token) => {
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken", token);
    }

    setUserToken(token);
  };

  const showToast = (message, color = "green") => {
    setToast({ message, color, show: true });
    setTimeout(() => {
      setToast({ message: "", color: "green", show: false });
    }, 3000);
  };

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        choiceTypes,
        userToken,
        setToken,
        toast,
        showToast,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
