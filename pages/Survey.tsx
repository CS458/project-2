import React, {useEffect, useState} from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from "react-native-gesture-handler";
import GenderSelect from "../components/GenderSelect";
import TextInputField from "../components/TextInputField";
import { ROUTES } from "../config/routes";

import BirthDatePicker from "../components/BirthDatePicker";

const Survey = (props: any) => {
  const [nameSurname, setNameSurname] = useState("");
  const [nameSurnameError, setNameSurnameError] = useState("");

  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");

  const [gender, setGender] = useState(-1);
  const [genderError, setGenderError] = useState("");

  const [vaccineApplied, setVaccineApplied] = useState("");
  const [vaccineAppliedError, setVaccineAppliedError] = useState("");

  const [sideEffectsAfterVac, setSideEffectsAfterVac] = useState("");
  const [pcrPosCasesAndSymAfter3rdVac, setPcrPosCasesAndSymAfter3rdVac] =
    useState("");

  const [dob, setDob] = useState("");

  const updateDob = (newDate: any) => {
    setDob(newDate);
  }

  useEffect(() => {
    setInitialValues().then(r => {
      const {name, cityTemp, genderTemp, dobTemp, vac, side, pcr} = r;
      setNameSurname(name);
      setCity(cityTemp);
      setGender(genderTemp);
      setDob(dobTemp);
      setVaccineApplied(vac);
      setSideEffectsAfterVac(side);
      setPcrPosCasesAndSymAfter3rdVac(pcr);
    }).then(()=> setEditFalse());
  }, [])

  const setEditFalse = async () => {await AsyncStorage.setItem('edit', "false")}

  const setInitialValues = async () => {
    let edit = await AsyncStorage.getItem('edit');
    let name = '', cityTemp = '', dobTemp = 'Not Set', vac = '', side = '', pcr = '', genderTemp = -1;
    if (edit === 'true'){
      name = await AsyncStorage.getItem('nameSurname') || "";
      cityTemp = await AsyncStorage.getItem('city') || "";
      genderTemp = Number(await AsyncStorage.getItem("gender") || -1);
      dobTemp = JSON.parse(await AsyncStorage.getItem('dob') || 'Not Set');
      vac = await AsyncStorage.getItem('vaccineApplied') || '';
      side = await AsyncStorage.getItem('sideEffectsAfterVac') || '';
      pcr = await AsyncStorage.getItem('pcrPosCasesAndSymAfter3rdVac') || '';
    }
    return {name, cityTemp, genderTemp, dobTemp, vac, side, pcr};
  }

  const validateNameSurname = () => {
    const regex =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    const isValid = regex.test(nameSurname);
    return isValid;
  };

  const validateBirthDate = () => {
    return dob !== "Not Set";
  };

  const setNameSurnameErrorMessage = () => {
    if (validateNameSurname()) {
      setNameSurnameError("");
    } else {
      setNameSurnameError("Name Surname is not valid.");
    }
  };

  const validateCity = () => {
    return city.trim().length !== 0;
  };

  const setCityErrorMessage = () => {
    if (validateCity()) {
      setCityError("");
    } else {
      setCityError("City is required.");
    }
  };

  const validateGender = () => {
    return gender !== -1;
  };

  const setGenderErrorMessage = () => {
    if (validateGender()) {
      setGenderError("");
    } else {
      setGenderError("Gender is required");
    }
  };

  const validateVaccineApplied = () => {
    return vaccineApplied.trim().length !== 0;
  };

  const setVaccineAppliedErrorMessage = () => {
    if (validateVaccineApplied()) {
      setVaccineAppliedError("");
    } else {
      setVaccineAppliedError("Vaccine Applied is required.");
    }
  };

  const areFieldsValid = () => {
    return (
      validateNameSurname() &&
      validateCity() &&
      validateGender() &&
      validateVaccineApplied() &&
      validateBirthDate()
    );
  };

  const persistFormInfo = async () => {
    await AsyncStorage.setItem('nameSurname', nameSurname);
    await AsyncStorage.setItem('city', city);
    await AsyncStorage.setItem('gender', String(gender));
    await AsyncStorage.setItem('dob', JSON.stringify(dob));
    await AsyncStorage.setItem('vaccineApplied', vaccineApplied);
    await AsyncStorage.setItem('sideEffectsAfterVac', sideEffectsAfterVac);
    await AsyncStorage.setItem('pcrPosCasesAndSymAfter3rdVac', pcrPosCasesAndSymAfter3rdVac);
    await AsyncStorage.setItem('edit', "false");
  }

  const onSubmit = async () => {
    await persistFormInfo();
    props.navigation.push(ROUTES.Success);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.header}>Survey</Text>
        <TextInputField
          label="Name Surname"
          placeholder="Name and Surname"
          onChangeText={(text) => setNameSurname(text)}
          value={nameSurname}
          errorMessage={nameSurnameError}
          onBlur={setNameSurnameErrorMessage}
        />
        <BirthDatePicker validateBirthDate={validateBirthDate} updateDob={updateDob} value={dob} />
        <TextInputField
          label="City"
          placeholder="City"
          onChangeText={(text) => setCity(text)}
          value={city}
          errorMessage={cityError}
          onBlur={setCityErrorMessage}
        />
        <GenderSelect
          label="Gender"
          selectedIndex={gender}
          onPress={(value) => {
            if (value !== -1) {
              setGender(value);
              setGenderError("");
            }
          }}
          containerStyle={{ marginBottom: 20 }}
          error={genderError}
        />
        <TextInputField
          label="Vaccine Type Applied"
          placeholder="Vaccine Type Applied"
          onChangeText={(text) => setVaccineApplied(text)}
          value={vaccineApplied}
          errorMessage={vaccineAppliedError}
          onBlur={() => {
            setGenderErrorMessage();
            setVaccineAppliedErrorMessage();
          }}
        />
        <TextInputField
          label="Any Side Effect After Vaccination"
          placeholder="Side Effects After Vaccinations"
          onChangeText={(text) => setSideEffectsAfterVac(text)}
          value={sideEffectsAfterVac}
        />
        <TextInputField
          label="PCR Positive Cases &#38; Covid-19 Symptoms After 3rd Vaccination"
          placeholder="PCR Positive Cases and Symptoms"
          onChangeText={(text) => setPcrPosCasesAndSymAfter3rdVac(text)}
          value={pcrPosCasesAndSymAfter3rdVac}
        />
        {areFieldsValid() ? (
          <View style={styles.buttonContainer}>
            <Button color="coral" title="Submit" onPress={onSubmit} />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingTop: 25,
  },
  header: {
    fontSize: 22,
    color: "coral",
    marginTop: 40,
    marginBottom: 20,
    width: "100%",
  },
  scroll: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default Survey;
