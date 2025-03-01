import React, { useState, useEffect } from "react";
import './GameCard.css'

// List of random cities to use as incorrect answers
const allCities = [
    "London", "Sydney", "Dubai", "Rio de Janeiro", "Cairo", "Bangkok", "Toronto",
    "Cape Town", "Rome", "New Delhi", "Moscow", "Mexico City", "Buenos Aires",
    "Seoul", "Istanbul", "Athens", "Singapore", "Marrakech", "Prague", "Hanoi"
];

const GameCard = ({ question, checkAnswer }) => {
    const [shuffledOptions, setShuffledOptions] = useState([]);

    useEffect(() => {
        if (question) {
            setShuffledOptions(generateOptions(question.city));
        }
    }, [question]); // Shuffle only when a new question loads

    const generateOptions = (correctCity) => {
        // Filter out the correct city
        const wrongCities = allCities.filter(city => city !== correctCity);
        // Randomly pick 3 incorrect answers
        const wrongAnswers = wrongCities.sort(() => 0.5 - Math.random()).slice(0, 3);
        // Combine and shuffle options
        return shuffle([...wrongAnswers, correctCity]);
    };

    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    return (
        <div className="game-card">
            <h2>Guess the Destination</h2>
            <p className="clue">{question.clues[0]}</p>
            <div className="options">
                {shuffledOptions.map((opt, i) => (
                    <button key={i} className="option-button" onClick={() => checkAnswer(opt)}>
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default GameCard;
