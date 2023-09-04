import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const ButtonLogOut = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Login");
      }}
    >
      <Feather name="log-out" size={24} style={styles.iconLogOut} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconLogOut: {
    color: "#BDBDBD",
    paddingRight: 10,
  },
});

export default ButtonLogOut;
