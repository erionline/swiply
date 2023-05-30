import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Text,
  Center,
} from "native-base";
import React from "react";
import { logIn, signUp } from "../services/auth.service";
import { useNavigation } from "@react-navigation/native";

const Auth = () => {
  const [login, setLogin] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [error, setError] = React.useState("");
  const navigation = useNavigation();

  const onPressHandler = (textEntered, keyInput) => {
    switch (keyInput) {
      case "email":
        setEmail(textEntered);
        break;
      case "password":
        setPassword(textEntered);
        break;
      case "name":
        setName(textEntered);
        break;
      case "bio":
        setBio(textEntered);
        break;
      case "passwordConfirm":
        setPasswordConfirm(textEntered);
        break;
      default:
        return false;
    }
  };

  const onAuthHandler = async () => {
    switch (login) {
      case false:
        if (password !== passwordConfirm) {
          setError("Les 2 mots de passe ne sont pas identiques");
        } else if (name == "" || bio == "") {
          setError("Il faut remplir toutes les cases");
        } else {
          try {
            const sign = await signUp(email, name, bio, password);
            if (sign) {
              setLogin(true);
            }
          } catch (error) {
            onErrorHandler(error.code);
          }
        }
        break;
      case true:
        try {
          const log1 = await logIn(email, password);
          if (log1) {
            navigation.navigate("Feed" as never);
          }
        } catch (error) {
          onErrorHandler(error.code);
        }
        break;
      default:
        try {
          const log2 = await logIn(email, password);
          if (log2) {
            navigation.navigate("Feed" as never);
          }
        } catch (error) {
          onErrorHandler(error.code);
        }
        break;
    }
  };

  const onErrorHandler = (errorCode) => {
    let errorMessage = "";
    switch (errorCode) {
      case "auth/wrong-password":
        errorMessage = "Mot de passe incorrect. Veuillez réessayer";
        break;
      case "auth/invalid-email":
        errorMessage = `L'email n'est pas valide. Veuillez fournir une email valide`;
        break;
      case "auth/weak-password":
        errorMessage =
          "Votre mot de passe doit comprendre un minimum de 6 caractères";
        break;
      case "auth/user-not-found":
        errorMessage = `Cet Utilisateur n'existe pas`;
        break;
      default:
        errorMessage = `Une erreur s'est produite lors de l'authentification. Veuillez réessayer plus tard`;
    }
    setError(errorMessage);
  };

  return (
    <Center flex={1} bg="white" alignItems="center">
      <Box p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          backgroundColor="indigo.500"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Swiply
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Socialise en un like
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              onChangeText={(textEntered) =>
                onPressHandler(textEntered, "email")
              }
            />
          </FormControl>
          {login ? (
            ""
          ) : (
            <>
              <FormControl>
                <FormControl.Label>Nom</FormControl.Label>
                <Input
                  onChangeText={(textEntered) =>
                    onPressHandler(textEntered, "name")
                  }
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Bio</FormControl.Label>
                <Input
                  onChangeText={(textEntered) =>
                    onPressHandler(textEntered, "bio")
                  }
                />
              </FormControl>
            </>
          )}
          <FormControl>
            <FormControl.Label>Mot de passe</FormControl.Label>
            <Input
              type="password"
              onChangeText={(textEntered) =>
                onPressHandler(textEntered, "password")
              }
            />
          </FormControl>
          {login ? (
            ""
          ) : (
            <FormControl>
              <FormControl.Label>Confirmer le mot de passe</FormControl.Label>
              <Input
                type="password"
                onChangeText={(textEntered) =>
                  onPressHandler(textEntered, "passwordConfirm")
                }
              />
            </FormControl>
          )}
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={() => {
              onAuthHandler();
            }}
          >
            {login ? "Connexion" : "Inscription"}
          </Button>
          <HStack justifyContent="center">
            <Text
              fontSize="sm"
              color="red.600"
              _dark={{
                color: "red.200",
              }}
            >
              {error}
            </Text>
          </HStack>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              {login ? "Je suis nouveau :D " : "Mais je suis pas nouveau :( "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => setLogin(!login)}
            >
              {login ? "Inscription" : "Connexion"}
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Auth;
