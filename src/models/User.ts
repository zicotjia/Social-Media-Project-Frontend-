import { ObjectId } from 'mongodb';

export interface User {
    _id : ObjectId,
    username : string, 
    password : string,
    first_name : string,
    last_name : string,
    email : string,
    follower: ObjectId[],
    following: ObjectId[],
    profilepicurl: string,
    bio: string,
    created_at: Date,
    update_at: Date,
    token: string,
    refresh_token: string,
    user_id: string,
}