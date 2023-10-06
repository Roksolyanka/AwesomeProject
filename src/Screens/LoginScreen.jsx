import { useNavigation } from "@react-navigation/native";
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
import { useDispatch } from "react-redux";
import { loginUserThunk } from "../redux/auth/authOperations";
import { userVerification } from "../firebase/index";
import { auth } from "../redux/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import Spinner from "react-native-loading-spinner-overlay";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = () => {
  const [state, setState] = useState(initialState);
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [waitingProcess, setWaitingProcess] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleInputChange = (inputName, text) => {
    setState((prevValues) => ({
      ...prevValues,
      [inputName]: text,
    }));
  };

  const handleFocus = (inputName) => {
    if (inputName === "email") {
      setEmailFocused(true);
      setPasswordFocused(false);
    } else if (inputName === "password") {
      setEmailFocused(false);
      setPasswordFocused(true);
    }
  };

  const handleBlur = () => {
    setEmailFocused(false);
    setPasswordFocused(false);
  };

  const validateForm = async () => {
    const errors = {};

    if (!state.email) {
      errors.email = "Електронна пошта обов'язкова";
    } else if (!isValidEmail(state.email)) {
      errors.email = "Введіть дійсну електронну пошту";
    } else {
      const userExists = await userVerification(state.email);
      if (!userExists) {
        errors.email = "Користувач з такою електронною адресою не існує!";
      }
    }

    if (!state.password) {
      errors.password = "Пароль обов'язковий";
    } else {
      try {
        await signInWithEmailAndPassword(auth, state.email, state.password);
      } catch (error) {
        errors.password = "Невірний пароль";
      }
    }

    setErrorMessages(errors);

    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailStandart = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailStandart.test(email);
  };

  const clearLoginForm = () => {
    setState(initialState);
  };

  const handleLogin = async () => {
    setWaitingProcess(true);
    if (await validateForm()) {
      const loginData = {
        email: state.email,
        password: state.password,
      };
      dispatch(loginUserThunk(loginData));
      clearLoginForm();
      navigation.reset({
        index: 0,
        routes: [{ name: "BottomNavigator" }],
      });
    }
    setWaitingProcess(false);
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
        keyboardVerticalOffset={-220}
      >
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../assets/images/photobg.png")}
        >
          <View style={styles.formContainer}>
            <View style={styles.form}>
              <Text style={styles.titleEnter}>Увійти</Text>
              {errorMessages.email && !isEmailFocused && (
                <Text style={styles.errorMessage}>{errorMessages.email}</Text>
              )}
              <TextInput
                placeholder="Адреса електронної пошти"
                value={state.email}
                autoComplete="email"
                autoCapitalize="none"
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
                  autoCapitalize="none"
                  onChangeText={(text) => handleInputChange("password", text)}
                  secureTextEntry={!isPasswordVisible}
                  style={[
                    styles.inputPassword,
                    isPasswordFocused && styles.inputFocused,
                  ]}
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
                title="Login"
                style={styles.button}
                onPress={() => {
                  handleLogin();
                }}
              >
                <Text style={styles.buttonText}>Увійти</Text>
              </TouchableOpacity>
              <Spinner
                visible={waitingProcess}
                textContent={"Очікування..."}
                textStyle={styles.spinnerTextStyle}
                overlayColor="linear-gradient(rgba(46, 47, 66, 0.6), rgba(46, 47, 66, 0.6))"
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Registration");
                }}
              >
                <Text style={styles.textInfoLink}>
                  Немає акаунту? Зареєструватися
                </Text>
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
    paddingTop: 32,
    paddingBottom: 111,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 5,
    width: "100%",
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
    textAlign: "center",
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

export default LoginScreen;
