import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../component/button";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { handleAuthRegister } from "../../actions/auth.action";

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

  const handleRegister = async () => {
    await handleAuthRegister(
      username,
      email,
      password,
      setIsLoading,
      register,
      setRegister,
      registerData,
      navigation
    );
  };

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
