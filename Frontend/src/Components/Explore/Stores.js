import React from "react";
import { NavLink } from 'react-router-dom'
import './Explore.css'
import './Stores.css'

const Stores = () => {
  return (
    <div>
    <div className="stores-head">
      <h3 className="stores-title">Explore Stores</h3>
      </div>
          <div className="stores-card">
            <NavLink to="/steam">
            <div className="steam-img">
            </div>
            </NavLink>
            <NavLink to="/epicgames">
            <div className="epic-img">
            </div>
            </NavLink>
            <NavLink to="/gog">
            <div className="gog-img">
            </div>
            </NavLink>
          </div>
        </div>
  )
};

export default Stores;
