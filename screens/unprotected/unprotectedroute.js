import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./homescreen";
import AboutScreen from "./aboutscreen";
import ProductScreen from "./productscreen";
import CartScreen from "./cartscreen";
import UserScreen from "./userscreen";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function HomeTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return <Entypo name="home" size={24} color="black" />;
          },
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: () => {
            return <Entypo name="user" size={24} color="black" />;
          },
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductScreen}
        options={{
          tabBarIcon: () => {
            return <FontAwesome name="product-hunt" size={24} color="black" />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

function UnprotectedRoute() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="ConfiableHome"
        component={HomeTab}
        options={{
          headerTitleAlign: "center",
          headerTintColor: "#0077b6",
          headerTitleStyle: { fontSize: 30 },
          drawerLabelStyle: { fontSize: 30 },
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
      <Drawer.Screen
        name="User"
        component={UserScreen}
        options={{
          drawerIcon: () => {
            return <Entypo name="users" size={24} color="black" />;
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default UnprotectedRoute;
