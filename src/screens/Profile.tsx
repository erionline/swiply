import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Button, Center, Heading, NativeBaseProvider } from "native-base";

const Profile = () => {
    const navigation = useNavigation();

    const onLogOutHandler = () => {
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("profile");
        navigation.navigate("Auth" as never);
    }

    return (
        <NativeBaseProvider>
            <Center flex={1}>
                <Heading>Hello world</Heading>
                <Button onPress={() => {onLogOutHandler()}}>
                Press me
                </Button>
            </Center>
        </NativeBaseProvider>
    )
};

export default Profile;