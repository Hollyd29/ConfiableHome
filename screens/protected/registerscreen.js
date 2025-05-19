import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../component/button";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";
import { url } from "../utils/urlstorage";
import Entypo from "@expo/vector-icons/Entypo";
import Toast from "react-native-toast-message";

function RegisterScreen() {
  const registerData = {
    username: "",
    email: "",
    password: "",
  };
  const [register, setRegister] = useState(registerData);
  const [isloading, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const navigation = useNavigation();

  const { username, email, password } = register;

  function handleText(value, name) {
    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleRegister() {
    if (!username || !email || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No field can be empty",
        visibilityTime: 3000,
        text2Style: { fontSize: 16 },
      });
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(`${url}/auth/register`, register);
      Toast.show({
        type: "success",
        text1: "Successful",
        text2: "Registration Successful",
        visibilityTime: 3000,
        text2Style: { fontSize: 16 },
      });
      setRegister(registerData);
      navigation.navigate("Login");
      setIsLoading(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response.data.message || "something went wrong",
        visibilityTime: 3000,
        text2Style: { fontSize: 16 },
      });
      setIsLoading(false);
    }
  }

  return (
    <View>
      <View style={styles.registerCon}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={(value) => handleText(value, "username")}
        />
        <TextInput
          keyboardType="email-address"
          placeholder="Email address"
          style={styles.input}
          value={email}
          onChangeText={(value) => handleText(value, "email")}
        />
        <View style={{ position: "relative" }}>
          <TextInput
            secureTextEntry={isShow}
            placeholder="Password"
            style={styles.input}
            value={password}
            onChangeText={(value) => handleText(value, "password")}
          />
          <Pressable style={styles.icons} onPress={() => setIsShow(!isShow)}>
            {!isShow && <Entypo name="eye" size={24} color="black" />}
            {isShow && <Entypo name="eye-with-line" size={24} color="black" />}
          </Pressable>
        </View>
        <Button
          title={isloading ? "Loading..." : "Register"}
          disablebtn={isloading}
          btnStyle={styles.btn}
          btnText={styles.btntext}
          btnPress={handleRegister}
        />
      </View>
      <Text style={styles.text}>
        You already have an account ?
        <Text
          style={styles.register}
          onPress={() => navigation.navigate("Login")}
        >
          {" "}
          Login
        </Text>{" "}
      </Text>
    </View>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  registerCon: {
    display: "flex",
    gap: 20,
    marginTop: "50%",
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: "#7f7f7f",
    height: 45,
    borderRadius: 7,
    fontSize: 18,
  },
  btn: {
    backgroundColor: "#0077b6",
    padding: 5,
    width: 150,
    alignSelf: "center",
    borderRadius: 7,
    marginBottom: 20,
  },
  btntext: {
    textAlign: "center",
    color: "#ffff",
    fontSize: 25,
    fontWeight: 500,
    letterSpacing: 3,
  },
  text: {
    alignSelf: "center",
    fontSize: 16,
  },
  register: {
    color: "#1565c0",
  },
  icons: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: [{ translateY: "-50%" }],
    opacity: 0.6,
  },
});
