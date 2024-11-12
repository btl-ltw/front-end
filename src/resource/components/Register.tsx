"use client";
import Image from "next/image";
import "@/resource/styles/Login.css";
import user_icon from "@/resource/images/person.png";
import email_icon from "@/resource/images/email.png";
import password_icon from "@/resource/images/password.png";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function LoginSubmit() {
    const url = "https://ltwbe.hcmutssps.id.vn/auth/register";
    const data = {
      username: userName,
      email: email,
      password: password,
    };

    fetch(url, {
      method: "POST", // Use the PUT method
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify(data), // Convert the data object to a JSON string
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        console.log("Success:", data); // Handle the data from the response
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });
  }
  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
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
          <Image src={email_icon} alt="" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

      <div className="submit-container">
        <button className="submit" onClick={LoginSubmit}>
          {" "}
          Sign Up
        </button>
      </div>
    </div>
  );
};
export default Login;
