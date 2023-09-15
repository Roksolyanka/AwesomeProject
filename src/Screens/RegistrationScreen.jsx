import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import UserPhoto from "../components/UserPhoto";
import { useDispatch } from "react-redux";
import { registerUserThunk } from "../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
  login: "",
  photo: false,
};

const RegistrationScreen = () => {
  const [state, setState] = useState(initialState);
  const [isLoginFocused, setLoginFocused] = useState(false);
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handlePhotoAdd = () => {
    setState((prevValues) => ({
      ...prevValues,
      photo: !prevValues.photo,
    }));
  };

  const handleInputChange = (inputName, text) => {
    if (inputName === "password") {
      text = text.toLowerCase();
    }

    setState((prevValues) => ({
      ...prevValues,
      [inputName]: text,
    }));
  };

  const handleFocus = (inputName) => {
    if (inputName === "login") {
      setLoginFocused(true);
      setEmailFocused(false);
      setPasswordFocused(false);
    } else if (inputName === "email") {
      setLoginFocused(false);
      setEmailFocused(true);
      setPasswordFocused(false);
    } else if (inputName === "password") {
      setLoginFocused(false);
      setEmailFocused(false);
      setPasswordFocused(true);
    }
  };

  const handleBlur = () => {
    setLoginFocused(false);
    setEmailFocused(false);
    setPasswordFocused(false);
  };

  const validateForm = () => {
    const errors = {};
    if (state.photo) {
      errors.photo = "Фотографія обов'язкова";
    }

    if (!state.login) {
      errors.login = "Логін обов'язковий";
    }

    if (!state.email) {
      errors.email = "Електронна пошта обов'язкова";
    } else if (!isValidEmail(state.email)) {
      errors.email = "Введіть дійсну електронну пошту";
    }

    if (!state.password) {
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
    setState(initialState);
  };

  const handleRegistration = () => {
    if (validateForm()) {
      const registrationData = {
        login: state.login,
        email: state.email,
        password: state.password,
        photoAdded: state.photo,
      };
      dispatch(registerUserThunk(state));
      console.log("Реєстраційні дані:", registrationData);
      Alert.alert(
        "Реєстрація успішна! Облікові дані:",
        `${state.login} + ${state.email} + ${state.password}`,
        [
          {
            text: "OK",
            onPress: () => {
              clearRegistrationForm();
              navigation.navigate("BottomNavigator", {
                screen: "Posts",
              });
            },
          },
        ]
      );
    }
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
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
            <UserPhoto handlePhotoAdd={handlePhotoAdd} />
            {errorMessages.photo && (
              <Text style={styles.errorMessagePhoto}>{errorMessages.photo}</Text>
            )}
            <View style={styles.form}>
              <Text style={styles.titleEnter}>Реєстрація</Text>
              {errorMessages.login && !isLoginFocused && (
                <Text style={styles.errorMessage}>{errorMessages.login}</Text>
              )}
              <TextInput
                placeholder="Логін"
                value={state.login}
                autoComplete="username"
                style={[
                  styles.inputLogin,
                  isLoginFocused && styles.inputFocused,
                ]}
                onChangeText={(text) => handleInputChange("login", text)}
                onFocus={() => handleFocus("login")}
                onBlur={() => handleBlur("login")}
              />
              {errorMessages.email && !isEmailFocused && (
                <Text style={styles.errorMessage}>{errorMessages.email}</Text>
              )}
              <TextInput
                placeholder="Адреса електронної пошти"
                value={state.email}
                autoComplete="email"
                keyboardType="email-address"
                style={[
                  styles.inputEmail,
                  isEmailFocused && styles.inputFocused,
                ]}
                onChangeText={(text) => handleInputChange("email", text)}
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
              />
              {errorMessages.password && !isPasswordFocused && (
                <Text style={styles.errorMessage}>
                  {errorMessages.password}
                </Text>
              )}
              <View
                style={[
                  styles.inputPasswordContainer,
                  isPasswordFocused && styles.inputFocused,
                ]}
                onFocus={() => handleFocus("password")}
                onBlur={() => handleBlur("password")}
              >
                <TextInput
                  placeholder="Пароль"
                  value={state.password}
                  autoComplete="password"
                  secureTextEntry={!isPasswordVisible}
                  style={[
                    styles.inputPassword,
                    isPasswordFocused && styles.inputFocused,
                  ]}
                  onChangeText={(text) => handleInputChange("password", text)}
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!isPasswordVisible)}
                >
                  <Text
                    style={[
                      styles.buttonViewPassword,
                      isPasswordFocused && styles.inputFocused,
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
    marginTop: -28,
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
  errorMessagePhoto: {
    color: "#FF6C00",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    alignSelf: "center",
    top: -50,
  },
});

export default RegistrationScreen;
