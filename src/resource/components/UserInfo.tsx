import '@/resource/styles/UserInfo.css';

const UserInfo = () => {
    return (
        <div className="user-info-container">
            <div className="user-info-header">
                <img src="https://placehold.co/100x100" alt="User  profile picture" className="user-profile-picture"/>
                <div>
                    <h1 className="user-name">John Doe</h1>
                    <p className="user-email">john.doe@example.com</p>
                </div>
            </div>
            <div className="userinfo">
                <div className="favorite-novels">
                <h2 className="favorite-novels-title">Favorite Novels</h2>
                <ul className="mt-4 space-y-4">
                    <li className="novel-item">
                        <img src="https://placehold.co/50x50" alt="Cover of novel 1" className="novel-cover"/>
                        <div>
                            <h3 className="novel-title">Novel Title 1</h3>
                            <p className="novel-author">Author 1</p>
                        </div>
                    </li>
                    <li className="novel-item">
                        <img src="https://placehold.co/50x50" alt="Cover of novel 2" className="novel-cover"/>
                        <div>
                            <h3 className="novel-title">Novel Title 2</h3>
                            <p className="novel-author">Author 2</p>
                        </div>
                    </li>
                    <li className="novel-item">
                        <img src="https://placehold.co/50x50" alt="Cover of novel 3" className="novel-cover"/>
                        <div>
                            <h3 className="novel-title">Novel Title 3</h3>
                            <p className="novel-author">Author 3</p>
                        </div>
                    </li>
                </ul>
                </div>
                <div className="info">
                    <h2 className="favorite-novels-title">Information</h2>
                    <p className="info-text">User Name: John Doe</p>
                    <p className="info-text">Email: john.doe@example.com</p>
                    <p className="info-text">Sex: Male</p>
                    <p className="info-text">Date of birth: 02/04/1995</p>
                    <p className="info-text">VIP level: 1</p>
                 </div>
            </div>
           
            
            <div className="user-statistics">
                <h2 className="statistics-title">User  Statistics</h2>
                <div className="statistics-grid">
                    <div className="statistics-card">
                        <h3 className="statistics-card-title">Novels Read</h3>
                        <p className="statistics-card-value">15</p>
                    </div>
                    <div className="statistics-card">
                        <h3 className="statistics-card-title">Comments</h3>
                        <p className="statistics-card-value">45</p>
                    </div>
                    <div className="statistics-card">
                        <h3 className="statistics-card-title">Likes</h3>
                        <p className="statistics-card-value">120</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;