import { createContext, useContext, useState } from 'react';

const GameContext = createContext();
export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    const [score, setScore] = useState(0);
    const [username, setUsername] = useState('');

    return (
        <GameContext.Provider value={{ score, setScore, username, setUsername }}>
            {children}
        </GameContext.Provider>
    );
};
