import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Box, NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "./src/components/BottomNavigation";
import Profile from "./src/screens/Profile";
import Contact from "./src/screens/Contact";
import Feed from "./src/screens/Feed";
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
        <NavigationContainer>
          <Stack.Navigator>
            {!user ?
            <Stack.Screen
              options={{ headerShown: false }}
              name="Auth"
              component={Auth}
            /> : <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Feed"
              component={Feed}
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
          {user ? <BottomNavigation /> : ""}
        </NavigationContainer>
        <StatusBar style="auto" />
    </NativeBaseProvider>
  );
};

export default App;
