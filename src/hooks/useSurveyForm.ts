import { useCallback, useState } from "react";
import { NON_EMPTY_REGEX } from "../constants";

export const useSurveyForm = () => {
  const [nameSurname, setNameSurname] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [vaccineTypeApplied, setVaccineTypeApplied] = useState("");
  const [sideEffectsAfterVac, setSideEffectsAfterVac] = useState("");
  const [pcrPosCasesAndSymAfterThirdVac, setPcrPosCasesAndSymAfterThirdVac] =
    useState("");
  const [errors, setErrors] = useState({
    nameSurname: "",
    birthDate: "",
    city: "",
    gender: "",
    vaccineTypeApplied: "",
    sideEffectsAfterVac: "",
    pcrPosCasesAndSymAfterThirdVac: "",
  });

  const onNameSurnameChange = useCallback((text: string) => {
    setNameSurname(text);
    const prevErrors = { ...errors };
    if (text.length === 0) {
      prevErrors.nameSurname = "Name and surname is required";
    } else if (/\d/.test(text)) {
      prevErrors.nameSurname = "Name and surname cannot have numbers";
    } else {
      prevErrors.nameSurname = "";
    }
    setErrors({ ...prevErrors });
  }, []);

  const onBirthDateChange = useCallback((date: Date) => {
    setBirthDate(date);
  }, []);

  const onCityChange = useCallback((text: string) => {
    setCity(text);
    const prevErrors = { ...errors };
    if (text.length === 0) {
      prevErrors.city = "City name is required";
    } else if (/\d/.test(text)) {
      prevErrors.city = "City name cannot have numbers";
    } else {
      prevErrors.city = "";
    }
    setErrors({ ...prevErrors });
  }, []);

  const onGenderChange = useCallback((text: string) => {
    setGender(text);
    const prevErrors = { ...errors };
    if (text === "not_set") {
      prevErrors.gender = "Gender is required";
    } else {
      prevErrors.gender = "";
    }
    setErrors({ ...prevErrors });
  }, []);

  const onVaccineTypeAppliedChange = useCallback((text: string) => {
    setVaccineTypeApplied(text);
    const prevErrors = { ...errors };
    if (text.length === 0) {
      prevErrors.vaccineTypeApplied = "Vaccine Type is required";
    } else {
      prevErrors.vaccineTypeApplied = "";
    }
    setErrors({ ...prevErrors });
  }, []);

  const onSideEffectsAfterVacChange = useCallback((text: string) => {
    setSideEffectsAfterVac(text);
  }, []);

  const onPcrPosCasesAndSymAfterThirdVacChange = useCallback((text: string) => {
    setPcrPosCasesAndSymAfterThirdVac(text);
  }, []);

  return [
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
  ] as const;
};
