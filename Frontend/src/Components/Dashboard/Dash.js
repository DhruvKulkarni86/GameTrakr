import React, { useEffect, useState } from "react";
import "animate.css"
import Navbar from '../Navbar/Navbar.js'
import "../Explore/Explore.css";
import WishlistCardData from "./WishlistCardData";
import Recommended from "./Recommended";
import LoadMan from "../LoadMan/LoadMan.js";
import { NavLink } from "react-router-dom";

const Dash = () => {
  const [Loading, isLoading] = useState(true)
  const[wishlist, setwishlist] = useState([])
  let user = localStorage.getItem("Username")

  useEffect(() => {
    setTimeout(() => {
      isLoading(false);
    }, 2000);
  },[])

  useEffect(() => {
    setwishlist(
      localStorage.getItem("Wishlist")
        ? JSON.parse(localStorage.getItem("Wishlist"))
        : []
    );
  }, []);

  // console.log(wishlist.length);
  // console.log(user!== null && wishlist.length === 0);

  if(user!==null && wishlist.length>0){
    return (
      <div className="explore_main_container">
        {Loading && <LoadMan />}
        <div className="animate">
        <Navbar />
        <div className="welcome">Welcome, {user}</div>
        <WishlistCardData />
        <Recommended />
        </div>
      </div>
    );
  }else if(user!== null && wishlist.length===0) {
    return (
      <div className="explore_main_container">
        <Navbar />
        <div className="welcome">Welcome, {user}</div>
        <div className="error-text">
          <h3 className="error-head">You haven't added anything to your wishlist yet.</h3>
          <p className="error-option"><NavLink to="/explore">Explore Now</NavLink></p>
        </div>
    </div>
    )
  }
  else {
    return (
      <div className="explore_main_container">
        <Navbar />
      <div className="error-text">
        <h3 className="error-head">You need to be Logged in to view this page</h3>
        <p className="error-option"><NavLink to="/reg">Sign In</NavLink></p>
      </div>
  </div>
    )
  }
};

export default Dash;
