'use client';
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
    const [usernameToAssignRole, setUsernameToAssignRole] = useState('');
    const [roleToAssign, setRoleToAssign] = useState('manager'); // Mặc định gán vai trò là manager
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isAssignRoleModalVisible, setIsAssignRoleModalVisible] = useState(false);

    const userUrl = 'https://ltwbe.hcmutssps.id.vn/api/manager/getAllUser';
    const paymentUrl = 'https://ltwbe.hcmutssps.id.vn/api/manager/getAllHistoryPayment';
    const deleteUrl = (username: string) => `https://ltwbe.hcmutssps.id.vn/api/manager/deleteUser?username=${username}`;
    const assignRoleUrl = (username: string, role: string) => `https://ltwbe.hcmutssps.id.vn/api/manager/assignRole?username=${username}&role=${role}`;

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
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            console.log('User deleted successfully');
            setDataSource(prevData => prevData.filter(user => user.username !== usernameToDelete));
            setIsDeleteModalVisible(false);
            setUsernameToDelete('');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleAssignRole = async () => {
        console.log(`Attempting to assign role to user: ${usernameToAssignRole}`);
        try {
            const response = await fetch(assignRoleUrl(usernameToAssignRole, roleToAssign), {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                 // Gửi thông tin vai trò
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            console.log('Role assigned successfully');
            // Cập nhật lại danh sách người dùng
            setDataSource(prevData => 
                prevData.map(user => 
                    user.username === usernameToAssignRole ? { ...user, role: roleToAssign } : user
                )
            );

            setIsAssignRoleModalVisible(false);
            setUsernameToAssignRole('');
            setRoleToAssign('manager'); // Reset lại vai trò
        } catch (error) {
            console.error('Error assigning role:', error);
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
                <button className="assign" onClick={() => setIsAssignRoleModalVisible(true)}>Assign Role</button>
                <button className="delete" onClick={() => setIsDeleteModalVisible(true)}>Delete User</button>
            </div>
            <h1>Payment History</h1>
            <div className="table-container">
                <Table dataSource={paymentHistory} columns={paymentColumns} rowKey="time" />
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
                open={isAssignRoleModalVisible}
                onOk={handleAssignRole}
                onCancel={() => setIsAssignRoleModalVisible(false)}
            >
                <Input 
                    placeholder="Enter username to assign role"
                    value={usernameToAssignRole}
                    onChange={(e) => setUsernameToAssignRole(e.target.value)}
                />
                <Input 
                    placeholder="Enter role (e.g., manager)"
                    value={roleToAssign}
                    onChange={(e) => setRoleToAssign(e.target.value)}
                />
            </Modal>
        </div>
    );
}

export default UserComponent;