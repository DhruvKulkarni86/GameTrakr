import React from 'react'
import Navbar from '../Navbar/Navbar';
import SearchComp from '../SearchComp/SearchComp';
import './Search.css';
const Search = () => {
    document.title = "Search";
    return (
        <div className="Search-Wrap">
                <Navbar/>
            <div className="search">
                <SearchComp/>
            </div>
        </div>
    )
}

export default Search
