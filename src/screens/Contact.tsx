import React from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Heading,
  NativeBaseProvider,
  ScrollView,
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
import Header from "../components/Header";

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
    };

   useEffect(() => {
     const fetchContactUser = async () => {
       const contacts = await fetchContactUsers(auth.currentUser.uid);
       setContacts(contacts as UserProfile[]);
     };

     fetchContactUser();
   }, []);

  return (

    <ScrollView flex={1} bg="white" paddingX={5} paddingY={60}>
        <Heading>Posts de vos contacts</Heading>
        <Text fontSize="sm" color="gray.500">
          You can see the posts of the users you liked. They become your contacts.
        </Text>
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
                    <Text color={"white"}>{contact.name}</Text>
                    <Text color={"white"}>{contact.bio}</Text>
                  </VStack>
                </Button>
              </HStack>
            ))}
          </>
        ) : (
          <>
            <Text>{contact.name}</Text>
            <Text>{contact.bio}</Text>
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
      </ScrollView>
  );
};

export default Contact;
