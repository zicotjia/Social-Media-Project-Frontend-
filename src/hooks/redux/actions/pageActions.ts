import { Dispatch } from "redux";

export function newPage(value : string) {
 
    return async function(dispatch : Dispatch) {
        dispatch({type: "LOADING", payload: true});
        
        try {
            dispatch({type: "NEWPAGE", payload: value})
            dispatch({type: "LOADING", payload: false});
        } catch(error) {
            alert(error)
            dispatch({type: "LOADING", payload: false});
        }
    }
}
