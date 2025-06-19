import React from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import { useGameStore } from "@/store/gameStore";
import GameCell from "./GameCell";

const BOARD_SIZE = Math.min(Dimensions.get("window").width, 360) - 32;
const CELL_SIZE = BOARD_SIZE / 3 - 6; // 6 for margin

const GameBoard = () => {
  const { cells, markCell, currentPlayer, resetgame, loading } = useGameStore();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.playerText}>Player: {currentPlayer}</Text>
        {loading && <Text style={styles.loadingText}>AI Thinking...</Text>}
      </View>
      <View style={[styles.board, { width: BOARD_SIZE, height: BOARD_SIZE }]}>
        {cells.map((value, index) => (
          <GameCell
            key={index}
            value={value}
            onPress={() => markCell(index)}
            size={CELL_SIZE}
          />
        ))}
      </View>
      <Button title="Reset Game" onPress={resetgame} color="#22c55e" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center", flex: 1 },
  header: { flexDirection: "row", gap: 16, marginBottom: 16 },
  playerText: { fontSize: 18, fontWeight: "500" },
  loadingText: { marginLeft: 10, color: "#888" },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 24,
    backgroundColor: "#eee",
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default GameBoard;
