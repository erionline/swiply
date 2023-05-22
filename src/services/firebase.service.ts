import { Alert, Linking, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDzIxBuTKV-5uwjge53uB6DgCYdf8hvETM",
  authDomain: "swiply-b9854.firebaseapp.com",
  projectId: "swiply-b9854",
  storageBucket: "swiply-b9854.appspot.com",
  messagingSenderId: "298848378756",
  appId: "1:298848378756:web:b69c90ea23e8c3ea2c87d1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

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