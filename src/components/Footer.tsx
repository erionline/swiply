import React from "react";
import { Text, Icon, HStack, Center, Pressable } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = React.useState(1);

  const PageHandler = (page: number) => {
    setSelected(page);
    switch(page){
      case 1: {
        navigation.navigate("Swipe" as never)
        break;
      }
      case 2: {
        navigation.navigate("Contact" as never)
        break;
      }
      case 3: {
        navigation.navigate("Profile" as never)
        break;
      }
      default: {
        navigation.navigate("Swipe" as never)
        break;
      }
    }
  }
    
    return (
      <HStack
        bg="indigo.600"
        safeAreaBottom
        shadow={6}
        position="absolute"
        bottom={0}
        left={0}
        right={0}
      >
          <Pressable opacity={selected === 1 ? 1 : 0.5} py="3" flex={1} onPress={() => PageHandler(1)}>
            <Center>
              <Icon mb="1" as={<MaterialCommunityIcons name={selected === 1 ? 'handshake' : 'handshake-outline'} />} color="white" size="sm" />
              <Text color="white" fontSize="12">
                Swipe
              </Text>
            </Center>
          </Pressable>
          <Pressable opacity={selected === 2 ? 1 : 0.6} py="2" flex={1} onPress={() => PageHandler(2)}>
            <Center>
              <Icon mb="1" as={<MaterialCommunityIcons name={selected === 2 ? 'contacts' : 'contacts-outline'} />} color="white" size="sm" />
              <Text color="white" fontSize="12">
                Contact
              </Text>
            </Center>
          </Pressable>
          <Pressable opacity={selected === 3 ? 1 : 0.5} py="2" flex={1} onPress={() => PageHandler(3)}>
            <Center>
              <Icon mb="1" as={<MaterialCommunityIcons name={selected === 3 ? 'account' : 'account-outline'} />} color="white" size="sm" />
              <Text color="white" fontSize="12">
                Profile
              </Text>
            </Center>
          </Pressable>
        </HStack>
    )
  };

export default Footer;