import {PayloadAction} from '@reduxjs/toolkit'
import { ObjectId } from 'mongodb';
import { User } from '../../../models/User';

interface currUserState {
    user : User | null;
}

var initialState : currUserState = {
    user : null
}

const storedUser = sessionStorage.getItem('user');

if (storedUser) {
    initialState = {
        user : JSON.parse(storedUser)
    }
}

export function currUserReducer(state = initialState, action : PayloadAction<string | ObjectId>){

    switch(action.type) {
        case 'LOGIN' : {
            return {
                user : action.payload
            }
        }
        case 'LOGOUT' : {
            return {
                user : null
            }
        }
        case 'FOLLOW' : {
            if (state.user) {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        following: [...state.user.following, action.payload]
                    }
                }
            }
            break
        }
        case 'UNFOLLOW' : {
            if (state.user) {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        following: state.user.following.filter((id) => id !== action.payload)
                    }
                }
            }
            break
        }
        default : return state
    }
}
