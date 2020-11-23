import React,{useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory,Redirect} from 'react-router-dom'
import NewPostForm from "./NewPostForm";
import Comments from "./Comments"
import CommentForm from "./CommentForm"
import {getAPostFromApi, deletePostFromApi} from './actionCreators'

const PostView = ()=>{
    const history = useHistory();
    const dispatch = useDispatch()
    
    const {postId} = useParams();
    const [showEdit, setShowEdit]=useState(false)
    const posts = useSelector(state => state.posts)
    let post = posts[postId]//currently need to get id: postId. go shuffle state

    useEffect(()  =>  {
        
        if(!post){
            dispatch(getAPostFromApi(postId))
        } 
    },[dispatch, postId])


    const editPost=()=>{
        setShowEdit(!showEdit)        
    }

    const deletePost=()=>{
        dispatch(deletePostFromApi(postId))
        history.push("/")
    }

    
if(!post){
    //needs to show something while loading. Not sure what to do if on the wrong id. if redirecting, then it takes two clicks to get here from Home page
    return (<>Loading...</>)
    
} else {
    return(    
        <div className="PostView">
            <h1>{post.title}</h1>
            <h4>{post.description}</h4>
            <p>{post.body}</p>
        
            <button onClick={editPost}>Edit Post</button> 
            <button onClick = {deletePost}>Delete Post</button> 
            {showEdit ? <><NewPostForm post={post} edit toggleEdit={setShowEdit}/> <button onClick={editPost}>Cancel Changes</button> </> : ""}

            <Comments comments={post.comments} postId={postId} />
            <CommentForm postId={postId} />
        </div>)
    } 
}

export default PostView;