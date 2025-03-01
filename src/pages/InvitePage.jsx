import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './InvitePage.css';

const InvitePage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const inviter = searchParams.get("user") || "Someone";
    const inviterScore = searchParams.get("score") || "0";

    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 3000);
    }, [navigate]);

    return (
        <div className="invite-container">
            <h2>{inviter ? `${inviter} has challenged you!` : 'Invalid Invite Link'}</h2>
            {inviterScore !== null ? <p>Their Score: {inviterScore} / 10</p> : <p>Loading...</p>}
            <p>Redirecting to the game...</p>
        </div>
    );
};

export default InvitePage;
