"use client";
import "@/resource/styles/HomePage.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Define the Book interface
interface Book {
  id: string;
  publisher_id: string;
  name: string;
  image_url: string;
  view: string;
  follow: string;
  category: string;
  last_update: string;
}

function Home() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const token = getTokenFromCookies();
    if (!token) {
      window.location.href = '/auth/login';
    } else {
      fetchBooks(token);
    }
  }, [router]);

  const getTokenFromCookies = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; token=`);
    let token;
    if (parts.length === 2) {
      token = parts.pop()?.split(";").shift();
    }
    return token;
  };

  const fetchBooks = async (token: string) => {
    if (!token) return;

    try {
      const response = await fetch(
        "https://ltwbe.hcmutssps.id.vn/api/getBook",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log(data.message);
      if (data.code === 200) {
        setBooks(data.message);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <section className="bg-gray-100">
      <div className="container mx-auto px-6 py-4">
        <h1 className="text-2xl font-bold mb-4">Book List</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white p-4 rounded shadow">
              <img
                src={book.image_url}
                alt={book.name}
                width={200}
                height={300}
                className="mb-2"
              />
              <Link href={`/novel/${book.id}`}>
                <h2 className="font-semibold">{book.name}</h2>
              </Link>
              <p>Views: {book.view}</p>
              <p>Followers: {book.follow}</p>
              <p>Category: {book.category}</p>
              <p>Last Updated: {book.last_update}</p>
            </div>
          ))}
        </div>
      </div>
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
    </section>
  );
}

export default Home;
