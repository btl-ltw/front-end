'use client';
import '@/resource/styles/UserInfo.css';
import { useEffect, useState } from 'react';

interface UserInfo {
  username: string;
  displayName: string;
  email: string;
  imgUrl: string;
  vipLevel: number;
  credits: number;
  role?: string; 
}

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const url = 'https://ltwbe.hcmutssps.id.vn/api/getUserInfo';

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
        setUserInfo(data);
          console.log(userInfo?.displayName);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchUserInfo(token!);
  }, [token]);

  return (
    <div className="user-info-container">
      {userInfo !== null ? (
        <>
          <div className="user-info-header">
            <img
              src={userInfo.imgUrl || "https://placehold.co/100x100"}
              alt="User profile"
              className="user-profile-picture"
            />
            <div>
              <h1 className="user-name">{userInfo.displayName || 'Default Name'}</h1>
              <p className="user-email">{userInfo.email || 'Default Email'}</p>
            </div>
          </div>
          <div className="userinfo">
            <div className="info">
              <h2 className="favorite-novels-title">Information</h2>
              <p className="info-text">Username: {userInfo.username || 'Default Username'}</p>
              <p className="info-text">Role: {userInfo.role || 'Not Specified'}</p>
              <p className="info-text">VIP Level: {userInfo.vipLevel || '0'}</p>
              <p className="info-text">Credits: {userInfo.credits || '0'}</p>
            </div>
          </div>
          <div className="user-statistics">
            <h2 className="statistics-title">User Statistics</h2>
            <div className="statistics-grid">
              <div className="statistics-card">
                <h3 className="statistics-card-title">Credits</h3>
                <p className="statistics-card-value">{userInfo.credits || '0'}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default UserInfo;