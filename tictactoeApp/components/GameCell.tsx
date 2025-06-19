import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type GameCellProps = {
  value: string | null;
  onPress: () => void;
  size: number;
};

const GameCell = ({ value, onPress, size }: GameCellProps) => (
  <TouchableOpacity
    style={[styles.cell, { width: size, height: size }]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={styles.cellText}>{value}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cell: {
    backgroundColor: "#f3f3f3",
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
  },
  cellText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
});

export default GameCell;
