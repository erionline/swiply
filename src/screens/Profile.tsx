import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  HStack,
  Icon,
  Input,
  ScrollView,
  Text,
  TextArea,
  VStack,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { logOut } from "../services/auth.service";
import {
  updateProfileDetails,
  getUserProfile,
  updateProfileImage,
  createPost,
  fetchPostsByUser,
} from "../services/profile.service";
import { auth } from "../services/firebase.service";
import { useAtom } from "jotai";
import { UserPost, UserProfile, userAtom } from "../utils/entities/user.entity";
import Feed from "./Feed";
import FeedPost from "../components/FeedPost";
import { View } from "react-native";

const Profile = () => {
  const [editMode, setEditMode] = React.useState(false);
  const [user, setUser] = useAtom(userAtom);
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [currentPost, setCurrentPost] = useState<{
    title: string;
    content: string;
  }>();

  const onLogOutHandler = () => {
    logOut();
  };

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await getUserProfile(auth.currentUser.uid);
      setUser(profile as UserProfile);
    };
    const fetchUserPost = async () => {
      const posts = await fetchPostsByUser(auth.currentUser.uid);
      setPosts(posts as UserPost[]);
    };

    fetchUserPost();
    fetchUserProfile();
  }, [editMode, currentPost]);

  return (
      <ScrollView flex={1} paddingY={60} paddingX={5}>
        <Box
          position={'absolute'}
          top={-60}
          left={-20}
          right={-20}
          height={170}
          bg={'coolGray.800'}
          zIndex={-1}
          borderBottomRightRadius={60}
        />

        <Box>
          {user && (
            editMode ?
              <View>
                <Avatar
                bg="coolGray.100"
                size="xl"
                source={user.picture && { uri: user.picture }}
                borderRadius={"full"}
                borderWidth={2}
                opacity={0.5}
                borderColor={"coolGray.100"}
              />
              <Button
                position={'absolute'}
                width={"98"}
                height={"98"}
                opacity={0.7}
                bg={'coolGray.800'}
                borderRadius={"full"}
                onPress={() => updateProfileImage(auth.currentUser)}
                leftIcon={
                  <Icon
                    mb="1"
                    as={<MaterialCommunityIcons name="camera" />}
                    color="white"
                    size="sm"
                  />
                }
              />
              </View>
             :
            <Avatar
              bg="coolGray.100"
              size="xl"
              source={user.picture && { uri: user.picture }}
              borderRadius={"full"}
              borderWidth={2}
              borderColor={"coolGray.100"}
            />
          
          )}
          {user ? (
            editMode ? (
              <>
                <FormControl marginTop={10}>
                  <Text fontSize={'2xl'} fontWeight={"semibold"}>Edit your profile</Text>
                  <FormControl.Label>Name</FormControl.Label>
                  <Input
                    width={"full"}
                    placeholder={user.name}
                    onChangeText={(textEntered) =>
                      setUser({ ...user, name: textEntered })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Bio</FormControl.Label>
                  <Input
                    width={"full"}
                    placeholder={user.bio}
                    onChangeText={(textEntered) =>
                      setUser({ ...user, bio: textEntered })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    type="password"
                    width={"full"}
                    placeholder="********"
                    onChangeText={(textEntered) =>
                      setUser({ ...user, password: textEntered })
                    }
                  />
                </FormControl>
                <Button
                  marginTop={5}
                  onPress={() => {
                    updateProfileDetails(user);
                    setEditMode(false);
                  }}
                >
                  Confirm changes
                </Button>
              </>
            ) : (
              <Box paddingTop={5}>
                <Text fontSize={'4xl'} fontWeight={"semibold"}>{user.name}</Text>
                <Text fontSize={'xl'} marginTop={-1}>{user.bio}</Text>
                <Box flex={0} flexDirection={"row"}>
                  <Icon as={<MaterialCommunityIcons name="calendar" />} size="sm" marginRight={1} />
                  <Text>Joined at {new Date().toDateString()}</Text>
                </Box>
              </Box>
            )
          ) : (
            ""
          )}
          <HStack space={2} alignItems={'flex-start'} marginTop={5}>
            <Button backgroundColor={'coolGray.500'} width={editMode ? 'full' : '50%'} onPress={() => setEditMode(!editMode)}>
              {editMode ? "Close editor" : "Edit your profile"}
            </Button>
            {!editMode && <Button backgroundColor={'coolGray.500'} width={'50%'} onPress={() => onLogOutHandler()}>
              Log out
            </Button>}

          </HStack>
        </Box>

        {/* List user posts here */}
        <VStack marginY="5" paddingBottom={"40"}>
          {posts &&
            posts.map((post, i) => (
              <FeedPost
                key={i}
                post={post}
                index={i}
                posts={posts.map((p) => { p.authorName = user.name; p.authorAvatar = user.picture; return (p as UserPost) })} // TODO: Fix this)))}
                setPosts={setPosts}
                onLike={() => null}
                withActions={false}
              />))}
        </VStack>
        

 
      </ScrollView>
  );
};

export default Profile;


{/* <VStack
space={2}
alignItems={{
  base: "center",
  md: "flex-start",
}}
>
{user && user.picture && (
  <Avatar
    bg="green.500"
    alignSelf="center"
    size="xs"
    source={user.picture && { uri: user.picture }}
  />
)}
{user ? (
  editMode ? (
    <>
      <FormControl>
        <FormControl.Label>Nom</FormControl.Label>
        <Input
          width={200}
          placeholder={user.name}
          onChangeText={(textEntered) =>
            setUser({ ...user, name: textEntered })
          }
        />
      </FormControl>
      <FormControl>
        <FormControl.Label>Bio</FormControl.Label>
        <Input
          width={200}
          placeholder={user.bio}
          onChangeText={(textEntered) =>
            setUser({ ...user, bio: textEntered })
          }
        />
      </FormControl>
      <FormControl>
        <FormControl.Label>Mot de passe</FormControl.Label>
        <Input
          type="password"
          width={200}
          placeholder="********"
          onChangeText={(textEntered) =>
            setUser({ ...user, password: textEntered })
          }
        />
      </FormControl>
      <Button
        onPress={() => {
          updateProfileImage(auth.currentUser);
        }}
        width={200}
        leftIcon={
          <Icon
            mb="1"
            as={<MaterialCommunityIcons name="camera" />}
            color="white"
            size="sm"
          />
        }
      >
        Changer votre image
      </Button>
      <Button
        onPress={() => {
          updateProfileDetails(user);
          setEditMode(false);
        }}
      >
        Confirmer les changements
      </Button>
    </>
  ) : (
    <>
      <Text>{user.name}</Text>
      <Text>{user.bio}</Text>
    </>
  )
) : (
  ""
)}
<Button width={200} onPress={() => setEditMode(!editMode)}>
  {editMode ? "Fermer l'editeur" : "Editer votre profile"}
</Button>
<Button width={200} onPress={() => onLogOutHandler()}>
  Deconnexion
</Button>
</VStack>
<VStack>
<FormControl>
  <FormControl.Label>Titre</FormControl.Label>
  <Input
    placeholder="coucou"
    w="50%"
    onChangeText={(textEntered) =>
      setCurrentPost({ ...currentPost, title: textEntered })
    }
  />
</FormControl>
<FormControl marginY="5">
  <FormControl.Label>Contenu</FormControl.Label>
  <Box alignItems="center" w="100%">
    <TextArea
      h={20}
      placeholder="Votre poste"
      w="75%"
      maxW="300"
      autoCompleteType={undefined}
      onChangeText={(textEntered) =>
        setCurrentPost({ ...currentPost, content: textEntered })
      }
    />
  </Box>
</FormControl>
<Button onPress={() => createPost(currentPost)}>
  Terminer votre poste :D
</Button>
</VStack>
<VStack marginY="5">
{posts &&
  posts.map((post, i) => (
    <Box key={i} borderWidth="1" marginY="5">
      <Text fontWeight="bold">{post.title}</Text>
      <Text>{post.content}</Text>
        <Text color="gray.500">{post.date.toString()}</Text>
    </Box>
  ))}
</VStack> */}
