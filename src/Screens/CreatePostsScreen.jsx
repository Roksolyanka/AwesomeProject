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
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import globalState from "./globalState";

const initialState = {
  name: "",
  location: "",
  photo: false,
};

const CreatePostsScreen = () => {
  const [inputValues, setInputValues] = useState(initialState);
  const [errorMessages, setErrorMessages] = useState({});
  const [isButtonActive, setIsButtonActive] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    updateButtonActivation();
  }, [inputValues]);

  const handlePhotoAdd = () => {
    setInputValues((prevState) => ({
      ...prevState,
      photo: !prevState.photo,
    }));
  };

  const updateButtonActivation = () => {
    const isPhotoAdded = !!inputValues.photo;
    const isNameFilled = !!inputValues.name;
    const isLocationFilled = !!inputValues.location;
    const hasErrors = Object.keys(errorMessages).length > 0;

    setIsButtonActive(
      isPhotoAdded && isNameFilled && isLocationFilled && !hasErrors
    );
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
        photo: inputValues.photo,
      };
     globalState.publications.push(newPublication);
      navigation.navigate("Profile", {
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
                  source={require("../assets/images/mountains.png")}
                  style={styles.photo}
                >
                  <TouchableOpacity onPress={handlePhotoAdd}>
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
                <View style={[styles.withoutPhoto]}>
                  <TouchableOpacity onPress={handlePhotoAdd}>
                    <View style={styles.whiteCircle}>
                      <FontAwesome
                        name="camera"
                        size={24}
                        style={styles.iconWithoutPhoto}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
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
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 8,
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
  withoutPhoto: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    border: "1px solid #E8E8E8",
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
});

export default CreatePostsScreen;
