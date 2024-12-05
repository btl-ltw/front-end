'use client';
import '@/resource/styles/Manager.css';
import { useEffect, useState } from 'react';

const ManagerPage = () => {
  const [users, setUsers] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');

  const urlUsers = 'https://ltwbe.hcmutssps.id.vn/api/getAllUsers';
  const urlPayments = 'https://ltwbe.hcmutssps.id.vn/api/getPaymentHistory';
  const urlAssignRole = 'https://ltwbe.hcmutssps.id.vn/api/assignRole';

  useEffect(() => {
    fetchUsers();
    fetchPaymentHistory();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(urlUsers);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchPaymentHistory = async () => {
    try {
      const response = await fetch(urlPayments);
      const data = await response.json();
      setPaymentHistory(data);
    } catch (error) {
      console.error('Error fetching payment history:', error);
    }
  };

  const handleAssignRole = async () => {
    if (!selectedUser || !newRole) return;

    try {
      const response = await fetch(urlAssignRole, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedUser, role: newRole }),
      });
      if (response.ok) {
        alert('Role assigned successfully!');
        fetchUsers(); // Refresh user list
      } else {
        alert('Failed to assign role');
      }
    } catch (error) {
      console.error('Error assigning role:', error);
    }
  };

  const handleDeleteUser = async (userName: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`https://ltwbe.hcmutssps.id.vn/api/deleteUser/${userName}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('User deleted successfully!');
          fetchUsers(); // Refresh user list
        } else {
          alert('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="manager-page-container">
      <h1>Manager Dashboard</h1>
      <h2>Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          
            <tr >
              <td>UserName</td>
              <td>Email</td>
              <td>Role</td>
              <td>
                <button className="assign">Assign Role</button>
                <button className="delete">Delete</button>
              </td>
            </tr>
          
        </tbody>
      </table>

      {selectedUser && (
        <div className="assign-role-container">
          <h2>Assign Role to User</h2>
          <select>
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="publisher">Publisher</option>
            <option value="manager">Manager</option>
          </select>
          <button onClick={handleAssignRole}>Assign Role</button>
        </div>
      )}

      <h2>Payment History</h2>
      <table className="payment-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          
            <tr>
              <td>User</td>
              <td>Amount</td>
              <td>Date</td>
            </tr>
          
        </tbody>
      </table>
    </div>
  );
};

export default ManagerPage;