import {PayloadAction} from '@reduxjs/toolkit'
import { User } from '../../../models/User';

interface currUserState {
    user : User | null
}

var initialState : currUserState = {
    user : null,
}

const storedUser = sessionStorage.getItem('user');

if (storedUser != null) {
    initialState = {
        user : JSON.parse(storedUser)
    }
}

export function currUserReducer(state = initialState, action : PayloadAction<string>){

    switch(action.type) {
        case 'LOGIN' : {
            return {
                user : action.payload
            }
        }

        default : return state
    }
}
