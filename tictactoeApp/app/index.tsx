import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { useGameStore } from "@/store/gameStore";
import GameBoard from "../components/GameBoard";
import StatsBoard from "../components/StatsBoard";

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);
  const { currentPlayer, startgame, gameStatus, winner, userPlaySymbol } =
    useGameStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated()) {
      router.replace("/login");
    }
  }, [isMounted, router]);

  const handleSignOut = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Welcome to TicTacToe!</Text>
      {!currentPlayer ? (
        <View style={styles.selectContainer}>
          <Text style={styles.selectTitle}>Please select the first player</Text>
          <View style={styles.selectButtons}>
            <TouchableOpacity
              style={[styles.selectButton, { backgroundColor: "#f59e42" }]}
              onPress={() => startgame(false)}
            >
              <Text style={styles.selectButtonText}>I will Play</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.selectButton, { backgroundColor: "#22223b" }]}
              onPress={() => startgame(true)}
            >
              <Text style={[styles.selectButtonText, { color: "#fff" }]}>
                Let Computer Play
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <GameBoard />
          <StatsBoard />
        </>
      )}
      {gameStatus !== "ongoing" && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            {winner
              ? `Game over! Winner is: ${
                  winner === userPlaySymbol ? "You" : "AI"
                }`
              : "Game is a draw"}
          </Text>
        </View>
      )}
      <View style={styles.signoutContainer}>
        <Button title="Sign Out" onPress={handleSignOut} color="#ef4444" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 32,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#222",
  },
  selectContainer: { alignItems: "center", marginBottom: 24 },
  selectTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  selectButtons: { flexDirection: "row", gap: 16 },
  selectButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  selectButtonText: { fontSize: 16, fontWeight: "bold" },
  resultContainer: { marginTop: 24, alignItems: "center" },
  resultText: { fontSize: 22, fontWeight: "bold", color: "#16a34a" },
  signoutContainer: {
    marginTop: 32,
    width: "80%",
    alignSelf: "center",
  },
});
