"use client";
import Image from "next/image";
import "@/resource/styles/Login.css";
import user_icon from "@/resource/images/person.png";
import email_icon from "@/resource/images/email.png";
import password_icon from "@/resource/images/password.png";
import Link from "next/link";
import { useState } from "react";
import Cookies from "js-cookie";
import {log} from "node:util";


const Login = () => {
  const [userName, setUserName] = useState("heheboi1");
  const [password, setPassword] = useState("12312312a");

  function LoginSubmit() {
    const url = "https://ltwbe.hcmutssps.id.vn/auth/login";
    const data = {
      username: userName,
      password: password,
    };

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        const token = data.message;
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);
        document.cookie = `token=${token}; expires=${expiryDate.toUTCString()}; path=/; SameSite=None; Secure;`;
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    const token = Cookies.get('token');

    fetch("http://localhost:8080/api/getUserInfo", {
        headers: {
            'Authorization': `${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
  }
  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <Image src={user_icon} alt="" />
          <input
            type="text"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="input">
          <Image src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="forgotPass">
        Do Not Have Account ? <Link href="register">Click Here</Link>
      </div>

      <div className="submit-container">
        <button className="submit" onClick={LoginSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};
export default Login;
