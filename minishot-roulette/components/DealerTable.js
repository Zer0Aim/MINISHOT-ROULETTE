import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { ShotgunContext } from "../context/ShotgunContext";
import StyleBtn from "../ui/styleBtn";

const DealerTable = ({ playerName }) => {
  const {
    currTurn,
    shotgunLoaded,
    gameOver,
    message,
    loadShotgun,
    shoot,
    resetGame,
  } = useContext(ShotgunContext);

  const displayTurn = () => {
    if (currTurn === "player") {
      return `${playerName}'s turn.`;
    } else {
      return "Dealer's turn.";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{displayTurn()}</Text>
      <Text style={styles.message}>{message}</Text>

      {!shotgunLoaded && !gameOver && (
        <StyleBtn title="Load Shotgun" onPress={loadShotgun} />
      )}

      {shotgunLoaded && currTurn === "player" && !gameOver && (
        <View style={styles.buttonContainer}>
          <StyleBtn title="Shoot Self" onPress={() => shoot("player")} />
          <StyleBtn title="Shoot Dealer" onPress={() => shoot("dealer")} />
        </View>
      )}

      {gameOver && <StyleBtn title="Reset Game" onPress={resetGame} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 20,
  },
});

export default DealerTable;
