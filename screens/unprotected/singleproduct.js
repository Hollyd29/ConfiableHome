import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

function SingleProduct() {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate("AllProduct")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text style={styles.headerText}>Details</Text>
      </View>
    </View>
  );
}

export default SingleProduct;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 150,
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
  },
  headerText: {
    fontWeight: "700",
  },
});
