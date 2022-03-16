import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Success = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="md-checkmark-circle" size={32} color="green" />
      <Text style={styles.successText}>Success!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  successText: {
    color: "green",
  },
});

export default Success;
