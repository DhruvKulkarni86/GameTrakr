import React, {useState, useRef} from 'react'
import  { useHistory } from 'react-router-dom'
import Navbar from '../../Navbar/Navbar';
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';
import './Reg.css';
import axios from 'axios';
const Reg = () => {
    let history = useHistory();
    const [regStatus, setRegStatus] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        setActive(!isActive);
        setformdata({
            fname: '',
            lname:'',
            email:'',
            password:''
        });
        setloginFD({
            lemail:'',
            lpassword:''
        });
        setRegStatus("");
    };
    const[show,setshow]=useState(false)
    const pass = useRef();
    const lpass = useRef();

//!____SIGNUP________
    const [formdata,setformdata]=useState({
        fname: '',
        lname:'',
        email:'',
        password:''
    })

    const {
        fname,
        lname,
        email,
        password,
    } = formdata;

    const change=(e)=>{
        setformdata({...formdata,[e.target.name]:e.target.value})
    }

    const submit = e =>{
        setRegStatus("Loading");
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACK_URL}/signup`, formdata).then((response)=>{
            console.log(response);
            if(response.status===200){
                setRegStatus(response.status);
            }
        });
        setformdata({
            fname:'',
            lname:'',
            email:'',
            password:''
    })
    setshow(false)
    }

    const showpassword = () =>{
        setshow(!show)
        pass.current.type = show ? 'password':'text';
        lpass.current.type = show ? 'password':'text';
    }
//! ______LOGIN_________
    const [loginFD, setloginFD] = useState({
        lemail:'',
        lpassword:''
    })

    const {
        lemail,
        lpassword,
    } = loginFD;

    const lchange=(e)=>{
        setloginFD({...loginFD,[e.target.name]:e.target.value})
    }

    const lsubmit = e =>{
        setLoginStatus("Loading");
        e.preventDefault();
        setloginFD({
            lemail:'',
            lpassword:''
        })
        axios.post(`${process.env.REACT_APP_BACK_URL}/login`, loginFD).then(
            (response)=>{
                console.log(response);
                if(response.status===200){
                    setLoginStatus(response.status);
                    localStorage.setItem("token", response.data.accessToken);
                    localStorage.setItem("Username", response.data.fname);
                    localStorage.setItem("Wishlist", JSON.stringify(response.data.wishlist));
                    history.goBack();
                }
            }
        ).catch(
            (error)=>{
                if(error.response.status===400){
                    setLoginStatus(error.response.status);
                }
                if(error.response.status===401){
                    setLoginStatus(error.response.status);
                }
            }
        )
        setshow(false)
    }
    // console.log("LLLL",loginStatus);

    return (
        <div className="reg-wrap">
            <Navbar/>
            <div className="reg-form-wrap">
                <div className={isActive?'reg-container right-panel-active':'reg-container'}>
                    <div className="forms">
                        <div className="form-container sign-up-container">
                            <form onSubmit={lsubmit}>
                                <h1 className="reg-title">Login</h1>
                                <input className="reg-inp" type = "email" value={lemail} placeholder="Email"name="lemail" onChange={lchange} required></input>
                                <div className="eye">
                                        <input
                                        required
                                        ref={lpass}
                                        value={lpassword}
                                        name="lpassword"
                                        onChange={lchange}
                                        type="password"
                                        placeholder="Password" className="reg-inp"/>
                                        {show ? <i onClick={showpassword}><AiFillEyeInvisible className="reg-ico"/></i>:<i onClick={showpassword}><AiFillEye className="reg-ico"/></i>}
                                    </div>
                                <div className="form-bottom">
                                    <button className="reg-but">Sign In</button>
                                    <div>{loginStatus===200?"User Logged In":loginStatus===400?"User doesn't exist":loginStatus===401?"Invalid Credentials":loginStatus==="Loading"?<div className='reg-load'></div>:""}</div>
                                </div>
                            </form>
                        </div>
                        <div className="form-container sign-in-container">
                            <form onSubmit={submit}>
                                    <h1 className="reg-title">Create Account</h1>
                                    <input className="reg-inp" type = "text" value={fname} placeholder="First Name" name="fname" onChange={change} required></input>
                                    <input className="reg-inp" type = "text" value={lname} placeholder="Last name" name="lname" onChange={change} required></input>
                                    <input className="reg-inp" type = "email" value={email} placeholder="Email"name="email" onChange={change} required></input>
                                    <div className="eye">
                                        <input
                                        required
                                        ref={pass}
                                        value={password}
                                        name="password"
                                        onChange={change}
                                        type="password"
                                        placeholder="Password" className="reg-inp"/>
                                        {show ? <i onClick={showpassword}><AiFillEyeInvisible className="reg-ico"/></i>:<i onClick={showpassword}><AiFillEye className="reg-ico"/></i>}
                                    </div>
                                    <div className="form-bottom">
                                        <button className="reg-but">Sign Up</button>
                                        <div>
                                            {regStatus===200?"User Created!":regStatus===400?"User not created, try again":regStatus==="Loading"?<div className='reg-load'></div>:""}
                                            </div>
                                    </div>
                                    {/* <button className="reg-but">Sign Up</button>
                                    <p>{regStatus===200?"User Created":regStatus===400?"User not created, try again":""}</p> */}
                                </form>
                        </div>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1 className="reg-title">Not a User?</h1>
                                <button onClick={toggleClass} className="ghost" id="signIn">Sign Up</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1 className="reg-title">Already a user?</h1>
                                <button onClick={toggleClass} className="ghost" id="signUp">Sign In</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reg
