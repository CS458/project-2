import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SurveyForm from "../components/SurveyForm";

interface Props {}

const Survey = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Survey</Text>
      </View>
      <SurveyForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "coral",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Survey;
