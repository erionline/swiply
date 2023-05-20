import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { Firestore, doc, setDoc } from "firebase/firestore";
import { auth, firestore } from '../lib/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

export const signUp = (email: string, name: string, surName: string, bio: string, password: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = credentials.user;
  
        const userRef = doc(firestore, "users", user.uid);
        console.log(userRef);
        await setDoc(userRef, {
          name: name,
          surName: surName,
          bio: bio,
        });
  
        resolve(true);
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        reject(error);
      }
    });
};

export const logIn = async (email: string, password: string): Promise<string> => {
    const navigation = useNavigation();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
  
      // Store token and profile in localStorage
      const profile = { email: email, custom: 'custom-info' };
      AsyncStorage.setItem('token', idToken);
      AsyncStorage.setItem('profile', JSON.stringify(profile));
        
      navigation.navigate("Swipe" as never);

      return "Login Done"
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      throw error;
    }
  };