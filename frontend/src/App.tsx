import React from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/login" exact component={LoginPage} />
      </Switch>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
