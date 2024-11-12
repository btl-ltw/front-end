'use client'
import Image from 'next/image';
import '@/resource/styles/Login.css'; 
import user_icon from '@/resource/images/person.png';
import email_icon from '@/resource/images/email.png';
import password_icon from '@/resource/images/password.png';
import Link from 'next/link';
function LoginSubmit() {
    const url = 'https://ltwbe.hcmutssps.id.vn/auth/register';
    const data = {
        username: 'lisajones12',
        email: 'lisajones12@gmail.com',
        password: 'lisa1234'
    };

    fetch(url, {
        method: 'PUT', // Use the PUT method
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify(data) // Convert the data object to a JSON string
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Parse the JSON from the response
        })
        .then(data => {
            console.log('Success:', data); // Handle the data from the response
        })
        .catch(error => {
            console.error('Error:', error); // Handle any errors
        });
}
    const Login = () => {
    
        return (
            <div className="container">
                <div className="header">
                    <div className="text">Sign Up</div>
                    <div className="underline"></div>
                </div>
            
                <div className="inputs">
                    <div className="input">
                        <Image src={user_icon} alt="" />
                        <input type="text" placeholder="Username" />
                    </div>
                    <div className="input">
                        <Image src={email_icon} alt="" />
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="input">
                        <Image src={password_icon} alt="" />
                        <input type="password" placeholder="Password" />
                    </div>
                </div>
            
                <div className="submit-container">
                
                    <button className="submit" onClick={LoginSubmit} > Sign Up</button>
                </div>
            </div>
        )
    }
    export default Login;