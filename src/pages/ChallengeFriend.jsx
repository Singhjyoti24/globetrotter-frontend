import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import './ChallengeFriend.css';

const ChallengeFriend = () => {
    const [username, setUsername] = useState('');
    const [shareLink, setShareLink] = useState('');
    const navigate = useNavigate();
    const { score } = useGame();

    const registerUser = async () => {
        if (!username.trim()) return alert('Please enter a username');

        try {
            await axios.post('https://globetrotter-backend-pnxh.onrender.com/api/users/register', {
                username: username.trim(),
                score: Number(score),
            });

            generateShareableLink();
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Failed to register user.');
        }
    };

    const generateShareableLink = () => {
        const link = `${window.location.origin}/invite?user=${encodeURIComponent(username)}&score=${score}`;
        setShareLink(link);
    };

    const shareOnWhatsApp = () => {
        const message = `🚀 *${username}* has challenged you in the *Globetrotter Game!* 🌍
    
    🏆 Their Score: *${score} / 10*
    
    Click the link below to accept the challenge and beat their score! 👇
    
    🔗 ${shareLink}`;
        //     window.open(`https://wa.me/?text=🌍%20${username}%20has%20challenged%20you!%20Try%20to%20beat%20their%20score%20of%20${score}/10!%20Play%20now:%20${inviteLink}`, "_blank");
        // };
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="challenge-container">
            <h2>Challenge a Friend</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
            />

            <div className="button-container">
                <button className="challenge-button" onClick={registerUser}>
                    Invite Friend
                </button>
                <button className="challenge-button" onClick={() => navigate('/')}>
                    Back to Home
                </button>
            </div>
            {shareLink && (
                <div>
                    <p>Share this link with your friend:</p>
                    <input type="text" value={shareLink} readOnly />
                    <button onClick={shareOnWhatsApp}>Share via WhatsApp</button>
                </div>
            )}

        </div>
    );
};

export default ChallengeFriend;
