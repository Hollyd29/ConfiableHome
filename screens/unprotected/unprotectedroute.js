import "react-native-gesture-handler";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./homescreen";
import AboutScreen from "./aboutscreen";
import CartScreen from "./cartscreen";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ProtectedRoute from "../protected/protectedroute";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductScreen from "./productscreen";
import SingleProduct from "./singleproduct";
import { View } from "react-native";
import UserDropdown from "../component/userDropdown";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function ProductsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllProduct"
        component={ProductScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SingleProduct"
        component={SingleProduct}
        options={{
          title: "Details",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function HomeTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: "#0077b6",
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#0077b6",
        tabBarLabelStyle: { fontSize: 15 },
        // tabBarStyle: { height: 50 },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="home" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="user" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductsStack}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="product-hunt" size={24} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

function UnprotectedRoute() {
  return (
    <Drawer.Navigator drawerContent={(props) => <UserDropdown {...props} />}>
      <Drawer.Screen
        name="ComfiableHome"
        component={HomeTab}
        options={{
          headerTitleAlign: "center",
          headerTintColor: "#0077b6",
          headerTitleStyle: { fontSize: 30 },
          drawerLabelStyle: { fontSize: 30, paddingTop: 10 },
          // drawerInactiveTintColor: "#0077b6",
        }}
      />
      <Drawer.Screen
        name="Cart"
        component={CartScreen}
        options={{
          drawerIcon: () => {
            return <Entypo name="shopping-cart" size={24} color="black" />;
          },
        }}
      />
      {/* <Drawer.Screen
        name="User"
        component={ProtectedRoute}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Login";
          return {
            headerShown: routeName !== "Register",
            drawerIcon: () => {
              return <Entypo name="users" size={24} color="black" />;
            },
          };
        }}
      /> */}
    </Drawer.Navigator>
  );
}

export default UnprotectedRoute;
