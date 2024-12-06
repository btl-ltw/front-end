'use client';
import { useState, useEffect } from "react";
import { Modal, TextField, Button, Snackbar, List, ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";
import Alert from '@mui/material/Alert';
import "@/resource/styles/Publisher.css";
import Link from "next/link";
// Định nghĩa interface cho Book và Chapter
interface Book {
    username: string;
    id: string;
    name: string;
    image_url: string;
    view: string;
    follow: string;
    category: string;
    last_update: string;
}

interface Chapter {
    id: string;
    chapter_name: string;
    chapter_num: string;
    price: string;
    file: File | null;
}

const Publisher = () => {
    const [isPublishModalVisible, setIsPublishModalVisible] = useState(false);
    const [isAddChapterModalVisible, setIsAddChapterModalVisible] = useState(false);
    const [bookData, setBookData] = useState({ name: '', category: '', image_url: '' });
    const [chapterData, setChapterData] = useState({ bookId: '', chapterName: '', chapterNum: '', file: null, price: '' });
    const [publishedBooks, setPublishedBooks] = useState<Book[]>([]);
    const [chaptersMap, setChaptersMap] = useState<{ [key: string]: Chapter[] }>({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // URL API
    const publishNewBookUrl = 'https://ltwbe.hcmutssps.id.vn/api/publisher/publishNewBook';
    const addChapterUrl = 'https://ltwbe.hcmutssps.id.vn/api/publisher/addChapter';
    const getPublisherBooksUrl = 'https://ltwbe.hcmutssps.id.vn/api/publisher/getPublisherBooks';
    const getChaptersUrl = (bookId: string) => `https://ltwbe.hcmutssps.id.vn/api/getChaperFromBook?book_id=${bookId}`;

    const getCookie = (name: string) => {
        if (typeof document === 'undefined') return null;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        return parts.length === 2 ? parts.pop()?.split(';').shift() : null;
    };

    const token = getCookie('token');

    const handlePublishBook = async () => {
        try {
            const response = await fetch(publishNewBookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(bookData),
            });

            if (!response.ok) throw new Error('Failed to publish book');
            setSnackbarMessage('Book published successfully!');
            setSnackbarOpen(true);
            setIsPublishModalVisible(false);
            setBookData({ name: '', category: '', image_url: '' });
            fetchPublishedBooks(); 
        } catch (error) {
            setSnackbarMessage("Failed: " + error);
            setSnackbarOpen(true);
        }
    };

    const handleAddChapter = async () => {
        const formData = new FormData();
        formData.append('book_id', chapterData.bookId);
        formData.append('file_url', chapterData.file!);
        formData.append('chapter_name', chapterData.chapterName);
        formData.append('chapter_num', chapterData.chapterNum);
        formData.append('price', chapterData.price);

        try {
            const response = await fetch(addChapterUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) throw new Error('Failed to add chapter');
            setSnackbarMessage('Chapter added successfully!');
            setSnackbarOpen(true);
            setIsAddChapterModalVisible(false);
            setChapterData({ bookId: '', chapterName: '', chapterNum: '', file: null , price: '' });
            fetchChapters(chapterData.bookId);
        } catch (error) {
            setSnackbarMessage("Failed: " + error);
            setSnackbarOpen(true);
        }
    };

    const fetchPublishedBooks = async () => {
        try {
            const response = await fetch(getPublisherBooksUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Failed to fetch published books');
            const data = await response.json();
            if (data.code === 200) {
                setPublishedBooks(data.message); 
            } else {
                setSnackbarMessage('Error fetching books: ' + data.message);
                setSnackbarOpen(true);
            }
        } catch (error) {
            setSnackbarMessage("Failed to fetch books: " + error);
            setSnackbarOpen(true);
        }
    };

    const fetchChapters = async (bookId: string) => {
    try {
        const response = await fetch(getChaptersUrl(bookId), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error('Failed to fetch chapters');
        const data = await response.json();
        if (data.code === 200) {
            // Sắp xếp các chương theo chapter_num
            const sortedChapters = data.message.sort((a: Chapter, b: Chapter) => {
                return parseInt(a.chapter_num) - parseInt(b.chapter_num);
            });
            setChaptersMap(prev => ({ ...prev, [bookId]: sortedChapters }));
        } else {
            setSnackbarMessage('Error fetching chapters: ' + data.message);
            setSnackbarOpen(true);
        }
    } catch (error) {
        setSnackbarMessage("Failed to fetch chapters: " + error);
        setSnackbarOpen(true);
    }
};

    useEffect(() => {
        fetchPublishedBooks(); 
    }, []);

    const openAddChapterModal = (bookId: string) => {
        setChapterData({ ...chapterData, bookId });
        fetchChapters(bookId);
        setIsAddChapterModalVisible(true);
    };

    const toggleChapters = (bookId: string) => {
        if (chaptersMap[bookId]) {
            setChaptersMap(prev => ({
                ...prev,
                [bookId]: prev[bookId].length ? [] : prev[bookId],
            }));
        } else {
            fetchChapters(bookId);
        }
    };
    const deleteBook = async (bookId: string) => {
    const deleteBookUrl = `https://ltwbe.hcmutssps.id.vn/api/publisher/delelteBook?book_id=${bookId}`;

    try {
        const response = await fetch(deleteBookUrl, {
            method: 'DELETE', // Sử dụng phương thức DELETE
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error('Failed to delete book');
        setSnackbarMessage('Book deleted successfully!');
        setSnackbarOpen(true);
        fetchPublishedBooks(); // Cập nhật lại danh sách truyện
    } catch (error) {
        setSnackbarMessage("Failed to delete book: " + error);
        setSnackbarOpen(true);
    }
    };
   const deleteChapter = async (chapterId: string, bookId:string) => {
    const deleteChapterUrl = `https://ltwbe.hcmutssps.id.vn/api/publisher/deleteChapter?chapter_id=${chapterId}`;
    try {
        const response = await fetch(deleteChapterUrl, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error('Failed to delete chapter');

        setSnackbarMessage('Chapter deleted successfully!');
        setSnackbarOpen(true);
        
        // Cập nhật lại danh sách chương
         fetchChapters(bookId); // Hàm này cần được định nghĩa để lấy lại danh sách chương
    } catch (error) {
        setSnackbarMessage(`Error: ${error}`);
        setSnackbarOpen(true);
    }
};

    return (
             <>
    <div className="container">
        <h1>Publisher Dashboard</h1>
        <button onClick={() => setIsPublishModalVisible(true)}>Publish New Book</button>

        <h2>Published Books</h2>
        <div>
            {publishedBooks.map(item => (
                <div key={item.id} className="book-item">
                    <img src={item.image_url} alt={item.name} className="book-image" />
                    <h3>{item.name}</h3>
                    <p>Category: {item.category}</p>
                    <p>Views: {item.view}</p>
                    <p>Followers: {item.follow}</p>
                    <button onClick={() => toggleChapters(item.id)}>
                        {chaptersMap[item.id] && chaptersMap[item.id].length ? 'Hide Chapters' : 'Show Chapters'}
                    </button>
                    <button onClick={() => openAddChapterModal(item.id)}>Add Chapter</button>
                    <button className="delete" onClick={() => deleteBook(item.id)}>Delete Book</button>
                    {chaptersMap[item.id] && chaptersMap[item.id].length >= 0 && (
                        <div className="chapters">
                            <h2>Chapters</h2>
                            {chaptersMap[item.id].length === 0 ? (
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
                                        {chaptersMap[item.id].map(chapter => (
                                            <tr key={chapter.id}>
                                                <td>{chapter.chapter_num}</td>
                                                <td>{chapter.chapter_name}</td>
                                                <td>{chapter.price}</td>
                                                <td>
                                                    <Link href={`/chapter/${item.id}/${chapter.chapter_num}`}>
                                                        <button>Read</button>
                                                    </Link>
                                                    <button className="delete" onClick= {()=> deleteChapter(chapter.id, item.id )}>Delete Chapter</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>

        {isPublishModalVisible && (
            <div className="modal">
                <h2>Publish New Book</h2>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={bookData.name} 
                    onChange={(e) => setBookData({ ...bookData, name: e.target.value })} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Category" 
                    value={bookData.category} 
                    onChange={(e) => setBookData({ ...bookData, category: e.target.value })} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Image URL" 
                    value={bookData.image_url} 
                    onChange={(e) => setBookData({ ...bookData, image_url: e.target.value })} 
                    required 
                />
                <button onClick={handlePublishBook}>Publish</button>
                <button onClick={() => setIsPublishModalVisible(false)}>Close</button>
            </div>
        )}

        {isAddChapterModalVisible && (
            <div className="modal">
                <h2>Add Chapter</h2>
                <input 
                    type="text" 
                    placeholder="Chapter Name" 
                    value={chapterData.chapterName}
                    onChange={(e) => setChapterData({ ...chapterData, chapterName: e.target.value })} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Chapter Number" 
                    value={chapterData.chapterNum}
                    onChange={(e) => setChapterData({ ...chapterData, chapterNum: e.target.value })} 
                    required 
                />
                <input 
                    type="number" 
                    placeholder="Price" 
                    value={chapterData.price}
                    onChange={(e) => setChapterData({ ...chapterData, price: e.target.value })} 
                    required 
                />
                <input 
                    title="file"
                    type="file"
                    accept=".txt"
                    onChange={(e) => {
                        if (e.target.files) {
                            //@ts-ignore
                            setChapterData({ ...chapterData, file: e.target.files[0] });
                                
                            
                        }
                    }}
                    required
                />
                <button onClick={handleAddChapter}>Add Chapter</button>
                <button onClick={() => setIsAddChapterModalVisible(false)}>Close</button>
            </div>
        )}

        {snackbarOpen && (
            <div className="snackbar">
                <p>{snackbarMessage}</p>
                <button onClick={() => setSnackbarOpen(false)}>Close</button>
            </div>
        )}
    </div>
</>


    );
}

export default Publisher;