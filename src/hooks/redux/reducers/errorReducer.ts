import { PayloadAction } from '@reduxjs/toolkit';

interface errorState {
    error : boolean;
}
const initialState : errorState = {
    error : false,
}

export function errorReducer(state = initialState, action : PayloadAction<string>) {

    switch(action.type) {
        case 'Error' : return {
            ...state,
            error : action.payload
        }

        default : return state
    }
}