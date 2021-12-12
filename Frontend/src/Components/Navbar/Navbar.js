import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom';

const Navbar = () => {
    let uname = localStorage.getItem("Username");
    console.log("USERRRRR", uname);
    let wish = localStorage.getItem("Wishlist");
    console.log("WISHHHH", typeof wish);

    return (
        <div className="nv">
            <ul className="nav-wrap">
                <li className="lan-txt">
                    <Link to="/" className="link">
                        <p>GameTrakr</p>
                    </Link>
                </li>
            </ul>
            <ul className="nav-lnk">
                <li className="lnk-txt">
                    <Link to="/search" className="link"><p>Search</p></Link>
                </li>
                <li className="lnk-txt">
                    <Link to="/explore" className="link"><p>Explore</p></Link>
                </li>
                <li className="lnk-txt lst">
                    {uname===null?
                        <Link to="/reg" className="link">
                            <p>SignIn</p>
                        </Link>:
                        <Link to="/" className='link'>
                            <p>{uname}</p>
                        </Link>
                    }
                    {uname===null?null:
                    <Link to="/" className="link">
                        <p className="nav-drop" onClick={()=>localStorage.clear()}>
                            Logout
                        </p>
                    </Link>}
                </li>
            </ul>
        </div>
    )
}

export default Navbar
