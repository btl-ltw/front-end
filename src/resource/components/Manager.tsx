'use client'
import { useEffect, useState } from "react";
import { Table, Modal, Input } from "antd";
import "@/resource/styles/Manager.css";

interface User {
    email: string;
    username: string;
    role?: string;
    vip_level?: number;
}

const UserComponent = () => {
    const [dataSource, setDataSource] = useState<User[]>([]);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [usernameToDelete, setUsernameToDelete] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const userUrl = 'https://ltwbe.hcmutssps.id.vn/api/manager/getAllUser';
    const paymentUrl = 'https://ltwbe.hcmutssps.id.vn/api/manager/getAllHistoryPayment';
    const deleteUrl = (username: string) => `https://ltwbe.hcmutssps.id.vn/api/manager/deleteUser?username=${username}`;

    const getCookie = (name: string) => {
      if (typeof document === 'undefined') return null;  
      const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        return parts.length === 2 ? parts.pop()?.split(';').shift() : null;
    };

    const token = getCookie('token');

    useEffect(() => {
        const fetchUserInfo = async (token: string) => {
            if (!token) return;

            try {
                const response = await fetch(userUrl, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data: User[] = await response.json();

                const updatedData = data.map(user => ({
                    ...user,
                    role: user.role || 'guest',
                }));

                setDataSource(updatedData);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        const fetchPaymentHistory = async (token: string) => {
            if (!token) return;

            try {
                const response = await fetch(paymentUrl, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setPaymentHistory(data);
            } catch (error) {
                console.error('Error fetching payment history:', error);
            }
        };

        fetchUserInfo(token!);
        fetchPaymentHistory(token!);
    }, [token]);

    const handleDeleteUser = async () => {
        console.log(`Attempting to delete user: ${usernameToDelete}`);
        try {
            const response = await fetch(deleteUrl(usernameToDelete), {
                method: 'DELETE', // Ensure we're using the correct HTTP method
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            console.log('User deleted successfully');

            // Cập nhật lại danh sách người dùng
            setDataSource(prevData => prevData.filter(user => user.username !== usernameToDelete));
            setIsModalVisible(false); // Đóng modal
            setUsernameToDelete(''); // Xóa tên người dùng đã nhập
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const userColumns = [
        { title: 'Email', dataIndex: 'email' },
        { title: 'Name', dataIndex: 'username' },
        { title: 'Role', dataIndex: 'role' },
        { title: 'VIP', dataIndex: 'vip_level' },
    ];

    const paymentColumns = [
        { title: 'User Name', dataIndex: 'username' },
        { title: 'Amount', dataIndex: 'amount' },
        { title: 'Time', dataIndex: 'time' }
    ];

    return (
        <div>
            <h1>User List</h1>
            <div className="table-container">
                <Table dataSource={dataSource} columns={userColumns} rowKey="email" />
                <button className="assign">Assign Role</button>
                <button className="delete" onClick={() => setIsModalVisible(true)}>Delete User</button>
            </div>
            <h1>Payment History</h1>
            <div className="table-container">
                <Table dataSource={paymentHistory} columns={paymentColumns} rowKey="time" />
            </div>

            {/* Modal để xác nhận xóa người dùng */}
            <Modal
                title="Delete User"
                visible={isModalVisible}
                onOk={handleDeleteUser}
                onCancel={() => setIsModalVisible(false)}
            >
                <Input 
                    placeholder="Enter username to delete"
                    value={usernameToDelete}
                    onChange={(e) => setUsernameToDelete(e.target.value)}
                />
            </Modal>
        </div>
    );
}

export default UserComponent;
