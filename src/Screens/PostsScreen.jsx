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

const PostsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { publicationData } = route.params || {};
  const commentCount = route.params?.commentCount || 0;
  const publications = publicationData ? publicationData : [];

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={require("../assets/images/avatar.png")}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>

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
                <Text style={styles.publicationName}>{publication.name}</Text>
                <View style={styles.publicationDataContainer}>
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
                        <Text style={styles.commentCount}>{commentCount}</Text>
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
                          style={[styles.commentCount, styles.commentCountZero]}
                        >
                          {commentCount}
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
                    <Text style={styles.location}>{publication.location}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
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
    paddingVertical: 32,
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
  icon: {
    color: "#FF6C00",
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

export default PostsScreen;
