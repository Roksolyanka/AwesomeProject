import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";

const initialState = {
  email: { value: "", isFocused: false },
  password: { value: "", isFocused: false },
};

const LoginScreen = () => {
  const [inputValues, setInputValues] = useState(initialState);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

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

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/images/photobg.png")}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={50}
        >
          <View style={styles.formContainer}>
            <View style={styles.form}>
              <Text style={styles.titleEnter}>Увійти</Text>
              <TextInput
                placeholder="Адреса електронної пошти"
                value={inputValues.email.value}
                onChangeText={(text) => handleInputChange("email", text)}
                style={[
                  styles.inputEmail,
                  inputValues.email.isFocused && styles.inputFocused,
                ]}
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
              />
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
                  onChangeText={(text) => handleInputChange("password", text)}
                  secureTextEntry={!isPasswordVisible}
                  style={[
                    styles.inputPassword,
                    inputValues.password.isFocused && styles.inputFocused,
                  ]}
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
              <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text style={styles.buttonText}>Увійти</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.textInfoLink}>
                  Немає акаунту? Зареєструватися
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
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
    paddingTop: 32,
    paddingBottom: 111,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "25 25 0 0",
    height: "489",
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
    width: "85%",
    marginLeft: "2%",
    marginRight: "2%",
    height: 50,
    flexShrink: 0,
    paddingLeft: 16,
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
    width: "85%",
    marginLeft: "2%",
    marginRight: "2%",
    height: 50,
    marginBottom: 43,
    backgroundColor: "#F6F6F6",
  },
  inputPassword: {
    height: 50,
    paddingLeft: 16,
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
    width: "85%",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
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
  textInfo: {
    color: "#1B4371",
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
});

export default LoginScreen;
