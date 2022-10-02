import React, { createContext, useContext, useReducer } from "react";
import {
  ActionInterface,
  initialState,
  InitialStateInterface,
  reducer,
} from "./reducer";

import { toast } from "react-toastify";
import produce from "immer";
import axios from "axios";

interface AppContextInterface {
  setAlert(type: "success" | "error", message: string): void;
  state: InitialStateInterface;
  dispatch(arg0: ActionInterface): void;
  login(email: string, password: string): void;
  register(
    name: string,
    email: string,
    password: string,
    password2: string
  ): void;
}

const AppContext = createContext<AppContextInterface>({
  dispatch: () => null,
  setAlert: () => null,
  login: () => null,
  register: () => null,
  state: initialState,
});

// Provider in your app

export const AppContextWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(produce(reducer), initialState);

  const setAlert: AppContextInterface["setAlert"] = (type, message) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        toast.info(message);
    }
  };

  const login: AppContextInterface["login"] = async (email, password) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({ email, password });
    try {
      const response = await axios.post("/api/token/", body, config);

      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      setAlert("success", "Logged in!");
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL" });
      setAlert("error", "Login fail");
    }
  };

  const register: AppContextInterface["register"] = async (
    name,
    email,
    password,
    password2
  ) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({ name, email, password, password2 });
    try {
      const response = await axios.post("/api/accounts/signup", body, config);

      dispatch({ type: "SIGNUP_SUCCESS", payload: response.data });
      login(email, password);
    } catch (error) {
      dispatch({ type: "SIGNUP_FAIL" });
      setAlert("error", "Error registering");
    }
  };

  const AppContextValue: AppContextInterface = {
    state,
    dispatch,
    setAlert,
    login,
    register,
  };
  return (
    <AppContext.Provider value={AppContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = (): AppContextInterface => {
  return useContext(AppContext);
};
