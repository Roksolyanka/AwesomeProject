import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  View,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { photoUserOptimization } from "../helpers/index";

const UserPhotoCreate = ({ handlePhotoUrl }) => {
  const [image, setImage] = useState("");

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
    });
    if (result.canceled) {
      Alert.alert("Вибір фотографії скасовано", "", [], { cancelable: true });
    } else if (result.error) {
      Alert.alert("Помилка вибору фото", "", [], { cancelable: true });
    } else {
      const firstAsset = result.assets[0];
      const optimizedUri = await photoUserOptimization(firstAsset.uri);
      setImage(optimizedUri);
      handlePhotoUrl(optimizedUri);
    }
  };

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      includeBase64: false,
      maxHeight: 120,
      maxWidth: 120,
    });
    if (result.canceled) {
      Alert.alert("Користувач відмінив використання камери", "", [], {
        cancelable: true,
      });
    } else if (result.error) {
      Alert.alert("Помилка камери", "", [], {
        cancelable: true,
      });
    } else {
      const firstAsset = result.assets[0];
      const optimizedUri = await photoUserOptimization(firstAsset.uri);
      setImage(optimizedUri);
      handlePhotoUrl(optimizedUri);
    }
  };

  const getPhotoNotification = () => {
    Alert.alert(
      "Виберіть фото",
      " ",
      [
        { text: "Закрити", callingCode: true },
        { text: "Галерея", onPress: () => selectImage() },
        { text: "Камера", onPress: () => openCamera() },
      ],
      { cancelable: true }
    );
  };

  const clearPhotoUser = () => {
    setImage("");
  };

  return (
    <View style={styles.avatarContainer}>
      {image ? (
        <TouchableOpacity
          onPress={() => {
            clearPhotoUser();
          }}
        >
          <ImageBackground source={{ uri: image }} style={styles.avatar}>
            <AntDesign
              style={styles.iconWithPhoto}
              name="closecircleo"
              size={25}
            />
          </ImageBackground>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            getPhotoNotification();
          }}
        >
          <View style={styles.withoutAvatar}>
            <AntDesign
              style={styles.iconWithoutPhoto}
              name="pluscircleo"
              size={25}
            />
          </View>
        </TouchableOpacity>
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

export default UserPhotoCreate;
