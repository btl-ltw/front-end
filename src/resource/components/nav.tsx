import Link from "next/link";
import Image from "next/image";
import user_icon from '@/resource/images/person.png';
import '@/resource/styles/Nav.css';
export default function Nav() { 
    return (
          <header className="bg-white shadow">
   <div className="container mx-auto px-6 py-3 flex justify-between items-center">
    <a className="text-xl font-bold text-gray-800" href="/user/homepage">
      WebToon
          </a>
           <a className="text-xl font-bold text-gray-800" href="/user/manager">
      Manager Page
          </a>
          <a className="text-xl font-bold text-gray-800" href="/user/publisher">
      Publisher Page
          </a>
        
    <nav className="flex space-x-4">
   
      <Link href="/user/userinfo"><Image src={user_icon}  alt="user"></Image></Link> 
     </nav>
   </div>
  </header>

    )
}