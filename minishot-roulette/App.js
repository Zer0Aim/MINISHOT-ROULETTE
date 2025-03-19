import React from "react";
import { StyleSheet, View } from "react-native";

import { ShotgunProvider } from "./context/ShotgunContext";
import DealerTable from "./components/DealerTable";

export default function App() {
  return (
    <ShotgunProvider>
      <View style={styles.cont}>
        <DealerTable />
      </View>
    </ShotgunProvider>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
