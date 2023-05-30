import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { firestore } from "./firebase.service";
import { getUserProfile } from "./profile.service";

export const getRandomUserPosts = async () => {
    const postsCollection = collection(firestore, "posts");
    try {
        const querySnapshot = await getDocs(query(postsCollection, orderBy("date", "desc")));
        const appUsers = await getDocs(collection(firestore, "users"));

        let posts = [];
        querySnapshot.forEach(async (doc) => {
            const post = doc.data();
            post.id = doc.id;
            const author = appUsers.docs.find((user) => user.id === post.authorId);
            post.authorName = author?.data().name;
            post.authorAvatar = author?.data().picture;
            posts = [...posts, post];
        });
        return posts;
    }
    catch (error) {
        console.error("Error while fetching user posts: ", error);
        throw error;
    }
}
