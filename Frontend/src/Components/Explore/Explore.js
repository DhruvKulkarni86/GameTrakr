import React, { useEffect, useState } from "react";
import Navbar from '../Navbar/Navbar.js'
import "./Explore.css";
import Popular from "./Popular.js";
import NewReleases from "./NewReleases.js";
import Stores from "./Stores";
import Genres from "./Genres.js";
import LoadMan from "../LoadMan/LoadMan.js";

const Explore = () => {
  const [Loading, isLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      isLoading(false);
    }, 2000);
  },[])
  return (
    <div className="explore_main_container">
      {Loading && <LoadMan />}
      <div className="animate">
      <Navbar />
      <NewReleases />
      <div className="owned_cards"></div>
      <Popular />
      <div className="stores"><Stores /></div>
      <Genres />
      </div>
    </div>
  );
};

export default Explore;
