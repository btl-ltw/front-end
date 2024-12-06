import Link from "next/link";
import Image from "next/image";
import user_icon from '@/resource/images/person.png';
import '@/resource/styles/Nav.css';
export default function Nav() { 
    return (
    <footer className="bg-white shadow mt-8">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <p className="text-gray-800">© 2024 WebToon. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link className="text-gray-800 hover:text-gray-600" href="#">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link className="text-gray-800 hover:text-gray-600" href="#">
              <i className="fab fa-twitter"></i>
            </Link>
            <a
              title="nguvaiz"
              className="text-gray-800 hover:text-gray-600"
              href="#"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>        

    )
}