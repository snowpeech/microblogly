import axios from 'axios';

const BASE_URL = "http://localhost:5000/api"

export function getPostsFromApi(){
    return async function(dispatch) {
        let res=await axios.get(`${BASE_URL}/posts`);
        dispatch(gotPosts(res.data));
    }
}

function gotPosts(posts){
    return {type:"LOAD_TITLES", posts} 
}

export function getAPostFromApi(postId){
    return async function(dispatch) {
        let res=await axios.get(`${BASE_URL}/posts/${postId}`);
        dispatch(gotAPost(res.data)); //sets state with returned data
    }
}

function gotAPost(post){
    return {type:"LOAD_A_POST", post} 
}

export function addPostToApi(newPost){
    return async function(dispatch) {
        console.log("new post",newPost)
        let res=await axios.post(`${BASE_URL}/posts`,newPost);
        console.log(res.data)
        dispatch(addPost(res.data)); //sets state with returned data
    }
}

function addPost(newPost){
    let {body,comments,...rest}=newPost
    let newTitle={rest}
    // let newTitle={title,description,id,votes} //newTitle is post without body and comments
    return {type:"ADD_POST", payload:{newPost,newTitle}} //also update titles 
}

export function deletePostFromApi(postId){
    return async function(dispatch) {
        
        let res=await axios.delete(`${BASE_URL}/posts/${postId}`);
        dispatch(deletePost(postId)); //sets state with returned data
    }
}

function deletePost(postId){
    return {type:"DELETE_POST", postId} //also update titles 
}

export function updatePostInApi(post){
//update post in api
return async function(dispatch){
    
    let res = await axios.put(`${BASE_URL}/posts/${post.id}`, post);
    let freshPost = {...res.data, comments:post.comments}
     //attach comments then dispatch
    dispatch(updatePost(freshPost))
}
}

function updatePost(post){
    return {type:"EDIT_POST", post}
}

export function addCommentToApi(postId,comment){
    //update post in api
    return async function(dispatch){
        
        let res = await axios.post(`${BASE_URL}/posts/${postId}/comments`, comment);
        console.log("add comt to api",{...res.data, postId}) //{id, text}
         let newComment = {...res.data, postId}
        dispatch(addComment(newComment))
    }
    }
    
function addComment(comment){
    return {type:"ADD_COMMENT", comment}
}

export function deleteCommentFromApi(postId,commentId){
    //update post in api
    return async function(dispatch){
        try{
            let res = await axios.delete(`${BASE_URL}/posts/${postId}/comments/${commentId}`);

            dispatch(deleteComment({postId,commentId}))
        } catch(e){
            console.error(e)
        }
    }
}
    
function deleteComment(ids){
    return {type:"DELETE_COMMENT", ids}
}