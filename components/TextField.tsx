import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  content: string;
};

const TextField = (props: Props) => {
  const { label, content } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default TextField;
