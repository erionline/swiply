import React from "react";
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
import {
  createPost,
  fetchPostsByUser,
  updateProfileImage,
  updateProfileDetails,
  getUserProfile,
} from "../services/profile.service";
import { auth } from "../services/firebase.service";
import { useAtom } from "jotai";
import { UserProfile, userAtom } from "../utils/entities/user.entity";

const Profile = () => {  
  const [editMode, setEditMode] = React.useState(false);
  const [user, setUser] = useAtom(userAtom);

  const onLogOutHandler = () => {
    logOut();
  };

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await getUserProfile(auth.currentUser.uid);
      setUser(profile as UserProfile);
    }

    fetchUserProfile();
  }, [user]);

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
            {/* {actualUser && actualUser?.photoURL && (
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
            )} */}
            {user ? (
              editMode ? (
                <>
                  <FormControl>
                    <FormControl.Label>Nom</FormControl.Label>
                    <Input
                      width={200}
                      placeholder={user.name}
                      onChangeText={(textEntered) => setUser({...user, name: textEntered}) }
                      // onChangeText={(textEntered) =>
                      //   onPressHandler(textEntered, "name")
                      // }
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Bio</FormControl.Label>
                    <Input
                      width={200}
                      placeholder={user.bio}
                      onChangeText={(textEntered) => setUser({...user, bio: textEntered}) }
                      // onChangeText={(textEntered) =>
                      //   onPressHandler(textEntered, "bio")
                      // }
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Mot de passe</FormControl.Label>
                    <Input
                      type="password"
                      width={200}
                      placeholder="********"
                      onChangeText={(textEntered) => setUser({...user, password: textEntered}) }
                      // onChangeText={(textEntered) =>
                      //   onPressHandler(textEntered, "password")
                      // }
                    />
                  </FormControl>
                  <Button
                    // onPress={() => {
                    //   updateProfileImage(actualUser);
                    // }}
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
            <Button width={200} onPress={() => onLogOutHandler()}>Deconnexion</Button>
          </VStack>
          <VStack>
            <FormControl>
              <FormControl.Label>Titre</FormControl.Label>
              <Input
                placeholder="coucou"
                w="50%"
                // onChangeText={(textEntered) =>
                //   onPressHandler(textEntered, "title")
                // }
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
                  // onChangeText={(textEntered) =>
                  //   onPressHandler(textEntered, "content")
                  // }
                />
              </Box>
            </FormControl>
            <Button 
              // onPress={() => createPost(title, content)}
            >
              Terminer votre poste :D
            </Button>
          </VStack>
          <VStack marginY="5">
            {/* {posts &&
              posts.map((post) => (
                <Box key={post.id} borderWidth="1" marginY="5">
                  <Text fontWeight="bold">{post.title}</Text>
                  <Text>{post.content}</Text>
                  <Text color="gray.500">
                    {post.timestamp.toDate().toString()}
                  </Text>
                </Box>
              ))} */}
          </VStack>
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Profile;
