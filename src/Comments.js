import React,{useState} from "react";
import {useHistory, useParams} from 'react-router-dom'
import {useDispatch} from "react-redux"
import { v4 as uuid } from 'uuid';

const Comments = ({comments})=>{
    console.log("Comments component:", comments)
    let commentArr =[];
    for(const [key, value]  of Object.entries(comments)){
        let x = {"text":value,id:key}
        commentArr.push(x); 
    }
return (<div>
    <h3>Comments</h3>
{commentArr.map(comment => <div key={comment.id}>{comment.text}</div>)}
    </div>)
}
export default Comments;