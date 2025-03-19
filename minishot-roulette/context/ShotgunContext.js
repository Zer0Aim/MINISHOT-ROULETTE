import React, { createContext, useState } from "react";

export const ShotgunContext = createContext();

export const ShotgunProvider = ({ children }) => {
  const [shells, setShells] = useState([]);
  const [currTurn, setCurrTurn] = useState("player");
  const [shotgunLoaded, setShotgunLoaded] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  const loadShotgun = () => {
    const shellCount = Math.floor(Math.random() * (8 - 2 + 1)) + 2;
    const newShells = Array.from(
      { length: shellCount },
      () => Math.random() < 0.5
    );
    setShells(newShells);
    setShotgunLoaded(true);

    const liveRounds = newShells.filter((shell) => shell).length;
    const dudRounds = newShells.length - liveRounds;

    setMessage(
      `Total rounds: ${newShells.length}, Live rounds: ${liveRounds}, Dud rounds: ${dudRounds}`
    );
  };

  const shoot = (target) => {
    if (!shotgunLoaded || shells.length === 0) {
      setMessage("No rounds in chamber...");
      if (!gameOver) {
        resetRound();
      }
    }

    const isLive = shells[0];
    const remainingShells = shells.slice(1);
    setShells(remainingShells);

    if (target === "player") {
      if (isLive) {
        setMessage("You are dead.");
        setGameOver(true);
      } else {
        setMessage("You live...");
      }
    } else if (target === "dealer") {
      if (isLive) {
        setMessage("The dealer is dead. You live another day...");
        setGameOver(true);
      } else {
        setMessage("The shell is a dud...");
        setCurrTurn("dealer");
      }
    }

    if (shells.length === 0 && !gameOver) {
      setMessage("The chamber is empty...");
      resetRound();
    }

    if ((currTurn === "dealer") & !gameOver) {
      dealerTurn();
    }
  };

  const dealerTurn = () => {
    setTimeout(() => {
      if (gameOver) {
        return;
      }
      if (shells.length === 0) {
        setMessage("The chamber is empty...");
        if (!gameOver) {
          resetRound();
        }
        return;
      }

      const isLive = shells[0];
      const remainingShells = shells.slice(1);
      setShells(remainingShells);

      if (isLive) {
        setMessage("The dealer is dead. You live another day...");
        setGameOver(true);
      } else {
        setMessage("The round is a dud...");
        setCurrTurn("player");
      }

      if (shells.length === 0 && !gameOver) {
        setMessage("The chamber is empty...");
        resetRound();
      }
    }, 1500);
  };

  const resetGame = () => {
    setShells([]);
    setCurrTurn("player");
    setShotgunLoaded(false);
    setGameOver(false);
    setMessage("");
  };

  const resetRound = () => {
    setShells([]);
    setShotgunLoaded(false);
    setMessage("Reloading shotgun...");
  };

  const value = {
    shells,
    currTurn,
    shotgunLoaded,
    gameOver,
    message,
    loadShotgun,
    shoot,
    resetGame,
    resetRound,
  };

  return (
    <ShotgunContext.Provider value={value}>{children}</ShotgunContext.Provider>
  );
};
