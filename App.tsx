import { StatusBar } from "expo-status-bar";
import { Box, NativeBaseProvider } from "native-base";
import { NavigationContainer, createNavigationContainerRef, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Footer from "./src/components/Footer";
import Profile from "./src/screens/Profile";
import Contact from "./src/screens/Contact";
import Swipe from "./src/screens/Swipe";
import Auth from "./src/screens/Auth";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <Box
        flex={1}
      >
      <NavigationContainer>
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
          <Footer/>
          <StatusBar style="auto" />
        </NavigationContainer>
      </Box>
    </NativeBaseProvider>
  );
};

export default App;
