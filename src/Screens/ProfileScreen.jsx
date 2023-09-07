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

const ProfileScreen = () => {
  const [photoAvatarAdded, setPhotoAvatarAdded] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { publicationData } = route.params || {};
  const commentCount = route.params?.commentCount || 0;

  const handlePhotoAdd = () => {
    setPhotoAvatarAdded(!photoAvatarAdded);
  };

  const publications = publicationData ? [...publicationData] : [];

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/images/photobg.png")}
      >
        <SafeAreaView style={styles.safeContainer}>
          <View style={styles.profileContainer}>
            <UserPhoto
              photoAvatarAdded={photoAvatarAdded}
              handlePhotoAdd={handlePhotoAdd}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Feather name="log-out" size={24} style={styles.iconLogOut} />
            </TouchableOpacity>
            <Text style={styles.name}>Natali Romanova</Text>
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
                        <Text style={styles.location}>{item.location}</Text>
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
    // gap: 32,
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
