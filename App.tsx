import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';
import { NativeBaseProvider, Box, Button, Center, Heading } from "native-base";

const App = () => {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Heading>Hello world</Heading>
        <Button onPress={() => Alert.alert('Hello world')}>
          Press me
        </Button>
      </Center>
    </NativeBaseProvider>
  );
}

export default App;
