// src/Publisher.js
'use client'
import { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import "@/resource/styles/Publisher.css";

const Publisher = () => {
    const [isPublishModalVisible, setIsPublishModalVisible] = useState(false);
    const [isAddChapterModalVisible, setIsAddChapterModalVisible] = useState(false);
    const [bookData, setBookData] = useState({ name: '', category: '', image_url: '' });
    const [chapterData, setChapterData] = useState({ bookId: '', chapterTitle: '', content: '' });
    
    const publishNewBookUrl = 'https://ltwbe.hcmutssps.id.vn/api/publisher/publishNewBook';
    const addChapterUrl = 'https://ltwbe.hcmutssps.id.vn/api/publisher/addChapter';

    const getCookie = (name: string) => {
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
            message.success('Book published successfully!');
            setIsPublishModalVisible(false);
            setBookData({ name: '', category: '', image_url: '' }); // Reset form
        } catch (error) {
            message.error("Failed"+error);
        }
    };

    const handleAddChapter = async () => {
        try {
            const response = await fetch(addChapterUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(chapterData),
            });

            if (!response.ok) throw new Error('Failed to add chapter');
            message.success('Chapter added successfully!');
            setIsAddChapterModalVisible(false);
            setChapterData({ bookId: '', chapterTitle: '', content: '' }); // Reset form
        } catch (error) {
            message.error("Failed"+error);
        }
    };

    return (
        <div>
            <h1>Publisher Dashboard</h1>
            <Button type="primary" onClick={() => setIsPublishModalVisible(true)}>Publish New Book</Button>
            <Button type="primary" onClick={() => setIsAddChapterModalVisible(true)}>Add Chapter</Button>

            {/* Modal để Publish New Book */}
            <Modal
                title="Publish New Book"
                visible={isPublishModalVisible}
                onCancel={() => setIsPublishModalVisible(false)}
                footer={null}
            >
                <Form layout="vertical" onFinish={handlePublishBook}>
                    <Form.Item label="Name">
                        <Input 
                            value={bookData.name}
                            onChange={(e) => setBookData({ ...bookData, name: e.target.value })}
                            required
                        />
                    </Form.Item>
                    <Form.Item label="Category">
                        <Input 
                            value={bookData.category}
                            onChange={(e) => setBookData({ ...bookData, category: e.target.value })}
                            required
                        />
                    </Form.Item>
                    <Form.Item label="Image URL">
                        <Input 
                            value={bookData.image_url}
                            onChange={(e) => setBookData({ ...bookData, image_url: e.target.value })}
                            required
                        />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Publish</Button>
                </Form>
            </Modal>

            {/* Modal để Add Chapter */}
            <Modal
                title="Add Chapter"
                visible={isAddChapterModalVisible}
                onCancel={() => setIsAddChapterModalVisible(false)}
                footer={null}
            >
                <Form layout="vertical" onFinish={handleAddChapter}>
                    <Form.Item label="Book ID">
                        <Input 
                            value={chapterData.bookId}
                            onChange={(e) => setChapterData({ ...chapterData, bookId: e.target.value })}
                            required
                        />
                    </Form.Item>
                    <Form.Item label="Chapter Title">
                        <Input 
                            value={chapterData.chapterTitle}
                            onChange={(e) => setChapterData({ ...chapterData, chapterTitle: e.target.value })}
                            required
                        />
                    </Form.Item>
                    <Form.Item label="Content">
                        <Input.TextArea 
                            value={chapterData.content}
                            onChange={(e) => setChapterData({ ...chapterData, content: e.target.value })}
                            required
                        />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Add Chapter</Button>
                </Form>
            </Modal>
        </div>
    );
}

export default Publisher;