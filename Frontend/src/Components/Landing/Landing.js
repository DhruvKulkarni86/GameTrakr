import React from 'react'
import './Landing.css';
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
                                    <Link to="/" className="link">
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
                <div className="heroTag"><h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga provident blanditiis praesentium sed reiciendis ad placeat quasi ea, pariatur libero quo tenetur illo ullam. Quisquam, aspernatur ipsa. Vero, harum cupiditate!</h2></div>
                {/* <div className="credit">
                    <p className='footer-txt'>Created with ☕ and 🎮 by </p>
                    <span>Dhruv Kulkarni, Pradhuman Ramawat and Dhiren Joshi</span>
                </div> */}
            </section>
        </div>
    )
}

export default Landing
