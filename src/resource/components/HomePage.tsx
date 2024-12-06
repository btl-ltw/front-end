'use client';
import Image from 'next/image';
import '@/resource/styles/HomePage.css';
import Link from 'next/link';
import user_icon from '@/resource/images/person.png';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


function Home() { 
  const router = useRouter();
  useEffect(() => {
    const getTokenFromCookies = () => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; token=`);
      let token;
      if (parts.length === 2) {
        token = parts.pop()?.split(';').shift();
      }
      return token;
    };
    const token = getTokenFromCookies(); 
    if (!token) { router.push('/login');  }
  }, []);
  
  return (
         <section className="bg-gray-100">

  
  
      <footer className="bg-white shadow mt-8">
   <div className="container mx-auto px-6 py-4 flex justify-between items-center">
    <p className="text-gray-800">
     © 2024 WebToon. All rights reserved.
    </p>
    <div className="flex space-x-4">
     <Link className="text-gray-800 hover:text-gray-600" href="#">
      <i className="fab fa-facebook-f">
      </i>
     </Link>
     <Link className="text-gray-800 hover:text-gray-600" href="#">
      <i className="fab fa-twitter">
      </i>
     </Link>
     <a title="nguvaiz" className="text-gray-800 hover:text-gray-600" href="#">
      <i className="fab fa-instagram">
      </i>
     </a>
    </div>
   </div>
      </footer>
      
      
 </section>
    )
}
export default Home;