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
import { logIn, signUp } from "../services/firebase.service";

const Auth = () => {
  const [login, setLogin] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  const onPressHandler = (textEntered, keyInput) => {
    switch (keyInput) {
      case "email":
        setEmail(textEntered);
        break;
      case "password":
        setPassword(textEntered);
        break;
      case "passwordConfirm":
        setPasswordConfirm(textEntered);
        break;
      default:
        return false;
    }
  };

  const onAuthHandler = () => {
    switch (login) {
      case false:
        if (password === passwordConfirm) {
          signUp(email, password);
        }
        break;
      case true:
        logIn(email, password);
        break;
      default:
        logIn(email, password);
        break;
    }
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
          Socialise en matchant
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input
              onChangeText={(textEntered) =>
                onPressHandler(textEntered, "email")
              }
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              onChangeText={(textEntered) =>
                onPressHandler(textEntered, "passwordConfirm")
              }
            />
          </FormControl>
          {login ? (
            ""
          ) : (
            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
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
            onPress={() => {onAuthHandler()}}
          >
            {login ? "Connexion" : "Inscription"}
          </Button>
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
