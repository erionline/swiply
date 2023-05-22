import { auth, firestore, storage } from "../lib/firebase";
import { updatePassword, updateProfile } from "firebase/auth";
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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { pickerImage } from "./firebase.service";

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

export const getRandomProfile = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const usersRef = collection(firestore, "users");
      const querySnapshot = await getDocs(usersRef);
      const usersData = [];

      querySnapshot.forEach(async (doc) => {
        const userFirstPartData = doc.data();
        const queryUser = await getDocs(query(usersRef, where("uri", "==", doc.id)));
        if (!queryUser.empty) {
          const userDoc = querySnapshot.docs[0];
          const userSecondPartData = userDoc.data();
          usersData.push({
            id: doc.id,
            photoURL: userSecondPartData.photoURL,
            name: userFirstPartData.name,
            bio: userFirstPartData.bio,
          });
        }
      });

      if (usersData.length > 0) {
        const randomIndex = Math.floor(Math.random() * usersData.length);
        const randomProfile = usersData[randomIndex];
        resolve(randomProfile);
      } else {
        resolve(null);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      reject(error);
    }
  });
};

export const updateProfileDetails = async ({ name, bio, password }) => {
  try {
    const user = auth.currentUser;
    const userRef = doc(firestore, "users", user.uid);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();

      if (
        (name && name.trim() !== "") ||
        (bio && bio.trim() !== "") ||
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

export const updateProfileImage = async (user) => {
  const result = await pickerImage();

  if (!result) {
    // Handle the case where pickerImage() returns void
    return;
  }

  const { uri, extension } = result;

  const image = await fetch(uri);
  const bytes = await image.blob();

  const filesRef = ref(storage, `avatar-${user.uid}.${extension}`);
  await uploadBytes(filesRef, bytes);

  const imageURL = await getDownloadURL(filesRef);

  await updateProfile(user, { photoURL: imageURL });
};
