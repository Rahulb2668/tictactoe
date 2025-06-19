import React, { useEffect } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const userString = await AsyncStorage.getItem("user");
      if (!userString) {
        router.replace("/login"); // Use absolute path
      }
    };
    checkUser();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome to TicTacToe!</Text>
      {/* ...rest of your home page... */}
    </View>
  );
}
