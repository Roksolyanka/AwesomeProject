import { AntDesign } from "@expo/vector-icons";
import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  View,
} from "react-native";

const UserPhoto = ({ photoAvatarAdded, handlePhotoAdd }) => {
  return (
    <View style={styles.avatarContainer}>
      {photoAvatarAdded ? (
        <ImageBackground
          source={require("../assets/images/avatar.png")}
          style={styles.avatar}
        >
          <TouchableOpacity onPress={handlePhotoAdd}>
            <AntDesign
              style={styles.iconWithPhoto}
              name="closecircleo"
              size={25}
            />
          </TouchableOpacity>
        </ImageBackground>
      ) : (
        <View style={[styles.withoutAvatar]}>
          <TouchableOpacity onPress={handlePhotoAdd}>
            <AntDesign
              style={styles.iconWithoutPhoto}
              name="pluscircleo"
              size={25}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    top: -60,
    borderRadius: 20,
  },
  withoutAvatar: {
    width: 120,
    height: 120,
    top: -60,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
  iconWithPhoto: {
    left: 108,
    top: 76,
    color: "#BDBDBD",
  },
  iconWithoutPhoto: {
    left: 108,
    top: 76,
    color: "#FF6C00",
  },
});

export default UserPhoto;
