import {PayloadAction} from '@reduxjs/toolkit'
import { Post } from '../../../models/Post';

interface postsState {
    posts : Post[]
} 
const initialState : postsState = {
    posts : []
}

export function postsReducer(state = initialState, action : PayloadAction<string>){

    switch(action.type) {
        case 'GET_ALL_POSTS' : {
            return {
                ...state,
                posts : action.payload

            }
        }

        default : return state
    }
}
