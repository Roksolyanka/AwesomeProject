import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";

const RegistrationScreen = () => {
  // const [isPasswordVisible, setPasswordVisible] = useState(false);
  // const [photoAdded, setPhotoAdded] = useState(false);

  // return (
  //   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //     <Image
  //       source={
  //         photoAdded
  //           ? require("../assets/images/avatar.png")
  //           : ''
  //       }
  //       style={{ width: 120, height: 120, marginBottom: 10 }}
  //     />
  //     {photoAdded ? (
  //       <TouchableOpacity onPress={() => setPhotoAdded(false)}>
  //         {/* Replace with your custom image */}
  //         <Image
  //           source={require("path_to_cross_icon.png")}
  //           style={{ width: 20, height: 20 }}
  //         />
  //       </TouchableOpacity>
  //     ) : (
  //       <TouchableOpacity onPress={() => setPhotoAdded(true)}>
  //         {/* Replace with your custom image */}
  //         <Image
  //           source={require("path_to_add_photo_icon.png")}
  //           style={{ width: 30, height: 30 }}
  //         />
  //       </TouchableOpacity>
  //     )}
  //     <Text>Реєстрація</Text>
  //     <TextInput
  //       placeholder="Логін"
  //       style={{ borderWidth: 1, padding: 10, margin: 10 }}
  //     />
  //     <TextInput
  //       placeholder="Адреса електронної пошти"
  //       style={{ borderWidth: 1, padding: 10, margin: 10 }}
  //     />
  //     <TextInput
  //       placeholder="Пароль"
  //       secureTextEntry={!isPasswordVisible}
  //       style={{ borderWidth: 1, padding: 10, margin: 10 }}
  //     />
  //     <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
  //       <Text>{isPasswordVisible ? "Приховати" : "Показати"} пароль</Text>
  //     </TouchableOpacity>
  //     <Button title="Зареєструватися" onPress={() => {}} />
  //     <TouchableOpacity
  //       onPress={() => {
  //         /* Navigate to LoginScreen */
  //       }}
  //     >
  //       <Text>Вже є акаунт? Увійти</Text>
  //     </TouchableOpacity>
  //   </View>
  // );
};

export default RegistrationScreen;
