import'@/resource/styles/NovelDetail.css';
import Link from 'next/link';

const NovelDetail = () => {
    return (
        <div className="container">
             <h1 className="title">The Enchanted Realm</h1>
            <div className="container-about">
                <div className="comic-img">
                <img src="https://i.pinimg.com/originals/7d/3a/a0/7d3aa0f4589e61f4279ea15b74071761.jpg" alt="The Enchanted Realm" className="coverImage" />
                </div>
            
                <div className="summary">
                    <div className="synopsis">
                <h2>Synopsis</h2>
                <p>
                    In a world where magic reigns supreme, a young sorceress embarks on a quest to uncover the truth about her mysterious lineage.
                    As she battles dark forces and uncovers hidden secrets, she must decide who to trust and what sacrifices to make.
                        </p>
                        <h2>Rating</h2>
                <p>⭐⭐⭐⭐☆ (4.5/5 based on 200 ratings)</p>
                    </div>
                    <div className="comic-info">
                    <div className="details">
                <p><strong>Genres:</strong> Fantasy, Adventure, Romance</p>
                <p><strong>Status:</strong> Ongoing</p>
                <p><strong>Last Updated:</strong> November 10, 2024</p>
                <p><strong>Total Chapters:</strong> 25</p>
                    <div className="authorInfo">
                <p className="author">Author: <a href="/author/jane-doe">Jane Doe</a></p>
                <button className="followButton">Follow Author</button>
            </div>
                    </div></div>
                 
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
                <p>Thank you for reading! Your support means the world to me. Please leave feedback and let me know your thoughts!</p>
            </div>
            <div className="comments">
                <h2>Comments</h2>
                <p>Readers can leave comments and discuss chapters.</p>
            </div>

           

            

            <div className="relatedNovels">
    <h2>Related Novels</h2>
    <div className="relatedNovelsList">
        <div className="relatedNovel">
            <img src="https://th.bing.com/th/id/OIP.gwmMot1o-z5maenRor2kqQHaE8?w=250&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="The Lost Kingdom" className="relatedCoverImage" />
            <br></br>
                        <Link href="#">Meow Meow Meow</Link>
        </div>
        <div className="relatedNovel">
            <img src="https://th.bing.com/th/id/OIP.gwmMot1o-z5maenRor2kqQHaE8?w=250&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Sorceress of the North" className="relatedCoverImage" />
            <br></br>
                        <Link href="#">Meow Meow Meow</Link>
        </div>
        <div className="relatedNovel">
            <img src="https://th.bing.com/th/id/OIP.gwmMot1o-z5maenRor2kqQHaE8?w=250&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Chronicles of the Mystic Realm" className="relatedCoverImage" />
            <br></br>
                        <Link href="#">Meow Meow Meow</Link>
        </div>
                    
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