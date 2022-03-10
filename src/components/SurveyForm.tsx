import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import moment from "moment";
import React, { useCallback, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSurveyForm } from "../hooks/useSurveyForm";

const SurveyForm = () => {
  const [
    birthDate,
    city,
    errors,
    gender,
    nameSurname,
    onBirthDateChange,
    onCityChange,
    onGenderChange,
    onNameSurnameChange,
    onPcrPosCasesAndSymAfterThirdVacChange,
    onSideEffectsAfterVacChange,
    onVaccineTypeAppliedChange,
    pcrPosCasesAndSymAfterThirdVac,
    sideEffectsAfterVac,
    vaccineTypeApplied,
  ] = useSurveyForm();

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const onDatePickerDateChange = useCallback(
    (event: any, selectedDate: any) => {
      if (selectedDate) {
        onBirthDateChange(selectedDate);
      }
      setIsDatePickerVisible(false);
    },
    []
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Text style={styles.label}>Name Surname</Text>
          <TextInput
            placeholder="Name Surname"
            onChangeText={onNameSurnameChange}
            value={nameSurname}
            style={[
              styles.input,
              errors.nameSurname ? styles.invalidInput : styles.validInput,
            ]}
          />
          {errors.nameSurname ? (
            <Text style={styles.errorMessage}>{errors.nameSurname}</Text>
          ) : null}
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.label}>Birth Date</Text>
          <Text
            onPress={() => setIsDatePickerVisible(true)}
            style={styles.birthDateText}
          >
            {birthDate
              ? moment(birthDate.toDateString()).format("DD/MM/YYYY").toString()
              : "Birth Date"}
          </Text>
          {isDatePickerVisible ? (
            <DateTimePicker
              value={birthDate || new Date()}
              mode={isDatePickerVisible && "date"} // hacky fix to make date picker visible
              display="default"
              maximumDate={new Date()}
              onChange={onDatePickerDateChange}
            />
          ) : null}
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.label}>City</Text>
          <TextInput
            placeholder="City"
            onChangeText={onCityChange}
            value={city}
            style={[
              styles.input,
              errors.city ? styles.invalidInput : styles.validInput,
            ]}
          />
          {errors.city ? (
            <Text style={styles.errorMessage}>{errors.city}</Text>
          ) : null}
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.genderPicker}>
            <Text style={styles.label}>Gender</Text>
            <Picker selectedValue={gender} onValueChange={onGenderChange}>
              <Picker.Item
                label="Not Set"
                value="not_set"
                style={[
                  errors.gender ? styles.invalidInput : styles.validInput,
                ]}
              />
              <Picker.Item
                label="Male"
                value="male"
                style={[
                  errors.gender ? styles.invalidInput : styles.validInput,
                ]}
              />
              <Picker.Item
                label="Female"
                value="female"
                style={[
                  errors.gender ? styles.invalidInput : styles.validInput,
                ]}
              />
              <Picker.Item
                label="Rather Not Say"
                value="rather_not_say"
                style={[
                  errors.gender ? styles.invalidInput : styles.validInput,
                ]}
              />
            </Picker>
            {errors.gender ? (
              <Text style={styles.errorMessage}>{errors.gender}</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.label}>Vaccine Type Applied</Text>
          <TextInput
            placeholder="Vaccine Type"
            onChangeText={onVaccineTypeAppliedChange}
            value={vaccineTypeApplied}
            style={[
              styles.input,
              errors.vaccineTypeApplied
                ? styles.invalidInput
                : styles.validInput,
            ]}
          />
          {errors.vaccineTypeApplied ? (
            <Text style={styles.errorMessage}>{errors.vaccineTypeApplied}</Text>
          ) : null}
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.label}>Any side effect after vaccination</Text>
          <TextInput
            placeholder="Side effects"
            onChangeText={onSideEffectsAfterVacChange}
            value={sideEffectsAfterVac}
            style={[styles.input, styles.validInput]}
            multiline
          />
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.label}>
            Any PCR positive cases and Covid-19 symptoms after 3rd vaccination
          </Text>
          <TextInput
            placeholder="Any PCR positive cases and/or Symptoms"
            onChangeText={onPcrPosCasesAndSymAfterThirdVacChange}
            value={pcrPosCasesAndSymAfterThirdVac}
            style={[styles.input, styles.validInput]}
            multiline
          />
        </View>
        <View style={styles.submitButtonContainer}>
          <Button
            title="Send"
            color="coral"
            onPress={() => {
              console.log("pressed");
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  scrollView: {
    paddingBottom: 10,
  },
  innerContainer: {
    marginBottom: 10,
    padding: 16,
  },
  label: {
    fontSize: 20,
    color: "#333",
  },
  input: {
    borderBottomWidth: 1,
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  validInput: {
    borderColor: "#ddd",
  },
  invalidInput: {
    borderColor: "red",
  },
  errorMessage: {
    color: "red",
  },
  birthDateText: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    color: "#333",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 10,
  },
  genderPicker: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    fontSize: 18,
    borderRadius: 6,
    marginTop: -10,
  },
  submitButtonContainer: {
    height: 50,
    width: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default SurveyForm;
