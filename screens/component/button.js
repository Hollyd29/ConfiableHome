import { Pressable, Text, View } from "react-native";

function Button({ title, btnStyle, btnPress, btnText }) {
  return (
    <Pressable style={btnStyle} onPress={btnPress}>
      <Text style={btnText}>{title}</Text>
    </Pressable>
  );
}

export default Button;
