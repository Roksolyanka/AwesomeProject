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
import { imageOptimization } from "../helpers/index";
import { useUser } from "../hooks/index";
import { useDispatch } from "react-redux";
// import { deletePhotoUserThunk } from "../redux/auth/authOperations";

const UserPhoto = ({ handlePhotoUrl }) => {
  const [image, setImage] = useState(null);
  // const { user } = useUser();
  //  const dispatch = useDispatch();

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
      const optimizedUri = await imageOptimization(firstAsset.uri);
      setImage(optimizedUri);
      // user.photoURL = optimizedUri;
      handlePhotoUrl(optimizedUri);
    }
    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    //   handlePhotoUrl(result.assets[0].uri);
    // }
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
      const optimizedUri = await imageOptimization(firstAsset.uri);
      setImage(optimizedUri);
      // user.photoURL = optimizedUri;
      handlePhotoUrl(optimizedUri);
    }
    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    //   handlePhotoUrl(result.assets[0].uri);
    // }
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
    // user.photoURL = null;
    // dispatch(deletePhotoUserThunk());
    // handlePhotoAdd(false);
  };

  return (
    <View style={styles.avatarContainer}>
      {/* {user.photoURL ? ( */}
      {image ? (
        // <ImageBackground source={{ uri: user.photoURL }} style={styles.avatar}>
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
