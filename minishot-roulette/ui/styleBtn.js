import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const StyleBtn = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2e2118",
    paddingVertical: 10,
    paddingHorizontal: 14,
    margin: 2,
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Impact",
  },
});

export default StyleBtn;
