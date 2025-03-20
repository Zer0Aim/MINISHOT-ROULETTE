import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import StyleBtn from "../ui/styleBtn";

const StartScreen = ({ screen, setScreen, playerName, setPlayerName }) => {
  const handlePlay = () => {
    setScreen("name");
  };

  const handleStartGame = () => {
    if (playerName === "") {
      alert("You can't be nameless...");
      return;
    }
    setScreen("game");
  };

  if (screen === "start") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Minishot Roulette</Text>
        <Text style={styles.subtitle}>
          A really stripped down version of Buckshot Roulette
        </Text>
        <StyleBtn title="Play" onPress={handlePlay} />
      </View>
    );
  } else if (screen === "name") {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Enter Your Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPlayerName}
          value={playerName}
          placeholder="Your Name"
        />
        <StyleBtn title="Start" onPress={handleStartGame} />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 64,
    position: "center",
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    fontFamily: "Impact",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    fontFamily: "Impact",
  },
  label: {
    fontSize: 20,
    color: "white",
    marginBottom: 10,
    fontFamily: "Impact",
  },
  input: {
    fontSize: 16,
    width: 200,
    height: 60,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "white",
  },
});

export default StartScreen;
