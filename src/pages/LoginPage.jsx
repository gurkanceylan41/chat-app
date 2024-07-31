import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { auth, provider } from "../firebase/index";

const LoginPage = ({ setIsAuth }) => {
  function handleClick() {
    signInWithPopup(auth, provider).then((data) => {
      setIsAuth(data.user.refreshToken);
      localStorage.setItem("token", data.user.refreshToken);
    });
  }

  return (
    <div className="container">
      <div className="login">
        <h1>Chat Odası</h1>
        <p>Devam Etmek İçin Giriş Yapın</p>
        <button onClick={handleClick}>
          <img src="g-logo.png" alt="google" />
          <span>Google ile Giriş Yap</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
