import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Box, NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Footer from "./src/components/Footer";
import Profile from "./src/screens/Profile";
import Contact from "./src/screens/Contact";
import Swipe from "./src/screens/Swipe";
import Auth from "./src/screens/Auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/services/firebase.service";

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        const uid = user.uid;
        setUser(uid);
      } else {
        setUser(null);
      }
    })
  })

  return (
    <NativeBaseProvider>
      <Box flex={1}>
        <NavigationContainer>
          <Stack.Navigator>
            {!user ?
            <Stack.Screen
              options={{ headerShown: false }}
              name="Auth"
              component={Auth}
            /> :
            <>
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
            </>}
          </Stack.Navigator>
          {user ? <Footer /> : ""}
        </NavigationContainer>
        <StatusBar style="auto" />
      </Box>
    </NativeBaseProvider>
  );
};

export default App;
