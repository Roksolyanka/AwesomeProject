import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

 const ButtonGoBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => {
        navigation.goBack();
      }}>
      <AntDesign name="arrowleft" size={24} style={styles.iconGoBack} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconGoBack: {
    color: "#212121CC",
    paddingLeft: 16,
  }
});

export default ButtonGoBack;