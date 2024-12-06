// src/User.js
"use client";
import { useEffect, useState } from "react";
import { Table, Modal, Input } from "antd";
import "@/resource/styles/Manager.css";

const User = () => {
  const [dataSource, setDataSource] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [usernameToDelete, setUsernameToDelete] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [usernameToAssign, setUsernameToAssign] = useState("");
  const [roleToAssign, setRoleToAssign] = useState("");
  const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);

  const userUrl = "https://ltwbe.hcmutssps.id.vn/api/manager/getAllUser";
  const paymentUrl =
    "https://ltwbe.hcmutssps.id.vn/api/manager/getAllHistoryPayment";
  const deleteUrl = (username: string) =>
    `https://ltwbe.hcmutssps.id.vn/api/manager/deleteUser?username=${username}`;
  const assignRoleUrl = (username: string, role: string) =>
    `https://ltwbe.hcmutssps.id.vn/api/manager/assignRole?username=${username}&role=${role}`;

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop()?.split(";").shift() : null;
  };

  const token = getCookie("token");

  useEffect(() => {
    const fetchUserInfo = async (token: string) => {
      if (!token) return;

      try {
        const response = await fetch(userUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const updatedData = data.map((user: string) => ({
          ...user,
          role: user.role || "guest",
        }));

        setDataSource(updatedData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchPaymentHistory = async (token: string) => {
      if (!token) return;

      try {
        const response = await fetch(paymentUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setPaymentHistory(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserInfo(token!);
    fetchPaymentHistory(token!);
  }, [token]);

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(deleteUrl(usernameToDelete), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      // Cập nhật lại danh sách người dùng
      setDataSource((prevData) =>
        prevData.filter((user) => user.username !== usernameToDelete)
      );
      setIsDeleteModalVisible(false); // Đóng modal
      setUsernameToDelete(""); // Xóa tên người dùng đã nhập
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAssignRole = async () => {
    try {
      const response = await fetch(
        assignRoleUrl(usernameToAssign, roleToAssign),
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      // Cập nhật lại danh sách người dùng
      setDataSource((prevData) =>
        prevData.map(
          (user) =>
            user.username === usernameToAssign
              ? { ...user, role: roleToAssign }
              : user // lỗi qq gì đây
        )
      );
      setIsAssignModalVisible(false);
      setUsernameToAssign("");
      setRoleToAssign("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const userColumns = [
    { title: "Email", dataIndex: "email" },
    { title: "Name", dataIndex: "username" },
    { title: "Role", dataIndex: "role" },
    { title: "VIP", dataIndex: "vip_level" },
  ];

  const paymentColumns = [
    { title: "User Name", dataIndex: "username" },
    { title: "Amount", dataIndex: "amount" },
    { title: "Time", dataIndex: "time" },
  ];

  return (
    <div>
      <h1>User List</h1>
      <div className="table-container">
        <Table dataSource={dataSource} columns={userColumns} rowKey="email" />
        <button
          className="assign"
          onClick={() => setIsAssignModalVisible(true)}
        >
          Assign Role
        </button>
        <button
          className="delete"
          onClick={() => setIsDeleteModalVisible(true)}
        >
          Delete User
        </button>
      </div>
      <h1>Payment History</h1>
      <div className="table-container">
        <Table
          dataSource={paymentHistory}
          columns={paymentColumns}
          rowKey="time"
        />
      </div>

      {/* Modal để xác nhận xóa người dùng */}
      <Modal
        title="Delete User"
        open={isDeleteModalVisible}
        onOk={handleDeleteUser}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <Input
          placeholder="Enter username to delete"
          value={usernameToDelete}
          onChange={(e) => setUsernameToDelete(e.target.value)}
        />
      </Modal>

      {/* Modal để gán vai trò cho người dùng */}
      <Modal
        title="Assign Role"
        open={isAssignModalVisible}
        onOk={handleAssignRole}
        onCancel={() => setIsAssignModalVisible(false)}
      >
        <Input
          placeholder="Enter username to assign role"
          value={usernameToAssign}
          onChange={(e) => setUsernameToAssign(e.target.value)}
        />
        <Input
          placeholder="Enter role (e.g., manager)"
          value={roleToAssign}
          onChange={(e) => setRoleToAssign(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default User;
