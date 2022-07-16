import {PayloadAction} from '@reduxjs/toolkit'
import { User } from '../../../models/User'

interface userState {
    users : User[]
} 
const initialState : userState = {
    users : []
}

export function usersReducer(state = initialState, action : PayloadAction<string>){

    switch(action.type) {
        case 'GET_ALL_USERS' : {
            return {
                ...state,
                users : action.payload
            }
        }

        default : return state
    }
}
