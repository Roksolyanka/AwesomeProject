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

const ProfileScreen = () => {
  const [photoAvatarAdded, setPhotoAvatarAdded] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { publicationData } = route.params || {};
  const commentCount = route.params?.commentCount || 0;

  const handlePhotoAdd = () => {
    setPhotoAvatarAdded(!photoAvatarAdded);
  };

  const publications = publicationData ? publicationData : [];

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/images/photobg.png")}
      >
        <SafeAreaView style={styles.safeContainer}>
          <View style={styles.profileContainer}>
            <View style={styles.avatarContainer}>
              {photoAvatarAdded ? (
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
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Login");
                      }}
                    >
                      <Feather
                        name="log-out"
                        size={24}
                        style={styles.iconLogOut}
                      />
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
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Login");
                      }}
                    >
                      <Feather
                        name="log-out"
                        size={24}
                        style={styles.iconLogOut}
                      />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
            <Text style={styles.name}>Natali Romanova</Text>
            <FlatList
              data={publications}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.publicationsContainer}>
                  {publicationData.map((publication, index) => (
                    <View style={styles.publicationContainer} key={index}>
                      <Image
                        source={require("../assets/images/mountains.png")}
                        style={styles.photo}
                      />
                      <Text style={styles.publicationName}>
                        {publication.name}
                      </Text>
                      <View style={styles.publicationDataContainer}>
                        <View style={styles.publicationIconContainer}>
                          {commentCount !== 0 ? (
                            <>
                              <TouchableOpacity
                                onPress={() => {
                                  navigation.navigate("Comments");
                                }}
                                style={styles.publicationCommentContainer}
                              >
                                <Ionicons
                                  name="chatbubble"
                                  size={24}
                                  style={styles.icon}
                                />
                                <Text style={styles.commentCount}>
                                  {commentCount}
                                </Text>
                              </TouchableOpacity>
                            </>
                          ) : (
                            <>
                              <TouchableOpacity
                                onPress={() => {
                                  navigation.navigate("Comments");
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
                                  {commentCount}
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
                            {publication.location}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
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
    paddingBottom: 45,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    top: -60,
    borderRadius: 20,
    alignItems: "center",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    gap: 70,
    marginTop: -104,
  },
  iconLogOut: {
    color: "#BDBDBD",
  },
  withoutAvatar: {
    width: 120,
    height: 120,
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
  publicationsContainer: {
    display: "flex",
    gap: 32,
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  publicationContainer: {
    width: "100%",
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
  },
  commentCount: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    alignSelf: "flex-end",
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
    alignSelf: "flex-end",
  },
  publicationLocationContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
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
  },
});

export default ProfileScreen;
