const INITIAL_STATE = {posts:
  {"12315235":{
    title:"text", 
  description:"more text", 
  body:"body text",
  comments: {1:"first!", 2:"no one cares"},
  }}};
//post object: {"12315235":{title:"text", description:"more text", body:"body text", comments:{324: "text", 1423:"more text"}}} comment id comes from last comment#+1. else, 1.
function rootReducer(state = INITIAL_STATE, action) {  
  switch (action.type) {
    case "ADD_POST":
      {//add post
      let {posts} = state;
      const {newPost} = action 

    return {...state, posts:{...posts, ...newPost}}
        // return state;
    }

    case "EDIT_POST":
      {// edit post
        let {posts} = state;
        const {updatedPost} = action 
        return {...state, posts:{...posts, ...updatedPost}};
      }
    
    case "DELETE_POST":
     {//destructure to remove post by id
     let {posts} = state;
     let {id} = action;
    
    const{[id]:theId, ...remaining_posts} = posts;
  
     return {...state, posts:{...remaining_posts}}
      // return state;
    }
   
    case "ADD_COMMENT":
      {//add comment to post
      let {posts} = state;
      const {comment} = action 
      let post = posts[comment.postId]
      let existingComments = post.comments
        console.log("ADD COMMENT", existingComments)
      return {...state, 
          posts:{...posts, 
            [comment.postId]:{...post, comments:{...post.comments,[comment.id]:comment.text}}}}
        
    // return {...state, posts:{...posts, ...newPost}}
        // return state;
    }

    case "DELETE_COMMENT":
      {//add comment to post
      let {posts} = state;
      const {comment} = action 
        console.log("ADD COMMENT", comment)
    // return {...state, posts:{...posts, ...newPost}}
        return state;
    }

    default:
      return state;
  }
}

export default rootReducer;