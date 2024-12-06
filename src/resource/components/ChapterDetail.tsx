'use client';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';

const ChapterDetail = () => {
    // Lấy ID chương và ID sách từ params
    const [chapterContent, setChapterContent] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname(); // Lấy URL hiện tại
    const parts = pathname.split('/'); // Tách theo dấu '/'
    const bookId = parts[2]; // `/books/[book_id]/[chapter_id]` -> phần tử thứ 2
    const chapterId = parts[3]; // `/books/[book_id]/[chapter_id]` -> phần tử thứ 3

    console.log('Book ID:', bookId);
    console.log('Chapter ID:', chapterId);

    const getChapterUrl = (bookId: string, chapterId: string) => 
        `https://ltwbe.hcmutssps.id.vn/api/getChaperFromBook?book_id=${bookId}&chapter=${chapterId}`;
    console.log('Get Chapter Url:', getChapterUrl);
    const getCookie = (name: string) => {
        if (typeof document === 'undefined') return null;  
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        return parts.length === 2 ? parts.pop()?.split(';').shift() : null;
    };

    const token = getCookie('token');

    useEffect(() => {
        if (bookId && chapterId) {
            fetchChapterContent(bookId, chapterId);
        } else {
            console.error('bookId or chapterId is undefined');
        }
    }, [bookId, chapterId]);

    const fetchChapterContent = async (bookId: string, chapterId: string) => {
        console.log('Fetching chapter content for Book ID:', bookId, 'Chapter ID:', chapterId);
        try {
            const response = await fetch(getChapterUrl(bookId, chapterId), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            
            if (data.code === 200) {
                console.log(data.message);
                setChapterContent(data.message[0].file_url);

            } else {
                console.error('Error fetching chapter content:', data.message);
            }
        } catch (error) {
            console.error('Error fetching chapter content:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;

    if (!chapterContent) return <p>Chapter content not found.</p>;

    return (
        <div className="chapter-content">
            <h1>Chapter Content</h1>
            <pre>{chapterContent}</pre>
        </div>
    );
};

export default ChapterDetail;