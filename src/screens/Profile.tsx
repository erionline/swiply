import {
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  Icon,
  Input,
  NativeBaseProvider,
  ScrollView,
  Text,
  TextArea,
  VStack,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { logOut } from "../services/auth.service";
import { useEffect, useState } from "react";
import {
  createPost,
  fetchPostsByUser,
  getProfile,
  updateProfileImage,
  updateProfileDetails,
} from "../services/profile.service";
import React from "react";
import { auth } from "../services/firebase.service";
import { UserProfile } from "../utils/types";

const Profile = () => {
  const [profile, setProfile] = React.useState<UserProfile>({
    id: "",
    name: "",
    picture: "",
    bio: "",
    email: "",
    password: "",
    posts: [],
  });
  
  const [editMode, setEditMode] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [bio, setBio] = React.useState("");
  const actualUser = auth.currentUser;
  const [user, setUser] = useState(null);
  const [posts, setPosts] = React.useState([]);
  const onLogOutHandler = () => {
    logOut();
  };

  const onPressHandler = (textEntered, keyInput) => {
    switch (keyInput) {
      case "name":
        setName(textEntered);
        break;
      case "bio":
        setBio(textEntered);
        break;
      case "password":
        setPassword(textEntered);
        break;
      case "title":
        setTitle(textEntered);
        break;
      case "content":
        setContent(textEntered);
        break;
      default:
        return false;
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfile(actualUser.uid);
      setUser(profileData);
    };
    const fetchUserPosts = async () => {
      const fetchedPosts = await fetchPostsByUser(actualUser.uid);
      setPosts(fetchedPosts);
    };

    fetchProfile();
    fetchUserPosts();
  }, [editMode]);

  return (
    <NativeBaseProvider>
      <ScrollView flex={1} paddingY={20}>
        <Center>
          <VStack
            space={2}
            alignItems={{
              base: "center",
              md: "flex-start",
            }}
          >
            {actualUser && actualUser?.photoURL && (
              <Avatar
                bg="green.500"
                alignSelf="center"
                size="xs"
                source={{
                  uri: actualUser.photoURL,
                }}
              >
                AJ
              </Avatar>
            )}
            {user ? (
              editMode ? (
                <>
                  <FormControl>
                    <FormControl.Label>Nom</FormControl.Label>
                    <Input
                      placeholder={user.name}
                      onChangeText={(textEntered) =>
                        onPressHandler(textEntered, "name")
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Bio</FormControl.Label>
                    <Input
                      placeholder={user.bio}
                      onChangeText={(textEntered) =>
                        onPressHandler(textEntered, "bio")
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Mot de passe</FormControl.Label>
                    <Input
                      type="password"
                      onChangeText={(textEntered) =>
                        onPressHandler(textEntered, "password")
                      }
                    />
                  </FormControl>
                  <Button
                    onPress={() => {
                      updateProfileImage(actualUser);
                    }}
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
                      updateProfileDetails({
                        name: name,
                        bio: bio,
                        password: password,
                      }),
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
            <Button onPress={() => setEditMode(!editMode)}>
              {editMode ? "Fermer l'editeur" : "Editer votre profile"}
            </Button>
            <Button onPress={() => onLogOutHandler()}>Deconnexion</Button>
          </VStack>
          <VStack>
            <FormControl>
              <FormControl.Label>Titre</FormControl.Label>
              <Input
                placeholder="coucou"
                w="50%"
                onChangeText={(textEntered) =>
                  onPressHandler(textEntered, "title")
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
                    onPressHandler(textEntered, "content")
                  }
                />
              </Box>
            </FormControl>
            <Button onPress={() => createPost(title, content)}>
              Terminer votre poste :D
            </Button>
          </VStack>
          <VStack marginY="5">
            {posts &&
              posts.map((post) => (
                <Box key={post.id} borderWidth="1" marginY="5">
                  <Text fontWeight="bold">{post.title}</Text>
                  <Text>{post.content}</Text>
                  <Text color="gray.500">
                    {post.timestamp.toDate().toString()}
                  </Text>
                </Box>
              ))}
          </VStack>
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Profile;
