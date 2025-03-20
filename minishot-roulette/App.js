import React, { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";

import { ShotgunProvider } from "./context/ShotgunContext";
import DealerTable from "./components/DealerTable";

import StartScreen from "./components/StartScreen";

export default function App() {
  const [screen, setScreen] = useState("start");
  const [playerName, setPlayerName] = useState("");

  const renderScreen = () => {
    if (screen === "game") {
      return (
        <ShotgunProvider>
          <DealerTable playerName={playerName} setScreen={setScreen} />
        </ShotgunProvider>
      );
    } else {
      return (
        <StartScreen
          screen={screen}
          setScreen={setScreen}
          playerName={playerName}
          setPlayerName={setPlayerName}
        />
      );
    }
  };

  return (
    <ImageBackground
      source={require("./assets/images/background.png")}
      style={styles.background}
    >
      <BlurView intensity={80} style={styles.blurContainer}>
        <View style={styles.cont}>{renderScreen()}</View>
      </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});
