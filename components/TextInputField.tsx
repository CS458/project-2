import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, InputProps } from "react-native-elements";

export type Props = {
  label: string;
} & InputProps;

const TextInputField = (props: Props) => {
  const { label, ...rest } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Input autoCapitalize={"words"} {...rest} />
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

export default TextInputField;
