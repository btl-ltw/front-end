import Image from 'next/image';
import '@/resource/styles/Login.css'; 
import user_icon from '@/resource/images/person.png';
import email_icon from '@/resource/images/email.png';
import password_icon from '@/resource/images/password.png';
import Link from 'next/link';
const Login = () => { 
    
    return (
        <div className="container">
            <div className="header">
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>
            
            <div className="inputs">
                <div className="input">
                    <Image src={ user_icon} alt="" />
                    <input type="text" placeholder="Username"/>
                </div>
                <div className="input">
                    <Image src={ email_icon} alt="" />
                    <input type="email" placeholder="Email"/>
                </div>
                <div className="input">
                    <Image src={ password_icon} alt="" />
                    <input type="password" placeholder="Password"/>
                </div>
            </div>
            
            <div className="submit-container">
                
                <div className="submit" >Sign Up</div>
            </div>
        </div>
    )
}
export default Login;