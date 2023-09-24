import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { logoutUserThunk } from "../redux/auth/authOperations";

const ButtonLogOut = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(logoutUserThunk());
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
