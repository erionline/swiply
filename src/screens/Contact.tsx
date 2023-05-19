import { Button, Center, Heading, NativeBaseProvider } from "native-base";
import { Alert } from "react-native";

const Contact = () => {
    return (
        <NativeBaseProvider>
            <Center flex={1}>
                <Heading>Hello world</Heading>
                <Button onPress={() => Alert.alert('Hello world')}>
                Press me
                </Button>
            </Center>
        </NativeBaseProvider>
    )
};

export default Contact;