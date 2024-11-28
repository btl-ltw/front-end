'use client'
import { useEffect, useState } from "react";
import { Table } from "antd";
import "@/resource/styles/User.css";
const User = () => {
    const [dataSource, setDataSource] = useState([]);
      const url = 'https://ltwbe.hcmutssps.id.vn/api/manager/getAllHistoryPayment';

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift();
    }
    console.log(`Cookie not found: ${name}`);
    return null;
  };

  const token = getCookie('token');
 
  
  useEffect(() => {
    const fetchUserInfo = async (token: string): Promise<void> => {
      if (!token) {
        console.error('Token not found');
        return;
      }

      try {
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data from API:', JSON.stringify(data, null, 2)); 
        setDataSource(data);
          
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchUserInfo(token!);
  }, [token]);
    const columns = [
        {
            title: 'User Name',
            dataIndex: 'username',
        },
        {
            title: 'Role',
            dataIndex: 'role',
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
    return (
      <div>
        <h1>History Payment</h1>
            <Table dataSource={dataSource} columns={columns} rowKey="username"/> 
            
        </div>
     )
 }
 export default User;