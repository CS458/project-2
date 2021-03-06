import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import { ButtonGroup, ButtonGroupProps } from "react-native-elements";
import { GENDERS } from "../config/constants";

type Props = {
  label: string;
  error?: string;
} & ButtonGroupProps;

const GenderSelect = (props: Props) => {
  const { label, error, ...rest } = props;

  return (
    <View style={styles.container} accessible={true}>
      <Text style={styles.label}>{label}</Text>
      <ButtonGroup
        {...rest}
        buttons={GENDERS}
        selectedButtonStyle={styles.buttonGroup}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
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
  buttonGroup: {
    backgroundColor: "coral",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginLeft: 16,
    marginTop: -15,
  },
});

export default GenderSelect;
