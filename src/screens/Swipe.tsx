import {
    Avatar,
  Button,
  Center,
  Heading,
  NativeBaseProvider,
  ScrollView,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { getRandomProfile } from "../services/profile.service";

const Swipe = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchRandomProfile = async () => {
          const profileData = await getRandomProfile();
          setUser(profileData);
        };
    
        fetchRandomProfile();
      }, []);

  return (
    <NativeBaseProvider>
      <ScrollView flex={1}>
        <Center>
            {user && 
          <VStack
            space={2}
            alignItems={{
              base: "center",
              md: "flex-start",
            }}
          >
            <Avatar
              bg="green.500"
              alignSelf="center"
              size="xs"
              source={{
                uri: user.photoURL,
              }}
            >
              AJ
            </Avatar>
          </VStack>
          }
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Swipe;
