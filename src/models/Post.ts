import { User } from "./User";
import { ObjectId } from 'mongodb';

export interface Post {
    _id: ObjectId
    description: string,
    file: string;
    comments: Comment[],
    user: User,
    likes: Like[],
    created_at: Date
}

export interface Comment {
    userid: ObjectId,
    username: string
    date: Date,
    comment: string,
    created_at: Date
}

export interface Like {
    userid: ObjectId,
    username: string
    Date: Date,
}