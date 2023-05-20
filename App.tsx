import { StatusBar } from "expo-status-bar";
import { Box, NativeBaseProvider } from "native-base";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Footer from "./src/components/Footer";
import Profile from "./src/screens/Profile";
import Contact from "./src/screens/Contact";
import Swipe from "./src/screens/Swipe";
import Auth from "./src/screens/Auth";
import React, { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {
  const [route, setRoute] = React.useState(false);

  useEffect(() => {
    const checkAsyncStorage = async () => {
      const token = await AsyncStorage.getItem('token');
      const profile = await AsyncStorage.getItem('profile');
  
      if (token && profile) {
        setRoute(true);
      } else {
        setRoute(false);
      }
    };
  
    checkAsyncStorage();
  }, []);

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
