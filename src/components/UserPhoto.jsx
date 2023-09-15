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

const UserPhoto = ({ handlePhotoAdd }) => {
  const [image, setImage] = useState(null);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (result.canceled) {
      Alert.alert("Вибір фотографії скасовано", "", [], { cancelable: true });
    } else if (result.error) {
      Alert.alert("Помилка вибору фото", "", [], { cancelable: true });
    } else {
      let imageUri = result;
      setImage(imageUri?.assets[0]?.uri);
    }
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
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
      let imageUri = result;
      setImage(imageUri?.assets[0]?.uri);
    }
    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
    setImage(null);
    handlePhotoAdd(false);
  };

  return (
    <View style={styles.avatarContainer}>
      {image ? (
        <ImageBackground source={{ uri: image }} style={styles.avatar}>
          <TouchableOpacity
            onPress={() => {
              clearPhotoUser();
            }}
          >
            <AntDesign
              style={styles.iconWithPhoto}
              name="closecircleo"
              size={25}
            />
          </TouchableOpacity>
        </ImageBackground>
      ) : (
        <View style={styles.withoutAvatar}>
          <TouchableOpacity
            onPress={() => {
              getPhotoNotification();
            }}
          >
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
