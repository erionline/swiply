import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { auth } from '../lib/firebase';

export const signUp = (email: string, password: string): Promise<UserCredential> => {
    try {
        const credentials = createUserWithEmailAndPassword(auth, email, password);
        console.log(credentials);
        return credentials
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error; // Rejeter l'erreur pour qu'elle puisse être traitée à un niveau supérieur si nécessaire        
    }
}

export const logIn = (email: string, password: string): Promise<UserCredential> => {
    try {
        const credentials = signInWithEmailAndPassword(auth, email, password);
        console.log(credentials);
        return credentials
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error; // Rejeter l'erreur pour qu'elle puisse être traitée à un niveau supérieur si nécessaire        
    }
}