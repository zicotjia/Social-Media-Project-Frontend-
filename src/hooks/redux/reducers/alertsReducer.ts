import { PayloadAction } from '@reduxjs/toolkit';

interface loadingState {
    loading : boolean;
}
const initialState : loadingState = {
    loading : false
}

export function alertsReducer(state = initialState, action : PayloadAction<string>) {

    switch(action.type) {
        case 'LOADING' : return {
            ...state,
            loading : action.payload
        }

        default : return state
    }
}