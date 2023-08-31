import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import PostsScreen from "./PostsScreen";

const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "white",
          paddingTop: 9,
          paddingBottom: 9,
          borderTopWidth: 1,
          boxShadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.30)",
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 1,
            boxShadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.30)",
          },
          headerTitleStyle: {
            color: "#212121",
            fontFamily: "Roboto-Regular",
            fontSize: 17,
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: 22,
            letterSpacing: -0.408,
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
              <Feather name="log-out" size={24} style={styles.iconLogOut} />
            </TouchableOpacity>
          ),
          tabBarIcon: () => (
            <AntDesign name="appstore-o" color="#212121CC" size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          tabBarVisible: false,
          title: "Створити публікацію",
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 1,
            boxShadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.30)",
          },
          headerTitleStyle: {
            color: "#212121",
            fontFamily: "Roboto-Regular",
            fontSize: 17,
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: 22,
            letterSpacing: -0.408,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => {}}>
              <AntDesign name="arrowleft" size={24} style={styles.iconGoBack} />
            </TouchableOpacity>
          ),
          tabBarIcon: () => (
            <View style={styles.iconContainer}>
              <AntDesign name="plus" color="#fff" size={24} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <Feather name="user" color="#212121CC" size={24} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconGoBack: {
    color: "#212121CC",
    paddingLeft: 16,
  },
  iconLogOut: {
    color: "#BDBDBD",
    paddingRight: 10,
  },
  iconContainer: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    alignSelf: "center",
  },
});

export default Home;
