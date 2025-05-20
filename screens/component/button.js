import { Pressable, Text, View } from "react-native";

function Button({ title, btnStyle, btnPress, btnText, disablebtn }) {
  return (
    <Pressable
      style={[btnStyle, disablebtn && { backgroundColor: "#ccc" }]}
      onPress={disablebtn ? null : btnPress}
      disabled={disablebtn}
    >
      <Text style={btnText}>{title}</Text>
    </Pressable>
  );
}

export default Button;

// disabled={disablebtn}
