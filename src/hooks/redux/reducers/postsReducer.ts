import {AnyAction } from '@reduxjs/toolkit'
import { Post } from '../../../models/Post';

interface postsState {
    posts : Post[]
} 
const initialState : postsState = {
    posts : []
}

export function postsReducer(state = initialState, action : AnyAction) {

    switch(action.type) {
        case 'GET_ALL_POSTS' : {
            return {
                ...state,
                posts : action.payload

            }
        }
        case `DELETEPOST` : {
            return {
                ...state,
                posts : state.posts.filter((post) => post._id !== action.payload)
            }
        }case `EDITPOST` : {
            return {
                ...state,
                posts : state.posts.map((post) => post._id === action.id ? {...post, description: action.payload} : post)
            }
        }
    
        default : return state
    }

}
