import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, StyleSheet, LogBox } from "react-native";
import "react-native-gesture-handler";

import { ROUTES } from "./config/routes";
import { GettingStarted, Success, Survey } from "./pages";
import {useEffect} from "react";

const { Navigator, Screen } = createStackNavigator();

const App = () => {
  useEffect(()=>{
    LogBox.ignoreLogs(['Warning: ...']);
    LogBox.ignoreAllLogs();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Navigator
          initialRouteName={ROUTES.GettingStarted}
          screenOptions={{ headerShown: false }}
        >
          <Screen name={ROUTES.GettingStarted} component={GettingStarted} />
          <Screen name={ROUTES.Survey} component={Survey} />
          <Screen name={ROUTES.Success} component={Success} />
        </Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
