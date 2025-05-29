import { setToken } from "../screens/utils/tokenstorage";
import { loginUser } from "../services/auth.service";
import Toast from "react-native-toast-message";

export async function handleAuthLogin(
  login,
  email,
  password,
  setIsLoading,
  setLogin,
  loginData,
  navigation
) {
  if (!email || !password) {
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
    const res = await loginUser(login);
    Toast.show({
      type: "success",
      text1: "Successful",
      text2: "Login Successful",
      visibilityTime: 3000,
      text2Style: { fontSize: 16 },
    });
    setToken(res.data.token);

    // console.log(res.data.token);

    setLogin(loginData);
    navigation.navigate("ComfiableHome", { screen: "Products" });
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
