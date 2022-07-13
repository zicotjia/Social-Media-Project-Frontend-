import { ObjectId } from 'mongodb';

export interface User {
    _id : ObjectId,
    username : string, 
    password : string,
    first_name : string,
    last_name : string,
    email : string,
    friends: ObjectId[],
    profilepicurl: string,
    bio: string,
    Created_at: Date,
    Update_at: Date,
    Token: string,
    Refresh_token: string,
    User_id: string,
}