import React from "react";
import { signInWithGoogle } from "../Firebase/firebase.js";
import "./Login.css";
import { Button } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__text">
          <h1>COVID-19 Tracker</h1>
          <h3>Made By Vaibhav Vyas</h3>
        </div>
        <img
          src="https://img.icons8.com/ios/100/000000/coronavirus--v1.png"
          alt="corona"
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={signInWithGoogle}
        >
          Sign In with Google
        </Button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
