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
  const [password, setPassword] = useState("");
  function LoginSubmit() {
    const url = "https://ltwbe.hcmutssps.id.vn/auth/login";
    const data = {
      username: userName,
      password: password,
    };

    fetch(url, {
      method: "PUT", // Use the PUT method
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
        console.log("Success:", data); 
        const token = data.message;
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1); 
        document.cookie = `token=${token}; expires=${expiryDate.toUTCString()}; path=/`;
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });
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
