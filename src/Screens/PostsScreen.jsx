import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import globalState from "./globalState";
import { useUser } from "../hooks/index";

const PostsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { publicationData } = route.params || {};
  const publications = publicationData ? publicationData : [];
  const { user } = useUser();
  console.log("user.photoURL:", user.photoURL);
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        {user && user.photoURL ? (
          <Image source={{ uri: user.photoURL }} style={styles.avatar}></Image>
        ) : (
          <View style={styles.withoutAvatar}></View>
        )}
        {user && (
          <View>
            <Text style={styles.userName}>{user.displayName}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        )}
      </View>

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
                        style={[styles.commentCount, styles.commentCountZero]}
                      >
                        0
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 23,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  withoutAvatar: {
    backgroundColor: "#F6F6F6",
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userName: {
    fontFamily: "Roboto-Bold",
    color: "#212121",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "700",
  },
  email: {
    fontFamily: "Roboto-Regular",
    color: "rgba(33, 33, 33, 0.80)",
    fontSize: 11,
    fontStyle: "normal",
    fontWeight: "400",
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
    gap: 45,
  },
  publicationCommentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 6,
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
  icon: {
    color: "#FF6C00",
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

export default PostsScreen;
