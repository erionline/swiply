import { StatusBar } from "expo-status-bar";
import { Box, NativeBaseProvider } from "native-base";
import { NavigationContainer, createNavigationContainerRef, useNavigation, useNavigationState, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Footer from "./src/components/Footer";
import Profile from "./src/screens/Profile";
import Contact from "./src/screens/Contact";
import Swipe from "./src/screens/Swipe";
import Auth from "./src/screens/Auth";
import React from "react";

const Stack = createNativeStackNavigator();

const App = ({ NavigationContainerRef }) => {
  const route = NavigationContainerRef;
  console.log(route);
  return (
    <NativeBaseProvider>
      <Box
        flex={1}
      >
      <NavigationContainer >
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Auth"
              component={Auth}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Swipe"
              component={Swipe}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Contact"
              component={Contact}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Profile"
              component={Profile}
            />
          </Stack.Navigator>
          {route &&
          <Footer/>}
          <StatusBar style="auto" />
        </NavigationContainer>
      </Box>
    </NativeBaseProvider>
  );
};

export default App;
