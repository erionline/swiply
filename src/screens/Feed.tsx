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
import FeedPost from "../components/FeedPost";

const Feed = () => {
  const [user, setUser] = useState<UserProfile>(null);
  const [profiles, setProfiles] = useState<any>([]);
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [currentPost, setCurrentPost] = useState<UserPost>({
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

  const likeHandler = async (post: UserPost) => {
    await updateProfileContact(post.authorId, auth.currentUser);
    setPosts(posts.filter((p) => p !== post))
  };

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
          value={currentPost.content}
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
            setPosts([...posts, currentPost]);
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
            <FeedPost
              key={`post-${index}`}
              post={post}
              index={index}
              posts={posts}
              setPosts={setPosts}
              onLike={likeHandler}
              withActions={true}
            />
          ))}
        </VStack>



    </ScrollView>
  );
};

export default Feed;
