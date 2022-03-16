import React from "react";
import { Text, Button, View, StyleSheet } from "react-native";
import { ROUTES } from "../config/routes";

const GettingStarted = (props: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Covid-19 Survey</Text>
      <View style={styles.madeBy}>
        <Text style={styles.madeByHeader}>Made By:</Text>
        <Text style={styles.name}>Osama Tanveer</Text>
        <Text style={styles.name}>Mannan Abdul</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color="coral"
          title="Start Survey"
          onPress={() => {
            props.navigation.push(ROUTES.Survey);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
  },
  madeBy: {},
  madeByHeader: {
    fontSize: 18,
    fontWeight: "700",
  },
  name: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default GettingStarted;
