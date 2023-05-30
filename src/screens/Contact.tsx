import React from "react";
import {
  View,
  Avatar,
  Box,
  Button,
  Heading,
  Text,
  VStack,
  ScrollView,
} from "native-base";
import {
  fetchContactUsers,
  fetchPostsByUser,
} from "../services/profile.service";
import { auth } from "../services/firebase.service";
import { UserPost, UserProfile } from "../utils/entities/user.entity";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import FeedPost from "../components/FeedPost";

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

    <View flex={0} bg="white" paddingX={5} paddingY={70}>
        <Heading>Posts of your contacts</Heading>
        <Text fontSize="sm" color="gray.500" marginBottom={5}>
          You can see the posts of the users you liked. They become your contacts.
        </Text>
        {!contact ? (
          <ScrollView marginBottom={20}>
            {contacts.map((contact) => (
                <Button
                  key={contact.id}
                  flex={1}
                  flexDirection={"row"}
                  justifyContent={"left"}
                  bg={"coolGray.200"}
                  w="full"
                  marginTop="2"
                  onPress={() => {
                    contactHandler(contact);
                  }}
                >
                  <Avatar
                    size={"md"}
                    source={contact.picture && { uri: contact.picture }}
                    borderRadius={"full"}
                    borderWidth={2}
                    borderColor={"coolGray.800"}
                  />
                  <VStack>
                    <Text color={"coolGray.800"} fontWeight={"bold"}>{contact.name}</Text>
                    <Text color={"coolGray.800"}>{contact.bio}</Text>
                  </VStack>
                </Button>
            ))}
          </ScrollView>
        ) : (
          <>  
                <Text fontSize="sm" color="coolGray.700">
                  Viewing {contact.name}'s posts
                </Text>
                <Box
                  flex={1}
                  flexDirection={"row"}
                  justifyContent={"left"}
                  bg={"coolGray.200"}
                  w="full"
                  marginY="2"
                  paddingY={2}
                  paddingX={2}
                  rounded={"lg"}
                >
                  <Avatar
                    size={"md"}
                    source={contact.picture && { uri: contact.picture }}
                    borderRadius={"full"}
                    borderWidth={2}
                    marginRight={2}
                    borderColor={"coolGray.800"}
                  />
                  <VStack>
                    <Text color={"coolGray.800"} fontWeight={"bold"}>{contact.name}</Text>
                    <Text color={"coolGray.800"}>{contact.bio}</Text>
                  </VStack>
                </Box>
            <VStack marginTop="5" marginBottom={"40"}>
              {posts &&
                posts.map((post, i) => (
                  <FeedPost
                    key={i}
                    post={{...post, authorAvatar: contact.picture, authorName: contact.name }}
                    index={i}
                    posts={posts.map((p) => { return { ...p, authorAvatar: contact.picture, authorName: contact.name }})}
                    setPosts={setPosts}
                    onLike={() => null}
                    withActions={false}
                  />
                ))}
            </VStack>
          </>
        )}
      </View>
  );
};

export default Contact;
