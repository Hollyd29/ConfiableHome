import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import UnprotectedRoute from "./screens/unprotected/unprotectedroute";
import Toast from "react-native-toast-message";

function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <UnprotectedRoute />
      </NavigationContainer>
      <Toast />
    </View>
  );
}

export default App;
