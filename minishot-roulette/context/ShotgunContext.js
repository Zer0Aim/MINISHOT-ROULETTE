import React, { createContext, useState, useEffect } from "react";

export const ShotgunContext = createContext();

export const ShotgunProvider = ({ children }) => {
  const [shells, setShells] = useState([]);
  const [currTurn, setCurrTurn] = useState("player");
  const [shotgunLoaded, setShotgunLoaded] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [dealerChoice, setDealerChoice] = useState("");
  const [isDealerTurn, setIsDealerTurn] = useState(false);

  useEffect(() => {
    if (currTurn === "dealer" && !gameOver && !isDealerTurn) {
      setIsDealerTurn(true);
      const dealerTurnTimeout = setTimeout(() => {
        if (gameOver) {
          setIsDealerTurn(false);
          return;
        }
        if (shells.length === 0) {
          setMessage("The chamber is empty...");
          if (!gameOver) {
            resetRound();
          }
          setIsDealerTurn(true);
          return;
        }

        const isLive = shells[0];
        const remainingShells = shells.slice(1);
        setShells(remainingShells);

        const choice = Math.random() < 0.5 ? "player" : "dealer";
        setDealerChoice(
          `Dealer shoots ${choice === `player` ? `you` : `itself`}`
        );
        setMessage(
          choice === "player" ? "Dealer shoots you" : "Dealer shoots itself"
        );

        const choiceTimeout = setTimeout(() => {
          setDealerChoice("");
          if (choice === "player") {
            if (isLive) {
              setMessage("You are dead.");
              setGameOver(true);
            } else {
              setMessage("The dealer shot you with a blank...");
              setCurrTurn("player");
            }
          } else if (choice === "dealer") {
            if (isLive) {
              setMessage("The dealer shot itself with a live round.");
              setGameOver(true);
            } else {
              setMessage("The dealer shot itself with a blank round...");
              setCurrTurn("dealer");
            }
          }

          if (shells.length === 0 && !gameOver) {
            setMessage("The chamber is empty...");
            resetRound();
          }

          setIsDealerTurn(false);
        }, 2500);

        return () => clearTimeout(choiceTimeout);
      }, 1500);

      return () => clearTimeout(dealerTurnTimeout);
    }
  }, [currTurn, gameOver, shells]);

  const loadShotgun = () => {
    //Holy shit I got all live rounds while testing it
    // const shellCount = Math.floor(Math.random() * (8 - 2 + 1)) + 2;
    // const newShells = Array.from(
    //   { length: shellCount },
    //   () => Math.random() < 0.5
    // );
    let shellCount = Math.floor(Math.random() * (8 - 2 + 1)) + 2;
    if (shellCount === 2) {
      shellCount = 3;
    }

    const newShells = Array.from(
      { length: shellCount },
      () => Math.random() < 0.5
    );

    if (!newShells.includes(false)) {
      const blankIndex = Math.floor(Math.random() * newShells.length);
      newShells[blankIndex] = false;
    }

    setShells(newShells);
    setShotgunLoaded(true);

    const liveRounds = newShells.filter((shell) => shell).length;
    const blankRounds = newShells.length - liveRounds;

    setMessage(
      `Total rounds: ${newShells.length}\n Live rounds: ${liveRounds}\n blank rounds: ${blankRounds}`
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
        setMessage("The shell is a blank...");
        setCurrTurn("dealer");
        //dealerTurn();
      }
    }

    if (shells.length === 0 && !gameOver) {
      setMessage("The chamber is empty...");
      resetRound();
    }

    // if ((currTurn === "dealer") & !gameOver) {
    //   dealerTurn();
    // }
  };

  // const dealerTurn = () => {
  //   setTimeout(() => {
  //     if (gameOver) {
  //       return;
  //     }
  //     if (shells.length === 0) {
  //       setMessage("The chamber is empty...");
  //       if (!gameOver) {
  //         resetRound();
  //       }
  //       return;
  //     }

  //     const isLive = shells[0];
  //     const remainingShells = shells.slice(1);
  //     setShells(remainingShells);

  //     const choice = Math.random() < 0.5 ? "player" : "dealer";
  //     setDealerChoice(
  //       `Dealer shoots ${choice === `player` ? `you` : `itself`}`
  //     );
  //     setMessage(
  //       choice === "player" ? "Dealer shoots you" : "Dealer shoots itself"
  //     );

  //     setTimeout(() => {
  //       setDealerChoice("");
  //       if (choice === "player") {
  //         if (isLive) {
  //           setMessage("You are dead.");
  //           setGameOver(true);
  //         } else {
  //           setMessage("The dealer shot you with a blank...");
  //           setCurrTurn("player");
  //         }
  //       } else if (choice === "dealer") {
  //         if (isLive) {
  //           setMessage("The dealer shot itself with a live round.");
  //           setGameOver(true);
  //         } else {
  //           setMessage("The dealer shot itself with a blank round...");
  //           dealerTurn();
  //         }
  //       }

  //       if (shells.length === 0 && !gameOver) {
  //         setMessage("The chamber is empty...");
  //         resetRound();
  //       }
  //     }, 1500);

  //     //   if (isLive) {
  //     //     setMessage("The dealer is dead. You live another day...");
  //     //     setGameOver(true);
  //     //   } else {
  //     //     setMessage("The round is a blank...");
  //     //     setCurrTurn("player");
  //     //   }

  //     //   if (shells.length === 0 && !gameOver) {
  //     //     setMessage("The chamber is empty...");
  //     //     resetRound();
  //     //   }
  //   }, 1500);
  // };

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
