import {
  Avatar,
  Center,
  NativeBaseProvider,
  ScrollView,
  VStack,
  Text,
  HStack,
  Button,
  Icon,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { getRandomProfile } from "../services/profile.service";
import React from "react";

const Swipe = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchRandomProfile = async () => {
      const profileData = await getRandomProfile();
      console.log(profileData);
      setUser(profileData);
    };

    fetchRandomProfile();
  }, []);

  return (
    <NativeBaseProvider>
      <ScrollView flex={1}>
        <Center>
          {user && (
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
              <Text>{user.name}</Text>
              <Text>{user.bio}</Text>
              <HStack>
                <Button
                  width={200}
                  leftIcon={
                    <Icon
                      mb="1"
                      as={<MaterialCommunityIcons name="heart" />}
                      color="white"
                      size="sm"
                    />
                  }
                />
                <Button
                  width={200}
                  leftIcon={
                    <Icon
                      mb="1"
                      as={<MaterialCommunityIcons name="heart-broken" />}
                      color="white"
                      size="sm"
                    />
                  }
                />
              </HStack>
            </VStack>
          )}
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Swipe;
