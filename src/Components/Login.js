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
          <h1>Covid Tracker</h1>
        </div>
        <img
          src="https://img.icons8.com/ios/100/000000/coronavirus--v1.png"
          alt="corona"
        />
        <Button className="login-with-google-btn" onClick={signInWithGoogle}>
          Sign In with Google
        </Button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
