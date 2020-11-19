import React from "react";
import {NavLink} from 'react-router-dom';

import "./styles/Navbar.css"

const Navbar = ()=>{
return(<div className="Navbar">
    <div>
    Micro-Blogly 
    </div> 

    <div>
        <NavLink exact to="/">Home</NavLink>
        <NavLink exact to="/new">New Post</NavLink>
    </div>
</div>)
}

export default Navbar;