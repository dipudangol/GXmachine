import React from "react";

import UsernameLogo from "../../assets/icons/Username.png";
import PasswordLogo from "../../assets/icons/Password.png";

import {InvertedButton} from "../common/button/Button.common"
import { useAuth } from "../../dgenerate";

const LoginPage = () => {
  const { handleLogin } = useAuth()
  
  const onLogin=()=>{
    console.log("button clicke",)

    handleLogin("token")
  }
  return (
<div className="login-container">
      <div className="login">
        <div className="login-title">
          MEMBER LOGIN
        </div>

        <div className="login-input">
          <div className="login-input-logo">
            <img src={UsernameLogo} alt="USERNAME" />
          </div>

          <input type="text" className="login-input-field" placeholder="Username" />
        </div>

        <div className="login-input">
          <div className="login-input-logo">
            <img src={PasswordLogo} alt="PASSWORD" />
          </div>

          <input type="password" className="login-input-field" placeholder="Password" />
        </div>

        <div className="login-submit">
          <InvertedButton title="LOGIN" style={{ width: "100%", paddingTop: 10, paddingBottom: 10 }} onClick={onLogin} />
        </div>
      </div>
    </div>
  )
}

export default LoginPage;