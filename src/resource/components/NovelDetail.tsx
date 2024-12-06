'use client'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import '@/resource/styles/NovelDetail.css';

const NovelDetail = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id'); // Lấy ID từ tham số truy vấn
    const [novel, setNovel] = useState<any>(null); // Trạng thái để lưu dữ liệu tiểu thuyết
    const [loading, setLoading] = useState(true); // Trạng thái loading

    useEffect(() => {
        if (id) {
            fetchNovelDetails(id);
        }
    }, [id]);

        const getCookie = (name: string) => {
      if (typeof document === 'undefined') return null;  
      const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        return parts.length === 2 ? parts.pop()?.split(';').shift() : null;
    };

    const token = getCookie('token');

    const fetchNovelDetails = async (novelId: string, token: string) => {
        try {
            const response = await fetch(`https://ltwbe.hcmutssps.id.vn/api/getBook?book_id=${novelId}`,

                 {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
            );
            const data = await response.json();
            console.log(data.message);
            if (data.code === 200) {
                setNovel(data.message);
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
                    <div className="synopsis">
                        <h2>Synopsis</h2>
                        <p>{novel.synopsis}</p>
                        <h2>Rating</h2>
                        <p>{novel.rating} (Based on {novel.ratingsCount} ratings)</p>
                    </div>
                    <div className="comic-info">
                        <div className="details">
                            <p><strong>Genres:</strong> {novel.genres.join(', ')}</p>
                            <p><strong>Status:</strong> {novel.status}</p>
                            <p><strong>Last Updated:</strong> {novel.last_update}</p>
                            <p><strong>Total Chapters:</strong> {novel.total_chapters}</p>
                            <div className="authorInfo">
                                <p className="author">Author: <Link href={`/author/${novel.authorId}`}>{novel.author}</Link></p>
                                <button className="followButton">Follow Author</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="readingOptions">
                <h2>Reading Options</h2>
                <p>Available Formats:</p>
                <ul>
                    <li>Free Chapters: 1-10</li>
                    <li>Premium Chapters: 11-25 (Unlock with in-app currency/payments/VIP)</li>
                </ul>
                <button className="readButton">Read Now</button>
            </div>

            <div className="authorNote">
                <h2>Author's Note</h2>
                <p>{novel.authorNote}</p>
            </div>
            <div className="comments">
                <h2>Comments</h2>
                <p>Readers can leave comments and discuss chapters.</p>
            </div>

            <div className="relatedNovels">
                <h2>Related Novels</h2>
                <div className="relatedNovelsList">
                    {novel.relatedNovels.map((relatedNovel: any) => (
                        <div className="relatedNovel" key={relatedNovel.id}>
                            <img src={relatedNovel.image_url} alt={relatedNovel.name} className="relatedCoverImage" />
                            <Link href={`/novel/${relatedNovel.id}`}>{relatedNovel.name}</Link>
                        </div>
                    ))}
                </div>
            </div>

            <div className="shareButtons">
                <h2>Share</h2>
                <button>Facebook</button>
                <button>Twitter</button>
                <button>Instagram</button>
                <button>WhatsApp</button>
            </div>
        </div>
    );
};

export default NovelDetail;