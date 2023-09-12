import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  ImageBackground,
} from "react-native";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import globalState from "./globalState";
import * as Location from "expo-location";
import Spinner from "react-native-loading-spinner-overlay";

const initialState = {
  name: "",
  location: "",
  geolocation: "",
  photo: false,
};

const CreatePostsScreen = () => {
  const [inputValues, setInputValues] = useState(initialState);
  const [errorMessages, setErrorMessages] = useState({});
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [waitingProcess, setWaitingProcess] = useState(false);

  const navigation = useNavigation();

  const updateButtonActivation = () => {
    const isPhotoAdded = !!inputValues.photo;
    const isNameFilled = !!inputValues.name;
    const isLocationFilled = !!inputValues.location;
    const hasErrors = Object.keys(errorMessages).length > 0;

    setIsButtonActive(
      isCameraActive &&
        isPhotoAdded &&
        isNameFilled &&
        isLocationFilled &&
        !hasErrors
    );
  };

  const toggleCamera = () => {
    setInputValues((prevState) => ({
      ...prevState,
      photo: !prevState.photo,
    }));
    setIsCameraActive(!isCameraActive);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
    setIsCameraActive(true);
    updateButtonActivation();
  }, [inputValues, errorMessages, isCameraActive]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePhoto = async () => {
    setWaitingProcess(true);
    if (isCameraActive && cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setInputValues((prevState) => ({ ...prevState, photo: uri }));
      getCurrentLocation();
    }
    setWaitingProcess(false);
    setIsCameraActive(false);
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync(location.coords);
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      console.log(location);
      console.log(address);

      setInputValues((prevState) => ({
        ...prevState,
        geolocation: `${address[0].city}, ${address[0].region}, ${address[0].country}`,
      }));
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!inputValues.photo) {
      errors.photo = "Фото обов'язкове";
    }

    if (!inputValues.name) {
      errors.name = "Назва обов'язкова";
    }

    if (!inputValues.location) {
      errors.location = "Місцезнаходження обов'язкове";
    }

    setErrorMessages(errors);

    return Object.keys(errors).length === 0;
  };

  const clearPublicationForm = () => {
    setInputValues(initialState);
  };

  const handleCreatePublication = () => {
    if (validateForm()) {
      const newPublication = {
        name: inputValues.name,
        location: inputValues.location,
        geolocation: inputValues.geolocation,
        photo: inputValues.photo,
      };
      globalState.publications.push(newPublication);
      navigation.navigate("Posts", {
        publicationData: globalState.publications,
      });
      console.log("Publication data:", {
        publicationData: globalState.publications,
      });
      console.log("Publication data length:", globalState.publications.length);
      Alert.alert("Публікація успішно створена!");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={-145}
      >
        <View>
          {errorMessages.photo && (
            <Text style={styles.errorMessage}>{errorMessages.photo}</Text>
          )}
          <View style={styles.photoContainer}>
            {inputValues.photo ? (
              <>
                <ImageBackground
                  source={{ uri: inputValues.photo }}
                  style={styles.photo}
                >
                  <TouchableOpacity onPress={toggleCamera}>
                    <View style={styles.transparentCircle}>
                      <FontAwesome
                        name="camera"
                        size={24}
                        style={styles.iconWithPhoto}
                      />
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
                <Text style={styles.uploadText}>Редагувати фото</Text>
              </>
            ) : (
              <>
                <View style={styles.cameraContainer}>
                  <Camera
                    style={styles.camera}
                    type={cameraType}
                    ref={(ref) => setCameraRef(ref)}
                  >
                    <TouchableOpacity onPress={takePhoto}>
                      <View style={styles.whiteCircle}>
                        <FontAwesome
                          name="camera"
                          size={24}
                          style={styles.iconWithoutPhoto}
                        />
                      </View>
                    </TouchableOpacity>
                    <Spinner
                      visible={waitingProcess}
                      textContent={"Очікування..."}
                      textStyle={styles.spinnerTextStyle}
                      overlayColor="linear-gradient(rgba(46, 47, 66, 0.6), rgba(46, 47, 66, 0.6))"
                    />
                  </Camera>
                </View>
                <TouchableOpacity
                  onPress={toggleCameraType}
                  style={styles.cameraSwitchButton}
                >
                  <FontAwesome5 name="sync-alt" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.uploadText}>Завантажте фото</Text>
              </>
            )}
          </View>
          {errorMessages.name && (
            <Text style={styles.errorMessage}>{errorMessages.name}</Text>
          )}
          <TextInput
            placeholder="Назва..."
            value={inputValues.name}
            style={styles.input}
            placeholderTextColor="#BDBDBD"
            onChangeText={(text) => {
              setInputValues((prevState) => ({ ...prevState, name: text }));
            }}
          />
          {errorMessages.location && (
            <Text style={styles.errorMessage}>{errorMessages.location}</Text>
          )}
          <View style={styles.locationContainer}>
            <AntDesign
              name="enviromento"
              size={24}
              style={styles.iconLocation}
            />
            <TextInput
              placeholder="Місцевість..."
              value={inputValues.location}
              style={styles.locationInput}
              placeholderTextColor="#BDBDBD"
              onChangeText={(text) => {
                setInputValues((prevState) => ({
                  ...prevState,
                  location: text,
                }));
              }}
            />
          </View>
          <TouchableOpacity
            style={[styles.button, !isButtonActive && styles.inactiveButton]}
            onPress={() => {
              handleCreatePublication();
              clearPublicationForm();
            }}
            disabled={!isButtonActive}
          >
            <Text
              style={[
                styles.buttonText,
                !isButtonActive && styles.inactiveButtonText,
              ]}
            >
              Опублікувати
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            clearPublicationForm();
          }}
          style={[
            styles.iconContainer,
            inputValues.photo ||
            inputValues.name.length > 0 ||
            inputValues.location.length > 0
              ? styles.iconContainerActive
              : styles.iconContainerInactive,
          ]}
          disabled={
            !inputValues.photo &&
            inputValues.name.length < 1 &&
            inputValues.location.length < 1
          }
        >
          <Feather
            name="trash-2"
            size={24}
            style={[
              inputValues.photo ||
              inputValues.name.length > 0 ||
              inputValues.location.length > 0
                ? styles.deleteIconActive
                : styles.deleteIconInactive,
            ]}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingVertical: 22,
    justifyContent: "space-between",
  },
  photoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  cameraContainer: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 8,
  },
  camera: {
    width: "100%",
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  transparentCircle: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.30)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  whiteCircle: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  iconWithPhoto: {
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  iconWithoutPhoto: {
    color: "#BDBDBD",
  },
  cameraSwitchButton: {
    alignSelf: "flex-end",
    marginTop: -24,
    bottom: 10,
    right: 10,
  },
  uploadText: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    alignSelf: "flex-start",
    marginTop: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    paddingVertical: 16,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    height: 50,
  },
  locationContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    marginBottom: 32,
  },
  iconLocation: {
    color: "#BDBDBD",
  },
  locationInput: {
    flex: 1,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    paddingTop: 16,
    paddingBottom: 15,
    marginLeft: 4,
  },
  button: {
    display: "flex",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
  },
  inactiveButton: {
    backgroundColor: "#F6F6F6",
  },
  inactiveButtonText: {
    color: "#BDBDBD",
  },
  iconContainer: {
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 20,
    alignSelf: "center",
  },
  iconContainerActive: {
    backgroundColor: "#FF6C00",
  },
  iconContainerInactive: {
    backgroundColor: "#F6F6F6",
  },
  deleteIconActive: {
    color: "#FFFFFF",
  },
  deleteIconInactive: {
    color: "#BDBDBD",
  },
  errorMessage: {
    color: "#FF6C00",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
  },
  waitingBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerTextStyle: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
  },
});

export default CreatePostsScreen;
