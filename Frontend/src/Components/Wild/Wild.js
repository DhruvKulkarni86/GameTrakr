import React from 'react'
import './Wild.css' 
import 'animate.css';
import { Link } from 'react-router-dom';


const Wild = () => {
    return (
        <div className='wild-wrap'>
            <h1 className="wild-4">404</h1>
            <h1 className="wild-head">OOPS!THIS PAGE DOESN'T EXIST!</h1>
            <Link className="wild-lnk" to="/">
                <p className='wild-opt '>RESTART</p>
            </Link>
        </div>
    )
}

export default Wild
