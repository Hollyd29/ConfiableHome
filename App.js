import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import UnprotectedRoute from "./screens/unprotected/unprotectedroute";

function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <UnprotectedRoute />
      </NavigationContainer>
    </View>
  );
}

export default App;
