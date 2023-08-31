import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Text,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

const ProfileScreen = () => {
  const [photoAdded, setPhotoAdded] = useState(false);

  const handlePhotoAdd = () => {
    setPhotoAdded(!photoAdded);
  };

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("../assets/images/photobg.png")}
    >
      <View style={styles.mainContainer}>
        <View style={styles.avatarContainer}>
          {photoAdded ? (
            <>
              <Image
                source={require("../assets/images/avatar.png")}
                style={styles.avatar}
              />
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={handlePhotoAdd}>
                  <AntDesign
                    style={styles.iconWithPhoto}
                    name="closecircleo"
                    size={25}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <Feather name="log-out" size={24} style={styles.iconLogOut} />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={[styles.withoutAvatar]}></View>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={handlePhotoAdd}>
                  <AntDesign
                    style={styles.iconWithoutPhoto}
                    name="pluscircleo"
                    size={25}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <Feather name="log-out" size={24} style={styles.iconLogOut} />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
        <Text style={styles.name}>Natali Romanova</Text>
      </View>
    </ImageBackground>
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
  mainContainer: {
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
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    gap: 80,
    marginTop: 16,
  },
  iconLogOut: {
    color: "#BDBDBD",
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
    color: "#BDBDBD",
  },
  iconWithoutPhoto: {
    color: "#FF6C00",
  },
  name: {
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
});

export default ProfileScreen;
