import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { updateCommentCount } from "./globalState";

const CommentsScreen = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const route = useRoute();
  const { photo } = route.params || {};

  const formatCommentDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = new Date(date).toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const [day, month, year] = formattedDate.split(" ");

    return `${day} ${month}, ${year} | ${formattedTime}`;
  };

  const handleAddComment = () => {
    if (newComment) {
      const currentDate = new Date().toISOString();
      const formattedDate = formatCommentDate(currentDate);

      const updatedComments = [
        ...comments,
        { text: newComment, date: formattedDate },
      ];

      setComments(updatedComments);
      setNewComment("");
      console.log(updatedComments);
      console.log(updatedComments.length);
      const publicationId = photo;
      updateCommentCount(publicationId, updatedComments.length);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={-120}
      >
        <View style={styles.photoContainer}>
          <Image source={{ uri: photo }} style={styles.photo} />
        </View>
        <ScrollView style={styles.commentsContainer}>
          {comments.map((comment, index) => (
            <View key={index} style={styles.commentItem}>
              <Image
                source={require("../assets/images/avatar.png")}
                style={styles.commentatorPhoto}
              />
              <View style={styles.commentContainer}>
                <Text style={styles.commentText}>{comment.text}</Text>
                <Text style={styles.commentDate}>{comment.date}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Коментувати..."
            placeholderTextColor="#BDBDBD"
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity onPress={handleAddComment}>
            <Ionicons
              name="arrow-up-circle"
              size={34}
              style={styles.iconButtonUp}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
  },
  photoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    position: "relative",
  },
  commentsContainer: {
    flex: 1,
  },
  commentItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
    width: "100%",
  },
  commentatorPhoto: {
    width: 28,
    height: 28,
    borderRadius: 28,
  },
  commentContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    maxWidth: "100%",
    padding: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  commentText: {
    width: "100%",
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 18,
    marginBottom: 8,
  },
  commentDate: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "right",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: "#F6F6F6",
    padding: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
  },
  commentInput: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 7,
    paddingLeft: 8,
  },
  iconButtonUp: {
    color: "#FF6C00",
  },
});

export default CommentsScreen;
