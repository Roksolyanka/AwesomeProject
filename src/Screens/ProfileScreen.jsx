import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Text,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import UserPhoto from "../components/UserPhoto";
import { logoutUserThunk } from "../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { usePost, useUser } from "../hooks/index.js";
import {
  addLikeThunk,
  deleteLikeThunk,
  getMyPostThunk,
} from "../redux/posts/postOperations";
import { auth } from "../redux/config";
import { updatePage } from "../helpers/index";

const ProfileScreen = () => {
  const [update, setUpdate] = useState(false);
  const { user } = useUser();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { myPosts } = usePost();

  useEffect(() => {
    dispatch(getMyPostThunk());
  }, [dispatch]);

  const fetchMyPosts = async () => {
    setUpdate(true);
    try {
      await dispatch(getMyPostThunk());
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setUpdate(false);
  };

  const addLike = async (id, likes) => {
    const value = (likes += 1);
    dispatch(addLikeThunk({ id, value }));

    updatePage(id, () => {
      dispatch(getMyPostThunk());
    });
  };

  const deleteLike = async (id, likes) => {
    const value = (likes -= 1);
    dispatch(deleteLikeThunk({ id, value }));

    updatePage(id, () => {
      dispatch(getMyPostThunk());
    });
  };

  const uid = auth.currentUser ? auth.currentUser.uid : null;

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/images/photobg.png")}
      >
        <SafeAreaView style={styles.safeContainer}>
          <View style={styles.profileContainer}>
            <UserPhoto />
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
              refreshControl={
                <RefreshControl refreshing={update} onRefresh={fetchMyPosts} />
              }
              data={myPosts}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.publicationsContainer}>
                  <View style={styles.publicationContainer} key={item.name}>
                    {item.imageURL ? (
                      <Image
                        source={{ uri: item.imageURL }}
                        style={styles.photo}
                      />
                    ) : null}
                    <Text style={styles.publicationName}>{item.name}</Text>
                    <View style={styles.publicationDataContainer}>
                      <View style={styles.publicationIconContainer}>
                        {item.comments.length > 0 ? (
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate("Comments", {
                                post: item,
                              });
                            }}
                            style={styles.publicationCommentContainer}
                          >
                            <Ionicons
                              name="chatbubble"
                              size={24}
                              style={styles.icon}
                            />
                            <Text style={styles.count}>
                              {item.comments.length}
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate("Comments", {
                                post: item,
                              });
                            }}
                            style={styles.publicationCommentContainer}
                          >
                            <Ionicons
                              name="chatbubble-outline"
                              size={24}
                              style={styles.iconGray}
                            />
                            <Text style={styles.countZero}>
                              {item.comments.length}
                            </Text>
                          </TouchableOpacity>
                        )}
                        {item.liked.some(
                          (likedItem) => likedItem.userId === uid
                        ) ? (
                          <TouchableOpacity
                            onPress={() => deleteLike(item.id, item.likes)}
                            style={styles.publicationLikeContainer}
                          >
                            <Feather
                              name="thumbs-up"
                              size={24}
                              style={styles.icon}
                            />
                            <Text style={styles.count}>{item.likes}</Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => addLike(item.id, item.likes)}
                            style={styles.publicationLikeContainer}
                          >
                            <Feather
                              name="thumbs-up"
                              size={24}
                              style={styles.iconGray}
                            />
                            <Text style={[styles.count, styles.countZero]}>
                              {item.likes}
                            </Text>
                          </TouchableOpacity>
                        )}
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
  count: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
  },
  iconGray: {
    color: "#BDBDBD",
  },
  countZero: {
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
