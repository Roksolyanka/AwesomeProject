import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNavigator from "./BottomNavigator";
import LoginScreen from "../Screens/LoginScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";
import CommentsScreen from "../Screens/CommentsScreen";
import ButtonGoBack from "../components/ButtonGoBack";
import MapScreen from "../Screens/MapScreen";

const Stack = createStackNavigator();

export default function MainNavigator() {
   return (
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
         name="BottomNavigator"
         component={BottomNavigator}
         options={{ headerShown: false }}
       />
       <Stack.Screen
         name="Comments"
         component={CommentsScreen}
         options={{
           title: "Коментарі",
           headerStyle: {
             backgroundColor: "#FFF",
             borderBottomWidth: 1,
             boxShadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.30)",
           },
           headerTitleStyle: {
             color: "#212121",
             fontFamily: "Roboto-Bold",
             fontSize: 17,
             fontStyle: "normal",
             fontWeight: "500",
             lineHeight: 22,
             letterSpacing: -0.408,
           },
           headerTitleAlign: "center",
           headerLeft: () => <ButtonGoBack />,
         }}
       />
       <Stack.Screen
         name="Map"
         component={MapScreen}
         options={{ headerShown: false }}
       />
     </Stack.Navigator>
   );
}
