import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { ShotgunContext } from "../context/ShotgunContext";

const DealerTable = () => {
  const {
    currTurn,
    shotgunLoaded,
    gameOver,
    message,
    loadShotgun,
    shoot,
    resetGame,
  } = useContext(ShotgunContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Turn: {currTurn}</Text>
      <Text style={styles.message}>{message}</Text>

      {!shotgunLoaded && !gameOver && (
        <Button title="Load Shotgun" onPress={loadShotgun} />
      )}

      {shotgunLoaded && currTurn === "player" && !gameOver && (
        <View style={styles.buttonContainer}>
          <Button title="Shoot Self" onPress={() => shoot("player")} />
          <Button title="Shoot Dealer" onPress={() => shoot("dealer")} />
        </View>
      )}

      {gameOver && <Button title="Reset Game" onPress={resetGame} />}
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
