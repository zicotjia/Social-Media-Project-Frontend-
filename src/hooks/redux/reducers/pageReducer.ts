import { PayloadAction } from '@reduxjs/toolkit';

interface pageState {
    page : string
}

const initialState : pageState = {
    page : 'Home',
}

export function pageReducer(state = initialState, action : PayloadAction<string>) {

    switch(action.type) {
        case 'NEWPAGE' : return {
            page : action.payload
        }

        default : return state
    }
}