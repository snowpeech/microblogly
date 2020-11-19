import React from "react";
import {Switch, Route, Redirect} from "react-router-dom"
import NewPostForm from "./NewPostForm"
import Home from "./Home"
import PostView from "./PostView"

const Routes = ()=>{
return (
      <Switch>
        <Route exact path="/new">
            <NewPostForm />
        </Route>
        
        <Route exact path="/:postId">
            <PostView />
        </Route>
        
        <Route exact path="/">
            <Home />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  }

export default Routes;