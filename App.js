import "react-native-gesture-handler";
import React from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/Screens/LoginScreen";
import RegistrationScreen from "./src/Screens/RegistrationScreen";
import { StatusBar } from "expo-status-bar";
import Home from "./src/Screens/Home";
import CommentsScreen from "./src/Screens/CommentsScreen";
import CreatePostsScreen from "./src/Screens/CreatePostsScreen";
import ProfileScreen from "./src/Screens/ProfileScreen";
import MapScreen from "./src/Screens/MapScreen";
import PostsScreen from "./src/Screens/PostsScreen";
import { Button, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Posts"
            component={PostsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreatePosts"
            component={CreatePostsScreen}
            options={{
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
                  <AntDesign
                    name="arrowleft"
                    size={24}
                    style={styles.iconGoBack}
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="Comments"
            component={CommentsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  iconGoBack: {
    color: "#212121CC",
    paddingLeft: 16,
  },
});
