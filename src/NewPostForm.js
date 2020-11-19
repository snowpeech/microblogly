import React,{useState} from "react";
import {useHistory, useParams} from 'react-router-dom'
import {useDispatch} from "react-redux"
import { v4 as uuid } from 'uuid';

const NewPostForm = ({post, edit, toggleEdit} )=>{
    const dispatch = useDispatch();
    const history = useHistory();
    const {postId} = useParams();
    let INITIAL_STATE;

    if(post){
        INITIAL_STATE=post
    } else {
        INITIAL_STATE = {title:"", description:"", body:" "}
    }

    const [formData, setFormData]=useState(INITIAL_STATE);

    const handleChange=(evt)=>{
        const {name,value} = evt.target;
        setFormData(formData => ({...formData, [name]:value}));
    }

    const updatePost=(evt)=>{
        evt.preventDefault();
        let id = postId;
        const {title, description, body}=formData;
        const updatedPost={[id]:{title,description,body,comments:post.comments}}
        toggleEdit();
        dispatch({type:"EDIT_POST", updatedPost});
        history.push(`/${id}`);
    }
    const addPost =(evt)=>{
        evt.preventDefault();
        const id = uuid();
        const {title, description, body}=formData;
        const newPost={[id]:{title,description,body,comments:{}}}

        dispatch({type:"ADD_POST", newPost})
        history.push("/");
    }

    const cancelPost=()=>{
        history.push("/")
    }
//show a different button to edit post vs publish a new post? miss the nice submit feature...

return(<div>
    <h1>{edit? "Edit Post" : "New Post"}</h1>
    <form>
        <div>
            <label htmlFor="title">Title:  </label>
            <input type="text" name="title" value={formData.title} onChange={handleChange}/>
        </div>
        <div>
            <label htmlFor="description">Description:  </label>
            <input type="text" name="description" value={formData.description} placeholder="Sum up your thoughts in a pithy teaser" onChange={handleChange}/>
        </div>
        <div>
            <label htmlFor="body">Body:  </label>
            <textarea name="body" value={formData.body} rows="15" cols="43" onChange={handleChange}/>
        </div>

        
        {edit ? <button onClick={updatePost}>Publish changes</button> : <button onClick={addPost}>Publish</button>}
    </form>
    {edit ? "" : <button onClick={cancelPost}>Cancel</button>}
    
</div>)
}

export default NewPostForm;