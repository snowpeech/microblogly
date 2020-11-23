const INITIAL_STATE = {posts:{}, titles:{}, error:false}

function rootReducer(state = INITIAL_STATE, action) {  
  switch (action.type) {
    case "ADD_POST":
      {//add post
      let {posts, titles} = state;
      const {newPost,newTitle} = action.payload
        
      return {...state, posts:{...posts, ...newPost}, titles:{...titles, newTitle}}
        // return state;
    }

    case "EDIT_POST":
      {// edit post
        let {posts, titles} = state;
        const {post} = action 
        let updatedPost = {[post.id]: post}
        // console.log(updatedPost, "!EDIT POST UPDATED")
        
        if(Array.isArray(titles)){        
          let {title, id, description, votes}= post;        
          let updatedTitle= {title,id,description, votes}

          const oldTitles = titles.filter(title=> title.id !== id )

          return {...state, posts:{...posts, ...updatedPost}, titles:{...oldTitles, ...updatedTitle}}
        }
        
        return {...state, posts:{...posts, ...updatedPost}};
      }
    
    case "DELETE_POST":
     {//destructure to remove post by id
     let {posts, titles} = state;
     let {id} = action;
  
     const{[id]:theId, ...remaining_posts} = posts;
  
      if(Array.isArray(titles)){
        const oldTitles = titles.filter(title=> title.id !== id )

        return {...state, posts:{...remaining_posts}, titles:{...oldTitles}}
      }

      return {...state, posts:{...remaining_posts}}
    }
   
    case "ADD_COMMENT":
      {//add comment to post
      let {posts} = state;
      const {comment} = action 
      let post = posts[comment.postId]

      let {id, text}=comment
      let newComment = {id,text}

      return {...state, 
          posts:{...posts, 
            [comment.postId]:{...post, comments:[...post.comments, newComment]}}}
        
    }

    case "DELETE_COMMENT":
      {//add comment to post
      const {posts} = state;
      const {ids} = action 
      const post = posts[ids.postId]
      
      let remainingComments = post.comments.filter(comment => comment.id !== ids.commentId)
      
      return {...state, posts:{...posts, 
          [ids.postId]:{...post, comments:remainingComments}}}
    }

    case "LOAD_TITLES":
    {
      let {posts} =action
      return {...state, titles:posts}
    }

    case "LOAD_A_POST":
      {
        let {posts} = state;
        let {post} =action;
        return {...state, posts:{...posts, [post.id]:post}}
      }

    case "UPDATE_VOTES":
      {
        let {titles} = state;
        let {votes, postId} =action.item;
        
        console.log("update votes titles",titles, "dir vote:",postId, votes)
  
        const newTitles = titles.map(title =>
          title.id === postId
            ? { ...title, votes }
            : title
        );

        return {...state, titles:newTitles}
      }

    case "ERROR":
      return {...state, error:true}

    default:
      return state;
  }
    
}

export default rootReducer;

// let test =[{description: "Best post ever!",
// id: 1,
// title: "First Post :)",
// votes: 1}, {description: "A very good post!",
// id: 2,
// title: "Second Post",
// votes: 1}, {description: "A  post!",
// id: 3,
// title: "3 Post",
// votes: 1}]