import React,{useState} from "react";
import {useDispatch} from "react-redux";
import { v4 as uuidv4 } from 'uuid';

const CommentForm = ({postId})=>{
    const INITIAL_STATE={comment:""}
    const [formData, setFormData] = useState(INITIAL_STATE);
    const dispatch = useDispatch();

    const addComment = (text)=>{
        //figure out alternative for id... use getTime?
        let id=new Date().getTime()
        let comment={text, id, postId}        
        dispatch({type:"ADD_COMMENT", comment})
    }
    
    const handleChange=(evt)=>{
        const {name,value} = evt.target;
        setFormData(formData => ({...formData, [name]:value}));
    }

    const handleSubmit=(evt)=>{
        evt.preventDefault();
        const {comment}=formData;
        // addTodo(todo);
        addComment(comment);
        setFormData(INITIAL_STATE);
    }

    return(
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="comment">Add a comment:  </label>
            <input type="text" name="comment" value={formData.comment} onChange={handleChange}/>
            </div>
            <button>+ comment</button>
        </form>
    )
}

export default CommentForm;