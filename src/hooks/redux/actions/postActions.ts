import axios from 'axios';
import { Dispatch } from 'redux';
import { AddPostValues } from '../../../components/AddForm';
import { likeRequest } from '../../../components/ImagePost';
import { url } from '../../../config/config';
import { Post } from '../../../models/Post';

export function uploadFile(values : AddPostValues) {
 
    return async function(dispatch : Dispatch) {
        dispatch({type: "loading", payload: true});
        
        try {
            await axios.post<Post>(url + '/post/addpost', values);
            dispatch({type:"LOADING", payload : false})
            alert('Add Post is Successful')
        } catch(error) {
            console.log(error);
            alert(error);
            dispatch({type:"LOADING", payload : false})
        }
    }
}

export function getFile() {

    return async function(dispatch : Dispatch) {
        
        dispatch({type: "loading", payload: true});

        try {
            const response = await axios.get<Post>(url + '/post/getpost')
            dispatch({type: 'LOADING', payload: false})
            dispatch({type: 'GET_ALL_POSTS', payload: response.data});
        } catch (error) {
            console.log(error);
            dispatch({type:'LOADING', payload: false})
            alert(error);
        } 
    }
}

export function likePost(values : likeRequest) {

    return async function(dispatch : Dispatch) {

        dispatch({type: "loading", payload: true});
        alert(JSON.stringify(values, null, 2));
        try {
            await axios.patch(url + '/post/like', values)
            dispatch({type: 'LOADING', payload: false})
            console.log('liked');
        } catch (error) {
            console.log(error);
            dispatch({type: 'LOADING', payload: false})
            alert(error);
        }
    }
}