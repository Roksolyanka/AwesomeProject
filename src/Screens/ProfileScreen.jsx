import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Text,
  FlatList,
  SafeAreaView,
} from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import UserPhoto from "../components/UserPhoto";
import globalState from "./globalState";
import { logoutUserThunk } from "../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { useUser } from "../hooks/index.js";

const ProfileScreen = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { publicationData } = route.params || {};

  const publications = publicationData ? [...publicationData] : [];

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/images/photobg.png")}
      >
        <SafeAreaView style={styles.safeContainer}>
          <View style={styles.profileContainer}>
            <UserPhoto/>
            <TouchableOpacity
              onPress={() => {
                dispatch(logoutUserThunk());
                navigation.navigate("Login");
              }}
            >
              <Feather name="log-out" size={24} style={styles.iconLogOut} />
            </TouchableOpacity>
            {user && <Text style={styles.name}>{user.displayName}</Text>}
            <FlatList
              data={publications}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.publicationsContainer}>
                  <View style={styles.publicationContainer} key={item.name}>
                    <Image source={{ uri: item.photo }} style={styles.photo} />
                    <Text style={styles.publicationName}>{item.name}</Text>
                    <View style={styles.publicationDataContainer}>
                      <View style={styles.publicationIconContainer}>
                        {globalState.commentCounts[item.photo] !== undefined ? (
                          <>
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate("Comments", {
                                  photo: item.photo,
                                });
                              }}
                              style={styles.publicationCommentContainer}
                            >
                              <Ionicons
                                name="chatbubble"
                                size={24}
                                style={styles.icon}
                              />
                              <Text style={styles.commentCount}>
                                {globalState.commentCounts[item.photo]}
                              </Text>
                            </TouchableOpacity>
                          </>
                        ) : (
                          <>
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate("Comments", {
                                  photo: item.photo,
                                });
                              }}
                              style={styles.publicationCommentContainer}
                            >
                              <Ionicons
                                name="chatbubble-outline"
                                size={24}
                                style={styles.iconWithoutComments}
                              />
                              <Text
                                style={[
                                  styles.commentCount,
                                  styles.commentCountZero,
                                ]}
                              >
                                0
                              </Text>
                            </TouchableOpacity>
                          </>
                        )}
                        <View style={styles.publicationLikeContainer}>
                          <Feather
                            name="thumbs-up"
                            size={24}
                            style={styles.icon}
                          />
                          <Text style={styles.likeCount}>153</Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={styles.publicationLocationContainer}
                        onPress={() => {
                          navigation.navigate("Map");
                        }}
                      >
                        <AntDesign
                          name="enviromento"
                          size={24}
                          style={styles.iconLocation}
                        />
                        <Text style={styles.location}>
                          {item.location}, {item.geolocation}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  safeContainer: {
    flex: 1,
  },
  profileContainer: {
    flex: 1,
    justifyContent: "flex-end",
    position: "relative",
    marginTop: 147,
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  iconLogOut: {
    alignSelf: "flex-end",
    top: -102,
    color: "#BDBDBD",
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
    marginTop: -52,
  },
  publicationsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  publicationContainer: {
    width: "100%",
    marginBottom: 23,
  },
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 10,
  },
  publicationName: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    marginBottom: 10,
  },
  publicationDataContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  publicationIconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 24,
  },
  publicationCommentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 6,
    alignItems: "center",
  },
  commentCount: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
  },
  iconWithoutComments: {
    color: "#BDBDBD",
  },
  commentCountZero: {
    color: "#BDBDBD",
  },
  publicationLikeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 6,
    alignItems: "center",
  },
  icon: {
    color: "#FF6C00",
  },
  likeCount: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
  },
  publicationLocationContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    flexShrink: 1,
    alignItems: "center",
  },
  iconLocation: {
    color: "#BDBDBD",
  },
  location: {
    color: "#212121",
    textAlign: "right",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    textDecorationLine: "underline",
    flexShrink: 1,
  },
});

export default ProfileScreen;
