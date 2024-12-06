'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Sử dụng useParams thay vì useSearchParams
import Link from 'next/link';
import '@/resource/styles/NovelDetail.css';

const getNovelUrl = (novelId: string) => `https://ltwbe.hcmutssps.id.vn/api/getBook?book_id=${novelId}`;

const NovelDetail = () => {
    const { id } = useParams(); // Lấy ID từ params
    const [novel, setNovel] = useState<any>(null); // Trạng thái để lưu dữ liệu tiểu thuyết
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
            fetchNovelDetails(id[0], token);
        } else if (!token) {
            console.error('User not authenticated.'); // Xử lý nếu không có token
        }
    }, [id, token]);

    const fetchNovelDetails = async (novelId: string, token: string) => {
        console.log('Fetching novel details for ID:', novelId);
        try {
            const response = await fetch(getNovelUrl(novelId), {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            const data = await response.json();
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

            <div className="actions">
                <Link href={`/novel/${novel.id}/read`}>
                    <button className="readButton">Read Now</button>
                </Link>
                <button className="followButton">Follow</button>
            </div>
        </div>
    );
};

export default NovelDetail;