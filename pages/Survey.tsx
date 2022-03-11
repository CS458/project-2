import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { useFormik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import * as yup from "yup";
import GenderSelect from "../components/GenderSelect";
import TextInputField from "../components/TextInputField";
import { GENDERS, NAME_SURNAME_REGEX } from "../config/constants";

const initialValues: {
  nameSurname: string;
  birthDate: string;
  city: string;
  gender: string;
  vaccineApplied: string;
  sideEffectsAfterVac: string;
  pcrPosCasesAndSymAfter3rdVac: string;
} = {
  nameSurname: "",
  birthDate: "Not Set",
  city: "",
  gender: "Not Set",
  vaccineApplied: "",
  sideEffectsAfterVac: "",
  pcrPosCasesAndSymAfter3rdVac: "",
};

const validationSchema = yup.object({
  nameSurname: yup
    .string()
    .required("Name Surname is required.")
    .matches(NAME_SURNAME_REGEX, "Name Surname is not valid."),
  birthDate: yup.string().required("Birth date is required."),
  city: yup.string().required("City is required."),
  gender: yup
    .string()
    .label("Gender")
    .oneOf(GENDERS)
    .required("Gender is required."),
  vaccineApplied: yup.string().required("Vaccine Type applied is required."),
  sideEffectsAfterVac: yup.string(),
  pcrPosCasesAndSymAfter3rdVac: yup.string(),
});

const Survey = () => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const onSubmit = (formValues: any) => {
    console.log(formValues);
  };

  const {
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
    touched,
    values,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInputField
        label="Name Surname"
        placeholder="Name and Surname"
        onChangeText={handleChange("nameSurname")}
        value={values.nameSurname}
        errorMessage={errors.nameSurname}
      />
      <TextInputField
        label="Birth Date"
        placeholder="Birth Date"
        value={
          values.birthDate === "Not Set"
            ? "Not Set"
            : values.birthDate.toString()
        }
        onFocus={() => {
          Keyboard.dismiss();
          setIsDatePickerVisible(true);
        }}
        errorMessage={errors.nameSurname}
      />
      {isDatePickerVisible && (
        <DateTimePicker
          value={new Date(values.birthDate)}
          mode={"date"}
          display="default"
          onChange={(event: Event, date: Date | undefined) => {
            if (date) {
              handleChange("birthDate")(moment(date).format("YYYY-MM-DD"));
            } else {
              handleChange("birthDate")("Not Set");
            }
            setIsDatePickerVisible(false);
          }}
        />
      )}
      <TextInputField
        label="City"
        placeholder="City"
        onChangeText={handleChange("city")}
        value={values.city}
        errorMessage={errors.city}
      />
      <GenderSelect
        label="Gender"
        selectedIndex={GENDERS.findIndex((gender) => gender === values.gender)}
        onPress={(value) => handleChange("gender")(GENDERS[value])}
        containerStyle={{ marginBottom: 20 }}
        error={errors.gender}
      />
      <TextInputField
        label="Vaccine Type Applied"
        placeholder="Vaccine Type Applied"
        onChangeText={handleChange("vaccineApplied")}
        value={values.vaccineApplied}
        errorMessage={errors.vaccineApplied}
      />
      <TextInputField
        label="Any Side Effect After Vaccination"
        placeholder="Side Effects After Vaccinations"
        onChangeText={handleChange("sideEffectsAfterVac")}
        value={values.sideEffectsAfterVac}
        errorMessage={errors.sideEffectsAfterVac}
      />
      <TextInputField
        label="PCR Positive Cases &#38; Covid-19 Symptoms After 3rd Vaccination"
        placeholder="PCR Positive Cases and Symptoms"
        onChangeText={handleChange("pcrPosCasesAndSymAfter3rdVac")}
        value={values.pcrPosCasesAndSymAfter3rdVac}
        errorMessage={errors.pcrPosCasesAndSymAfter3rdVac}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  genderCheckBoxesContainer: {},
});

export default Survey;
