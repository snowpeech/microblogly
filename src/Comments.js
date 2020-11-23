import React from "react";
import {deleteCommentFromApi} from './actionCreators'
import {useDispatch} from "react-redux"

const Comments = ({comments, postId})=>{
    const dispatch = useDispatch()

    const deleteComment=(commentId)=>{
        dispatch(deleteCommentFromApi(postId,commentId))
    }

return (<div>
    <h3>Comments</h3>
{comments.map(comment => <div key={comment.id}>{comment.text}   <button onClick={()=>deleteComment(comment.id)}> X</button></div>)}
    </div>)
}
export default Comments;