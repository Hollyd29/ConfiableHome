import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./loginscreen";
import RegisterScreen from "./registerscreen";

const Stack = createNativeStackNavigator();

function ProtectedRoute() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerBackVisible: false,
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}

export default ProtectedRoute;
