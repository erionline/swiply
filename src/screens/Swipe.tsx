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
  Heading,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  getRandomProfile,
  updateProfileContact,
} from "../services/profile.service";
import React from "react";
import { auth } from "../services/firebase.service";

const Swipe = () => {
  const [user, setUser] = useState(null);

  const fetchRandomProfile = async () => {
    const profileData = await getRandomProfile();
    setUser(profileData);
  };

  const likeHandler = async () => {
    await updateProfileContact(user.uid, auth.currentUser);
    await fetchRandomProfile();
  };

  useEffect(() => {
    fetchRandomProfile();
  }, []);
  return (
    <NativeBaseProvider>
      <ScrollView>
        <Center>
          <Text>test</Text>
          {user ? (
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
                  uri: user.picture,
                }}
              ></Avatar>
              <Text>{user.name}</Text>
              <Text>{user.bio}</Text>
              <Button
                width={200}
                onPress={() => likeHandler()}
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
                onPress={() => fetchRandomProfile()}
                leftIcon={
                  <Icon
                    mb="1"
                    as={<MaterialCommunityIcons name="heart-broken" />}
                    color="white"
                    size="sm"
                  />
                }
              />
            </VStack>
          ) : (
            <Center>
              <Heading>La Liste est finis pour aujourd'hui</Heading>
            </Center>
          )}
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Swipe;
