import axios from "axios";
import { url } from "../../../config/config"; 
import { Dispatch } from "redux";
import { User } from '../../../models/User';
import { FollowRequest } from "../../../components/ProfileCard/Follow";
import { ProfileChangeFormValues } from "../../../components/ProfilePage/ProfileModal";
import { ProfilePicChangeFormValues } from "../../../components/ProfilePage/ProfilePicModal";
import { RegisterFormValues } from "../../../components/Login&Register/Register";
import { LoginFormValues } from "../../../components/Login&Register/Login";
import { ObjectId } from "mongodb";


export function userRegister(values : RegisterFormValues) {

    return async function(dispatch : Dispatch) {

        dispatch({type:"LOADING", payload : true})
        try {
            await axios.post<User>(url + '/users/signup', values)
            dispatch({type:"LOADING", payload : false})
            alert('Register is Successful, Please login')
            window.location.href='/login'
        } catch (error) {
            dispatch({type:"ERROR", payload: true})
            setTimeout(() => dispatch({type:"ERROR", payload: false}), 1000)
            console.log(error);
            alert("Email has been taken please use another email");
            dispatch({type:"LOADING", payload : false})
        }
    
    }
}

export function userLogin(values : LoginFormValues) {
    return async function(dispatch : Dispatch) {

        dispatch({type:"LOADING", payload : true})
        try {
            const user = await axios.post<User>(url + '/users/login', values);
            console.log('Hello');
            sessionStorage.setItem('user', JSON.stringify(user.data))
            dispatch({type:"LOADING", payload : false})
            dispatch({type:"LOGIN", payload: user.data})
            alert('Login is Succesfull')
            
        } catch (error) {
            dispatch({type:"ERROR", payload: true})
            setTimeout(() => dispatch({type:"ERROR", payload: false}), 1000)
            console.log(error);
            alert("Invalid Credentials or Account does not Exist");
            dispatch({type:"LOADING", payload : false})
        }
    
    }
}

export function userLogout() {

    return async function(dispatch: Dispatch) {

        dispatch({type: "loading", payload: true});
        try {
            dispatch({type: 'LOADING', payload: false})
            dispatch({type: 'LOGOUT'})
            sessionStorage.removeItem('user')
        } catch (error) {
            dispatch({type:"ERROR", payload: true})
            setTimeout(() => dispatch({type:"ERROR", payload: false}), 1000)
            console.log(error);
            dispatch({type: 'LOADING', payload: false})
            alert(error);
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
            dispatch({type:"ERROR", payload: true})
            setTimeout(() => dispatch({type:"ERROR", payload: false}), 1000)
            console.log(error);
            dispatch({type:'LOADING', payload: false})
            alert(error);
        } 
    }
}

export function followUser(values: FollowRequest) {

    return async function(dispatch: Dispatch) {

        dispatch({type: "loading", payload: true});
        try {
            await axios.patch(url + '/users/follow', values)
            dispatch({type: 'LOADING', payload: false})
            dispatch({type: 'FOLLOW', payload: values.following})
        } catch (error) {
            dispatch({type:"ERROR", payload: true})
            setTimeout(() => dispatch({type:"ERROR", payload: false}), 1000)
            console.log(error);
            dispatch({type: 'LOADING', payload: false})
            alert(error);
        }
    }

}

export function unFollowUser(values: FollowRequest) {

    return async function(dispatch: Dispatch) {
        
        dispatch({type: "loading", payload: true});
        try {
            await axios.patch(url + '/users/unfollow', values)
            dispatch({type: 'LOADING', payload: false})
            dispatch({type: 'UNFOLLOW', payload: values.following})
        } catch (error) {
            dispatch({type:"ERROR", payload: true})
            setTimeout(() => dispatch({type:"ERROR", payload: false}), 1000)
            console.log(error);
            dispatch({type: 'LOADING', payload: false})
            alert(error);
        }
    }
}

export function editUserProfile(values: ProfileChangeFormValues) {

    return async function(dispatch: Dispatch) {
        
        dispatch({type: "loading", payload: true});
        try {
            const updatedUser =  await axios.patch<User>(url + '/users/edit', values)
            dispatch({type: 'LOGIN' , payload: updatedUser.data})
            sessionStorage.setItem('user', JSON.stringify(updatedUser.data))           
            dispatch({type: 'LOADING', payload: false})
        } catch (error) {
            dispatch({type:"ERROR", payload: true})
            setTimeout(() => dispatch({type:"ERROR", payload: false}), 1000)
            console.log(error);
            dispatch({type: 'LOADING', payload: false})
            alert(error);
        }

    }
}

export function editProfilePicture(values : ProfilePicChangeFormValues) {

    return async function(dispatch: Dispatch) {

        dispatch({type: "loading", payload: true});
        try {
            const updatedUser =  await axios.patch<User>(url + '/users/editpic', values)
            dispatch({type: 'LOGIN' , payload: updatedUser.data})
            sessionStorage.setItem('user', JSON.stringify(updatedUser.data))
            dispatch({type: 'LOADING', payload: false})
        } catch (error) {
            dispatch({type:"ERROR", payload: true})
            setTimeout(() => dispatch({type:"ERROR", payload: false}), 1000)
            console.log(error);
            dispatch({type: 'LOADING', payload: false})
            alert(error);
        }

    }
}

export function deleteUser(value: ObjectId) {

    return async function(dispatch: Dispatch) {
        const params = {userid : value};
        dispatch({type: "loading", payload: true});
        try {
            await axios.delete(url + '/users/delete', {data: params})
            dispatch({type: 'LOGOUT'})
            sessionStorage.removeItem('user')
            dispatch({type: 'LOADING', payload: false})
            alert("Your Account has been deleted")
        } catch (error) {
            dispatch({type:"ERROR", payload: true})
            setTimeout(() => dispatch({type:"ERROR", payload: false}), 1000)
            console.log(error);
            dispatch({type: 'LOADING', payload: false})
            alert(error);
        }
    }
}

