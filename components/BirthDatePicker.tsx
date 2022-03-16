import moment from "moment";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const BirthDatePicker = (props: { validateBirthDate: any }) => {
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [birthDate, setBirthDate] = useState<any>("Not Set");
  const [birthDateError, setBirthDateError] = useState("");

  const datePickerValue =
    birthDate !== "Not Set" ? moment(birthDate).toDate() : new Date();

  return (
    <View style={styles.container}>
      <Text style={styles.birthDate}>Birth Date</Text>
      <Text style={styles.birthDateValue} onPress={() => setIsDatePicker(true)}>
        {moment(birthDate).isValid()
          ? moment(birthDate).format("DD/MM/YYYY")
          : "Not Set"}
      </Text>
      {isDatePicker ? (
        <RNDateTimePicker
          mode="date"
          value={datePickerValue}
          maximumDate={new Date()}
          onChange={(event: DateTimePickerEvent, date: Date | undefined) => {
            // It is important to set the state here and then set the date, otherwise the date picker will open twice because of rerender queue
            setIsDatePicker(false);
            if (event.type === "set") {
              setBirthDate(date);
              setBirthDateError("");
            } else {
              setBirthDate("Not Set");
              setBirthDateError("Birth Date is required.");
            }
          }}
          onError={(error: Error) => console.error(error)}
        />
      ) : null}
      <Text style={birthDateError ? styles.error : styles.noError}>
        {birthDateError}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 18,
  },
  birthDate: {
    fontSize: 18,
    marginLeft: 10,
  },
  birthDateValue: {
    fontSize: 18,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    margin: 10,
    color: "grey",
  },
  noError: {
    display: "none",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginLeft: 10,
    marginTop: -5,
  },
});

export default BirthDatePicker;
