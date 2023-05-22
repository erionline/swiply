import { User, updatePassword, updateProfile } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, firestore, pickerImage, storage } from "./firebase.service";
import { UserPost, UserProfile, userAtom } from "../utils/entities/user.entity";
import { useAtom } from "jotai";

export const getUserProfile = async (uid: string) => {
  const queryUser = doc(firestore, "users", uid);
  const userDoc = await getDoc(queryUser)
  return userDoc.exists() ? userDoc.data() : null;
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
      console.error("Erreur lors de la connexion:", error);
      reject(error);
    }
  });
};

export const updateProfileDetails = async (profile: UserProfile) => {
  try {
    const user = auth.currentUser;
    const userRef = doc(firestore, "users", user.uid);

    await updateDoc(userRef, {
      name: profile.name.trim(),
      bio: profile.bio.trim(),
    });

    if (profile.password && profile.password.length > 6) {
      const [profile, setProfile] = useAtom(userAtom);
      setProfile({ ...profile, password: "" });
      updatePassword(user, profile.password);
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

      const postData: UserPost = {
        authorId: user?.uid,
        title: title,
        content: content,
        date: new Date(),
        likes: 0,
        comments: [],
      };

      await setDoc(postRef, postData);
      console.log("User post has been created.");
    }
  } catch (error) {
    console.error("Error while creating user post: ", error);
  }
};

export const fetchPostsByUser = async (uid: string) => {
  const postsCollection = collection(firestore, "posts");

  try {
    const querySnapshot = await getDocs(query(postsCollection, where("idUser", "==", uid)));
    let posts = [];

    querySnapshot.forEach((doc) => {
      const post = doc.data();
      post.id = doc.id;
      posts = [...posts, post]
    });

    console.log("Fetched user posts of ", uid, ":", posts);

    return posts;
  } catch (error) {
    console.error("Error fetching posts by user:", error);
  }
};

export const updateProfileImage = async (user: User) => {
  // We call the pickerImage function to get the image
  const result = await pickerImage();

  // If user cancels image picker or if there is no image
  if (!result) return;

  // If user picks an image, we upload it to Firebase Storage
  const { uri, extension } = result;

  // We get the image bytes
  const image = await fetch(uri);
  const bytes = await image.blob();

  // We upload the image to Firebase Storage
  const fileRef = ref(storage, `avatar-${user.uid}.${extension}`);
  await uploadBytes(fileRef, bytes);

  // We get the image URL
  const imageURL = await getDownloadURL(fileRef);
  // We update the user profile
  await updateDoc(doc(firestore, "users", user.uid), { picture: imageURL });
};
