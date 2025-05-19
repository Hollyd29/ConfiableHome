import { StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../component/button";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";
import { url } from "../utils/urlstorage";

function RegisterScreen() {
  const registerData = {
    username: "",
    email: "",
    password: "",
  };
  const [register, setRegister] = useState(registerData);
  const [isloading, setIsLoading] = useState(false);

  const { username, email, password } = register;

  const navigation = useNavigation();

  async function fetchRegister() {
    try {
    } catch (error) {}
  }

  return (
    <View>
      <View style={styles.registerCon}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
        />
        <TextInput
          keyboardType="email-address"
          placeholder="Email address"
          style={styles.input}
          value={email}
        />
        <TextInput
          secureTextEntry={false}
          placeholder="Password"
          style={styles.input}
          value={password}
        />
        <Button
          title="register"
          btnStyle={styles.btn}
          btnText={styles.btntext}
        />
      </View>
      <Text style={styles.text}>
        You already have an account ?
        <Text
          style={styles.register}
          onPress={() => navigation.navigate("Register")}
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
});
