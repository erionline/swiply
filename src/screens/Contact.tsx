import React from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Heading,
  NativeBaseProvider,
  Text,
  VStack,
} from "native-base";
import {
  fetchContactUsers,
  // fetchContactUsers,
  fetchPostsByUser,
  updateProfileContact,
} from "../services/profile.service";
import { auth } from "../services/firebase.service";
import { UserPost, UserProfile } from "../utils/entities/user.entity";
import { useEffect, useState } from "react";

const Contact = () => {
  const [contacts, setContacts] = useState<UserProfile[]>([]);
  const [contact, setContact] = useState<UserProfile>();
  const [posts, setPosts] = useState<UserPost[]>();

  const contactHandler = async (contact: UserProfile) => {
    setPosts(await fetchPostsByUser(contact.id));
    setContact({
      id: contact.id,
      name: contact.name,
      picture: contact.picture,
      bio: contact.bio,
      email: contact.email,
      posts: posts,
    });
    console.log(contacts);
  };

   useEffect(() => {
     const fetchContactUser = async () => {
       const contacts = await fetchContactUsers(auth.currentUser.uid);
       setContacts(contacts as UserProfile[]);
     };

     fetchContactUser();
   }, []);

  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Heading>Vos Contacts</Heading>
        {!contact ? (
          <>
            {contacts.map((contact) => (
              <HStack alignItems="center" key={contact.id}>
                <Button
                  w="50%"
                  marginY="2"
                  leftIcon={
                    <Avatar source={{ uri: contact.picture }} size="md" />
                  }
                  onPress={() => {
                    contactHandler(contact);
                  }}
                >
                  <VStack alignItems="flex-start">
                    <Text>{contact.name}</Text>
                    <Text>{contact.bio}</Text>
                  </VStack>
                </Button>
              </HStack>
            ))}
          </>
        ) : (
          <>
            <Avatar
              bg="green.500"
              alignSelf="center"
              size="xs"
              source={contact.picture && { uri: contact.picture }}
            >
              AJ
            </Avatar>
            <Text>{contact.name}</Text>
            <Text>{contact.bio}</Text>
            <Button
              w="50%"
              marginY="2"
              onPress={() => {
                setContact(null);
              }}
            >
              Retour
            </Button>
            <VStack marginY="5">
              {posts &&
                posts.map((post, i) => (
                  <Box key={i} borderWidth="1" marginY="5">
                    <Text>{post.content}</Text>
                    <Text color="gray.500">{post.date.toString()}</Text>
                  </Box>
                ))}
            </VStack>
          </>
        )}
      </Center>
    </NativeBaseProvider>
  );
};

export default Contact;
