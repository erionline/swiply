import { Avatar, Box, Button, HStack, Icon, Input, ScrollView, Text, VStack } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  createPost,
  fetchPostsByUser,
  getRandomProfile,
  getUserProfile,
  updateProfileContact,
} from "../services/profile.service";
import React from "react";
import { auth } from "../services/firebase.service";
import Header from "../components/Header";
import { UserPost, UserProfile } from "../utils/entities/user.entity";
import { User } from "firebase/auth";
import { getRandomUserPosts } from "../services/posts.service";

const Feed = () => {
  const [user, setUser] = useState<UserProfile>(null);
  const [profiles, setProfiles] = useState<any>([]);
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [currentPost, setCurrentPost] = useState<UserPost>({
    title: "",
    content: "",
    authorId: auth.currentUser.uid,
    authorAvatar: user?.picture,
    authorName: user?.name,
    date: new Date(),
    likes: 0,
    comments: [],
  });

  const fetchRandomProfile = async () => {
    const profileData = await getRandomProfile();
    setProfiles(profileData);
  };

  const likeHandler = async (followedUser: User['uid']) => {
    await updateProfileContact(followedUser, auth.currentUser);
    await fetchRandomProfile();
  };

  // useEffect(() => {
  //   fetchRandomProfile();
  // }, []);

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await getUserProfile(auth.currentUser.uid);
      setUser(profile as UserProfile);
    };
    const fetchUserPost = async () => {
      const posts = await getRandomUserPosts();
      setPosts(posts as UserPost[]);
    };

    fetchUserPost();
    fetchUserProfile();
    console.log(posts);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <ScrollView flex={1} bg="white" paddingX={5} paddingY={60}>
      <Header name={user.name} picture={user.picture} />

        <HStack justifyContent="space-between" alignItems="center">
        <Input
          placeholder="What's on your mind?"
          fontSize={13}
          width="82%"
          borderRadius={20}
          borderWidth={1}
          borderColor="coolGray.200"
          p={3}
          my={5}
          mr={2}
          // Add pencil icon on the left of the input
          InputLeftElement={
            <MaterialCommunityIcons
              name="pencil"
              size={20}
              color="red.500"
              style={{ marginLeft: 10, color: "gray" }}
            />
          }
          // Update current post content
          onChangeText={(text) =>
            setCurrentPost({ ...currentPost, content: text })
          }
          // Send post when user press enter key on keyboard
          onSubmitEditing={() => {
            createPost(currentPost);
            setCurrentPost({ ...currentPost, content: "" });
          }}
        />

        <Button
          bg="info.500"
          width="15%"
          borderRadius={20}
          onPress={() => {
            createPost(currentPost);
            setCurrentPost({ ...currentPost, content: "" });
          }}
          leftIcon={
            <Icon
              mb="1"
              as={<MaterialCommunityIcons name="send" />}
              color="white"
              size="sm"
            />
          }
        />
        </HStack>

        {/* Display user posts */}
        <VStack justifyContent="space-between" alignItems="center" paddingBottom={"40"}>
          {posts.map((post, index) => (
            <Box
              key={`post-${index}`}
              bg="coolGray.50"
              shadow={2}
              rounded="lg"
              p={5}
              my={4}
              width={'full'}
            >
              <Button
                position={'absolute'}
                bottom={-15}
                right={-10}
                bg={'green.500'}
                width={"12%"}
                height={"8"}
                onPress={() => likeHandler(post.authorId)}
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
                position={'absolute'}
                bottom={-15}
                left={-10}
                bg={'rose.500'}
                width={"12%"}
                height={"8"}
                onPress={() => setPosts(posts.filter((p) => p !== post))}
                leftIcon={
                  <Icon
                    mb="1"
                    as={<MaterialCommunityIcons name="heart-broken" />}
                    color="white"
                    size="sm"
                  />
                }
              />
              <Text>{post.content}</Text>

              <HStack justifyContent="space-between" alignItems="center" mt={5}>
                <HStack alignItems="center">
                  <Avatar
                    bg="coolGray.500"
                    size="sm"
                    source={post.authorAvatar && { uri: post.authorAvatar }}
                  />
                  <VStack ml={2}>
                    <Text fontWeight="bold" color="coolGray.900">
                      {post.authorName}
                    </Text>
                    <Text marginTop={-1} color="coolGray.500">
                      @{post.authorName.toLowerCase().replace(" ", "").trim()}
                    </Text>
                  </VStack>
                </HStack>
                <HStack alignItems="center">
                </HStack>
              </HStack>
            </Box>
          ))}
        </VStack>



    </ScrollView>
  );
};

export default Feed;
