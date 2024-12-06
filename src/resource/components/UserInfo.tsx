"use client";
import "@/resource/styles/UserInfo.css";
import { useEffect, useState } from "react";
import { Modal, Button, Input, message, Table } from "antd";

interface UserInfo {
  username: string;
  display_name: string;
  email: string;
  img_url: string;
  vipLevel: number;
  credits: number;
  role?: string;
}

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isEditDisplayNameVisible, setIsEditDisplayNameVisible] =
    useState(false);
  const [history, setHistory] = useState([]);
  const [isEditEmailVisible, setIsEditEmailVisible] = useState(false);
  const [isEditPasswordVisible, setIsEditPasswordVisible] = useState(false);
   const [isDepositVisible, setIsDepositVisible] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [depositAmount, setDepositAmount] = useState(0);

  const url = "https://ltwbe.hcmutssps.id.vn/api/getUserInfo";
  const changeDisplayNameUrl =
    "https://ltwbe.hcmutssps.id.vn/api/changeDisplayName";
  const changeEmailUrl = "https://ltwbe.hcmutssps.id.vn/api/changeEmail";
  const changePasswordUrl = "https://ltwbe.hcmutssps.id.vn/api/changePassword";
  const depositUrl = "https://ltwbe.hcmutss.id.vn/api/deposit";
  const paymentHistoryUrl = "https://ltwbe.hcmutssps.id.vn/api/getHistoryPayment"
  const getCookie = (name: string) => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift();
    }
    console.log(`Cookie not found: ${name}`);
    return null;
  };

  const token = getCookie("token");

  useEffect(() => {
    const fetchUserInfo = async (token: string): Promise<void> => {
      if (!token) {
        console.error("Token not found");
        return;
      }

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data from API:", JSON.stringify(data, null, 2));

        if (Array.isArray(data) && data.length > 0) {
          setUserInfo(data[0]);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getHistoryPaymentRequest();
    fetchUserInfo(token!);
  }, [token]);

  const getHistoryPaymentRequest = async () => {
    try {
      const response = await fetch(paymentHistoryUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Data from API:", JSON.stringify(data, null, 2));
      setHistory(data);
    } catch (error) {
      console.error("Error fetching payment history:", error);
    }
  }
   const columns = [
        {
            title: 'User Name',
            dataIndex: 'username',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Time',
            dataIndex: 'time',
        },
    ];

  const handleUpdateDisplayName = async () => {
    try {
      const response = await fetch(
        `${changeDisplayNameUrl}?display_name=${newDisplayName}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      message.success("Display name updated successfully!");
      setUserInfo((prev) =>
        prev ? { ...prev, display_name: newDisplayName } : null
      );
      setIsEditDisplayNameVisible(false);
    } catch (error) {
      message.error("Failed to update display name: " + error);
    }
  };

  const handleUpdateEmail = async () => {
    try {
      const response = await fetch(`${changeEmailUrl}?email=${newEmail}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      message.success("Email updated successfully!");
      setUserInfo((prev) => (prev ? { ...prev, email: newEmail } : null));
      setIsEditEmailVisible(false);
    } catch (error) {
      message.error("Failed to update email: " + error);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      const response = await fetch(changePasswordUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: newPassword }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      message.success("Password updated successfully!");
      setIsEditPasswordVisible(false);
    } catch (error) {
      message.error("Failed to update password: " + error);
    }
  };
  const handleDeposit = async () => {
    try {
      const response = await fetch(`${depositUrl}?amount=${depositAmount}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        signal: AbortSignal.timeout(8000)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }
      message.success('Deposit successful!');
      setUserInfo(prev => prev ? { ...prev, credits: prev.credits + depositAmount } : null);
      setIsDepositVisible(false);
    } catch (error) {
      message.error('Failed to deposit: ' + error);
    }
  };


  useEffect(() => {
    if (userInfo) {
      console.log("User Info Updated:", userInfo);
    }
  }, [userInfo]);

  return (
    <div className="user-info-container">
      {userInfo !== null ? (
        <>
          <div className="user-info-header">
            <img
              src={userInfo.img_url || "https://placehold.co/100x100"}
              alt="User profile"
              className="user-profile-picture"
            />
            <div>
              <h1 className="user-name">
                {userInfo.display_name || "Default Name"}
              </h1>
              <p className="user-email">{userInfo.email || "Default Email"}</p>
            </div>
          </div>
          <div className="userinfo">
            <div className="info">
              <h2 className="favorite-novels-title">Information</h2>
              <p className="info-text">
                Username: {userInfo.username || "Default Username"}
              </p>
              <p className="info-text">
                Role: {userInfo.role || "Not Specified"}
              </p>
              <p className="info-text">VIP Level: {userInfo.vipLevel || "0"}</p>
              <p className="info-text">Credits: {userInfo.credits || "0"}</p>
              <Button
                onClick={() => {
                  setNewDisplayName(userInfo.display_name);
                  setIsEditDisplayNameVisible(true);
                }}
              >
                Edit Display Name
              </Button>
              <Button
                onClick={() => {
                  setNewEmail(userInfo.email);
                  setIsEditEmailVisible(true);
                }}
              >
                Edit Email
              </Button>
              <Button
                onClick={() => {
                  setNewPassword("");
                  setIsEditPasswordVisible(true);
                }}
              >
                Change Password
              </Button>
                            <Button onClick={() => setIsDepositVisible(true)}>Deposit Money</Button>

            </div>
          </div>
          <div className="user-statistics">
            <h2 className="statistics-title">User Statistics</h2>
            <div className="statistics-grid">
              <div className="statistics-card">
                <h3 className="statistics-card-title">Credits</h3>
                <p className="statistics-card-value">
                  {userInfo.credits || "0"}
                </p>
              </div>
            </div>
          </div>
             <h1>History Payment</h1>
            <Table dataSource={history} columns={columns} rowKey="time"/> 

          {/* Modal Edit Display Name */}
          <Modal
            title="Edit Display Name"
            visible={isEditDisplayNameVisible}
            onCancel={() => setIsEditDisplayNameVisible(false)}
            onOk={handleUpdateDisplayName}
          >
            <Input
              value={newDisplayName}
              onChange={(e) => setNewDisplayName(e.target.value)}
              placeholder="Enter new display name"
            />
          </Modal>

          {/* Modal Edit Email */}
          <Modal
            title="Edit Email"
            visible={isEditEmailVisible}
            onCancel={() => setIsEditEmailVisible(false)}
            onOk={handleUpdateEmail}
          >
            <Input
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email"
            />
          </Modal>

          {/* Modal Change Password */}
          <Modal
            title="Change Password"
            visible={isEditPasswordVisible}
            onCancel={() => setIsEditPasswordVisible(false)}
            onOk={handleUpdatePassword}
          >
            <Input.Password
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </Modal>
          {/* Modal Deposit Money */}
          <Modal
            title="Deposit Money"
            visible={isDepositVisible}
            onCancel={() => setIsDepositVisible(false)}
            onOk={handleDeposit}
          >
            <Input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(Number(e.target.value))}
              placeholder="Enter amount to deposit"
            />
          </Modal>
        </>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default UserInfo;
