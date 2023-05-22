import { Alert, Linking, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const pickerImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status != "granted") {
        return Alert.alert(
          "Accès refusé",
          "Nous n'avons pas accès à la galerie, veuillez modifier vos paramètres",
          [
            {
              text: "Ouvrir les paramètres",
              onPress: () => Linking.openSettings(),
            },
            {
              text: "Cancel",
              style: "cancel",
            },
          ]
        );
      }
  
      const picker = await ImagePicker.launchImageLibraryAsync();
  
      if (!picker.canceled) {
        const result = picker.assets[0].uri;
  
        const resultArray = result.split("/");
  
        const fileName = resultArray.at(-1).split(".");
        const extensionFile = fileName.at(-1);
  
        return {
          uri: result,
          extension: extensionFile,
        };
      }
    }
  };