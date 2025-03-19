import React, { createContext, useSState} from "react";

export const ShotgunContext = createContext();

export ShotgunProvider = ({ children }) => {
    const [shells, setShells] = useState([]);
    const [currTurn, setCurrTurn ] = useState("player");
    const [shotgunLoaded, setShotgunLoaded] = useState(false);
    const [gameOver, setGameOver] = useSState(false);
    const [message,, setMessage] = useState("");

    const loadShotgun = () => {
        const shellCount = Math.floor(Math.random() * (8 - 2 + 1)) + 2;
        const newShell = Array.from({length : shellCount } , () => Math.random() < 0.5);
        setShells(newShell);
        setShotgunLoaded(true);

        
    }
}