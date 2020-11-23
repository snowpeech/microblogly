import React,{useEffect} from "react";
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {getPostsFromApi, votePostInApi} from "./actionCreators"

const Home = ()=>{
    
    const dispatch=useDispatch();
    const posts = useSelector(state => state.titles);

    let postArr=[];
    for(const [key, value]  of Object.entries(posts)){
        postArr.push( {...value}); 
    }

    useEffect(()  =>  {
        dispatch(getPostsFromApi())
    },[dispatch])
    
    const vote=(direction, postId)=>{
        //direction = "up" or "down"
        console.log(direction, postId);
        dispatch(votePostInApi(direction,postId))
    }


return(<>
    <h1>Home</h1>
    {postArr.map(post=><div key={post.id}>
    <Link to={`/${post.id}`}> {post.title} | {post.description} </Link> <button onClick={()=>vote("up", post.id)}>Up</button>{post.votes} <button onClick={()=>vote("down", post.id)}>Down</button>
    </div>)}
</>)
}

export default Home;