import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet, Button} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import {ScrollView} from "react-native-gesture-handler";
import TextInputField from "../components/TextInputField";
import BirthDatePicker from "../components/BirthDatePicker";
import GenderSelect from "../components/GenderSelect";
import {ROUTES} from "../config/routes";

const Success = ({navigation}: any) => {
  const [nameSurname, setNameSurname] = useState('')
  const [city, setCity] = useState('');
  const [gender, setGender] = useState(0);
  const [dob, setDob] = useState('');
  const [vaccineApplied, setVaccineApplied] = useState('');
  const [sideEffectsAfterVac, setSideEffectsAfterVac] = useState('');
  const [pcrPosCasesAndSymAfter3rdVac, setPcrPosCasesAndSymAfter3rdVac] = useState('');

  useEffect(() => {
    navigation.addListener('beforeRemove', (e: any) => {
      e.preventDefault();
    })
    setInitialValues().then(r => {
      const {name, cityTemp, genderTemp, dobTemp, vac, side, pcr} = r;
      setNameSurname(name);
      setCity(cityTemp);
      setGender(genderTemp);
      setDob(dobTemp);
      setVaccineApplied(vac);
      setSideEffectsAfterVac(side);
      setPcrPosCasesAndSymAfter3rdVac(pcr);
    });
  }, [navigation])

  const setInitialValues = async () => {
    let name = await AsyncStorage.getItem('nameSurname') || "";
    let cityTemp = await AsyncStorage.getItem('city') || "";
    let genderTemp = Number(await AsyncStorage.getItem("gender") || 0);
    let dobTemp = JSON.parse(await AsyncStorage.getItem('dob') || '');
    let vac = await AsyncStorage.getItem('vaccineApplied') || '';
    let side = await AsyncStorage.getItem('sideEffectsAfterVac') || '';
    let pcr = await AsyncStorage.getItem('pcrPosCasesAndSymAfter3rdVac') || '';
    return {name, cityTemp, genderTemp, dobTemp, vac, side, pcr};
  }

  return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <View style={styles.msg}>
            <Text style={styles.header} accessibilityLabel={'success'}>Survey Answers</Text>
            <Ionicons name="md-checkmark-circle" size={32} color="green" style={{marginLeft: 10}} />
          </View>
          <TextInputField
              label="Name Surname"
              value={nameSurname}
              disabled={true}
              accessibilityLabel={'nameSurname'}
          />
          <BirthDatePicker value={dob} />
          <TextInputField
              label="City"
              value={city}
              disabled={true}
              accessibilityLabel={'city'}
          />
          <GenderSelect
              label="Gender"
              selectedIndex={gender}
              containerStyle={{ marginBottom: 20 }}
              disabled={true}
          />
          <TextInputField
              label="Vaccine Type Applied"
              value={vaccineApplied}
              disabled={true}
              accessibilityLabel={'vaccineApplied'}
          />
          <TextInputField
              label="Any Side Effect After Vaccination"
              value={sideEffectsAfterVac}
              disabled={true}
              accessibilityLabel={'sideEffects'}
          />
          <TextInputField
              label="PCR Positive Cases &#38; Covid-19 Symptoms After 3rd Vaccination"
              value={pcrPosCasesAndSymAfter3rdVac}
              disabled={true}
              accessibilityLabel={'pcr'}
          />
          <View style={styles.buttonContainer}>
            <Button color="coral" title="Edit Survey" accessibilityLabel={'editBtn'} onPress={async () => {
              await AsyncStorage.setItem('edit', "true")
              navigation.push(ROUTES.Survey);
            }} />
          </View>
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25,
  },
  msg: {
    display: "flex",
    flexDirection: "row",
    marginTop: 60,
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    color: "coral",
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

export default Success;
