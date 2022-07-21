import axios from 'axios';
import { Dispatch } from 'redux';
import { AddPostValues } from '../../../components/Form/AddForm';
import { LikeRequest } from '../../../components/Post/Like';
import { url } from '../../../config/config';
import { Post } from '../../../models/Post';
import { ObjectId } from 'mongodb';
import { PostChangeFormValues } from '../../../components/Post/EditPostModal';


export function uploadFile(values : AddPostValues) {
 
    return async function(dispatch : Dispatch) {
        dispatch({type: "LOADING", payload: true});
        
        try {
            await axios.post<Post>(url + '/post/addpost', values);
            dispatch({type:"LOADING", payload : false})
        } catch(error) {
            dispatch({type:"ERROR", payload: true})
            setTimeout(() => dispatch({type:"ERROR", payload: false}), 1000)
            console.log(error);
            alert(error);
            dispatch({type:"LOADING", payload : false})
        }
    }
}

export function getFile() {

    return async function(dispatch : Dispatch) {
        
        dispatch({type: "LOADING", payload: true});

        try {
            const response = await axios.get<Post[]>(url + '/post/getpost')
            dispatch({type: 'LOADING', payload: false})
            dispatch({type: 'GET_ALL_POSTS', payload: response.data});
        } catch (error) {
            dispatch({type:"ERROR", payload: true})
            setTimeout(() => dispatch({type:"ERROR", payload: false}), 1000)
            console.log(error);
            dispatch({type:'LOADING', payload: false})
            alert(error);
        } 
    }
}

export function editPost(values : PostChangeFormValues) {

    return async function(dispatch : Dispatch) {

        dispatch({type: "LOADING", payload: true});

        try {
            await axios.patch(url + '/post/edit', values)
            dispatch({type: 'EDITPOST', payload: values.description, id : values.postid})
            dispatch({type: 'LOADING', payload: false})
            console.log('Post has been edited');
        } catch (error) {
            dispatch({type:"ERROR", payload: true})
            setTimeout(() => dispatch({type:"ERROR", payload: false}), 1000)
            console.log(error);
            dispatch({type: 'LOADING', payload: false})
            alert(error);
        }
    }
}

export function likePost(values : LikeRequest) {

    return async function(dispatch : Dispatch) {

        dispatch({type: "LOADING", payload: true});
        try {
            await axios.patch(url + '/post/like', values)
            dispatch({type: 'LOADING', payload: false})
            console.log('Liked');
        } catch (error) {
            dispatch({type:"ERROR", payload: true})
            setTimeout(() => dispatch({type:"ERROR", payload: false}), 1000)
            console.log(error);
            dispatch({type: 'LOADING', payload: false})
            alert(error);
        }
    }
}

export function unLikePost(values : LikeRequest) {

    return async function(dispatch : Dispatch) {

        dispatch({type: "LOADING", payload: true});
        try {
            await axios.patch(url + '/post/unlike', values)
            dispatch({type: 'LOADING', payload: false})
            console.log('Unliked');
        } catch (error) {
            dispatch({type:"ERROR", payload: true})
            setTimeout(() => dispatch({type:"ERROR", payload: false}), 1000)
            console.log(error);
            dispatch({type: 'LOADING', payload: false})
            alert(error);
        }
    }   
}

export function deletePost(value: ObjectId) {

    return async function(dispatch: Dispatch) {
        const params = {postid : value};
        dispatch({type: "LOADING", payload : true});
        try {
            await axios.delete(url + '/post/delete', {data: params})
            dispatch({type: 'DELETEPOST', payload: value})
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

