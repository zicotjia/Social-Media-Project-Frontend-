import axios from "axios";
import { url } from "../../../config/config"; 
import { Dispatch } from "redux";
import { User } from '../../../models/User';
import { loginFormValues } from "../../../pages/Login";
import { registerFormValues } from "../../../pages/Register";


export function userRegister(values : registerFormValues) {

    return async function(dispatch : Dispatch) {

        dispatch({type:"LOADING", payload : true})
        try {
            await axios.post<User>(url + '/users/signup', values)
            dispatch({type:"LOADING", payload : false})
            alert('Register is Successful, Please login')
            window.location.href='/login'
        } catch (error) {
            console.log(error);
            alert(error);
            dispatch({type:"LOADING", payload : false})
        }
    
    }
}

export function userLogin(values : loginFormValues) {
    return async function(dispatch : Dispatch) {

        dispatch({type:"LOADING", payload : true})
        try {
            const user = await axios.post<User>(url + '/users/login', values);
            //console.log(user.data);
            sessionStorage.setItem('user', JSON.stringify(user.data))
            dispatch({type:"LOADING", payload : false})
            dispatch({type:"LOGIN", payload: user.data})
            alert('Login is Succesfull')
            
        } catch (error) {
            console.log(error);
            alert(error);
            dispatch({type:"LOADING", payload : false})
        }
    
    }
}

export function getUsers() {

    return async function(dispatch : Dispatch) {
        
        dispatch({type: "loading", payload: true});

        try {
            const response = await axios.get<User[]>(url + '/users/getusers')
            dispatch({type: 'LOADING', payload: false})
            dispatch({type: 'GET_ALL_USERS', payload: response.data});
        } catch (error) {
            console.log(error);
            dispatch({type:'LOADING', payload: false})
            alert(error);
        } 
    }
}