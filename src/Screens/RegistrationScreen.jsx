import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const initialState = {
  email: { value: "", isFocused: false },
  password: { value: "", isFocused: false },
  login: { value: "", isFocused: false },
};

const RegistrationScreen = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [photoAdded, setPhotoAdded] = useState(false);
  const [inputValues, setInputValues] = useState(initialState);
  const [errorMessages, setErrorMessages] = useState({});

  const navigation = useNavigation();

  const handlePhotoAdd = () => {
    setPhotoAdded(!photoAdded);
  };

  const handleInputChange = (inputName, text) => {
    if (inputName === "password") {
      text = text.toLowerCase();
    }

    setInputValues((prevValues) => ({
      ...prevValues,
      [inputName]: { ...prevValues[inputName], value: text },
    }));
  };

  const handleFocus = (inputName) => {
    setInputValues((prev) => ({
      ...prev,
      [inputName]: { ...prev[inputName], isFocused: true },
    }));
  };

  const handleBlur = (inputName) => {
    setInputValues((prev) => ({
      ...prev,
      [inputName]: { ...prev[inputName], isFocused: false },
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!inputValues.login.value) {
      errors.login = "Логін обов'язковий";
    }

    if (!inputValues.email.value) {
      errors.email = "Електронна пошта обов'язкова";
    } else if (!isValidEmail(inputValues.email.value)) {
      errors.email = "Введіть дійсну електронну пошту";
    }

    if (!inputValues.password.value) {
      errors.password = "Пароль обов'язковий";
    }

    setErrorMessages(errors);

    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailStandart = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailStandart.test(email);
  };

  const clearRegistrationForm = () => {
    setInputValues(initialState);
    setPhotoAdded(false);
  };

  const handleRegistration = () => {
    if (validateForm()) {
      const registrationData = {
        login: inputValues.login.value,
        email: inputValues.email.value,
        password: inputValues.password.value,
        photoAdded: photoAdded,
      };
      console.log("Реєстраційні дані:", registrationData);
      Alert.alert(
        "Реєстрація успішна! Облікові дані:",
        `${inputValues.login.value} + ${inputValues.email.value} + ${inputValues.password.value}`
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={-145}
      >
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../assets/images/photobg.png")}
        >
          <View style={styles.formContainer}>
            <View style={styles.avatarContainer}>
              {photoAdded ? (
                <>
                  <Image
                    source={require("../assets/images/avatar.png")}
                    style={styles.avatar}
                  />
                  <TouchableOpacity onPress={handlePhotoAdd}>
                    <AntDesign
                      style={styles.iconWithPhoto}
                      name="closecircleo"
                      size={25}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <View style={[styles.withoutAvatar]}></View>
                  <TouchableOpacity onPress={handlePhotoAdd}>
                    <AntDesign
                      style={styles.iconWithoutPhoto}
                      name="pluscircleo"
                      size={25}
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>

            <View style={styles.form}>
              <Text style={styles.titleEnter}>Реєстрація</Text>
              {errorMessages.login && (
                <Text style={styles.errorMessage}>{errorMessages.login}</Text>
              )}
              <TextInput
                placeholder="Логін"
                value={inputValues.login.value}
                autoComplete="username"
                style={[
                  styles.inputLogin,
                  inputValues.login.isFocused && styles.inputFocused,
                ]}
                onChangeText={(text) => handleInputChange("login", text)}
                onFocus={() => handleFocus("login")}
                onBlur={() => handleBlur("login")}
              />
              {errorMessages.email && (
                <Text style={styles.errorMessage}>{errorMessages.email}</Text>
              )}
              <TextInput
                placeholder="Адреса електронної пошти"
                value={inputValues.email.value}
                autoComplete="email"
                keyboardType="email-address"
                style={[
                  styles.inputEmail,
                  inputValues.email.isFocused && styles.inputFocused,
                ]}
                onChangeText={(text) => handleInputChange("email", text)}
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
              />
              {errorMessages.password && (
                <Text style={styles.errorMessage}>
                  {errorMessages.password}
                </Text>
              )}
              <View
                style={[
                  styles.inputPasswordContainer,
                  inputValues.password.isFocused && styles.inputFocused,
                ]}
                onFocus={() => handleFocus("password")}
                onBlur={() => handleBlur("password")}
              >
                <TextInput
                  placeholder="Пароль"
                  value={inputValues.password.value}
                  autoComplete="password"
                  secureTextEntry={!isPasswordVisible}
                  style={[
                    styles.inputPassword,
                    inputValues.password.isFocused && styles.inputFocused,
                  ]}
                  onChangeText={(text) => handleInputChange("password", text)}
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!isPasswordVisible)}
                >
                  <Text
                    style={[
                      styles.buttonViewPassword,
                      inputValues.password.isFocused && styles.inputFocused,
                    ]}
                  >
                    {isPasswordVisible ? "Приховати" : "Показати"}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handleRegistration();
                  clearRegistrationForm();
                }}
              >
                <Text style={styles.buttonText}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text style={styles.textInfoLink}>Вже є акаунт? Увійти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingBottom: 45,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "flex-end",
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    position: "absolute",
    top: -60,
    borderRadius: 20,
    alignItems: "center",
  },
  withoutAvatar: {
    width: 120,
    height: 120,
    position: "absolute",
    top: -60,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
  iconWithPhoto: {
    right: "-18%",
    top: 16,
    color: "#BDBDBD",
  },
  iconWithoutPhoto: {
    right: "-18%",
    top: 16,
    color: "#FF6C00",
  },
  form: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  titleEnter: {
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: "500",
    letterSpacing: 0.3,
    marginBottom: 33,
    marginTop: 40,
  },
  inputLogin: {
    width: "100%",
    height: 50,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    backgroundColor: "#F6F6F6",
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 5,
    marginBottom: 16,
  },
  inputEmail: {
    width: "100%",
    height: 50,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    backgroundColor: "#F6F6F6",
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 5,
    marginBottom: 16,
  },
  inputFocused: {
    borderColor: "#FF6C00",
    backgroundColor: "#FFF",
  },
  inputPasswordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 5,
    height: 50,
    marginBottom: 43,
    backgroundColor: "#F6F6F6",
  },
  inputPassword: {
    height: 50,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    backgroundColor: "#F6F6F6",
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    flex: 1,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRightWidth: 0,
    borderRadius: 5,
  },
  buttonViewPassword: {
    paddingHorizontal: 10,
    backgroundColor: "#F6F6F6",
    color: "#1B4371",
    textAlign: "right",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "400",
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
    marginBottom: 16,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
  },
  textInfoLink: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    textDecorationLine: "underline",
    textDecorationColor: "#1B4371",
  },
  errorMessage: {
    color: "#FF6C00",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
  },
});

export default RegistrationScreen;
