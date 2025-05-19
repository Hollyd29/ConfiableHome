import { StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../component/button";
import { useNavigation } from "@react-navigation/native";

function LoginScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.loginCon}>
        <TextInput placeholder="Email address" style={styles.input} />
        <TextInput placeholder="Password" style={styles.input} />
        <Button title="Login" btnStyle={styles.btn} btnText={styles.btntext} />
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
    height: 40,
    borderRadius: 7,
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
