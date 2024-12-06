'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import "@/resource/styles/ChapterDetail.css";
import { useRouter } from 'next/navigation';

const ChapterDetail = () => {
    const [chapterContent, setChapterContent] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [chapterName, setChapterName] = useState<string | null>(null);
    const [chapterNum, setChapterNum] = useState<string | null>(null);
    const [totalChapters, setTotalChapters] = useState<number>(0);
    const router = useRouter();
    const pathname = usePathname();
    const parts = pathname.split('/');
    const bookId = parts[2];
    const chapterId = parts[3];

    const getChapterUrl = (bookId: string, chapterId: string) => 
        `https://ltwbe.hcmutssps.id.vn/api/getChaperFromBook?book_id=${bookId}&chapter=${chapterId}`;

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
        try {
            const response = await fetch(getChapterUrl(bookId, chapterId), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(bookId);
            console.log(chapterId);
            if (data.code === 200) {
                setChapterContent(data.message[0].file_url);
                setChapterName(data.message[0].chapter_name);
                setChapterNum(data.message[0].chapter_num);
                setTotalChapters(data.message[0].total_chapters); // Giả sử API trả về tổng số 
                
            } else {
                console.error('Error fetching chapter content:', data.message);
            }
        } catch (error) {
            console.error('Error fetching chapter content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePreviousChapter = () => {
        const previousChapterNum = parseInt(chapterNum!) - 1;
        if (previousChapterNum > 0) {
            console.log(previousChapterNum);
            router.push(`/chapter/${bookId}/${previousChapterNum}`);
            console.log(router);          // Chuyển đến chương trước
        }
    };

    const handleNextChapter = () => {
        const nextChapterNum = parseInt(chapterNum!) + 1;
        if (nextChapterNum) {
             console.log(nextChapterNum);
            router.push(`/chapter/${bookId}/${nextChapterNum}`);
            console.log(router);// Chuyển đến chương tiếp theo
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!chapterContent) return <p>Chapter content not found.</p>;

    return (
        <div className="chapter-content">
            <h1>Chapter {chapterNum} - {chapterName}</h1>
            <pre>{chapterContent}</pre>
            <div className="navigation-buttons">
                <button onClick={handlePreviousChapter} disabled={parseInt(chapterNum!) <= 1}>
                    Previous Chapter
                </button>
                <button onClick={handleNextChapter} disabled={parseInt(chapterNum!) >= totalChapters}>
                    Next Chapter
                </button>
            </div>
        </div>
    );
};

export default ChapterDetail;