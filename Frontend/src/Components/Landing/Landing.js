import React from 'react'
import './Landing.css';
import {BsGithub} from 'react-icons/bs';
import {Link} from 'react-router-dom';
const Landing = () => {
    let uname = localStorage.getItem("Username");
    const clearSearch = () => {
        sessionStorage.removeItem('search-term');
        sessionStorage.removeItem('search-res');
    }
    return (
        <div className="container">
            <section className="s1">
                <nav>
                    <ul className="navlist">
                        <Link to="/search" onClick={clearSearch} className="link">
                            <li>Search</li>
                        </Link>
                        <Link to="/explore" className="link">
                            <li>Explore</li>
                        </Link>
                        <li className="lnk-lst">
                                
                                    {uname===null?
                                    <Link to="/reg" className="link">
                                        <p className='lan-acct'>SignIn</p>
                                    </Link>:
                                    <Link to="/dashboard" className="link">
                                        <p className='lan-acct'>{uname}</p>
                                    </Link>}
                            {uname===null?null:
                            <Link to="/" className="link">
                                <p className="lan-nav-drop lan-acct" onClick={()=>localStorage.clear()}>Logout</p>
                            </Link>}
                        </li>
                    </ul>
                </nav>
                <div className="heroTxt"><h1>GameTrakr</h1></div>
                <div className="heroTag"><h2>Your one-stop destination to search, shop, explore and keep track of deals on your favourite games across different stores.</h2></div>
                <div className="git">
                    <a href="https://github.com/DhruvKulkarni86/GameTrakr" target="_blank" rel="noopener noreferrer">
                    <BsGithub style={{"cursor": "pointer"}}/>
                    </a>
                </div>
            </section>
            {/* <section>
                <div className="credit">
                    <p className='footer-txt'>Created with ☕ and 🎮 by </p>
                    <span>Dhruv Kulkarni, Pradhuman Ramawat and Dhiren Joshi</span>
                </div>
            </section> */}
        </div>
    )
}

export default Landing
