import React, { useState, useEffect } from 'react';
import { fetchQuestion, checkAnswer } from '../services/api';
import { useGame } from '../context/GameContext';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard';
import './Home.css';

const allCities = [
    "London", "Sydney", "Dubai", "Rio de Janeiro", "Cairo", "Bangkok", "Toronto",
    "Cape Town", "Rome", "New Delhi", "Moscow", "Mexico City", "Buenos Aires",
    "Seoul", "Istanbul", "Athens", "Singapore", "Marrakech", "Prague", "Hanoi"
];

const Home = () => {
    const { score, setScore } = useGame();
    const [question, setQuestion] = useState(null);
    const [options, setOptions] = useState([]);
    const [feedback, setFeedback] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [answered, setAnswered] = useState(false);
    const [questionCount, setQuestionCount] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [inviterScore, setInviterScore] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedScore = localStorage.getItem('inviterScore');
        if (storedScore) {
            setInviterScore(storedScore);
            localStorage.removeItem('inviterScore'); // Remove so it's only shown once
        }
        loadNewQuestion();
    }, []);

    const generateOptions = (correctCity) => {
        const wrongCities = allCities.filter(city => city !== correctCity);
        const wrongAnswers = wrongCities.sort(() => Math.random() - 0.5).slice(0, 3);
        return shuffleOptions([...wrongAnswers, correctCity]);
    };

    const shuffleOptions = (options) => {
        return [...options].sort(() => Math.random() - 0.5);
    };

    const loadNewQuestion = async () => {
        if (questionCount > 10) {
            setGameOver(true);
            return;
        }

        const newQuestion = await fetchQuestion();
        setQuestion(newQuestion);
        setOptions(generateOptions(newQuestion.city));
        setFeedback(null);
        setShowConfetti(false);
        setAnswered(false);
    };

    const handleAnswer = async (answer) => {
        if (!question || answered) return;

        setAnswered(true);
        const response = await checkAnswer(question.city, answer);
        setFeedback({ correct: response.correct, funFact: response.fun_fact[0] || 'No fun fact available' });

        if (response.correct) {
            setScore(prevScore => prevScore + 1);
            setShowConfetti(true);
        }
    };

    const handleNextQuestion = () => {
        if (questionCount < 10) {
            setQuestionCount(prevCount => prevCount + 1);
            loadNewQuestion();
        } else {
            setGameOver(true);
        }
    };

    const resetGame = () => {
        setScore(0);
        setQuestionCount(1);
        setGameOver(false);
        loadNewQuestion();
    };

    return (
        <div className="home-container">
            {showConfetti && <Confetti />}
            <h1 className="title">Globetrotter Challenge</h1>

            {inviterScore !== null && (
                <p className="inviter-score">You were challenged! Their score: {inviterScore} / 10</p>
            )}
            <p className="score">Your Score: {score} / 10</p>
            <p className="question-count">Question {questionCount} / 10</p>

            {gameOver ? (
                <div className="game-over">
                    <h2>Game Over!</h2>
                    <p>Your final score: {score} / 10</p>
                    <button className="play-again-button" onClick={resetGame}>Play Again</button>
                    <button className="challenge-button" onClick={() => navigate('/challenge')}>
                        Challenge a Friend
                    </button>
                </div>
            ) : (
                <>
                    {question && <GameCard question={question} options={options} checkAnswer={handleAnswer} feedback={feedback} answered={answered} />}
                    {feedback && (
                        <div className={`feedback ${feedback.correct ? 'correct' : 'incorrect'}`}>
                            {feedback.correct ? '🎉 Correct! ' : '😢 Incorrect! '} {feedback.funFact}
                        </div>
                    )}
                    <div className="button-container">
                        <button className="next-button" onClick={handleNextQuestion} disabled={!answered}>Next</button>
                    </div>
                </>
            )}
        </div>
    );
};
export default Home;
