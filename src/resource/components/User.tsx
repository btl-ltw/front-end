'use client'
import { useEffect, useState } from "react";
import { Table } from "antd";
import "@/resource/styles/User.css";

const User = () => {
    const [dataSource, setDataSource] = useState([]);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const userUrl = 'https://ltwbe.hcmutssps.id.vn/api/manager/getAllUser';
    const paymentUrl = 'https://ltwbe.hcmutssps.id.vn/api/manager/getAllHistoryPayment';

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
                const response = await fetch(userUrl, {
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
    useEffect(() => {
    const fetchUserInfo = async (token: string): Promise<void> => {
      if (!token) {
        console.error('Token not found');
        return;
      }

      try {
        const response = await fetch(paymentUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data from API:', JSON.stringify(data, null, 2)); 
        setPaymentHistory(data);
          
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchUserInfo(token!);
  }, [token]);
    const userColumns = [
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'username',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'VIP',
            dataIndex: 'vip_level',
        },
    ];

    const paymentColumns = [
        {
            title: 'Transaction ID',
            dataIndex: 'transaction_id',
        },
        {
            title: 'User Email',
            dataIndex: 'user_email',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Date',
            dataIndex: 'date',
        },
    ];

    return (
        <div>
            <h1>User List</h1>
            <Table dataSource={dataSource} columns={userColumns} rowKey="email"/> 
            <h1>Payment History</h1>
            <Table dataSource={paymentHistory} columns={paymentColumns} rowKey="transaction_id"/> 
        </div>
    )
}

export default User;