import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [photoAdded, setPhotoAdded] = useState(false);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
    login: false,
  });
  const [inputValues, setInputValues] = useState(initialState);

  const handleInputChange = (inputName, text) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [inputName]: text,
    }));
  };

  const handleFocus = (inputName) => {
    setIsFocused((prev) => ({ ...prev, [inputName]: true }));
  };

  const handleBlur = (inputName) => {
    setIsFocused((prev) => ({ ...prev, [inputName]: false }));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/images/photobg.png")}
      >
        <View style={styles.formContainer}>
          {photoAdded ? (
            <>
              <Image
                source={require("../assets/images/avatar.png")}
                style={styles.avatar}
              />
              <TouchableOpacity onPress={() => setPhotoAdded(false)}>
                <AntDesign
                  style={styles.icon}
                  name="closecircleo"
                  size={24}
                  color="#BDBDBD"
                />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View
                style={[
                  styles.avatar,
                  {
                    width: 120,
                    height: 120,
                    backgroundColor: "#F6F6F6",
                  },
                ]}
              ></View>
              <TouchableOpacity onPress={() => setPhotoAdded(true)}>
                <AntDesign
                  style={styles.icon}
                  name="pluscircleo"
                  size={24}
                  color="#FF6C00"
                />
              </TouchableOpacity>
            </>
          )}

          <View style={styles.form}>
            <Text style={styles.titleEnter}>Реєстрація</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
              keyboardVerticalOffset={163}
            >
              <TextInput
                placeholder="Логін"
                style={[
                  styles.inputLogin,
                  isFocused.login ? styles.inputFocused : null,
                  { color: isFocused.login ? "#212121" : "#212121" },
                ]}
                value={inputValues.login}
                onChangeText={(text) => handleInputChange("login", text)}
                onFocus={() => handleFocus("login")}
                onBlur={() => handleBlur("login")}
              />
              <TextInput
                placeholder="Адреса електронної пошти"
                style={[
                  styles.inputEmail,
                  isFocused.email ? styles.inputFocused : null,
                  { color: isFocused.email ? "#212121" : "#212121" },
                ]}
                value={inputValues.email}
                onChangeText={(text) => handleInputChange("email", text)}
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
              />
              <View
                style={[
                  styles.inputPasswordContainer,
                  isFocused.password ? styles.inputFocused : null,
                ]}
                onFocus={() => handleFocus("password")}
                onBlur={() => handleBlur("password")}
              >
                <TextInput
                  placeholder="Пароль"
                  value={inputValues.password}
                  onChangeText={(text) => handleInputChange("password", text)}
                  secureTextEntry={!isPasswordVisible}
                  style={[
                    styles.inputPassword,
                    isFocused.password ? styles.inputFocused : null,
                    { color: isFocused.password ? "#212121" : "#212121" },
                  ]}
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!isPasswordVisible)}
                >
                  <Text style={styles.buttonViewPassword}>
                    {isPasswordVisible ? "Приховати" : "Показати"}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text style={styles.buttonText}>Зареєструватися</Text>
              </TouchableOpacity>
              <View style={styles.textInfoContainer}>
                <Text style={styles.textInfo}>Вже є акаунт?</Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.textInfoLink}>Увійти</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
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
    paddingBottom: 45,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "flex-end",
  },
  avatar: {
    width: 120,
    height: 120,
    position: "absolute",
    top: -60,
    left: "50%",
    marginLeft: -60,
    borderRadius: 20,
  },
  icon: {
    left: "63%",
    top: 16,
  },
  form: {
    alignItems: "center",
    height: "489",
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
    width: 343,
    height: 50,
    flexShrink: 0,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 15,
    backgroundColor: "#F6F6F6",
    color: "#BDBDBD",
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
    width: 343,
    height: 50,
    flexShrink: 0,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 15,
    backgroundColor: "#F6F6F6",
    color: "#BDBDBD",
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
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
  },
  inputPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 5,
    width: 343,
    height: 50,
    marginBottom: 43,
    backgroundColor: "#F6F6F6",
  },
  inputPassword: {
    width: 343,
    height: 50,
    flexShrink: 0,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 15,
    backgroundColor: "#F6F6F6",
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    flex: 1,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRightWidth: 0,
    borderRadius: 5,
    zIndex: 1,
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
    width: 343,
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
  textInfoContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
  },
  textInfo: {
    color: "#1B4371",
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
});

export default RegistrationScreen;
