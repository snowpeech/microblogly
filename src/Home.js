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

    let sortedPosts = postArr.sort((a, b) => (a.votes < b.votes) ? 1 : -1)

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
    <div className="Posts">
    {sortedPosts.map(post => 
    <div key={post.id} className="Post">
        <div>
        <Link to={`/${post.id}`}> {post.title} | {post.description} </Link> 
        </div>
        <div>
        <button onClick={()=>vote("up", post.id)}>^</button>  {post.votes}{"  "}    
        <button onClick={()=>vote("down", post.id)}>v</button>
        </div>
    </div>)}

    </div>
    
</>)
}

export default Home;