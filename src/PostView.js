import React,{useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useParams, Redirect} from 'react-router-dom'
import NewPostForm from "./NewPostForm";
import Comments from "./Comments"
import CommentForm from "./CommentForm"

const PostView = ()=>{
    const {postId} = useParams();
    const [showEdit, setShowEdit]=useState(false)
    const dispatch = useDispatch()
    
    const posts = useSelector(state => state.posts)
    const post = posts[postId]
    console.log("checking comments are in post", post)
    const editPost=()=>{
        setShowEdit(!showEdit)        
    }

    const deletePost=()=>{
        dispatch({type:"DELETE_POST", id:postId})
    }
if(!post){
    return (<Redirect to="/" />)
} else {
    return(    
        <div className="PostView">
            <h1>{post.title}</h1>
            <h4>{post.description}</h4>
            <p>{post.body}</p>
        
            <button onClick={editPost}>Edit Post</button> 
            <button onClick = {deletePost}>Delete Post</button> 
            {showEdit ? <><NewPostForm post={post} edit toggleEdit={setShowEdit}/> <button onClick={editPost}>Cancel Changes</button> </> : ""}

            <Comments comments={post.comments}/>
            <CommentForm postId={postId} />
        </div>)
    } 
}

export default PostView;