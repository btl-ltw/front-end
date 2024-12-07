'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import '@/resource/styles/NovelDetail.css';

// Định nghĩa các interface
interface Chapter {
    id: string;
    book_id: string;
    chapter_name: string;
    chapter_num: string;
    price: string;
}

interface Novel {
    id: string;
    name: string;
    image_url: string;
    category: string;
    last_update: string;
    view: string;
    follow: string;
}

// Hàm để lấy URL cho tiểu thuyết
const getNovelUrl = (novelId: string) => 
    `https://ltwbe.hcmutssps.id.vn/api/getBook?book_id=${novelId}`;

// Hàm để lấy URL cho danh sách chương
const getChaptersUrl = (bookId: string) => 
    `https://ltwbe.hcmutssps.id.vn/api/getChaperFromBook?book_id=${bookId}`;

const NovelDetail = () => {
    const { id } = useParams(); // Lấy ID từ params
    const [novel, setNovel] = useState<Novel | null>(null); // Trạng thái để lưu dữ liệu tiểu thuyết
    const [chapters, setChapters] = useState<Chapter[]>([]); // Trạng thái để lưu danh sách chương
    const [loading, setLoading] = useState(true); // Trạng thái loading
    console.log(id);
    
    const getCookie = (name: string) => {
        if (typeof document === 'undefined') return null;  
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        return parts.length === 2 ? parts.pop()?.split(';').shift() : null;
    };

    const token = getCookie('token'); // Lấy token từ cookie

    useEffect(() => {
        if (id && token) {
            fetchNovelDetails(id, token);
            fetchChapters(id, token); // Gọi hàm để lấy danh sách chương
        } else if (!token) {
            console.error('User not authenticated.'); // Xử lý nếu không có token
        }
    }, [id, token]);

    const fetchNovelDetails = async (novelId: any, token: string) => {
        console.log('Fetching novel details for ID:', novelId);
        try {
            const response = await fetch(getNovelUrl(novelId), {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            console.log(novelId);
            console.log('API Response:', data);

            if (data.code === 200) {
                setNovel(data.message[0]); // Lưu thông tin tiểu thuyết
            } else {
                console.error('Error fetching novel details:', data.message);
            }
        } catch (error) {
            console.error('Error fetching novel details:', error);
        } finally {
            setLoading(false);
        }
    };

 const fetchChapters = async (bookId: any, token: string) => {
    console.log('Fetching chapters for book ID:', bookId);
    try {
        const response = await fetch(getChaptersUrl(bookId), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        console.log(bookId);
        console.log('Chapters API Response:', data);

        if (data.code === 200) {
            // Kiểm tra xem data.message có phải là mảng không
            const sortedChapters = Array.isArray(data.message) 
                ? data.message.sort((a:any, b:any) => parseInt(a.chapter_num) - parseInt(b.chapter_num)) 
                : [];
            setChapters(sortedChapters);
        } else {
            console.error('Error fetching chapters:', data.message);
        }
    } catch (error) {
        console.error('Error fetching chapters:', error);
    }
};

    if (loading) return <p>Loading...</p>; // Hiển thị trạng thái loading

    if (!novel) return <p>Novel not found.</p>; // Xử lý trường hợp không tìm thấy tiểu thuyết

    return (
        <div className="container">
            <h1 className="title">{novel.name}</h1>
            <div className="container-about">
                <div className="comic-img">
                    <img src={novel.image_url} alt={novel.name} className="coverImage" />
                </div>
                <div className="summary">
                    <h2>Details</h2>
                    <p><strong>Category:</strong> {novel.category}</p>
                    <p><strong>Last Updated:</strong> {novel.last_update}</p>
                    <p><strong>Views:</strong> {novel.view}</p>
                    <p><strong>Follows:</strong> {novel.follow}</p>
                </div>
            </div>

           

            <div className="chapters">
                <h2>Chapters</h2>
                {chapters.length === 0 ? (
                    <p>No chapters available.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Chapter Number</th>
                                <th>Chapter Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chapters.map(chapter => (
                                <tr key={chapter.id}>
                                    <td>{chapter.chapter_num}</td>
                                    <td>{chapter.chapter_name}</td>
                                    <td>{chapter.price}</td>
                                    <td>
                                        <Link href={`/chapter/${novel.id}/${chapter.chapter_num}`}>
                                            <button>Read</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default NovelDetail;