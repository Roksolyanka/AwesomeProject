import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from "react-native";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";

const initialState = {
  name: "",
  location: "",
};

const CreatePostsScreen = () => {
  const [photoAdded, setPhotoAdded] = useState(false);
  const [inputValues, setInputValues] = useState(initialState);
  const [errorMessages, setErrorMessages] = useState({});
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handlePhotoAdd = () => {
    setPhotoAdded(!photoAdded);
    updateButtonActivation();
  };

  const validateForm = () => {
    const errors = {};

    if (!photoAdded) {
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
    setPhotoAdded(false);
  };

  const handleCreatePublication = () => {
    if (validateForm()) {
      const publicationData = {
        name: inputValues.name,
        location: inputValues.location,
        photoAdded: photoAdded,
      };
      Alert.alert("Публікація успішно створена!");
      setIsButtonActive(false);
    }
  };

  const updateButtonActivation = () => {
    const isPhotoAdded = photoAdded;
    const isNameFilled = !!inputValues.name;
    const isLocationFilled = !!inputValues.location;
    const hasErrors = Object.keys(errorMessages).length > 0;

    setIsButtonActive(
      isPhotoAdded && isNameFilled && isLocationFilled && !hasErrors
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={-145}
      >
        {errorMessages.photo && (
          <Text style={styles.errorMessage}>{errorMessages.photo}</Text>
        )}
        <View style={styles.photoContainer}>
          {photoAdded ? (
            <>
              <Image
                source={require("../assets/images/mountains.png")}
                style={styles.photo}
              />
              <View style={styles.transparentCircle}>
                <TouchableOpacity onPress={handlePhotoAdd}>
                  <FontAwesome
                    name="camera"
                    size={24}
                    style={styles.iconWithPhoto}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.uploadText}>Редагувати фото</Text>
            </>
          ) : (
            <>
              <View style={[styles.withoutPhoto]}>
                <View style={styles.whiteCircle}>
                  <TouchableOpacity onPress={handlePhotoAdd}>
                    <FontAwesome
                      name="camera"
                      size={24}
                      style={styles.iconWithoutPhoto}
                    />
                  </TouchableOpacity>
                </View>
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
            updateButtonActivation();
          }}
        />
        {errorMessages.location && (
          <Text style={styles.errorMessage}>{errorMessages.location}</Text>
        )}
        <View style={styles.locationContainer}>
          <AntDesign name="enviromento" size={24} style={styles.iconLocation} />
          <TextInput
            placeholder="Місцевість..."
            value={inputValues.location}
            style={styles.locationInput}
            placeholderTextColor="#BDBDBD"
            onChangeText={(text) => {
              setInputValues((prevState) => ({ ...prevState, location: text }));
              updateButtonActivation();
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
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Feather name="trash-2" size={24} style={styles.deleteIcon} />
          </TouchableOpacity>
        </View>
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
  },
  photoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  photo: { width: 343, height: 240, position: "relative" },
  transparentCircle: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.30)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -45 }],
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
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 20,
    alignSelf: "center",
  },
  deleteIcon: {
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
