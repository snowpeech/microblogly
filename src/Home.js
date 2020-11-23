import React,{useEffect} from "react";
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {getPostsFromApi} from "./actionCreators"

const Home = ()=>{
    // const posts=[{id:123,title:"test", description:"testing 123"},{id:234,title:"test2", description:"testing 234"}]//need to get this from state...
    const posts = useSelector(state => state.titles);
    console.log("home posts",posts)
    const dispatch=useDispatch();

    let postArr=[];
    for(const [key, value]  of Object.entries(posts)){
        postArr.push( {...value}); 
    }

    useEffect(()  =>  {
        console.log("home useeffect")
        dispatch(getPostsFromApi())
    },[dispatch])

return(<>
<h1>Home</h1>
{postArr.map(post=><div key={post.id}>
<Link to={`/${post.id}`}> {post.title} | {post.description} </Link>
</div>)}
</>)
}

export default Home;