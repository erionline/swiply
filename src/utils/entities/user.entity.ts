import { atom } from 'jotai'

export const userAtom = atom<UserProfile>({
    id: "",
    name: "",
    picture: "",
    bio: "",
    email: "",
    password: "",
    posts: [],
})

export interface UserProfile {
    id: string;
    name: string;
    picture: string;
    contact?: string[];
    bio: string;
    email: string;
    password?: string;
    posts: UserPost[];
}

export interface UserPost {
    authorId: string;
    title: string;
    content: string;
    date: Date;
    likes: number;
    comments: UserComment[];
}

export interface UserComment {
    content: string;
    date: Date;
}
