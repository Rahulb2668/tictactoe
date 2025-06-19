import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useGameStore } from "@/store/gameStore";

const StatsBoard = () => {
  const { getUserGameStats, userGameStats } = useGameStore();
  useEffect(() => {
    const fetchUserGameStats = async () => {
      await getUserGameStats();
    };
    fetchUserGameStats();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>StatsBoard</Text>
      <View style={styles.row}>
        <Text style={styles.headerCell}>Total Games</Text>
        <Text style={styles.headerCell}>Wins</Text>
        <Text style={styles.headerCell}>Draws</Text>
        <Text style={styles.headerCell}>Losses</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>{userGameStats.totalGames}</Text>
        <Text style={styles.cell}>{userGameStats.wins}</Text>
        <Text style={styles.cell}>{userGameStats.draws}</Text>
        <Text style={styles.cell}>{userGameStats.losses}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    color: "#444",
  },
});

export default StatsBoard;
