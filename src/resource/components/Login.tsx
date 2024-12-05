"use client";
import Image from "next/image";
import "@/resource/styles/Login.css";
import user_icon from "@/resource/images/person.png";
import password_icon from "@/resource/images/password.png";
import Link from "next/link";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showWrongPass, setShowWrongPass] = useState<boolean>(false);
  const router = useRouter();

  const LoginSubmit = async (): Promise<void> => {
    const url = `https://ltwbe.hcmutssps.id.vn/auth/login`;
    const data = {
      username: userName,
      password: password,
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setShowWrongPass(true);
        Cookies.remove('token');
        throw new Error("Network response was not ok " + response.statusText);
      }

      setShowWrongPass(false);
      const result = await response.json();
      const token: string = result.message;

      // Set cookie with token
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      document.cookie = `token=${token}; expires=${expiryDate.toUTCString()}; path=/; SameSite=None; Secure;`;

      // Fetch user info with the token
      const userInfo = await fetchUserInfo(token);
      if (userInfo) {
        console.log("Fetched User Info:", userInfo);
        const userRole = userInfo[0].role;
        console.log(userRole);
        // Chuyển hướng dựa trên vai trò
        if (userRole === 'manager') {
          router.push('/manager');
        } else if (userRole === 'publisher') {
          router.push('/publisher'); 
        } else if (userRole === 'user') {
          router.push('/');
        } else {
          router.push('/');
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchUserInfo = async (token: string): Promise<any> => {
    try {
      const response = await fetch("https://ltwbe.hcmutssps.id.vn/api/getUserInfo", {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      return data; // Trả về data để lấy role
    } catch (err) {
      console.error("Error fetching user info:", err);
      return null; // Trả về null nếu có lỗi
    }
  };

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
            id="userName"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="input">
          <Image src={password_icon} alt="" />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      {showWrongPass && (
        <div className="wrongpass">Wrong Password or UserName!</div>
      )}
      <div className="forgotPass">
        Do Not Have Account? <Link href="register">Click Here</Link>
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