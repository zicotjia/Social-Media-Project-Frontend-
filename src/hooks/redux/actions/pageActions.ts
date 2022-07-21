import { Dispatch } from "redux";

export function newPage(value : string) {
 
    return async function(dispatch : Dispatch) {
        dispatch({type: "loading", payload: true});
        
        try {
            dispatch({type: "NEWPAGE", payload: value})
            dispatch({type: "loading", payload: false});
        } catch(error) {
            alert(error)
            dispatch({type: "loading", payload: false});
        }
    }
}
