import { Dispatch } from "redux";

//Used to manually set error within the React Components in the future
export function newError() {
 
    return async function(dispatch : Dispatch) {
        dispatch({type: "ERROR", payload: true})
    }
}

export function resolveError() {

    return async function(dispatch : Dispatch) {
        dispatch({type: "ERROR", payload: false})
    }
}

export {}
