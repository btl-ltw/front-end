"use client";
import Image from "next/image";
import "@/resource/styles/Login.css";
import user_icon from "@/resource/images/person.png";
import email_icon from "@/resource/images/email.png";
import password_icon from "@/resource/images/password.png";
import Link from "next/link";
import { useState } from "react";

const Register = () => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>(""); // State for success message

  const LoginSubmit = async () => {
    const url = "https://ltwbe.hcmutssps.id.vn/auth/register";
    const data = {
      username: userName,
      email: email,
      password: password,
    };

    try {
      const response = await fetch(url, {
        method: "POST", // Use the POST method
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(data), // Convert the data object to a JSON string
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const result = await response.json(); // Parse the JSON from the response
      console.log("Success:", result); // Handle the data from the response

      // Set success message after registration
      setSuccessMessage("Registration successful! You can now log in.");
    } catch (error) {
      console.error("Error:", error); // Handle any errors
      setSuccessMessage(""); // Clear success message in case of error
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <div className="input">
          <Image src={user_icon} alt="User Icon" />
          <input
            type="text"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="input">
          <Image src={email_icon} alt="Email Icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <Image src={password_icon} alt="Password Icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="redirect">
        <span>Already have an account? Log in <Link href="/auth/login">here</Link></span>
      </div>
      {successMessage && (
        <div className="success-message">{successMessage}</div> // Display success message
      )}

      <div className="submit-container">
        <button className="submit" onClick={LoginSubmit}>
          Sign Up
        </button>
      </div>

      
    </div>
  );
};

export default Register;