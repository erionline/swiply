export interface UserProfile {
    id: string;
    name: string;
    picture: string;
    bio: string;
    email: string;
    password: string;
    posts: UserPost[];
}

export interface UserPost {
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
