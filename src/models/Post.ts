import { User } from "./User";
import { ObjectId } from 'mongodb';

export interface Post {
    _id: ObjectId
    description: string,
    file: string;
    comments: Comment[],
    user: User,
    likes: Like[]
    created_at: Date
}

export interface Comment {
    user: User,
    date: Date,
    comment: string,
    created_at: Date
}

export interface Like {
    user: User,
    Date: Date,
}