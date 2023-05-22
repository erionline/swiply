import { createUserWithEmailAndPassword, signInWithCustomToken, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from '../lib/firebase';

export const logOut = () => {
    signOut(auth);
}

export const signUp = (email: string, name: string, bio: string, password: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = credentials.user;
        
        const userRef = doc(firestore, "users", user.uid);
        await setDoc(userRef, {
          name: name,
          bio: bio,
        });
  
        resolve(true);
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        reject(error);
      }
    });
};

export const logIn = async (email: string, password: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      resolve(userCredential.user);
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      reject(error);
    }
  });
};