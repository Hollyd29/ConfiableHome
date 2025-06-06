import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setToken(token) {
  return await AsyncStorage.setItem("token", token);
}

export async function getToken() {
  return await AsyncStorage.getItem("token");
}
export async function removeToken() {
  return await AsyncStorage.removeItem("token");
}
