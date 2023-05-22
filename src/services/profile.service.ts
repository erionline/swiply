import { auth, firestore } from "../lib/firebase";
import { updatePassword } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export const getProfile = async (uid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userRef = doc(firestore, "users", uid);

      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const profile = {
          name: userData.name,
          bio: userData.bio,
        };
        resolve(profile);
      } else {
        resolve(null);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      reject(error);
    }
  });
};

export const updateProfile = async ({ name, bio, password }) => {
  try {
    const user = auth.currentUser;
    const userRef = doc(firestore, "users", user.uid);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();

      if (
        name !== "" ||
        bio !== "" ||
        bio !== userData.bio ||
        name !== userData.name
      ) {
        await updateDoc(userRef, {
          name: name,
          bio: bio,
        });
      }
    }

    if (password != "" && password.length > 6) {
      updatePassword(user, password);
    }
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error;
  }
};

export const updateProfileDetails = async (docRef, newDetails) => {
  try {
    await updateDoc(docRef, newDetails);
    console.log("Profile details updated successfully");
  } catch (error) {
    console.error("Erreur de mise à jour des détails du profil :", error);
    throw error;
  }
};

export const createPost = async (title: string, content: string) => {
  try {
    if (title && content) {
      const postsCollection = collection(firestore, "posts");
      const postRef = doc(postsCollection);
      const user = auth.currentUser;
      const postData = {
        idUser: user?.uid,
        title: title,
        content: content,
        timestamp: serverTimestamp(),
      };
      await setDoc(postRef, postData);
      console.log("Post created");
    }
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

export const fetchPostsByUser = async (uid) => {
  const postsCollection = collection(firestore, "posts");
  const q = query(postsCollection, where("idUser", "==", uid));

  try {
    const querySnapshot = await getDocs(q);
    const posts = [];

    querySnapshot.forEach((doc) => {
      const post = doc.data();
      post.id = doc.id;
      posts.push(post);
    });

    console.log("Posts by user", uid, ":", posts);
    return posts;
  } catch (error) {

    console.error("Error fetching posts by user:", error);
  }
};