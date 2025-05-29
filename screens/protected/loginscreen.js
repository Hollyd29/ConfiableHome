import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../component/button";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { handleAuthLogin } from "../../actions/auth.action";

function LoginScreen() {
  const loginData = {
    email: "",
    password: "",
  };
  const [login, setLogin] = useState(loginData);
  const [isShow, setIsShow] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const { email, password } = login;

  function handleText(value, name) {
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleLogin = async () => {
    await handleAuthLogin(
      login,
      email,
      password,
      setIsLoading,
      setLogin,
      loginData,
      navigation
    );
  };

  return (
    <View>
      <View style={styles.loginCon}>
        <TextInput
          keyboardType="email-address"
          placeholder="Email address"
          style={styles.input}
          value={email}
          onChangeText={(value) => handleText(value, "email")}
        />
        <View>
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
          title={isloading ? "Loading.." : "Login"}
          disablebtn={isloading}
          btnStyle={styles.btn}
          btnText={styles.btntext}
          btnPress={handleLogin}
        />
      </View>
      <Text style={styles.text}>
        You don't have an account ?
        <Text
          style={styles.register}
          onPress={() => navigation.navigate("Register")}
        >
          {" "}
          Register
        </Text>{" "}
      </Text>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  loginCon: {
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
